import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "../../../components/JsonLd";
import { buyingGuides, getBuyingGuide } from "../../../guides";
import { OpenInquiryButton } from "../../../components/InquiryProvider";
import { GENERAL_WHATSAPP_URL } from "../../../lib/contact";
import { catalogCategories, productFamilies } from "../../../catalog";

const modelLinks = new Map(productFamilies.flatMap(family => {
  const category = catalogCategories.find(item => item.id === family.category)!;
  return family.variants.map(variant => [variant.sku, `/products/${category.slug}/${family.id}/#model-${variant.sku}`] as const);
}));

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
    twitter: { card: "summary_large_image", title: `${guide.seoTitle} | ANWELLUP`, description: guide.description, images: [guide.image] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getBuyingGuide(slug);
  if (!guide) notFound();
  const isWideComparison = (guide.comparison?.columns.length ?? 0) >= 3;
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
        image: { "@type": "ImageObject", url: `https://anwellup.com${guide.image}`, contentUrl: `https://anwellup.com${guide.image}`, width: guide.imageWidth, height: guide.imageHeight, caption: guide.imageCaption ?? guide.imageAlt },
        datePublished: guide.published,
        dateModified: guide.updated,
        inLanguage: "en",
        author: { "@id": "https://anwellup.com/#organization", name: "ANWELLUP", url: "https://anwellup.com/about/" },
        publisher: { "@id": "https://anwellup.com/#organization" },
        mainEntityOfPage: pageUrl,
        isPartOf: { "@id": "https://anwellup.com/#website" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        about: [guide.shortTitle, "Food packaging sourcing", "Wholesale packaging", "Request for quotation"],
        ...(guide.sources ? { citation: guide.sources.map(source => source.href) } : {}),
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
      <div className="guide-quick-action"><Link href="/contact/#send-enquiry">Need a quote for your packaging requirement? →</Link></div>
      <nav className="guide-jump-links" aria-label="Jump to a guide section"><a href="#guide-contents">Contents</a>{guide.comparison && <a href="#model-comparison">Model comparison</a>}<a href="#section-1">Read the guide</a><a href="#questions">Buyer questions</a><a href="#related-title">Related buying pages</a></nav>
      {guide.comparison && <div id="model-comparison" className={isWideComparison ? "guide-comparison guide-comparison-wide" : "guide-comparison"} tabIndex={0} role="region" aria-label={guide.comparison.caption} aria-describedby={isWideComparison ? "model-comparison-hint" : undefined}>
        {isWideComparison && <p className="guide-comparison-hint" id="model-comparison-hint">Swipe to compare all columns</p>}
        <table><caption><span>{guide.comparison.caption}</span></caption><thead><tr>{guide.comparison.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{guide.comparison.rows.map(row => <tr key={row[0]}>{row.map((cell, index) => {
          const href = /^AW-/.test(cell) ? modelLinks.get(cell) : undefined;
          const content = href ? <Link href={href}>{cell}</Link> : cell;
          return index === 0 ? <th scope="row" key={index}>{content}</th> : <td key={index}>{content}</td>;
        })}</tr>)}</tbody></table>
      </div>}
      <figure className={guide.imageSrcSet ? "guide-lead-figure guide-illustration-figure" : "guide-lead-figure"}><img src={guide.image} srcSet={guide.imageSrcSet} sizes={guide.imageSrcSet ? "(max-width: 700px) 100vw, (max-width: 1100px) 90vw, 1100px" : undefined} alt={guide.imageAlt} width={guide.imageWidth} height={guide.imageHeight}/><figcaption>{guide.imageCaption ?? "Reference image for this buyer guide. Confirm the selected model, evidence and specification with your enquiry."}{guide.imageSrcSet && <a href={guide.image} target="_blank" rel="noopener noreferrer" aria-label="View full-size illustration (opens in a new tab)">View full-size illustration <ArrowUpRight size={15}/></a>}</figcaption></figure>
      <div className="guide-layout">
        <aside id="guide-contents" aria-label="In this guide"><span className="eyebrow">In this guide</span><ol>{guide.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.heading}</a></li>)}</ol></aside>
        <div className="guide-body">
          {guide.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}>
            <span>{String(index + 1).padStart(2, "0")}</span><h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.checklist && <ul>{section.checklist.map((item) => <li key={item}>{item}</li>)}</ul>}
            {section.evidence && <dl className="guide-evidence">{section.evidence.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.href ? <Link href={item.href}>{item.value}<ArrowUpRight size={15}/></Link> : item.value}</dd></div>)}</dl>}
            {section.links && <div className="guide-inline-links">{section.links.map((item) => <Link className="guide-inline-link" href={item.href} key={item.href}>{item.label}<ArrowUpRight size={16}/></Link>)}</div>}
          </section>)}
          <section id="questions" className="guide-questions" aria-labelledby="guide-questions-title"><span>Q</span><h2 id="guide-questions-title">Common sourcing questions.</h2><dl>{guide.questions.map((item) => <div key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}</dl></section>
          {guide.sources && <section className="guide-sources"><h2>Sources and references</h2><p>Guide updated {guide.updated}. Confirm the current specification and any applicable requirements for your exact model and destination.</p><ul>{guide.sources.map(source => <li key={source.href}><a href={source.href}>{source.label}</a></li>)}</ul></section>}
        </div>
      </div>
    </article>
    <section className="guide-related" aria-labelledby="related-title"><div><span className="eyebrow">Continue the brief</span><h2 id="related-title">Related product and sourcing pages.</h2></div><div>{guide.related.map((item) => <Link href={item.href} key={item.href}>{item.label}<ArrowUpRight size={19}/></Link>)}</div></section>
    <section className="family-next-step"><div><h2>Turn the brief into an enquiry.</h2><p>Share the product, application, quantity and destination. Final specifications and commercial terms are confirmed for the selected model.</p></div><div className="category-next-actions"><OpenInquiryButton className="button button-orange">Build an RFQ <ArrowRight size={18}/></OpenInquiryButton><a className="button button-outline" href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location={`guide_${guide.slug}`}><WhatsappLogo size={19} weight="fill"/> WhatsApp</a></div></section>
  </main>;
}
