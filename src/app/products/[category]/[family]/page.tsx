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
import { MaterialLinks } from "../../../../components/MaterialLinks";
import { ModelIllustrations } from "../../../../components/ModelIllustrations";
import { productImageSize, variantIllustration } from "../../../../lib/product-images";

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
  const imageSize = productImageSize(family.image, category.id);
  return {
    title,
    description,
    alternates: { canonical: `/products/${category.slug}/${family.id}/` },
    openGraph: {
      title: `${title} | ANWELLUP`,
      description,
      url: `/products/${category.slug}/${family.id}/`,
      type: "website",
      images: [{ url: family.image, ...imageSize, alt: `${family.name} product range` }],
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
  const imageSize = productImageSize(family.image, category.id);
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
        "@type": "CollectionPage",
        "@id": `${pageUrl}#catalogue`,
        url: pageUrl,
        name: family.name,
        description: procurement?.description ?? family.summary,
        image: `https://anwellup.com${family.image}`,
        publisher: { "@id": "https://anwellup.com/#organization" },
        audience: { "@type": "BusinessAudience", audienceType: "Distributors, foodservice buyers and professional sourcing teams" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          "@id": `${pageUrl}#models`,
          name: `${family.name} catalogue model references`,
          numberOfItems: family.variants.length,
          itemListElement: family.variants.map((variant, index) => {
            const illustration = variantIllustration(family, variant);
            return {
              "@type": "ListItem",
              position: index + 1,
              "@id": `${pageUrl}#model-${variant.sku}`,
              url: `${pageUrl}#model-${variant.sku}`,
              name: `${variant.name ?? family.name} — ${variant.label}`,
              identifier: variant.sku,
              description: [
                variant.material ? `Material: ${variant.material}` : null,
                variant.dimensions ? `Dimensions: ${variant.dimensions}` : null,
                variant.weight ? `Weight or construction: ${variant.weight}` : null,
                variant.pack ? `Catalogue pack: ${variant.pack}` : null,
              ].filter(Boolean).join(". "),
              image: { "@type": "ImageObject", contentUrl: `https://anwellup.com${illustration.src}`, width: illustration.width, height: illustration.height, caption: illustration.caption },
            };
          }),
        },
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
      <figure className={category.id === "bags" ? "category-source-master" : undefined}><div className="family-image-stage"><img src={family.image} alt={category.id === "bags" ? "Supplied PE carry-bag range; representative image only" : `${family.name} range illustration`} {...imageSize} fetchPriority="high"/></div><figcaption>{category.id === "bags" ? "PE carry bags shown. This is not a photograph of every model in the range." : "Range illustration. Confirm the selected model with your enquiry."}</figcaption></figure>
      <div className="family-hero-copy"><h1>{family.name}</h1><code className="display-sku">{family.sku}</code><p>{procurement?.description ?? family.summary}</p><div className="family-attributes"><div><span>Materials</span><strong>{family.materials.join(", ")}</strong></div><div><span>Applications</span><strong>{family.applications.join(", ")}</strong></div><div><span>Specification</span><strong>{family.specificationStatus === "pending" ? "Awaiting documentation" : "Confirm with enquiry"}</strong></div></div><AddToInquiryButton item={{ sku: family.sku, name: family.name, category: category.label }}/></div>
    </header>
    <MaterialLinks category={category.id} />
    <ModelIllustrations family={family} />

    <section className="specification-section" aria-labelledby="spec-title"><header className="specification-heading"><h2 id="spec-title">Models & specifications</h2><p>Listed specifications are catalogue references. Confirm the trade size or name against measured dimensions, measurement points, capacity definition where applicable and agreed tolerances in writing.{family.id === "boxes-hinged-containers" && " Treat bagasse labels such as 9 × 9 and 8 × 8 as trade-size references; confirm the actual millimetre dimensions instead of converting the label."}</p></header>

      <div className="spec-table-wrap" tabIndex={0} role="region" aria-label="Model specifications, scroll horizontally if needed"><table className={`spec-table ${columns.length < 3 ? "spec-table-short" : ""}`}><caption className="sr-only">{family.name} ANWELLUP SKUs and enquiry actions</caption><thead><tr><th scope="col">AW SKU</th><th scope="col">Product / format / size</th>{columns.map(column => <th scope="col" key={column.field}>{column.label}</th>)}<th scope="col"><span className="sr-only">RFQ action</span></th></tr></thead><tbody>{family.variants.map((variant) => <tr key={variant.sku} id={`model-${variant.sku}`} tabIndex={-1}><th scope="row"><code>{variant.sku}</code></th><td>{variant.name && <>{variant.name}<br/></>}{variant.label}</td>{columns.map(column => <td key={column.field}>{variant[column.field] || "On request"}</td>)}<td><AddToInquiryButton compact item={{ sku: variant.sku, name: variant.name ?? family.name, variant: variant.label, category: category.label }}/></td></tr>)}</tbody></table></div>
      <div className="specification-checks" aria-labelledby="order-check-title">
        <h3 id="order-check-title">Confirm before ordering</h3>
        <details><summary>Exact model, material and matched components</summary><p>Confirm the AW SKU, material and any paired lid, closure or accessory references. Agree component fit and whether the quotation covers separate parts or complete sets.</p></details>
        <details><summary>Inner packs, cases and shipment data</summary><p>Request pieces per inner pack, inner packs per case, final carton dimensions and gross weight for each model. Record any separate packing for lids or accessories.</p></details>
        <details><summary>MOQ, quantity unit and current timing</summary><p>Request the current MOQ and price basis by model, stating pieces, packs, cases or sets. Confirm sample timing, the production approval trigger and shipment-ready timing in the written quotation.</p></details>
        <details><summary>Documents for the model, destination and use</summary><p>Request records tied to the exact model or material, destination and intended use. Review their scope, issuer, test basis and validity before relying on a suitability or compliance claim.</p></details>
      </div>
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
