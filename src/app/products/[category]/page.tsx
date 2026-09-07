import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { allMaterials, catalogCategories, getCategory, getFamiliesByCategory } from "../../../catalog";
import { CategoryFamilyBrowser } from "../../../components/CategoryFamilyBrowser";
import { JsonLd } from "../../../components/JsonLd";
import { categorySeoContent } from "../../../lib/seo-content";

export function generateStaticParams() { return catalogCategories.map((category) => ({ category: category.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const seo = categorySeoContent[category.id];
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `/products/${category.slug}/` },
    openGraph: {
      title: `${seo.title} | ANWELLUP`,
      description: seo.description,
      url: `/products/${category.slug}/`,
      images: [{ url: category.image, width: category.id === "bags" ? 640 : 1448, height: category.id === "bags" ? 480 : 1086, alt: `${category.label} product range` }],
    },
    twitter: { card: "summary_large_image", title: `${seo.title} | ANWELLUP`, description: seo.description, images: [category.image] },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const families = getFamiliesByCategory(category.id);
  const materials = allMaterials(families);
  const seo = categorySeoContent[category.id];
  const pageUrl = `https://anwellup.com/products/${category.slug}/`;
  return <main id="main-content" className="page-main category-page">
    <JsonLd data={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Product range", item: "https://anwellup.com/products/" },
          { "@type": "ListItem", position: 2, name: category.label, item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        image: `https://anwellup.com${category.image}`,
        isPartOf: { "@id": "https://anwellup.com/#website" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: families.length,
          itemListElement: families.map((family, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${pageUrl}${family.id}/`,
            item: {
              "@type": "Product",
              name: family.name,
              sku: family.sku,
              description: family.summary,
              material: family.materials,
              image: `https://anwellup.com${family.image}`,
            },
          })),
        },
      },
    ]} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/products/"><ArrowLeft size={16}/> Product range</Link><span aria-hidden="true">/</span><span aria-current="page">{category.label}</span></nav>
    <header className="category-hero">
      <div className="category-hero-copy"><h1>{category.label.replaceAll(" + ", " & ")}</h1><p>{category.description}</p><div className="material-line"><span>Materials</span><p>{materials.join(", ")}</p></div><a className="editorial-link" href="#family-title">Explore formats <span><ArrowRight size={19}/></span></a></div>
      <figure className={category.id === "bags" ? "category-hero-image category-source-master" : "category-hero-image"}><div className="category-image-stage"><img src={category.image} alt={category.id === "bags" ? "Supplied PE carry-bag range with original red printing" : `${category.label} range illustration`} width={category.id === "bags" ? 640 : 1448} height={category.id === "bags" ? 480 : 1086} fetchPriority="high"/></div><figcaption>{category.id === "bags" ? "PE carry bags shown. Ask for non-woven format images with your enquiry." : "Range illustration. Refer to the selected model for specifications."}</figcaption></figure>
    </header>
    <CategoryFamilyBrowser category={category} families={families} />
    <section className="category-sourcing-guide" aria-labelledby="sourcing-title">
      <header className="category-sourcing-intro">
        <span className="eyebrow">Buyer&apos;s guide</span>
        <h2 id="sourcing-title">{seo.heading}</h2>
        <p>{seo.introduction}</p>
      </header>
      <ol className="category-sourcing-notes">
        {seo.notes.map((note) => <li key={note.label}><span>{note.label}</span><div><h3>{note.title}</h3><p>{note.body}</p></div></li>)}
      </ol>
      <div className="category-buyer-questions">
        <h2>Questions to settle before quotation.</h2>
        <dl>{seo.questions.map((item) => <div key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}</dl>
      </div>
    </section>
  </main>;
}
