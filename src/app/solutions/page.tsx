import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "../../components/JsonLd";
import { sourcingSolutions } from "../../solutions";

export const metadata: Metadata = {
  title: "Food Packaging Sourcing Solutions",
  description: "Scenario-led food-packaging sourcing plans for custom takeaway containers, restaurant chains and prepared-food retail programs.",
  alternates: { canonical: "/solutions/" },
  openGraph: {
    title: "Food Packaging Sourcing Solutions | ANWELLUP",
    description: "Translate a foodservice or retail program into a clearer packaging specification, approval plan and wholesale enquiry.",
    url: "/solutions/",
    type: "website",
  },
};

export default function SolutionsPage() {
  const pageUrl = "https://anwellup.com/solutions/";
  return <main id="main-content" className="page-main guides-index solutions-index">
    <JsonLd data={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://anwellup.com/" },
          { "@type": "ListItem", position: 2, name: "Sourcing solutions", item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: "ANWELLUP food packaging sourcing solutions",
        description: metadata.description,
        isPartOf: { "@id": "https://anwellup.com/#website" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: sourcingSolutions.length,
          itemListElement: sourcingSolutions.map((solution, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${pageUrl}${solution.slug}/`,
            name: solution.title,
          })),
        },
      },
    ]} />
    <header className="guides-index-hero">
      <span className="eyebrow">Sourcing by scenario</span>
      <h1>From operating need<br/>to packaging brief.</h1>
      <p>Focused planning pages for buyers who need to translate a food, service model and rollout into a comparable packaging enquiry.</p>
    </header>
    <section className="guides-directory" aria-labelledby="solution-list-title">
      <header><h2 id="solution-list-title">Sourcing solutions</h2><span>{String(sourcingSolutions.length).padStart(2, "0")} scenarios</span></header>
      <ol>{sourcingSolutions.map((solution, index) => <li key={solution.slug}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div><p>{solution.audience}</p><h3><Link href={`/solutions/${solution.slug}/`}>{solution.title}</Link></h3><small>Updated {solution.updated}</small></div>
        <p>{solution.description}</p>
        <Link className="guide-row-link" href={`/solutions/${solution.slug}/`} aria-label={`Open ${solution.title}`}><ArrowUpRight size={22}/></Link>
      </li>)}</ol>
    </section>
    <section className="guides-index-closing"><div><span className="eyebrow">Compare the range</span><h2>Ready to shortlist formats?</h2></div><Link className="editorial-link" href="/products/takeaway-boxes-containers/">Browse containers <span><ArrowRight size={20}/></span></Link></section>
  </main>;
}
