import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { catalogCategories, productFamilies } from "../../../../catalog";
import { AddToInquiryButton, OpenInquiryButton } from "../../../../components/InquiryProvider";
import { JsonLd } from "../../../../components/JsonLd";
import { GENERAL_WHATSAPP_URL } from "../../../../lib/contact";
import { getFamilyProcurementContent } from "../../../../lib/family-procurement";
import { getSpecificationColumns } from "../../../../lib/specification-columns";

export function generateStaticParams() {
  return productFamilies.map((family) => ({ category: catalogCategories.find((item) => item.id === family.category)!.slug, family: family.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; family: string }> }): Promise<Metadata> {
  const { category: slug, family: id } = await params;
  const family = productFamilies.find((item) => item.id === id);
  const category = catalogCategories.find((item) => item.slug === slug && item.id === family?.category);
  if (!family || !category) return {};
  const procurement = getFamilyProcurementContent(family.id);
  const title = procurement?.seoTitle ?? `${family.name} Wholesale`;
  const description = procurement?.description ?? `Compare ${family.variants.length} listed ${family.name} ${family.variants.length === 1 ? "model" : "models"}, materials and catalogue specifications for a wholesale food-packaging enquiry.`;
  return {
    title,
    description,
    alternates: { canonical: `/products/${category.slug}/${family.id}/` },
    openGraph: {
      title: `${title} | ANWELLUP`,
      description,
      url: `/products/${category.slug}/${family.id}/`,
      type: "website",
      images: [{ url: family.image, width: category.id === "bags" ? 640 : 1448, height: category.id === "bags" ? 480 : 1086, alt: `${family.name} product range` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ANWELLUP`, description, images: [family.image] },
  };
}

export default async function FamilyPage({ params }: { params: Promise<{ category: string; family: string }> }) {
  const { category: slug, family: id } = await params;
  const family = productFamilies.find((item) => item.id === id);
  const category = catalogCategories.find((item) => item.slug === slug && item.id === family?.category);
  if (!family || !category) notFound();
  const columns = getSpecificationColumns(family.variants);
  const procurement = getFamilyProcurementContent(family.id);
  const pageUrl = `https://anwellup.com/products/${category.slug}/${family.id}/`;
  return <main id="main-content" className="page-main product-detail-page">
    <JsonLd data={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Product range", item: "https://anwellup.com/products/" },
          { "@type": "ListItem", position: 2, name: category.label, item: `https://anwellup.com/products/${category.slug}/` },
          { "@type": "ListItem", position: 3, name: family.name, item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ProductGroup",
        "@id": `${pageUrl}#product-group`,
        url: pageUrl,
        name: family.name,
        description: procurement?.description ?? family.summary,
        productGroupID: family.sku,
        sku: family.sku,
        variesBy: ["https://schema.org/size"],
        category: category.label,
        material: family.materials,
        image: `https://anwellup.com${family.image}`,
        brand: { "@type": "Brand", name: "ANWELLUP" },
        audience: { "@type": "BusinessAudience", audienceType: "Distributors, foodservice buyers and professional sourcing teams" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        hasVariant: family.variants.map((variant) => ({
          "@type": "Product",
          "@id": `${pageUrl}#model-${variant.sku}`,
          url: `${pageUrl}#model-${variant.sku}`,
          name: `${family.name} — ${variant.label}`,
          sku: variant.sku,
          size: variant.label,
          material: family.materials,
          image: `https://anwellup.com${family.image}`,
          brand: { "@type": "Brand", name: "ANWELLUP" },
          isVariantOf: { "@id": `${pageUrl}#product-group` },
          additionalProperty: [
            variant.dimensions ? { "@type": "PropertyValue", name: "Dimensions", value: variant.dimensions } : null,
            variant.weight ? { "@type": "PropertyValue", name: "Weight or construction", value: variant.weight } : null,
            variant.pack ? { "@type": "PropertyValue", name: "Case pack", value: variant.pack } : null,
          ].filter(Boolean),
        })),
      },
      ...(procurement ? [{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#questions`,
        url: `${pageUrl}#questions`,
        mainEntity: procurement.questions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }] : []),
    ]} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href={`/products/${category.slug}/`}><ArrowLeft size={16}/> {category.label}</Link><span aria-hidden="true">/</span><span aria-current="page">{family.name}</span></nav>
    <header className="family-hero">
      <figure className={category.id === "bags" ? "category-source-master" : undefined}><div className="family-image-stage"><img src={family.image} alt={category.id === "bags" ? "Supplied PE carry-bag range; representative image only" : `${family.name} range illustration`} width={category.id === "bags" ? 640 : 1448} height={category.id === "bags" ? 480 : 1086} fetchPriority="high"/></div><figcaption>{category.id === "bags" ? "PE carry bags shown. This is not a photograph of every model in the range." : "Range illustration. Confirm the selected model with your enquiry."}</figcaption></figure>
      <div className="family-hero-copy"><h1>{family.name}</h1><code className="display-sku">{family.sku}</code><p>{family.summary}</p><div className="family-attributes"><div><span>Materials</span><strong>{family.materials.join(", ")}</strong></div><div><span>Applications</span><strong>{family.applications.join(", ")}</strong></div><div><span>Specification</span><strong>{family.specificationStatus === "pending" ? "Awaiting documentation" : "Confirm with enquiry"}</strong></div></div><AddToInquiryButton item={{ sku: family.sku, name: family.name, category: category.label }}/></div>
    </header>

    <section className="specification-section" aria-labelledby="spec-title"><header className="specification-heading"><h2 id="spec-title">Models & specifications</h2><p>Compare available references, then add the models you need. Final specifications are confirmed in writing.</p></header>

      <div className="spec-table-wrap" tabIndex={0} role="region" aria-label="Model specifications, scroll horizontally if needed"><table className={`spec-table ${columns.length < 3 ? "spec-table-short" : ""}`}><caption className="sr-only">{family.name} ANWELLUP SKUs and enquiry actions</caption><thead><tr><th scope="col">AW SKU</th><th scope="col">Format / size</th>{columns.map(column => <th scope="col" key={column.field}>{column.label}</th>)}<th scope="col"><span className="sr-only">RFQ action</span></th></tr></thead><tbody>{family.variants.map((variant) => <tr key={variant.sku} id={`model-${variant.sku}`} tabIndex={-1}><th scope="row"><code>{variant.sku}</code></th><td>{variant.label}</td>{columns.map(column => <td key={column.field}>{variant[column.field] || "On request"}</td>)}<td><AddToInquiryButton compact item={{ sku: variant.sku, name: family.name, variant: variant.label, category: category.label }}/></td></tr>)}</tbody></table></div>
    </section>

    {procurement && <>
      <section className="family-procurement" aria-labelledby="family-procurement-title">
        <header>
          <span className="eyebrow">Wholesale buying brief</span>
          <h2 id="family-procurement-title">{procurement.heading}</h2>
          <p>{procurement.introduction}</p>
        </header>
        <ol>
          {procurement.facts.map((fact) => <li key={fact.label}><span>{fact.label}</span><div><h3>{fact.title}</h3><p>{fact.body}</p></div></li>)}
        </ol>
      </section>
      <section id="questions" className="family-decision-section" aria-labelledby="family-questions-title">
        <div className="family-question-copy"><span className="eyebrow">Buyer questions</span><h2 id="family-questions-title">Answers before quotation.</h2><p>These answers describe the public range and the information needed for a comparable enquiry. Final suitability and commercial terms are confirmed for the selected model.</p></div>
        <dl className="family-question-list">{procurement.questions.map((item) => <div key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}</dl>
        <aside className="family-related" aria-labelledby="family-related-title"><span className="eyebrow">Continue the decision</span><h3 id="family-related-title">Related sourcing pages</h3><div>{procurement.related.map((item) => <Link href={item.href} key={item.href}><small>{item.context}</small><span>{item.label}</span><ArrowUpRight size={18}/></Link>)}</div></aside>
      </section>
    </>}

    <section className="family-next-step"><div><span className="eyebrow">Model-specific quotation</span><h2>Discuss this format.</h2><p>Share your quantity, destination and intended use. Include any artwork, lid, sample, document or packing requirements in your enquiry.</p></div><div className="category-next-actions"><OpenInquiryButton className="button button-orange">Build an RFQ <ArrowRight size={18}/></OpenInquiryButton><a className="button button-outline" href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location={`family_${family.id}`}><WhatsappLogo size={19} weight="fill"/> WhatsApp</a></div></section>
  </main>;
}
