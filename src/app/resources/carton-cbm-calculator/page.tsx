import type { Metadata } from "next";
import { defaultSocialImage } from "../../../lib/page-metadata";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { CbmCalculator } from "../../../components/CbmCalculator";
import { JsonLd } from "../../../components/JsonLd";
import { OpenInquiryButton } from "../../../components/InquiryProvider";
import { GENERAL_WHATSAPP_URL } from "../../../lib/contact";

const pageUrl = "https://anwellup.com/resources/carton-cbm-calculator/";

const questions = [
  {
    question: "How do I calculate CBM for cartons?",
    answer: "Convert the outside carton length, width and height to metres, multiply those three values, then multiply by the number of cartons. The result is the total shipment volume in cubic metres.",
  },
  {
    question: "Should I use inside or outside carton dimensions?",
    answer: "Use the finished outside carton dimensions for shipment volume planning because the carrier and warehouse handle the external package. Product-fit calculations use a different set of internal measurements.",
  },
  {
    question: "Does CBM tell me exactly how many cartons fit in a container?",
    answer: "No. CBM is a volume reference. Actual loading also depends on carton orientation, unused gaps, pallet configuration, weight distribution, container limits and the loading method.",
  },
  {
    question: "Can I calculate CBM in centimetres, millimetres or inches?",
    answer: "Yes. Select one unit and enter all three dimensions in that unit. The calculator converts them to metres before calculating cubic volume.",
  },
  {
    question: "What packaging information should I request with carton CBM?",
    answer: "Request pieces per inner pack, inner packs per carton, outside carton dimensions, gross and net weight, product quantity by model and any separate packing for lids or accessories.",
  },
];

export const metadata: Metadata = {
  title: "Carton CBM Calculator for Food Packaging Shipments",
  description: "Calculate carton CBM, total shipment volume, cubic feet and gross weight for wholesale food packaging orders using centimetres, millimetres or inches.",
  alternates: { canonical: "/resources/carton-cbm-calculator/" },
  openGraph: {
    title: "Carton CBM Calculator for Food Packaging Shipments | ANWELLUP",
    description: "A free browser-based carton volume calculator for food packaging buyers preparing shipment and quotation requirements.",
    url: "/resources/carton-cbm-calculator/",
    images: [defaultSocialImage],
    type: "website",
  },
};

export default function CartonCbmCalculatorPage() {
  return <main id="main-content" className="page-main cbm-page">
    <JsonLd data={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://anwellup.com/" },
          { "@type": "ListItem", position: 2, name: "Carton CBM calculator", item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Carton CBM calculator for food packaging shipments",
        description: metadata.description,
        inLanguage: "en",
        dateModified: "2026-09-15",
        author: { "@id": "https://anwellup.com/#organization" },
        reviewedBy: { "@id": "https://anwellup.com/#organization" },
        isPartOf: { "@id": "https://anwellup.com/#website" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: { "@id": `${pageUrl}#application` },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "@id": `${pageUrl}#application`,
        name: "ANWELLUP Carton CBM Calculator",
        url: pageUrl,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@id": "https://anwellup.com/#organization" },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#questions`,
        url: `${pageUrl}#questions`,
        mainEntity: questions.map(item => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ]}/>
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">CBM calculator</span></nav>
    <header className="cbm-hero">
      <div>
        <span className="eyebrow">Free food packaging tool</span>
        <h1>Carton CBM calculator.</h1>
      </div>
      <div className="cbm-hero-copy">
        <p>Calculate carton volume before comparing food packaging quotations, case packs and freight requirements.</p>
        <a className="editorial-link" href="#calculator">Open the calculator <span><ArrowDown size={18}/></span></a>
      </div>
    </header>
    <div id="calculator"><CbmCalculator/></div>
    <section className="cbm-method" aria-labelledby="cbm-method-title">
      <div>
        <h2 id="cbm-method-title">The formula is simple. The inputs still matter.</h2>
        <p>Use the finished outside dimensions of one shipping carton. Keep all measurements in the selected unit and use the confirmed export carton quantity.</p>
      </div>
      <div className="cbm-formula" aria-label="CBM calculation formula">
        <code>length × width × height</code>
        <span>CBM per carton</span>
        <code>CBM per carton × cartons</code>
        <span>Total shipment CBM</span>
      </div>
    </section>
    <section className="cbm-boundaries" aria-labelledby="cbm-boundaries-title">
      <header><span className="eyebrow">Before requesting freight</span><h2 id="cbm-boundaries-title">Volume is one part of the packing brief.</h2></header>
      <div>
        <article><h3>Confirm the carton.</h3><p>Ask for finished outside dimensions, pieces per carton and whether bases, lids or accessories ship separately.</p></article>
        <article><h3>Record the weight.</h3><p>Add gross and net weight by carton. A volume result does not override carrier or container weight limits.</p></article>
        <article><h3>Review the load plan.</h3><p>Pallets, carton orientation, loading gaps and mixed products change the usable space in a real shipment.</p></article>
        <article><h3>Freeze the quotation basis.</h3><p>Keep SKU, packing, carton dimensions, quantity, destination and trade term attached to the supplier response.</p></article>
      </div>
    </section>
    <section id="questions" className="resource-questions cbm-questions" aria-labelledby="cbm-questions-title">
      <header><h2 id="cbm-questions-title">Carton CBM questions.</h2></header>
      <dl>{questions.map(item => <div key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}</dl>
    </section>
    <section className="cbm-resource-links" aria-labelledby="cbm-next-title">
      <div><h2 id="cbm-next-title">Keep planning with the same shipment basis.</h2><p>Move from carton volume to a complete, model-specific food packaging enquiry.</p></div>
      <div>
        <Link href="/resources/food-packaging-rfq-template/">Download the RFQ template <ArrowUpRight size={18}/></Link>
        <Link href="/guides/food-packaging-rfq-checklist/">Read the RFQ checklist <ArrowUpRight size={18}/></Link>
        <Link href="/guides/food-packaging-moq-guide/">Understand packaging MOQ <ArrowUpRight size={18}/></Link>
      </div>
    </section>
    <section className="family-next-step"><div><h2>Need packing details for a quotation?</h2><p>Share the product, quantity and destination. We can identify the carton fields that still require confirmation.</p></div><div className="category-next-actions"><OpenInquiryButton className="button button-orange">Build an RFQ <ArrowRight size={18}/></OpenInquiryButton><a className="button button-outline" href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location="cbm_calculator"><WhatsappLogo size={19} weight="fill"/> WhatsApp</a></div></section>
  </main>;
}
