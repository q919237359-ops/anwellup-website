import type { Metadata } from "next";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { OpenInquiryButton } from "../../components/InquiryProvider";
import { GENERAL_WHATSAPP_URL, WHATSAPP_DISPLAY } from "../../lib/contact";

export const metadata: Metadata = { title: "Contact", description: "Contact ANWELLUP with a product SKU, destination market, intended application and estimated quantity.", alternates: { canonical: "/contact/" } };

export default function ContactPage() {
  return <main id="main-content" className="page-main contact-page">
    <header className="page-hero"><span className="eyebrow">Contact ANWELLUP</span><h1>Let’s talk packaging.</h1><p>Share your product, market and quantity. We can work through the details together.</p></header>
    <section className="contact-panel"><div className="contact-method"><h2>A direct conversation.</h2><a href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><WhatsappLogo size={30} weight="fill"/><span><strong>{WHATSAPP_DISPLAY}</strong><small>Continue in WhatsApp</small></span><ArrowRight size={21}/></a><p>Ask about a product, discuss customization or share an equipment enquiry.</p></div><div className="brief-checklist"><h2>What are you looking for?</h2><p>A few details help us understand your project. Start with what you know.</p><ul><li>Product or ANWELLUP SKU</li><li>Destination and intended use</li><li>Quantity and timing</li><li>Artwork or packing requirements</li></ul><OpenInquiryButton className="button button-dark">Enquire <ArrowRight size={18}/></OpenInquiryButton></div></section>
  </main>;
}
