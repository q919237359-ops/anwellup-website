export type AnalyticsEvent =
  | "add_to_inquiry"
  | "catalog_download"
  | "category_filter"
  | "inquiry_copy"
  | "inquiry_open"
  | "inquiry_whatsapp_click"
  | "product_search"
  | "remove_from_inquiry"
  | "whatsapp_click";

type EventParameters = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const CONSENT_KEY = "anwellup_analytics_consent";
const GTM_ID = import.meta.env.VITE_GTM_ID?.trim() ?? "";
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID?.trim() ?? "";

export const analyticsConfigured = /^GTM-[A-Z0-9]+$/i.test(GTM_ID) || /^[a-z0-9]+$/i.test(CLARITY_ID);

export type AnalyticsConsent = "accepted" | "essential" | null;

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "essential" ? value : null;
}

function injectScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function startConfiguredAnalytics() {
  if (typeof window === "undefined" || getAnalyticsConsent() !== "accepted") return;

  if (/^GTM-[A-Z0-9]+$/i.test(GTM_ID)) {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`, "anwellup-gtm");
  }

  if (/^[a-z0-9]+$/i.test(CLARITY_ID) && !window.clarity) {
    window.clarity = (...args: unknown[]) => {
      const clarity = window.clarity as ((...innerArgs: unknown[]) => void) & { q?: unknown[] };
      clarity.q = clarity.q ?? [];
      clarity.q.push(args);
    };
    injectScript(`https://www.clarity.ms/tag/${encodeURIComponent(CLARITY_ID)}`, "anwellup-clarity");
  }
}

export function initializeAnalytics() {
  if (!analyticsConfigured) return;
  startConfiguredAnalytics();
}

export function setAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>) {
  window.localStorage.setItem(CONSENT_KEY, consent);
  if (consent === "accepted") startConfiguredAnalytics();
}

export function trackEvent(event: AnalyticsEvent, parameters: EventParameters = {}) {
  if (typeof window === "undefined" || getAnalyticsConsent() !== "accepted") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...parameters });
}

