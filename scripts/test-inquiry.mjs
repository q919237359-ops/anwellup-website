import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import worker from "../workers/inquiry-api/worker.js";

function load(file, extra = {}) {
  const module = { exports: {} };
  const context = vm.createContext({ module, exports: module.exports, process: { env: {} }, fetch: (...args) => globalThis.fetch(...args), AbortSignal, Error, ...extra });
  vm.runInContext(ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, context);
  return module.exports;
}
const { emptyInquiry, inquiryValidation, inquiryMessage, submitInquiry } = load("src/lib/inquiry.ts");
const draft = { ...emptyInquiry, name: "Sample buyer", email: "buyer@example.invalid", notes: "Bagasse containers for a sample review", market: "Destination to confirm" };
const items = [{ sku: "AW-BG-H66", name: "Bagasse clamshell", category: "Containers" }];
assert(inquiryValidation(emptyInquiry, [], true, "token").includes("name"));
assert(inquiryValidation({ ...draft, email: "invalid" }, [], true, "token").includes("email"));
assert(inquiryValidation({ ...draft, notes: "" }, [], true, "token").includes("describe"));
assert.equal(inquiryValidation({ ...draft, notes: "" }, items, true, "token"), "");
assert(inquiryValidation(draft, items, false, "token").includes("privacy"));
assert(inquiryValidation(draft, items, true, "").includes("verification"));
assert(inquiryValidation(draft, Array(21).fill(items[0]), true, "token").includes("20"));
assert.equal(inquiryValidation(draft, [], true, "token"), "");
assert(inquiryMessage(draft, items).includes("AW-BG-H66"));
assert(inquiryMessage(draft, items).includes(draft.notes));

const realFetch = globalThis.fetch;
let calls = [];
const request = (changes = {}) => new Request("https://anwellup-inquiry-api.q919237359.workers.dev/submit", {
  method: "POST", headers: { "Content-Type": "application/json", Origin: "https://anwellup.com" },
  body: JSON.stringify({ ...draft, items, privacyAccepted: true, turnstileToken: "mock-token", ...changes }),
});
try {
  // All requests in this test use fake providers. No email or analytics is sent.
  globalThis.fetch = async (url, init) => { calls.push({ url, init }); throw new Error("Unexpected provider call"); };
  const blocked = await worker.fetch(request({ turnstileToken: "" }), {});
  assert.equal(blocked.status, 400);
  assert.equal(calls.length, 0);
  const badOrigin = new Request(request(), { headers: { Origin: "https://unrelated.invalid", "Content-Type": "application/json" } });
  assert.equal((await worker.fetch(badOrigin, {})).status, 403);

  for (const verification of [{ success: false }, { success: true, hostname: "unrelated.invalid", action: "inquiry_submit" }, { success: true, hostname: "anwellup.com", action: "wrong" }]) {
    calls = [];
    globalThis.fetch = async (url, init) => { calls.push({ url, init }); return Response.json(verification); };
    assert.equal((await worker.fetch(request(), { TURNSTILE_SECRET: "mock" })).status, 400);
    assert.equal(calls.length, 1, "Failed verification must not call email delivery");
  }
  for (const emailStatus of [502, 200]) {
    calls = [];
    globalThis.fetch = async (url, init) => {
      calls.push({ url, init });
      return url.includes("siteverify") ? Response.json({ success: true, hostname: "anwellup.com", action: "inquiry_submit" }) : Response.json({ id: "mock-message" }, { status: emailStatus });
    };
    const response = await worker.fetch(request(), { TURNSTILE_SECRET: "mock", RESEND_API_KEY: "mock" });
    assert.equal(response.status, emailStatus === 200 ? 200 : 502);
    assert.equal(calls.length, 2);
    const email = JSON.parse(calls[1].init.body);
    assert.equal(email.reply_to, draft.email);
    assert.deepEqual(email.to, ["admin@anwellup.com"]);
    assert(email.text.includes("AW-BG-H66"));
    if (emailStatus === 200) assert.match((await response.json()).reference, /^AW-\d{8}-[A-F0-9]{8}$/);
  }
  const payload = { ...draft, items, privacyAccepted: true, turnstileToken: "mock", website: "", pageUrl: "https://anwellup.com/contact/" };
  for (const body of [{ ok: true }, { ok: false }, { ok: true, reference: "AW-RECEIVED" }, { ok: true, reference: "unexpected" }]) {
    globalThis.fetch = async () => Response.json(body);
    await assert.rejects(submitInquiry(payload));
  }
  globalThis.fetch = async () => Response.json({ ok: true, reference: "AW-20260930-ABCDEF12" });
  assert.equal(await submitInquiry(payload), "AW-20260930-ABCDEF12");
  globalThis.fetch = async () => Response.json({ ok: false }, { status: 502 });
  await assert.rejects(submitInquiry(payload));
} finally { globalThis.fetch = realFetch; }

// One event delivery route, including actions occurring before gtag loads.
const directWindow = { location: { hostname: "anwellup.com" } };
load("src/lib/analytics.ts", { window: directWindow }).trackEvent("email_click", { location: "test" });
assert.equal(directWindow.dataLayer.length, 1);
assert.equal(directWindow.dataLayer[0][0], "event");
assert.equal(directWindow.dataLayer[0][1], "email_click");
const gtmWindow = { location: { hostname: "anwellup.com" } };
load("src/lib/analytics.ts", { window: gtmWindow, process: { env: { NEXT_PUBLIC_ANALYTICS_MODE: "gtm" } } }).trackEvent("whatsapp_click", { location: "test" });
assert.equal(gtmWindow.dataLayer.length, 1);
assert.equal(gtmWindow.dataLayer[0].event, "whatsapp_click");
assert.equal(gtmWindow.gtag, undefined);
const previewWindow = { location: { hostname: "127.0.0.1" } };
load("src/lib/analytics.ts", { window: previewWindow }).trackEvent("generate_lead");
assert.equal(previewWindow.dataLayer, undefined, "Local previews must not pollute production analytics");

// A drawer unmount/reopen must not abandon an in-flight request or its receipt.
const { createInquirySubmission } = load("src/lib/inquiry-submission.ts");
const payload = { ...draft, items, privacyAccepted: true, turnstileToken: "mock", website: "", pageUrl: "https://anwellup.com/contact/" };
let release;
let deliveries = 0;
const events = [];
const sender = createInquirySubmission(() => { deliveries++; return new Promise(resolve => { release = resolve; }); }, (...event) => events.push(event));
assert.equal(sender.getSnapshot(), sender.getSnapshot(), "Snapshots must be stable between changes");
assert.equal(sender.getSnapshot(), sender.getServerSnapshot(), "Server/client initial snapshots must match");
let drawerUpdates = 0;
const unmount = sender.subscribe(() => drawerUpdates++);
const first = sender.submit(payload, "rfq_drawer");
assert.equal(sender.getSnapshot().status, "sending");
assert.equal(sender.locked(), true);
assert.equal(sender.reset(), false, "Cannot clear an in-flight enquiry");
unmount();
await sender.submit(payload, "contact_page");
assert.equal(deliveries, 1, "Different forms must share one in-flight guard");
release("AW-20260930-ABCDEF12");
await first;
assert.equal(drawerUpdates, 1, "Unmounted listeners must no longer receive updates");
assert.equal(sender.getSnapshot().reference, "AW-20260930-ABCDEF12", "Receipt survives drawer unmount");
assert.equal(sender.getSnapshot().status, "accepted");
await sender.submit(payload, "rfq_drawer");
assert.equal(deliveries, 1, "Reopening a successful enquiry must not resubmit");
assert.deepEqual(events, [[true, "rfq_drawer", 1]], "Only one lead event, without buyer data");
assert.equal(sender.reset(), true);
assert.equal(sender.getSnapshot().status, "idle");
assert.equal(sender.locked(), false);

let attempts = 0;
const failures = [];
const retry = createInquirySubmission(async () => {
  if (++attempts === 1) throw Object.assign(new Error("Timeout"), { name: "TimeoutError" });
  return "AW-20260930-ABCDEF12";
}, (...event) => failures.push(event));
await retry.submit(payload, "contact_page");
assert.equal(retry.getSnapshot().status, "error");
assert.match(retry.getSnapshot().error, /may have been received/);
assert.equal(retry.locked(), false);
await retry.submit(payload, "contact_page");
assert.equal(retry.getSnapshot().status, "accepted");
assert.deepEqual(failures, [[false, "contact_page", 1], [true, "contact_page", 1]]);
const analyticsFailure = createInquirySubmission(async () => "AW-20260930-ABCDEF12", () => { throw new Error("Analytics unavailable"); });
await analyticsFailure.submit(payload, "contact_page");
assert.equal(analyticsFailure.getSnapshot().status, "accepted", "Analytics must not mask acceptance");
console.log("PASS: validation, product preservation, CORS, verification action/hostname, provider failure/success, reply-to, accepted-reference handling, GA4/GTM single delivery, shared submission lifecycle, duplicate-submit guard, timeout/retry, receipt preservation. All providers mocked; no live email sent.");
