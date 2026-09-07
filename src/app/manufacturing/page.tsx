import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { equipmentFamilies } from "../../catalog";
import { AddToInquiryButton, OpenInquiryButton } from "../../components/InquiryProvider";
import { ScrollMotion } from "../../components/ScrollMotion";

export const metadata: Metadata = {
  title: "Manufacturing + equipment",
  description: "Explore packaging production processes, source-catalogue factory imagery and aluminium-container equipment enquiries.",
  alternates: { canonical: "/manufacturing/" },
};

const floors = [
  ["plastic-blister-injection-malaysia-source.webp", "Forming & moulding", "Plastic blister and injection-moulding equipment.", "Kuala Lumpur"],
  ["paper-cup-line-kunming-source.webp", "Paper formats", "Paper cup, bowl and box production.", "Yunnan Kunming"],
  ["bag-production-chuzhou-source.webp", "Bag conversion", "Equipment for the carry-bag range.", "Anhui Chuzhou"],
  ["coated-paper-floor-philadelphia-source.webp", "Material handling", "Coated-paper reels on the production floor.", "Philadelphia"],
  ["injection-moulding-cangzhou-source.webp", "Production layout", "Injection-moulding and plastic-blister production hall.", "Hebei Cangzhou"],
  ["plastic-blister-injection-sichuan-source.webp", "The equipment floor", "Multiple workstations within a packaging production hall.", "Sichuan Lezhi"],
];

export default function ManufacturingPage() {
  return <ScrollMotion variant="manufacturing"><main id="main-content" className="atelier-page">
    <header className="atelier-hero"><span className="eyebrow">Manufacturing &amp; equipment</span><h1><span className="title-mask"><span>Behind every</span></span><span className="title-mask"><span>finished format.</span></span></h1><div className="atelier-hero-intro"><p>Materials become shapes. Shapes become the packaging we use every day. Explore production processes and discuss the equipment behind your next project.</p><a className="editorial-link" href="#production-floor">Inside production <span><ArrowDown size={20}/></span></a></div></header>
    <section className="atelier-overview" aria-labelledby="overview-title"><figure><img src="/assets/manufacturing/2026-09-source/aluminium-factory-overview-source.webp" alt="Factory exterior from the supplied Ningbo Times aluminium foil catalogue" width={720} height={362}/><figcaption>Ningbo Times Aluminium Foil Technology Corp., Ltd. / Source catalogue photograph.</figcaption></figure><div data-reveal><h2 id="overview-title">The process<br/>behind the product.</h2><p>Forming, tooling and handling each play a part in a packaging project. Match the process to the product shape, material and intended application.</p></div></section>
    <section className="atelier-floor" id="production-floor" aria-labelledby="floor-title"><header><div><h2 id="floor-title">A view from<br/>the equipment floor.</h2></div><p>Production images from the supplied CNYU PACK catalogue. Locations and process descriptions follow its factory-introduction pages.</p></header><div className="atelier-floor-grid">{floors.map(([file, title, body, location]) => <article className="atelier-floor-item" data-reveal key={file}><figure><img src={`/assets/manufacturing/2026-09-source/${file}`} alt={`${title}, ${location}; source catalogue image`} loading="lazy"/></figure><div><span className="source-location">{location}</span><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>
    <section className="atelier-equipment" aria-labelledby="equipment-title"><header><div><span className="eyebrow">Equipment projects</span><h2 id="equipment-title">From a single mould<br/>to a production line.</h2></div><p>Discuss aluminium-container production, tooling and collection equipment. Share your target format and output to define the configuration.</p></header>{equipmentFamilies.map((item,index) => <article className="atelier-equipment-row" data-reveal key={item.sku}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{item.name}</h3><code>{item.sku}</code></div><p>{item.description}</p><AddToInquiryButton compact item={{sku:item.sku,name:item.name,category:"Equipment"}}/></article>)}<p className="atelier-source-note">The photographs above depict facilities named in the supplied catalogues; they do not establish ANWELLUP ownership or identify the equipment offered for sale. The supplier, facility, specifications and service scope are confirmed for each project.</p></section>
    <section className="editorial-closing" data-reveal><h2>Discuss an equipment project.</h2><OpenInquiryButton className="editorial-link">Enquire <span><ArrowUpRight size={23}/></span></OpenInquiryButton></section>
  </main></ScrollMotion>;
}
