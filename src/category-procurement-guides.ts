import type { BuyingGuide } from "./guides";

const published = "2026-09-11";
const updated = "2026-09-11";
const imageWidth = 1448;
const imageHeight = 1086;

export const categoryProcurementGuides: BuyingGuide[] = [
  {
    slug: "disposable-plates-bowls-trays-sourcing-guide",
    title: "Disposable plates, bowls and trays: a wholesale sourcing guide",
    seoTitle: "Disposable Plates, Bowls & Trays Sourcing Guide",
    shortTitle: "Source disposable tableware",
    description: "Source disposable plates, bowls and meal trays by portion geometry, bagasse, kraft, HIPS or PP construction, compartments, samples, packing and documents.",
    lede: "Disposable tableware should be specified around the meal and operating routine, not a diameter or material name alone. Connect every portion and service condition to an exact plate, bowl or tray before comparing samples, packing and commercial terms.",
    image: "/assets/catalog/2026-09-r1/plates-bowls-trays-v1.webp",
    imageAlt: "Disposable plates, bowls and meal trays arranged for wholesale sourcing comparison",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Map the meal before selecting the format.",
        paragraphs: [
          "List every food, target portion, sauce or liquid content, desired separation and presentation priority. State whether the service needs an open plate, a deeper bowl, a rectangular tray or a divided format.",
          "Add filling, holding, carrying, stacking and customer-use conditions. These inputs create the service test for the exact model rather than relying on a broad material or category statement.",
        ],
        checklist: ["Food and portion by component", "Fill and holding conditions", "Plate, bowl or tray", "Compartment allocation", "Carry and customer-use routine"],
        links: [{ label: "Compare plates, bowls and trays", href: "/products/plates-bowls-trays/" }],
      },
      {
        heading: "Compare the public range by exact model.",
        paragraphs: [
          "ANWELLUP currently lists four sugarcane bagasse bowl references, four bagasse plate references, four bagasse meal trays, four kraft paper bowls and eight mixed HIPS or PP tableware references. Keep the AW SKU with every dimension, sample and quotation line.",
          "Examples include AW-BG-P10 and the divided AW-BG-P10C, plus 23 and 30 oz open bagasse trays and two three-compartment formats. Similar names do not make those models interchangeable.",
        ],
        evidence: [
          { label: "Bagasse bowls", value: "4 listed models · 12–32 oz", href: "/products/plates-bowls-trays/tableware-bowls/" },
          { label: "Bagasse plates", value: "4 listed models · open and divided", href: "/products/plates-bowls-trays/tableware-plates/" },
          { label: "Bagasse meal trays", value: "4 listed models · open and 3-section", href: "/products/plates-bowls-trays/tableware-meal-trays/" },
          { label: "Kraft paper bowls", value: "4 listed models · 500–2,000 ml", href: "/products/plates-bowls-trays/tableware-kraft-paper-bowls/" },
        ],
        links: [{ label: "Review the food container size guide", href: "/guides/food-container-size-guide/" }],
      },
      {
        heading: "Treat material as one field in a complete decision.",
        paragraphs: [
          "The current range includes sugarcane bagasse, kraft paper, HIPS and PP. Compare exact models through their measurable specification, intended food and service conditions, sample results and destination requirements.",
          "For the mixed HIPS and PP family, the public table does not assign one material to each model. Keep that assignment open until it is confirmed in writing rather than inferring it from a photograph or size label.",
        ],
        links: [{ label: "Use the material comparison framework", href: "/guides/food-packaging-materials-comparison/" }],
      },
      {
        heading: "Control compartments, lids and usable geometry.",
        paragraphs: [
          "Record diameter or capacity with footprint, height, rim and usable interior dimensions. For divided plates or trays, assign a food and portion to each section and note any food-separation requirement.",
          "If a lid or film is required, identify it as a separate component. Confirm compatibility and packing, then test the exact filled system through closing, stacking, transport and opening.",
        ],
        links: [{ label: "Prepare the complete packaging RFQ", href: "/guides/food-packaging-rfq-checklist/" }],
      },
      {
        heading: "Approve samples under the real service routine.",
        paragraphs: [
          "Define whether a sample must prove portion fit, dimensions, food separation, stacking, carrying, closure, artwork layout or production finish. Record the model, components, test conditions and observations with the decision.",
          "Do not turn a successful check on one model into a claim for the entire material family. Keep unresolved questions visible until the selected production specification and evidence are confirmed.",
        ],
      },
      {
        heading: "Compare MOQ, case packs and delivery on one basis.",
        paragraphs: [
          "State quantities per model and component and clarify whether they mean pieces, packs, cases or complete sets. A published case pack is not an MOQ; request the minimum and quoted quantity on the same line.",
          "Ask for inner quantities, carton dimensions, gross weight, approval milestones, production trigger and shipment-ready date. Release the order only against the final specification, sample status, documents, packing and commercial terms in writing.",
        ],
        links: [{ label: "Understand packaging MOQ inputs", href: "/guides/food-packaging-moq-guide/" }],
      },
    ],
    questions: [
      { question: "Which disposable tableware materials are listed?", answer: "The current range includes sugarcane bagasse, kraft paper and a mixed HIPS or PP family. Confirm the exact material, model and intended conditions before selection." },
      { question: "Can diameter or capacity alone identify the right format?", answer: "No. Add full dimensions, depth, usable area, rim, compartments, portion and any closure because nominal size does not define operational fit." },
      { question: "Is a listed case pack the minimum order quantity?", answer: "No. Case packing and MOQ are different fields. MOQ is confirmed for the exact model, components, customization, packing and destination." },
      { question: "What should a divided tray sample prove?", answer: "Use the intended meal to review portion allocation, separation, usable space, closure, stacking, transport and customer access with the exact model." },
    ],
    related: [
      { label: "Compare disposable plates, bowls and trays", href: "/products/plates-bowls-trays/" },
      { label: "Review food-container sizing", href: "/guides/food-container-size-guide/" },
      { label: "Build a complete packaging RFQ", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "aluminium-foil-food-wrap-sourcing-guide",
    title: "Aluminium foil and food wraps: a wholesale sourcing guide",
    seoTitle: "Aluminium Foil & Food Wrap Sourcing Guide",
    shortTitle: "Source foil and food wraps",
    description: "Source aluminium foil rolls, pop-up and cushion sheets, laminated food bags and baking paper by format, dimensions, gauge, construction, packing and use.",
    lede: "A useful foil or food-wrap quotation identifies the working task and dispensing format before price. Width, length or sheet count, thickness or laminate layers, pack configuration and artwork must remain attached to the exact model.",
    image: "/assets/catalog/2026-09-r1/foil-wraps-baking-v1.webp",
    imageAlt: "Aluminium foil rolls, sheets, food wraps and baking paper arranged for wholesale sourcing",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Begin with the working task and format.",
        paragraphs: [
          "State whether the product is for wrapping, lining, baking, preparation, holding, retail sale or colour identification. Describe the intended food, workstation, handling process and dispenser or cutter needs.",
          "Choose between a catering or household roll, flat cushion sheet, pop-up sheet, laminated food bag or baking-paper format. Keep different tasks as separate quotation lines.",
        ],
        checklist: ["Food and working task", "Roll, sheet, bag or baking paper", "Cutter, core or dispenser", "Holding or service conditions", "Retail or foodservice presentation"],
        links: [{ label: "Compare foil and food-wrap families", href: "/products/foil-wraps-baking/" }],
      },
      {
        heading: "Anchor the comparison to published models.",
        paragraphs: [
          "The current range includes catering and household foil-roll programs, silicone baking paper, four cushion-sheet references, six pop-up sheet references and six foil-paper food-bag references. Use the AW SKU with every measured value.",
          "Examples include plain 12 μm pop-up sheets and red, green or blue 14 μm references, while the cushion family combines 28 or 48 gsm paper with 6 μm foil. Do not transfer one construction to another format.",
        ],
        evidence: [
          { label: "Rolls and baking paper", value: "4 distinct sourcing programs", href: "/products/foil-wraps-baking/foil-rolls-sheets-paper/" },
          { label: "Cushion foil sheets", value: "4 models · paper + 6 μm foil", href: "/products/foil-wraps-baking/cushion-foil/" },
          { label: "Pop-up foil sheets", value: "6 models · plain and colour-coded", href: "/products/foil-wraps-baking/popup-foil/" },
          { label: "Foil paper bags", value: "6 models · pint, quart and half", href: "/products/foil-wraps-baking/foil-paper-bags/" },
        ],
        links: [{ label: "Review food-packaging materials", href: "/guides/food-packaging-materials-comparison/" }],
      },
      {
        heading: "Write the full dimensional and layer specification.",
        paragraphs: [
          "For rolls, record width, length, aluminium thickness, core and cutter or dispenser. For sheets, record length, width, gauge, colour, sheet count and pack format. For laminated items, identify each paper and foil layer.",
          "Baking paper requires its own dimensions, basis weight, coating construction and sheet or roll packing. A category label such as food wrap does not replace these measurable fields.",
        ],
        links: [{ label: "Use the food-packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }],
      },
      {
        heading: "Plan artwork and dispensing presentation together.",
        paragraphs: [
          "State product colour, artwork versions, print sides, coverage, labels, barcodes, inner presentation and carton marks. Ask which print or packing route can be reviewed for the selected construction.",
          "Test one-sheet extraction, roll cutting, bag opening or the relevant dispensing motion at the intended workstation. Record the exact sample and pack configuration rather than approving only a loose material sample.",
        ],
        links: [{ label: "Prepare a custom printing brief", href: "/guides/custom-food-packaging-printing-guide/" }],
      },
      {
        heading: "Define what the sample and documents must prove.",
        paragraphs: [
          "Identify whether a sample is for dimensions, layer construction, wrapping coverage, dispensing, artwork layout or production finish. Run the intended task under defined conditions and keep the result with the model reference.",
          "Name the destination and intended use, then request records that identify the relevant product or material, issuer, scope, test basis and validity. Do not infer evidence from a related aluminium or paper item.",
        ],
      },
      {
        heading: "Normalize quantities, packing and timing.",
        paragraphs: [
          "Clarify whether demand is stated in rolls, metres, sheets, dispensers, bags, inner packs or cartons. Request MOQ, price and available quantity breaks on the same unit and specification basis.",
          "Add final inner and outer quantities, carton dimensions, gross weight, approval stages, production trigger and shipment-ready date. Freeze those fields with artwork, samples and evidence before order release.",
        ],
        links: [{ label: "Compare MOQ on a controlled basis", href: "/guides/food-packaging-moq-guide/" }],
      },
    ],
    questions: [
      { question: "What information belongs in an aluminium foil RFQ?", answer: "Include the task, roll or sheet format, dimensions, thickness, core or dispenser, packing, artwork, quantity, destination and required evidence." },
      { question: "Can foil rolls and pop-up sheets be compared only by weight?", answer: "No. Keep width, length or sheet count, thickness, dispenser, inner pack and carton configuration visible so the usable quantity is comparable." },
      { question: "Are BBQ and NP food-bag codes approval claims?", answer: "No. They are public reference labels whose expansion is not defined. Use the exact AW SKU and confirm construction and intended-use evidence separately." },
      { question: "Is a published carton quantity the MOQ?", answer: "No. Published packing and MOQ are separate. Request the minimum for the exact format, construction, artwork, packing and destination." },
    ],
    related: [
      { label: "Compare foil, wraps and baking paper", href: "/products/foil-wraps-baking/" },
      { label: "Prepare custom packaging artwork", href: "/guides/custom-food-packaging-printing-guide/" },
      { label: "Build a complete packaging RFQ", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "custom-shopping-bags-sourcing-guide",
    title: "Custom shopping bags: a wholesale sourcing guide",
    seoTitle: "Custom Shopping Bags Wholesale Sourcing Guide",
    shortTitle: "Source custom shopping bags",
    description: "Source custom PE T-shirt and non-woven shopping bags by packed load, finished dimensions, film or fabric specification, handles, artwork, samples and packing.",
    lede: "A custom shopping bag is a load-bearing package and a brand surface. Define what it carries and how it is handled before fixing dimensions, PE film or non-woven construction, handles, print coverage and case packing.",
    image: "/assets/catalog/2026-09-r1/carry-shopping-bags-sage-composite-v2.webp",
    imageAlt: "Supplied PE T-shirt shopping bags shown for custom carry-bag sourcing",
    imageWidth: 640,
    imageHeight: 480,
    published,
    updated,
    sections: [
      {
        heading: "Describe the packed load and carry journey.",
        paragraphs: [
          "List the packed products, their dimensions, total expected load, number of items and any sharp, hot or concentrated load points. Add the carrying distance, issue method and relevant handling conditions.",
          "These inputs define the loaded-bag test. A generic weight claim or photograph should not replace a sample check using the intended product arrangement.",
        ],
        checklist: ["Packed products and dimensions", "Expected total load", "Number and arrangement of items", "Carry distance and issue method", "Concentrated or sharp load points"],
        links: [{ label: "Compare PE and non-woven bag programs", href: "/products/carry-shopping-bags/" }],
      },
      {
        heading: "Choose PE or non-woven as a defined construction.",
        paragraphs: [
          "The current public range includes 1/6 and 1/8 PE T-shirt bag references plus one non-woven sourcing program. The 1/6 and 1/8 labels are format names, not complete dimensional specifications.",
          "For PE, request measurable film construction and tolerance. For non-woven bags, request the fabric type and weight, seams, edge finish and handle attachment. Do not compare film thickness directly with fabric weight.",
        ],
        evidence: [
          { label: "PE T-shirt bags", value: "1/6 and 1/8 program references", href: "/products/carry-shopping-bags/pe-shopping-bags/" },
          { label: "Non-woven bags", value: "Specification-led standard program", href: "/products/carry-shopping-bags/nonwoven-shopping-bags/" },
          { label: "Image scope", value: "Supplied category image shows PE bags only" },
        ],
        links: [{ label: "Use the general RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }],
      },
      {
        heading: "Freeze finished geometry and measurement convention.",
        paragraphs: [
          "Record finished width, side or bottom gusset, length, handle opening, handle position and any seam or fold that changes usable space. Attach a controlled drawing where dimensions can be interpreted in more than one way.",
          "For an existing bag, label whether measurements are flat, open or finished. Keep the agreed convention with the sample and quotation so later revisions remain comparable.",
        ],
      },
      {
        heading: "Build artwork on the approved bag construction.",
        paragraphs: [
          "State bag colour, print sides, artwork versions, colours, coverage and placement relative to gussets, handles and seams. Add any barcode, label, fold, inner presentation or carton-mark requirement.",
          "Request the correct print area or template for the selected construction. A screen proof can approve content and layout, while colour and production finish require an agreed physical approval route.",
        ],
        links: [{ label: "Prepare artwork and print requirements", href: "/guides/custom-food-packaging-printing-guide/" }],
      },
      {
        heading: "Approve dimensions, print and loaded carrying separately.",
        paragraphs: [
          "Define what each sample represents: geometry, material, artwork layout, colour, construction or production finish. Then run the intended packed-load routine with an identified sample and record the conditions and result.",
          "The current non-woven page uses a category image of PE bags with an explicit scope note. Request model-specific non-woven photographs, drawings and samples rather than treating that image as product proof.",
        ],
        links: [{ label: "Review the non-woven sourcing page", href: "/products/carry-shopping-bags/nonwoven-shopping-bags/" }],
      },
      {
        heading: "Quote MOQ and logistics by bag version.",
        paragraphs: [
          "Separate demand by size, construction, colour and artwork. Clarify whether quantities mean pieces, inner packs or cases and request MOQ and price on the same version basis.",
          "Confirm fold, pieces per inner pack and carton, carton dimensions, gross weight, labels, approval sequence and shipment-ready date. Freeze the drawing, artwork, sample and commercial scope before production.",
        ],
        links: [{ label: "Understand custom-packaging MOQ", href: "/guides/food-packaging-moq-guide/" }],
      },
    ],
    questions: [
      { question: "What is needed for a custom shopping-bag quotation?", answer: "Provide the packed product and load, finished dimensions, PE film or non-woven specification, colour, handle, artwork, quantity, packing and destination." },
      { question: "Do 1/6 and 1/8 labels define finished bag size?", answer: "No. They are listed PE format labels. Request or provide full width, gusset, length and handle dimensions for the exact AW SKU." },
      { question: "Does the category photograph show non-woven bags?", answer: "No. It is a supplied image of PE carry bags. Request identified non-woven images, drawings and samples for that program." },
      { question: "How is MOQ confirmed for a printed bag?", answer: "MOQ is quoted for the exact construction, dimensions, colour, artwork versions, packing and destination, not as one category-wide number." },
    ],
    related: [
      { label: "Compare carry and shopping bags", href: "/products/carry-shopping-bags/" },
      { label: "Prepare custom printing requirements", href: "/guides/custom-food-packaging-printing-guide/" },
      { label: "Build a complete packaging RFQ", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "disposable-gloves-wholesale-sourcing-guide",
    title: "Disposable gloves: a wholesale sourcing and evidence guide",
    seoTitle: "Disposable Gloves Wholesale Sourcing Guide",
    shortTitle: "Source disposable gloves responsibly",
    description: "Source nitrile, vinyl, latex, HDPE and TPE disposable gloves by task, size, measurable construction, packing and model-specific document scope.",
    lede: "A glove name is not an intended-use or compliance conclusion. Start with the task and destination requirements, then compare the exact material, model, size, measurable construction, packing, samples and supporting records.",
    image: "/assets/catalog/2026-09-r1/gloves-protective-supplies-v1.webp",
    imageAlt: "Disposable handling gloves in multiple materials and colours for sourcing comparison",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Write the task and contact conditions first.",
        paragraphs: [
          "Describe the handling, cleaning or operational task, contact conditions, expected duration, change frequency and workplace process. Include user or material restrictions and the destination market.",
          "This brief defines what needs to be demonstrated. Do not select a glove from its colour, material name or exam wording without reviewing the exact model and intended use.",
        ],
        checklist: ["Task and contact conditions", "Duration and change frequency", "User or material restrictions", "Destination market", "Required claim and document scope"],
        links: [{ label: "Compare disposable glove families", href: "/products/gloves-protective-supplies/" }],
      },
      {
        heading: "Compare the range through exact AW SKUs.",
        paragraphs: [
          "The public range includes a mixed vinyl, nitrile and TPE handling family; dedicated XS–XL nitrile, vinyl and latex families; and M–XL HDPE gloves. Keep the AW SKU on samples, packing and evidence requests.",
          "The mixed family publishes selected colour options and 100-piece box, 10-box carton packing. The HDPE family lists 500 pieces per box and 20 boxes per case. Other detailed pack entries remain on request.",
        ],
        evidence: [
          { label: "Mixed handling range", value: "Vinyl, nitrile and TPE references", href: "/products/gloves-protective-supplies/gloves-handling-gloves/" },
          { label: "Nitrile", value: "XS–XL sourcing references", href: "/products/gloves-protective-supplies/nitrile-exam-gloves/" },
          { label: "Vinyl", value: "XS–XL sourcing references", href: "/products/gloves-protective-supplies/vinyl-exam-gloves/" },
          { label: "HDPE", value: "M–XL · published bulk packing", href: "/products/gloves-protective-supplies/hdpe-gloves/" },
        ],
        links: [{ label: "Use the RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }],
      },
      {
        heading: "Request measurable specifications with their methods.",
        paragraphs: [
          "State size assortment, dimensions, colour, piece weight or thickness, measurement location and method, texture, cuff and tolerances. A thickness number without its location and method may not be comparable.",
          "Across the glove range, material assignments and measurable fields must remain exact-model data. Do not fill missing values from a similar catalogue product.",
        ],
        links: [{ label: "Review product and document handling", href: "/quality-compliance/" }],
      },
      {
        heading: "Separate family names from regulatory conclusions.",
        paragraphs: [
          "The word exam in a public family name does not prove medical-device classification, and a food-handling application label does not establish approval for every food-contact task. The intended claim must be verified for the exact model and market.",
          "Request records that identify the product or material, issuer, scope, test basis and validity. Record what the evidence supports and avoid extending it to another colour, construction or supplier reference without confirmation.",
        ],
        links: [{ label: "Read the quality and compliance approach", href: "/quality-compliance/" }],
      },
      {
        heading: "Use samples to confirm fit and operational handling.",
        paragraphs: [
          "Define whether the sample must confirm sizing, dimensions, donning, texture, grip, colour, packing or another operational decision. Identify the model, size and sample status before testing.",
          "For natural rubber latex, include relevant user, workplace, labelling and material-restriction considerations in the review. Keep observations and unresolved actions with the approval record.",
        ],
        links: [{ label: "Review the latex glove program", href: "/products/gloves-protective-supplies/latex-exam-gloves/" }],
      },
      {
        heading: "Normalize boxes, cases, MOQ and timing.",
        paragraphs: [
          "State demand by model, size and colour and clarify pieces, boxes or cases. Request the count basis, pieces per box, boxes per carton, carton dimensions, gross weight, labels and lot identification.",
          "MOQ, price and lead time are confirmed for the exact specification and size assortment. Before release, freeze permitted claims, documents, samples, packing, inspection fields and shipment milestone in writing.",
        ],
        links: [{ label: "Compare MOQ on a controlled basis", href: "/guides/food-packaging-moq-guide/" }],
      },
    ],
    questions: [
      { question: "Which disposable glove materials are listed?", answer: "The current public range includes nitrile, PVC or vinyl, natural rubber latex, HDPE and TPE references. Exact models and intended uses require confirmation." },
      { question: "Does exam in the product name confirm medical approval?", answer: "No. A family name is not a regulatory conclusion. Confirm exact-model classification, destination requirements and supporting records." },
      { question: "How should glove thickness be compared?", answer: "Request the value with measurement location, method, unit and tolerance, plus dimensions, material and model identity." },
      { question: "What is the MOQ for disposable gloves?", answer: "MOQ is confirmed for the exact model, material, size assortment, colour, measurable specification, packing, labels and destination." },
    ],
    related: [
      { label: "Compare disposable gloves", href: "/products/gloves-protective-supplies/" },
      { label: "Review quality and compliance handling", href: "/quality-compliance/" },
      { label: "Build a complete packaging RFQ", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
];
