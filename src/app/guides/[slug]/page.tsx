import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "../../../components/JsonLd";
import { buyingGuides, getBuyingGuide } from "../../../guides";
import { OpenInquiryButton } from "../../../components/InquiryProvider";
import { GENERAL_WHATSAPP_URL } from "../../../lib/contact";

export function generateStaticParams() {
  return buyingGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getBuyingGuide(slug);
  if (!guide) return {};
  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}/` },
    openGraph: {
      title: `${guide.seoTitle} | ANWELLUP`,
      description: guide.description,
      url: `/guides/${guide.slug}/`,
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      images: [{ url: guide.image, width: guide.imageWidth, height: guide.imageHeight, alt: guide.imageAlt }],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getBuyingGuide(slug);
  if (!guide) notFound();
  const pageUrl = `https://anwellup.com/guides/${guide.slug}/`;
  return <main id="main-content" className="page-main guide-page">
    <JsonLd data={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://anwellup.com/" },
          { "@type": "ListItem", position: 2, name: "Buying guides", item: "https://anwellup.com/guides/" },
          { "@type": "ListItem", position: 3, name: guide.title, item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        headline: guide.title,
        description: guide.description,
        image: `https://anwellup.com${guide.image}`,
        datePublished: guide.published,
        dateModified: guide.updated,
        inLanguage: "en",
        author: { "@id": "https://anwellup.com/#organization", name: "ANWELLUP", url: "https://anwellup.com/about/" },
        publisher: { "@id": "https://anwellup.com/#organization" },
        mainEntityOfPage: pageUrl,
        isPartOf: { "@id": "https://anwellup.com/#website" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        about: [guide.shortTitle, "Food packaging sourcing", "Wholesale packaging", "Request for quotation"],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#questions`,
        url: `${pageUrl}#questions`,
        mainEntity: guide.questions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ]} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/guides/"><ArrowLeft size={16}/> Buying guides</Link><span aria-hidden="true">/</span><span aria-current="page">{guide.shortTitle}</span></nav>
    <article>
      <header className="guide-hero">
        <div><span className="eyebrow">Buyer&apos;s guide / {guide.updated}</span><h1>{guide.title}</h1></div>
        <div className="guide-hero-summary"><p>{guide.lede}</p><p className="guide-byline">Prepared by ANWELLUP · <Link href="/about/#content-method">How this content is prepared</Link></p></div>
      </header>
      <figure className="guide-lead-figure"><img src={guide.image} alt={guide.imageAlt} width={guide.imageWidth} height={guide.imageHeight}/><figcaption>Reference image for this buyer guide. Confirm the selected model, evidence and specification with your enquiry.</figcaption></figure>
      <div className="guide-layout">
        <aside aria-label="In this guide"><span className="eyebrow">In this guide</span><ol>{guide.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.heading}</a></li>)}</ol></aside>
        <div className="guide-body">
          {guide.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}>
            <span>{String(index + 1).padStart(2, "0")}</span><h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.checklist && <ul>{section.checklist.map((item) => <li key={item}>{item}</li>)}</ul>}
            {section.evidence && <dl className="guide-evidence">{section.evidence.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.href ? <Link href={item.href}>{item.value}<ArrowUpRight size={15}/></Link> : item.value}</dd></div>)}</dl>}
            {section.links && <div className="guide-inline-links">{section.links.map((item) => <Link className="guide-inline-link" href={item.href} key={item.href}>{item.label}<ArrowUpRight size={16}/></Link>)}</div>}
          </section>)}
          <section id="questions" className="guide-questions" aria-labelledby="guide-questions-title"><span>Q</span><h2 id="guide-questions-title">Common sourcing questions.</h2><dl>{guide.questions.map((item) => <div key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}</dl></section>
        </div>
      </div>
    </article>
    <section className="guide-related" aria-labelledby="related-title"><div><span className="eyebrow">Continue the brief</span><h2 id="related-title">Related product and sourcing pages.</h2></div><div>{guide.related.map((item) => <Link href={item.href} key={item.href}>{item.label}<ArrowUpRight size={19}/></Link>)}</div></section>
    <section className="family-next-step"><div><h2>Turn the brief into an enquiry.</h2><p>Share the product, application, quantity and destination. Final specifications and commercial terms are confirmed for the selected model.</p></div><div className="category-next-actions"><OpenInquiryButton className="button button-orange">Build an RFQ <ArrowRight size={18}/></OpenInquiryButton><a className="button button-outline" href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location={`guide_${guide.slug}`}><WhatsappLogo size={19} weight="fill"/> WhatsApp</a></div></section>
  </main>;
}
