import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { OpenInquiryButton } from "../../components/InquiryProvider";

export const metadata: Metadata = { title: "Customization + capabilities", description: "Explore packaging formats, artwork and packing options for your next foodservice or retail project.", alternates: { canonical: "/capabilities/" } };

const steps = [
  ["The right format", "Start with the food, portion and service occasion. Compare shapes, materials and dimensions within the range."],
  ["Your visual identity", "Explore printing, sleeves, labels and embossing where the selected format supports them."],
  ["The finishing details", "Discuss case quantities, carton marks and how the assortment will be presented."],
  ["Ready for the next step", "Confirm the sample, specifications, artwork and delivery requirements for your project."],
];

export default function CapabilitiesPage() {
  return <main id="main-content" className="page-main capabilities-editorial">
    <header className="page-hero"><span className="eyebrow">Customization &amp; capabilities</span><h1>Your brand.<br/>In every detail.</h1><p>Make a familiar format feel like yours. Explore the material, artwork and presentation that bring your packaging together.</p></header>
    <section className="capability-detail"><figure><img src="/assets/generated/scenes/customization-oem.webp" alt="Illustrative packaging design concepts with sleeves and material swatches" width={1003} height={1568}/><figcaption>Packaging design illustration</figcaption></figure><div><ol>{steps.map(([title, body], index) => <li key={title}><span>{String(index+1).padStart(2,"0")}</span><div><h2>{title}</h2><p>{body}</p></div></li>)}</ol></div></section>
    <section className="production-intro"><div className="production-copy"><h2>Explore the<br/>production process.</h2><p>Discover manufacturing imagery and discuss aluminium-container lines, tooling and collection equipment.</p><Link className="editorial-link" href="/manufacturing/">Manufacturing &amp; equipment <span><ArrowUpRight size={20}/></span></Link></div><figure><img src="/assets/manufacturing/2026-09-clean/factory-overview-signage-removed-v2.webp" alt="Aluminium packaging facility exterior from the supplied catalogue" width={1770} height={889} loading="lazy"/><figcaption>Supplied catalogue photograph. Identifying rooftop signage removed; facility relationship confirmed per project.</figcaption></figure></section>
    <section className="editorial-closing"><h2>Discuss your packaging.</h2><OpenInquiryButton className="editorial-link">Enquire <span><ArrowUpRight size={23}/></span></OpenInquiryButton></section>
  </main>;
}
