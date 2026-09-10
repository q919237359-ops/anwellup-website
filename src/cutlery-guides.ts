import type { BuyingGuide } from "./guides";

const foodserviceImage = "/assets/editorial/2026-09-r1/cutlery-foodservice-table-v1.webp";
const airlineImage = "/assets/editorial/2026-09-r1/airline-meal-kit-service-v1.webp";
const wrappedImage = "/assets/editorial/2026-09-r1/wrapped-cutlery-takeaway-v1.webp";
const imageWidth = 1448;
const imageHeight = 1086;
const published = "2026-09-10";
const updated = "2026-09-10";

export const cutleryClusterGuides: BuyingGuide[] = [
  {
    slug: "disposable-cutlery-sets-bulk",
    title: "Disposable cutlery sets in bulk: a wholesale buyer guide",
    seoTitle: "Disposable Cutlery Sets Bulk Buying Guide",
    shortTitle: "Source disposable cutlery sets in bulk",
    description: "Source bulk disposable cutlery and configured meal kits by utensil list, PP or PS material, piece weight, wrapping, case pack, MOQ and approval evidence.",
    lede: "A bulk cutlery quote is only comparable when every utensil, material, colour, wrapper and case quantity is defined. Start with the foodservice task, then build the individual pieces or complete kit as a controlled bill of materials.",
    image: foodserviceImage,
    imageAlt: "Bulk disposable forks, knives, spoons and configured meal kits",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Define the meal and operating environment.",
        paragraphs: [
          "Describe the menu, serving method, takeaway or transport journey, expected handling and whether the utensils are issued individually or as a prepared set. Record the destination market and any operator-specific requirements.",
          "The meal context helps shortlist a format, but suitability and supporting records still need to be confirmed for the exact model and intended use.",
        ],
        checklist: ["Menu and serving task", "Takeaway, catering or transport use", "Individual or complete set", "Colour and presentation", "Destination market"],
        links: [{ label: "Browse cutlery and meal-kit families", href: "/products/cutlery-meal-kits/" }],
      },
      {
        heading: "Build a line-by-line utensil specification.",
        paragraphs: [
          "List every required fork, knife, tea spoon, soup spoon or accessory as a separate line. Add the family, AW SKU, PP or PS preference, colour and piece-weight target where available.",
          "Do not substitute a family label for a finished specification. Missing dimensions, weights or tolerances should remain open questions in the RFQ.",
        ],
        evidence: [
          { label: "Medium-weight family", value: "AW-CUT-MW lists PP and PS options; selected bulk utensils show 2.5 g and 1,000 pcs/case", href: "/products/cutlery-meal-kits/medium-cutlery/" },
          { label: "Heavy-weight family", value: "AW-CUT-HW lists white, black, wrapped and 4–6 piece kit references; model details remain subject to review", href: "/products/cutlery-meal-kits/heavy-cutlery/" },
        ],
      },
      {
        heading: "Choose bulk, wrapped or configured kits.",
        paragraphs: [
          "Bulk utensils, individually wrapped pieces and multi-component kits create different order units and packing work. State whether each utensil is loose, singly wrapped or assembled with other components.",
          "For a kit, create a bill of materials that includes napkin, toothpick, condiments, wipe or printed insert when required. Do not describe a changing component list as one fixed SKU.",
        ],
        links: [{ label: "Compare bulk and wrapped presentation", href: "/guides/bulk-vs-individually-wrapped-cutlery/" }],
      },
      {
        heading: "Confirm sample and quality decisions.",
        paragraphs: [
          "Use identified samples to review utensil form, finish, colour, grip, food-use handling, wrapper presentation and the completeness of every kit. Record which model and configuration the sample represents.",
          "Agree the measurable inspection fields and acceptance method before production. A catalogue image alone is not an approved sample or tolerance record.",
        ],
        links: [{ label: "Plan cutlery sample checks", href: "/guides/disposable-cutlery-samples-quality-checks/" }],
      },
      {
        heading: "Compare MOQ and case packs on the same unit.",
        paragraphs: [
          "Ask whether MOQ and price are quoted per utensil, inner pack, case, complete kit or production configuration. Break quantities down by material, colour, wrapper and component list.",
          "Convert the planned order into full cases and complete usable kits. A 1,000-piece utensil case and a 250-kit case are not directly comparable order units.",
        ],
        links: [{ label: "Structure MOQ, packing and timing", href: "/guides/meal-kit-moq-packing-lead-time/" }],
      },
      {
        heading: "Release the order against one controlled record.",
        paragraphs: [
          "Confirm the final bill of materials, model references, material, colour, wrapper, artwork, pack quantities, samples, inspection fields, available documents, price and delivery basis in writing.",
          "Any alternative material, utensil or pack should be identified as a new option and reviewed against the same requirements before approval.",
        ],
        links: [{ label: "Use the food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }, { label: "Send the cutlery brief", href: "/contact/" }],
      },
    ],
    questions: [
      { question: "What should a bulk disposable-cutlery quote include?", answer: "It should identify each utensil or kit component, exact model, material, colour, weight where specified, wrapping, artwork, quantity unit, case pack, MOQ basis, sample status, documents and delivery terms." },
      { question: "Can loose utensils and complete kits be combined in one program?", answer: "They can be quoted as separate order lines. State the quantity and pack unit for each so case rounding and complete-kit quantities remain visible." },
      { question: "Are the listed case quantities final for every order?", answer: "They are current catalogue references for selected models. Confirm the final model, configuration, inner pack and case quantity in the written quotation." },
    ],
    related: [
      { label: "Cutlery and meal kits", href: "/products/cutlery-meal-kits/" },
      { label: "PP vs PS disposable cutlery", href: "/guides/pp-vs-ps-disposable-cutlery/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "pp-vs-ps-disposable-cutlery",
    title: "PP vs PS disposable cutlery: a sourcing comparison",
    seoTitle: "PP vs PS Disposable Cutlery",
    shortTitle: "Compare PP and PS disposable cutlery",
    description: "Compare PP and PS disposable cutlery through exact models, utensil form, piece weight, sample handling, wrapping, documents and commercial requirements.",
    lede: "PP and PS are starting points for a disposable-cutlery comparison, not complete performance claims. Buyers should compare exact fork, knife and spoon models under the real meal and service routine, then confirm the specification and evidence in writing.",
    image: foodserviceImage,
    imageAlt: "PP and PS disposable cutlery models prepared for buyer comparison",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Begin with the utensil task.",
        paragraphs: [
          "Record the food, serving temperature, cutting or scooping task, holding interval and transport context. Different pieces in the same meal kit can face different handling requirements.",
          "Use the task to define what must be reviewed in samples; do not infer universal strength, heat or flexibility from the resin name alone.",
        ],
        checklist: ["Fork, knife or spoon task", "Food and serving condition", "Grip and handling", "Bulk or wrapped format", "Destination market"],
        links: [{ label: "Start with the cutlery range", href: "/products/cutlery-meal-kits/" }],
      },
      {
        heading: "Compare exact models and measurable fields.",
        paragraphs: [
          "Record the family, AW SKU, declared material, piece weight where listed, colour, dimensions or drawing status and packing. Keep unlisted values open rather than borrowing them from a related utensil.",
          "The current medium- and heavy-weight families both list PP and PS as material options, but final construction and model data are confirmed during review.",
        ],
        evidence: [
          { label: "AW-CUT-MW", value: "Medium-weight PP/PS family with selected 2.5 g bulk fork, knife, tea-spoon and soup-spoon references", href: "/products/cutlery-meal-kits/medium-cutlery/" },
          { label: "AW-CUT-HW", value: "Heavy-weight PP/PS family with white, black, wrapped and configured-kit references", href: "/products/cutlery-meal-kits/heavy-cutlery/" },
        ],
      },
      {
        heading: "Use samples for the intended decision.",
        paragraphs: [
          "Review the exact utensil with the representative food and operating routine. Record observations for grip, edge or bowl form, finish, visible defects, colour, handling and any breakage event under the agreed test.",
          "State the sample identity and conditions. A result from one fork model should not be generalized to every PP or PS item.",
        ],
        links: [{ label: "Build the sample and quality checklist", href: "/guides/disposable-cutlery-samples-quality-checks/" }],
      },
      {
        heading: "Review wrapping and kit assembly separately.",
        paragraphs: [
          "Material selection does not define whether the product is bulk packed, individually wrapped or assembled into a meal kit. Specify presentation, wrapper, seal, artwork and every additional component as separate fields.",
          "If a material option changes packing, MOQ or lead time, request those differences on the same comparison sheet.",
        ],
        links: [{ label: "Compare bulk and individually wrapped formats", href: "/guides/bulk-vs-individually-wrapped-cutlery/" }],
      },
      {
        heading: "Ask for model-relevant documents.",
        paragraphs: [
          "Name the destination market and intended food-contact conditions, then request records that identify the relevant product or material, scope, issuer, test basis and validity.",
          "Do not treat a generic resin statement or a document for a related model as proof for the selected utensil. Keep the document review connected to the final SKU and material.",
        ],
        links: [{ label: "Review quality and document handling", href: "/quality-compliance/" }],
      },
      {
        heading: "Make the commercial comparison complete.",
        paragraphs: [
          "Compare price, MOQ, quantity unit, inner pack, case quantity, sample status, production milestones and shipment basis for the exact PP and PS options under review.",
          "Choose against the full service, approval and commercial record. The lower piece price is not conclusive if the specification, packing or usable-kit quantity differs.",
        ],
        links: [{ label: "Prepare a comparable bulk-cutlery RFQ", href: "/guides/disposable-cutlery-sets-bulk/" }, { label: "Send the comparison", href: "/contact/" }],
      },
    ],
    questions: [
      { question: "Is PP always more flexible than PS cutlery?", answer: "Do not use a material-wide shortcut as approval. Compare the exact models and agreed piece weights under the intended food and handling conditions." },
      { question: "Can PP and PS utensils be mixed in one kit?", answer: "A mixed configuration can be reviewed if each component, material and model is named. Confirm assembly, packing, MOQ, samples and documents for that exact bill of materials." },
      { question: "Which material is suitable for an airline meal kit?", answer: "Suitability depends on the exact utensil, menu, service routine, transport program and evidence requirements. State those conditions and evaluate model-specific samples and documents." },
    ],
    related: [
      { label: "Disposable cutlery sets in bulk", href: "/guides/disposable-cutlery-sets-bulk/" },
      { label: "Airline meal-kit specification", href: "/guides/how-to-specify-airline-meal-kits/" },
      { label: "Quality and compliance", href: "/quality-compliance/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "bulk-vs-individually-wrapped-cutlery",
    title: "Bulk vs individually wrapped disposable cutlery",
    seoTitle: "Bulk vs Individually Wrapped Cutlery",
    shortTitle: "Choose bulk or wrapped cutlery",
    description: "Compare bulk and individually wrapped disposable cutlery by service flow, component control, wrapper specification, artwork, case packs and waste considerations.",
    lede: "Bulk and individually wrapped cutlery solve different operational problems. The decision should follow the issuing routine, handling controls, kit completeness, branding, storage and total pack system—not a generic assumption that one format is always better.",
    image: wrappedImage,
    imageAlt: "Bulk and individually wrapped disposable cutlery presentation options",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Map how utensils reach the customer.",
        paragraphs: [
          "Document where utensils are stored, who selects them, whether staff or customers handle the pieces and whether the order is assembled centrally or at the point of service.",
          "Add delivery, airline tray, catering or takeaway steps that affect how the utensils must remain grouped and identifiable.",
        ],
        checklist: ["Issue point", "Staff or self-service handling", "Central or store assembly", "Delivery or tray service", "Required components"],
        links: [{ label: "Browse bulk, wrapped and kit formats", href: "/products/cutlery-meal-kits/" }],
      },
      {
        heading: "Specify bulk packing as a real configuration.",
        paragraphs: [
          "For bulk pieces, record the utensil model, material, colour, pieces per inner pack and case, and how staff will pick or assemble them. Include any inner-bag or dispenser requirement.",
          "Calculate the labour and inventory effect of creating sets on site. Keep the fork, knife and spoon case quantities visible when their use rates differ.",
        ],
        evidence: [
          { label: "Medium-weight bulk", value: "Selected fork, knife, tea-spoon and soup-spoon entries list 1,000 pcs/case", href: "/products/cutlery-meal-kits/medium-cutlery/" },
          { label: "Heavy-weight bulk", value: "Current white and black bulk references list 1,000 pcs/case", href: "/products/cutlery-meal-kits/heavy-cutlery/" },
        ],
      },
      {
        heading: "Define every wrapped component.",
        paragraphs: [
          "State whether the wrapper contains one utensil or a complete kit. List film or paper preference, transparency, print, seal presentation, barcode or date-code needs and each inserted component.",
          "Wrapper material, dimensions and seal performance are project fields to confirm; a photograph of a wrapped item does not define them.",
        ],
        links: [{ label: "Configure a complete meal kit", href: "/guides/how-to-specify-airline-meal-kits/" }],
      },
      {
        heading: "Test the operating routine, not only appearance.",
        paragraphs: [
          "Run samples through receiving, storage, picking, tray or bag assembly, transport and customer opening. Record missing pieces, wrapper condition, ease of issue and any operational error.",
          "Use the same menu and workflow when comparing options. Define the test and sample identity so the result can be repeated.",
        ],
        links: [{ label: "Plan sample and quality checks", href: "/guides/disposable-cutlery-samples-quality-checks/" }],
      },
      {
        heading: "Compare material and waste by complete service.",
        paragraphs: [
          "Count all utensils, wrappers, napkins and added components issued per meal. Separate measured material or pack quantities from unsupported environmental claims.",
          "If sustainability information is required, request model- and component-specific evidence and review it against the destination market and the buyer's own program criteria.",
        ],
        links: [{ label: "Compare PP and PS cutlery", href: "/guides/pp-vs-ps-disposable-cutlery/" }],
      },
      {
        heading: "Quote complete costs and order units.",
        paragraphs: [
          "Compare the bulk pieces, assembly work, wrapper, inserted components, inner packs, case quantities and usable sets. Ask whether MOQ applies per utensil, wrapper artwork or kit configuration.",
          "Confirm the final format, packing, sample record, documents, quantities, price and shipment milestone before release.",
        ],
        links: [{ label: "Review meal-kit MOQ and packing", href: "/guides/meal-kit-moq-packing-lead-time/" }, { label: "Build the RFQ", href: "/guides/food-packaging-rfq-checklist/" }],
      },
    ],
    questions: [
      { question: "Is individually wrapped cutlery always more hygienic?", answer: "Do not make a universal claim from presentation alone. Review the exact wrapper, handling process, intended use and applicable evidence for the program." },
      { question: "Is bulk cutlery always cheaper?", answer: "Compare the complete service cost, including staff assembly, inventory, inner packing, unused components and order quantities—not only the utensil piece price." },
      { question: "Can the wrapper be custom printed?", answer: "Artwork and print options can be reviewed after the wrapper and kit configuration are defined. Confirm feasibility, proof route, MOQ, packing and final version in writing." },
    ],
    related: [
      { label: "Cutlery and meal kits", href: "/products/cutlery-meal-kits/" },
      { label: "Disposable cutlery sets bulk guide", href: "/guides/disposable-cutlery-sets-bulk/" },
      { label: "Custom wrapped meal kits", href: "/solutions/custom-wrapped-meal-kits/" },
    ],
  },
  {
    slug: "how-to-specify-airline-meal-kits",
    title: "How to specify airline meal kits for supplier review",
    seoTitle: "Airline Meal Kit Supplier Specification Guide",
    shortTitle: "Specify airline meal kits",
    description: "Prepare an airline meal-kit supplier brief covering menu, utensil bill of materials, material, wrapper, weight, tray assembly, case packs, samples and documents.",
    lede: "An airline meal kit is a multi-component operational pack, not a generic cutlery set. The useful specification connects the menu and tray-service routine to every utensil, napkin, accessory, wrapper, case pack, approval step and destination requirement.",
    image: airlineImage,
    imageAlt: "Configured cutlery and meal-kit components for airline catering review",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Map the menu and tray-service journey.",
        paragraphs: [
          "Describe the cabin or service context, menu components, tray layout, uplift and storage routine, crew handling, passenger opening and waste-collection process. Identify different menus or service classes as separate configurations.",
          "Do not rely on an airline label as a complete technical requirement. The buyer or caterer should provide the applicable program standards and destination needs.",
        ],
        checklist: ["Menu and service class", "Tray or meal-box layout", "Uplift and storage routine", "Crew and passenger handling", "Program standards"],
        links: [{ label: "Review the current cutlery families", href: "/products/cutlery-meal-kits/" }],
      },
      {
        heading: "Create a controlled bill of materials.",
        paragraphs: [
          "List the exact fork, knife, spoon, stirrer, napkin, toothpick, wipe, condiment and printed insert required. Assign a model or specification to each component and identify optional items.",
          "Maintain a separate bill of materials for every changing menu, artwork or service class. This prevents a sample kit from becoming an ambiguous master reference.",
        ],
        evidence: [
          { label: "Medium-weight kit reference", value: "AW-KIT-MW-46 currently lists a 4–6 piece meal-kit format and 250–400 kits/case", href: "/products/cutlery-meal-kits/medium-cutlery/" },
          { label: "Heavy-weight kit reference", value: "AW-KIT-HW-46 currently lists a 4–6 piece meal-kit format and 250 kits/case", href: "/products/cutlery-meal-kits/heavy-cutlery/" },
        ],
      },
      {
        heading: "Define wrapper and identification requirements.",
        paragraphs: [
          "Specify wrapper construction to be reviewed, finished size, transparency or colour, seal presentation, print sides, artwork versions, barcode, language and any lot or date identification requirement.",
          "Use the dieline and proof route for the exact wrapper configuration. Keep airline or caterer artwork approval separate from utensil-model approval.",
        ],
        links: [{ label: "Compare bulk and wrapped cutlery", href: "/guides/bulk-vs-individually-wrapped-cutlery/" }],
      },
      {
        heading: "Test tray fit and real service handling.",
        paragraphs: [
          "Place the sample kit in the intended tray or meal box and run it through assembly, storage, uplift, transport, distribution and passenger opening. Review dimensions, presentation, component completeness and wrapper condition.",
          "Test utensils with representative menu items under defined conditions. Record the sample references, observers, outcomes and unresolved actions.",
        ],
        links: [{ label: "Use the sample and quality checklist", href: "/guides/disposable-cutlery-samples-quality-checks/" }],
      },
      {
        heading: "Request model- and program-specific evidence.",
        paragraphs: [
          "State the intended food-contact use, destination and any airline, caterer or tender document list. Ask what records are available for the exact utensils, wrapper and included components.",
          "Review product identity, scope, issuer, test basis and validity. ANWELLUP does not claim airline approval or a certification without the model-specific record and program review.",
        ],
        links: [{ label: "Review quality and document handling", href: "/quality-compliance/" }],
      },
      {
        heading: "Align demand, packing and milestones.",
        paragraphs: [
          "Break quantities down by kit configuration, route or artwork where relevant. Request MOQ, price, inner pack, case quantity, carton dimensions, gross weight, sampling, approval, production and shipment-ready milestones.",
          "Before release, freeze the bill of materials, approved samples, artwork, inspection plan, documents, packing, delivery basis and change-control owner.",
        ],
        links: [{ label: "Review MOQ, packing and lead time", href: "/guides/meal-kit-moq-packing-lead-time/" }, { label: "Plan an airline-catering sourcing program", href: "/solutions/airline-catering-meal-kits/" }],
      },
    ],
    questions: [
      { question: "What information does an airline meal-kit supplier need?", answer: "Provide the menu and service context, bill of materials, utensil specifications, wrapper and artwork, quantity by configuration, case-pack needs, sample tests, document list, milestones and destination." },
      { question: "Does ANWELLUP claim airline certification?", answer: "No general airline approval is claimed. Applicable product records and any airline- or caterer-specific requirements must be reviewed for the exact model and program." },
      { question: "Can several routes or service classes share one kit?", answer: "Only if their component, artwork, operational and approval requirements are genuinely identical. Keep separate configuration records whenever a requirement changes." },
    ],
    related: [
      { label: "Airline catering meal-kit program", href: "/solutions/airline-catering-meal-kits/" },
      { label: "Disposable cutlery sets bulk guide", href: "/guides/disposable-cutlery-sets-bulk/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "disposable-cutlery-samples-quality-checks",
    title: "Disposable cutlery samples and quality checks",
    seoTitle: "Disposable Cutlery Sample & Quality Checklist",
    shortTitle: "Check disposable cutlery samples",
    description: "Review disposable cutlery samples with exact model identity, agreed measurements, visual checks, food-use handling, wrapper and kit completeness, and approval records.",
    lede: "A cutlery sample is useful only when the buyer knows exactly which model, material, configuration and production status it represents. Define the decision first, then record measurable and service-based checks without turning one result into a category-wide claim.",
    image: foodserviceImage,
    imageAlt: "Disposable cutlery samples organized for model and kit quality review",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Identify the sample before testing.",
        paragraphs: [
          "Record family, AW SKU, utensil type, material, colour, declared piece weight, dimensions or drawing revision, wrapper and kit bill of materials. Mark whether it is a catalogue, pre-production or production-representative sample.",
          "Photograph and label the received sample and packaging. An unidentified sample cannot control a later order.",
        ],
        checklist: ["AW SKU and utensil", "Material and colour", "Weight or drawing revision", "Wrapper or kit version", "Sample purpose and date"],
        links: [{ label: "Compare current cutlery models", href: "/products/cutlery-meal-kits/" }],
      },
      {
        heading: "Agree measurable checks and tools.",
        paragraphs: [
          "Define which dimensions, piece weights, counts, colours or pack fields will be checked, how they will be measured and what tolerance or reference applies. Use calibrated equipment where the buyer's procedure requires it.",
          "Do not invent a tolerance from a catalogue entry. Confirm specification values and acceptance rules for the selected model before treating them as order criteria.",
        ],
        evidence: [
          { label: "Current weight evidence", value: "Selected AW-CUT-MW bulk utensils list 2.5 g; final values and tolerances remain subject to model confirmation", href: "/products/cutlery-meal-kits/medium-cutlery/" },
          { label: "Specification status", value: "Both current cutlery families are marked for review, so missing fields remain open RFQ items", href: "/products/cutlery-meal-kits/" },
        ],
      },
      {
        heading: "Inspect form, finish and visible defects.",
        paragraphs: [
          "Use an agreed sample size and lighting to record shape, edges, surface, colour, contamination, flash, deformation or other visible observations relevant to the specification.",
          "Separate cosmetic observations from functional results and document examples. Avoid vague pass statements that cannot be traced to a criterion.",
        ],
        links: [{ label: "Review ANWELLUP quality workflow", href: "/quality-compliance/" }],
      },
      {
        heading: "Run a representative food-use check.",
        paragraphs: [
          "Use the intended menu and service conditions to evaluate grip, cutting, piercing, scooping and handling as applicable. Record the conditions, number of samples and outcome.",
          "This supports the buyer's program decision; it does not create a universal PP, PS or model performance claim outside the test conditions.",
        ],
        links: [{ label: "Compare PP and PS models", href: "/guides/pp-vs-ps-disposable-cutlery/" }],
      },
      {
        heading: "Check wrapped pieces and complete kits.",
        paragraphs: [
          "For wrapped products, review seal and presentation, print version, opening and component identity. For kits, count every utensil, napkin, condiment or insert against the approved bill of materials.",
          "Run tray, bag or carton assembly where it affects fit and presentation. Keep missing or incorrect components as a distinct result.",
        ],
        links: [{ label: "Specify airline meal kits", href: "/guides/how-to-specify-airline-meal-kits/" }],
      },
      {
        heading: "Create an approval and change record.",
        paragraphs: [
          "Record approver, date, sample identity, specification and artwork versions, test notes, deviations and final decision. Retain one controlled reference when the procurement program requires it.",
          "A material, model, component, wrapper or artwork change should trigger the relevant review again before order release.",
        ],
        links: [{ label: "Build the full RFQ", href: "/guides/food-packaging-rfq-checklist/" }, { label: "Discuss a sample plan", href: "/contact/" }],
      },
    ],
    questions: [
      { question: "Can a catalogue sample approve a production order?", answer: "Only if its purpose, identity and relationship to the final specification are clear and the buyer accepts that scope. Catalogue, pre-production and production-representative samples can support different decisions." },
      { question: "What should be checked in a meal-kit sample?", answer: "Check each component against the bill of materials, utensil identity and finish, wrapper and artwork, component count, tray or bag fit, opening and the agreed food-use routine." },
      { question: "Does a 2.5 g listing define a tolerance?", answer: "No. It is a current catalogue field for selected AW-CUT-MW references. The final nominal value, measurement method and tolerance must be confirmed for the model." },
    ],
    related: [
      { label: "Disposable cutlery sets bulk guide", href: "/guides/disposable-cutlery-sets-bulk/" },
      { label: "Quality and compliance", href: "/quality-compliance/" },
      { label: "How to verify a packaging supplier", href: "/guides/how-to-verify-food-packaging-supplier/" },
    ],
  },
  {
    slug: "meal-kit-moq-packing-lead-time",
    title: "Meal-kit MOQ, packing and lead-time planning",
    seoTitle: "Meal Kit MOQ, Packing & Lead Time",
    shortTitle: "Plan meal-kit MOQ and packing",
    description: "Plan disposable meal-kit MOQ, case quantities, component availability, artwork approval, production milestones and loading data by exact configuration.",
    lede: "A meal-kit minimum belongs to one controlled component list, wrapper and artwork version. Buyers should compare complete kits rather than loose piece counts, then link MOQ, case packing and lead-time milestones to the same configuration.",
    image: wrappedImage,
    imageAlt: "Configured disposable meal kits prepared for case-pack and lead-time planning",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Define the commercial order unit.",
        paragraphs: [
          "Ask whether the quote uses individual utensils, wrapped pieces, inner packs, cases or complete kits. Identify the unit for MOQ, price and ordered quantity on every line.",
          "For a configured set, attach the exact bill of materials and artwork version. A piece count without the component list is not a complete meal-kit quotation.",
        ],
        checklist: ["Kit or utensil unit", "Bill of materials", "Wrapper and artwork", "Quantity by configuration", "Destination and delivery basis"],
        links: [{ label: "Build the bulk-cutlery specification", href: "/guides/disposable-cutlery-sets-bulk/" }],
      },
      {
        heading: "Separate MOQ by changing variable.",
        paragraphs: [
          "Ask whether the minimum applies per utensil model, material, colour, wrapper, print version or assembled kit. Keep annual forecasts separate from the immediate order quantity.",
          "Request realistic quote scenarios on the same specification. ANWELLUP does not publish one category-wide meal-kit MOQ because the configuration and commercial basis vary.",
        ],
      },
      {
        heading: "Convert component cases into usable kits.",
        paragraphs: [
          "Record pieces per inner pack, inner packs per case and total pieces per case for every utensil and inserted item. Compare these quantities with the finished-kit case pack.",
          "The current catalogue shows 250–400 kits/case for AW-KIT-MW-46 and 250 kits/case for AW-KIT-HW-46, subject to final configuration confirmation.",
        ],
        evidence: [
          { label: "AW-KIT-MW-46", value: "Current 4–6 piece meal-kit reference: 250–400 kits/case", href: "/products/cutlery-meal-kits/medium-cutlery/" },
          { label: "AW-KIT-HW-46", value: "Current 4–6 piece meal-kit reference: 250 kits/case", href: "/products/cutlery-meal-kits/heavy-cutlery/" },
        ],
      },
      {
        heading: "Identify the milestone that starts lead time.",
        paragraphs: [
          "Ask whether production timing starts after deposit, final specification, artwork approval, sample approval, component availability or another event. Record the shipment-ready milestone separately from transit.",
          "Configured kits can depend on several components, so request the critical path and decision deadlines instead of one unexplained total duration.",
        ],
        links: [{ label: "Control wrapped-kit artwork", href: "/solutions/custom-wrapped-meal-kits/" }],
      },
      {
        heading: "Request carton and loading data by configuration.",
        paragraphs: [
          "Collect finished-kit case quantity, carton dimensions, gross weight, inner-pack arrangement and carton marks for every approved configuration. Use confirmed data to estimate pallets or container loading.",
          "Keep loading estimates labelled with assumptions and round orders to actual full-case quantities before final freight planning.",
        ],
        links: [{ label: "Review the general MOQ planning guide", href: "/guides/food-packaging-moq-guide/" }],
      },
      {
        heading: "Freeze scope before releasing the order.",
        paragraphs: [
          "Confirm the component list, model references, wrapper, artwork, samples, quantities, case packs, documents, inspection fields, price, milestones and delivery term on one order record.",
          "If a component becomes unavailable, treat the replacement as a controlled change and repeat the relevant sample, document and commercial review.",
        ],
        links: [{ label: "Prepare an airline-kit brief", href: "/guides/how-to-specify-airline-meal-kits/" }, { label: "Send the order scope", href: "/contact/" }],
      },
    ],
    questions: [
      { question: "What is the MOQ for disposable meal kits?", answer: "MOQ is confirmed for the exact utensil models, component list, wrapper, artwork, packing and destination. Request the unit and basis with the written quotation." },
      { question: "When does meal-kit lead time begin?", answer: "The triggering event must be defined in the quote. It may depend on final specification, artwork, sample approval, commercial confirmation and component availability." },
      { question: "How should buyers calculate complete kit quantities?", answer: "Use confirmed pieces per case for every component and the finished-kit case pack, then round the intended order to full cases and expose any unmatched component inventory." },
    ],
    related: [
      { label: "Airline meal-kit specification", href: "/guides/how-to-specify-airline-meal-kits/" },
      { label: "Bulk vs wrapped cutlery", href: "/guides/bulk-vs-individually-wrapped-cutlery/" },
      { label: "Food packaging MOQ planning", href: "/guides/food-packaging-moq-guide/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
];
