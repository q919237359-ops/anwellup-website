import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { equipmentFamilies } from "../../catalog";
import { AddToInquiryButton, OpenInquiryButton } from "../../components/InquiryProvider";
import { JsonLd } from "../../components/JsonLd";
import { ScrollMotion } from "../../components/ScrollMotion";

export const metadata: Metadata = {
  title: "Food Packaging Manufacturing & Equipment",
  description: "Review real factory and equipment photography from supplied catalogues, then prepare aluminium-container line, mould and collection-equipment enquiries.",
  alternates: { canonical: "/manufacturing/" },
  openGraph: {
    title: "Food Packaging Manufacturing & Equipment | ANWELLUP",
    description: "See real factory and equipment photography from supplied catalogues and define projects from the target format, process and verification requirements.",
    url: "/manufacturing/",
    type: "website",
    images: [{ url: "/assets/manufacturing/2026-09-clean/factory-overview-signage-removed-v2.webp", width: 1770, height: 889, alt: "Aluminium packaging facility exterior from a supplied source catalogue" }],
  },
  twitter: { card: "summary_large_image", images: ["/assets/manufacturing/2026-09-clean/factory-overview-signage-removed-v2.webp"] },
};

const cleanRoot = "/assets/manufacturing/2026-09-clean";

const factoryEvidence = [
  { file: "foshan-factory-signage-removed-v2.webp", root: cleanRoot, title: "Foshan factory exterior", body: "Exterior, loading yard and site context from the supplied company catalogue.", location: "Foshan · Guangdong", width: 1797, height: 875, treatment: "Identifying facade signage removed" },
  { file: "hubei-production-floor-restored.webp", root: cleanRoot, title: "Hubei production floor", body: "Production hall with installed equipment and overhead services visible in the supplied photograph.", location: "Hubei", width: 1455, height: 1081, treatment: "Clarity restored from supplied photograph" },
  { file: "sichuan-production-floor-restored.webp", root: cleanRoot, title: "Sichuan production floor", body: "Multi-line production-floor view retained from the supplied company catalogue.", location: "Sichuan", width: 1586, height: 992, treatment: "Clarity restored from supplied photograph" },
  { file: "mould-storage-room.webp", root: cleanRoot, title: "Mould storage", body: "Organised tooling and mould storage shown as part of the production environment.", location: "Factory floor", width: 1100, height: 577, treatment: "Original catalogue photograph" },
  { file: "aluminium-line-workshop.webp", root: cleanRoot, title: "Aluminium container workshop", body: "A wide workshop view showing installed aluminium-container production equipment.", location: "Production floor", width: 1487, height: 676, treatment: "Original catalogue photograph" },
];

const equipmentEvidence = [
  { file: "aluminium-production-line-studio-v2.webp", label: "Complete production-line configuration", width: 1398, height: 1125 },
  { file: "aluminium-container-moulds-studio-v2.webp", label: "Six aluminium-container mould references", width: 1536, height: 1024 },
  { file: "automatic-collection-equipment-studio-v2.webp", label: "Collection and control equipment references", width: 1536, height: 1024 },
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
          contentUrl: `https://anwellup.com${cleanRoot}/factory-overview-signage-removed-v2.webp`,
          caption: "Aluminium packaging facility exterior from a supplied source catalogue; identifying rooftop signage removed.",
        },
        associatedMedia: factoryEvidence.map((item) => ({
          "@type": "ImageObject",
          contentUrl: `https://anwellup.com${item.root}/${item.file}`,
          caption: `${item.title}, ${item.location}. ${item.treatment}.`,
        })),
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
        <p>Review real production-floor and equipment photography from the supplied catalogues. Each image keeps its source context, while every equipment project begins with a written format and output brief.</p>
        <a className="manufacturing-jump" href="#factory-evidence">Review the evidence <ArrowDown size={18}/></a>
      </div>
      <figure className="manufacturing-hero-media" data-manufacturing-hero-media>
        <img src={`${cleanRoot}/factory-overview-signage-removed-v2.webp`} alt="Aluminium packaging facility exterior from the supplied source catalogue" width={1770} height={889} fetchPriority="high"/>
        <figcaption><span>Catalogue source</span><strong>Supplied aluminium-packaging facility photograph</strong><small>Identifying rooftop signage removed. Facility relationship and project availability are confirmed separately.</small></figcaption>
      </figure>
      <dl className="manufacturing-facts" aria-label="Manufacturing page evidence summary">
        <div><dt>Real factory views</dt><dd>{String(factoryEvidence.length).padStart(2, "0")}</dd></div>
        <div><dt>Equipment references</dt><dd>{String(equipmentFamilies.length).padStart(2, "0")}</dd></div>
        <div><dt>Verification checkpoints</dt><dd>{String(verificationSteps.length).padStart(2, "0")}</dd></div>
      </dl>
    </header>

    <section className="factory-evidence" id="factory-evidence" aria-labelledby="factory-evidence-title">
      <header className="section-heading">
        <div><span className="eyebrow">Real production views</span><h2 id="factory-evidence-title">Facilities,<br/>not renders.</h2></div>
        <p>These are photographs from the supplied aluminium-foil company catalogue. Two low-resolution production-floor views received conservative clarity restoration; identifying signage is removed where required.</p>
      </header>
      <div className="evidence-grid">
        {factoryEvidence.map((item, index) => <figure className="evidence-card" data-reveal key={item.file}>
          <div className="evidence-image"><img src={`${item.root}/${item.file}`} alt={`${item.title} in ${item.location}, shown in the supplied aluminium-foil catalogue`} width={item.width} height={item.height} loading="lazy"/></div>
          <figcaption><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.location} · {item.body}</p><small>{item.treatment}</small></div></figcaption>
        </figure>)}
      </div>
      <p className="evidence-source-note">Source: supplied aluminium-foil company catalogue (2020 edition). Confirm the proposed facility, equipment scope, current capacity and project relationship in writing.</p>
    </section>

    <section className="equipment-projects" aria-labelledby="equipment-projects-title">
      <header className="equipment-projects-heading" data-reveal>
        <span className="eyebrow">Equipment enquiries</span>
        <h2 id="equipment-projects-title">Configure the line around the <em>format.</em></h2>
        <p>Start from the target aluminium container, intended output and required automation. The correct conversation includes the mould, line, collection route, utilities and service scope—not only one machine name.</p>
      </header>
      <div>
        <div className="equipment-project-grid">
          {equipmentFamilies.map((item, index) => {
            const media = equipmentEvidence[index];
            return <article className="equipment-project-card" data-reveal key={item.sku}>
              <figure className="equipment-project-media"><img src={`${cleanRoot}/${media.file}`} alt={`${media.label} isolated from the supplied equipment catalogue`} width={media.width} height={media.height} loading="lazy"/></figure>
              <div className="equipment-project-copy"><span>{String(index + 1).padStart(2, "0")}</span><code>{item.sku}</code><small>{media.label} · catalogue subject isolated onto a neutral backdrop</small><h3>{item.name}</h3><p>{item.description}</p><AddToInquiryButton compact item={{ sku: item.sku, name: item.name, category: "Equipment" }}/></div>
            </article>;
          })}
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
