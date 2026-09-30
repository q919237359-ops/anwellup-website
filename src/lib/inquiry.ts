import type { InquiryItem } from "../components/InquiryProvider";

export type InquiryDraft = { name: string; email: string; company: string; phone: string; market: string; quantity: string; notes: string };
export const emptyInquiry: InquiryDraft = { name: "", email: "", company: "", phone: "", market: "", quantity: "", notes: "" };
export const INQUIRY_ENDPOINT = "https://anwellup-inquiry-api.q919237359.workers.dev/submit";
export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";

export function inquiryMessage(draft: InquiryDraft, items: InquiryItem[]) {
  return ["Hello ANWELLUP, I would like a food packaging quotation:", "",
    ...items.map(item => `- ${item.sku} | ${item.name}${item.variant ? ` | ${item.variant}` : ""}`), "",
    ...Object.entries(draft).filter(([, value]) => value.trim()).map(([key, value]) => `${key[0].toUpperCase()}${key.slice(1)}: ${value.trim()}`),
    "", "Please confirm the specification, sample options, MOQ, packing, price and lead time."].join("\n");
}

export function inquiryValidation(draft: InquiryDraft, items: InquiryItem[], consent: boolean, token: string) {
  if (!draft.name.trim()) return "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email.trim())) return "Please enter a valid email address so we can reply.";
  if (!draft.notes.trim() && !items.length) return "Please describe the packaging you need, or select a product.";
  if (items.length > 20) return "Please limit this enquiry to 20 products. Send a separate enquiry for the remaining items.";
  if (!consent) return "Please agree to the privacy notice before sending.";
  if (!token) return "Please complete the security verification. You can also use email or WhatsApp below.";
  return "";
}

export async function submitInquiry(payload: InquiryDraft & { items: InquiryItem[]; privacyAccepted: boolean; turnstileToken: string; website: string; pageUrl: string }) {
  const response = await fetch(INQUIRY_ENDPOINT, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(25000),
  });
  const data: unknown = await response.json().catch(() => null);
  const result = data && typeof data === "object" ? data as { ok?: boolean; reference?: unknown; error?: unknown } : null;
  if (!response.ok || result?.ok !== true || typeof result.reference !== "string" || !/^AW-\d{8}-[A-F0-9]{8}$/.test(result.reference)) {
    if (response.status === 400 && typeof result?.error === "string") throw new Error(result.error);
    throw new Error("We could not confirm your enquiry. Your details are still here; please try again or use email or WhatsApp below.");
  }
  return result.reference;
}
