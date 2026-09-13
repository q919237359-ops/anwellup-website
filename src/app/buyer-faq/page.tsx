import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "../../components/JsonLd";
import { OpenInquiryButton } from "../../components/InquiryProvider";
import { GENERAL_WHATSAPP_URL } from "../../lib/contact";

type BuyerQuestion = {
  question: string;
  answer: string;
  link: { label: string; href: string };
};

type BuyerQuestionGroup = {
  id: string;
  label: string;
  title: string;
  questions: BuyerQuestion[];
};

const questionGroups: BuyerQuestionGroup[] = [
  {
    id: "quotation",
    label: "01 / Quotation",
    title: "Preparing a useful wholesale enquiry",
    questions: [
      {
        question: "What information is needed for a food packaging quotation?",
        answer: "Provide the product or closest format, intended food and use, dimensions or capacity, material, quantity by model, customization, packing needs, destination, requested documents and timing. If some fields are unknown, identify them as open questions instead of guessing.",
        link: { label: "Use the complete RFQ checklist", href: "/guides/food-packaging-rfq-checklist/" },
      },
      {
        question: "Can I request a quote without knowing the exact SKU?",
        answer: "Yes. Send a reference photo or sample together with measurable dimensions, capacity, material preference, food application, quantity and destination. The next step is to identify a controlled model before final specifications or commercial terms are confirmed.",
        link: { label: "Browse product families", href: "/products/" },
      },
      {
        question: "How should quotations from different suppliers be compared?",
        answer: "Place the model specification, quantity unit, artwork, sample status, documents, inner and outer packing, delivery basis and timing in one table. A piece price is not comparable when any of those inputs differ or remain unconfirmed.",
        link: { label: "Plan sourcing from China", href: "/solutions/food-packaging-sourcing-china/" },
      },
    ],
  },
  {
    id: "product",
    label: "02 / Product",
    title: "Choosing formats, materials and components",
    questions: [
      {
        question: "How do I choose between PP, PET, paper, bagasse and aluminium packaging?",
        answer: "Start with the food, fill condition, holding time, temperature, transport, presentation and destination requirements. Then compare exact models using their measurable specification, matched components, samples and relevant evidence; a material name alone does not establish suitability.",
        link: { label: "Compare packaging materials", href: "/guides/food-packaging-materials-comparison/" },
      },
      {
        question: "How are cup and container lids matched?",
        answer: "Match the lid to the exact cup or container model, rim geometry and supplier reference. Confirm the pair with identified samples under the real filling, closing, holding and transport routine rather than relying only on a nominal diameter.",
        link: { label: "Review cup and lid compatibility", href: "/guides/disposable-cup-lid-compatibility/" },
      },
      {
        question: "What should a food-container size request include?",
        answer: "Include external and usable dimensions, capacity and measurement method, portion geometry, compartments, lid or closure, stack and transport conditions. Keep those values tied to one model so a similar-looking container is not treated as equivalent.",
        link: { label: "Use the food-container size guide", href: "/guides/food-container-size-guide/" },
      },
    ],
  },
  {
    id: "approval",
    label: "03 / Approval",
    title: "Samples, artwork and supporting records",
    questions: [
      {
        question: "Can I request samples before a bulk food packaging order?",
        answer: "A suitable sample route can be reviewed after the format and decision objective are clear. State whether the sample must confirm dimensions, food fit, closure, artwork, colour, packing or production finish, and record what the supplied sample actually represents.",
        link: { label: "Plan container samples", href: "/guides/takeaway-container-samples-prototyping/" },
      },
      {
        question: "How is custom packaging artwork approved?",
        answer: "Select the exact base model first, then define print area, sides, colours, coverage, artwork file and revision. A digital proof can confirm layout, while colour, material and production finish may require a different physical approval route.",
        link: { label: "Prepare a custom printing brief", href: "/guides/custom-food-packaging-printing-guide/" },
      },
      {
        question: "How should food-contact documents be checked?",
        answer: "Review the named product or material, issuing body, scope, test basis and validity, then confirm how the record connects to the exact model, intended use and destination. A general certificate list should not be extended to an unrelated product by assumption.",
        link: { label: "Review quality and document handling", href: "/quality-compliance/" },
      },
    ],
  },
  {
    id: "commercial",
    label: "04 / Commercial",
    title: "MOQ, packing and delivery planning",
    questions: [
      {
        question: "What is the MOQ for wholesale food packaging?",
        answer: "There is no responsible site-wide MOQ. The minimum is confirmed for the selected model, size, material, colour, artwork version, packing, quantity unit and destination; published case packing is a separate field.",
        link: { label: "Understand packaging MOQ", href: "/guides/food-packaging-moq-guide/" },
      },
      {
        question: "What packing data is needed for freight planning?",
        answer: "Request pieces per inner pack and case, carton dimensions, gross weight, assortment rules and pallet or loading assumptions where applicable. Convert order quantities to complete cases and keep packing data attached to the quoted model revision.",
        link: { label: "Plan container packing and lead time", href: "/guides/takeaway-container-lead-time-packing/" },
      },
      {
        question: "How is production lead time confirmed?",
        answer: "Ask what event starts the lead time and what shipment-ready means. Separate artwork review, samples, production, inspection and transport, and update the schedule when the specification, quantity, approval status or packing changes.",
        link: { label: "Review lead-time milestones", href: "/guides/disposable-cup-lead-time-packing/" },
      },
    ],
  },
];

const questions = questionGroups.flatMap((group) => group.questions);

export const metadata: Metadata = {
  title: "Wholesale Food Packaging FAQ for Buyers",
  description: "Answers to wholesale food packaging questions about quotations, materials, lids, samples, custom printing, documents, MOQ, packing and lead time.",
  alternates: { canonical: "/buyer-faq/" },
  openGraph: {
    title: "Wholesale Food Packaging FAQ for Buyers | ANWELLUP",
    description: "Concise, model-level answers for buyers preparing a food packaging sourcing brief.",
    url: "/buyer-faq/",
    type: "website",
  },
};

export default function BuyerFaqPage() {
  const pageUrl = "https://anwellup.com/buyer-faq/";
  return <main id="main-content" className="page-main buyer-faq-page">
    <JsonLd data={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://anwellup.com/" },
          { "@type": "ListItem", position: 2, name: "Buyer FAQ", item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Wholesale food packaging FAQ for buyers",
        description: metadata.description,
        inLanguage: "en",
        dateModified: "2026-09-13",
        author: { "@id": "https://anwellup.com/#organization" },
        reviewedBy: { "@id": "https://anwellup.com/#organization" },
        isPartOf: { "@id": "https://anwellup.com/#website" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: pageUrl,
        mainEntity: questions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ]} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Buyer FAQ</span></nav>
    <header className="buyer-faq-hero">
      <div><span className="eyebrow">Wholesale buyer FAQ / updated 13 September 2026</span><h1>Clear answers before you request a quote.</h1></div>
      <div><p>Short, evidence-aware answers to the questions that shape a food packaging specification, supplier comparison and purchase decision.</p><p className="guide-byline">Prepared and reviewed by ANWELLUP · <Link href="/about/#content-method">Content method</Link></p></div>
    </header>
    <nav className="buyer-faq-index" aria-label="FAQ topics">
      {questionGroups.map((group) => <a href={`#${group.id}`} key={group.id}><span>{group.label}</span>{group.title}<ArrowRight size={16}/></a>)}
    </nav>
    <div className="buyer-faq-groups">
      {questionGroups.map((group) => <section id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
        <header><span className="eyebrow">{group.label}</span><h2 id={`${group.id}-title`}>{group.title}</h2></header>
        <dl>{group.questions.map((item) => <div key={item.question}><dt>{item.question}</dt><dd><p>{item.answer}</p><Link href={item.link.href}>{item.link.label}<ArrowUpRight size={16}/></Link></dd></div>)}</dl>
      </section>)}
    </div>
    <section className="family-next-step"><div><span className="eyebrow">Your project</span><h2>Still have an unanswered buying question?</h2><p>Share the product, application, quantity and destination. We will identify the specification and evidence fields that still need confirmation.</p></div><div className="category-next-actions"><OpenInquiryButton className="button button-orange">Build an RFQ <ArrowRight size={18}/></OpenInquiryButton><a className="button button-outline" href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location="buyer_faq"><WhatsappLogo size={19} weight="fill"/> WhatsApp</a></div></section>
  </main>;
}
