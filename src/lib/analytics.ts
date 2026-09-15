export type AnalyticsEvent =
  | "add_to_inquiry"
  | "catalog_download"
  | "cbm_calculation"
  | "category_filter"
  | "email_click"
  | "inquiry_clear"
  | "inquiry_open"
  | "generate_lead"
  | "product_preview"
  | "product_search"
  | "rfq_template_download"
  | "remove_from_inquiry"
  | "whatsapp_click";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, parameters: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer ??= [];
  window.dataLayer.push({ event, ...parameters });
  window.gtag?.("event", event, parameters);
}
