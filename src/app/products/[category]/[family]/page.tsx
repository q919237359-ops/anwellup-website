import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { catalogCategories, productFamilies } from "../../../../catalog";
import { AddToInquiryButton, OpenInquiryButton } from "../../../../components/InquiryProvider";
import { getSpecificationColumns } from "../../../../lib/specification-columns";

export function generateStaticParams() {
  return productFamilies.map((family) => ({ category: catalogCategories.find((item) => item.id === family.category)!.slug, family: family.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; family: string }> }): Promise<Metadata> {
  const { category: slug, family: id } = await params;
  const family = productFamilies.find((item) => item.id === id);
  const category = catalogCategories.find((item) => item.slug === slug && item.id === family?.category);
  if (!family || !category) return {};
  return { title: family.name, description: `${family.summary} Review available ANWELLUP SKUs and specification fields.`, alternates: { canonical: `/products/${category.slug}/${family.id}/` } };
}

export default async function FamilyPage({ params }: { params: Promise<{ category: string; family: string }> }) {
  const { category: slug, family: id } = await params;
  const family = productFamilies.find((item) => item.id === id);
  const category = catalogCategories.find((item) => item.slug === slug && item.id === family?.category);
  if (!family || !category) notFound();
  const columns = getSpecificationColumns(family.variants);
  return <main id="main-content" className="page-main product-detail-page">
    <div className="breadcrumb"><Link href={`/products/${category.slug}/`}><ArrowLeft size={16}/> {category.label}</Link><span>/</span><span>{family.name}</span></div>
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
