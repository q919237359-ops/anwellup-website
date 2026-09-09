import type { BuyingGuide } from "./guides";

const image = "/assets/catalog/2026-09-r1/cups-drinkware-v1.webp";
const imageWidth = 1448;
const imageHeight = 1086;
const published = "2026-09-09";
const updated = "2026-09-09";

export const cupClusterGuides: BuyingGuide[] = [
  {
    slug: "paper-vs-plastic-disposable-cups",
    title: "Paper vs plastic disposable cups: a buyer comparison",
    seoTitle: "Paper vs Plastic Disposable Cups",
    shortTitle: "Compare paper and plastic cups",
    description: "Compare paper, PET and PP disposable cups by beverage, temperature, visibility, lid system, printing, packing and model-specific evidence.",
    lede: "Paper, PET and PP cups are not interchangeable category labels. The useful choice begins with the beverage and service journey, then compares the exact cup construction, rim and lid, presentation, decoration, packing and evidence required for the destination market.",
    image,
    imageAlt: "Paper, PET and PP disposable cup formats arranged for buyer comparison",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Start with the drink and service conditions.",
        paragraphs: [
          "Record the beverage, serving condition, expected hold interval, transport orientation and whether the cup will be used for counter service, delivery, sampling or prepared retail. These inputs determine which model-level questions need to be answered.",
          "Do not translate a material name into a universal temperature or performance claim. Ask for the intended use to be reviewed against the exact cup, lid and operating conditions.",
        ],
        checklist: ["Beverage and fill condition", "Serving and holding interval", "Delivery or counter service", "Required visibility", "Destination market"],
        links: [{ label: "Use the disposable cup sourcing guide", href: "/guides/disposable-cup-sourcing-guide/" }],
      },
      {
        heading: "Compare the current range by construction.",
        paragraphs: [
          "The current ANWELLUP catalogue separates single-wall and double-wall paper cups, PET cold cups, general PP disposable cups and tall PP milk-tea cups. That separation is more useful than a broad paper-versus-plastic label because each family has its own sizes, dimensions and specification status.",
          "Use the family page and AW SKU to anchor the comparison. Any dimension, weight or pack field that is absent or marked for review should remain an open item in the RFQ.",
        ],
        evidence: [
          { label: "Single-wall paper", value: "Listed 8, 12, 16 and 22 oz references; selected entries show 1,000 pcs/ctn", href: "/products/cups-drinkware/paper-cups-single-wall/" },
          { label: "Double-wall paper", value: "Listed 8, 12 and 16 oz references; selected entries show 500 pcs/ctn", href: "/products/cups-drinkware/paper-cups-double-wall/" },
          { label: "PET cold cups", value: "Listed 7–10 oz references with model dimensions and 1,000-piece case entries", href: "/products/cups-drinkware/cups-pet-cold-cups/" },
          { label: "PP drinkware", value: "General disposable references from 1–20 oz plus 500 ml and 700 ml milk-tea formats", href: "/products/cups-drinkware/pp-disposable-cups/" },
        ],
      },
      {
        heading: "Decide how visibility and presentation matter.",
        paragraphs: [
          "A clear cup may be relevant when the drink, colour, layers or inclusions are part of the presentation. Paper constructions may provide a different surface and visual language for coffee or branded beverage service. These are program requirements, not proof of technical suitability.",
          "State whether clarity, cup colour, surface finish, condensation appearance or a sleeve is part of the brief. Review the filled product in the intended lighting and service context.",
        ],
        links: [{ label: "Plan a cold-drink cup program", href: "/solutions/cold-drink-cup-programs/" }],
      },
      {
        heading: "Treat the rim and lid as one system.",
        paragraphs: [
          "Nominal capacity does not confirm lid compatibility. Record the cup AW SKU, dimensions and matching lid reference together, then test closing, opening, stacking and transport with the exact components.",
          "When several cup sizes are expected to share one lid, request a written compatibility matrix. Similar-looking rims should not be treated as interchangeable.",
        ],
        links: [{ label: "Build a cup-and-lid compatibility matrix", href: "/guides/disposable-cup-lid-compatibility/" }],
      },
      {
        heading: "Compare decoration after the base cup.",
        paragraphs: [
          "Select the exact construction before approving a print area, dieline, sleeve or label. Record artwork versions, colours, coverage, print sides and any barcode or market-specific text separately.",
          "Ask what the proof or sample represents. A layout proof, colour reference and production-representative sample can support different decisions and should not be described as equivalent.",
        ],
        links: [{ label: "Plan custom printed coffee cups", href: "/solutions/custom-printed-coffee-cups/" }, { label: "Structure cup printing samples", href: "/guides/disposable-cup-printing-samples/" }],
      },
      {
        heading: "Close the comparison with commercial evidence.",
        paragraphs: [
          "Request MOQ, price, case pack, cup-and-lid order units, sample status, lead-time basis and available product records against the same written specification. Compare complete usable sets rather than cup piece prices alone.",
          "The final choice should name the cup, lid, artwork, pack and intended use. Any performance, environmental or compliance statement should be checked against model-specific information and the destination context.",
        ],
        links: [{ label: "Review cup MOQ inputs", href: "/guides/disposable-cup-moq/" }, { label: "Plan cup packing and timing", href: "/guides/disposable-cup-lead-time-packing/" }, { label: "Review quality and document handling", href: "/quality-compliance/" }],
      },
    ],
    questions: [
      { question: "Are paper cups always for hot drinks and plastic cups for cold drinks?", answer: "Do not use that shortcut as a specification. State the beverage and service conditions, then confirm suitability for the exact cup construction and model." },
      { question: "Which cup material is easiest to custom print?", answer: "Decoration options depend on the selected cup construction, artwork, coverage and project scope. Choose the base cup first and request the feasible print or sleeve route for that model." },
      { question: "Can cups with the same ounce capacity use the same lid?", answer: "Not automatically. Compatibility depends on the exact rim and component design, so record and verify the cup-and-lid references together." },
    ],
    related: [
      { label: "Disposable cups and drinkware", href: "/products/cups-drinkware/" },
      { label: "Disposable cup sourcing guide", href: "/guides/disposable-cup-sourcing-guide/" },
      { label: "Food packaging material comparison", href: "/guides/food-packaging-materials-comparison/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "disposable-cup-lid-compatibility",
    title: "Disposable cup and lid compatibility guide for buyers",
    seoTitle: "Disposable Cup & Lid Compatibility Guide",
    shortTitle: "Match disposable cups and lids",
    description: "Build a cup-and-lid compatibility matrix using exact models, rim dimensions, closure style, service tests, case packs and written approval records.",
    lede: "A matching ounce label is not a lid specification. Buyers should pair each cup with an exact lid reference, confirm the rim and closure system, and test the filled set through the real service and delivery routine.",
    image,
    imageAlt: "Disposable cups reviewed as model-specific cup and lid systems",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Identify every cup by model, not capacity alone.",
        paragraphs: [
          "Start the matrix with the cup family, AW SKU, nominal capacity, dimensions and material. Two 12 oz cups can use different rim geometry or construction even when their serving volume appears comparable.",
          "Mark any unconfirmed dimension rather than copying a value from a visually similar item. The selected cup page is the starting reference for the written review.",
        ],
        checklist: ["Cup family and AW SKU", "Nominal capacity", "Top or rim dimension", "Cup construction", "Specification status"],
        links: [{ label: "Compare the cups and drinkware range", href: "/products/cups-drinkware/" }],
      },
      {
        heading: "Record the lid as a separate component.",
        paragraphs: [
          "Give the lid its own reference, material, colour or clarity, opening style and pack quantity. If flat, sip, dome or other lid forms are being considered, list them as separate options rather than one generic cover.",
          "Ask the supplier to confirm which exact cup models the lid is intended to fit. A shared nominal diameter is useful screening information but not final compatibility approval.",
        ],
      },
      {
        heading: "Build a many-size compatibility matrix.",
        paragraphs: [
          "For a program with several cup sizes, put cup models down the rows and proposed lid models across the columns. Mark only confirmed pairings and keep sample-tested and document-confirmed status visible.",
          "A common-lid strategy can reduce operational complexity, but it should follow verified compatibility rather than drive an unsupported substitution.",
        ],
        links: [{ label: "Plan a complete disposable cup program", href: "/guides/disposable-cup-sourcing-guide/" }],
      },
      {
        heading: "Test the filled system through service.",
        paragraphs: [
          "Use the intended beverage and fill level. Close the lid using the real operator routine, then hold, carry, stack and transport it in the planned orientation before recording opening and drinking behaviour.",
          "Define the test conditions and observations. A dry empty fit check is useful, but it does not represent every filled-service condition.",
        ],
        links: [{ label: "Plan samples and approval records", href: "/guides/disposable-cup-printing-samples/" }],
      },
      {
        heading: "Align cup and lid packing quantities.",
        paragraphs: [
          "Record pieces per sleeve, sleeves per case and total pieces per case for both components. Convert the planned order into usable cup-and-lid sets and show any remaining unmatched inventory.",
          "If several cups share one verified lid, calculate the lid quantity from the size mix rather than from the total cup forecast alone.",
        ],
        links: [{ label: "Review case packs and lead time", href: "/guides/disposable-cup-lead-time-packing/" }],
      },
      {
        heading: "Freeze the approved pairing in writing.",
        paragraphs: [
          "The final record should name the cup and lid references, applicable sizes, tested service conditions, sample identity, pack quantities and approval date. Link any later substitution to a new comparison and approval.",
          "Reconfirm availability, MOQ, documents and commercial terms for both components before order release.",
        ],
        links: [{ label: "Use the full RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }, { label: "Send the selected pairing", href: "/contact/" }],
      },
    ],
    questions: [
      { question: "Will every 90 mm lid fit every 90 mm cup?", answer: "Do not assume so. The stated dimension does not describe every part of the rim and closure geometry; verify the exact cup-and-lid models together." },
      { question: "Can one lid be used across several cup sizes?", answer: "It may be possible for specific confirmed models. Request a written compatibility matrix and test the actual pairings used in the program." },
      { question: "Should lids be included in MOQ and freight calculations?", answer: "Yes. Compare lid and cup order units, case packs, carton data and quantities together so the purchase creates the required number of usable sets." },
    ],
    related: [
      { label: "Disposable cups and drinkware", href: "/products/cups-drinkware/" },
      { label: "Disposable cup MOQ guide", href: "/guides/disposable-cup-moq/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "disposable-cup-moq",
    title: "Disposable cup MOQ: how wholesale buyers should compare quotes",
    seoTitle: "Disposable Cup MOQ Guide",
    shortTitle: "Plan disposable cup MOQ",
    description: "Compare disposable-cup MOQ by exact model, size, material, artwork, cup-and-lid order units, case packs and realistic quantity scenarios.",
    lede: "A disposable-cup MOQ belongs to a defined cup model, size, material, colour, artwork version and pack route. Buyers should request the unit and basis behind the minimum, then calculate cups and matching lids as usable sets.",
    image,
    imageAlt: "Disposable cup sizes arranged for MOQ and wholesale order planning",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Ask what the minimum applies to.",
        paragraphs: [
          "Request whether the MOQ is stated in pieces, sleeves, cases or a production batch and whether it applies per cup model, size, colour and artwork. Keep the quoted order quantity beside the minimum.",
          "Do not treat a combined annual forecast as the committed quantity for every SKU. Separate estimates from the order being quoted.",
        ],
        checklist: ["MOQ unit", "Cup model and size", "Material and colour", "Artwork version", "Quoted quantity"],
        links: [{ label: "Browse cup models", href: "/products/cups-drinkware/" }],
      },
      {
        heading: "Separate standard and custom requirements.",
        paragraphs: [
          "Identify whether the request uses an existing construction and colour or adds printing, a sleeve, label, special packing or several artwork versions. Ask which variable changes the production and quotation basis.",
          "An unprinted reference and a custom printed cup should not inherit the same MOQ without written confirmation.",
        ],
        links: [{ label: "Plan custom printed coffee cups", href: "/solutions/custom-printed-coffee-cups/" }],
      },
      {
        heading: "Break the program down by real SKU.",
        paragraphs: [
          "List cup sizes, materials, colours and artwork versions on separate order lines. Add the exact matching lid to each line and identify any shared-lid relationship that has been confirmed.",
          "This breakdown exposes whether the minimum applies to the whole program or to each model, colour or design.",
        ],
        links: [{ label: "Create the cup-and-lid matrix", href: "/guides/disposable-cup-lid-compatibility/" }],
      },
      {
        heading: "Convert pieces into complete cases and sets.",
        paragraphs: [
          "Use confirmed sleeve and case quantities to round every proposed line. Then calculate the number of complete cup-and-lid sets and any component overage.",
          "Case rounding affects storage, freight and working capital, so compare it alongside the piece price.",
        ],
        links: [{ label: "Plan packing and loading", href: "/guides/disposable-cup-lead-time-packing/" }],
      },
      {
        heading: "Compare realistic quantity scenarios.",
        paragraphs: [
          "Request quotations at quantities the business can purchase and consume while keeping the specification, packing and delivery basis constant. Record setup items, sample costs, quotation validity and currency.",
          "Use the buyer's own demand, storage and artwork-change risk when deciding whether a lower unit price at a higher quantity is useful.",
        ],
      },
      {
        heading: "Confirm the final MOQ basis before release.",
        paragraphs: [
          "The order record should identify quantities by cup, lid and artwork; the MOQ basis; price; packing; sample status; approved artwork; document scope and timing. Mark every provisional item.",
          "ANWELLUP confirms the applicable minimum only after the selected model and project scope are defined; no category-wide number is claimed on this page.",
        ],
        links: [{ label: "Build the complete RFQ", href: "/guides/food-packaging-rfq-checklist/" }, { label: "Discuss the cup program", href: "/contact/" }],
      },
    ],
    questions: [
      { question: "What is ANWELLUP's MOQ for disposable cups?", answer: "MOQ is confirmed for the selected cup and lid models, sizes, material, colour, artwork, packing, quantity unit and destination. Send those inputs for a written quotation." },
      { question: "Can different cup sizes be combined to reach MOQ?", answer: "Do not assume they can. Ask whether the minimum applies per model, size, colour or artwork and request the assortment basis in writing." },
      { question: "Should cups and lids have the same order quantity?", answer: "They should create the required number of usable sets, but case packs may differ. Calculate each component using confirmed pieces per case." },
    ],
    related: [
      { label: "Disposable cup sourcing guide", href: "/guides/disposable-cup-sourcing-guide/" },
      { label: "Cup and lid compatibility", href: "/guides/disposable-cup-lid-compatibility/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "disposable-cup-printing-samples",
    title: "Custom disposable cup printing, proofs and sample approval",
    seoTitle: "Disposable Cup Printing & Sample Guide",
    shortTitle: "Approve custom cup printing",
    description: "Plan custom disposable-cup artwork, dielines, proofs, physical samples, colour review and a controlled approval record before production.",
    lede: "Custom cup approval has two layers: the exact cup construction and the artwork applied to it. Fix the cup and lid models first, then control the dieline, proof purpose, colour reference, sample identity and final approval version.",
    image,
    imageAlt: "Printed disposable cup artwork and sample approval planning",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Lock the base cup before final artwork.",
        paragraphs: [
          "Record the cup family, AW SKU, size, construction, colour and matching lid before a final dieline or print area is approved. A similar-looking cup image is not a production template.",
          "If several sizes use related artwork, identify which files are shared and which require their own layout and approval.",
        ],
        checklist: ["Cup and lid references", "Size and construction", "Cup colour or surface", "Print area or dieline", "Number of artwork versions"],
        links: [{ label: "Compare paper cup families", href: "/products/cups-drinkware/" }],
      },
      {
        heading: "Define the artwork and print brief.",
        paragraphs: [
          "State the artwork status, colour references, print sides, coverage, orientation and any barcode, legal copy or variable market text. Supply editable files and identify linked images and fonts according to the requested artwork specification.",
          "Ask which decoration route can be reviewed for the selected cup. Method, printable area and setup conditions are model- and project-specific.",
        ],
        links: [{ label: "Use the broader printing guide", href: "/guides/custom-food-packaging-printing-guide/" }],
      },
      {
        heading: "Name the decision each proof must support.",
        paragraphs: [
          "A digital layout proof may answer position and copy questions. A physical reference may help with shape and handling. A custom or production-representative sample may address a different set of construction, colour or finish questions.",
          "Ask the supplier to state what the proof represents and what remains outside its scope. Do not describe a screen image as a guarantee of printed colour.",
        ],
      },
      {
        heading: "Review colour with a controlled reference.",
        paragraphs: [
          "Provide a named colour standard and, when available, an approved physical reference. Record the substrate, cup colour, print process and lighting context used in the review.",
          "Different devices and materials can change appearance. Agree the approval route and acceptable decision basis for the actual project.",
        ],
        links: [{ label: "Plan a custom coffee-cup program", href: "/solutions/custom-printed-coffee-cups/" }],
      },
      {
        heading: "Test the sample as a complete cup system.",
        paragraphs: [
          "Check the approved cup with its intended lid, beverage, fill level and service routine. Review print position in relation to seams, grip area, lid orientation, stacking and any sleeve or label.",
          "Record the exact sample identity, artwork filename and test conditions so the approval can be connected to the order specification.",
        ],
        links: [{ label: "Verify cup and lid compatibility", href: "/guides/disposable-cup-lid-compatibility/" }],
      },
      {
        heading: "Create one final approval record.",
        paragraphs: [
          "The record should identify the cup, lid, artwork version, colour reference, proof or sample type, observations, approver and date. List unresolved differences explicitly.",
          "Reconfirm MOQ, setup items, packing, document requirements and timing against that approved scope before production release.",
        ],
        links: [{ label: "Review cup MOQ", href: "/guides/disposable-cup-moq/" }, { label: "Build the complete RFQ", href: "/guides/food-packaging-rfq-checklist/" }],
      },
    ],
    questions: [
      { question: "Can cup artwork be finalized before choosing a cup model?", answer: "Concept work can begin, but final artwork should use the print area or dieline for the exact selected cup construction and size." },
      { question: "Does a digital proof confirm the final printed colour?", answer: "No. It can support layout review, but screen appearance, substrate and print process differ. Agree a suitable colour reference and sample route." },
      { question: "What should be included in a cup-print approval?", answer: "Include the cup and lid models, artwork file and version, colours, print area and orientation, proof or sample identity, approver, date and unresolved conditions." },
    ],
    related: [
      { label: "Custom printed coffee cups", href: "/solutions/custom-printed-coffee-cups/" },
      { label: "Custom food packaging printing", href: "/guides/custom-food-packaging-printing-guide/" },
      { label: "Disposable cup MOQ", href: "/guides/disposable-cup-moq/" },
    ],
  },
  {
    slug: "disposable-cup-lead-time-packing",
    title: "Disposable cup lead time, packing and loading guide",
    seoTitle: "Disposable Cup Lead Time & Packing",
    shortTitle: "Plan cup timing and packing",
    description: "Plan disposable-cup lead time and logistics using approval milestones, cup-and-lid case packs, carton dimensions, gross weights and assortment data.",
    lede: "Cup lead time and loading cannot be separated from the selected models, artwork approvals and case data. Buyers need a defined starting milestone and confirmed packing information for every cup, lid and accessory in the order.",
    image,
    imageAlt: "Disposable cups arranged for case-pack and delivery planning",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Define the event that starts the clock.",
        paragraphs: [
          "Ask whether the quoted timing begins after order confirmation, payment, specification approval, artwork approval, sample approval or another event. Record the event and the shipment-ready definition.",
          "Separate buyer review time from supplier production time so a delayed approval is visible in the critical path.",
        ],
        checklist: ["Specification approval", "Artwork status", "Sample status", "Order milestone", "Shipment-ready milestone"],
        links: [{ label: "Plan cup proofs and samples", href: "/guides/disposable-cup-printing-samples/" }],
      },
      {
        heading: "Break the program into milestones.",
        paragraphs: [
          "List artwork preparation, proof review, sample preparation and delivery, production, inspection and shipment readiness separately. Identify which stages are conditional on the selected customization route.",
          "Timing remains provisional until the cup, lid, quantities, artwork versions and packing are agreed.",
        ],
      },
      {
        heading: "Request packing data for every component.",
        paragraphs: [
          "Record pieces per sleeve, sleeves per case, total pieces, carton dimensions and gross weight for each cup and lid model. Include sleeves, straws or other components when they are part of the program.",
          "The catalogue contains model-level case entries for selected ranges, but final logistics calculations should use the confirmed order specification.",
        ],
        evidence: [
          { label: "Single-wall paper examples", value: "Selected listed models show 1,000 pcs/ctn", href: "/products/cups-drinkware/paper-cups-single-wall/" },
          { label: "Double-wall paper examples", value: "Selected listed models show 500 pcs/ctn", href: "/products/cups-drinkware/paper-cups-double-wall/" },
          { label: "PET cold-cup examples", value: "Current 7–10 oz entries list 1,000 pcs per case", href: "/products/cups-drinkware/cups-pet-cold-cups/" },
        ],
      },
      {
        heading: "Calculate matched cup-and-lid sets.",
        paragraphs: [
          "Convert every component quantity into complete cases, then calculate usable sets. Case packs may differ even when the intended piece quantities are equal.",
          "For a shared-lid program, use the confirmed size mix and keep a clear allocation by cup model.",
        ],
        links: [{ label: "Build the compatibility matrix", href: "/guides/disposable-cup-lid-compatibility/" }, { label: "Review cup MOQ and rounding", href: "/guides/disposable-cup-moq/" }],
      },
      {
        heading: "Build loading estimates from confirmed cartons.",
        paragraphs: [
          "Use carton dimensions, gross weights, quantities and the actual assortment for loading estimates. Identify pallet, floor-load, consolidation and allowance assumptions.",
          "A generic cups-per-container claim is not reliable because cup construction, nesting, lid cartons and the model mix change the result.",
        ],
      },
      {
        heading: "Reconfirm the final logistics record.",
        paragraphs: [
          "Before order release, confirm models, quantities, packing, carton data, artwork, sample status, milestone timing, delivery term and destination. Update the loading plan if any input changes.",
          "Keep production lead time, shipment readiness and transport time as separate fields in the buyer's plan.",
        ],
        links: [{ label: "Use the RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }, { label: "Discuss the cup order", href: "/contact/" }],
      },
    ],
    questions: [
      { question: "What is the lead time for custom disposable cups?", answer: "It is confirmed for the selected models, quantities, artwork, sample status and packing. Ask for the starting event and shipment-ready milestone in writing." },
      { question: "Can cup loading be estimated from the number of pieces?", answer: "Not reliably. Use confirmed case quantities, carton dimensions, gross weights, lid cartons and the actual assortment." },
      { question: "Should cup and lid production timing be tracked separately?", answer: "Track the components and approvals separately, then confirm the milestone at which the complete matched order will be shipment-ready." },
    ],
    related: [
      { label: "Disposable cup MOQ", href: "/guides/disposable-cup-moq/" },
      { label: "Cup and lid compatibility", href: "/guides/disposable-cup-lid-compatibility/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "how-to-evaluate-plastic-cup-manufacturer",
    title: "How to evaluate a plastic cup manufacturer or supplier",
    seoTitle: "How to Evaluate a Plastic Cup Manufacturer",
    shortTitle: "Evaluate a plastic cup supplier",
    description: "Evaluate a plastic cup manufacturer or supplier by legal identity, production scope, exact models, cup-and-lid systems, evidence, samples and written terms.",
    lede: "A credible plastic-cup review connects the contracting company, actual production scope, exact PET or PP models, matching components, supporting records and the commercial order. A factory image or broad material claim cannot establish all of those facts.",
    image,
    imageAlt: "PET and PP cup formats used in a supplier-evaluation checklist",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Confirm the contracting and payment identity.",
        paragraphs: [
          "Request the legal company name, registered or business address, quotation issuer, payment beneficiary and entity that will issue commercial documents. Resolve any unexplained difference before ordering.",
          "A trading name, domain or salesperson profile is not the complete legal-identity record.",
        ],
        checklist: ["Legal company name", "Business address", "Quotation issuer", "Payment beneficiary", "Commercial document issuer"],
        links: [{ label: "Review ANWELLUP's public scope", href: "/about/" }],
      },
      {
        heading: "Clarify manufacturer, partner and service scope.",
        paragraphs: [
          "Ask which cup families and processes are handled directly, which involve production partners and who controls model specifications, samples, quality records and shipment coordination. Request the answer for the actual PET or PP range under review.",
          "Do not assume that one facility, machine or audit covers a mixed catalogue. Connect the facility relationship to the selected product family.",
        ],
        links: [{ label: "Review manufacturing and equipment context", href: "/manufacturing/" }],
      },
      {
        heading: "Verify the exact plastic cup range.",
        paragraphs: [
          "Request the family, AW SKU or supplier model, material, size, dimensions, weight where relevant, colour or clarity, matching lid and pack information. Mark fields that remain under review.",
          "ANWELLUP's current public range separates PET cold cups, general PP disposable cups and PP milk-tea cups so buyers can reference the exact family instead of a generic plastic-cup image.",
        ],
        evidence: [
          { label: "PET cold cups", value: "Public family with 7–10 oz model entries", href: "/products/cups-drinkware/cups-pet-cold-cups/" },
          { label: "PP disposable cups", value: "Public family with portion-to-beverage sizes from 1–20 oz", href: "/products/cups-drinkware/pp-disposable-cups/" },
          { label: "PP milk-tea cups", value: "Public family with 500 ml and 700 ml model entries", href: "/products/cups-drinkware/pp-milk-tea-cups/" },
        ],
      },
      {
        heading: "Check component and intended-use evidence.",
        paragraphs: [
          "Verify the proposed cup and lid as one system and state the beverage, fill and service conditions. Request available specifications, declarations or test records that identify the relevant product or material and scope.",
          "Check issuer, test basis, validity and connection to the proposed model. A document for a related material or different cup should not be presented as universal coverage.",
        ],
        links: [{ label: "Review document handling", href: "/quality-compliance/" }, { label: "Build the lid matrix", href: "/guides/disposable-cup-lid-compatibility/" }],
      },
      {
        heading: "Use samples to verify defined questions.",
        paragraphs: [
          "State whether the sample should confirm dimensions, clarity, cup weight, lid fit, filling, handling, delivery or custom artwork. Record what the sample represents and any difference from the proposed production order.",
          "A sample review complements the model record and document check; it does not replace them.",
        ],
        links: [{ label: "Plan cup samples and approvals", href: "/guides/disposable-cup-printing-samples/" }],
      },
      {
        heading: "Put the commercial commitment in one record.",
        paragraphs: [
          "Confirm the cup and lid specifications, quantities, MOQ basis, price, packing, sample and artwork status, documents, milestone timing, delivery term and payment identity in writing.",
          "Escalate inconsistent identities, unsupported performance claims, unexplained payment changes or pressure to bypass model-level review.",
        ],
        links: [{ label: "Use the supplier-verification guide", href: "/guides/how-to-verify-food-packaging-supplier/" }, { label: "Build a complete RFQ", href: "/guides/food-packaging-rfq-checklist/" }],
      },
    ],
    questions: [
      { question: "Does a factory photograph prove who manufactured the cups?", answer: "No. Confirm legal identity, facility relationship, product and process scope, specification control and the records tied to the proposed model." },
      { question: "Does one test report cover every PET or PP cup?", answer: "Not automatically. Review the named product or material, scope, issuer, test basis and validity and establish how it connects to the exact model." },
      { question: "What should be confirmed before paying a plastic cup supplier?", answer: "Confirm the contracting and payment identity, cup-and-lid specification, quantity, price, packing, approvals, document scope, timing and delivery basis in writing." },
    ],
    related: [
      { label: "PET and PP cup range", href: "/products/cups-drinkware/" },
      { label: "How to verify a food packaging supplier", href: "/guides/how-to-verify-food-packaging-supplier/" },
      { label: "Quality and document handling", href: "/quality-compliance/" },
    ],
  },
];
