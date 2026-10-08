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
    .replace(/\b\d{1,3}(?:,\d{3})+(?:\.\d+)?\b/g, number => number.replaceAll(",", ""))
    .replace(/\btake\s+(?:out|away)\b/g, "takeaway")
    .replace(/\bsugar\s+cane\b/g, "bagasse")
    .replace(/(\d)\s*[x×*]\s*(?=\d)/g, "$1 x ")
    .replace(/(\d)\s*(oz|ml|mm|cm|in)\b/g, "$1 $2")
    .replace(/(\d)["″]/g, "$1 in")
    .replace(/[^a-z0-9.]+/g, " ").trim().split(/\s+/).filter(Boolean)
    .map(token => Object.hasOwn(aliases, token) ? aliases[token] : token);
}

const skuNeedle = (query: string) => /^aw[-\s][a-z0-9\s-]+$/i.test(query.trim()) ? query.trim().toLowerCase().replace(/[\s-]+/g, "-") : null;

function familyText(family: ProductFamily, material = "") {
  return [family.name, family.sku, material, ...family.applications].join(" ");
}

function capacities(words: string[]) {
  return words.flatMap((word, index) => /^\d+(?:\.\d+)?$/.test(word) && /^(ml|oz)$/.test(words[index + 1] ?? "")
    ? [`${Number(word)} ${words[index + 1]}`] : []);
}

function matchesTokens(text: string, needles: string[]) {
  const words = searchTokens(text);
  const availableCapacities = capacities(words);
  if (!capacities(needles).every(capacity => availableCapacities.includes(capacity))) return false;
  return needles.every(needle => {
    const index = words.findIndex(word => word === needle || (!/\d/.test(needle) && needle.length >= 3 && word.startsWith(needle)));
    if (index < 0) return false;
    words.splice(index, 1); // 6 x 6 must not match a 9 x 6 model by reusing one 6.
    return true;
  });
}

function matchesFamily(family: ProductFamily, needles: string[], material = "all") {
  // A range can contain several materials, but one query must not combine them.
  const materials = material === "all" ? ["", ...family.materials] : [material];
  return materials.some(value => matchesTokens(familyText(family, value), needles));
}

function matchesMaterial(variant: ProductVariant, material: string, family?: ProductFamily) {
  if (material === "all") return true;
  if (variant.material) return variant.material === material;
  return family?.materials.length === 1 && family.materials[0] === material;
}

export function matchingVariants(variants: ProductVariant[], query: string, family?: ProductFamily, material = "all") {
  const needles = searchTokens(query);
  if (!needles.length) return [];
  const sku = skuNeedle(query);
  if (sku) return variants.filter(item => item.sku.toLowerCase() === sku && matchesMaterial(item, material, family));
  // Do not claim that every size matched a query which only identified a family.
  if (family && matchesTokens(familyText(family), needles)) return [];
  const numericNeedles = needles.filter(needle => /\d/.test(needle));
  return variants.filter(item => {
    if (!matchesMaterial(item, material, family)) return false;
    const fields = [item.name ?? "", item.label, item.dimensions ?? "", item.sku];
    // Repeating a size in its name and label must not create an extra dimension.
    if (numericNeedles.length && !fields.some(field => matchesTokens(field, numericNeedles))) return false;
    const knownMaterial = item.material ?? (family?.materials.length === 1 ? family.materials[0] : "");
    let context = family ? familyText(family) : "";
    if (family && knownMaterial) {
      const rangeMaterials = new Set(family.materials.flatMap(searchTokens));
      const modelMaterial = new Set(searchTokens(knownMaterial));
      context = searchTokens(context).filter(word => !rangeMaterials.has(word) || modelMaterial.has(word)).join(" ");
    }
    return matchesTokens([context, knownMaterial, ...fields].join(" "), needles);
  });
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
    if (sku) return family.sku.toLowerCase() === sku || matchingVariants(family.variants, query, family, material).length > 0;
    if (!needles.length) return false;
    return matchesFamily(family, needles, material) || matchingVariants(family.variants, query, family, material).length > 0;
  });
}
