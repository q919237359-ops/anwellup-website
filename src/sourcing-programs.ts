import { catalogCategories, productFamilies } from "./catalog";

// Published catalogue references only. A sourcing route is not a stock,
// destination approval or component-compatibility claim.
export const sourcingPrograms = [
  {
    id: "foil-rolls",
    title: "Aluminium foil rolls",
    audience: "Foodservice & retail distribution",
    description: "Compare catering and household roll references. Specify width, roll length, actual thickness and cutter-box or retail packaging together.",
    image: "/assets/generated/products/aw-af-c300.webp",
    imageAlt: "Catering aluminium foil roll range illustration",
    skus: ["AW-AF-C300", "AW-AF-H300"],
    check: "Confirm thickness, net roll weight, length tolerance and case packing.",
  },
  {
    id: "baking-paper",
    title: "Baking paper rolls & sheets",
    audience: "Bakeries & food-production supply",
    description: "Start with the tray dimensions and process. Review the listed paper reference, coating, sheet or roll format and intended temperature and time.",
    image: "/assets/generated/products/aw-bp-sheet.webp",
    imageAlt: "Baking paper sheet and roll range illustration",
    skus: ["AW-BP-SHEET"],
    check: "Confirm the full coating, dimensions, count and conditions of use.",
  },
  {
    id: "foil-containers",
    title: "Aluminium containers & lids",
    audience: "Takeaway & prepared-food distribution",
    description: "Shortlist a tray by portion and dimensions, then request its exact lid reference. Compare bases, lids and their case quantities as one buying brief.",
    image: "/assets/generated/products/aw-al-w500.webp",
    imageAlt: "Wrinkle-wall aluminium food container range illustration",
    skus: ["AW-AL-W500", "AW-AL-W1150"],
    check: "Confirm the lid SKU, rim fit, lid inclusion and separate case packing.",
  },
] as const;

export type SourcingProgram = (typeof sourcingPrograms)[number];

export function sourcingReferences(program: SourcingProgram) {
  return program.skus.flatMap(sku => {
    const family = productFamilies.find(item => item.variants.some(variant => variant.sku === sku));
    const variant = family?.variants.find(item => item.sku === sku);
    const category = catalogCategories.find(item => item.id === family?.category);
    return family && variant && category
      ? [{ family, variant, href: `/products/${category.slug}/${family.id}/#model-${sku}` }]
      : [];
  });
}

export const sourcingChecks = [
  { title: "Product & components", body: "Record the AW model, complete material, measured dimensions, capacity definition and matching lid or film reference. Keep the original trade size beside the confirmed measurements." },
  { title: "Destination & use", body: "Name the country and state or region, buyer channel, food, filling temperature, holding time and any heating or storage process. Review the complete pack for that exact use." },
  { title: "Packing & quotation", body: "Request pieces per inner pack and case, carton dimensions, gross weight, MOQ by version, quantity unit, delivery term and what starts the quoted lead time." },
  { title: "Documents & samples", body: "Connect each declaration or test record to the quoted model, composition, use and destination. Agree what the sample must demonstrate and record any open items before ordering." },
] as const;
