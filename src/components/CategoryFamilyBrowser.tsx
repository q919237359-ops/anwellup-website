"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import type { CatalogCategory, ProductFamily } from "../catalog";
import { filterCatalog, materialsForCategory } from "../lib/catalog-search";
import { ProductDetailDrawer } from "./ProductDetailDrawer";
import { trackEvent } from "../lib/analytics";

export function CategoryFamilyBrowser({ category, families }: { category: CatalogCategory; families: ProductFamily[] }) {
  const [material, setMaterial] = useState("all");
  const [selected, setSelected] = useState<ProductFamily | null>(null);
  const materials = useMemo(() => materialsForCategory(families, category.id), [category.id, families]);
  const filtered = useMemo(() => filterCatalog(families, category.id, "", material), [category.id, families, material]);
  const selectMaterial = (nextMaterial: string) => {
    trackEvent("category_filter", { filter_type: "material", filter_value: nextMaterial, category: category.id });
    setMaterial(nextMaterial);
  };
  const previewFamily = (family: ProductFamily) => {
    trackEvent("product_preview", { family: family.id, category: family.category });
    setSelected(family);
  };

  return <>
    <section className="category-family-section" aria-labelledby="family-title">
      <header className="format-heading"><h2 id="family-title">Choose your format.</h2><span aria-live="polite">{filtered.length} product {filtered.length === 1 ? "family" : "families"}</span></header>
      {materials.length > 1 && <div className="material-filter category-material-filter" role="group" aria-label="Filter this category by material">
        <span>Material</span><div><button className={material === "all" ? "active" : ""} type="button" aria-pressed={material === "all"} onClick={() => selectMaterial("all")}>All</button>{materials.map(item => <button className={material === item ? "active" : ""} type="button" aria-pressed={material === item} onClick={() => selectMaterial(item)} key={item}>{item}</button>)}</div>
      </div>}
      <div className="format-list">{filtered.map(family => <article className="format-row" key={family.id}>
        <div className="format-name"><code>{family.sku}</code><h3><button className="family-preview-title" type="button" onClick={() => previewFamily(family)} aria-haspopup="dialog">{family.name}</button></h3></div>
        <div className="format-description"><p>{family.summary}</p><span>{family.materials.join(", ")}</span></div>
        <div className="format-actions"><button className="format-action format-preview" type="button" onClick={() => previewFamily(family)} aria-haspopup="dialog"><span>{family.variants.length} {family.variants.length === 1 ? "option" : "options"}</span><ArrowRight size={21}/></button><Link href={`/products/${category.slug}/${family.id}/`}>Full details</Link></div>
      </article>)}</div>
    </section>
    <ProductDetailDrawer family={selected} category={selected ? category : null} onClose={() => setSelected(null)} />
  </>;
}
