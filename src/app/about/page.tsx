import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "../../components/JsonLd";
import { OpenInquiryButton } from "../../components/InquiryProvider";
import { pageMetadata } from "../../lib/page-metadata";

export const metadata: Metadata = pageMetadata("About Our Food Packaging Sourcing Service", "Learn how ANWELLUP organizes food-packaging catalogue information, attributes source material and confirms model-specific commercial details.", "/about/");

const methodSteps = [
  ["Review the source", "Product names, images and available specifications are reviewed against supplied catalogue material."],
  ["Normalize the range", "Public AW references organize related formats without publishing private supplier-reference numbers."],
  ["Mark the boundary", "Range images support navigation. Model suitability, documents and facility relationships are not inferred from an image."],
  ["Confirm the project", "Specifications, claims, availability, MOQ, price and lead time are confirmed in writing for the selected model and destination."],
];

export default function AboutPage() {
  const pageUrl = "https://anwellup.com/about/";
  return <main id="main-content" className="page-main quality-editorial">
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${pageUrl}#page`,
      url: pageUrl,
      name: "About ANWELLUP",
      description: metadata.description,
      inLanguage: "en",
      isPartOf: { "@id": "https://anwellup.com/#website" },
      about: { "@id": "https://anwellup.com/#organization" },
      mainEntity: { "@id": "https://anwellup.com/#organization" },
    }} />
    <header className="page-hero"><span className="eyebrow">About ANWELLUP</span><h1>Food packaging sourcing<br/>for professional buyers.</h1><p>ANWELLUP helps distributors, foodservice operators and purchasing teams compare packaging formats and prepare wholesale enquiries. Browse bagasse, paper, aluminium and other materials, then discuss the specification, samples and quotation for your project.</p></header>
    <section className="material-note"><h2>What to expect from your enquiry.</h2><p>Start with the food, format, quantity and destination. Ask for a written response covering the selected product, matching components, sample availability, MOQ, packing and lead time. Before ordering, confirm the contracting company, production responsibility and model-specific documents in the quotation.</p><Link href="/contact/#send-enquiry">Contact the ANWELLUP sales team →</Link></section>
    <section className="quality-review" id="content-method"><div><span className="eyebrow">Content method</span><h2>Useful detail.<br/>Visible boundaries.</h2><p>Our pages are designed to help a buyer compare formats and prepare a more precise enquiry—not to replace model-specific confirmation.</p></div><ol>{methodSteps.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section>
    <section className="quality-records"><h2>What you can<br/>verify here.</h2><div><p>Browse seven product categories, compare public AW references and use the buying guides to define material, size, application, packing and destination requirements.</p><p className="quality-records-note">ANWELLUP does not use catalogue photography as proof of factory ownership, certification or suitability. Where a source catalogue is identified, the relationship and project scope remain subject to written confirmation.</p><Link className="editorial-link" href="/guides/">Read the buying guides <span><ArrowRight size={19}/></span></Link></div></section>
    <section className="family-next-step"><div><h2>Bring us the application.</h2><p>Share the product, quantity, destination and intended use. We will use that context to discuss the next confirmation steps.</p></div><OpenInquiryButton className="button button-orange">Enquire <ArrowRight size={18}/></OpenInquiryButton></section>
  </main>;
}
