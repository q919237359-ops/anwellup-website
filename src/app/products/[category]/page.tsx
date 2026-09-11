import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { allMaterials, catalogCategories, getCategory, getFamiliesByCategory } from "../../../catalog";
import { CategoryFamilyBrowser } from "../../../components/CategoryFamilyBrowser";
import { JsonLd } from "../../../components/JsonLd";
import { categorySeoContent } from "../../../lib/seo-content";
import { GENERAL_WHATSAPP_URL } from "../../../lib/contact";
import { OpenInquiryButton } from "../../../components/InquiryProvider";

export function generateStaticParams() { return catalogCategories.map((category) => ({ category: category.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const seo = categorySeoContent[category.id];
  const heroImage = seo.heroImage ?? { src: category.image, width: category.id === "bags" ? 640 : 1448, height: category.id === "bags" ? 480 : 1086, alt: `${category.label} product range` };
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `/products/${category.slug}/` },
    openGraph: {
      title: `${seo.title} | ANWELLUP`,
      description: seo.description,
      url: `/products/${category.slug}/`,
      images: [{ url: heroImage.src, width: heroImage.width, height: heroImage.height, alt: heroImage.alt }],
    },
    twitter: { card: "summary_large_image", title: `${seo.title} | ANWELLUP`, description: seo.description, images: [heroImage.src] },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const families = getFamiliesByCategory(category.id);
  const materials = allMaterials(families);
  const seo = categorySeoContent[category.id];
  const heroImage = seo.heroImage ?? { src: category.image, width: category.id === "bags" ? 640 : 1448, height: category.id === "bags" ? 480 : 1086, alt: category.id === "bags" ? "Supplied PE carry-bag range with original red printing" : `${category.label} range illustration`, caption: category.id === "bags" ? "PE carry bags shown. Ask for non-woven format images with your enquiry." : "Range illustration. Refer to the selected model for specifications." };
  const pageUrl = `https://anwellup.com/products/${category.slug}/`;
  const focusedGuides = {
    cups: { label: "Disposable cup sourcing guide", href: "/guides/disposable-cup-sourcing-guide/" },
    boxes: { label: "Takeaway container sourcing guide", href: "/guides/takeaway-container-sourcing-guide/" },
    tableware: { label: "Disposable tableware sourcing guide", href: "/guides/disposable-plates-bowls-trays-sourcing-guide/" },
    foil: { label: "Aluminium foil sourcing guide", href: "/guides/aluminium-foil-food-wrap-sourcing-guide/" },
    cutlery: { label: "Disposable cutlery sets bulk guide", href: "/guides/disposable-cutlery-sets-bulk/" },
    bags: { label: "Custom shopping-bag sourcing guide", href: "/guides/custom-shopping-bags-sourcing-guide/" },
    gloves: { label: "Disposable glove sourcing guide", href: "/guides/disposable-gloves-wholesale-sourcing-guide/" },
  } as const;
  const focusedGuide = focusedGuides[category.id];
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
        image: `https://anwellup.com${heroImage.src}`,
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
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#questions`,
        url: `${pageUrl}#questions`,
        mainEntity: seo.questions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ]} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/products/"><ArrowLeft size={16}/> Product range</Link><span aria-hidden="true">/</span><span aria-current="page">{category.label}</span></nav>
    <header className="category-hero">
      <div className="category-hero-copy"><h1>{category.label.replaceAll(" + ", " & ")}</h1><p>{category.description}</p><div className="material-line"><span>Materials</span><p>{materials.join(", ")}</p></div><a className="editorial-link" href="#family-title">Explore formats <span><ArrowRight size={19}/></span></a></div>
      <figure className={category.id === "bags" ? "category-hero-image category-source-master" : "category-hero-image"}><div className="category-image-stage"><img src={heroImage.src} alt={heroImage.alt} width={heroImage.width} height={heroImage.height} fetchPriority="high"/></div><figcaption>{heroImage.caption}</figcaption></figure>
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
      {seo.procurement && <section className="category-procurement" aria-labelledby="procurement-title">
        <header><span className="eyebrow">Procurement brief</span><h2 id="procurement-title">Eight inputs for a comparable quotation.</h2><p>Use these fields as a working brief. Model-specific figures and documents are confirmed in writing rather than assumed from the category.</p></header>
        <ol>{seo.procurement.map((item) => <li key={item.label}><span>{item.label}</span><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol>
      </section>}
      {seo.clusterLinks && <section className="category-cluster" aria-labelledby="cluster-title">
        <header><span className="eyebrow">{category.id === "boxes" ? "Takeaway container knowledge base" : category.id === "cups" ? "Cup and drinkware knowledge base" : category.id === "cutlery" ? "Cutlery and meal-kit knowledge base" : category.id === "tableware" ? "Plates, bowls and trays knowledge base" : category.id === "foil" ? "Foil and food-wrap knowledge base" : category.id === "bags" ? "Carry and shopping-bag knowledge base" : category.id === "gloves" ? "Glove sourcing knowledge base" : "Buyer knowledge base"}</span><h2 id="cluster-title">Continue by purchasing decision.</h2></header>
        <ol>{seo.clusterLinks.map((item, index) => <li key={item.href}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{item.intent}</small><Link href={item.href}>{item.label}</Link></div><ArrowUpRight size={18}/></li>)}</ol>
      </section>}
      <div className="category-guide-links"><span className="eyebrow">Continue the brief</span><div><Link href={focusedGuide.href}>{focusedGuide.label}<ArrowUpRight size={18}/></Link><Link href="/guides/food-packaging-rfq-checklist/">Food packaging RFQ checklist<ArrowUpRight size={18}/></Link></div></div>
    </section>
    <section className="family-next-step category-next-step"><div><span className="eyebrow">Model-specific quotation</span><h2>Bring the food, format and destination.</h2><p>Share the application, dimensions or capacity, material, quantity, customization and delivery destination. We will return the questions that still need confirmation.</p></div><div className="category-next-actions"><OpenInquiryButton className="button button-orange">Build an RFQ <ArrowRight size={18}/></OpenInquiryButton><a className="button button-outline" href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location={`category_${category.id}`}><WhatsappLogo size={19} weight="fill"/> WhatsApp</a></div></section>
  </main>;
}
