"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "../lib/analytics";

const rawGtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";
const rawGa4Id = process.env.NEXT_PUBLIC_GA4_ID?.trim() ?? "";
const rawClarityId = process.env.NEXT_PUBLIC_CLARITY_ID?.trim() ?? "";
const gtmId = /^GTM-[A-Z0-9]+$/.test(rawGtmId) ? rawGtmId : "";
const ga4Id = /^G-[A-Z0-9]+$/.test(rawGa4Id) ? rawGa4Id : "";
const clarityId = /^[a-z0-9]+$/i.test(rawClarityId) ? rawClarityId : "";

export function TrafficAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics-event]") : null;
      if (!target) return;
      const name = target.dataset.analyticsEvent as AnalyticsEvent | undefined;
      if (!name) return;
      const location = target.dataset.analyticsLocation ?? "unknown";
      trackEvent(name, { location });
      if (name === "whatsapp_click") trackEvent("generate_lead", { method: "whatsapp", location });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <>
    {gtmId && <>
      <Script id="anwellup-gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}</Script>
      <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" /></noscript>
    </>}
    {ga4Id && <>
      <Script id="anwellup-ga4-loader" src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
      <Script id="anwellup-ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config','${ga4Id}');`}</Script>
    </>}
    {clarityId && <Script id="anwellup-clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','${clarityId}');`}</Script>}
  </>;
}
