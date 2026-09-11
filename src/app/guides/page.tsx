import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "../../components/JsonLd";
import { buyingGuides } from "../../guides";

export const metadata: Metadata = {
  title: "Food Packaging Buying Guides",
  description: "Food-packaging buying guides for cups, containers, tableware, foil, shopping bags, gloves, materials, printing, MOQ and complete wholesale RFQs.",
  alternates: { canonical: "/guides/" },
  openGraph: {
    title: "Food Packaging Buying Guides | ANWELLUP",
    description: "Build clearer specifications and compare food-packaging formats before a wholesale enquiry.",
    url: "/guides/",
    type: "website",
  },
};

export default function GuidesPage() {
  const pageUrl = "https://anwellup.com/guides/";
  return <main id="main-content" className="page-main guides-index">
    <JsonLd data={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://anwellup.com/" },
          { "@type": "ListItem", position: 2, name: "Buying guides", item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: "ANWELLUP food packaging buying guides",
        description: metadata.description,
        isPartOf: { "@id": "https://anwellup.com/#website" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: buyingGuides.length,
          itemListElement: buyingGuides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${pageUrl}${guide.slug}/`,
            name: guide.title,
          })),
        },
      },
    ]} />
    <header className="guides-index-hero">
      <span className="eyebrow">Buyer&apos;s reference</span>
      <h1>Clearer briefs.<br/>Better comparisons.</h1>
      <p>Practical notes for defining the product, application and commercial context before a wholesale packaging enquiry.</p>
    </header>
    <section className="guides-directory" aria-labelledby="guide-list-title">
      <header><h2 id="guide-list-title">Buying guides</h2><span>{String(buyingGuides.length).padStart(2, "0")} references</span></header>
      <ol>{buyingGuides.map((guide, index) => <li key={guide.slug}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div><p>{guide.shortTitle}</p><h3><Link href={`/guides/${guide.slug}/`}>{guide.title}</Link></h3><small>Updated {guide.updated}</small></div>
        <p>{guide.description}</p>
        <Link className="guide-row-link" href={`/guides/${guide.slug}/`} aria-label={`Read ${guide.title}`}><ArrowUpRight size={22}/></Link>
      </li>)}</ol>
    </section>
    <section className="guides-index-closing"><div><span className="eyebrow">Start with the range</span><h2>Already know the format?</h2></div><Link className="editorial-link" href="/products/">Browse products <span><ArrowRight size={20}/></span></Link></section>
  </main>;
}
