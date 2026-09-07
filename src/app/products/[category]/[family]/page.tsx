import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { catalogCategories, productFamilies } from "../../../../catalog";
import { AddToInquiryButton, OpenInquiryButton } from "../../../../components/InquiryProvider";
import { JsonLd } from "../../../../components/JsonLd";
import { getSpecificationColumns } from "../../../../lib/specification-columns";

export function generateStaticParams() {
  return productFamilies.map((family) => ({ category: catalogCategories.find((item) => item.id === family.category)!.slug, family: family.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; family: string }> }): Promise<Metadata> {
  const { category: slug, family: id } = await params;
  const family = productFamilies.find((item) => item.id === id);
  const category = catalogCategories.find((item) => item.slug === slug && item.id === family?.category);
  if (!family || !category) return {};
  const description = `Compare ${family.variants.length} listed ${family.name} ${family.variants.length === 1 ? "model" : "models"}, materials and catalogue specifications for a wholesale food-packaging enquiry.`;
  return {
    title: `${family.name} Wholesale`,
    description,
    alternates: { canonical: `/products/${category.slug}/${family.id}/` },
    openGraph: {
      title: `${family.name} Wholesale | ANWELLUP`,
      description,
      url: `/products/${category.slug}/${family.id}/`,
      type: "website",
      images: [{ url: family.image, width: category.id === "bags" ? 640 : 1448, height: category.id === "bags" ? 480 : 1086, alt: `${family.name} product range` }],
    },
    twitter: { card: "summary_large_image", title: `${family.name} Wholesale | ANWELLUP`, description, images: [family.image] },
  };
}

export default async function FamilyPage({ params }: { params: Promise<{ category: string; family: string }> }) {
  const { category: slug, family: id } = await params;
  const family = productFamilies.find((item) => item.id === id);
  const category = catalogCategories.find((item) => item.slug === slug && item.id === family?.category);
  if (!family || !category) notFound();
  const columns = getSpecificationColumns(family.variants);
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
        description: family.summary,
        productGroupID: family.sku,
        sku: family.sku,
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
          additionalProperty: [
            variant.dimensions ? { "@type": "PropertyValue", name: "Dimensions", value: variant.dimensions } : null,
            variant.weight ? { "@type": "PropertyValue", name: "Weight or construction", value: variant.weight } : null,
            variant.pack ? { "@type": "PropertyValue", name: "Case pack", value: variant.pack } : null,
          ].filter(Boolean),
        })),
      },
    ]} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href={`/products/${category.slug}/`}><ArrowLeft size={16}/> {category.label}</Link><span aria-hidden="true">/</span><span aria-current="page">{family.name}</span></nav>
    <header className="family-hero">
      <figure className={category.id === "bags" ? "category-source-master" : undefined}><div className="family-image-stage"><img src={family.image} alt={category.id === "bags" ? "Supplied PE carry-bag range; representative image only" : `${family.name} range illustration`} width={category.id === "bags" ? 640 : 1448} height={category.id === "bags" ? 480 : 1086} fetchPriority="high"/></div><figcaption>{category.id === "bags" ? "PE carry bags shown. This is not a photograph of every model in the range." : "Range illustration. Confirm the selected model with your enquiry."}</figcaption></figure>
      <div className="family-hero-copy"><h1>{family.name}</h1><code className="display-sku">{family.sku}</code><p>{family.summary}</p><div className="family-attributes"><div><span>Materials</span><strong>{family.materials.join(", ")}</strong></div><div><span>Applications</span><strong>{family.applications.join(", ")}</strong></div><div><span>Specification</span><strong>{family.specificationStatus === "pending" ? "Awaiting documentation" : "Confirm with enquiry"}</strong></div></div><AddToInquiryButton item={{ sku: family.sku, name: family.name, category: category.label }}/></div>
    </header>

    <section className="specification-section" aria-labelledby="spec-title"><header className="specification-heading"><h2 id="spec-title">Models & specifications</h2><p>Compare available references, then add the models you need. Final specifications are confirmed in writing.</p></header>

      <div className="spec-table-wrap" tabIndex={0} role="region" aria-label="Model specifications, scroll horizontally if needed"><table className={`spec-table ${columns.length < 3 ? "spec-table-short" : ""}`}><caption className="sr-only">{family.name} ANWELLUP SKUs and enquiry actions</caption><thead><tr><th scope="col">AW SKU</th><th scope="col">Format / size</th>{columns.map(column => <th scope="col" key={column.field}>{column.label}</th>)}<th scope="col"><span className="sr-only">RFQ action</span></th></tr></thead><tbody>{family.variants.map((variant) => <tr key={variant.sku} id={`model-${variant.sku}`} tabIndex={-1}><th scope="row"><code>{variant.sku}</code></th><td>{variant.label}</td>{columns.map(column => <td key={column.field}>{variant[column.field] || "On request"}</td>)}<td><AddToInquiryButton compact item={{ sku: variant.sku, name: family.name, variant: variant.label, category: category.label }}/></td></tr>)}</tbody></table></div>
    </section>

    <section className="family-next-step"><div><h2>Discuss this format.</h2><p>Share your quantity, destination and intended use. Include any artwork or packing requirements in your enquiry.</p></div><OpenInquiryButton className="button button-orange">Enquire <ArrowRight size={18}/></OpenInquiryButton></section>
  </main>;
}
