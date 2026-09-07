import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { catalogCategories } from "../catalog";
import { OpenInquiryButton } from "../components/InquiryProvider";
import { ScrollMotion } from "../components/ScrollMotion";
import { buyingGuides } from "../guides";

export const metadata: Metadata = {
  title: { absolute: "Wholesale Food Packaging Supplier | ANWELLUP" },
  description: "Explore ANWELLUP cups, takeaway containers, tableware, foil, cutlery, carry bags and gloves for wholesale and custom sourcing projects.",
  alternates: { canonical: "/" },
};

const story = "The curve of a bowl. The texture of a tray. The way a lid meets its base. Every detail shapes the experience of a meal.";
const steps = [
  ["Select", "Find the formats and materials that suit your menu, shelf or service."],
  ["Make it yours", "Explore artwork, dimensions and packing options for your chosen range."],
  ["Bring it together", "Share your selection, quantities and destination in one enquiry."],
];

export default function HomePage() {
  return <ScrollMotion variant="home"><main id="main-content" className="editorial-home">
    <section className="cinema-hero" aria-labelledby="home-title">
      <img className="cinema-photo" src="/assets/generated/cinematic/hero-regenerative-cinema.webp" alt="Food packaging arranged on sculptural material platforms" width={1672} height={941} fetchPriority="high" />
      <div className="cinema-shade" />
      <div className="cinema-copy">
        <span className="eyebrow">ANWELLUP food packaging</span>
        <h1 id="home-title"><span className="title-mask"><span>Made to move.</span></span><span className="title-mask"><span>Made for food.</span></span></h1>
        <p>Packaging for foodservice, takeaway and retail.</p>
        <a className="editorial-link" href="#material-story">Explore materials <span><ArrowRight size={19}/></span></a>
      </div>
    </section>
    <section className="texture-story" id="material-story" aria-labelledby="texture-title">
      <img className="texture-photo" src="/assets/generated/cinematic/fiber-macro-regenerative.webp" alt="Close-up of the texture and formed edge of a fibre tray" width={1672} height={941} loading="lazy" />
      <div className="texture-shade" />
      <div className="texture-copy"><h2 id="texture-title">Material matters.</h2><p className="texture-words">{story.split(" ").map((word, index) => <span key={index}>{word} </span>)}</p><a className="editorial-link" href="#collection">View the collection <span><ArrowDown size={18}/></span></a></div>
    </section>
    <section className="collection-showcase" id="collection" aria-labelledby="collection-title">
      <header className="collection-heading"><div><h2 id="collection-title">For every way you serve.</h2></div><Link className="editorial-link" href="/products/">View the collection <span><ArrowUpRight size={20}/></span></Link></header>
      <div className="collection-track" tabIndex={0} role="region" aria-label="Product categories; scroll horizontally to explore">
        <div className="collection-rail">
        {catalogCategories.map((category) => <Link className={`collection-panel ${category.id === "bags" ? "collection-panel-bags" : ""}`} href={`/products/${category.slug}/`} key={category.id}>
          <div className="collection-image"><img src={category.image} alt={category.label} width={category.id === "bags" ? 640 : 1448} height={category.id === "bags" ? 480 : 1086} loading="lazy" decoding="async" /></div>
          <div className="collection-label"><h3>{category.shortLabel}</h3><ArrowUpRight size={25}/></div>
          <p>{category.editorial}</p>
        </Link>)}
        </div>
      </div>
      <div className="collection-progress" aria-hidden="true"><span /></div>
    </section>
    <section className="brand-studio" aria-labelledby="studio-title">
      <figure className="studio-image"><img src="/assets/generated/scenes/customization-oem.webp" alt="Packaging design concepts with printed sleeves and material swatches" width={1003} height={1568} loading="lazy" /><figcaption>Packaging design illustration</figcaption></figure>
      <div className="studio-copy" data-reveal><span className="eyebrow">Customization</span><h2 id="studio-title">Your brand.<br/>Your packaging.</h2><p>Explore printing, sleeves and packing options for your chosen format. Start with your artwork and the way it will be used.</p><dl><div><dt>Format</dt><dd>Shape, material &amp; dimensions</dd></div><div><dt>Identity</dt><dd>Artwork, colour &amp; finish</dd></div><div><dt>Presentation</dt><dd>Packing &amp; assortment</dd></div></dl><Link className="editorial-link" href="/capabilities/">Explore customization <span><ArrowUpRight size={20}/></span></Link></div>
    </section>
    <section className="production-intro" aria-labelledby="production-title">
      <div className="production-copy" data-reveal><h2 id="production-title">Inside production.</h2><p>Explore production processes and discuss container lines, forming moulds and collection equipment for your project.</p><Link className="editorial-link" href="/manufacturing/">Manufacturing &amp; equipment <span><ArrowUpRight size={20}/></span></Link></div>
      <figure><img src="/assets/manufacturing/2026-09-source/aluminium-factory-overview-source.webp" alt="Factory exterior from the Ningbo Times aluminium packaging catalogue" width={720} height={362} loading="lazy" /><figcaption>Source: Ningbo Times catalogue. Facility relationship confirmed per project.</figcaption></figure>
    </section>
    <section className="collaboration-section" aria-labelledby="collaboration-title"><header data-reveal><h2 id="collaboration-title">From selection<br/>to specification.</h2></header><ol>{steps.map(([title, body], index) => <li data-reveal key={title}><span>{String(index + 1).padStart(2,"0")}</span><h3>{title}</h3><p>{body}</p></li>)}</ol><div className="collaboration-links"><Link href="/quality-compliance/">Quality &amp; product documents <ArrowUpRight size={17}/></Link><a href="/downloads/ANWELLUP_Product_Catalogue_2026.pdf" download data-analytics-event="catalog_download" data-analytics-location="homepage">Download catalogue <ArrowDown size={17}/></a></div></section>
    <section className="home-guides" aria-labelledby="home-guides-title">
      <header data-reveal><span className="eyebrow">Buyer&apos;s reference</span><h2 id="home-guides-title">A clearer way<br/>to prepare the brief.</h2><p>Practical notes for comparing formats and giving a supplier the context needed for a useful quotation.</p></header>
      <ol>{buyingGuides.slice(0, 3).map((guide, index) => <li data-reveal key={guide.slug}><span>{String(index + 1).padStart(2, "0")}</span><Link href={`/guides/${guide.slug}/`}><h3>{guide.shortTitle}</h3><ArrowUpRight size={20}/></Link><p>{guide.description}</p></li>)}</ol>
      <Link className="editorial-link" href="/guides/">All buying guides <span><ArrowRight size={19}/></span></Link>
    </section>
    <section className="editorial-closing" data-reveal><h2>Let’s talk packaging.</h2><OpenInquiryButton className="editorial-link">Enquire <span><ArrowUpRight size={23}/></span></OpenInquiryButton></section>
  </main></ScrollMotion>;
}
