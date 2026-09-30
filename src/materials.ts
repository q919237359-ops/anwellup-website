import { catalogCategories, productFamilies, type ProductFamily } from "./catalog";

export type MaterialPage = {
  slug: string; name: string; title: string; description: string; introduction: string;
  match: (family: ProductFamily) => boolean;
  checks: Array<{ title: string; body: string }>;
  questions: Array<{ question: string; answer: string }>;
  guides: Array<{ label: string; href: string }>;
};
export const materialPages: MaterialPage[] = [
  {
    slug: "bagasse-food-packaging", name: "Bagasse & moulded fibre", title: "Bagasse Food Containers & Tableware Wholesale",
    description: "Compare sugarcane bagasse clamshells, bowls, plates and meal trays by size and case pack. Request samples, material details and a wholesale quotation.",
    introduction: "Source sugarcane bagasse clamshell containers, bowls, plates and compartment trays for takeaway and foodservice. Compare the catalogue sizes below, then request samples for your food, holding time and destination market.",
    match: family => family.materials.some(material => /bagasse/i.test(material)),
    guides: [
      { label: "Choose a takeaway container format", href: "/guides/how-to-choose-takeaway-packaging/" },
      { label: "Compare food-container sizes", href: "/guides/food-container-size-guide/" },
      { label: "Plan a sample evaluation", href: "/guides/takeaway-container-samples-prototyping/" },
    ],
    checks: [
      { title: "Choose the food and format", body: "Use a hinged clamshell for a single-pack brief, a compartment tray when foods need separating, or a bowl for a portion-based brief. Confirm usable space and any required lid from the selected model." },
      { title: "Review the full construction", body: "Ask for fibre composition, coatings, additives and any grease-resistant treatment. A bagasse material name alone does not establish plastic-free construction, a PFAS claim or compostability." },
      { title: "Test a representative sample", body: "Record the food, filling temperature, holding interval, stacking and delivery conditions. Check the sample after use rather than assuming all fibre formats perform alike." },
    ],
    questions: [
      { question: "Which bagasse products can I compare here?", answer: "The catalogue includes hinged containers, bowls, plates and meal trays. The linked product families show individual AW references, available dimensions and case-pack entries." },
      { question: "Are these bagasse products certified compostable or PFAS-free?", answer: "No blanket certification or PFAS claim is made for this range. Request evidence that identifies the exact SKU and construction, applicable test method and destination requirements before making a claim." },
      { question: "What are the MOQ and sample options?", answer: "Send the model or size, quantity, destination and intended food use. MOQ, sample availability, cost and lead time are confirmed in a written quotation for that specification." },
    ],
  },
  {
    slug: "paper-food-packaging", name: "Paper & kraft", title: "Paper & Kraft Food Packaging Wholesale",
    description: "Compare paper cups, kraft takeaway boxes, bowls and food trays with listed sizes and packing. Specify linings, lids, printing and destination before quotation.",
    introduction: "Compare paper cups, kraft bowls, takeaway boxes and food trays in one place. Choose a format for your beverage or meal, then specify its lining, closure, print and packing requirements with your enquiry.",
    match: family => ["cups", "boxes", "tableware"].includes(family.category) && family.materials.some(material => /paper/i.test(material)),
    guides: [
      { label: "Paper vs plastic cups: compare the complete pack", href: "/guides/paper-vs-plastic-disposable-cups/" },
      { label: "Plan custom printing and artwork", href: "/guides/custom-food-packaging-printing-guide/" },
      { label: "Check cup and lid compatibility", href: "/guides/disposable-cup-lid-compatibility/" },
    ],
    checks: [
      { title: "Ask what is inside the paper", body: "Request the substrate and barrier or lining composition. A brown kraft appearance does not identify the lining, and paper packaging is not automatically plastic-free." },
      { title: "Check the complete pack", body: "Specify base, lid or folded closure together. Use listed dimensions for a shortlist, then verify fit, food handling and any leakage requirement with the exact construction." },
      { title: "Make printing comparable", body: "Send artwork, colours, intended coverage and quantities by size. Ask for the printable area, proof process and MOQ basis before ordering custom packaging." },
    ],
    questions: [
      { question: "Does kraft paper packaging contain plastic?", answer: "It can. A paper or kraft description does not establish the coating, barrier, window or lid material. Ask for the composition of every component in the quoted product." },
      { question: "Can I request custom printed paper packaging?", answer: "Submit the selected format, size, artwork and order quantity. Printing options, proof requirements, MOQ and lead time are confirmed for that model." },
      { question: "Can I compare cups and containers in one quotation?", answer: "Yes. List each model with its quantity and matching components. Ask for piece and case quantities for each item so mixed orders can be compared consistently." },
    ],
  },
  {
    slug: "aluminium-food-containers", name: "Aluminium containers", title: "Aluminium Food Containers & Foil Trays Wholesale",
    description: "Compare smoothwall, coloured and wrinkle-wall aluminium food containers by capacity, dimensions and case pack. Request matched lids, samples and a wholesale quote.",
    introduction: "Compare smoothwall containers, coloured aluminium formats and wrinkle-wall trays for prepared-food and takeaway packaging briefs. Use the actual model dimensions and packing entries to build a shortlist before requesting matched lids and samples.",
    match: family => family.category === "boxes" && family.materials.some(material => /aluminium/i.test(material)),
    guides: [
      { label: "Compare food-container sizes", href: "/guides/food-container-size-guide/" },
      { label: "Check case packing and lead times", href: "/guides/takeaway-container-lead-time-packing/" },
      { label: "Prepare a comparable supplier brief", href: "/guides/how-to-verify-food-packaging-supplier/" },
    ],
    checks: [
      { title: "Specify the base and lid", body: "Request the exact lid reference, closure method and lid material with the container. A foil-looking lid and a clear lid can involve different constructions and service requirements." },
      { title: "Confirm the intended use", body: "State the food, filling, storage, heating equipment and holding conditions. Do not infer oven or microwave suitability from the word aluminium; confirm the exact model and appliance instructions." },
      { title: "Review coatings and collection", body: "Ask whether the tray is coated and which coating is used. Recycling and plastic-content claims depend on the complete pack and the destination's collection system." },
    ],
    questions: [
      { question: "Which aluminium container types are listed?", answer: "The catalogue groups smoothwall containers, a coloured container series and wrinkle-wall trays. Each family links to its own model and packing table." },
      { question: "Are lids included in the quoted case quantity?", answer: "Do not assume so. Ask whether the quotation covers bases, lids or complete sets and confirm the piece count and pack unit of every component." },
      { question: "Are all aluminium containers plastic-free?", answer: "No such range-wide claim is made. Confirm coatings, lids, films and other components for the selected model before making a plastic-free claim." },
    ],
  },
];
export const materialFamilies = (material: MaterialPage) => productFamilies.filter(material.match);
export const familyPath = (family: ProductFamily) => `/products/${catalogCategories.find(category => category.id === family.category)!.slug}/${family.id}/`;
// Examples are exact records, not an inferred capacity/dimension conversion.
export const materialModelExamples = (material: MaterialPage) => materialFamilies(material).flatMap(family =>
  family.variants.slice(0, 2).map(variant => ({ family, variant, href: `${familyPath(family)}#model-${variant.sku}` })),
);
