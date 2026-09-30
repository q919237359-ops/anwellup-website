import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { materialPages, materialFamilies, familyPath } from "../../../materials";
import { JsonLd } from "../../../components/JsonLd";
import { OpenInquiryButton } from "../../../components/InquiryProvider";
import { MaterialLinks } from "../../../components/MaterialLinks";

export function generateStaticParams() { return materialPages.map(material => ({ material: material.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ material: string }> }): Promise<Metadata> {
  const { material: slug } = await params;
  const material = materialPages.find(item => item.slug === slug);
  if (!material) return {};
  return { title: material.title, description: material.description, alternates: { canonical: `/materials/${slug}/` }, openGraph: { title: `${material.title} | ANWELLUP`, description: material.description, url: `/materials/${slug}/`, images: [{ url: materialFamilies(material)[0].image, alt: `${material.name} range illustration` }] } };
}
export default async function MaterialPage({ params }: { params: Promise<{ material: string }> }) {
  const { material: slug } = await params;
  const material = materialPages.find(item => item.slug === slug);
  if (!material) notFound();
  const families = materialFamilies(material);
  const url = `https://anwellup.com/materials/${slug}/`;
  return <main id="main-content" className="page-main materials-page">
    <JsonLd data={[
      { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${url}#collection`, url, name: material.title, description: material.description, dateModified: "2026-09-30", isPartOf: { "@id": "https://anwellup.com/#website" }, mainEntity: { "@type": "ItemList", numberOfItems: families.length, itemListElement: families.map((family, index) => ({ "@type": "ListItem", position: index + 1, name: family.name, url: `https://anwellup.com${familyPath(family)}` })) } },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://anwellup.com/" }, { "@type": "ListItem", position: 2, name: "Materials", item: "https://anwellup.com/materials/" }, { "@type": "ListItem", position: 3, name: material.name, item: url }] },
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: material.questions.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ]} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/materials/">Materials</Link><span>/</span><span aria-current="page">{material.name}</span></nav>
    <header className="page-hero material-hero"><span className="eyebrow">{families.length} families · {families.reduce((sum, family) => sum + family.variants.length, 0)} listed models</span><h1>{material.title}</h1><p>{material.introduction}</p><div className="procurement-actions"><OpenInquiryButton>Request a wholesale quote</OpenInquiryButton><a className="button button-outline" href="#material-formats">Compare formats</a></div></header>
    <section id="material-formats" className="material-formats" aria-labelledby="material-formats-title"><h2 id="material-formats-title">Formats, sizes and case packs.</h2><p>These entries come from the published catalogue. Follow a family for every listed model; verify final specifications, coatings and packing before ordering.</p>
      <div className="material-cards">{families.map(family => <article key={family.id}><span className="eyebrow">{family.variants.length} listed models</span><h3><Link href={familyPath(family)}>{family.name}</Link></h3><p>{family.summary}</p><dl><div><dt>Listed formats</dt><dd>{family.variants.slice(0, 4).map(variant => variant.label).join(" · ")}{family.variants.length > 4 ? " · More in model table" : ""}</dd></div><div><dt>Example case entry</dt><dd>{family.variants.find(variant => variant.pack)?.pack || "Request packing details"}</dd></div></dl><Link className="editorial-link" href={familyPath(family)}>Model specifications & enquiry →</Link></article>)}</div>
    </section>
    <section className="material-checks"><h2>Before you request samples.</h2><div className="material-cards">{material.checks.map(check => <article key={check.title}><h3>{check.title}</h3><p>{check.body}</p></article>)}</div></section>
    <section className="material-note"><h2>Buying for a market with plastic restrictions?</h2><p>Include the destination and exact product use in your brief. Coatings, liners and separate lids need their own material review.</p><Link href="/guides/single-use-plastic-packaging-alternatives/">Compare alternatives and check official rules →</Link></section>
    <section className="contact-questions"><h2>Common wholesale questions.</h2><dl>{material.questions.map(item => <div key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}</dl></section>
    <MaterialLinks />
    <section className="family-next-step"><div><h2>Get a quotation for your shortlist.</h2><p>Send the model or size, quantity, destination and food use. Ask for sample availability, MOQ, packing and current lead time.</p></div><Link className="button button-dark" href="/contact/#send-enquiry">Request a quote</Link></section>
  </main>;
}
