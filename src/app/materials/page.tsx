import type { Metadata } from "next";
import Link from "next/link";
import { materialPages, materialFamilies } from "../../materials";
import { OpenInquiryButton } from "../../components/InquiryProvider";

export const metadata: Metadata = { title: "Food Packaging Materials: Bagasse, Paper & Aluminium", description: "Compare bagasse, paper and aluminium food packaging using real catalogue formats. Review coatings, lids, samples and destination needs before a wholesale enquiry.", alternates: { canonical: "/materials/" } };
export default function MaterialsPage() {
  return <main id="main-content" className="page-main materials-page">
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Materials</span></nav>
    <header className="page-hero"><span className="eyebrow">Foodservice & wholesale sourcing</span><h1>Compare food packaging materials.</h1><p>Start with the food, format and destination. These material ranges bring catalogue products together for a practical comparison of sizes, construction and quotation requirements.</p></header>
    <div className="material-cards">{materialPages.map(material => <article key={material.slug}><span className="eyebrow">{materialFamilies(material).length} product families</span><h2><Link href={`/materials/${material.slug}/`}>{material.name}</Link></h2><p>{material.introduction}</p><Link className="editorial-link" href={`/materials/${material.slug}/`}>Compare models →</Link></article>)}</div>
    <section className="material-note"><h2>Replacing single-use plastic?</h2><p>Consider the entire pack, including coatings, lids and liners. A material description alone does not establish destination-market eligibility or an environmental claim.</p><Link href="/guides/single-use-plastic-packaging-alternatives/">Read the buyer checklist and official sources →</Link></section>
    <section className="family-next-step"><div><h2>Bring your packaging requirement.</h2><p>Tell us your food, quantity, destination and any material restrictions.</p></div><OpenInquiryButton>Request a quote</OpenInquiryButton></section>
  </main>;
}
