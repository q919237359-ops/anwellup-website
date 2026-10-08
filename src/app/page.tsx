import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { catalogCategories, productFamilies } from "../catalog";
import { OpenInquiryButton } from "../components/InquiryProvider";
import { JsonLd } from "../components/JsonLd";
import { ScrollMotion } from "../components/ScrollMotion";
import { SourcingCollections } from "../components/SourcingCollections";
import { priorityBuyingGuides } from "../guides";
import { materialPages } from "../materials";
import "./homepage.css";

const title = "Wholesale Food Packaging for Distributors | ANWELLUP";
const description = "Wholesale food packaging for distributors and foodservice buyers. Compare foil rolls, baking paper, containers and custom printing, then request a quote.";
const heroImage = "/images/seo/foil-roll-sheets-parchment-1440.webp";

export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", type: "website", images: [{ url: heroImage, width: 1440, height: 960, alt: "Illustration of aluminium foil rolls, foil sheets and baking paper" }] },
};

const categoryOrder = ["foil", "boxes", "cups", "tableware", "cutlery", "bags", "gloves"];
const homeCategories = [...catalogCategories].sort((a, b) => categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id));
const modelCount = productFamilies.reduce((total, family) => total + family.variants.length, 0);
const categoryNames: Record<string, string> = {
  foil: "Foil, wraps & baking paper", boxes: "Takeaway containers", cups: "Cups & drinkware",
  tableware: "Plates, bowls & trays", cutlery: "Cutlery & meal kits", bags: "Carry & shopping bags", gloves: "Gloves & supplies",
};
const buyingRoutes = [
  { title: "Distributors & importers", body: "Build a foodservice assortment around exact models, case packs and destination requirements.", href: "/distributors/", action: "Plan your sourcing range" },
  { title: "Restaurants & takeaway", body: "Match your menu to containers, lids, drinkware and cutlery before planning a rollout.", href: "/solutions/restaurant-chain-takeaway-packaging/", action: "Explore restaurant packaging" },
  { title: "Prepared-food retail", body: "Review portion fit, closure, presentation and artwork for the complete retail pack.", href: "/solutions/prepared-food-retail-packaging/", action: "Explore retail packaging" },
];
const steps = [
  { title: "Choose your models", body: "Shortlist a format and AW SKU. Record the material, dimensions and any matching lid or component.", href: "/products/", action: "Compare the catalogue" },
  { title: "Define the order", body: "Add quantity by model, packing, artwork, destination and the way the pack will be used.", href: "/resources/food-packaging-rfq-template/", action: "Use the RFQ workbook" },
  { title: "Confirm the details", body: "Discuss samples, product documents and commercial terms against the same written brief.", href: "/quality-compliance/", action: "Review product documents" },
];
const questions = [
  { question: "What food packaging can I source through ANWELLUP?", answer: "The catalogue covers cups and drinkware, takeaway containers, plates and bowls, foil and baking paper, cutlery and meal kits, carry bags, and gloves. Start with a product family, then compare the AW model references for your intended use.", href: "/products/", action: "Browse all product families" },
  { question: "What do you need for a wholesale quotation?", answer: "Send the product or closest AW SKU, quantity by model, dimensions or capacity, matching components, packing needs and destination. Include artwork and intended food or service conditions where relevant so the quotation can address the complete requirement.", href: "/guides/food-packaging-rfq-checklist/", action: "See the complete RFQ checklist" },
  { question: "Can I discuss custom printing and samples?", answer: "Printing, sleeves, labels and packing options can be reviewed for the selected format. Share your artwork and what a sample needs to demonstrate. The available process, sample scope, costs and timing are confirmed for the specific project.", href: "/guides/custom-food-packaging-printing-guide/", action: "Prepare a printing brief" },
];
const homepageSchema = {
  "@context": "https://schema.org", "@type": "CollectionPage", "@id": "https://anwellup.com/#webpage",
  url: "https://anwellup.com/", name: title, description,
  isPartOf: { "@id": "https://anwellup.com/#website" }, publisher: { "@id": "https://anwellup.com/#organization" }, inLanguage: "en",
  primaryImageOfPage: { "@type": "ImageObject", contentUrl: "https://anwellup.com" + heroImage, width: 1440, height: 960, caption: "Illustration of aluminium foil rolls, foil sheets and baking paper; not a photograph of a particular model." },
  mainEntity: { "@type": "ItemList", name: "Food packaging categories", numberOfItems: homeCategories.length, itemListElement: homeCategories.map((category, index) => ({ "@type": "ListItem", position: index + 1, name: categoryNames[category.id], url: "https://anwellup.com/products/" + category.slug + "/" })) },
};

export default function HomePage() {
  return <ScrollMotion variant="home"><main id="main-content" className="editorial-home home-refresh">
    <JsonLd data={homepageSchema} />
    <section className="cinema-hero home-hero" aria-labelledby="home-title">
      <div className="cinema-copy home-hero-copy">
        <span className="eyebrow">For distributors &amp; foodservice</span>
        <h1 id="home-title"><span className="title-mask"><span>Wholesale food</span></span>{" "}<span className="title-mask"><span>packaging.</span></span></h1>
        <p className="home-hero-promise">Build a range around the way your customers serve.</p>
        <p>Compare aluminium foil rolls, baking paper, takeaway containers and everyday foodservice supplies. Bring models, packing and destination requirements together in one buying brief.</p>
        <div className="procurement-actions"><Link className="button button-dark" href="/contact/#send-enquiry">Request a quote <ArrowUpRight size={18} aria-hidden="true" /></Link><a className="button button-outline" href="#priority-range">Explore products <ArrowDown size={18} aria-hidden="true" /></a></div>
        <Link className="home-distributor-link" href="/distributors/">Buying for distribution? See sourcing support <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
      <figure className="home-hero-visual">
        <img className="home-hero-image" src={heroImage} srcSet="/images/seo/foil-roll-sheets-parchment-640.webp 640w, /images/seo/foil-roll-sheets-parchment-960.webp 960w, /images/seo/foil-roll-sheets-parchment-1440.webp 1440w" sizes="(max-width: 820px) 100vw, 48vw" alt="Illustration of a catering foil roll, pre-cut foil sheets and baking paper in a food tray" width={1440} height={960} fetchPriority="high" />
        <figcaption><span>Foil, wraps &amp; baking paper</span><span>Range illustration</span></figcaption>
      </figure>
    </section>
    <aside className="home-catalogue-scope" aria-label="Published catalogue scope">
      <p>One catalogue.<br/><strong>A model-level starting point.</strong></p>
      <dl><div><dt>{catalogCategories.length}</dt><dd>Product categories</dd></div><div><dt>{productFamilies.length}</dt><dd>Product families</dd></div><div><dt>{modelCount}</dt><dd>Model references</dd></div></dl>
      <span>Availability, specifications and terms<br/>confirmed for the selected model.</span>
    </aside>
    <section className="sourcing-section home-sourcing" id="priority-range" aria-labelledby="priority-range-title">
      <header><span className="eyebrow">Start with a focused range</span><h2 id="priority-range-title">Foil, baking paper<br/>&amp; food containers.</h2><p>Compare the published references for three everyday foodservice ranges. Start with the model, then review the complete pack.</p></header>
      <SourcingCollections compact />
      <div className="home-distributor-callout"><div><span className="eyebrow">For your next assortment</span><h3>A clearer way to source your range.</h3><p>Compare model specifications, case quantities and destination requirements before requesting a quotation.</p></div><Link className="button" href="/distributors/">Distributor sourcing <ArrowUpRight size={19} aria-hidden="true" /></Link></div>
      <nav className="home-category-index" aria-labelledby="home-category-index-title"><h3 id="home-category-index-title">Explore all {catalogCategories.length} product categories</h3><ul>{homeCategories.map(category => <li key={category.id}><Link href={"/products/" + category.slug + "/"}><span>{categoryNames[category.id]}</span><ArrowUpRight size={18} aria-hidden="true" /></Link></li>)}</ul></nav>
    </section>
    <section className="collection-showcase" id="collection" aria-labelledby="collection-title">
      <header className="collection-heading"><div><span className="eyebrow">The complete foodservice range</span><h2 id="collection-title">For every way you serve.</h2><p>Explore the formats, then compare the models in each family.</p></div><a className="editorial-link" href="#buying-routes">Choose your buying route <span><ArrowDown size={20} aria-hidden="true" /></span></a></header>
      <div className="collection-track" tabIndex={0} role="region" aria-label="Product category illustrations; scroll horizontally or use left and right arrow keys to explore">
        <div className="collection-rail">{homeCategories.map(category => <Link className={"collection-panel " + (category.id === "bags" ? "collection-panel-bags" : "")} href={"/products/" + category.slug + "/"} key={category.id}>
          <div className="collection-image"><img src={category.image} alt={category.id === "bags" ? "Carry and shopping bag product range" : categoryNames[category.id] + " range illustration"} width={category.id === "bags" ? 640 : 1448} height={category.id === "bags" ? 480 : 1086} loading="lazy" decoding="async" /></div>
          <div className="collection-label"><h3>{categoryNames[category.id]}</h3><ArrowUpRight size={25} aria-hidden="true" /></div><p>{category.editorial}</p>
        </Link>)}</div>
      </div>
      <div className="collection-progress" aria-hidden="true"><span /></div>
    </section>
    <section className="home-buying-routes" id="buying-routes" aria-labelledby="buying-routes-title">
      <header><span className="eyebrow">Start with your business</span><h2 id="buying-routes-title">Who are you<br/>buying for?</h2><p>Different channels need different briefs. Follow the route that matches your assortment, menu or retail pack.</p></header>
      <div>{buyingRoutes.map((route, index) => <article key={route.href} data-reveal><span className="home-route-number">0{index + 1}</span><h3>{route.title}</h3><p>{route.body}</p><Link href={route.href}>{route.action}<ArrowUpRight size={19} aria-hidden="true" /></Link></article>)}</div>
    </section>
    <section className="collaboration-section home-buying-steps" aria-labelledby="collaboration-title">
      <header><span className="eyebrow">A practical sourcing process</span><h2 id="collaboration-title">From shortlist<br/>to quotation.</h2><p>Use the same model references and order details through selection, sample review and quotation.</p></header>
      <ol>{steps.map((step, index) => <li data-reveal key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p><Link href={step.href}>{step.action}<ArrowUpRight size={17} aria-hidden="true" /></Link></li>)}</ol>
      <div className="collaboration-links"><a href="/downloads/ANWELLUP_Product_Catalogue_2026.pdf" download data-analytics-event="catalog_download" data-analytics-location="homepage">Download product catalogue <ArrowDown size={17} aria-hidden="true" /></a><Link href="/materials/">Compare materials &amp; complete packs <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      <nav className="home-material-links" aria-label="Compare packaging materials"><span>Compare by material</span>{materialPages.map(material => <Link key={material.slug} href={"/materials/" + material.slug + "/"}>{material.name}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}</nav>
    </section>
    <section className="brand-studio home-customization" aria-labelledby="studio-title">
      <figure className="studio-image"><img src="/assets/generated/scenes/customization-oem.webp" alt="Packaging design illustration with printed sleeves and material swatches" width={1003} height={1568} loading="lazy" /><figcaption>Packaging design illustration</figcaption></figure>
      <div className="studio-copy" data-reveal><span className="eyebrow">Custom packaging</span><h2 id="studio-title">Your format.<br/>Your brand.</h2><p>Review printing, sleeves, labels and packing for your selected model. Bring artwork and sample objectives into the brief from the start.</p><dl><div><dt>Format</dt><dd>Material, dimensions &amp; matching components</dd></div><div><dt>Artwork</dt><dd>Print surface, colour &amp; layout</dd></div><div><dt>Approval</dt><dd>Sample purpose, packing &amp; project details</dd></div></dl><Link className="editorial-link" href="/capabilities/">Explore customization <span><ArrowUpRight size={20} aria-hidden="true" /></span></Link></div>
    </section>
    <section className="home-guides" aria-labelledby="home-guides-title">
      <header><span className="eyebrow">Useful buying references</span><h2 id="home-guides-title">Answers for<br/>your next brief.</h2><p>Use product comparisons and practical checklists to prepare a more complete enquiry.</p><Link className="editorial-link" href="/guides/">All buying guides <span><ArrowRight size={19} aria-hidden="true" /></span></Link></header>
      <ol>{priorityBuyingGuides.map((guide, index) => <li data-reveal key={guide.slug}><span>0{index + 1}</span><Link href={"/guides/" + guide.slug + "/"}><h3>{guide.shortTitle}</h3><ArrowUpRight size={20} aria-hidden="true" /></Link><p>{guide.description}</p></li>)}</ol>
    </section>
    <section className="home-buyer-questions" aria-labelledby="home-questions-title"><header><span className="eyebrow">Before you enquire</span><h2 id="home-questions-title">A few useful answers.</h2></header><div>{questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p><Link href={item.href}>{item.action}<ArrowUpRight size={17} aria-hidden="true" /></Link></details>)}</div></section>
    <section className="production-intro home-equipment" aria-labelledby="production-title">
      <div className="production-copy"><span className="eyebrow">A separate project route</span><h2 id="production-title">Manufacturing<br/>&amp; equipment.</h2><p>Explore aluminium container lines, forming moulds and collection equipment. Discuss the configuration and scope for your equipment project.</p><Link className="editorial-link" href="/manufacturing/">Explore production &amp; equipment <span><ArrowUpRight size={20} aria-hidden="true" /></span></Link></div>
      <figure><img src="/assets/manufacturing/2026-09-clean/factory-overview-signage-removed-v2.webp" alt="Aluminium packaging facility exterior from the supplied catalogue" width={1770} height={889} loading="lazy" /><figcaption>Supplied catalogue photograph. Identifying rooftop signage removed; facility relationship confirmed per project.</figcaption></figure>
    </section>
    <section className="editorial-closing home-next-order" aria-labelledby="home-next-order-title"><div><span className="eyebrow">Your next order starts with a clear brief</span><h2 id="home-next-order-title">Tell us what<br/>you need to source.</h2><p>Start with the format, quantity and destination. Add models to your RFQ list or describe the closest packaging you need.</p></div><OpenInquiryButton className="button button-dark">Build your RFQ <ArrowUpRight size={21} aria-hidden="true" /></OpenInquiryButton></section>
  </main></ScrollMotion>;
}
