import type { Metadata } from "next";
import { catalogCategories, productFamilies } from "../../catalog";
import { CatalogExplorer } from "../../components/CatalogExplorer";

export const metadata: Metadata = { title: "Product range", description: "Browse ANWELLUP food-packaging product families by category, material and AW SKU.", alternates: { canonical: "/products/" } };

export default function ProductsPage() {
  return <main id="main-content" className="page-main">
    <header className="page-hero page-hero-catalog"><h1>The packaging collection.</h1><p>Browse by format, or search for a product, material or AW SKU.</p></header>
    <CatalogExplorer categories={catalogCategories} families={productFamilies} />
  </main>;
}
