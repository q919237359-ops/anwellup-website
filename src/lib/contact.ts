// User-confirmed on 2026-09-02 and reconfirmed on 2026-09-06.
// This supersedes the older number in the catalogue handoff.
export const WHATSAPP_NUMBER = "8613202830014";
export const WHATSAPP_DISPLAY = "+86 132 0283 0014";
export const GENERAL_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello ANWELLUP, I would like to discuss your food packaging products.")}`;

export function whatsappInquiryUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
