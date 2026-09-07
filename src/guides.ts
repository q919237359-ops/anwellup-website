export type BuyingGuide = {
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
  published: string;
  updated: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    checklist?: string[];
  }>;
  questions: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string }>;
};

export const buyingGuides: BuyingGuide[] = [
  {
    slug: "food-packaging-rfq-checklist",
    title: "Food packaging RFQ checklist for wholesale buyers",
    seoTitle: "Food Packaging RFQ Checklist",
    shortTitle: "Build a clearer packaging RFQ",
    description: "Use this food packaging RFQ checklist to organize product, application, customization, quantity, documents and delivery before requesting a quote.",
    lede: "A useful request for quotation does more than name a product. It gives the supplier enough context to identify the right model, expose unanswered questions and compare commercial terms on the same basis.",
    image: "/assets/generated/cinematic/hero-regenerative-cinema.webp",
    imageAlt: "Food packaging arranged on sculptural material platforms",
    imageWidth: 1672,
    imageHeight: 941,
    published: "2026-09-07",
    updated: "2026-09-07",
    sections: [
      {
        heading: "Identify the exact format first.",
        paragraphs: [
          "Begin with the product family and the closest available model or AW SKU. If no model has been selected, describe the format in plain language: cup, hinged container, bowl, tray, cutlery kit, carry bag or glove.",
          "Add the dimensions, capacity, material and matching components you already know. A reference photograph can help communicate shape, but it should not replace measurements or a written specification.",
        ],
        checklist: ["Product family or AW SKU", "Target dimensions or capacity", "Preferred material", "Lid, insert or matching component", "Colour or surface finish"],
      },
      {
        heading: "Describe the real application.",
        paragraphs: [
          "Tell the supplier what the packaging will hold, how it will be filled and how long it must travel or remain in service. The same-looking format may be evaluated differently for a cold drink, a hot prepared meal, a dry bakery item or a retail display.",
          "Include filling, holding, transport, storage and end-user conditions that could affect the material or closure. Ask for suitability to be confirmed for the exact model rather than relying on a broad category claim.",
        ],
      },
      {
        heading: "Separate customization from the base product.",
        paragraphs: [
          "List the base-product requirement first, then describe artwork, printing, sleeves, labels, embossing, bag colour or wrapper configuration. This makes it easier to distinguish a standard reference from a custom production brief.",
          "Provide the number of print colours, print sides, coverage, artwork format and any colour reference available. If artwork is not ready, say which brand elements are still being developed.",
        ],
        checklist: ["Print method to be reviewed", "Number of colours and printed sides", "Artwork file status", "Inner-pack presentation", "Carton mark and barcode needs"],
      },
      {
        heading: "State quantity in a comparable way.",
        paragraphs: [
          "Give an estimated quantity per order and, when useful, an annual volume. Clarify whether the number refers to individual pieces, packs, cases or complete kits. For assortments, break the total down by model, size or colour.",
          "MOQ, price and lead time depend on the selected specification and project conditions. Request each of them in writing instead of assuming that one figure applies across a whole category.",
        ],
      },
      {
        heading: "Name the destination and document request.",
        paragraphs: [
          "Include the destination country or region, sales channel and intended use. Ask which model-specific declarations, test reports or other supporting records are available for review.",
          "A document should be checked for the exact product, material, issuing body, scope and validity period. A supplier name or a similar product image is not a substitute for that review.",
        ],
      },
      {
        heading: "Finish with timing and delivery context.",
        paragraphs: [
          "Share the target delivery date, destination port or address, preferred shipping term and whether the order will be consolidated with other products. If timing is fixed, identify the date by which samples, artwork and specifications must be approved.",
          "A complete RFQ will not remove every follow-up question, but it creates a clear record of what has been requested and what still needs confirmation.",
        ],
      },
    ],
    questions: [
      { question: "Can I request a quote without a final SKU?", answer: "Yes. Describe the closest format, application, dimensions, material, quantity and destination. The next step is to identify and confirm the appropriate model." },
      { question: "Should I send an annual quantity or one-order quantity?", answer: "Send both when available and label each clearly. Pricing, packing and production planning should still be confirmed for the actual order quantity." },
      { question: "Which details should never be assumed?", answer: "Do not assume final specifications, intended-use suitability, documentation, MOQ, price, availability or lead time. Confirm them in writing for the selected model." },
    ],
    related: [
      { label: "Browse the complete product range", href: "/products/" },
      { label: "Review customization capabilities", href: "/capabilities/" },
      { label: "Discuss quality and documents", href: "/quality-compliance/" },
    ],
  },
  {
    slug: "disposable-cup-sourcing-guide",
    title: "Disposable cup sourcing guide for wholesale programs",
    seoTitle: "Wholesale Disposable Cup Sourcing Guide",
    shortTitle: "Specify a disposable cup program",
    description: "A practical sourcing guide for comparing disposable cup material, capacity, lid fit, printing, packing and documentation before a wholesale enquiry.",
    lede: "A cup is part of a system: beverage, rim, lid, decoration and case pack. Define those parts together to avoid comparing products that only look equivalent in a catalogue.",
    image: "/assets/catalog/2026-09-r1/cups-drinkware-v1.webp",
    imageAlt: "Paper, kraft, PP and PET cups arranged for range comparison",
    imageWidth: 1448,
    imageHeight: 1086,
    published: "2026-09-07",
    updated: "2026-09-07",
    sections: [
      {
        heading: "Begin with the beverage and service journey.",
        paragraphs: [
          "State whether the cup is intended for a hot drink, cold drink, milk tea, delivery, event service or prepared retail display. Include the expected serving temperature and how long the filled cup is likely to be carried or stored.",
          "These conditions belong in the brief even when a familiar cup size has already been selected. Intended use should be confirmed for the exact material and model.",
        ],
      },
      {
        heading: "Compare material in context.",
        paragraphs: [
          "The ANWELLUP range groups paper and kraft cups with PP and PET drinkware. Each family has different model references, dimensions and packing fields, so the material name alone is not a complete specification.",
          "For a useful comparison, ask for the cup construction, wall format, colour or clarity, dimensions, weight where applicable and the matching-lid reference. Keep environmental or disposal claims separate unless the exact evidence and local collection context are available.",
        ],
        checklist: ["Beverage and serving temperature", "Paper, PP or PET family", "Single-wall or double-wall format where relevant", "Colour, clarity or surface requirement", "Required supporting documents"],
      },
      {
        heading: "Treat capacity and lid fit as model-specific.",
        paragraphs: [
          "Nominal volume helps narrow the range, but lid fit depends on the actual rim and model dimensions. Record the selected cup and lid as a matched pair and confirm whether the lid style suits the drinking and delivery format.",
          "If the program uses more than one cup size, identify which sizes are expected to share a lid and request that compatibility in writing.",
        ],
      },
      {
        heading: "Prepare the artwork brief.",
        paragraphs: [
          "For custom printed cups, provide the artwork status, number of colours, print coverage and the visual result you expect. Ask for the available decoration method and printable area for the exact cup construction.",
          "Colour references, barcodes and regulatory copy should be supplied as controlled artwork. Include who will approve the proof and whether a physical sample is required before production.",
        ],
      },
      {
        heading: "Check packing and operational fit.",
        paragraphs: [
          "A case pack affects storage, replenishment and freight calculations. Confirm pieces per sleeve, sleeves per case, case dimensions and gross weight when those details are needed for the buying decision.",
          "Ask how lids are packed and whether cups and lids will ship in the same order. For multi-SKU programs, provide the quantity by size rather than one combined total.",
        ],
      },
      {
        heading: "Use samples to verify the complete system.",
        paragraphs: [
          "A sample review should use the intended cup, matching lid and, where possible, the actual beverage and service routine. Record the model references tested so the commercial order can be tied back to the review.",
          "The final quotation should identify the models, specification, artwork scope, case pack, MOQ, price, lead time and document availability that apply to the program.",
        ],
      },
    ],
    questions: [
      { question: "Is cup capacity enough to identify a model?", answer: "No. Include the material, construction, dimensions and required lid because similar nominal capacities can belong to different cup systems." },
      { question: "What should I provide for a printed cup quote?", answer: "Provide the cup model or target specification, quantity by size, artwork, colour count, print coverage, destination and required packing." },
      { question: "Can one lid be assumed to fit several sizes?", answer: "Only when compatibility has been confirmed for those exact models. Record cup and lid references together in the RFQ and sample review." },
    ],
    related: [
      { label: "Compare cups and drinkware", href: "/products/cups-drinkware/" },
      { label: "Review customization capabilities", href: "/capabilities/" },
      { label: "Build a complete packaging RFQ", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "takeaway-container-sourcing-guide",
    title: "Takeaway food container sourcing guide",
    seoTitle: "Takeaway Food Container Sourcing Guide",
    shortTitle: "Choose a takeaway container format",
    description: "Compare takeaway food container format, material, closure, portion geometry, service conditions, packing and documents before a wholesale enquiry.",
    lede: "A takeaway container must be evaluated as part of the meal journey—from filling and closing to holding, transport and final service. Start with that journey before choosing the shape.",
    image: "/assets/catalog/2026-09-r1/takeaway-boxes-containers-v1.webp",
    imageAlt: "Takeaway food containers arranged for format comparison",
    imageWidth: 1448,
    imageHeight: 1086,
    published: "2026-09-07",
    updated: "2026-09-07",
    sections: [
      {
        heading: "Describe the food and portion geometry.",
        paragraphs: [
          "Name the meal or food type, portion volume and whether sauces, separate components or visible presentation are involved. Include the required internal dimensions when the fit of a specific product matters.",
          "A bowl, divided tray, hinged clamshell and folded carton solve different service problems. Choose the format after the portion and packing process are understood.",
        ],
        checklist: ["Food type and portion", "Target capacity or usable dimensions", "Number of compartments", "Presentation requirement", "Filled-product weight"],
      },
      {
        heading: "Map the complete service conditions.",
        paragraphs: [
          "Record filling temperature, expected holding time, transport orientation, storage and any reheating or chilling step. Ask for the selected model to be reviewed against those conditions.",
          "Avoid transferring a performance statement from one material or model to another. The exact construction, closure and intended-use evidence matter.",
        ],
      },
      {
        heading: "Compare material families without shortcuts.",
        paragraphs: [
          "The current range includes molded-fiber, kraft-paper, clear-plastic, PP and aluminium container families. These labels help organize a search, but buyers still need model-level dimensions, construction and use confirmation.",
          "If environmental positioning is part of the program, define the claim, destination market and evidence required. Material appearance alone does not establish recyclability, compostability or local collection outcomes.",
        ],
      },
      {
        heading: "Specify the closure and matching parts.",
        paragraphs: [
          "State whether the brief calls for an integrated hinge, folded closure, separate lid or another sealing review. For separate components, record the base and lid references together.",
          "Consider how the container will be filled, closed, stacked and opened. A visual fit should be followed by a model-specific sample and written confirmation.",
        ],
      },
      {
        heading: "Include packing and freight inputs.",
        paragraphs: [
          "Confirm pieces per sleeve or bag, packs per case and whether bases and lids are packed separately. Ask for case dimensions and weights when warehouse capacity or freight comparison depends on them.",
          "For a mixed program, list the order quantity by model. A combined piece count can hide important differences in case pack and loading volume.",
        ],
      },
      {
        heading: "Create a repeatable sample review.",
        paragraphs: [
          "Test the exact base and closure with the intended food, filling method, holding interval and transport routine. Record observations against the model references rather than a generic product name.",
          "Before ordering, confirm the specification, packing, artwork if any, documents, MOQ, price, availability and lead time in writing for the selected destination.",
        ],
      },
    ],
    questions: [
      { question: "Which information should start a container enquiry?", answer: "Start with the food, portion, temperature, holding and transport conditions, target format or dimensions, closure, quantity and destination." },
      { question: "Can material alone determine suitability?", answer: "No. Suitability depends on the exact model, construction, closure and intended conditions, supported by the appropriate review and documents." },
      { question: "Should lids and bases be quoted separately?", answer: "Ask the quotation to identify both references and their packing, even when they are supplied as a matched system." },
    ],
    related: [
      { label: "Compare takeaway boxes and containers", href: "/products/takeaway-boxes-containers/" },
      { label: "Compare plates, bowls and trays", href: "/products/plates-bowls-trays/" },
      { label: "Build a complete packaging RFQ", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
];

export const getBuyingGuide = (slug: string) => buyingGuides.find((guide) => guide.slug === slug);
