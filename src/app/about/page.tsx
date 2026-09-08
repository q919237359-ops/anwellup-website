import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "../../components/JsonLd";
import { OpenInquiryButton } from "../../components/InquiryProvider";

export const metadata: Metadata = {
  title: "About ANWELLUP",
  description: "Learn how ANWELLUP organizes food-packaging catalogue information, attributes source material and confirms model-specific commercial details.",
  alternates: { canonical: "/about/" },
};

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
    <header className="page-hero"><span className="eyebrow">About ANWELLUP</span><h1>A clearer route<br/>from range to brief.</h1><p>ANWELLUP is an English-language B2B catalogue and enquiry service for professional food-packaging sourcing. It brings product families, buyer guidance and project questions into one reviewable path.</p></header>
    <section className="quality-review" id="content-method"><div><span className="eyebrow">Content method</span><h2>Useful detail.<br/>Visible boundaries.</h2><p>Our pages are designed to help a buyer compare formats and prepare a more precise enquiry—not to replace model-specific confirmation.</p></div><ol>{methodSteps.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section>
    <section className="quality-records"><h2>What you can<br/>verify here.</h2><div><p>Browse seven product categories, compare public AW references and use the buying guides to define material, size, application, packing and destination requirements.</p><p className="quality-records-note">ANWELLUP does not use catalogue photography as proof of factory ownership, certification or suitability. Where a source catalogue is identified, the relationship and project scope remain subject to written confirmation.</p><Link className="editorial-link" href="/guides/">Read the buying guides <span><ArrowRight size={19}/></span></Link></div></section>
    <section className="family-next-step"><div><h2>Bring us the application.</h2><p>Share the product, quantity, destination and intended use. We will use that context to discuss the next confirmation steps.</p></div><OpenInquiryButton className="button button-orange">Enquire <ArrowRight size={18}/></OpenInquiryButton></section>
  </main>;
}
