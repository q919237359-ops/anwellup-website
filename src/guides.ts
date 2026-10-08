import { containerClusterGuides } from "./container-guides";
import { productFamilies } from "./catalog";
import { cupClusterGuides } from "./cup-guides";
import { cutleryClusterGuides } from "./cutlery-guides";
import { categoryProcurementGuides } from "./category-procurement-guides";
import { plasticAlternativesGuide } from "./plastic-alternatives-guide";

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
  imageCaption?: string;
  imageSrcSet?: string;
  published: string;
  updated: string;
  sources?: Array<{ label: string; href: string }>;
  comparison?: { caption: string; columns: string[]; rows: string[][] };
  sections: Array<{
    heading: string;
    paragraphs: string[];
    checklist?: string[];
    evidence?: Array<{ label: string; value: string; href?: string }>;
    links?: Array<{ label: string; href: string }>;
  }>;
  questions: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string }>;
};

export const buyingGuides: BuyingGuide[] = [
  plasticAlternativesGuide,
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
        links: [
          { label: "Download the editable Excel RFQ template", href: "/resources/food-packaging-rfq-template/" },
          { label: "Calculate carton CBM", href: "/resources/carton-cbm-calculator/" },
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
      { label: "Download the Excel RFQ template", href: "/resources/food-packaging-rfq-template/" },
      { label: "Calculate carton CBM", href: "/resources/carton-cbm-calculator/" },
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
  {
    slug: "food-packaging-materials-comparison",
    title: "Food packaging materials comparison for wholesale buyers",
    seoTitle: "Food Packaging Material Comparison",
    shortTitle: "Compare packaging material families",
    description: "Compare paper, molded fiber, PP, PET, aluminium and laminated food-packaging formats by application, evidence, closure and sourcing requirements.",
    lede: "There is no single best food-packaging material. The useful choice is the material and construction that match the food, filling process, holding time, transport, destination and evidence required for one specific project.",
    image: "/assets/generated/cinematic/fiber-macro-regenerative.webp",
    imageAlt: "Close view of molded fiber food-packaging material and surface texture",
    imageWidth: 1672,
    imageHeight: 941,
    published: "2026-09-07",
    updated: "2026-09-07",
    sections: [
      {
        heading: "Which requirement should lead the comparison?",
        paragraphs: [
          "Start with the packed product and its journey, not a material label. Record the food type, fill temperature, expected hold, transport orientation, storage, presentation and end-user handling before shortlisting a construction.",
          "Separate required performance from preferred appearance. A natural colour, clear wall or metallic finish may support the presentation, but it does not by itself establish barrier, strength, temperature or end-of-life performance.",
        ],
        checklist: ["Food and portion", "Fill and holding conditions", "Closure or lidding method", "Transport and storage", "Destination-market evidence"],
        links: [{ label: "Choose a takeaway container format", href: "/guides/takeaway-container-sourcing-guide/" }],
      },
      {
        heading: "When do paper and kraft formats fit the brief?",
        paragraphs: [
          "Paper and kraft formats cover cups, folded cartons, bowls, wraps and presentation components. Buyers should identify the full construction, including any coating, lining, window, adhesive or laminate, rather than treating paper as a single material.",
          "Ask how the exact model is intended to be filled, closed and stored. Grease, moisture and holding conditions can change the review, and a broad paper-category statement should not replace model-specific information.",
        ],
      },
      {
        heading: "How should molded fiber be assessed?",
        paragraphs: [
          "Molded-fiber formats are commonly considered for plates, bowls, trays and hinged containers. Compare usable dimensions, wall geometry, closure design and the consistency needed for stacking and packing operations.",
          "If a compostability, recyclability or fiber-origin claim matters, define the destination and evidence required. Material appearance alone is not proof of a disposal outcome or a market-specific claim.",
        ],
        links: [{ label: "Compare plates, bowls and trays", href: "/products/plates-bowls-trays/" }],
      },
      {
        heading: "What distinguishes PP and PET formats?",
        paragraphs: [
          "PP and PET are different polymer families used across drinkware, clear presentation and container formats. Do not transfer one model's application statement to another product because both are described as plastic.",
          "Confirm the resin, wall construction, capacity, closure and intended service conditions for the exact model. For cup-and-lid or base-and-lid systems, record both component references in samples and quotations.",
        ],
        links: [{ label: "Compare cups and drinkware", href: "/products/cups-drinkware/" }],
      },
      {
        heading: "Where does aluminium enter the decision?",
        paragraphs: [
          "Aluminium ranges include containers, trays, rolls and pre-cut sheets. The sourcing brief should identify whether the requirement concerns forming, wrapping, baking, presentation or a matched lidding system.",
          "Thickness, dimensions, rim or closure geometry and pack configuration are model-level inputs. Request written confirmation for the intended application instead of relying on the general properties associated with aluminium.",
        ],
      },
      {
        heading: "How can buyers compare environmental claims responsibly?",
        paragraphs: [
          "Write the exact claim the project needs and the market where it will appear. Then ask which documents apply to the selected material and model, who issued them, what they cover and whether they remain current.",
          "Keep commercial comparison separate from claim verification. Price, packing and availability may be compared in one table, while environmental or food-contact statements should be checked against their own supporting records.",
        ],
        links: [{ label: "Review quality and document handling", href: "/quality-compliance/" }],
      },
    ],
    questions: [
      { question: "What is the best material for takeaway food packaging?", answer: "There is no universal best material. The answer depends on the exact food, portion, fill and holding conditions, closure, transport, destination and evidence required." },
      { question: "Can appearance confirm whether packaging is recyclable or compostable?", answer: "No. Appearance is not proof. Define the intended claim and destination, then review model-specific construction and supporting documentation." },
      { question: "Should lids be included in the material comparison?", answer: "Yes. Treat the base and closure as a system and record both references, materials, packing and compatibility in the comparison." },
    ],
    related: [
      { label: "Compare the full product range", href: "/products/" },
      { label: "Review quality and product documents", href: "/quality-compliance/" },
      { label: "Build a complete packaging RFQ", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "food-container-size-guide",
    title: "Food container sizes for takeaway and deli packaging",
    seoTitle: "Food Container Sizes: Takeaway & Deli Size Guide",
    shortTitle: "Compare takeaway and deli container sizes",
    description: "Compare takeaway and deli food container sizes using PP catalogue dimensions, nominal oz labels, usable fill, lid matching and case-pack checks.",
    lede: "Choose a food container by the portion it must hold, the headspace needed to close it and the dimensions of the complete pack. For takeaway and deli buying, use the nominal oz size to shortlist a format, then confirm usable fill, the matching lid and case pack for the exact SKU. Start with the PP deli sizes in the catalogue comparison below.",
    image: "/images/seo/container-size-measurements-1440.webp",
    imageAlt: "Diagram showing rim diameter, base diameter and body height beside a container with planned fill and headspace.",
    imageWidth: 1440,
    imageHeight: 960,
    imageCaption: "Measurement illustration, not to scale or an engineering drawing for a particular SKU. Confirm measurement points, usable fill and lid fit with the selected model's drawing and sample.",
    imageSrcSet: "/images/seo/container-size-measurements-640.webp 640w, /images/seo/container-size-measurements-960.webp 960w, /images/seo/container-size-measurements-1440.webp 1440w",
    published: "2026-09-07",
    updated: "2026-10-08",
    sources: [{ label: "ANWELLUP PP injection deli container catalogue", href: "/products/takeaway-boxes-containers/pp-deli-containers/" }],
    comparison: {
      caption: "PP deli container sizes from the current ANWELLUP catalogue. Listed dimensions are reference values; measurement points, usable capacity and packing must be confirmed for the selected SKU.",
      columns: ["Nominal size label", "Listed dimensions", "Case pack", "AW SKU"],
      rows: (productFamilies.find((family) => family.id === "pp-deli-containers")?.variants ?? []).map((variant) => [
        variant.label,
        variant.dimensions || "Confirm dimensions",
        variant.pack || "Confirm case pack",
        variant.sku,
      ]),
    },
    sections: [
      {
        heading: "Which PP deli food container sizes are listed?",
        paragraphs: [
          "The comparison lists each PP deli SKU with its nominal size label and catalogue dimensions. Use the table to compare the available body formats, then open the product family to shortlist the exact model. These catalogue references do not establish internal dimensions, fill-line capacity or lid interchangeability.",
          "Where the catalogue does not publish a case pack, the table says 'Confirm case pack'. Request pieces per inner pack, packs per case and whether a quoted unit includes a lid before comparing order quantities or prices.",
        ],
        links: [{ label: "Review PP deli container models and specifications", href: "/products/takeaway-boxes-containers/pp-deli-containers/" }],
      },
      {
        heading: "How should buyers compare oz and mL?",
        paragraphs: [
          "The oz entries in this table are the catalogue's nominal size labels. If your portion requirement is specified in millilitres, state that mL requirement separately and ask for the selected model's measured capacity. Do not present an arithmetic conversion of the size label as verified product capacity.",
          "Ask which unit convention and capacity basis the supplier uses, including whether the figure describes brimful volume or an intended fill level. Usable fill also depends on food shape and required headspace. Volume in mL does not by itself establish the weight of a portion.",
        ],
        checklist: ["Catalogue size label and AW SKU", "Required portion volume in mL, if used", "Capacity basis and measurement method", "Food shape or portion weight where relevant", "Headspace and closed-pack fit"],
      },
      {
        heading: "Which measurements belong in a container brief?",
        paragraphs: [
          "State the nominal capacity when it is relevant, then add the dimensions that control product fit. For a rectangular or oval container these may include top length and width, base dimensions and height; for a round format, rim diameter, base diameter and height may matter.",
          "Clarify whether measurements are internal or external and whether they refer to the body alone or the pack with its lid fitted. The illustration shows measurement concepts only. Request a model-specific drawing or measured sample to establish the actual measurement points and tolerances.",
        ],
        checklist: ["Nominal capacity", "Top or rim dimensions", "Base dimensions", "Overall height", "Internal usable space", "Closed-pack dimensions"],
        links: [{ label: "Compare takeaway container families", href: "/products/takeaway-boxes-containers/" }],
      },
      {
        heading: "Which size will fit a takeaway portion?",
        paragraphs: [
          "Two containers with a similar stated capacity can distribute volume differently. A broad, shallow tray and a narrow, deep bowl may behave differently for presentation, portioning, stacking and access even when their nominal volumes appear close.",
          "Use the actual portion and packing method to check fit. Leave the headspace needed for closing, garnish, movement in transport or the selected lid profile. A nominal capacity label cannot establish that fill line or prove suitability for the intended food and service conditions.",
        ],
      },
      {
        heading: "How should compartments be specified?",
        paragraphs: [
          "For divided trays, list the number of compartments and the portion assigned to each one. Add any food-separation requirement and confirm whether divider height continues to the lid or leaves a shared headspace.",
          "A compartment count alone does not show the usable geometry. Review the actual layout with the intended meal, including sauces, side dishes and items that should remain visually separated.",
        ],
        links: [{ label: "Review plates, bowls and tray formats", href: "/products/plates-bowls-trays/" }],
      },
      {
        heading: "What must be recorded about the lid?",
        paragraphs: [
          "Identify whether the container uses an integrated hinge, folded closure, separate lid or lidding film review. For a separate lid, record its reference alongside the base and confirm whether it changes the overall closed height.",
          "Check closing method, opening experience, stacking and transport orientation with the actual components. Visual similarity or a shared rim measurement should not be treated as compatibility confirmation.",
        ],
      },
      {
        heading: "How does size affect packing and freight?",
        paragraphs: [
          "External dimensions and nesting geometry can change inner-pack length, case size and storage requirements. Ask for pieces per pack, packs per case, case dimensions and gross weight for each shortlisted model; confirm whether lids are packed separately or included in the count.",
          "Compare logistics on the same unit basis. A piece price without pack and case information cannot show the full warehouse or freight implication of the format.",
        ],
        links: [{ label: "Prepare the full RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }],
      },
      {
        heading: "What should a size sample test include?",
        paragraphs: [
          "Fill the exact sample with the intended portion using the real packing method. Close it, hold it for the expected interval, stack it as planned and run the normal transport routine before recording the result.",
          "Keep the AW SKU, body and lid references, portion volume or weight, headspace and observations together. Confirm specification, intended-use suitability, packing, documents and commercial terms in writing before ordering.",
        ],
        links: [{ label: "Review customization after format selection", href: "/capabilities/" }],
      },
    ],
    questions: [
      { question: "What PP deli container sizes are listed?", answer: `The current ANWELLUP PP deli catalogue lists ${(productFamilies.find((family) => family.id === "pp-deli-containers")?.variants ?? []).map((variant) => variant.label).join(", ")}. Compare the listed dimensions and confirm usable fill, lid pairing and case pack for the selected AW SKU.` },
      { question: "Can I convert a container's oz label directly into its usable capacity in mL?", answer: "Treat the oz entry as a nominal catalogue size label. State your required mL fill separately and ask for the model's capacity basis, unit convention and measured fill level; a calculated conversion does not verify usable product capacity." },
      { question: "Can two containers with the same capacity be substituted?", answer: "Not automatically. Shape, usable space, wall geometry, closure, packing and service conditions can differ and should be reviewed by model." },
      { question: "How should a matched lid be requested?", answer: "List the base and lid references together and ask for compatibility, material, pack quantity and closed dimensions to be confirmed." },
      { question: "Do the listed PP deli sizes share a lid?", answer: "A common listed diameter does not confirm lid compatibility. Request the matching lid reference for each body SKU and check closure and stacking with the actual components." },
      { question: "How many PP deli containers come in a case?", answer: "Check the case-pack field for the selected body SKU. Where the table says 'Confirm case pack', ask for the count, inner-pack arrangement and whether lids are included or packed separately before requesting a quote." },
    ],
    related: [
      { label: "Compare PP deli container sizes by SKU", href: "/products/takeaway-boxes-containers/pp-deli-containers/" },
      { label: "Compare takeaway boxes and containers", href: "/products/takeaway-boxes-containers/" },
      { label: "Choose a takeaway container format", href: "/guides/takeaway-container-sourcing-guide/" },
      { label: "Build a complete packaging RFQ", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "custom-food-packaging-printing-guide",
    title: "Printing on food and ready-meal packaging: a buyer's guide",
    seoTitle: "Food & Ready-Meal Packaging Printing Guide",
    shortTitle: "Prepare artwork and print requirements",
    description: "Compare direct printing, sleeves, labels and lidding for food and ready-meal packaging. Specify print surfaces, artwork, proofs and approval before a quote.",
    lede: "Printing on ready-meal packaging can mean decorating the container, a separate sleeve, an exterior label or a lidding component. First identify the exact component and its material, then confirm the printable area, process and approval sample. A print option for one component does not establish suitability for the complete food pack.",
    image: "/images/seo/food-packaging-print-surfaces-1440.webp",
    imageAlt: "AI illustration of a paper cup, cup sleeve, carton and label sheet with exterior print areas highlighted",
    imageWidth: 1440,
    imageHeight: 960,
    imageCaption: "AI-generated illustration of example exterior print surfaces. Confirm artwork placement, printable areas and construction for the selected item; this is not a production proof.",
    imageSrcSet: "/images/seo/food-packaging-print-surfaces-640.webp 640w, /images/seo/food-packaging-print-surfaces-960.webp 960w, /images/seo/food-packaging-print-surfaces-1440.webp 1440w",
    published: "2026-09-07",
    updated: "2026-10-08",
    comparison: {
      caption: "Choose the component to decorate before requesting a print quotation",
      columns: ["Branding route", "Brief to provide", "Approval to request"],
      rows: [
        ["Direct printing on the container", "Exact base SKU, material, exterior surface, colours and coverage", "Model-specific print-area drawing, process and production sample"],
        ["Separate paper sleeve or carton", "Closed pack dimensions, sleeve fit, folds, seams and artwork", "Dieline plus an assembled sample around the intended pack"],
        ["Exterior adhesive label", "Label size, position, substrate and filling/storage conditions", "Adhesion and readability review on the actual container"],
        ["Printed lid or lidding component", "Exact base/closure pairing, opening method and artwork orientation", "Compatibility and decoration reviewed as separate approval points"],
      ],
    },
    sections: [
      {
        heading: "Which print surface suits a ready-meal pack?",
        paragraphs: [
          "For a ready-meal project, mark the base, lid or film, sleeve and label separately on a reference drawing. State which surface carries the brand, product information and barcode. Ask which decoration routes are available for that exact construction rather than assuming every tray can be directly printed.",
          "Include filling, storage, condensation, transport and any intended reheating conditions in the brief. Request the relevant product and decoration evidence for those conditions. A graphic mockup confirms neither food-contact suitability nor oven or microwave performance.",
        ],
        evidence: [
          { label: "Container formats", value: "Compare smoothwall, wrinkle-wall and other listed ranges", href: "/products/takeaway-boxes-containers/" },
          { label: "Retail brief", value: "Define pack, presentation and labelling components", href: "/solutions/prepared-food-retail-packaging/" },
          { label: "Sample record", value: "Keep model, artwork version, conditions and result together", href: "/guides/takeaway-container-samples-prototyping/" },
        ],
      },
      {
        heading: "What should be confirmed before artwork starts?",
        paragraphs: [
          "Select the product family, model, size, material and colour before building final artwork. A dieline or print-area file should relate to that exact construction, not a visually similar reference found elsewhere.",
          "Record any matching lid, sleeve, wrapper or bag component that carries branding. If the project includes several sizes, identify which elements remain common and which require separate artwork.",
        ],
        checklist: ["Base-product model", "Material and product colour", "Print area or dieline", "Matching branded components", "Number of sizes or artwork versions"],
        links: [{ label: "Review customization capabilities", href: "/capabilities/" }],
      },
      {
        heading: "Which artwork information belongs in the RFQ?",
        paragraphs: [
          "State whether artwork is final, in development or not yet available. Include the number of colours, printed sides, approximate coverage and any variable information such as barcodes, size marks or destination-specific text.",
          "Ask which file types, font treatment, linked images and colour references are required. Keep editable source artwork under version control so the approved file can be identified later.",
        ],
        links: [{ label: "Build the complete RFQ", href: "/guides/food-packaging-rfq-checklist/" }],
      },
      {
        heading: "How should colour expectations be communicated?",
        paragraphs: [
          "Provide a named colour reference when colour consistency matters and identify any approved physical sample. Screen previews are useful for discussion but should not be treated as an exact representation across devices, substrates and print processes.",
          "Ask the supplier to explain the available proof or sample route for the selected project. Record what the approval confirms and what variation may still arise from material, process or production conditions.",
        ],
      },
      {
        heading: "What belongs in the proofing and approval record?",
        paragraphs: [
          "Check spelling, regulatory text supplied by the buyer, barcode data, orientation, repeat, print position and the relationship between artwork and seams, folds or closures. Assign one authorized approver and keep the final approval date and file version.",
          "A visual proof and a physical product sample answer different questions. State whether the project needs layout approval, colour review, construction review or a production-representative sample before order release.",
        ],
        links: [{ label: "Review document and claim handling", href: "/quality-compliance/" }],
      },
      {
        heading: "How can branding affect packing and assortment?",
        paragraphs: [
          "Confirm whether different designs, languages or sizes will be packed separately or combined. Identify inner-pack presentation, barcode position, carton marks and any rule for keeping artwork versions separated in storage.",
          "For multi-SKU programs, request quantities and case information by design and model. A single total can hide the production and logistics implications of several print versions.",
        ],
      },
      {
        heading: "Which commercial terms must be reconfirmed?",
        paragraphs: [
          "Ask for MOQ, price, setup or tooling items, sampling route, lead time and packing to be quoted for the approved base product and artwork scope. These values are project-specific and should not be inferred from another design or unprinted item.",
          "Before production, place the product specification, final artwork, proof approval, packing requirement, destination and agreed commercial terms in one written record.",
        ],
        links: [{ label: "Understand MOQ inputs", href: "/guides/food-packaging-moq-guide/" }],
      },
    ],
    questions: [
      { question: "Can ready-meal packaging be printed directly?", answer: "That must be confirmed for the exact container material and construction. A separate sleeve, exterior label or decorated closure can also be reviewed. Identify each component, printable area and intended service conditions in the enquiry." },
      { question: "Can final artwork be prepared before the packaging model is selected?", answer: "Concept work can begin, but final artwork should use the print area or dieline for the exact selected model and construction." },
      { question: "Does a screen proof guarantee the printed colour?", answer: "No. Screen appearance varies, and the material and print process also matter. Agree the appropriate colour reference and approval route for the project." },
      { question: "What should a final print approval identify?", answer: "It should identify the product model, artwork file and version, colours, print position, required text, approver and approval date." },
    ],
    related: [
      { label: "Review customization capabilities", href: "/capabilities/" },
      { label: "Compare the packaging range", href: "/products/" },
      { label: "Build a complete packaging RFQ", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  {
    slug: "food-packaging-moq-guide",
    title: "Food packaging MOQ guide for wholesale and custom orders",
    seoTitle: "Food Packaging MOQ Guide",
    shortTitle: "Compare minimum order requirements",
    description: "Understand which product, print, packing, assortment and production inputs affect a food-packaging MOQ and how to compare supplier quotations fairly.",
    lede: "A food-packaging MOQ is not one universal number. It belongs to an exact model, material, colour, artwork version, pack configuration and production route, so buyers should request the basis behind the quantity.",
    image: "/assets/generated/scenes/category-paper-kraft.webp",
    imageAlt: "Paper cups, bowls, containers and trays arranged for wholesale order planning",
    imageWidth: 1600,
    imageHeight: 800,
    published: "2026-09-07",
    updated: "2026-09-07",
    sections: [
      {
        heading: "What does MOQ mean in a packaging quotation?",
        paragraphs: [
          "MOQ is the minimum quantity a supplier is prepared to quote or produce under a defined set of conditions. The unit may be pieces, packs, cases, a production batch or another commercial basis, so the quotation should name the unit explicitly.",
          "Ask whether the stated MOQ applies to one model, one size, one colour and one artwork version. A total across an assortment is not automatically interchangeable with the minimum for each component.",
        ],
        checklist: ["MOQ unit", "Model and size", "Material and colour", "Artwork version", "Pack configuration", "Destination and delivery basis"],
        links: [{ label: "Use the RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }],
      },
      {
        heading: "Why can standard and custom items differ?",
        paragraphs: [
          "A standard item may follow an existing model, colour and packing route, while a custom project can introduce artwork, material, print, wrapper or carton requirements. Each additional variable can change how the order is scheduled and quoted.",
          "Do not assume that removing a logo automatically creates the same commercial basis as a listed stock item. Ask the supplier to identify what is standard, what is project-specific and what remains subject to confirmation.",
        ],
        links: [{ label: "Prepare a custom printing brief", href: "/guides/custom-food-packaging-printing-guide/" }],
      },
      {
        heading: "How do multiple SKUs change the comparison?",
        paragraphs: [
          "Break the requirement down by product family, model, size, colour and artwork. Request the MOQ and quoted quantity for every line instead of presenting only a combined annual estimate.",
          "If several components form a system, such as a cup and lid or container and cover, compare their order units and case packs together. Different minimums can leave unmatched inventory if they are planned independently.",
        ],
        links: [{ label: "Define container sizes and components", href: "/guides/food-container-size-guide/" }],
      },
      {
        heading: "Which packing details can affect the order basis?",
        paragraphs: [
          "Inner bags, sleeves, wrappers, kit assembly, assortment, barcode labels and carton marks can be part of the commercial specification. State them before asking for the final MOQ rather than adding them after price comparison.",
          "Convert the proposed quantity into complete packs and cases. This exposes rounding, warehouse volume and whether bases, lids or accessories arrive in compatible quantities.",
        ],
      },
      {
        heading: "How should buyers compare price breaks?",
        paragraphs: [
          "Request quotations at realistic order quantities and keep the specification constant across each comparison. Record the currency, trade term, packing, tooling or setup items, sample route and validity alongside the unit price.",
          "A lower unit price at a larger quantity is not automatically the lower-risk decision. Compare cash commitment, storage, expected consumption, artwork-change risk and the cost of unmatched components using your own operating data.",
        ],
        links: [{ label: "Compare the current product range", href: "/products/" }],
      },
      {
        heading: "What should be confirmed before order release?",
        paragraphs: [
          "Confirm the final quantity by model, the MOQ basis, price, packing, approved artwork, sample status, documents, production timing and delivery terms in writing. Identify any figure that remains provisional.",
          "If forecast volume is being used to discuss future pricing, keep the forecast separate from the committed order. This makes the commercial comparison clearer for both parties.",
        ],
        links: [{ label: "Send the selected brief to ANWELLUP", href: "/contact/" }],
      },
    ],
    questions: [
      { question: "What is ANWELLUP's minimum order quantity?", answer: "MOQ is confirmed for the selected model, material, customization, packing and destination. Send those inputs so the applicable quantity can be quoted in writing." },
      { question: "Can different sizes be combined to reach an MOQ?", answer: "Do not assume they can. Ask whether the MOQ applies per model, size, colour or artwork and request the assortment basis in the quotation." },
      { question: "Should MOQ be compared in pieces or cases?", answer: "Record both when possible. The commercial unit may be pieces, but complete case quantities reveal rounding, storage and component-matching requirements." },
    ],
    related: [
      { label: "Compare the complete product range", href: "/products/" },
      { label: "Prepare a custom print brief", href: "/guides/custom-food-packaging-printing-guide/" },
      { label: "Build a complete packaging RFQ", href: "/guides/food-packaging-rfq-checklist/" },
    ],
  },
  ...cutleryClusterGuides,
  ...cupClusterGuides,
  ...containerClusterGuides,
  ...categoryProcurementGuides,
];

export const getBuyingGuide = (slug: string) => buyingGuides.find((guide) => guide.slug === slug);

export const priorityBuyingGuides = [
  "food-packaging-rfq-checklist",
  "aluminium-foil-food-wrap-sourcing-guide",
  "takeaway-container-sourcing-guide",
].flatMap(slug => {
  const guide = getBuyingGuide(slug);
  return guide ? [guide] : [];
});
