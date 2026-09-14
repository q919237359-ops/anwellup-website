import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "../../../components/JsonLd";
import { OpenInquiryButton } from "../../../components/InquiryProvider";
import { GENERAL_WHATSAPP_URL } from "../../../lib/contact";

const downloadUrl = "/downloads/ANWELLUP_Food_Packaging_RFQ_Template.xlsx";

const questions = [
  {
    question: "What is included in the food packaging RFQ template?",
    answer: "The Excel workbook contains an RFQ Brief for project and product requirements and a Quote Comparison sheet for supplier identity, MOQ, quantity, price, packing, samples, documents, timing and delivery terms.",
  },
  {
    question: "Can the template be used without an exact product SKU?",
    answer: "Yes. Enter the closest format, intended food or application, dimensions or capacity, material, quantity and destination. Keep the exact model as an open field for written confirmation.",
  },
  {
    question: "Does completing the template confirm food-contact suitability?",
    answer: "No. The template organizes the request. Suitability, supporting records and destination requirements must be reviewed for the exact product model and intended conditions.",
  },
  {
    question: "How should supplier prices be compared in the workbook?",
    answer: "Compare price only when the model specification, quantity unit, artwork, documents, packing, delivery basis and timing match. The workbook calculates estimated goods value and case count but does not select a supplier automatically.",
  },
];

const fields = [
  ["Product identity", "Product family, supplier model or ANWELLUP SKU"],
  ["Application", "Food, fill condition, holding time, transport and service routine"],
  ["Specification", "Dimensions or capacity, material, colour, lid and matching components"],
  ["Customization", "Print method, colours, artwork revision, labels and pack presentation"],
  ["Commercial basis", "Quantity unit, MOQ, quoted quantity, price, setup and validity"],
  ["Packing and delivery", "Inner pack, case pack, carton context, Incoterm and shipment-ready date"],
  ["Approval evidence", "Sample purpose and status, required documents and unresolved questions"],
] as const;

export const metadata: Metadata = {
  title: "Food Packaging RFQ Template for Wholesale Buyers",
  description: "Download a free Excel food packaging RFQ template for product specifications, MOQ, samples, documents, packing, supplier quotes and delivery terms.",
  alternates: { canonical: "/resources/food-packaging-rfq-template/" },
  openGraph: {
    title: "Food Packaging RFQ Template for Wholesale Buyers | ANWELLUP",
    description: "A practical Excel workbook for preparing packaging enquiries and comparing supplier quotations on the same basis.",
    url: "/resources/food-packaging-rfq-template/",
    type: "website",
  },
};

export default function FoodPackagingRfqTemplatePage() {
  const pageUrl = "https://anwellup.com/resources/food-packaging-rfq-template/";
  const fileUrl = `https://anwellup.com${downloadUrl}`;
  return <main id="main-content" className="page-main resource-page">
    <JsonLd data={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://anwellup.com/" },
          { "@type": "ListItem", position: 2, name: "Food packaging RFQ template", item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Food packaging RFQ template for wholesale buyers",
        description: metadata.description,
        inLanguage: "en",
        dateModified: "2026-09-14",
        author: { "@id": "https://anwellup.com/#organization" },
        reviewedBy: { "@id": "https://anwellup.com/#organization" },
        isPartOf: { "@id": "https://anwellup.com/#website" },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: { "@id": `${pageUrl}#download` },
      },
      {
        "@context": "https://schema.org",
        "@type": "DigitalDocument",
        "@id": `${pageUrl}#download`,
        name: "ANWELLUP Food Packaging RFQ Template",
        description: "Editable Excel template for defining wholesale food packaging requirements and comparing supplier quotations.",
        encodingFormat: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        contentUrl: fileUrl,
        isAccessibleForFree: true,
        inLanguage: "en",
        dateModified: "2026-09-14",
        creator: { "@id": "https://anwellup.com/#organization" },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#questions`,
        url: `${pageUrl}#questions`,
        mainEntity: questions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ]} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">RFQ template</span></nav>
    <header className="resource-hero">
      <div><span className="eyebrow">Free buyer resource / Excel workbook</span><h1>Food packaging RFQ template.</h1></div>
      <div className="resource-hero-copy"><p>Organize product specifications, samples, documents, MOQ, packing and delivery before asking suppliers to quote. The workbook also gives you a controlled place to compare responses.</p><div className="resource-actions"><a className="button button-orange" href={downloadUrl} download data-analytics-event="rfq_template_download" data-analytics-location="resource_hero">Download Excel template <ArrowDown size={18}/></a><Link className="editorial-link" href="/guides/food-packaging-rfq-checklist/">Read the RFQ guide <span><ArrowUpRight size={18}/></span></Link></div><p className="resource-file-note">.xlsx · 2 worksheets · editable fields and formulas · no sign-up required</p></div>
    </header>
    <section className="resource-workbook" aria-labelledby="workbook-title"><header><span className="eyebrow">Inside the workbook</span><h2 id="workbook-title">Two working sheets, each with one job.</h2></header><ol>
      <li><span>01</span><div><h3>RFQ Brief</h3><p>Capture buyer context, destination and product requirements. Twelve line-item rows cover format, food application, dimensions, material, matching components, customization, quantity, packing, documents, sample status and open questions.</p></div></li>
      <li><span>02</span><div><h3>Quote Comparison</h3><p>Normalize supplier identity, model, MOQ, quoted quantity, unit price, case pack, approvals and delivery terms. Formula cells calculate estimated goods value and case count without inventing missing inputs.</p></div></li>
    </ol></section>
    <section className="resource-fields" aria-labelledby="fields-title"><header><span className="eyebrow">What the template captures</span><h2 id="fields-title">Keep the decision attached to the specification.</h2><p>A reusable request should preserve the details that make one supplier response comparable with another.</p></header><dl>{fields.map(([label, value], index) => <div key={label}><span>{String(index + 1).padStart(2, "0")}</span><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
    <section className="resource-how" aria-labelledby="how-title"><header><span className="eyebrow">How to use it</span><h2 id="how-title">From open brief to written comparison.</h2></header><ol>
      <li><span>01</span><h3>Complete what you know.</h3><p>Start with company, destination, application and at least one product line. Leave uncertain specifications blank or list them as open questions.</p></li>
      <li><span>02</span><h3>Send the same brief.</h3><p>Give each shortlisted supplier the same product, quantity, customization, document and delivery basis.</p></li>
      <li><span>03</span><h3>Record every response.</h3><p>Enter each supplier&apos;s legal identity, exact model, commercial terms, sample status and evidence status on a separate comparison row.</p></li>
      <li><span>04</span><h3>Close gaps before approval.</h3><p>Resolve open points and freeze the final specification, artwork, samples, documents, packing and shipment scope in writing.</p></li>
    </ol></section>
    <section id="questions" className="resource-questions" aria-labelledby="resource-questions-title"><header><span className="eyebrow">Template questions</span><h2 id="resource-questions-title">What the file does and does not do.</h2></header><dl>{questions.map((item) => <div key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}</dl></section>
    <section className="family-next-step"><div><span className="eyebrow">Ready to source</span><h2>Use the template, then send the brief.</h2><p>We can review the closest product models and identify the fields that still need supplier confirmation.</p></div><div className="category-next-actions"><a className="button button-orange" href={downloadUrl} download data-analytics-event="rfq_template_download" data-analytics-location="resource_closing">Download template <ArrowDown size={18}/></a><OpenInquiryButton className="button button-outline">Build an RFQ <ArrowRight size={18}/></OpenInquiryButton><a className="button button-outline" href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location="rfq_template"><WhatsappLogo size={19} weight="fill"/> WhatsApp</a></div></section>
  </main>;
}
