"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import type { CatalogCategory, ProductFamily } from "../catalog";
import { filterCatalog, matchingVariants, materialsForCategory, readCatalogFilters, writeCatalogFilters } from "../lib/catalog-search";
import { ProductDetailDrawer } from "./ProductDetailDrawer";

export function CatalogExplorer({ categories, families }: { categories: CatalogCategory[]; families: ProductFamily[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | CatalogCategory["id"]>("all");
  const [material, setMaterial] = useState("all");
  const [selected, setSelected] = useState<ProductFamily | null>(null);
  useEffect(() => {
    const restore = () => {
      const filters = readCatalogFilters(window.location.search, categories.map(item => item.id));
      const available = materialsForCategory(families, filters.category);
      setQuery(filters.query);
      setCategory(filters.category);
      setMaterial(available.includes(filters.material) ? filters.material : "all");
    };
    restore();
    window.addEventListener("popstate", restore);
    window.addEventListener("pageshow", restore);
    return () => {
      window.removeEventListener("popstate", restore);
      window.removeEventListener("pageshow", restore);
    };
  }, [categories, families]);

  const updateFilters = (nextCategory: typeof category, nextQuery: string, nextMaterial = material) => {
    const available = materialsForCategory(families, nextCategory);
    const normalizedMaterial = available.includes(nextMaterial) ? nextMaterial : "all";
    setCategory(nextCategory);
    setQuery(nextQuery);
    setMaterial(normalizedMaterial);
    const search = writeCatalogFilters(window.location.search, nextCategory, nextQuery, normalizedMaterial);
    window.history.replaceState(null, "", `${window.location.pathname}${search}${window.location.hash}`);
  };
  const availableMaterials = useMemo(() => materialsForCategory(families, category), [category, families]);
  const browsing = !query.trim() && category === "all" && material === "all";
  const filtered = useMemo(() => filterCatalog(families, category, query, material), [category, families, material, query]);

  return <section className="catalog-explorer" aria-labelledby="catalog-results-title">
    <div className="catalog-controls">
      <div className="catalog-filter-stack">
        <div className="category-filter" role="group" aria-label="Filter by category">
          <button className={category === "all" ? "active" : ""} type="button" aria-pressed={category === "all"} onClick={() => updateFilters("all", query)}>All</button>
          {categories.map((item) => <button className={category === item.id ? "active" : ""} type="button" aria-pressed={category === item.id} onClick={() => updateFilters(item.id, query)} key={item.id}>{item.shortLabel}</button>)}
        </div>
        <div className="material-filter" role="group" aria-label="Filter by material"><span>Material</span><div><button className={material === "all" ? "active" : ""} type="button" aria-pressed={material === "all"} onClick={() => updateFilters(category, query, "all")}>All</button>{availableMaterials.map(item => <button className={material === item ? "active" : ""} type="button" aria-pressed={material === item} onClick={() => updateFilters(category, query, item)} key={item}>{item}</button>)}</div></div>
      </div>
      <label className="catalog-search"><MagnifyingGlass size={19} /><span className="sr-only">Search products, materials, sizes and ANWELLUP SKUs</span><input type="search" value={query} onChange={(event) => updateFilters(category, event.target.value)} placeholder="Product, size or AW SKU" /></label>
    </div>
    <div className="result-heading"><h2 id="catalog-results-title" aria-live="polite" aria-atomic="true">{browsing ? "Explore by collection" : `${filtered.length} product ${filtered.length === 1 ? "family" : "families"}`}</h2>{!browsing && <button className="reset-catalog" type="button" onClick={() => updateFilters("all", "", "all")}>Reset filters</button>}</div>
    {browsing ? <div className="range-directory">{categories.map(item => <Link className={`range-entry ${item.id === "bags" ? "range-entry-source" : ""}`} href={`/products/${item.slug}/`} key={item.id}><div className="range-entry-image"><img src={item.image} alt={`${item.label} range illustration`} width={item.id === "bags" ? 640 : 1448} height={item.id === "bags" ? 480 : 1086} loading="lazy"/></div><div className="range-entry-title"><h3>{item.label.replaceAll(" + ", " & ")}</h3><ArrowRight size={23}/></div><p>{item.description}</p></Link>)}</div> : filtered.length ? <div className="family-list">
      {filtered.map((family) => {
        const categoryRecord = categories.find((entry) => entry.id === family.category)!;
        const matches = matchingVariants(family.variants, query);
        const familyHref = `/products/${categoryRecord.slug}/${family.id}/`;
        return <article className="family-row" key={family.id}>
          <div className="family-copy"><span>{categoryRecord.label}</span><h3><button className="family-preview-title" type="button" onClick={() => setSelected(family)} aria-haspopup="dialog">{family.name}</button></h3><p>{family.summary}</p><div className="tag-row">{family.materials.map((item) => <button className={material === item ? "active" : ""} type="button" onClick={() => updateFilters(category, query, item)} key={item}>{item}</button>)}</div>
            {matches.length > 0 && <div className="model-matches"><span>{matches.length} matching {matches.length === 1 ? "model" : "models"}</span><ul>{matches.slice(0, 3).map(variant => <li key={variant.sku}><Link href={`${familyHref}#model-${variant.sku}`}><code>{variant.sku}</code><span>{variant.label}</span><ArrowRight size={16} aria-hidden="true" /></Link></li>)}</ul>{matches.length > 3 && <Link className="more-models" href={`${familyHref}#spec-title`}>View all specifications <ArrowRight size={16} aria-hidden="true" /></Link>}</div>}
          </div>
          <div className="family-meta"><span>{family.variants.length} {family.variants.length === 1 ? "variant" : "variants"}</span><code>{family.sku}</code></div>
          <button className="family-link" type="button" onClick={() => setSelected(family)} aria-haspopup="dialog" aria-label={`Quick view ${family.name}`}><ArrowRight size={22} /></button>
        </article>;
      })}
    </div> : <div className="empty-state"><h3>No matching family.</h3><p>Try another material, size or ANWELLUP SKU.</p>{category !== "all" && <button type="button" onClick={() => updateFilters("all", query)}>Search all collections</button>}</div>}
    <ProductDetailDrawer family={selected} category={selected ? categories.find(item => item.id === selected.category) ?? null : null} onClose={() => setSelected(null)} />
  </section>;
}
