import type { CategoryId, ProductFamily, ProductVariant } from "../catalog";

// Only spelling/format aliases, never unverified performance or eco claims.
const aliases: Record<string, string> = {
  aluminum: "aluminium", sugarcane: "bagasse", moulded: "molded", fibre: "fiber",
  takeout: "takeaway", containers: "container", bowls: "bowl", plates: "plate", boxes: "box",
  trays: "tray", cups: "cup", bags: "bag", gloves: "glove", clamshells: "clamshell",
  inches: "in", inch: "in", ounces: "oz", ounce: "oz", milliliters: "ml", millilitres: "ml",
};

export function searchTokens(value: string) {
  return value.normalize("NFKC").toLowerCase()
    .replace(/\btake\s+(?:out|away)\b/g, "takeaway")
    .replace(/\bsugar\s+cane\b/g, "bagasse")
    .replace(/(\d)\s*[x×*]\s*(?=\d)/g, "$1 x ")
    .replace(/(\d)\s*(oz|ml|mm|cm|in)\b/g, "$1 $2")
    .replace(/(\d)["″]/g, "$1 in")
    .replace(/[^a-z0-9.]+/g, " ").trim().split(/\s+/).filter(Boolean)
    .map(token => Object.hasOwn(aliases, token) ? aliases[token] : token);
}

const skuNeedle = (query: string) => /^aw[-\s][a-z0-9\s-]+$/i.test(query.trim()) ? query.trim().toLowerCase().replace(/[\s-]+/g, "-") : null;

function familyText(family: ProductFamily) {
  return [family.name, family.sku, ...family.materials, ...family.applications].join(" ");
}

function matchesTokens(text: string, needles: string[]) {
  const words = searchTokens(text);
  return needles.every(needle => {
    const index = words.findIndex(word => word === needle || (!/\d/.test(needle) && needle.length >= 3 && word.startsWith(needle)));
    if (index < 0) return false;
    words.splice(index, 1); // 6 x 6 must not match a 9 x 6 model by reusing one 6.
    return true;
  });
}

export function matchingVariants(variants: ProductVariant[], query: string, family?: ProductFamily) {
  const needles = searchTokens(query);
  if (!needles.length) return [];
  const sku = skuNeedle(query);
  if (sku) return variants.filter(item => item.sku.toLowerCase() === sku);
  // Do not claim that every size matched a query which only identified a family.
  if (family && matchesTokens(familyText(family), needles)) return [];
  return variants.filter(item => matchesTokens([
    family ? familyText(family) : "", item.sku, item.label, item.dimensions ?? "",
  ].join(" "), needles));
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
  const needles = searchTokens(query);
  const sku = skuNeedle(query);
  return families.filter(family => {
    if (category !== "all" && family.category !== category) return false;
    if (material !== "all" && !family.materials.includes(material)) return false;
    if (!query.trim()) return true;
    if (sku) return family.sku.toLowerCase() === sku || family.variants.some(variant => variant.sku.toLowerCase() === sku);
    if (!needles.length) return false;
    return matchesTokens(familyText(family), needles) || matchingVariants(family.variants, query, family).length > 0;
  });
}
