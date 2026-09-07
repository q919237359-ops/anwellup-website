import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { OpenInquiryButton } from "../../components/InquiryProvider";

export const metadata: Metadata = { title: "Quality + compliance", description: "Discuss product specifications, intended use and destination-market documentation for your packaging project.", alternates: { canonical: "/quality-compliance/" } };

const reviewSteps = [
  ["The right specification", "Start with the selected model, material, dimensions and matching components. These details form the basis of your enquiry."],
  ["The intended use", "Tell us what you plan to pack, how it will be served and the conditions it needs to handle."],
  ["The destination", "Share the country or region and sales channel so the document request reflects your market."],
  ["The supporting detail", "Ask for the available model-specific records and review their scope and validity before confirming an order."],
];

export default function QualityPage() {
  return <main id="main-content" className="page-main quality-editorial">
    <header className="page-hero"><span className="eyebrow">Quality + compliance</span><h1>Confidence in<br/>the details.</h1><p>A considered choice starts with a clear specification. Bring us your product, application and destination, and make the right details part of the conversation.</p></header>
    <section className="quality-review"><div><h2>A closer look.<br/>A clearer brief.</h2><p>Every packaging project has its own requirements. Review the selected format in context, from the food it carries to the market it enters.</p></div><ol>{reviewSteps.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section>
    <section className="quality-records"><h2>Ask about your<br/>specific format.</h2><div><p>Include the product reference in your enquiry and tell us which material declarations, test reports or market-specific records you need.</p><p className="quality-records-note">Documents and suitability must be confirmed for the exact model and intended use. No certificates or test reports are currently published on this website.</p><OpenInquiryButton className="editorial-link">Enquire <span><ArrowRight size={19}/></span></OpenInquiryButton></div></section>
  </main>;
}
