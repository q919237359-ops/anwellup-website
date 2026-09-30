export type AnalyticsEvent =
  | "add_to_inquiry"
  | "catalog_download"
  | "cbm_calculation"
  | "category_filter"
  | "email_click"
  | "inquiry_clear"
  | "inquiry_open"
  | "inquiry_start"
  | "inquiry_submit_error"
  | "generate_lead"
  | "product_preview"
  | "product_search"
  | "rfq_template_download"
  | "remove_from_inquiry"
  | "whatsapp_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isProductionHost() {
  return typeof window !== "undefined" && /^(www\.)?anwellup\.com$/.test(window.location.hostname);
}

export function trackEvent(event: AnalyticsEvent, parameters: Record<string, string | number | boolean> = {}) {
  if (!isProductionHost()) return;
  window.dataLayer ??= [];
  if (process.env.NEXT_PUBLIC_ANALYTICS_MODE === "gtm") {
    window.dataLayer.push({ event, ...parameters });
  } else {
    window.gtag ??= (...args: unknown[]) => { window.dataLayer!.push(args); };
    window.gtag("event", event, parameters);
  }
}
