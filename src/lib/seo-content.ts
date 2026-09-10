import type { CategoryId } from "../catalog";

type SourcingNote = {
  label: string;
  title: string;
  body: string;
};

type BuyerQuestion = {
  question: string;
  answer: string;
};

type ProcurementField = {
  label: string;
  title: string;
  body: string;
};

type ClusterLink = {
  label: string;
  href: string;
  intent: string;
};

export type CategorySeoContent = {
  title: string;
  description: string;
  heading: string;
  introduction: string;
  notes: SourcingNote[];
  questions: BuyerQuestion[];
  procurement?: ProcurementField[];
  clusterLinks?: ClusterLink[];
  heroImage?: { src: string; width: number; height: number; alt: string; caption: string };
};

export const categorySeoContent: Record<CategoryId, CategorySeoContent> = {
  cups: {
    title: "Disposable Cups & Drinkware Wholesale",
    description: "Compare paper, kraft, PP and PET cups for hot and cold beverage programs. Review formats and prepare a custom wholesale packaging enquiry.",
    heading: "Specify the cup around the drink.",
    introduction: "A useful sourcing brief starts with the beverage, serving temperature and volume. From there, compare the cup material, rim and lid system, decoration area and case pack as one complete format.",
    notes: [
      { label: "01", title: "Beverage & service", body: "State whether the cup is for hot drinks, cold drinks, delivery, events or prepared retail service." },
      { label: "02", title: "Capacity & fit", body: "List the target volume and matching lid requirement. Dimensions should be confirmed for the selected model." },
      { label: "03", title: "Identity & packing", body: "Include artwork, colour, print coverage and any inner-pack or carton-mark requirements in the enquiry." },
    ],
    questions: [
      { question: "What information helps identify the right cup?", answer: "Share the drink type, serving temperature, capacity, lid style, quantity, destination and whether the cup needs printing." },
      { question: "Can cups be reviewed for custom branding?", answer: "Yes. Send the selected format and artwork brief so available print, sleeve and packing options can be reviewed for that model." },
      { question: "What is the MOQ for disposable cups?", answer: "MOQ is confirmed for the exact cup and lid models, sizes, material, colour, artwork, packing, quantity unit and destination. It is not one category-wide number." },
      { question: "Can one lid fit several cup sizes?", answer: "Only when the exact cup-and-lid pairings have been confirmed. Record the component references together and test the filled system in the intended service routine." },
      { question: "How should paper, PET and PP cups be compared?", answer: "Compare the exact models against the beverage, fill and hold conditions, presentation, closure, decoration, packing and destination evidence rather than selecting by material name alone." },
      { question: "Which documents should a cup buyer request?", answer: "Name the destination and intended beverage conditions, then request records that identify the relevant product or material, scope, issuer, test basis and validity. Availability is confirmed per model." },
    ],
    procurement: [
      { label: "01 / Application", title: "Beverage and service journey", body: "Record the drink, fill condition, portion, holding interval, counter or delivery routine, transport orientation and consumer opening." },
      { label: "02 / Specification", title: "Cup construction and size", body: "Shortlist the family by material, single-wall or double-wall construction where relevant, capacity, dimensions, colour or clarity and exact AW SKU." },
      { label: "03 / System", title: "Rim, lid and accessories", body: "List the cup and lid references together. Add opening style, straw, sleeve, sealing or other component needs and request confirmed compatibility." },
      { label: "04 / Identity", title: "Printing and artwork", body: "Define artwork versions, colours, coverage, print area, label or sleeve requirements, proof purpose and the person responsible for approval." },
      { label: "05 / Commercial", title: "MOQ and quotation basis", body: "State quantity per cup, lid, size, colour and artwork and whether it means pieces, sleeves or cases. Request the MOQ basis and quoted quantity together." },
      { label: "06 / Approval", title: "Samples and filled-service test", body: "Define what the sample must prove, then test the exact cup-and-lid set with the intended beverage, fill level, holding and delivery routine." },
      { label: "07 / Logistics", title: "Case packs and loading", body: "Request pieces per sleeve, sleeves per case, carton dimensions and gross weight for every cup, lid and accessory. Calculate complete usable sets." },
      { label: "08 / Evidence", title: "Documents and final confirmation", body: "Name the destination and intended use, review model-relevant records and confirm specification, documents, commercial terms and milestones in writing." },
    ],
    clusterLinks: [
      { label: "Disposable cup sourcing guide", href: "/guides/disposable-cup-sourcing-guide/", intent: "Complete purchasing brief" },
      { label: "Paper vs plastic cups", href: "/guides/paper-vs-plastic-disposable-cups/", intent: "Material and construction comparison" },
      { label: "Cup and lid compatibility", href: "/guides/disposable-cup-lid-compatibility/", intent: "Component system" },
      { label: "Disposable cup MOQ", href: "/guides/disposable-cup-moq/", intent: "Commercial planning" },
      { label: "Printing, proofs and samples", href: "/guides/disposable-cup-printing-samples/", intent: "Artwork approval" },
      { label: "Lead time, packing and loading", href: "/guides/disposable-cup-lead-time-packing/", intent: "Delivery planning" },
      { label: "Custom printed coffee cups", href: "/solutions/custom-printed-coffee-cups/", intent: "Coffee brand program" },
      { label: "PET and PP cold drink cups", href: "/solutions/cold-drink-cup-programs/", intent: "Cold beverage scenario" },
      { label: "Evaluate a plastic cup supplier", href: "/guides/how-to-evaluate-plastic-cup-manufacturer/", intent: "Supplier due diligence" },
    ],
  },
  boxes: {
    title: "Takeaway Food Containers Wholesale",
    description: "Compare hinged, folded, clear and aluminium takeaway food containers for deli, retail and prepared meals. Request model-specific specifications.",
    heading: "Start with the food, then define the container.",
    introduction: "The right takeaway format depends on portion shape, temperature, holding time and the way the food travels. A complete brief connects those conditions to the material, closure, compartment layout and case pack.",
    notes: [
      { label: "01", title: "Food & portion", body: "Describe the meal, portion size and whether separate compartments or a clear presentation are important." },
      { label: "02", title: "Service conditions", body: "Share filling temperature, holding time, transport method and any reheating or chilling requirement for review." },
      { label: "03", title: "Closure & packing", body: "Confirm whether you need a hinged lid, separate lid, folded closure, sealing review or a specific case configuration." },
    ],
    questions: [
      { question: "Which details should be confirmed before quotation?", answer: "Include the food application, target capacity or dimensions, material preference, lid or closure, quantity and destination market." },
      { question: "Are all containers suitable for every temperature?", answer: "No. Suitability depends on the exact material, model and intended use, so temperature and service conditions should be confirmed in writing." },
      { question: "What is the MOQ for takeaway food containers?", answer: "MOQ is not one category-wide number. It is quoted for the selected model, material, colour, printing, packing and order destination." },
      { question: "Can buyers request samples before a bulk order?", answer: "A sample route can be reviewed after the format and application are defined. Confirm whether the sample is a catalogue reference, custom prototype or production-representative sample, together with any cost and timing." },
      { question: "How is production lead time confirmed?", answer: "Lead time is confirmed after the specification, quantity, artwork, sample status and packing are agreed. Ask for the starting point and shipment-ready milestone to be stated in the quotation." },
      { question: "Which documents should be requested?", answer: "Name the destination market and intended food-contact conditions, then request documents that identify the exact product or material, scope, issuer and validity period. Availability is confirmed per model." },
    ],
    procurement: [
      { label: "01 / Application", title: "Food, portion and service journey", body: "Record the food type, portion geometry, filling condition, holding interval, transport orientation and whether reheating, chilling or display is part of the intended use." },
      { label: "02 / Specification", title: "Material, size and closure", body: "Shortlist the model by usable dimensions or capacity, material, compartment layout, closure and any matched lid. Final suitability is confirmed for the exact model." },
      { label: "03 / Commercial", title: "MOQ and quotation basis", body: "State quantity per model and whether it means pieces, packs or cases. MOQ, price and availability are quoted against the selected construction and project scope." },
      { label: "04 / Identity", title: "Printing and customization", body: "Separate the base container from artwork, colour, print coverage, label, sleeve, embossing, inner pack and carton-mark requirements so each approval point is visible." },
      { label: "05 / Approval", title: "Samples and prototyping", body: "Define what the sample must prove: portion fit, closure, stacking, artwork layout or production finish. Record the approved model and version before order release." },
      { label: "06 / Timing", title: "Lead time and milestones", body: "Request the timing basis for samples, artwork approval, production and shipment readiness. Timing remains provisional until the specification and quantity are confirmed." },
      { label: "07 / Logistics", title: "Packing and container loading", body: "Ask for pieces per pack, packs per case, carton dimensions and gross weight by model. Loading estimates should use confirmed case data and the agreed assortment." },
      { label: "08 / Evidence", title: "Certificates and test records", body: "Specify the destination and intended use, then review available declarations or reports for the exact product or material. Do not infer coverage from a related item." },
    ],
    clusterLinks: [
      { label: "Custom takeaway containers", href: "/solutions/custom-takeaway-containers/", intent: "Customization & supplier brief" },
      { label: "Hinged vs folded containers", href: "/guides/hinged-vs-folded-takeaway-containers/", intent: "Format comparison" },
      { label: "How to choose takeaway packaging", href: "/guides/how-to-choose-takeaway-packaging/", intent: "Selection guide" },
      { label: "Takeaway container MOQ", href: "/guides/takeaway-container-moq/", intent: "Commercial planning" },
      { label: "Samples and prototyping", href: "/guides/takeaway-container-samples-prototyping/", intent: "Approval process" },
      { label: "Lead time, packing and loading", href: "/guides/takeaway-container-lead-time-packing/", intent: "Delivery planning" },
      { label: "Restaurant chain packaging", href: "/solutions/restaurant-chain-takeaway-packaging/", intent: "Multi-site scenario" },
      { label: "Prepared-food retail packaging", href: "/solutions/prepared-food-retail-packaging/", intent: "Retail scenario" },
      { label: "Verify a packaging supplier", href: "/guides/how-to-verify-food-packaging-supplier/", intent: "Supplier due diligence" },
    ],
  },
  tableware: {
    title: "Disposable Plates, Bowls & Trays Wholesale",
    description: "Source molded-fiber, PP and HIPS plates, bowls and trays for catering and meal service. Compare formats, materials and commercial options.",
    heading: "Build the format around the way the meal is served.",
    introduction: "Plate diameter is only one part of a tableware brief. Portion weight, food type, rim profile, compartment layout and stacking all affect the format a buyer should evaluate.",
    notes: [
      { label: "01", title: "Meal geometry", body: "Identify whether the service needs a plate, bowl or divided tray and provide the target portion or dimensions." },
      { label: "02", title: "Material review", body: "Compare molded fiber, PP and HIPS in the context of the food, service conditions and destination requirements." },
      { label: "03", title: "Operational fit", body: "Include stacking, dispensing, packing and transport details that affect back-of-house handling." },
    ],
    questions: [
      { question: "How should buyers compare tableware formats?", answer: "Compare usable dimensions, depth, material, portion load, compartment layout and case pack rather than relying on diameter alone." },
      { question: "Can material suitability be assumed from the category name?", answer: "No. Confirm the exact model, food contact conditions and destination-market documentation before ordering." },
    ],
  },
  foil: {
    title: "Aluminium Foil, Food Wraps & Baking Paper",
    description: "Compare aluminium rolls, pop-up foil sheets, laminated food bags and baking paper for food preparation, wrapping and service programs.",
    heading: "Define the wrap by format, gauge and task.",
    introduction: "A foil or baking-paper enquiry becomes more accurate when the buyer specifies the working width, sheet or roll format, material construction, food application and dispensing method.",
    notes: [
      { label: "01", title: "Format", body: "Choose between rolls, pre-cut sheets, pop-up sheets, laminated bags or baking-paper formats." },
      { label: "02", title: "Working specification", body: "Provide width, length or sheet size together with thickness, basis weight or construction where known." },
      { label: "03", title: "Use & dispensing", body: "Describe the food task, handling environment and whether a cutter box, interfolded dispenser or custom pack is needed." },
    ],
    questions: [
      { question: "What should be included in a foil enquiry?", answer: "Share the required format, dimensions, thickness or construction, quantity, packing style, food application and destination." },
      { question: "Are the listed specifications final?", answer: "They are catalogue references for comparison. Final construction, tolerances, packing and intended use must be confirmed for the selected model." },
    ],
  },
  cutlery: {
    title: "Disposable Cutlery & Meal Kits Wholesale",
    description: "Compare PP and PS disposable cutlery, individually wrapped utensils and configured meal kits for wholesale, takeaway, catering and airline programs.",
    heading: "Specify every piece in the set.",
    introduction: "For cutlery and meal kits, the usable specification includes more than the utensil. Material, piece weight, colour, wrapping film, napkin and condiment configuration all belong in the same brief.",
    heroImage: {
      src: "/assets/editorial/2026-09-r1/cutlery-foodservice-table-v1.webp",
      width: 1448,
      height: 1086,
      alt: "Disposable cutlery served with pasta and prepared grain bowls in a foodservice setting",
      caption: "Foodservice context illustration. Confirm each utensil model for the intended menu and service routine.",
    },
    notes: [
      { label: "01", title: "Utensil format", body: "List the fork, knife, spoon or serving pieces required together with material, colour and weight preference." },
      { label: "02", title: "Kit configuration", body: "Describe each component in the meal kit, including napkin, toothpick, condiments and any printed insert." },
      { label: "03", title: "Wrap & case pack", body: "Confirm bulk or wrapped presentation, wrapper artwork and the preferred number of sets per inner pack and case." },
    ],
    questions: [
      { question: "Can individual utensils and complete kits be sourced?", answer: "The range includes bulk, individually wrapped and configured kit references. Confirm the exact components and packing with the enquiry." },
      { question: "What makes a meal-kit quotation accurate?", answer: "Provide the piece list, material, colour, wrapping, print requirement, quantity, destination and target packing configuration." },
      { question: "What is the MOQ for disposable cutlery or meal kits?", answer: "MOQ is confirmed for the exact utensil models, material, colour, component list, wrapper, artwork, packing and destination. It is not one category-wide number." },
      { question: "How should PP and PS cutlery be compared?", answer: "Compare exact fork, knife and spoon models under the intended menu and service routine, using confirmed specifications, identified samples and model-relevant documents rather than a resin-wide assumption." },
      { question: "Can meal-kit wrappers be custom printed?", answer: "Print options can be reviewed after the wrapper and kit configuration are defined. State artwork versions, colours, coverage, language, barcode, proof and sample requirements." },
      { question: "Does ANWELLUP claim airline approval for its meal kits?", answer: "No general airline approval is claimed. The exact products, components, samples, records and airline- or caterer-specific requirements must be reviewed for each program." },
    ],
    procurement: [
      { label: "01 / Service", title: "Menu and operating journey", body: "Record the food, serving conditions, takeaway, catering or transport routine, storage, issue point and customer handling." },
      { label: "02 / Components", title: "Utensil bill of materials", body: "List each fork, knife, spoon, napkin, toothpick, wipe, condiment or insert with its model or agreed specification." },
      { label: "03 / Specification", title: "Material, colour and weight", body: "Name PP or PS preference, colour, piece-weight target where relevant, dimensions or drawing status and every exact AW SKU under review." },
      { label: "04 / Presentation", title: "Bulk, wrapped or configured kit", body: "Define whether pieces are loose, individually wrapped or assembled; add wrapper construction, seal, print and component orientation." },
      { label: "05 / Approval", title: "Samples and quality checks", body: "Identify what each sample represents and record measurable checks, representative food-use handling, wrapper presentation and component completeness." },
      { label: "06 / Commercial", title: "MOQ and complete-kit pricing", body: "State quantities by utensil or kit version and clarify pieces, packs, cases or complete sets. Request MOQ and price on that same basis." },
      { label: "07 / Logistics", title: "Case packs and milestones", body: "Request inner and outer quantities, carton dimensions, gross weight, carton marks, approval stages, production trigger and shipment-ready date." },
      { label: "08 / Evidence", title: "Documents and final control", body: "Name the destination and program requirements, review model-relevant records and freeze the bill of materials, artwork, samples and change owner." },
    ],
    clusterLinks: [
      { label: "Disposable cutlery sets bulk guide", href: "/guides/disposable-cutlery-sets-bulk/", intent: "Complete wholesale brief" },
      { label: "PP vs PS disposable cutlery", href: "/guides/pp-vs-ps-disposable-cutlery/", intent: "Material and model comparison" },
      { label: "Bulk vs individually wrapped cutlery", href: "/guides/bulk-vs-individually-wrapped-cutlery/", intent: "Presentation and operations" },
      { label: "Airline meal-kit specification", href: "/guides/how-to-specify-airline-meal-kits/", intent: "Transport-catering requirements" },
      { label: "Cutlery sample and quality checks", href: "/guides/disposable-cutlery-samples-quality-checks/", intent: "Approval and inspection" },
      { label: "Meal-kit MOQ, packing and lead time", href: "/guides/meal-kit-moq-packing-lead-time/", intent: "Commercial and logistics planning" },
      { label: "Airline catering meal kits", href: "/solutions/airline-catering-meal-kits/", intent: "Airline and inflight sourcing" },
      { label: "Custom wrapped meal kits", href: "/solutions/custom-wrapped-meal-kits/", intent: "Private-label kit program" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/", intent: "Final enquiry preparation" },
    ],
  },
  bags: {
    title: "Custom Carry & Shopping Bags Wholesale",
    description: "Review PE T-shirt and non-woven carry bags for takeaway and retail programs. Prepare a wholesale enquiry for size, print and packing options.",
    heading: "Define the bag by what it needs to carry.",
    introduction: "Bag dimensions alone do not describe the job. Buyers should also specify the product load, material, thickness or fabric weight, handle format, print coverage and case pack.",
    notes: [
      { label: "01", title: "Load & dimensions", body: "Share the packed product, expected load and finished width, gusset and length where available." },
      { label: "02", title: "Material & handle", body: "Identify PE or non-woven construction and describe the preferred handle or carry format." },
      { label: "03", title: "Print & presentation", body: "Include artwork colours, print sides, bag colour, fold, inner pack and carton-mark requirements." },
    ],
    questions: [
      { question: "What is needed for a custom printed bag enquiry?", answer: "Send the bag type, finished dimensions, material, thickness or fabric weight, load, print artwork, quantity and destination." },
      { question: "Does one photograph represent every bag model?", answer: "No. The image shows a representative PE carry-bag range. Dimensions, construction and non-woven references must be confirmed separately." },
    ],
  },
  gloves: {
    title: "Disposable Gloves for Food Handling & Operations",
    description: "Compare nitrile, vinyl, latex, HDPE and TPE disposable gloves for handling and operational tasks, subject to model-specific document review.",
    heading: "Match the glove to the task and documentation.",
    introduction: "A glove brief should begin with the exact task, contact conditions and destination requirements. Material, size, colour, weight and packing can then be evaluated without assuming unsupported performance claims.",
    notes: [
      { label: "01", title: "Task & contact", body: "Describe the handling, cleaning or operational task and any relevant food-contact or workplace conditions." },
      { label: "02", title: "Material & fit", body: "State the preferred material, sizes, colour, texture and weight or thickness requirement where known." },
      { label: "03", title: "Document scope", body: "Name the destination market and request records for the exact model and intended use before confirming suitability." },
    ],
    questions: [
      { question: "Can compliance be inferred from the glove name?", answer: "No. Intended-use and compliance claims depend on the exact model and supporting documents available for the destination market." },
      { question: "Which details help prepare a glove quotation?", answer: "Provide the task, material, sizes, colour, weight or thickness, packing, quantity, destination and required documents." },
    ],
  },
};
