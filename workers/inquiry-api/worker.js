const ALLOWED_ORIGINS = new Set([
  "https://anwellup.com",
  "https://www.anwellup.com",
]);

const ALLOWED_HOSTNAMES = new Set([
  "anwellup.com",
  "www.anwellup.com",
]);

const MAX_BODY_BYTES = 32_768;

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function jsonResponse(body, status = 200, origin = "") {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  };
  if (ALLOWED_ORIGINS.has(origin)) Object.assign(headers, corsHeaders(origin));
  return new Response(JSON.stringify(body), { status, headers });
}

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);
}

function normalizeItems(value) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 20).map((item) => ({
    sku: cleanText(item?.sku, 80),
    name: cleanText(item?.name, 160),
    category: cleanText(item?.category, 100),
    variant: cleanText(item?.variant, 160),
  })).filter((item) => item.sku || item.name);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value) && value.length <= 254;
}

async function verifyTurnstile(request, env, token) {
  const payload = new FormData();
  payload.append("secret", env.TURNSTILE_SECRET);
  payload.append("response", token);
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) payload.append("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: payload,
  });
  if (!response.ok) return false;

  const result = await response.json();
  return result.success === true
    && ALLOWED_HOSTNAMES.has(result.hostname)
    && result.action === "inquiry_submit";
}

function emailContent(inquiry, reference) {
  const itemLines = inquiry.items.length
    ? inquiry.items.map((item) => `- ${item.sku || "No SKU"} | ${item.name || "Unnamed product"}${item.variant ? ` | ${item.variant}` : ""}`).join("\n")
    : "No product selected";

  const text = [
    `ANWELLUP website enquiry ${reference}`,
    "",
    `Name: ${inquiry.name}`,
    `Work email: ${inquiry.email}`,
    `Company: ${inquiry.company || "Not provided"}`,
    `Phone / WhatsApp: ${inquiry.phone || "Not provided"}`,
    `Destination market: ${inquiry.market || "Not provided"}`,
    `Estimated quantity: ${inquiry.quantity || "Not provided"}`,
    "",
    "Selected products:",
    itemLines,
    "",
    "Project notes:",
    inquiry.notes || "Not provided",
    "",
    `Source page: ${inquiry.pageUrl || "Not provided"}`,
  ].join("\n");

  const rows = [
    ["Reference", reference],
    ["Name", inquiry.name],
    ["Work email", inquiry.email],
    ["Company", inquiry.company || "Not provided"],
    ["Phone / WhatsApp", inquiry.phone || "Not provided"],
    ["Destination market", inquiry.market || "Not provided"],
    ["Estimated quantity", inquiry.quantity || "Not provided"],
    ["Source page", inquiry.pageUrl || "Not provided"],
  ].map(([label, value]) => `<tr><th style="padding:10px 14px;text-align:left;vertical-align:top;border-bottom:1px solid #dce4d7;color:#58715a;font:600 12px Arial,sans-serif;">${escapeHtml(label)}</th><td style="padding:10px 14px;border-bottom:1px solid #dce4d7;color:#202820;font:14px/1.55 Arial,sans-serif;">${escapeHtml(value)}</td></tr>`).join("");

  const items = inquiry.items.length
    ? `<ul style="margin:8px 0 0;padding-left:20px;">${inquiry.items.map((item) => `<li style="margin:6px 0;">${escapeHtml(item.sku || "No SKU")} · ${escapeHtml(item.name || "Unnamed product")}${item.variant ? ` · ${escapeHtml(item.variant)}` : ""}</li>`).join("")}</ul>`
    : "<p style=\"margin:8px 0 0;\">No product selected</p>";

  const html = `<!doctype html><html><body style="margin:0;background:#f4f5ef;color:#202820;"><div style="max-width:720px;margin:0 auto;padding:32px 18px;"><div style="background:#ffffff;border:1px solid #dce4d7;"><div style="padding:24px 28px;background:#344b37;color:#ffffff;"><p style="margin:0 0 7px;font:600 11px Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;">ANWELLUP website enquiry</p><h1 style="margin:0;font:500 26px Georgia,serif;">${escapeHtml(reference)}</h1></div><table role="presentation" style="width:100%;border-collapse:collapse;">${rows}</table><div style="padding:22px 28px;border-top:1px solid #dce4d7;"><h2 style="margin:0;font:500 20px Georgia,serif;">Selected products</h2>${items}</div><div style="padding:0 28px 28px;"><h2 style="margin:0 0 8px;font:500 20px Georgia,serif;">Project notes</h2><p style="margin:0;white-space:pre-wrap;font:14px/1.65 Arial,sans-serif;">${escapeHtml(inquiry.notes || "Not provided")}</p></div></div></div></body></html>`;

  return { text, html };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      if (!ALLOWED_ORIGINS.has(origin)) return jsonResponse({ ok: false, error: "Origin not allowed." }, 403);
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
      return jsonResponse({ service: "anwellup-inquiry-api", status: "ok" }, 200, origin);
    }

    if (request.method !== "POST" || !["/", "/submit"].includes(url.pathname)) {
      return jsonResponse({ ok: false, error: "Not found." }, 404, origin);
    }

    if (!ALLOWED_ORIGINS.has(origin)) {
      return jsonResponse({ ok: false, error: "Origin not allowed." }, 403);
    }

    if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
      return jsonResponse({ ok: false, error: "JSON request required." }, 415, origin);
    }

    const declaredLength = Number(request.headers.get("Content-Length") || "0");
    if (declaredLength > MAX_BODY_BYTES) {
      return jsonResponse({ ok: false, error: "Enquiry is too large." }, 413, origin);
    }

    let rawBody;
    try {
      const bodyText = await request.text();
      if (new TextEncoder().encode(bodyText).byteLength > MAX_BODY_BYTES) {
        return jsonResponse({ ok: false, error: "Enquiry is too large." }, 413, origin);
      }
      rawBody = JSON.parse(bodyText);
    } catch {
      return jsonResponse({ ok: false, error: "Invalid enquiry data." }, 400, origin);
    }

    if (rawBody === null || typeof rawBody !== "object" || Array.isArray(rawBody)) {
      return jsonResponse({ ok: false, error: "Invalid enquiry data." }, 400, origin);
    }

    // Silently accept honeypot submissions without sending mail.
    if (cleanText(rawBody.website, 200)) {
      return jsonResponse({ ok: true, reference: "AW-RECEIVED" }, 200, origin);
    }

    const inquiry = {
      name: cleanText(rawBody.name, 120),
      email: cleanText(rawBody.email, 254).toLowerCase(),
      company: cleanText(rawBody.company, 180),
      phone: cleanText(rawBody.phone, 80),
      market: cleanText(rawBody.market, 120),
      quantity: cleanText(rawBody.quantity, 120),
      notes: cleanText(rawBody.notes, 4000),
      pageUrl: cleanText(rawBody.pageUrl, 500),
      items: normalizeItems(rawBody.items),
    };

    if (!inquiry.name || !validEmail(inquiry.email)) {
      return jsonResponse({ ok: false, error: "Name and a valid work email are required." }, 400, origin);
    }
    if (!inquiry.notes && inquiry.items.length === 0) {
      return jsonResponse({ ok: false, error: "Add a product or describe the project." }, 400, origin);
    }
    if (rawBody.privacyAccepted !== true) {
      return jsonResponse({ ok: false, error: "Please accept the privacy notice." }, 400, origin);
    }

    const turnstileToken = cleanText(rawBody.turnstileToken, 2048);
    if (!turnstileToken) {
      return jsonResponse({ ok: false, error: "Security verification is required." }, 400, origin);
    }

    let turnstileValid = false;
    try {
      turnstileValid = await verifyTurnstile(request, env, turnstileToken);
    } catch {
      return jsonResponse({ ok: false, error: "Security verification is temporarily unavailable." }, 503, origin);
    }
    if (!turnstileValid) {
      return jsonResponse({ ok: false, error: "Security verification failed. Please try again." }, 400, origin);
    }

    const reference = `AW-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const content = emailContent(inquiry, reference);
    const subjectName = inquiry.company || inquiry.name;

    let resendResponse;
    try {
      resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `anwellup-${reference}`,
        },
        body: JSON.stringify({
          from: "ANWELLUP Website <website@inquiry.anwellup.com>",
          to: ["admin@anwellup.com"],
          reply_to: inquiry.email,
          subject: `[Website RFQ ${reference}] ${subjectName}`.slice(0, 180),
          text: content.text,
          html: content.html,
          tags: [{ name: "source", value: "website-rfq" }],
        }),
      });
    } catch {
      return jsonResponse({ ok: false, error: "Email delivery service is temporarily unavailable." }, 503, origin);
    }

    if (!resendResponse.ok) {
      // Do not expose provider details or credentials to the browser.
      return jsonResponse({ ok: false, error: "The enquiry could not be delivered. Please try again or use WhatsApp." }, 502, origin);
    }

    return jsonResponse({ ok: true, reference }, 200, origin);
  },
};
