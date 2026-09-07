"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, List, WhatsappLogo, X } from "@phosphor-icons/react";
import { InquiryProvider, useInquiry } from "./InquiryProvider";
import { GENERAL_WHATSAPP_URL, WHATSAPP_DISPLAY, whatsappInquiryUrl } from "../lib/contact";

const navigation = [
  ["Range", "/products/"],
  ["Customization", "/capabilities/"],
  ["Manufacturing", "/manufacturing/"],
  ["Quality", "/quality-compliance/"],
  ["Contact", "/contact/"],
] as const;

function Wordmark() {
  return <span className="brand-wordmark" aria-hidden="true"><img src="/assets/brand/anwellup-logo-primary-orange-transparent.webp" alt="" /></span>;
}

function Header() {
  const pathname = usePathname();
  const { items, openInquiry } = useInquiry();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.querySelector<HTMLElement>(".menu-button")?.focus();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="ANWELLUP home">
          <Wordmark />
        </Link>
        <nav className="desktop-navigation" aria-label="Primary navigation">
          {navigation.map(([label, href]) => <Link className={pathname.startsWith(href) ? "active" : ""} aria-current={pathname.startsWith(href) ? "page" : undefined} href={href} key={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <button className="rfq-counter" type="button" onClick={openInquiry} aria-haspopup="dialog" aria-label={`Open RFQ list with ${items.length} items`}>
            Enquire <span>{String(items.length).padStart(2, "0")}</span>
          </button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Toggle navigation">
            {menuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && <nav id="mobile-menu" className="mobile-navigation" aria-label="Mobile navigation">
        {navigation.map(([label, href]) => <Link href={href} key={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}<ArrowRight size={18} /></Link>)}
      </nav>}
    </header>
  );
}

function InquiryDrawer() {
  const { items, isOpen, closeInquiry, removeItem, clearItems } = useInquiry();
  const panelRef = useRef<HTMLDivElement>(null);
  const [company, setCompany] = useState("");
  const [market, setMarket] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const background = Array.from(document.body.children).filter(element => element instanceof HTMLElement && !element.contains(panelRef.current)) as HTMLElement[];
    const main = document.getElementById("main-content");
    const siblings = [document.querySelector<HTMLElement>(".site-header"), main, document.querySelector<HTMLElement>(".site-footer"), ...background];
    const states = new Map(siblings.filter((element): element is HTMLElement => !!element).map(element => [element, element.inert]));
    states.forEach((_, element) => { element.inert = true; });
    panelRef.current?.focus();
    return () => {
      states.forEach((inert, element) => { element.inert = inert; });
      if (previousFocus?.isConnected && !previousFocus.matches(":disabled")) previousFocus.focus();
      else document.querySelector<HTMLElement>(".rfq-counter")?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); closeInquiry(); }
      if (event.key === "Tab" && panelRef.current) {
        const controls = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, textarea, [tabindex="0"]'));
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [closeInquiry, isOpen]);

  const message = useMemo(() => {
    const lines = [items.length ? "Hello ANWELLUP, I would like to review the following range:" : "Hello ANWELLUP, I would like to discuss a packaging project:", ""];
    items.forEach((item) => {
      lines.push(`- ${item.sku} | ${item.name}${item.variant ? ` | ${item.variant}` : ""}`);
    });
    lines.push("", `Company: ${company || "To be provided"}`, `Destination market: ${market || "To be provided"}`, `Estimated quantity: ${quantity || "To be provided"}`, `Notes: ${notes || "None"}`, "", "Please confirm the applicable specification, documentation, MOQ, price and lead time in writing.");
    return lines.join("\n");
  }, [items, company, market, quantity, notes]);

  if (!isOpen) return null;

  return <div className="drawer-layer" role="presentation">
    <button className="drawer-backdrop" type="button" tabIndex={-1} onClick={closeInquiry} aria-label="Close RFQ panel" />
    <aside className="inquiry-drawer" ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="rfq-title">
      <div className="drawer-heading">
        <div><h2 id="rfq-title">Your enquiry.</h2></div>
        <button type="button" onClick={closeInquiry} aria-label="Close RFQ panel"><X size={24} /></button>
      </div>
      <div className="drawer-content">
        {items.length === 0 ? <div className="drawer-empty">
          <p>Tell us what you need, or add products from the collection.</p><Link href="/products/" onClick={closeInquiry}>View the collection <ArrowRight size={17} /></Link>
        </div> : <>
          <ol className="inquiry-list" aria-live="polite">
            {items.map((item) => <li key={item.sku}><div><span>{item.category}</span><strong>{item.name}</strong><small>{item.sku}{item.variant ? ` · ${item.variant}` : ""}</small></div><button type="button" onClick={() => removeItem(item.sku)} aria-label={`Remove ${item.name}`}><X size={18} /></button></li>)}
          </ol>
          <button className="clear-list" type="button" onClick={clearItems}>Clear selection</button>
        </>}
          <div className="buyer-fields">
            <label><span>Company</span><input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company name" /></label>
            <label><span>Destination market</span><input value={market} onChange={(event) => setMarket(event.target.value)} placeholder="Country or region" /></label>
            <label><span>Estimated quantity</span><input value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Per order or annual" /></label>
            <label><span>Notes</span><textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Use, timing, artwork or packing context" rows={3} /></label>
          </div>
          <p className="drawer-disclaimer">Submitting an enquiry does not confirm specifications, availability, claims or commercial terms.</p>
          <a className="whatsapp-button" href={whatsappInquiryUrl(message)} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location="rfq_drawer"><WhatsappLogo size={21} weight="fill" /> Continue in WhatsApp <ArrowRight size={18} /></a>
      </div>
    </aside>
  </div>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <Link className="footer-brand" href="/" aria-label="ANWELLUP home"><Wordmark /><span>Food packaging for the way we serve, share and carry.</span></Link>
      <div className="footer-index">
        <span className="eyebrow">Navigate</span>
        {navigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </div>
      <div className="footer-note"><span className="eyebrow">Let’s talk packaging</span><a href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location="footer">{WHATSAPP_DISPLAY}</a><p>Share a product, an idea or your next project.</p></div>
    </div>
    <div className="footer-legal"><span>© 2026 ANWELLUP</span><div><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms</Link></div></div>
  </footer>;
}

function WhatsAppShortcut() {
  const { isOpen } = useInquiry();
  if (isOpen) return null;
  return <a className="whatsapp-float" href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location="floating_button" aria-label={`Chat with ANWELLUP on WhatsApp at ${WHATSAPP_DISPLAY}; opens in a new tab`}><WhatsappLogo size={25} weight="fill" aria-hidden="true" /><span>WhatsApp</span><ArrowRight size={17} aria-hidden="true" /></a>;
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return <InquiryProvider><Header />{children}<Footer /><WhatsAppShortcut /><InquiryDrawer /></InquiryProvider>;
}
