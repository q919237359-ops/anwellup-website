"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useInquiry } from "./InquiryProvider";
import { CONTACT_EMAIL, emailInquiryUrl, whatsappInquiryUrl } from "../lib/contact";
import { inquiryMessage, inquiryValidation, turnstileSiteKey } from "../lib/inquiry";
import { trackEvent } from "../lib/analytics";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: { sitekey: string; action: string; theme: string; size: string; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

let turnstileApiPromise: Promise<void> | null = null;

// Both contact and drawer forms share one load. A failed script is removed so
// the retry action can make a fresh request instead of reusing a cached failure.
export function loadTurnstileApi(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (turnstileApiPromise) return turnstileApiPromise;
  const script = document.createElement("script");
  script.id = "anwellup-turnstile";
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
  script.async = true;
  const loading = new Promise<void>((resolve, reject) => {
    script.onload = () => {
      script.onload = script.onerror = null;
      if (window.turnstile) resolve();
      else reject(new Error("Security verification did not initialize."));
    };
    script.onerror = () => {
      script.onload = script.onerror = null;
      reject(new Error("Security verification could not load."));
    };
    document.head.appendChild(script);
  });
  turnstileApiPromise = loading.catch(failure => {
    script.remove();
    turnstileApiPromise = null;
    throw failure;
  });
  return turnstileApiPromise;
}

export function InquiryForm({ location = "contact_page" }: { location?: string }) {
  const { items, draft, updateDraft, submission, sendInquiry, startNewInquiry } = useInquiry();
  const prefix = useId();
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const focusNewDraft = useRef(false);
  const mounted = useRef(false);
  const loadingWidget = useRef(false);
  const [token, setToken] = useState("");
  const [clientReady, setClientReady] = useState(false);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [validationError, setError] = useState("");
  const [securityError, setSecurityError] = useState(false);
  const [copied, setCopied] = useState(false);
  const message = inquiryMessage(draft, items);
  const pending = submission.status === "sending";
  const { reference } = submission;
  const error = validationError || submission.error;

  const mountWidget = useCallback(() => {
    if (!turnstileSiteKey || !widget.current || widgetId.current !== null || !window.turnstile) return;
    widgetId.current = window.turnstile.render(widget.current, {
      sitekey: turnstileSiteKey, action: "inquiry_submit", theme: "light", size: "flexible",
      callback: value => { setToken(value); setSecurityError(false); },
      "expired-callback": () => setToken(""),
      "error-callback": () => { setToken(""); setSecurityError(true); },
    });
  }, []);

  const loadWidget = useCallback(async () => {
    if (!turnstileSiteKey || loadingWidget.current) return;
    loadingWidget.current = true;
    setSecurityError(false);
    try {
      await loadTurnstileApi();
      if (mounted.current) mountWidget();
    } catch {
      if (mounted.current) setSecurityError(true);
    } finally {
      loadingWidget.current = false;
    }
  }, [mountWidget]);

  useEffect(() => {
    mounted.current = true;
    setClientReady(true);
    void loadWidget();
    return () => {
      mounted.current = false;
      if (widgetId.current !== null) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [loadWidget]);
  useEffect(() => { if (reference || error) resultRef.current?.focus(); }, [reference, error]);
  useEffect(() => {
    if (submission.status === "idle" && focusNewDraft.current) {
      focusNewDraft.current = false;
      document.getElementById(`${prefix}-name`)?.focus();
    }
  }, [submission.status, prefix]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || reference) return;
    const validation = inquiryValidation(draft, items, consent, token);
    if (validation) { setError(validation); return; }
    setError("");
    try {
      await sendInquiry({ ...draft, items, privacyAccepted: consent, turnstileToken: token, website,
        pageUrl: `${window.location.origin}${window.location.pathname}` }, location);
    } finally {
      setToken("");
      if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
    }
  }

  return <div className="inquiry-form-block" data-clarity-mask="true">
    <noscript><p>Online submission requires JavaScript for security verification. Please email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the direct contact links below.</p></noscript>
    <form method="post" onSubmit={send} aria-busy={pending} data-clarity-mask="true" onFocus={() => {
      if (!startedRef.current) { startedRef.current = true; trackEvent("inquiry_start", { location }); }
    }}>
      <fieldset disabled={pending || !!reference} className="inquiry-fieldset">
        <legend className="sr-only">Your contact and packaging requirements</legend>
        <div className="buyer-fields">
          <label htmlFor={`${prefix}-name`}><span>Name{turnstileSiteKey ? " *" : ""}</span><input id={`${prefix}-name`} name="name" autoComplete="name" maxLength={120} required={!!turnstileSiteKey} value={draft.name} onChange={e => updateDraft({ name: e.target.value })} /></label>
          <label htmlFor={`${prefix}-email`}><span>Email{turnstileSiteKey ? " *" : ""}</span><input id={`${prefix}-email`} name="email" type="email" autoComplete="email" maxLength={254} required={!!turnstileSiteKey} value={draft.email} onChange={e => updateDraft({ email: e.target.value })} /></label>
          <label htmlFor={`${prefix}-market`}><span>Destination country and state / province</span><input id={`${prefix}-market`} name="market" autoComplete="country-name" maxLength={120} placeholder="For example: USA, California" value={draft.market} onChange={e => updateDraft({ market: e.target.value })} /></label>
          <label htmlFor={`${prefix}-quantity`}><span>Estimated quantity and unit</span><input id={`${prefix}-quantity`} name="quantity" maxLength={120} placeholder="For example: 10,000 pieces or 500 cartons" value={draft.quantity} onChange={e => updateDraft({ quantity: e.target.value })} /></label>
          <label htmlFor={`${prefix}-notes`} className="inquiry-wide"><span>What packaging do you need?{turnstileSiteKey && !items.length ? " *" : ""}</span><textarea id={`${prefix}-notes`} name="notes" rows={4} maxLength={4000} required={!!turnstileSiteKey && !items.length} aria-describedby={`${prefix}-notes-help`} placeholder="For example: foodservice distributor; hot takeaway meals; matching lids; 10,000 sets; needed in six weeks." value={draft.notes} onChange={e => updateDraft({ notes: e.target.value })} /><small id={`${prefix}-notes-help`}>Include your buying channel (distributor, foodservice or retail), food and use conditions, matching lids or components, quantity with unit, and required timing. An exact SKU is optional.</small></label>
        </div>
        <details className="inquiry-optional"><summary>Company and phone (optional)</summary><div className="buyer-fields">
          <label htmlFor={`${prefix}-company`}><span>Company</span><input id={`${prefix}-company`} name="company" autoComplete="organization" maxLength={180} value={draft.company} onChange={e => updateDraft({ company: e.target.value })} /></label>
          <label htmlFor={`${prefix}-phone`}><span>Phone / WhatsApp</span><input id={`${prefix}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={80} value={draft.phone} onChange={e => updateDraft({ phone: e.target.value })} /></label>
        </div></details>
        <label className="inquiry-honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></label>
        {turnstileSiteKey && <>
          <label className="inquiry-consent"><input name="privacyAccepted" type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required /><span>I agree to the <Link href="/privacy/" target="_blank">privacy notice</Link> and to being contacted about this enquiry.</span></label>
          <div ref={widget} className="inquiry-verification" />
          {securityError && <p role="status">Security verification could not load. Use email or WhatsApp below, or <button type="button" className="text-button" onClick={() => {
            setToken(""); setSecurityError(false);
            if (widgetId.current !== null && window.turnstile) window.turnstile.reset(widgetId.current);
            else void loadWidget();
          }}>retry verification</button>.</p>}
          <button type="submit" className="button button-dark inquiry-submit" disabled={!clientReady || pending || !!reference}>{pending ? "Sending enquiry…" : "Send enquiry"}</button>
        </>}
      </fieldset>
      <div ref={resultRef} tabIndex={-1} role={error && !reference && !pending ? "alert" : "status"} aria-live="polite" className={error || reference || pending ? "inquiry-result" : ""}>
        {reference ? <>Your enquiry has been accepted. Reference: <strong>{reference}</strong>. Keep this number when following up.<p>Our team will review the product, packing, destination and document requirements to confirm the next steps.</p><p><a href="/downloads/ANWELLUP_Product_Catalogue_2026.pdf" download data-analytics-event="catalog_download" data-analytics-location={`${location}_accepted`}>Download catalogue</a>{" · "}<Link href="/resources/food-packaging-rfq-template/">Use the RFQ template</Link></p></> : pending ? "Sending your enquiry. You can close this panel; keep this browser tab open until confirmation." : error}
      </div>
    </form>
    {reference && <button type="button" className="button button-outline" onClick={() => {
      focusNewDraft.current = true;
      startNewInquiry(); setError(""); setConsent(false); setToken(""); setCopied(false); startedRef.current = false;
      if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
    }}>Start a new enquiry</button>}
    <p className="inquiry-help">{turnstileSiteKey ? "Prefer a direct conversation?" : "Send your brief by email or WhatsApp. No exact model required."}</p>
    <div className="inquiry-channel-actions">
      <button className="whatsapp-button" type="button" onClick={() => window.open(whatsappInquiryUrl(message), "_blank", "noopener,noreferrer")} data-analytics-event="whatsapp_click" data-analytics-location={location}>Continue in WhatsApp</button>
      <button className="email-button" type="button" onClick={() => { window.location.href = emailInquiryUrl(message); }} data-analytics-event="email_click" data-analytics-location={location}>Continue by email</button>
      <button className="button button-outline" type="button" onClick={async () => {
        try { await navigator.clipboard.writeText(message); setCopied(true); } catch { setError(`Copy your requirements into an email to ${CONTACT_EMAIL}.`); }
      }}>{copied ? "Brief copied" : "Copy brief for webmail"}</button>
    </div>
    <p className="drawer-email-note">Email opens your mail app. If you use webmail, copy the brief and send it to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. WhatsApp and email drafts still need to be sent in their apps.</p>
  </div>;
}
