import type { BuyingGuide } from "./guides";

const image = "/assets/catalog/2026-09-r1/takeaway-boxes-containers-v1.webp";
const imageWidth = 1448;
const imageHeight = 1086;
const published = "2026-09-08";
const updated = "2026-09-08";

export const containerClusterGuides: BuyingGuide[] = [
  {
    slug: "hinged-vs-folded-takeaway-containers",
    title: "Hinged vs folded takeaway containers: a buyer comparison",
    seoTitle: "Hinged vs Folded Takeaway Containers",
    shortTitle: "Compare hinged and folded containers",
    description: "Compare hinged and folded takeaway containers by food fit, closure, assembly, stacking, branding, packing and model-specific documentation.",
    lede: "Hinged and folded containers solve different operating problems. Compare them through the food, filling routine, closure, transport, storage and branding requirements—not by shape or material name alone.",
    image,
    imageAlt: "Hinged, folded and lidded takeaway container formats for comparison",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "What is the practical difference?",
        paragraphs: [
          "A hinged container joins the lid and base in one construction. A folded container is formed through panels and closure tabs; other ranges may use a separate lid. That structural difference affects assembly, storage and the closing routine.",
          "Do not assume one format is universally better. Shortlist the exact models and test them with the intended food and service conditions.",
        ],
        links: [{ label: "Browse takeaway container families", href: "/products/takeaway-boxes-containers/" }],
      },
      {
        heading: "Compare food fit and usable geometry.",
        paragraphs: [
          "Record the portion shape, usable base area, internal height, headspace and compartment needs. Nominal capacity alone can hide differences between a broad shallow pack and a narrower deep one.",
          "Check whether the food touches the closure area and whether the closed pack preserves the intended presentation under the normal fill level.",
        ],
        links: [{ label: "Use the container size guide", href: "/guides/food-container-size-guide/" }],
      },
      {
        heading: "Review closing and transport.",
        paragraphs: [
          "Run the real closing action with trained and untrained operators, then stack and transport the filled pack in its expected orientation. Record opening, re-closing and any movement that matters to the application.",
          "Closure performance is model- and condition-specific. Ask for intended-use suitability to be confirmed in writing.",
        ],
      },
      {
        heading: "Measure assembly and storage impact.",
        paragraphs: [
          "Compare how each format arrives, nests, unfolds and occupies the work area. Include pieces per sleeve, packs per case, case dimensions and gross weight in the operational review.",
          "A compact shipping case may still require more assembly at the point of service. Buyers should evaluate both warehouse and line-side handling.",
        ],
        links: [{ label: "Plan packing and loading", href: "/guides/takeaway-container-lead-time-packing/" }],
      },
      {
        heading: "Define branding after the format.",
        paragraphs: [
          "A folded surface, hinged lid, label or sleeve can offer different artwork areas. Select the exact base model before finalizing print coverage, dielines or label position.",
          "Decoration availability and setup conditions depend on the construction and project. Request the feasible route for the shortlisted model.",
        ],
        links: [{ label: "Prepare the customization brief", href: "/solutions/custom-takeaway-containers/" }],
      },
      {
        heading: "Make the final comparison auditable.",
        paragraphs: [
          "Place food fit, closure, workflow, packing, artwork, sample result, documents, MOQ, price and timing in one comparison table. Mark unconfirmed fields rather than filling them with assumptions.",
          "The selected format should be identified by model and revision in the final written specification.",
        ],
        links: [{ label: "Use the complete RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }],
      },
    ],
    questions: [
      { question: "Are folded containers always made from paper?", answer: "Do not infer material from the closure name. Confirm the exact construction and supporting specification for each model." },
      { question: "Is a hinged lid always more secure?", answer: "Not automatically. Closure behaviour depends on the exact design, fill, temperature, handling and transport conditions and should be tested by model." },
      { question: "Which format is easier to customize?", answer: "Available print, label or sleeve routes depend on the selected material, geometry, artwork and project scope. Confirm the feasible route after model selection." },
    ],
    related: [
      { label: "Takeaway boxes and containers", href: "/products/takeaway-boxes-containers/" },
      { label: "Custom takeaway containers", href: "/solutions/custom-takeaway-containers/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "how-to-choose-takeaway-packaging",
    title: "How to choose takeaway packaging for a food program",
    seoTitle: "How to Choose Takeaway Food Packaging",
    shortTitle: "Choose takeaway packaging",
    description: "Choose takeaway packaging by mapping food, portion, temperature, holding, closure, transport, service workflow, packing and destination requirements.",
    lede: "The right takeaway pack is the format that can be verified against the actual food and operating journey. Begin with the application, narrow the geometry and material, then test the complete base-and-closure system.",
    image,
    imageAlt: "Takeaway food packaging formats arranged for a buyer selection process",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Map the food and portion first.",
        paragraphs: [
          "Record food type, portion weight or volume, shape, sauce or moisture context and the desired presentation. Add required headspace and whether components must remain separated.",
          "Use these inputs to shortlist usable geometry rather than starting from a familiar product photograph.",
        ],
        checklist: ["Food and portion", "Usable dimensions", "Headspace", "Compartments", "Presentation"],
        links: [{ label: "Compare the container range", href: "/products/takeaway-boxes-containers/" }],
      },
      {
        heading: "Describe the service journey.",
        paragraphs: [
          "State filling condition, holding interval, storage, transport orientation and expected consumer use. Identify reheating, chilling or display requirements that need model-specific confirmation.",
          "A material label alone is not evidence that a format suits every temperature or use condition.",
        ],
      },
      {
        heading: "Select material in context.",
        paragraphs: [
          "Compare material together with construction, closure, clarity, stiffness, weight and available documentation. Keep environmental claims separate unless evidence and the destination's recovery context support them.",
          "Ask for the selected model's intended use and supporting records to be confirmed.",
        ],
        links: [{ label: "Compare food packaging materials", href: "/guides/food-packaging-materials-comparison/" }],
      },
      {
        heading: "Treat the closure as part of the product.",
        paragraphs: [
          "Identify hinged, folded, separate-lid or sealing requirements. Record a separate lid with its base, and review closing, opening, stacking and transport with the actual components.",
          "Similar-looking rims or covers should not be treated as interchangeable without confirmation.",
        ],
        links: [{ label: "Compare hinged and folded formats", href: "/guides/hinged-vs-folded-takeaway-containers/" }],
      },
      {
        heading: "Test workflow and packing.",
        paragraphs: [
          "Fill, close, hold, stack and transport representative samples using the real service routine. Include line-side storage and outer-case handling when they affect operations.",
          "Record sample identity and conditions so the result can be connected to the quoted model.",
        ],
        links: [{ label: "Plan the sample process", href: "/guides/takeaway-container-samples-prototyping/" }],
      },
      {
        heading: "Compare commercial terms last.",
        paragraphs: [
          "Once the candidate specification is stable, request MOQ, price, packing, lead time, sample status and documents on the same basis. Convert quantities into complete cases and matched components.",
          "Use a written RFQ to separate confirmed facts from options and open questions.",
        ],
        links: [{ label: "Build the complete RFQ", href: "/guides/food-packaging-rfq-checklist/" }, { label: "Discuss a custom project", href: "/solutions/custom-takeaway-containers/" }],
      },
    ],
    questions: [
      { question: "What should be chosen first: material or container shape?", answer: "Begin with food, portion and service conditions, then compare geometry, material and closure together against those requirements." },
      { question: "Is nominal capacity enough to select a container?", answer: "No. Add usable dimensions, portion shape, headspace, compartments, closure and the complete service journey." },
      { question: "When should price be compared?", answer: "Compare price after each supplier is quoting the same model-level specification, quantity unit, packing, document scope and delivery basis." },
    ],
    related: [
      { label: "Takeaway boxes and containers", href: "/products/takeaway-boxes-containers/" },
      { label: "Container size guide", href: "/guides/food-container-size-guide/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "takeaway-container-moq",
    title: "Takeaway container MOQ: what wholesale buyers should compare",
    seoTitle: "Takeaway Container MOQ Guide",
    shortTitle: "Plan takeaway container MOQ",
    description: "Understand how takeaway-container model, material, colour, printing, packing and assortment affect MOQ and how to request a comparable wholesale quote.",
    lede: "There is no responsible category-wide MOQ for takeaway containers. The minimum belongs to a defined model, material, colour, artwork, pack configuration and production route, so buyers should ask for both the number and its basis.",
    image,
    imageAlt: "Takeaway container assortment considered for MOQ and order planning",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Ask what the MOQ applies to.",
        paragraphs: [
          "Request the unit and scope: pieces, packs, cases or another basis, and whether it applies per model, size, colour and artwork version. Record the quoted quantity beside the MOQ.",
          "A combined annual forecast does not automatically satisfy a minimum for every line in an assortment.",
        ],
        checklist: ["MOQ unit", "Model and size", "Material and colour", "Artwork version", "Pack configuration"],
        links: [{ label: "Compare the container range", href: "/products/takeaway-boxes-containers/" }],
      },
      {
        heading: "Separate standard from custom scope.",
        paragraphs: [
          "Identify which parts of the request follow an existing model and which introduce printing, colour, label, sleeve or packing changes. Ask how each custom variable changes the quotation basis.",
          "Do not transfer an MOQ from an unprinted item to a branded project without written confirmation.",
        ],
        links: [{ label: "Review custom container planning", href: "/solutions/custom-takeaway-containers/" }],
      },
      {
        heading: "Break assortments into real order lines.",
        paragraphs: [
          "List quantities by base, lid, size, colour and artwork. Compare order units for matched components so the proposed purchase does not leave avoidable unmatched inventory.",
          "Keep forecast, sample quantity and committed order quantity in separate fields.",
        ],
      },
      {
        heading: "Convert pieces into packs and cases.",
        paragraphs: [
          "Ask for pieces per pack, packs per case and case dimensions by model. Round the planned quantity to complete cases and show the effect on inventory and freight.",
          "Packing changes can alter the commercial basis, so agree them before final comparison.",
        ],
        links: [{ label: "Plan packing and loading", href: "/guides/takeaway-container-lead-time-packing/" }],
      },
      {
        heading: "Compare realistic quantity scenarios.",
        paragraphs: [
          "Request prices at quantities the business can actually purchase and consume while keeping the specification constant. Record currency, delivery term, setup items and validity with each scenario.",
          "Evaluate storage, consumption, artwork-change risk and component balance with the buyer's own operating data.",
        ],
      },
      {
        heading: "Confirm the final order basis.",
        paragraphs: [
          "Before release, confirm quantity by model, MOQ basis, unit price, packing, artwork, sample status, documents and timing in writing. Mark any provisional field.",
          "A clear RFQ creates the comparison record needed for approval and repeat ordering.",
        ],
        links: [{ label: "Use the complete RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }, { label: "Review the broader MOQ guide", href: "/guides/food-packaging-moq-guide/" }],
      },
    ],
    questions: [
      { question: "What is ANWELLUP's MOQ for takeaway containers?", answer: "MOQ is confirmed for the selected model, material, customization, packing, quantity unit and destination. Send those details for a written quotation." },
      { question: "Can several container sizes be combined?", answer: "Do not assume they can. Ask whether the minimum applies per model, size, colour and artwork version and request the assortment basis in writing." },
      { question: "Does a higher forecast reduce the MOQ?", answer: "A forecast can support planning but is not a committed order. Any commercial effect must be quoted against the actual project scope and order quantity." },
    ],
    related: [
      { label: "Food packaging MOQ guide", href: "/guides/food-packaging-moq-guide/" },
      { label: "Custom takeaway containers", href: "/solutions/custom-takeaway-containers/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "takeaway-container-samples-prototyping",
    title: "Takeaway container samples and prototyping for buyers",
    seoTitle: "Takeaway Container Samples & Prototyping",
    shortTitle: "Plan samples and prototyping",
    description: "Plan takeaway-container samples by defining whether the review must confirm format, portion fit, closure, artwork, colour or production finish.",
    lede: "A sample is useful only when the buyer knows what it represents and which decision it must support. Separate catalogue samples, custom prototypes and production-representative approvals so one does not imply evidence it cannot provide.",
    image,
    imageAlt: "Takeaway container formats prepared for sample and prototype review",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Define the sample question.",
        paragraphs: [
          "State whether the review is for portion fit, dimensions, closure, stacking, transport, artwork layout, colour or final production finish. One sample may not answer all of these questions.",
          "Write acceptance observations before the sample arrives so reviewers evaluate the same conditions.",
        ],
        checklist: ["Decision to be made", "Model or construction", "Food and test conditions", "Artwork version", "Required approval record"],
        links: [{ label: "Choose a container format", href: "/guides/how-to-choose-takeaway-packaging/" }],
      },
      {
        heading: "Identify what the sample represents.",
        paragraphs: [
          "A catalogue reference may show shape and handling but not custom colour or printing. A prototype may demonstrate layout without representing the final material or production method.",
          "Ask the supplier to state the sample type, model relationship and any differences from the proposed order.",
        ],
        links: [{ label: "Browse container families", href: "/products/takeaway-boxes-containers/" }],
      },
      {
        heading: "Run a model-specific food test.",
        paragraphs: [
          "Fill the sample with the intended portion, close it through the real workflow, hold it for the expected interval and transport it in the planned orientation. Record the food, fill condition, duration and observations.",
          "Intended-use suitability still requires written model-level confirmation and any applicable evidence review.",
        ],
      },
      {
        heading: "Review artwork as a separate layer.",
        paragraphs: [
          "Tie every proof or printed sample to an artwork filename and revision. Check content, orientation, print position, coverage and its relationship to folds, seams, labels or closures.",
          "State whether the approval covers layout, colour expectation, construction or a production-representative result.",
        ],
        links: [{ label: "Prepare the printing brief", href: "/guides/custom-food-packaging-printing-guide/" }],
      },
      {
        heading: "Record cost, timing and delivery.",
        paragraphs: [
          "Ask for availability, sample charge, setup items, delivery method and timing after the requested sample type is clear. Separate sample timing from bulk-production timing.",
          "If samples must reach several reviewers, define quantity and destination before quotation.",
        ],
        links: [{ label: "Plan lead time and shipment", href: "/guides/takeaway-container-lead-time-packing/" }],
      },
      {
        heading: "Close approval without overclaiming.",
        paragraphs: [
          "Keep the sample identity, test notes, artwork version, approver, date and unresolved conditions in one record. Approval should say precisely what was accepted.",
          "Reconfirm final specification, documents, MOQ, packing and production timing before order release.",
        ],
        links: [{ label: "Use the RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }, { label: "Discuss a custom project", href: "/solutions/custom-takeaway-containers/" }],
      },
    ],
    questions: [
      { question: "Can I request a sample before choosing a model?", answer: "You can discuss a representative reference, but a useful request should define the format, application and decision the sample must support." },
      { question: "Does a catalogue sample prove custom printing?", answer: "No. It may help assess the base format but does not automatically represent custom artwork, colour, print method or production finish." },
      { question: "What should a sample approval record include?", answer: "Include the model or sample identity, test conditions, artwork version where applicable, observations, approver, date and any unresolved conditions." },
    ],
    related: [
      { label: "Custom takeaway containers", href: "/solutions/custom-takeaway-containers/" },
      { label: "Takeaway container sourcing guide", href: "/guides/takeaway-container-sourcing-guide/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "takeaway-container-lead-time-packing",
    title: "Takeaway container lead time, packing and loading guide",
    seoTitle: "Takeaway Container Lead Time & Packing",
    shortTitle: "Plan timing, packing and loading",
    description: "Plan takeaway-container lead time and freight with clear approval milestones, pieces per case, carton dimensions, gross weight and assortment data.",
    lede: "Lead time and loading are outputs of a defined project, not fixed category claims. Buyers need an agreed starting point, approval sequence and confirmed case data for every model in the order.",
    image,
    imageAlt: "Takeaway containers reviewed for packing and delivery planning",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Define what starts the lead time.",
        paragraphs: [
          "Ask whether timing begins after order confirmation, payment, final specification, artwork approval, sample approval or another milestone. Record the event in the quotation.",
          "A quoted duration without a starting point is difficult to compare and can hide approval time.",
        ],
        checklist: ["Specification approval", "Artwork status", "Sample status", "Order milestone", "Shipment-ready definition"],
        links: [{ label: "Build the full RFQ", href: "/guides/food-packaging-rfq-checklist/" }],
      },
      {
        heading: "Separate the project milestones.",
        paragraphs: [
          "List sample preparation, sample delivery, artwork review, production, inspection, shipment readiness and transport separately. Identify which depend on buyer feedback.",
          "Timing remains provisional until the model, quantity, customization and packing are agreed.",
        ],
        links: [{ label: "Plan sample approvals", href: "/guides/takeaway-container-samples-prototyping/" }],
      },
      {
        heading: "Request packing data by model.",
        paragraphs: [
          "Ask for pieces per inner pack, packs per case, total pieces, carton dimensions and gross weight for each base, lid and accessory. Note whether dimensions are confirmed or provisional.",
          "Use the same unit basis across supplier comparisons and convert order quantities to complete cases.",
        ],
        links: [{ label: "Compare container models", href: "/products/takeaway-boxes-containers/" }],
      },
      {
        heading: "Plan matched components together.",
        paragraphs: [
          "Compare case quantities for bases and separate lids so the planned order creates usable matched sets. Include any sleeves, labels or inserts that follow different pack units.",
          "An order total can look balanced while leaving component-level overage or shortage.",
        ],
      },
      {
        heading: "Build loading estimates from confirmed cartons.",
        paragraphs: [
          "Provide the intended assortment and use confirmed carton dimensions and gross weights to prepare a loading estimate. Mark allowance, palletization and transport assumptions clearly.",
          "A generic container count is not a reliable loading promise because nesting and case geometry vary by model.",
        ],
        links: [{ label: "Review restaurant-chain planning", href: "/solutions/restaurant-chain-takeaway-packaging/" }],
      },
      {
        heading: "Reconfirm before shipment planning.",
        paragraphs: [
          "Before order release, confirm model quantities, packing, carton data, artwork, sample status, production milestone and delivery terms in writing. Update the estimate if any of those inputs change.",
          "Keep planned transport time separate from production lead time and use the agreed shipping basis.",
        ],
        links: [{ label: "Review MOQ and case rounding", href: "/guides/takeaway-container-moq/" }, { label: "Discuss the project", href: "/contact/" }],
      },
    ],
    questions: [
      { question: "What is the production lead time for takeaway containers?", answer: "It is confirmed for the selected model, quantity, customization, approval status and packing. Ask for the starting event and shipment-ready milestone in writing." },
      { question: "Can container loading be estimated from piece count?", answer: "Not reliably. Use confirmed pack quantities, carton dimensions, gross weights and the actual model assortment, with assumptions clearly stated." },
      { question: "Should bases and lids be ordered in the same number of cases?", answer: "Not necessarily. Compare pieces per case and order units for each component, then calculate the number of usable matched sets." },
    ],
    related: [
      { label: "Takeaway container MOQ guide", href: "/guides/takeaway-container-moq/" },
      { label: "Restaurant chain packaging plan", href: "/solutions/restaurant-chain-takeaway-packaging/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "how-to-verify-food-packaging-supplier",
    title: "How to verify a food packaging supplier before ordering",
    seoTitle: "How to Verify a Food Packaging Supplier",
    shortTitle: "Verify a packaging supplier",
    description: "Verify a food-packaging supplier by checking legal identity, product scope, model specifications, document relevance, samples and written commercial terms.",
    lede: "Supplier verification is not a badge hunt. A useful review connects the legal entity, product scope, exact model, supporting records, sample evidence and commercial commitment so each claim can be checked against the proposed order.",
    image,
    imageAlt: "Food packaging formats used for supplier and model verification planning",
    imageWidth,
    imageHeight,
    published,
    updated,
    sections: [
      {
        heading: "Confirm the contracting identity.",
        paragraphs: [
          "Ask for the legal company name, business address, quotation identity and the entity that will receive payment and issue commercial documents. Resolve unexplained differences before proceeding.",
          "A website name or email signature alone does not establish the full contracting relationship.",
        ],
        checklist: ["Legal company name", "Business address", "Quotation entity", "Payment entity", "Commercial document issuer"],
        links: [{ label: "About ANWELLUP", href: "/about/" }],
      },
      {
        heading: "Clarify product and production scope.",
        paragraphs: [
          "Ask which activities are performed directly, which involve production partners and who controls specification, sampling, quality records and shipment coordination. Review the answer for the exact product family.",
          "Do not assume one facility image or broad company description covers every item in a mixed catalogue.",
        ],
        links: [{ label: "Review manufacturing scope", href: "/manufacturing/" }],
      },
      {
        heading: "Verify the exact model record.",
        paragraphs: [
          "Request model or SKU, material, dimensions, weight where applicable, matched components, packing and intended-use conditions. Mark fields that are pending instead of treating catalogue references as final.",
          "For substitutions, compare the written specification rather than photographs alone.",
        ],
        links: [{ label: "Browse the product range", href: "/products/" }],
      },
      {
        heading: "Check document relevance, not just existence.",
        paragraphs: [
          "Review whether a declaration or report identifies the exact product or material, relevant scope, issuing body, test basis and validity period. Name the destination market and intended use in the request.",
          "A document for a related product should not be presented as evidence for the selected model without a supported connection.",
        ],
        links: [{ label: "Review quality and document handling", href: "/quality-compliance/" }],
      },
      {
        heading: "Use samples to answer defined questions.",
        paragraphs: [
          "Request a representative or custom sample with a written description of what it proves. Test fit, handling and service conditions using the intended application, then record the model and result.",
          "A sample does not replace document review or confirm all production and commercial conditions.",
        ],
        links: [{ label: "Plan container samples", href: "/guides/takeaway-container-samples-prototyping/" }],
      },
      {
        heading: "Put commercial commitments in writing.",
        paragraphs: [
          "Confirm specification, quantity, MOQ basis, price, packing, artwork, sample status, documents, timing, delivery term and payment details in one written record. Identify exceptions and provisional items.",
          "Escalate inconsistent identities, unsupported claims, unexplained payment changes or pressure to bypass the agreed review process.",
        ],
        links: [{ label: "Use the complete RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }, { label: "Prepare the container project", href: "/solutions/custom-takeaway-containers/" }],
      },
    ],
    questions: [
      { question: "Does a certificate verify the entire supplier catalogue?", answer: "No. Review the named product or material, scope, issuer, test basis and validity, and confirm how it connects to the exact model." },
      { question: "Is a factory photograph enough to verify production?", answer: "No. Clarify legal identity, facility relationship, product scope, process responsibility and the records available for the proposed order." },
      { question: "What should be confirmed before payment?", answer: "Confirm the contracting and payment identity, final specification, quantity, commercial terms, packing, approvals, documents, timing and delivery basis in writing." },
    ],
    related: [
      { label: "About ANWELLUP and content method", href: "/about/" },
      { label: "Quality and document handling", href: "/quality-compliance/" },
      { label: "Food packaging RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
];
