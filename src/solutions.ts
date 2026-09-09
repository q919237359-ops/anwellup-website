export type SourcingSolution = {
  slug: string;
  title: string;
  seoTitle: string;
  shortTitle: string;
  description: string;
  lede: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  updated: string;
  audience: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    checklist?: string[];
    links?: Array<{ label: string; href: string }>;
  }>;
  questions: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string }>;
};

const containerImage = "/assets/catalog/2026-09-r1/takeaway-boxes-containers-v1.webp";

export const sourcingSolutions: SourcingSolution[] = [
  {
    slug: "custom-takeaway-containers",
    title: "Custom takeaway containers for wholesale food programs",
    seoTitle: "Custom Takeaway Containers Supplier",
    shortTitle: "Custom takeaway containers",
    description: "Prepare a custom takeaway-container sourcing brief covering format, material, size, printing, samples, MOQ, packing, timing and model-specific documents.",
    lede: "Custom takeaway packaging starts with a proven food and service fit. Select the base format first, then define the artwork, colour, packing and approval route as a controlled project rather than treating a logo as the entire specification.",
    image: containerImage,
    imageAlt: "Takeaway containers arranged for format and customization review",
    imageWidth: 1448,
    imageHeight: 1086,
    updated: "2026-09-08",
    audience: "Food brands, distributors, restaurant groups and prepared-food programs",
    sections: [
      {
        heading: "Start with the food and service conditions.",
        paragraphs: [
          "Describe the menu item, portion geometry, filling condition, expected holding interval and transport orientation. Add any reheating, chilling, display or tamper-evidence requirement that should be reviewed.",
          "Suitability depends on the exact material and model. The project brief should ask for the intended use to be confirmed instead of relying on a generic material description.",
        ],
        checklist: ["Food and portion", "Filling and holding conditions", "Transport and stacking", "Reheating or chilling review", "Destination market"],
        links: [{ label: "Compare container families", href: "/products/takeaway-boxes-containers/" }],
      },
      {
        heading: "Lock the base container before artwork.",
        paragraphs: [
          "Record the selected family, model, usable dimensions or capacity, material, compartment layout and closure. A separate lid should be listed with the base as a matched system.",
          "Final artwork should use the print area or dieline for that exact construction. A photograph of a similar container is not a substitute for the model record.",
        ],
        links: [{ label: "Use the container size guide", href: "/guides/food-container-size-guide/" }],
      },
      {
        heading: "Define what custom means for this project.",
        paragraphs: [
          "List product colour, print sides, colour count, coverage, label, sleeve, embossing, wrapper, inner-pack presentation and carton marks separately. Mark which elements are required and which are optional for quotation.",
          "Ask which decoration routes can be reviewed for the selected construction. Availability, print method and setup conditions are project-specific and must be confirmed in writing.",
        ],
        links: [{ label: "Prepare the printing brief", href: "/guides/custom-food-packaging-printing-guide/" }],
      },
      {
        heading: "Plan samples around approval decisions.",
        paragraphs: [
          "A catalogue sample can help assess shape and portion fit; a custom prototype can help review layout; a production-representative sample may answer different questions. State what the sample must prove before requesting it.",
          "Keep the sample reference, artwork version, observations and approval decision together. Sample availability, cost and timing are confirmed after the format and customization scope are defined.",
        ],
        links: [{ label: "Plan samples and prototyping", href: "/guides/takeaway-container-samples-prototyping/" }],
      },
      {
        heading: "Request a comparable commercial quotation.",
        paragraphs: [
          "State quantity by model, size, colour and artwork version, and clarify whether the unit means pieces, packs or cases. Ask for MOQ, unit price, setup items, packing and validity on the same written specification.",
          "Lead time should identify its starting point and the shipment-ready milestone. Separate sample, artwork-approval and production timing so the critical path is visible.",
        ],
        links: [{ label: "Understand container MOQ", href: "/guides/takeaway-container-moq/" }, { label: "Plan lead time and packing", href: "/guides/takeaway-container-lead-time-packing/" }],
      },
      {
        heading: "Close the brief with evidence and delivery.",
        paragraphs: [
          "Name the destination market and intended food-contact conditions, then request available records for the exact product or material. Check product identity, scope, issuer and validity rather than accepting a related document by appearance.",
          "Add destination, trade term, case data, carton marks and consolidation needs. Final specification, documents, commercial terms and timing should be confirmed before order release.",
        ],
        links: [{ label: "Use the complete RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }, { label: "Review the supplier-verification guide", href: "/guides/how-to-verify-food-packaging-supplier/" }],
      },
    ],
    questions: [
      { question: "Can every takeaway container be custom printed?", answer: "No general assumption should be made. Decoration options depend on the selected material, construction, artwork and project scope and are confirmed for the exact model." },
      { question: "What is the MOQ for custom takeaway containers?", answer: "MOQ is quoted for the selected model, material, colour, artwork version, packing and destination. Send those inputs for a written project-specific answer." },
      { question: "Can a sample be made before a bulk order?", answer: "A suitable sample route can be reviewed after the base format and approval objective are defined. Availability, cost, timing and what the sample represents must be confirmed." },
    ],
    related: [
      { label: "Takeaway boxes and containers", href: "/products/takeaway-boxes-containers/" },
      { label: "Custom printing guide", href: "/guides/custom-food-packaging-printing-guide/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "restaurant-chain-takeaway-packaging",
    title: "Takeaway packaging planning for restaurant chains",
    seoTitle: "Restaurant Chain Takeaway Packaging Supplier",
    shortTitle: "Restaurant chain packaging",
    description: "Plan takeaway packaging for restaurant chains with a controlled menu-to-format matrix, matched components, artwork versions, case packs and rollout approvals.",
    lede: "A restaurant-chain packaging program is a system, not a list of isolated items. The useful sourcing unit connects each menu application to a controlled container, lid, artwork, case pack and approval record that can be repeated across locations.",
    image: containerImage,
    imageAlt: "Container formats reviewed for a multi-location restaurant program",
    imageWidth: 1448,
    imageHeight: 1086,
    updated: "2026-09-08",
    audience: "Restaurant groups, franchise operators, distributors and foodservice procurement teams",
    sections: [
      {
        heading: "Build a menu-to-format matrix.",
        paragraphs: [
          "List the menu item, portion, fill condition, hold interval, transport method and service location for every required format. Group genuinely similar applications, but keep different risk conditions visible.",
          "Assign a selected model only after usable fit and intended use are reviewed. Record the reason for the selection so later substitutions can be assessed on the same basis.",
        ],
        checklist: ["Menu item", "Portion and headspace", "Filling and holding", "Base and lid reference", "Service location"],
        links: [{ label: "Compare container formats", href: "/products/takeaway-boxes-containers/" }],
      },
      {
        heading: "Reduce avoidable component complexity.",
        paragraphs: [
          "Where operationally suitable, compare whether multiple bases can use a verified common lid or whether one format can serve several menu items. Compatibility must still be confirmed for the exact models.",
          "Record pack and case quantities for bases, lids and accessories together. Mismatched order units can create excess inventory even when individual piece prices look attractive.",
        ],
        links: [{ label: "Review container sizing", href: "/guides/food-container-size-guide/" }],
      },
      {
        heading: "Control brand and market versions.",
        paragraphs: [
          "Identify each artwork, language, barcode and regulatory-text version. Separate permanent brand elements from local or campaign content that may change more frequently.",
          "Use an approved artwork register tied to the product model and revision. This makes it clearer which version belongs in each distribution market or location group.",
        ],
        links: [{ label: "Prepare artwork requirements", href: "/guides/custom-food-packaging-printing-guide/" }],
      },
      {
        heading: "Test the real operating routine.",
        paragraphs: [
          "Run samples through portioning, closing, stacking, bagging, delivery and end-user opening using the restaurant's actual process. Record the result by model and menu application.",
          "A desktop review cannot answer every operational question. Define the acceptance checks before testing so feedback is comparable across locations and teams.",
        ],
        links: [{ label: "Plan a container sample review", href: "/guides/takeaway-container-samples-prototyping/" }],
      },
      {
        heading: "Plan ordering and rollout by SKU.",
        paragraphs: [
          "Forecast each model and artwork version separately, then compare MOQ, case rounding, storage and rollout sequence. Keep annual estimates separate from committed order quantities.",
          "Request milestone timing for samples, artwork approval, production and shipment readiness. A phased rollout may require different order and stock decisions from a single launch.",
        ],
        links: [{ label: "Review MOQ planning", href: "/guides/takeaway-container-moq/" }, { label: "Plan packing and lead time", href: "/guides/takeaway-container-lead-time-packing/" }],
      },
      {
        heading: "Maintain one written specification record.",
        paragraphs: [
          "Keep the model, material, dimensions, matching components, artwork version, pack, case data, documents and approval status in one controlled record. Identify any field that remains provisional.",
          "Before substitutions or repeat orders, reconfirm the fields that affect fit, intended use and commercial terms. Do not treat visual similarity as equivalence.",
        ],
        links: [{ label: "Use the RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }, { label: "Verify the supplier scope", href: "/guides/how-to-verify-food-packaging-supplier/" }],
      },
    ],
    questions: [
      { question: "How should a restaurant chain reduce packaging SKUs?", answer: "Map menu and service requirements first, then compare whether verified formats or matched components can cover more than one application without compromising the required fit." },
      { question: "Should an annual forecast be used as the order quantity?", answer: "No. Share forecasts for planning, but label committed quantities by model and artwork version so MOQ, packing and timing can be quoted clearly." },
      { question: "How should a packaging change be approved?", answer: "Tie the change to the exact model, specification, artwork version, operational sample result, applicable documents and an authorized written approval." },
    ],
    related: [
      { label: "Custom takeaway containers", href: "/solutions/custom-takeaway-containers/" },
      { label: "Takeaway container sourcing guide", href: "/guides/takeaway-container-sourcing-guide/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "prepared-food-retail-packaging",
    title: "Prepared-food retail packaging sourcing plan",
    seoTitle: "Prepared Food Retail Packaging Supplier",
    shortTitle: "Prepared-food retail packaging",
    description: "Source prepared-food retail packaging by defining product presentation, chilled or hot service conditions, closure, label space, case packs and evidence needs.",
    lede: "Prepared-food retail packaging must support both the product and the selling environment. A useful brief connects fill and storage conditions to presentation, closure, label space, shelf handling, case data and destination-market documentation.",
    image: containerImage,
    imageAlt: "Takeaway and deli containers considered for prepared-food retail display",
    imageWidth: 1448,
    imageHeight: 1086,
    updated: "2026-09-08",
    audience: "Prepared-food retailers, deli programs, distributors and private-label buyers",
    sections: [
      {
        heading: "Define the product journey to the shelf.",
        paragraphs: [
          "Describe filling, closing, chilling or hot holding, transport, display orientation and expected consumer handling. State whether the pack is filled centrally or at store level.",
          "These conditions should be reviewed for the exact model and material. Avoid turning a broad material label into an unsupported use claim.",
        ],
        checklist: ["Food and portion", "Fill condition", "Storage and display", "Transport orientation", "Consumer opening"],
        links: [{ label: "Browse takeaway container families", href: "/products/takeaway-boxes-containers/" }],
      },
      {
        heading: "Balance visibility, structure and closure.",
        paragraphs: [
          "Identify how much product visibility is needed and whether the lid, base or window provides it. Compare usable shape, headspace, stack behaviour and closure rather than selecting by appearance alone.",
          "If tamper evidence, film sealing or a separate lid is required, describe the intended system and request a model-specific review of the components involved.",
        ],
        links: [{ label: "Compare hinged and folded formats", href: "/guides/hinged-vs-folded-takeaway-containers/" }],
      },
      {
        heading: "Reserve space for retail information.",
        paragraphs: [
          "Map the label, sleeve, barcode, date code and product information area before artwork approval. Check how seams, curves, lids and stacking affect legibility and application.",
          "The buyer remains responsible for market-specific text and claims. Keep the approved label or printed-artwork version connected to the exact packaging model.",
        ],
        links: [{ label: "Prepare a custom printing brief", href: "/guides/custom-food-packaging-printing-guide/" }],
      },
      {
        heading: "Test merchandising and store handling.",
        paragraphs: [
          "Use filled samples to review shelf presentation, stacking, picking, closing and consumer opening under the intended conditions. Include outer cases and replenishment handling when they affect store operations.",
          "Record test conditions and observations instead of treating one visual sample as universal evidence. Confirm what each sample represents before approval.",
        ],
        links: [{ label: "Structure the sample process", href: "/guides/takeaway-container-samples-prototyping/" }],
      },
      {
        heading: "Quote every retail version clearly.",
        paragraphs: [
          "Separate quantities by model, size, colour, artwork, label or sleeve version. Ask for MOQ, price, packing, setup items and lead time on that same breakdown.",
          "Request case dimensions and gross weight for warehouse and transport planning. Use confirmed case data for loading estimates rather than a generic category assumption.",
        ],
        links: [{ label: "Review MOQ inputs", href: "/guides/takeaway-container-moq/" }, { label: "Review packing and timing", href: "/guides/takeaway-container-lead-time-packing/" }],
      },
      {
        heading: "Request evidence for the exact scope.",
        paragraphs: [
          "State the destination market, food-contact conditions and any retailer-specific document request. Review the product or material identity, scope, issuer and validity of available records.",
          "Final suitability, documents, specification and commercial terms should be confirmed in writing before order release or a private-label claim is made.",
        ],
        links: [{ label: "Review quality and document handling", href: "/quality-compliance/" }, { label: "Use the supplier-verification guide", href: "/guides/how-to-verify-food-packaging-supplier/" }, { label: "Build the RFQ", href: "/guides/food-packaging-rfq-checklist/" }],
      },
    ],
    questions: [
      { question: "Which container is best for prepared-food retail?", answer: "There is no universal format. Select against the food, portion, fill and storage conditions, display needs, closure, label space and destination requirements." },
      { question: "Can transparent packaging be assumed suitable for hot filling?", answer: "No. Temperature suitability depends on the exact material, construction and conditions and must be confirmed for the selected model." },
      { question: "What case data should retail buyers request?", answer: "Request pieces per pack, packs per case, case dimensions, gross weight and any model-specific nesting or component information needed for storage and loading." },
    ],
    related: [
      { label: "Takeaway boxes and containers", href: "/products/takeaway-boxes-containers/" },
      { label: "How to choose takeaway packaging", href: "/guides/how-to-choose-takeaway-packaging/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "custom-printed-coffee-cups",
    title: "Custom printed coffee cups for wholesale brand programs",
    seoTitle: "Custom Printed Coffee Cups Wholesale",
    shortTitle: "Custom printed coffee cups",
    description: "Plan custom printed coffee cups by cup construction, size, lid pairing, artwork, proofs, MOQ, case packing and model-specific document requirements.",
    lede: "A printed coffee cup is a controlled product-and-artwork system. Choose the exact single-wall or double-wall cup and matching lid first, then define print coverage, colour references, approval samples, packing and commercial terms.",
    image: "/assets/catalog/2026-09-r1/cups-drinkware-v1.webp",
    imageAlt: "Single-wall and double-wall paper cups arranged for a custom printed coffee-cup program",
    imageWidth: 1448,
    imageHeight: 1086,
    updated: "2026-09-09",
    audience: "Coffee brands, café groups, distributors, events and private-label beverage programs",
    sections: [
      {
        heading: "Define the coffee and service journey.",
        paragraphs: [
          "Describe the drink types, serving condition, cup sizes, hold interval, takeaway or delivery routine and any sleeve requirement. State whether the same artwork will serve every size or whether the program has multiple versions.",
          "Suitability remains model-specific. Ask for the intended beverage and service conditions to be reviewed against the selected cup-and-lid system.",
        ],
        checklist: ["Drink and serving condition", "Cup sizes", "Counter or delivery service", "Sleeve requirement", "Destination market"],
        links: [{ label: "Compare paper cup models", href: "/products/cups-drinkware/" }],
      },
      {
        heading: "Choose the exact paper-cup construction.",
        paragraphs: [
          "Shortlist the family, AW SKU, capacity, dimensions and single-wall or double-wall construction before preparing final artwork. The current range contains separate single-wall and double-wall references with model-level size and pack fields.",
          "Do not transfer a dieline or print expectation from a similar cup. Ask for the printable area and decoration route associated with the selected construction.",
        ],
        links: [{ label: "Review single-wall paper cups", href: "/products/cups-drinkware/paper-cups-single-wall/" }, { label: "Review double-wall paper cups", href: "/products/cups-drinkware/paper-cups-double-wall/" }],
      },
      {
        heading: "Pair the cup and lid by model.",
        paragraphs: [
          "Record the lid reference, material, colour, opening style and pack quantity beside every cup size. If the program expects a common lid, request a written compatibility matrix.",
          "Test the actual cup and lid with the intended fill level, closing routine, carrying and drinking experience before final approval.",
        ],
        links: [{ label: "Build the cup-and-lid matrix", href: "/guides/disposable-cup-lid-compatibility/" }],
      },
      {
        heading: "Control artwork, colour and proof scope.",
        paragraphs: [
          "List artwork filenames and versions, print colours, coverage, orientation, barcodes and market text. Provide a named colour reference when consistency matters and identify one authorized approver.",
          "State whether each proof or sample is for layout, colour expectation, construction or production-representative review. Keep unresolved differences visible.",
        ],
        links: [{ label: "Plan cup printing samples", href: "/guides/disposable-cup-printing-samples/" }, { label: "Review the broader print brief", href: "/guides/custom-food-packaging-printing-guide/" }],
      },
      {
        heading: "Quote sizes and artwork versions separately.",
        paragraphs: [
          "Provide quantity by cup model, lid, colour and artwork version. Ask whether MOQ applies per model or design, then compare setup items, unit price and order quantities on the same specification.",
          "Convert cups and lids into complete case quantities and usable sets. Include storage, replenishment and artwork-change risk in the buying decision.",
        ],
        links: [{ label: "Review disposable cup MOQ", href: "/guides/disposable-cup-moq/" }],
      },
      {
        heading: "Confirm production and delivery milestones.",
        paragraphs: [
          "Ask what event starts lead time and separate artwork review, sample approval, production, inspection and shipment readiness. Request case quantities, carton dimensions and gross weights for the final model mix.",
          "Before order release, confirm the cup-and-lid specification, final artwork, approval record, quantities, packing, available documents, timing and delivery term in writing.",
        ],
        links: [{ label: "Plan cup packing and timing", href: "/guides/disposable-cup-lead-time-packing/" }, { label: "Build the complete RFQ", href: "/guides/food-packaging-rfq-checklist/" }],
      },
    ],
    questions: [
      { question: "What should I send for a custom printed coffee-cup quote?", answer: "Send the cup sizes and construction, matching lid needs, quantity by size, artwork status, colours, coverage, packing, destination and sample or document requirements." },
      { question: "Can one artwork file be used for every cup size?", answer: "Do not assume so. Each selected model may have a different print area or dieline; identify and approve the artwork version for every required size." },
      { question: "What is the MOQ for printed coffee cups?", answer: "MOQ is confirmed for the exact cup construction, size, artwork version, packing and destination. Request the unit and basis in the written quotation." },
    ],
    related: [
      { label: "Disposable cups and drinkware", href: "/products/cups-drinkware/" },
      { label: "Disposable cup printing and samples", href: "/guides/disposable-cup-printing-samples/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "cold-drink-cup-programs",
    title: "PET and PP cold drink cups for beverage programs",
    seoTitle: "Plastic Cups Wholesale for Cold Drinks",
    shortTitle: "Cold drink cup programs",
    description: "Plan a wholesale PET or PP cold-drink cup program by beverage, size, clarity, rim and lid, sealing, artwork, case packs and destination evidence.",
    lede: "A cold-drink cup program should connect the beverage and operating routine to an exact PET or PP cup, compatible lid or sealing route, presentation requirement, size matrix, case pack and written evidence scope.",
    image: "/assets/catalog/2026-09-r1/cups-drinkware-v1.webp",
    imageAlt: "PET and PP cups arranged for cold beverage and milk-tea sourcing",
    imageWidth: 1448,
    imageHeight: 1086,
    updated: "2026-09-09",
    audience: "Beverage brands, bubble-tea groups, distributors, events and prepared retail programs",
    sections: [
      {
        heading: "Map the beverage and operating routine.",
        paragraphs: [
          "State the drink, portion, fill condition, ice or inclusions, hold interval, delivery orientation and consumer opening. Add any sealing, dome-lid, straw or tamper-evidence requirement that needs review.",
          "Use the real beverage and service journey to shortlist models. A general PET or PP label should not be treated as a complete intended-use specification.",
        ],
        checklist: ["Beverage and inclusions", "Fill and hold conditions", "Cup capacity", "Delivery orientation", "Opening and accessory needs"],
        links: [{ label: "Compare PET and PP cup families", href: "/products/cups-drinkware/" }],
      },
      {
        heading: "Choose PET or PP in the context of the model.",
        paragraphs: [
          "The current catalogue separates clear PET cold-cup entries, a broad PP disposable-cup range and tall 500 ml and 700 ml PP milk-tea formats. Compare the exact dimensions, weight where listed, visual requirement and specification status.",
          "Do not make environmental, temperature or performance claims from the resin name alone. Request model-specific suitability and available evidence for the destination.",
        ],
        links: [{ label: "Review PET cold cups", href: "/products/cups-drinkware/cups-pet-cold-cups/" }, { label: "Review PP disposable cups", href: "/products/cups-drinkware/pp-disposable-cups/" }, { label: "Review PP milk-tea cups", href: "/products/cups-drinkware/pp-milk-tea-cups/" }],
      },
      {
        heading: "Build the cup, lid and sealing matrix.",
        paragraphs: [
          "Record every cup model with its proposed lid or sealing component, dimensions, opening style and pack quantity. Identify confirmed shared-lid relationships and keep alternatives separate.",
          "Test closure, stacking, carrying, drinking and any film-seal or delivery routine with the exact filled system.",
        ],
        links: [{ label: "Use the cup-and-lid guide", href: "/guides/disposable-cup-lid-compatibility/" }],
      },
      {
        heading: "Define presentation and branding requirements.",
        paragraphs: [
          "State whether drink visibility, cup clarity, product colour, label space or direct decoration is part of the selling experience. Map logos and information against grip areas, curves, lids and stacking.",
          "Ask which decoration or label route can be reviewed for the exact construction. Keep artwork versions and approval responsibilities controlled.",
        ],
        links: [{ label: "Prepare the print and artwork brief", href: "/guides/custom-food-packaging-printing-guide/" }],
      },
      {
        heading: "Plan the size mix and commercial order.",
        paragraphs: [
          "Break forecasts and committed quantities down by cup, lid, size, colour and artwork. Request MOQ, price and packing for each real order line and convert components into complete usable sets.",
          "For multi-site or seasonal programs, keep rollout quantities separate from the annual estimate and record case rounding and storage needs.",
        ],
        links: [{ label: "Review disposable cup MOQ", href: "/guides/disposable-cup-moq/" }],
      },
      {
        heading: "Verify packing, evidence and shipment readiness.",
        paragraphs: [
          "Request cup and lid case quantities, carton dimensions, gross weights and the approval milestones that lead to shipment readiness. Use confirmed data for loading rather than a generic piece-count assumption.",
          "Name the destination and intended beverage conditions when requesting specifications or food-contact records. Confirm the final models, documents and commercial terms in writing.",
        ],
        links: [{ label: "Plan cup packing and lead time", href: "/guides/disposable-cup-lead-time-packing/" }, { label: "Evaluate a plastic cup supplier", href: "/guides/how-to-evaluate-plastic-cup-manufacturer/" }, { label: "Build the complete RFQ", href: "/guides/food-packaging-rfq-checklist/" }],
      },
    ],
    questions: [
      { question: "Which is better for cold drinks, PET or PP cups?", answer: "There is no universal answer. Compare the exact model against beverage, fill, presentation, closure, delivery and destination requirements and review model-specific evidence." },
      { question: "Can milk-tea cups use the same lids as other 90 mm cups?", answer: "Do not assume so from the stated diameter. Request exact cup-and-lid compatibility and test the selected components in the intended service routine." },
      { question: "What should a wholesale plastic-cup quotation include?", answer: "It should identify cup and lid models, sizes, quantities, material and colour, artwork, packing, MOQ basis, price, sample status, document scope, timing and delivery basis." },
    ],
    related: [
      { label: "PET and PP cups", href: "/products/cups-drinkware/" },
      { label: "Paper vs plastic disposable cups", href: "/guides/paper-vs-plastic-disposable-cups/" },
      { label: "Evaluate a plastic cup manufacturer or supplier", href: "/guides/how-to-evaluate-plastic-cup-manufacturer/" },
    ],
  },
];

export const getSourcingSolution = (slug: string) => sourcingSolutions.find((solution) => solution.slug === slug);
