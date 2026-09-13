import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "../../components/JsonLd";
import { OpenInquiryButton } from "../../components/InquiryProvider";
import { GENERAL_WHATSAPP_URL, WHATSAPP_DISPLAY } from "../../lib/contact";

const contactQuestions = [
  {
    question: "Can I request a food packaging quote without an exact SKU?",
    answer: "Yes. Share the closest format, intended use, dimensions or capacity, material preference, quantity and destination. A reference image or sample can support identification, but the exact model is confirmed before final terms.",
  },
  {
    question: "Which details produce a more useful wholesale quotation?",
    answer: "Include quantity by model, customization, packing, destination, document needs and target timing in addition to the product specification. Clearly label any field that is still open for supplier input.",
  },
  {
    question: "Does sending an enquiry confirm MOQ, price or availability?",
    answer: "No. MOQ, price, availability, samples, documents and lead time are confirmed in a current written quotation for the selected specification and project scope.",
  },
  {
    question: "Can I ask about several food packaging categories in one enquiry?",
    answer: "Yes. List each product or model on a separate line and state quantities and customization by item. This keeps component matching, case packing and commercial comparisons clear.",
  },
];

export const metadata: Metadata = {
  title: "Request a Food Packaging Quote",
  description: "Request a wholesale food packaging quote from ANWELLUP. Send the product, application, quantity, customization, destination and document requirements.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Request a Food Packaging Quote | ANWELLUP",
    description: "Prepare a model-level wholesale food packaging enquiry and continue directly in WhatsApp.",
    url: "/contact/",
    type: "website",
  },
};

export default function ContactPage() {
  const pageUrl = "https://anwellup.com/contact/";
  return <main id="main-content" className="page-main contact-page">
    <JsonLd data={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://anwellup.com/" },
          { "@type": "ListItem", position: 2, name: "Request a quote", item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${pageUrl}#contactpage`,
        url: pageUrl,
        name: "Request a wholesale food packaging quote",
        description: metadata.description,
        inLanguage: "en",
        dateModified: "2026-09-13",
        isPartOf: { "@id": "https://anwellup.com/#website" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: { "@id": "https://anwellup.com/#organization" },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#questions`,
        url: `${pageUrl}#questions`,
        mainEntity: contactQuestions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ]} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Request a quote</span></nav>
    <header className="page-hero contact-hero"><span className="eyebrow">Wholesale food packaging enquiry</span><h1>Request a model-level quote.</h1><p>Share what you know about the product, application, quantity and destination. We will use those details to identify the specification, evidence and commercial fields that still need confirmation.</p></header>
    <section className="contact-panel" aria-label="Contact and enquiry options"><div className="contact-method"><span className="eyebrow">Direct conversation</span><h2>Continue in WhatsApp.</h2><a href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location="contact_page"><WhatsappLogo size={30} weight="fill"/><span><strong>{WHATSAPP_DISPLAY}</strong><small>Open a new WhatsApp conversation</small></span><ArrowRight size={21}/></a><p>Use WhatsApp for a product question, customization brief, sample request or equipment enquiry.</p></div><div className="brief-checklist"><span className="eyebrow">Structured RFQ</span><h2>Start with the fields you know.</h2><p>The enquiry builder keeps selected products and project context together in one message.</p><ul><li>Product, format or ANWELLUP SKU</li><li>Food, application and destination</li><li>Dimensions, capacity and material</li><li>Quantity by model or order</li><li>Artwork, packing and document needs</li><li>Target timing or delivery context</li></ul><OpenInquiryButton className="button button-dark">Build an RFQ <ArrowRight size={18}/></OpenInquiryButton></div></section>
    <section className="contact-preparation" aria-labelledby="contact-preparation-title"><header><span className="eyebrow">Before you send</span><h2 id="contact-preparation-title">A clearer brief produces a more comparable answer.</h2><p>These references help separate product selection, evidence and commercial terms before a supplier comparison.</p></header><div>
      <Link href="/products/"><span>01</span><strong>Choose the closest product family</strong><small>Browse 33 published product families and their model references.</small><ArrowUpRight size={18}/></Link>
      <Link href="/guides/food-packaging-rfq-checklist/"><span>02</span><strong>Use the complete RFQ checklist</strong><small>Organize product, application, customization, quantity and delivery.</small><ArrowUpRight size={18}/></Link>
      <Link href="/solutions/food-packaging-sourcing-china/"><span>03</span><strong>Plan sourcing from China</strong><small>Connect supplier identity, samples, documents, packing and shipment.</small><ArrowUpRight size={18}/></Link>
      <Link href="/buyer-faq/"><span>04</span><strong>Review common buyer questions</strong><small>Get concise answers on materials, MOQ, samples and lead time.</small><ArrowUpRight size={18}/></Link>
    </div></section>
    <section id="questions" className="contact-questions" aria-labelledby="contact-questions-title"><header><span className="eyebrow">Buyer questions</span><h2 id="contact-questions-title">Before you request a quote.</h2></header><dl>{contactQuestions.map((item) => <div key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}</dl></section>
  </main>;
}
