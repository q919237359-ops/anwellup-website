import { products as legacyProducts } from "./data";

export type CategoryId = "cups" | "boxes" | "tableware" | "foil" | "cutlery" | "bags" | "gloves";

export type ProductVariant = {
  sku: string;
  label: string;
  dimensions?: string;
  weight?: string;
  pack?: string;
};

export type ProductFamily = {
  id: string;
  sku: string;
  name: string;
  category: CategoryId;
  materials: string[];
  applications: string[];
  summary: string;
  image: string;
  variants: ProductVariant[];
  specificationStatus?: "confirmed" | "review" | "pending";
};

export type CatalogCategory = {
  id: CategoryId;
  slug: string;
  label: string;
  shortLabel: string;
  editorial: string;
  description: string;
  image: string;
};

export const catalogCategories: CatalogCategory[] = [
  { id: "cups", slug: "cups-drinkware", label: "Cups + Drinkware", shortLabel: "Drinkware", editorial: "Cups for coffee, cold drinks and takeaway.", description: "Paper, kraft, PP and PET drinkware grouped for hot and cold beverage programs.", image: "/assets/catalog/2026-09-r1/cups-drinkware-v1.webp" },
  { id: "boxes", slug: "takeaway-boxes-containers", label: "Takeaway Boxes + Containers", shortLabel: "Containers", editorial: "Containers for prepared food and takeaway.", description: "Hinged, folded, clear and aluminium formats for takeaway, deli, retail and prepared food.", image: "/assets/catalog/2026-09-r1/takeaway-boxes-containers-v1.webp" },
  { id: "tableware", slug: "plates-bowls-trays", label: "Plates, Bowls + Trays", shortLabel: "Tableware", editorial: "Plates, bowls and trays for meal service.", description: "Molded-fiber, PP and HIPS formats for plating, portioning and meal assembly.", image: "/assets/catalog/2026-09-r1/plates-bowls-trays-v1.webp" },
  { id: "foil", slug: "foil-wraps-baking", label: "Foil, Wraps + Baking", shortLabel: "Foil + Wraps", editorial: "Rolls, sheets and wraps for food preparation.", description: "Rolls, pop-up sheets, laminated food bags and baking paper for production and service.", image: "/assets/catalog/2026-09-r1/foil-wraps-baking-v1.webp" },
  { id: "cutlery", slug: "cutlery-meal-kits", label: "Cutlery + Meal Kits", shortLabel: "Cutlery", editorial: "Cutlery and kits for takeaway and catering.", description: "Bulk, wrapped and configured meal-kit options for foodservice and transport catering.", image: "/assets/catalog/2026-09-r1/cutlery-meal-kits-v1.webp" },
  { id: "bags", slug: "carry-shopping-bags", label: "Carry + Shopping Bags", shortLabel: "Carry Bags", editorial: "Carry bags for retail and takeaway.", description: "PE and non-woven carry formats with print and packing options for retail programs.", image: "/assets/catalog/2026-09-r1/carry-shopping-bags-sage-composite-v2.webp" },
  { id: "gloves", slug: "gloves-protective-supplies", label: "Gloves + Protective Supplies", shortLabel: "Gloves", editorial: "Glove formats for different handling tasks.", description: "Nitrile, vinyl, latex, HDPE and TPE options for handling, cleaning and professional tasks; intended use requires document review.", image: "/assets/catalog/2026-09-r1/gloves-protective-supplies-v1.webp" },
];

const legacyCategory = (category: string, family: string): CategoryId => {
  if (category === "hygiene") return "gloves";
  if (category === "clear") return family.includes("Cup") ? "cups" : "boxes";
  if (category === "paper") {
    if (family.includes("Cup")) return "cups";
    if (family.includes("Bowl")) return "tableware";
    return "boxes";
  }
  if (category === "plant") return family.includes("Container") ? "boxes" : "tableware";
  if (category === "aluminium") return family.includes("Rolls") ? "foil" : "boxes";
  return "boxes";
};

const familySku: Record<string, string> = {
  "Hinged Containers": "AW-BOX-BG-HC",
  Bowls: "AW-BWL-BG",
  Plates: "AW-PLT-BG",
  "Meal Trays": "AW-TRY-BG",
  "Kraft Paper Bowls": "AW-BWL-KR",
  "Takeaway Containers": "AW-BOX-KR",
  "Foodservice Formats": "AW-BOX-KR-FS",
  "Smoothwall Containers": "AW-BOX-AL-SM",
  "Premium Color Series": "AW-BOX-AL-PR",
  "Wrinkle-Wall Containers": "AW-TRY-AL-WR",
  "Rolls, Sheets + Paper": "AW-FOL-RSP",
  "PET Cold Cups": "AW-CUP-PET",
  "Tamper-Evident Containers": "AW-BOX-PET-TE",
  "Sushi + Hinged Containers": "AW-BOX-CLR-HG",
  "Handling Gloves": "AW-GLV-HND",
};

const legacyFamilies = Object.values(
  legacyProducts.reduce<Record<string, ProductFamily>>((groups, item) => {
    const category = legacyCategory(item.category, item.family);
    const key = `${category}:${item.family}`;
    const variant = { sku: item.sku, label: item.size, dimensions: item.dimensions, pack: item.casePack };
    if (!groups[key]) {
      groups[key] = {
        id: key.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        sku: familySku[item.family] ?? item.sku,
        name: item.family,
        category,
        materials: [item.material],
        applications: category === "cups" ? ["Beverage service"] : category === "gloves" ? ["Food handling", "Operations"] : ["Foodservice", "Retail"],
        summary: `${item.name} family with ${item.material.toLowerCase()} construction and selectable commercial variants.`,
        image: item.image,
        variants: [variant],
        specificationStatus: "confirmed",
      };
    } else {
      groups[key].variants.push(variant);
      if (!groups[key].materials.includes(item.material)) groups[key].materials.push(item.material);
    }
    return groups;
  }, {}),
).filter((family) => family.name !== "Paper Cups");

const v = (sku: string, label: string, dimensions = "", weight = "", pack = ""): ProductVariant => ({ sku, label, dimensions, weight, pack });
const categoryImage = (id: CategoryId) => catalogCategories.find((item) => item.id === id)!.image;

const addedFamilies: ProductFamily[] = [
  { id: "paper-cups-single-wall", sku: "AW-CUP-SW", name: "Single-Wall Paper Cups", category: "cups", materials: ["Paper", "Kraft paper"], applications: ["Coffee service", "Beverage service", "Retail"], summary: "Single-wall, matte and kraft constructions grouped into one buyer-ready range.", image: categoryImage("cups"), specificationStatus: "review", variants: [v("AW-CUP-SWM-08", "Matte · 8 oz", "Ø80 × 95 mm", "300 gsm", "1,000 pcs/ctn"), v("AW-CUP-SWM-12", "Matte · 12 oz", "Ø89 × 110 mm", "300 gsm", "1,000 pcs/ctn"), v("AW-CUP-SWM-16", "Matte · 16 oz", "Ø89 × 132 mm", "300 gsm", "1,000 pcs/ctn"), v("AW-CUP-SW-12", "Standard · 12 oz", "Ø89 × 110 mm", "260 gsm", "1,000 pcs/ctn"), v("AW-CUP-SW-16", "Standard · 16 oz", "Ø89 × 132 mm", "260 gsm", "1,000 pcs/ctn"), v("AW-CUP-SW-22", "Standard · 22 oz", "Ø89 × 160 mm", "280 gsm", "1,000 pcs/ctn")] },
  { id: "paper-cups-double-wall", sku: "AW-CUP-DW", name: "Double-Wall Paper Cups", category: "cups", materials: ["Paper", "Kraft paper"], applications: ["Coffee service", "Beverage service", "Brand programs"], summary: "Double-wall paper cups across smooth, kraft and corrugated constructions.", image: categoryImage("cups"), specificationStatus: "review", variants: [v("AW-CUP-DWK-12", "Kraft · 12 oz", "Ø89 × 110 mm", "260 + 250 gsm", "500 pcs/ctn"), v("AW-CUP-DWK-16", "Kraft · 16 oz", "Ø89 × 132 mm", "260 + 250 gsm", "500 pcs/ctn"), v("AW-CUP-DWC-08", "Corrugated · 8 oz", "Ø80 × 95 mm", "300 + 250 gsm", "500 pcs/ctn"), v("AW-CUP-DWC-12", "Corrugated · 12 oz", "Ø90 × 113 mm", "300 + 250 gsm", "500 pcs/ctn"), v("AW-CUP-DWC-16", "Corrugated · 16 oz", "Ø90 × 135 mm", "300 + 250 gsm", "500 pcs/ctn"), v("AW-CUP-DWP-08", "Smooth · 8 oz", "Ø80 × 95 mm", "260 + 250 gsm", "500 pcs/ctn"), v("AW-CUP-DWP-12", "Smooth · 12 oz", "Ø89 × 110 mm", "260 + 250 gsm", "500 pcs/ctn")] },
  { id: "pp-disposable-cups", sku: "AW-CUP-PP", name: "PP Disposable Cups", category: "cups", materials: ["PP"], applications: ["Sampling", "Cold drinks", "Airline service"], summary: "A broad lightweight PP range from portion cups through large beverage formats.", image: categoryImage("cups"), specificationStatus: "confirmed", variants: [["01","1 oz","1.1 g"],["025","2.5 oz","1.5 g"],["035","3.5 oz","2.2 g"],["05","5 oz","3 g"],["06","6 oz","2.9 g"],["07","7 oz","3.4 g"],["08","8 oz","3.5 g"],["09","9 oz","4.5 g"],["10","10 oz","4.5 g"],["12","12 oz","5 g"],["14","14 oz","6 g"],["16","16 oz","6 g"],["20","20 oz","11 g"]].map(([code,label,weight]) => v(`AW-CUP-PP-${code}`, label, "", weight)) },
  { id: "pp-milk-tea-cups", sku: "AW-CUP-PP-MT", name: "PP Milk Tea Cups", category: "cups", materials: ["PP"], applications: ["Bubble tea", "Cold drinks", "Dessert"], summary: "Tall 90 mm-rim drinkware designed around milk-tea and cold beverage service.", image: categoryImage("cups"), specificationStatus: "confirmed", variants: [v("AW-CUP-PP-MT-500", "500 ml", "Ø90 / base Ø56 × H134 mm", "16.5 g", ""), v("AW-CUP-PP-MT-700", "700 ml", "Ø90 / base Ø56 × H177 mm", "23 g", "")] },
  { id: "pp-deli-containers", sku: "AW-BOX-PP-DELI", name: "PP Injection Deli Containers", category: "boxes", materials: ["PP"], applications: ["Deli", "Cold prepared food", "Dessert"], summary: "Stackable, lidded round deli formats across five service capacities.", image: categoryImage("boxes"), specificationStatus: "confirmed", variants: [["08","8 oz","Ø116 × H44 mm","21.5 g"],["12","12 oz","Ø116 × H60 mm","22.5 g"],["16","16 oz","Ø116 × H77 mm","29.5 g"],["24","24 oz","Ø116 × H100 mm","31.5 g"],["32","32 oz","Ø116 × H138 mm","45.5 g"]].map(([code,label,dimensions,weight]) => v(`AW-BOX-PP-DELI-${code}`,label,dimensions,weight)) },
  { id: "kraft-folded-boxes", sku: "AW-BOX-KR-TOP", name: "Kraft Folded Takeaway Boxes", category: "boxes", materials: ["Kraft paper"], applications: ["Takeaway", "Fast casual", "Prepared food"], summary: "Integrated folding takeaway-box formats; construction and application fit are confirmed against the selected model.", image: categoryImage("boxes"), specificationStatus: "review", variants: [v("AW-BOX-KR-01","No. 1","","","50 pcs/bag × 9 bags/box"),v("AW-BOX-KR-02","No. 2","","","50 pcs/bag × 4 bags/box"),v("AW-BOX-KR-03","No. 3","","","50 pcs/bag × 4 bags/box"),v("AW-BOX-KR-04","No. 4","","","40 pcs/bag × 4 bags/box"),v("AW-BOX-KR-08","No. 8","","","50 pcs/bag × 6 bags/box")] },
  { id: "hips-pp-tableware", sku: "AW-TBL-HIPS", name: "HIPS + PP Tableware Range", category: "tableware", materials: ["HIPS", "PP"], applications: ["Catering", "Prepared meals", "General foodservice"], summary: "Round, etched-edge and compartment formats; material assignment remains under review by model.", image: categoryImage("tableware"), specificationStatus: "review", variants: [v("AW-TBL-HIPS-35671","6 in plate","","6.5 g",""),v("AW-TBL-HIPS-35672","7 in plate","","8.5 g",""),v("AW-TBL-HIPS-35679","8 in plate","","13 g",""),v("AW-TBL-HIPS-35673","9 in plate","","14.5 g",""),v("AW-TBL-HIPS-35674","10.25 in plate","","21.5 g",""),v("AW-TBL-HIPS-35675","10.25 in compartment plate","","19.5 g",""),v("AW-TBL-HIPS-35616","12 oz bowl","","7 g",""),v("AW-TBL-HIPS-35617","16 oz bowl","","12 g","")] },
  { id: "cushion-foil", sku: "AW-FOL-CUS", name: "Cushion Foil Sheets", category: "foil", materials: ["Paper + aluminium laminate"], applications: ["Hot food wrapping", "Deli", "Takeaway"], summary: "Cushion sheets pairing paper handling with a thin foil barrier.", image: categoryImage("foil"), specificationStatus: "confirmed", variants: [v("AW-FOL-CUS-CF1014","10 × 14 in","10 × 14 in","28 gsm paper + 6 μm foil","2,000 pcs/ctn"),v("AW-FOL-CUS-CF1416","14 × 16 in","14 × 16 in","28 gsm paper + 6 μm foil","1,000 pcs/ctn"),v("AW-FOL-CUS-CF1818","18 × 18 in","18 × 18 in","28 gsm paper + 6 μm foil","1,000 pcs/ctn"),v("AW-FOL-CUS-CF1013RD","10.5 × 13 in · red","10.5 × 13 in","48 gsm paper + 6 μm foil","2,000 pcs/ctn")] },
  { id: "popup-foil", sku: "AW-FOL-POP", name: "Pop-Up Foil Sheets", category: "foil", materials: ["Aluminium"], applications: ["Fast wrapping", "Salon", "Foodservice"], summary: "Pre-cut dispensing sheets in plain and color-coded foil options.", image: categoryImage("foil"), specificationStatus: "confirmed", variants: [v("AW-FOL-POP-12200","12 × 10.75 in · plain","12 × 10.75 in","12 μm","12 × 200/ctn"),v("AW-FOL-POP-12500","12 × 10.75 in · plain","12 × 10.75 in","12 μm","6 × 500/ctn"),v("AW-FOL-POP-910500","9 × 10.75 in · plain","9 × 10.75 in","12 μm","6 × 500/ctn"),v("AW-FOL-POP-910RD","9 × 10.75 in · red","9 × 10.75 in","14 μm","6 × 500/ctn"),v("AW-FOL-POP-910GR","9 × 10.75 in · green","9 × 10.75 in","14 μm","6 × 500/ctn"),v("AW-FOL-POP-910BL","9 × 10.75 in · blue","9 × 10.75 in","14 μm","6 × 500/ctn")] },
  { id: "foil-paper-bags", sku: "AW-FOL-BAG", name: "Foil Paper Food Bags", category: "foil", materials: ["Paper + aluminium laminate"], applications: ["BBQ", "Sandwiches", "Burgers", "Hot holding"], summary: "Laminated bags across pint, quart, half and printed foodservice formats.", image: categoryImage("foil"), specificationStatus: "confirmed", variants: [["BBQ-PINT","4 × 2.5 × 10.25 in","1,000 pcs/ctn"],["BBQ-QUART","5 × 3.25 × 12 in","1,000 pcs/ctn"],["BBQ-HALF","7 × 3.25 × 14.75 in","500 pcs/ctn"],["NP-PINT","4 × 2.5 × 10.25 in","1,000 pcs/ctn"],["NP-QUART","5 × 3.25 × 12 in","1,000 pcs/ctn"],["NP-HALF","7 × 3.25 × 14.75 in","500 pcs/ctn"]].map(([reference,dimensions,pack]) => v(`AW-FOL-BAG-${reference}`,reference,dimensions,"50–60 gsm paper + 6.3 μm foil",pack)) },
  { id: "medium-cutlery", sku: "AW-CUT-MW", name: "Medium-Weight Plastic Cutlery", category: "cutlery", materials: ["PP", "PS"], applications: ["Takeaway", "Catering", "Institutional foodservice"], summary: "White cutlery in bulk, individually wrapped and configurable meal-kit formats.", image: categoryImage("cutlery"), specificationStatus: "review", variants: [v("AW-CUT-MW-FK","Fork · bulk","","2.5 g","1,000 pcs/case"),v("AW-CUT-MW-KN","Knife · bulk","","2.5 g","1,000 pcs/case"),v("AW-CUT-MW-TS","Tea spoon · bulk","","2.5 g","1,000 pcs/case"),v("AW-CUT-MW-SS","Soup spoon · bulk","","2.5 g","1,000 pcs/case"),v("AW-CUT-MW-WR","Individually wrapped","","","1,000 pcs/case"),v("AW-KIT-MW-46","4–6 pc meal kits","","","250–400 kits/case")] },
  { id: "heavy-cutlery", sku: "AW-CUT-HW", name: "Heavy-Weight Plastic Cutlery", category: "cutlery", materials: ["PP", "PS"], applications: ["Premium takeaway", "Airline catering", "Catering"], summary: "White and black cutlery with bulk, wrapped and full meal-kit configurations.", image: categoryImage("cutlery"), specificationStatus: "review", variants: [v("AW-CUT-HW-WH","White · bulk","","","1,000 pcs/case"),v("AW-CUT-HW-BK","Black · bulk","","","1,000 pcs/case"),v("AW-CUT-HW-WR","Individually wrapped","","","1,000 pcs/case"),v("AW-KIT-HW-46","4–6 pc meal kits","","","250 kits/case")] },
  { id: "pe-shopping-bags", sku: "AW-BAG-PE", name: "PE T-Shirt Shopping Bags", category: "bags", materials: ["PE"], applications: ["Grocery", "Retail", "Takeaway"], summary: "Plain and printed carry bags in 1/6 and 1/8 formats with case-pack options.", image: categoryImage("bags"), specificationStatus: "review", variants: [v("AW-BAG-PE-16","1/6 format","","","200–300 pcs/case options"),v("AW-BAG-PE-18","1/8 format","","","200 pcs/case options")] },
  { id: "nonwoven-shopping-bags", sku: "AW-BAG-NW", name: "Non-Woven Shopping Bags", category: "bags", materials: ["Non-woven fabric"], applications: ["Retail", "Reusable carry", "Brand programs"], summary: "Structured non-woven carry bags reserved for dimensional and print-program confirmation.", image: categoryImage("bags"), specificationStatus: "pending", variants: [v("AW-BAG-NW-01","Standard program","","","Specification on request")] },
  { id: "nitrile-exam-gloves", sku: "AW-GLV-NI", name: "Powder-Free Nitrile Gloves", category: "gloves", materials: ["Nitrile"], applications: ["Handling", "Cleaning", "Professional tasks"], summary: "Powder-free nitrile glove family; intended use and compliance claims remain document-gated.", image: categoryImage("gloves"), specificationStatus: "pending", variants: ["XS","S","M","L","XL"].map((size) => v(`AW-GLV-NI-${size}`,size,"","","Specification on request")) },
  { id: "vinyl-exam-gloves", sku: "AW-GLV-VI", name: "Powder-Free Vinyl Exam Gloves", category: "gloves", materials: ["PVC / vinyl"], applications: ["Food handling", "General protection", "Cleaning"], summary: "Generic vinyl examination glove family with size, color and weight options to be confirmed.", image: categoryImage("gloves"), specificationStatus: "pending", variants: ["XS","S","M","L","XL"].map((size) => v(`AW-GLV-VI-${size}`,size,"","","Specification on request")) },
  { id: "latex-exam-gloves", sku: "AW-GLV-LA", name: "Powder-Free Latex Gloves", category: "gloves", materials: ["Natural rubber latex"], applications: ["Handling", "Professional tasks"], summary: "Natural-latex glove family; intended use and compliance claims depend on supplied documentation.", image: categoryImage("gloves"), specificationStatus: "pending", variants: ["XS","S","M","L","XL"].map((size) => v(`AW-GLV-LA-${size}`,size,"","","Specification on request")) },
  { id: "hdpe-gloves", sku: "AW-GLV-PE", name: "Disposable HDPE Gloves", category: "gloves", materials: ["HDPE"], applications: ["Food handling", "Housekeeping", "General use"], summary: "Lightweight clear or blue polyethylene handling gloves for high-turnover tasks.", image: categoryImage("gloves"), specificationStatus: "confirmed", variants: ["M","L","XL"].map((size) => v(`AW-GLV-PE-${size}`,size,"","","500 pcs/box · 20 boxes/case")) },
];

export const productFamilies = [...legacyFamilies, ...addedFamilies].map((family) => ({
  ...family,
  specificationStatus: family.specificationStatus === "pending" ? "pending" as const : "review" as const,
}));

export const equipmentFamilies = [
  { sku: "AW-EQP-LINE-01", name: "Automatic Aluminium Container Production Line", description: "A complete production-line capability for aluminium food-container programs. Commercial configuration and availability are confirmed per project." },
  { sku: "AW-EQP-MOULD-01", name: "Aluminium Container Mould Solutions", description: "Selected forming moulds are available for sale and can be reviewed alongside container specifications." },
  { sku: "AW-EQP-COLLECT-01", name: "Automatic Collection Equipment", description: "Downstream collection and handling equipment for line-efficiency discussions and selected equipment enquiries." },
];

export const getCategory = (slug: string) => catalogCategories.find((category) => category.slug === slug);
export const getFamiliesByCategory = (id: CategoryId) => productFamilies.filter((family) => family.category === id);
export const allMaterials = (families: ProductFamily[]) => [...new Set(families.flatMap((family) => family.materials))].sort();
