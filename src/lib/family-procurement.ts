export type FamilyProcurementContent = {
  seoTitle: string;
  description: string;
  heading: string;
  introduction: string;
  facts: Array<{ label: string; title: string; body: string }>;
  questions: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string; context: string }>;
};

const sharedCommercialFacts = [
  {
    label: "06 / MOQ",
    title: "Quote the minimum against one real order line",
    body: "MOQ is confirmed by model, size, colour, artwork version, packing and destination. State whether the requested quantity means pieces, sleeves or cases so the commercial basis remains comparable.",
  },
  {
    label: "07 / Approval",
    title: "Define what the sample must prove",
    body: "Record whether the sample is for dimensions, cup-and-lid fit, filled-service handling, artwork layout or production finish. Availability, cost, timing and sample status are confirmed after the exact format is selected.",
  },
  {
    label: "08 / Timing",
    title: "Tie lead time to an approval milestone",
    body: "Request separate timing for specification, artwork, sample, production and shipment readiness. A final production lead time can only be confirmed after the model, quantity, customization and packing are agreed.",
  },
];

export const familyProcurementContent: Record<string, FamilyProcurementContent> = {
  "paper-cups-single-wall": {
    seoTitle: "Single-Wall Paper Cups Wholesale",
    description: "Compare 8, 12, 16 and 22 oz single-wall paper cups, listed dimensions, paper weights and 1,000-piece case packs for a model-specific wholesale enquiry.",
    heading: "Specify a single-wall cup as a complete beverage system.",
    introduction: "The public range provides six matte, standard and kraft references. Use the model table as the starting record, then confirm the drink, matching lid, printing, samples and commercial terms for the actual program.",
    facts: [
      { label: "01 / Range", title: "Six listed cup references", body: "The current family covers 8, 12, 16 and 22 oz formats across matte, standard and kraft constructions. Select the AW SKU rather than quoting capacity alone." },
      { label: "02 / Construction", title: "Paper weight remains model-specific", body: "Listed constructions range from 260 to 300 gsm. Paper description and weight do not establish every performance or intended-use condition, so confirm the exact model with the beverage brief." },
      { label: "03 / Dimensions", title: "Record diameter and height together", body: "The table lists model dimensions from Ø80 × 95 mm to Ø89 × 160 mm. Use these values for comparison and confirm final tolerances before order release." },
      { label: "04 / Packing", title: "Listed models show 1,000 pieces per carton", body: "Use the current case entry for initial planning, then request inner-pack quantity, final carton dimensions and gross weight for the selected model and order." },
      { label: "05 / Customization", title: "Lock the cup before the artwork", body: "Provide artwork versions, colour references, coverage and any sleeve or carton-mark requirements. Request the printable area, decoration route and proof format for the selected cup construction." },
      ...sharedCommercialFacts,
    ],
    questions: [
      { question: "What sizes are listed for single-wall paper cups?", answer: "The current public family includes 8, 12, 16 and 22 oz references. Dimensions, paper weights and case entries are shown by AW SKU in the model table." },
      { question: "What is the MOQ for custom printed single-wall cups?", answer: "There is no responsible family-wide MOQ. It is confirmed for the selected cup, size, artwork, colour, packing, quantity unit and destination." },
      { question: "Can the same lid be used on several paper-cup sizes?", answer: "Only after the exact cup-and-lid references have been confirmed. Similar capacity or stated diameter is not enough to establish compatibility." },
      { question: "Which information is needed for a sample?", answer: "Provide the AW SKU or target size, beverage and service conditions, proposed lid, artwork status, quantity and the decision the sample is expected to support." },
    ],
    related: [
      { label: "Custom printed coffee cups", href: "/solutions/custom-printed-coffee-cups/", context: "Artwork and brand-program planning" },
      { label: "Cup printing and samples", href: "/guides/disposable-cup-printing-samples/", context: "Proof and approval sequence" },
      { label: "Cup and lid compatibility", href: "/guides/disposable-cup-lid-compatibility/", context: "Matched component review" },
    ],
  },
  "paper-cups-double-wall": {
    seoTitle: "Double-Wall Paper Coffee Cups Wholesale",
    description: "Compare 8, 12 and 16 oz double-wall paper coffee cups in kraft, corrugated and smooth constructions with listed dimensions and 500-piece case packs.",
    heading: "Choose the double-wall construction before approving print.",
    introduction: "This family separates kraft, corrugated and smooth double-wall formats because capacity alone does not define surface, construction or artwork requirements. Anchor every request to the exact AW SKU.",
    facts: [
      { label: "01 / Range", title: "Seven listed double-wall references", body: "The current range covers 8, 12 and 16 oz cups across kraft, corrugated and smooth presentations. Use construction and AW SKU with the nominal capacity." },
      { label: "02 / Construction", title: "Two-layer paper specifications are listed", body: "The model table shows 260 + 250 gsm or 300 + 250 gsm entries depending on the reference. Confirm the final construction and tolerances in the written specification." },
      { label: "03 / Dimensions", title: "Similar sizes can have different rims", body: "Listed 12 oz examples include Ø89 × 110 mm and Ø90 × 113 mm. Treat the cup and proposed lid as a model-specific matched system." },
      { label: "04 / Packing", title: "Listed models show 500 pieces per carton", body: "Request the final inner pack, carton dimensions, gross weight and lid packing before calculating storage or container loading." },
      { label: "05 / Customization", title: "Surface and artwork need one approval record", body: "State the selected smooth, kraft or corrugated reference, artwork version, colour targets and coverage. Confirm the feasible decoration method and proof route for that construction." },
      ...sharedCommercialFacts,
    ],
    questions: [
      { question: "Which double-wall paper cup sizes are listed?", answer: "The current family lists 8, 12 and 16 oz references in smooth, kraft and corrugated constructions, with model-level dimensions, paper weights and case entries." },
      { question: "Are all double-wall cups printed in the same way?", answer: "Do not assume so. The feasible print area, decoration route and proof process depend on the selected surface and construction and must be confirmed for that model." },
      { question: "What is the MOQ for branded double-wall coffee cups?", answer: "MOQ is confirmed for the exact construction, size, artwork version, packing and destination. Share quantities by size rather than one combined forecast." },
      { question: "What should be tested with a double-wall cup sample?", answer: "Review the exact cup and lid with the intended drink, filling and holding routine, carrying, drinking experience, artwork presentation and any sleeve requirement." },
    ],
    related: [
      { label: "Custom printed coffee cups", href: "/solutions/custom-printed-coffee-cups/", context: "Coffee brand-program brief" },
      { label: "Paper vs plastic cups", href: "/guides/paper-vs-plastic-disposable-cups/", context: "Material and construction comparison" },
      { label: "Disposable cup MOQ", href: "/guides/disposable-cup-moq/", context: "Order-line and setup planning" },
    ],
  },
  "cups-pet-cold-cups": {
    seoTitle: "PET Cold Cups Wholesale",
    description: "Compare clear 7, 8, 9 and 10 oz PET cold cups with listed dimensions and 1,000-piece case entries for beverage-service and wholesale sourcing.",
    heading: "Evaluate the clear cup with the drink, lid and service route.",
    introduction: "The public PET family contains four cold-cup references. Clarity and nominal capacity help narrow the range, but the final decision still needs model dimensions, lid compatibility, filled-service testing and destination evidence.",
    facts: [
      { label: "01 / Range", title: "Four listed PET cold-cup references", body: "The current family covers 7, 8, 9 and 10 oz formats. Use the AW SKU and exact dimensions when requesting a lid, sample or quotation." },
      { label: "02 / Material", title: "Clear PET presentation", body: "The declared family material is PET. Confirm the exact model, colour or clarity expectation and intended beverage conditions rather than relying on a category-wide assumption." },
      { label: "03 / Dimensions", title: "Rim and height remain model-level fields", body: "The listed references use a 78.5 mm top dimension with different heights and base dimensions. Final fit and tolerances should be confirmed in writing." },
      { label: "04 / Packing", title: "Current entries list 1,000 pieces", body: "Use this as the published model entry, then request the final pack structure, carton dimensions, gross weight and matching-lid case data for logistics planning." },
      { label: "05 / Components", title: "Do not infer lid fit from appearance", body: "List the cup and proposed lid references together. Test closing, stacking, drinking and transport using the intended fill level and service routine." },
      ...sharedCommercialFacts,
    ],
    questions: [
      { question: "Which PET cold cup sizes are currently listed?", answer: "The public family includes 7, 8, 9 and 10 oz references with model-level dimensions and 1,000-piece case entries." },
      { question: "Can a lid be selected from the 78.5 mm dimension alone?", answer: "No. A stated top dimension does not replace exact component compatibility. Confirm and test the proposed cup-and-lid references as one system." },
      { question: "Can PET cold cups be custom decorated?", answer: "Decoration options must be reviewed for the selected cup, artwork, coverage, quantity and project scope. Do not assume one method is available for every model." },
      { question: "Which records should a PET cup buyer request?", answer: "State the destination and intended beverage conditions, then request records that identify the relevant product or material, scope, issuer, test basis and validity." },
    ],
    related: [
      { label: "PET and PP cold drink programs", href: "/solutions/cold-drink-cup-programs/", context: "Beverage-service planning" },
      { label: "Evaluate a plastic cup supplier", href: "/guides/how-to-evaluate-plastic-cup-manufacturer/", context: "Identity, scope and evidence review" },
      { label: "Cup and lid compatibility", href: "/guides/disposable-cup-lid-compatibility/", context: "Component-system checklist" },
    ],
  },
  "pp-disposable-cups": {
    seoTitle: "PP Plastic Cups Wholesale",
    description: "Compare 13 listed PP disposable cup references from 1 to 20 oz, including published piece weights, for sampling, cold drinks and foodservice sourcing.",
    heading: "Shortlist a PP cup by application, model and measurable fields.",
    introduction: "The public PP family ranges from small portion cups to larger beverage formats. Capacity and piece weight are useful comparison fields, while dimensions, packing, lid pairing and intended-use evidence remain model-specific confirmation points.",
    facts: [
      { label: "01 / Range", title: "Thirteen listed PP references", body: "The current family spans 1, 2.5, 3.5, 5, 6, 7, 8, 9, 10, 12, 14, 16 and 20 oz. Select the intended use and AW SKU before requesting commercial terms." },
      { label: "02 / Weight", title: "Published piece weights support comparison", body: "The table lists reference weights from 1.1 g to 11 g. Confirm the final model specification and tolerance rather than using weight alone as a performance claim." },
      { label: "03 / Application", title: "Match the cup to the real service routine", body: "Describe sampling, beverage or transport-service conditions, fill level, hold time, closure and handling. No general airline approval is claimed for the family." },
      { label: "04 / Packing", title: "Case data remains an open quotation field", body: "The public PP entries do not publish a final case pack. Request pieces per pack, packs per carton, carton dimensions and gross weight for the selected reference." },
      { label: "05 / Components", title: "Add lids or sealing as separate lines", body: "State the proposed closure, opening and accessory requirements. Request written compatibility and test the actual filled system before approval." },
      ...sharedCommercialFacts,
    ],
    questions: [
      { question: "What sizes are available in the listed PP disposable cup family?", answer: "The public range contains 13 references from 1 to 20 oz, with a published piece weight for each listed model." },
      { question: "Are the PP cups approved for every airline or foodservice use?", answer: "No general approval is claimed. The exact model, intended conditions, buyer requirements, samples and relevant records must be reviewed for each program." },
      { question: "What is the wholesale MOQ for PP plastic cups?", answer: "MOQ is confirmed for the selected model, colour, components, decoration, packing, quantity unit and destination; it is not one family-wide number." },
      { question: "Why are some PP dimensions and case packs not shown?", answer: "Unpublished values remain open confirmation fields. Request the model-specific specification and packing record rather than borrowing data from a similar cup." },
    ],
    related: [
      { label: "PET and PP cold drink programs", href: "/solutions/cold-drink-cup-programs/", context: "Cold beverage sourcing plan" },
      { label: "Plastic cup supplier evaluation", href: "/guides/how-to-evaluate-plastic-cup-manufacturer/", context: "Due-diligence checklist" },
      { label: "Disposable cup sourcing guide", href: "/guides/disposable-cup-sourcing-guide/", context: "Complete buyer brief" },
    ],
  },
  "pp-milk-tea-cups": {
    seoTitle: "PP Milk Tea Cups Wholesale",
    description: "Compare 500 ml and 700 ml PP milk tea cups with 90 mm rim references, listed dimensions and piece weights for bubble-tea and cold beverage programs.",
    heading: "Build the milk-tea cup around the drink and closure system.",
    introduction: "The public family contains two tall 90 mm-rim PP references. A useful enquiry connects the cup size to inclusions, fill level, sealing or lid route, artwork, case packing and the actual delivery routine.",
    facts: [
      { label: "01 / Range", title: "500 ml and 700 ml references", body: "The current family lists AW-CUP-PP-MT-500 and AW-CUP-PP-MT-700. Keep the two sizes separate in forecasts, samples, artwork and quotations." },
      { label: "02 / Dimensions", title: "Both entries list a 90 mm rim", body: "The 500 ml model is listed at H134 mm and the 700 ml model at H177 mm, both with a 56 mm base reference. Confirm final dimensions and tolerances in writing." },
      { label: "03 / Weight", title: "Published references are 16.5 g and 23 g", body: "Use these values for initial model comparison only. Final construction, tolerance and intended-use suitability remain subject to model confirmation." },
      { label: "04 / Closure", title: "Specify lid or film-seal requirements", body: "A shared rim statement does not prove every lid or sealing-film pairing. Record the proposed components and test them with ice, inclusions, carrying and delivery." },
      { label: "05 / Packing", title: "Request complete cup-and-closure case data", body: "The public entries do not state final case packs. Ask for cup and closure quantities, carton dimensions, gross weights and the number of complete usable sets." },
      ...sharedCommercialFacts,
    ],
    questions: [
      { question: "Which PP milk tea cup sizes are listed?", answer: "The current family lists 500 ml and 700 ml models with a 90 mm rim reference, model heights, 56 mm base reference and published piece weights." },
      { question: "Will every 90 mm lid fit these cups?", answer: "Do not assume so. Confirm the exact cup and lid or sealing components together and test the filled system under the intended service routine." },
      { question: "Can milk tea cups be custom printed?", answer: "A decoration route can be reviewed after the exact model, artwork, coverage, colours, quantity and packing are defined. Availability is project-specific." },
      { question: "What should a milk-tea cup sample test include?", answer: "Include the actual drink, ice or inclusions, fill level, closure, sealing, carrying, delivery orientation, drinking or straw opening and artwork presentation." },
    ],
    related: [
      { label: "Cold drink cup programs", href: "/solutions/cold-drink-cup-programs/", context: "PET and PP beverage planning" },
      { label: "Cup and lid compatibility", href: "/guides/disposable-cup-lid-compatibility/", context: "Closure-system verification" },
      { label: "Cup MOQ and order planning", href: "/guides/disposable-cup-moq/", context: "Size mix and case rounding" },
    ],
  },
};

export function getFamilyProcurementContent(id: string) {
  return familyProcurementContent[id];
}
