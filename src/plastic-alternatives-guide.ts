import type { BuyingGuide } from "./guides";

export const plasticAlternativesGuide: BuyingGuide = {
  slug: "single-use-plastic-packaging-alternatives",
  title: "Alternatives to single-use plastic food packaging: a buyer checklist",
  seoTitle: "Plastic Packaging Alternatives: Bagasse, Paper & Aluminium",
  shortTitle: "Source alternatives to single-use plastic",
  description: "Compare bagasse, paper and aluminium packaging, check coatings and lids, and use official EU and England guidance to prepare a destination-specific sourcing brief.",
  lede: "Start a replacement brief with the exact product, destination and food use. Bagasse, paper and aluminium are options to compare, but none of those material names alone proves a complete pack is plastic-free, compostable or permitted in every market.",
  image: "/assets/editorial/2026-09-r3/bagasse-kraft-takeaway-service-v1.webp", imageAlt: "Bagasse and kraft food packaging reference illustration", imageWidth: 1536, imageHeight: 1024,
  published: "2026-09-30", updated: "2026-09-30",
  comparison: {
    caption: "Shortlisting materials when replacing a plastic food pack",
    columns: ["Candidate", "Catalogue starting point", "Ask before a sample or quote"],
    rows: [
      ["Sugarcane bagasse", "Clamshells, bowls, plates and compartment trays", "Fibre composition, barrier treatment, additives, lid material and evidence for any claim"],
      ["Paper / kraft", "Cups, bowls, folded boxes and food trays", "Coating or lining composition, closure, printing and matched lid"],
      ["Aluminium", "Smoothwall containers and wrinkle-wall trays", "Coatings, complete lid construction and intended-use instructions"],
      ["Reusable systems", "Separate operating-model assessment", "Return, washing, loss and reuse logistics; no reusable range is claimed in this catalogue"],
    ],
  },
  sections: [
    { heading: "Identify which rule and product you are dealing with.", paragraphs: [
      "There is no single worldwide plastic ban. Record the country, product type, whether it is supplied empty or filled, and the date it will be placed on the market. Review the relevant official guidance with the importer before finalizing the specification.",
      "For the EU, distinguish the Single-Use Plastics Directive from the Packaging and Packaging Waste Regulation. The European Commission lists 12 August 2026 as the PPWR application date; individual requirements have their own scope and timetable. The regulation also addresses substances of concern in food-contact packaging.",
    ], links: [{ label: "European Commission: packaging and packaging waste", href: "https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-waste_en" }, { label: "European Commission: single-use plastics", href: "https://environment.ec.europa.eu/topics/plastics/single-use-plastics_en" }] },
    { heading: "Do not treat a paper surface as proof of plastic-free construction.", paragraphs: [
      "England's guidance includes wholly or partly plastic items, including certain coated or lined products. It distinguishes banned items, restricted items and exemptions; for example, plates, bowls and trays have packaging and business-supply exemptions. Check the actual product category rather than applying a blanket conclusion to all food packaging.",
      "In a quotation, list the base, coating, liner, lid, window and adhesive separately. Record what is confirmed and what still needs a composition statement. The same principle makes comparisons clearer even where the destination uses different rules.",
    ], links: [{ label: "GOV.UK: England single-use plastics bans and restrictions", href: "https://www.gov.uk/guidance/single-use-plastics-bans-and-restrictions" }] },
    { heading: "Choose a material shortlist around the meal.", paragraphs: [
      "Use portion size, sauce, holding time, filling conditions, stacking and presentation to choose candidate formats. A dry bakery item, a sauced meal and a chilled display product should not receive an identical brief.",
      "The comparison table is a sourcing starting point, not a performance certification. Follow the material pages for actual catalogue families and request samples for the intended service conditions.",
    ], links: [{ label: "Bagasse containers and tableware", href: "/materials/bagasse-food-packaging/" }, { label: "Paper and kraft packaging", href: "/materials/paper-food-packaging/" }, { label: "Aluminium containers", href: "/materials/aluminium-food-containers/" }] },
    { heading: "Request evidence for each environmental claim.", paragraphs: [
      "Treat plastic-free, compostable, recyclable and PFAS-related statements as separate questions. Ask which exact SKU and construction a statement covers, how it was assessed, and what conditions or limits apply.",
      "ANWELLUP's public catalogue does not establish blanket compostability certification or a PFAS-free claim. Any proposed claim needs model-specific evidence and a destination-specific review. Ask about actual local collection and treatment arrangements before specifying disposal wording.",
    ], checklist: ["Exact product and component identity", "Coating and additive information", "Applicable claim and test method", "Report scope and date", "Destination and intended food use"] },
    { heading: "Compare samples using the same service test.", paragraphs: [
      "Label each candidate with its SKU and complete lid or closure. Fill samples with the intended food, close them using the normal workflow, hold and transport them as planned, and record the results.",
      "Review deformation, lid retention, handling, stacking and food presentation against the same acceptance criteria. A successful operational test does not replace required product documentation.",
    ], links: [{ label: "Container sample checklist", href: "/guides/takeaway-container-samples-prototyping/" }] },
    { heading: "Turn the shortlist into a comparable quotation.", paragraphs: [
      "Send the product or closest format, quantity, destination, service conditions and material exclusions. Separate sample requirements from the production order. Ask for MOQ, case quantity, price basis, lid inclusion and lead time for each candidate.",
      "This guide supports sourcing decisions, not a legal determination for a particular shipment. Official sources were checked on 30 September 2026; the importer should confirm the applicable rules for the intended market and date.",
    ], links: [{ label: "Request a packaging quotation", href: "/contact/#send-enquiry" }, { label: "Use the complete RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" }, { label: "Download the RFQ template", href: "/resources/food-packaging-rfq-template/" }] },
  ],
  questions: [
    { question: "Are all single-use plastic food containers banned?", answer: "No single global rule applies. The answer depends on the destination, product type, material composition, intended use and timing. Consult the relevant official rules for the exact item." },
    { question: "Is bagasse or kraft automatically plastic-free?", answer: "No. Check coatings, liners, lids and additives for the complete pack. A fibre or paper description alone is insufficient." },
    { question: "How can I request an alternative to my current pack?", answer: "Share its dimensions or capacity, food use, quantity, destination and the materials or claims you require. Ask for a shortlist, samples and supporting records before selecting the production specification." },
  ],
  sources: [
    { label: "European Commission — Packaging waste", href: "https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-waste_en" },
    { label: "European Commission — Single-use plastics", href: "https://environment.ec.europa.eu/topics/plastics/single-use-plastics_en" },
    { label: "GOV.UK — Single-use plastics bans and restrictions (England)", href: "https://www.gov.uk/guidance/single-use-plastics-bans-and-restrictions" },
  ],
  related: [{ label: "Compare packaging by material", href: "/materials/" }, { label: "Choose takeaway packaging", href: "/guides/how-to-choose-takeaway-packaging/" }, { label: "Request a quote", href: "/contact/" }],
};
