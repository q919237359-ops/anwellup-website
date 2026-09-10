import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { equipmentFamilies } from "../../catalog";
import { AddToInquiryButton, OpenInquiryButton } from "../../components/InquiryProvider";
import { JsonLd } from "../../components/JsonLd";
import { ScrollMotion } from "../../components/ScrollMotion";

export const metadata: Metadata = {
  title: "Food Packaging Manufacturing & Equipment",
  description: "Review attributed packaging-factory imagery and prepare aluminium-container line, mould and collection-equipment enquiries with a clear verification path.",
  alternates: { canonical: "/manufacturing/" },
  openGraph: {
    title: "Food Packaging Manufacturing & Equipment | ANWELLUP",
    description: "See attributed production imagery and define equipment projects from the target format, process and verification requirements.",
    url: "/manufacturing/",
    type: "website",
    images: [{ url: "/assets/manufacturing/2026-09-source/aluminium-factory-overview-source.webp", width: 720, height: 362, alt: "Ningbo Times aluminium packaging facility exterior from a supplied source catalogue" }],
  },
  twitter: { card: "summary_large_image", images: ["/assets/manufacturing/2026-09-source/aluminium-factory-overview-source.webp"] },
};

const sourceRoot = "/assets/manufacturing/2026-09-source";

const factoryEvidence = [
  { file: "plastic-blister-injection-malaysia-source.webp", title: "Forming and moulding", body: "Plastic blister and injection-moulding equipment shown in the source catalogue.", location: "Kuala Lumpur", width: 176, height: 127 },
  { file: "paper-cup-line-kunming-source.webp", title: "Paper-format production", body: "Paper cup, bowl and box production equipment shown in the source catalogue.", location: "Yunnan · Kunming", width: 180, height: 153 },
  { file: "bag-production-chuzhou-source.webp", title: "Bag conversion", body: "Production equipment associated with carry-bag conversion in the source catalogue.", location: "Anhui · Chuzhou", width: 211, height: 126 },
  { file: "coated-paper-floor-philadelphia-source.webp", title: "Material handling", body: "Coated-paper reels and production-floor handling shown in the source catalogue.", location: "Philadelphia", width: 185, height: 155 },
  { file: "injection-moulding-cangzhou-source.webp", title: "Production layout", body: "Injection-moulding and plastic-blister production hall shown in the source catalogue.", location: "Hebei · Cangzhou", width: 175, height: 125 },
  { file: "plastic-blister-injection-sichuan-source.webp", title: "Equipment floor", body: "Multiple packaging-production workstations shown in the source catalogue.", location: "Sichuan · Lezhi", width: 185, height: 172 },
];

const verificationSteps = [
  { title: "Define the target", body: "Start with the container format, material, dimensions, output target, destination and the process the equipment needs to support." },
  { title: "Identify the source", body: "Confirm the proposed supplier, facility, equipment model and relationship to the photographs or catalogue information being reviewed." },
  { title: "Review the configuration", body: "Record line scope, mould, forming, feeding, collection, utilities, installation, training, spares and any interface with existing equipment." },
  { title: "Freeze the evidence", body: "Before commitment, align the written specification, sample output, inspection or acceptance plan, commercial terms and service responsibilities." },
];

export default function ManufacturingPage() {
  const pageUrl = "https://anwellup.com/manufacturing/";
  return <ScrollMotion variant="manufacturing"><main id="main-content" className="manufacturing-page">
    <JsonLd data={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://anwellup.com/" },
          { "@type": "ListItem", position: 2, name: "Manufacturing and equipment", item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Food packaging manufacturing and equipment",
        description: metadata.description,
        isPartOf: { "@id": "https://anwellup.com/#website" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: `https://anwellup.com${sourceRoot}/aluminium-factory-overview-source.webp`,
          caption: "Ningbo Times aluminium packaging facility exterior from a supplied source catalogue.",
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: equipmentFamilies.length,
          itemListElement: equipmentFamilies.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, description: item.description })),
        },
      },
    ]} />

    <header className="manufacturing-hero">
      <div className="manufacturing-hero-copy">
        <span className="eyebrow">Manufacturing / source evidence</span>
        <h1><span className="manufacturing-title-line title-mask"><span>Production,</span></span><span className="manufacturing-title-line title-mask"><span>shown with</span></span><span className="manufacturing-title-line title-mask"><span><em>context.</em></span></span></h1>
        <p>See how paper, plastic, bag and aluminium formats move through forming, conversion and handling. Every facility image keeps its source context; each equipment project starts from a written brief.</p>
        <a className="manufacturing-jump" href="#factory-evidence">Review the evidence <ArrowDown size={18}/></a>
      </div>
      <figure className="manufacturing-hero-media" data-manufacturing-hero-media>
        <img src={`${sourceRoot}/aluminium-factory-overview-source.webp`} alt="Ningbo Times aluminium packaging facility exterior from the supplied source catalogue" width={720} height={362} fetchPriority="high"/>
        <figcaption><span>Catalogue source</span><strong>Ningbo Times Aluminium Foil Technology Corp., Ltd.</strong><small>Facility relationship, equipment scope and project availability are confirmed separately.</small></figcaption>
      </figure>
      <dl className="manufacturing-facts" aria-label="Manufacturing page evidence summary">
        <div><dt>Attributed facility views</dt><dd>{String(factoryEvidence.length).padStart(2, "0")}</dd></div>
        <div><dt>Equipment enquiry families</dt><dd>{String(equipmentFamilies.length).padStart(2, "0")}</dd></div>
        <div><dt>Verification checkpoints</dt><dd>{String(verificationSteps.length).padStart(2, "0")}</dd></div>
      </dl>
    </header>

    <section className="factory-evidence" id="factory-evidence" aria-labelledby="factory-evidence-title">
      <header className="section-heading">
        <div><span className="eyebrow">Attributed production views</span><h2 id="factory-evidence-title">Six views.<br/>Each one sourced.</h2></div>
        <p>These catalogue extracts show process categories and named locations. They support an initial discussion; they do not establish ANWELLUP ownership, capacity, certification or product suitability.</p>
      </header>
      <div className="evidence-grid">
        {factoryEvidence.map((item, index) => <figure className="evidence-card" data-reveal key={item.file}>
          <div className="evidence-image"><img src={`${sourceRoot}/${item.file}`} alt={`${item.title} in ${item.location}, shown in the supplied source catalogue`} width={item.width} height={item.height} loading="lazy"/></div>
          <figcaption><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.location} · {item.body}</p></div></figcaption>
        </figure>)}
      </div>
      <p className="evidence-source-note">Source boundary: production views are attributed to the supplied CNYU PACK catalogue. Confirm the proposed supplier, site, relationship and project scope in writing.</p>
    </section>

    <section className="equipment-projects" aria-labelledby="equipment-projects-title">
      <header className="equipment-projects-heading" data-reveal>
        <span className="eyebrow">Equipment enquiries</span>
        <h2 id="equipment-projects-title">Configure the line around the <em>format.</em></h2>
        <p>Start from the target aluminium container, intended output and required automation. The correct conversation includes the mould, line, collection route, utilities and service scope—not only one machine name.</p>
      </header>
      <div>
        <div className="equipment-project-grid">
          {equipmentFamilies.map((item, index) => <article className="equipment-project-card" data-reveal key={item.sku}>
            <span>{String(index + 1).padStart(2, "0")}</span><code>{item.sku}</code><h3>{item.name}</h3><p>{item.description}</p><AddToInquiryButton compact item={{ sku: item.sku, name: item.name, category: "Equipment" }}/>
          </article>)}
        </div>
        <p className="equipment-scope-note">Equipment names describe enquiry categories. Supplier, model, performance, price, delivery, installation and after-sales scope require a project-specific written quotation.</p>
      </div>
    </section>

    <section className="manufacturing-verification" aria-labelledby="manufacturing-verification-title">
      <div data-reveal><span className="eyebrow">Before commitment</span><h2 id="manufacturing-verification-title">Verify the project, not the photograph.</h2></div>
      <ol>{verificationSteps.map((item, index) => <li className="verification-step" data-reveal key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol>
    </section>

    <section className="family-next-step manufacturing-next-step" data-reveal>
      <div><span className="eyebrow">Equipment project brief</span><h2>Bring the format, output and destination.</h2><p>Share the target container, drawing or sample, expected output, automation scope, utilities, destination and required support. We will return the questions that still need confirmation.</p></div>
      <div className="category-next-actions"><OpenInquiryButton className="button button-orange">Build an equipment RFQ <ArrowRight size={18}/></OpenInquiryButton><Link className="button button-outline" href="/quality-compliance/">Review quality approach <ArrowRight size={18}/></Link></div>
    </section>
  </main></ScrollMotion>;
}
