import type { CategoryId, ProductFamily, ProductVariant } from "../catalog";

export function matchingVariants(variants: ProductVariant[], query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return variants.filter(item => [item.sku, item.label, item.dimensions ?? ""].join(" ").toLowerCase().includes(needle));
}

export function readCatalogFilters(search: string, categoryIds: readonly string[]) {
  const params = new URLSearchParams(search);
  const category = params.get("category") ?? "all";
  return {
    query: params.get("q") ?? "",
    category: categoryIds.includes(category) ? category as CategoryId : "all" as const,
    material: params.get("material") ?? "all",
  };
}

export function writeCatalogFilters(search: string, category: CategoryId | "all", query: string, material: string) {
  const params = new URLSearchParams(search);
  if (category === "all") params.delete("category"); else params.set("category", category);
  if (query.trim()) params.set("q", query); else params.delete("q");
  if (material === "all") params.delete("material"); else params.set("material", material);
  const value = params.toString();
  return value ? `?${value}` : "";
}

export function materialsForCategory(families: ProductFamily[], category: CategoryId | "all") {
  const scoped = category === "all" ? families : families.filter(family => family.category === category);
  return [...new Set(scoped.flatMap(family => family.materials))].sort((a, b) => a.localeCompare(b));
}

export function filterCatalog(families: ProductFamily[], category: CategoryId | "all", query: string, material = "all") {
  const needle = query.trim().toLowerCase();
  return families.filter(family => {
    if (category !== "all" && family.category !== category) return false;
    if (material !== "all" && !family.materials.includes(material)) return false;
    const haystack = [family.name, family.sku, ...family.materials, ...family.applications].join(" ").toLowerCase();
    return !needle || haystack.includes(needle) || matchingVariants(family.variants, needle).length > 0;
  });
}
