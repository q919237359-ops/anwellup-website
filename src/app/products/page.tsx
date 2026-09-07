import type { Metadata } from "next";
import { catalogCategories, productFamilies } from "../../catalog";
import { CatalogExplorer } from "../../components/CatalogExplorer";
import { JsonLd } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "Wholesale Food Packaging Product Range",
  description: "Browse 33 ANWELLUP food-packaging families by format, material and AW SKU for wholesale, foodservice and custom sourcing enquiries.",
  alternates: { canonical: "/products/" },
  openGraph: {
    title: "Wholesale Food Packaging Product Range | ANWELLUP",
    description: "Compare cups, containers, tableware, foil, cutlery, bags and gloves for professional sourcing briefs.",
    url: "/products/",
    images: [{ url: "/assets/catalog/2026-09-r1/cups-drinkware-v1.webp", width: 1448, height: 1086, alt: "ANWELLUP wholesale food packaging range" }],
  },
};

export default function ProductsPage() {
  return <main id="main-content" className="page-main">
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://anwellup.com/products/#collection",
      url: "https://anwellup.com/products/",
      name: "ANWELLUP wholesale food packaging product range",
      description: metadata.description,
      isPartOf: { "@id": "https://anwellup.com/#website" },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: catalogCategories.length,
        itemListElement: catalogCategories.map((category, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://anwellup.com/products/${category.slug}/`,
          name: category.label,
        })),
      },
    }} />
    <header className="page-hero page-hero-catalog"><h1>The packaging collection.</h1><p>Browse by format, or search for a product, material or AW SKU.</p></header>
    <CatalogExplorer categories={catalogCategories} families={productFamilies} />
  </main>;
}
