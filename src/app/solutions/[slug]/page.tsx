import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "../../../components/JsonLd";
import { OpenInquiryButton } from "../../../components/InquiryProvider";
import { GENERAL_WHATSAPP_URL } from "../../../lib/contact";
import { getSourcingSolution, sourcingSolutions } from "../../../solutions";

export function generateStaticParams() {
  return sourcingSolutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSourcingSolution(slug);
  if (!solution) return {};
  return {
    title: solution.seoTitle,
    description: solution.description,
    alternates: { canonical: `/solutions/${solution.slug}/` },
    openGraph: {
      title: `${solution.seoTitle} | ANWELLUP`,
      description: solution.description,
      url: `/solutions/${solution.slug}/`,
      type: "website",
      images: [{ url: solution.image, width: solution.imageWidth, height: solution.imageHeight, alt: solution.imageAlt }],
    },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSourcingSolution(slug);
  if (!solution) notFound();
  const pageUrl = `https://anwellup.com/solutions/${solution.slug}/`;
  return <main id="main-content" className="page-main guide-page solution-page">
    <JsonLd data={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://anwellup.com/" },
          { "@type": "ListItem", position: 2, name: "Sourcing solutions", item: "https://anwellup.com/solutions/" },
          { "@type": "ListItem", position: 3, name: solution.title, item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: solution.title,
        description: solution.description,
        image: `https://anwellup.com${solution.image}`,
        dateModified: solution.updated,
        inLanguage: "en",
        author: { "@id": "https://anwellup.com/#organization", name: "ANWELLUP", url: "https://anwellup.com/about/" },
        reviewedBy: { "@id": "https://anwellup.com/#organization" },
        isPartOf: { "@id": "https://anwellup.com/#website" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        about: [solution.shortTitle, solution.audience, "Wholesale food packaging sourcing"],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#questions`,
        url: `${pageUrl}#questions`,
        mainEntity: solution.questions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ]} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/solutions/"><ArrowLeft size={16}/> Sourcing solutions</Link><span aria-hidden="true">/</span><span aria-current="page">{solution.shortTitle}</span></nav>
    <article>
      <header className="guide-hero">
        <div><span className="eyebrow">Sourcing solution / {solution.updated}</span><h1>{solution.title}</h1></div>
        <div className="guide-hero-summary"><p>{solution.lede}</p><p className="solution-audience">For: {solution.audience}</p><p className="guide-byline">Prepared and reviewed by ANWELLUP · <Link href="/about/#content-method">Content method</Link></p></div>
      </header>
      <figure className="guide-lead-figure"><img src={solution.image} alt={solution.imageAlt} width={solution.imageWidth} height={solution.imageHeight}/><figcaption>{solution.imageCaption ?? "Range image for sourcing orientation. Confirm the exact model, evidence and project specification in writing."}</figcaption></figure>
      <div className="guide-layout">
        <aside aria-label="In this solution"><span className="eyebrow">Planning sequence</span><ol>{solution.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.heading}</a></li>)}</ol></aside>
        <div className="guide-body">
          {solution.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}>
            <span>{String(index + 1).padStart(2, "0")}</span><h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.checklist && <ul>{section.checklist.map((item) => <li key={item}>{item}</li>)}</ul>}
            {section.links && <div className="guide-inline-links">{section.links.map((item) => <Link className="guide-inline-link" href={item.href} key={item.href}>{item.label}<ArrowUpRight size={16}/></Link>)}</div>}
          </section>)}
          <section id="questions" className="guide-questions" aria-labelledby="solution-questions-title"><span>Q</span><h2 id="solution-questions-title">Questions buyers ask.</h2><dl>{solution.questions.map((item) => <div key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}</dl></section>
        </div>
      </div>
    </article>
    <section className="guide-related" aria-labelledby="related-title"><div><span className="eyebrow">Continue the brief</span><h2 id="related-title">Product and decision pages.</h2></div><div>{solution.related.map((item) => <Link href={item.href} key={item.href}>{item.label}<ArrowUpRight size={19}/></Link>)}</div></section>
    <section className="family-next-step"><div><h2>Turn the plan into a model-specific enquiry.</h2><p>Share the application, target format, quantity, customization and destination. Final specifications, documents and commercial terms remain subject to written confirmation.</p></div><div className="category-next-actions"><OpenInquiryButton className="button button-orange">Build an RFQ <ArrowRight size={18}/></OpenInquiryButton><a className="button button-outline" href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location={`solution_${solution.slug}`}><WhatsappLogo size={19} weight="fill"/> WhatsApp</a></div></section>
  </main>;
}
