import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  Check,
  CopySimple,
  DownloadSimple,
  List,
  MagnifyingGlass,
  Minus,
  Package,
  Plus,
  ShoppingCartSimple,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  analyticsConfigured,
  getAnalyticsConsent,
  setAnalyticsConsent,
  trackEvent,
  type AnalyticsConsent,
} from "./analytics";
import { categories, products, type CategoryId, type Product } from "./data";

type ActiveCategory = "all" | CategoryId;
const WHATSAPP_NUMBER = "8613202830014";
const WHATSAPP_DISPLAY = "+86 132 0283 0014";
const GENERAL_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello ANWELLUP, I would like to learn more about your food packaging products.",
)}`;

type PageMeta = {
  title: string;
  description: string;
  structuredData: Record<string, unknown>;
};

type InformationPage = {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: Array<{ title: string; body: string }>;
  note?: string;
};

const informationPages: Record<string, InformationPage> = {
  "/about/": {
    eyebrow: "About ANWELLUP",
    title: "A clearer way to source food packaging.",
    introduction:
      "ANWELLUP organizes a broad food-packaging range around the details professional buyers need to compare: material, format, dimensions, case pack and intended application.",
    sections: [
      {
        title: "Built around the buying brief",
        body: "Start with the food application, destination market, channel and expected quantity. We use that context to narrow the range before commercial terms are discussed.",
      },
      {
        title: "A multi-material view",
        body: "Plant fiber, paper and kraft, aluminium, clear formats and selected handling essentials can be reviewed in one catalogue and combined in one inquiry.",
      },
      {
        title: "Specific before persuasive",
        body: "Product specifications and market claims are confirmed against the selected SKU. This keeps early conversations useful without presenting unverified statements as fact.",
      },
    ],
    note: "Company registration details, facilities and verified certifications will be added only after the corresponding records are available for review.",
  },
  "/quality-compliance/": {
    eyebrow: "Quality + compliance",
    title: "The product, document and destination must align.",
    introduction:
      "Food-contact and sustainability requirements vary by material, product construction and destination market. ANWELLUP treats compliance as a SKU-level confirmation, not a blanket website claim.",
    sections: [
      {
        title: "01 — Confirm the specification",
        body: "We begin with the exact item, dimensions, material, case pack and intended food application shown in the inquiry.",
      },
      {
        title: "02 — Review the destination",
        body: "The destination market and buyer requirements determine which declarations, test reports or supporting documents should be checked.",
      },
      {
        title: "03 — Match the available records",
        body: "Applicable documents are reviewed against the requested SKU and current validity before any written claim is made.",
      },
      {
        title: "04 — Confirm in writing",
        body: "Specifications, availability and commercial terms remain subject to written confirmation for the final order configuration.",
      },
    ],
    note: "Ask us which supporting documents are available for the exact products and destination in your brief.",
  },
  "/samples-ordering/": {
    eyebrow: "Samples + ordering",
    title: "Move from product list to an actionable brief.",
    introduction:
      "Use the catalogue and inquiry builder to send the products you are evaluating. Sample availability, minimum quantities, lead time and freight are confirmed for the selected range.",
    sections: [
      {
        title: "01 — Share the application",
        body: "Tell us the food use, destination market, sales channel and expected quantity so the request can be reviewed in context.",
      },
      {
        title: "02 — Align the range",
        body: "We compare the selected SKUs, materials, sizes and case packs and identify any information still needed.",
      },
      {
        title: "03 — Confirm samples",
        body: "Sample availability, quantities and freight arrangements are confirmed before dispatch. No universal sample promise is assumed across the catalogue.",
      },
      {
        title: "04 — Confirm commercial terms",
        body: "MOQ, quotation basis, lead time, artwork requirements and packing details are confirmed in writing for the agreed configuration.",
      },
    ],
    note: "Adding SKU references to your message is the fastest way to begin a useful review.",
  },
  "/contact/": {
    eyebrow: "Contact sales",
    title: "Send a brief we can act on.",
    introduction:
      "For the quickest product review, include the SKU or format, destination market, application and estimated quantity in your WhatsApp message.",
    sections: [
      { title: "Product", body: "Add the relevant SKU, format, capacity or dimensions." },
      { title: "Market", body: "Tell us the destination country or region and the intended sales channel." },
      { title: "Quantity", body: "Share an estimated order or annual volume if it is already available." },
      { title: "Timing", body: "Add the target delivery window or sample deadline where relevant." },
    ],
    note: "Email contact will be published after a domain-based mailbox has been configured and verified.",
  },
  "/privacy/": {
    eyebrow: "Privacy",
    title: "How this website handles information.",
    introduction:
      "This notice describes the current public website. It will be updated when new data collection or contact services are introduced.",
    sections: [
      {
        title: "Inquiry selections",
        body: "The products you add to the inquiry list are stored locally in your browser so the list can remain available. They are not sent to ANWELLUP until you choose to open WhatsApp or copy the message.",
      },
      {
        title: "WhatsApp",
        body: "When you follow a WhatsApp link, your interaction is handled by WhatsApp under its own terms and privacy practices. Review the message before sending it.",
      },
      {
        title: "Optional analytics",
        body: "If analytics services are configured, they load only after you accept optional analytics. The website does not intentionally send names, telephone numbers or inquiry-message content to analytics tools.",
      },
      {
        title: "Hosting records",
        body: "The hosting and network providers may process standard technical logs needed to deliver and secure the website.",
      },
    ],
    note: "Last updated: 3 September 2026.",
  },
  "/terms/": {
    eyebrow: "Website terms",
    title: "Website information is a starting point, not a final specification.",
    introduction:
      "By using this website, you acknowledge that catalogue information supports initial product selection and does not replace a written quotation, approved sample or final specification.",
    sections: [
      {
        title: "Product information",
        body: "Dimensions, materials, case packs, images and availability may require confirmation for the exact SKU and order configuration.",
      },
      {
        title: "Claims and suitability",
        body: "Food-contact, sustainability and destination-market claims must be confirmed against the relevant product records and intended use.",
      },
      {
        title: "Commercial terms",
        body: "Pricing, minimum quantities, tooling, samples, lead time, payment and shipment terms apply only when provided in a current written quotation.",
      },
      {
        title: "External services",
        body: "Links to WhatsApp and other external services are provided for convenience and are governed by those services' own terms.",
      },
    ],
    note: "Last updated: 3 September 2026.",
  },
};

const pageDescriptions: Record<string, { title: string; description: string }> = {
  "/": {
    title: "ANWELLUP | Sustainable Food Packaging for B2B Buyers",
    description:
      "Explore 63 food-packaging products across plant fiber, paper, aluminium, clear formats and handling essentials. Build one structured B2B inquiry.",
  },
  "/about/": {
    title: "About ANWELLUP | Food Packaging Sourcing",
    description: "Learn how ANWELLUP structures multi-material food-packaging enquiries for professional buyers.",
  },
  "/quality-compliance/": {
    title: "Quality & Compliance | ANWELLUP",
    description: "See how product specifications, supporting documents and destination-market requirements are aligned before confirmation.",
  },
  "/samples-ordering/": {
    title: "Samples & Ordering | ANWELLUP",
    description: "Understand the ANWELLUP product review, sample, quotation and order-confirmation workflow.",
  },
  "/contact/": {
    title: "Contact ANWELLUP | WhatsApp Product Enquiries",
    description: `Contact ANWELLUP on WhatsApp at ${WHATSAPP_DISPLAY} with product SKUs, destination and estimated quantity.`,
  },
  "/privacy/": {
    title: "Privacy | ANWELLUP",
    description: "Read how the ANWELLUP website handles inquiry selections, optional analytics and external WhatsApp links.",
  },
  "/terms/": {
    title: "Website Terms | ANWELLUP",
    description: "Read the terms applying to ANWELLUP catalogue information, product claims and commercial enquiries.",
  },
  "/404/": {
    title: "Page not found | ANWELLUP",
    description: "The requested ANWELLUP page could not be found.",
  },
};

function normalizePathname(pathname: string) {
  if (pathname === "/" || pathname === "/404.html") return pathname === "/404.html" ? "/404/" : "/";
  const clean = `/${pathname.split("?")[0].split("#")[0].replace(/^\/+|\/+$/g, "")}/`;
  return pageDescriptions[clean] ? clean : "/404/";
}

export function getPageMeta(pathname: string): PageMeta {
  const normalizedPath = normalizePathname(pathname);
  const copy = pageDescriptions[normalizedPath] ?? pageDescriptions["/404/"];
  const url = `https://anwellup.com${normalizedPath === "/404/" ? pathname : normalizedPath}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": "https://anwellup.com/#organization",
      name: "ANWELLUP",
      url: "https://anwellup.com/",
      logo: "https://anwellup.com/assets/brand/logo-primary.svg",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: WHATSAPP_DISPLAY,
        contactType: "sales",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://anwellup.com/#website",
      url: "https://anwellup.com/",
      name: "ANWELLUP",
      publisher: { "@id": "https://anwellup.com/#organization" },
      inLanguage: "en",
    },
  ];

  if (normalizedPath !== "/") {
    graph.push({
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: copy.title,
      description: copy.description,
      isPartOf: { "@id": "https://anwellup.com/#website" },
      about: { "@id": "https://anwellup.com/#organization" },
      inLanguage: "en",
    });
  }

  return {
    ...copy,
    structuredData: {
      "@context": "https://schema.org",
      "@graph": graph,
    },
  };
}

const capabilities = [
  ["Format development", "Existing formats or a new size aligned to the application."],
  ["Surface + coating", "Color, barrier and functional finish for the selected material."],
  ["Brand application", "Printing, embossing, sleeves, labels and retail presentation."],
  ["Export configuration", "Case pack, carton marks and shipment-ready documentation."],
];

const workflow = [
  ["Requirements", "Market, channel and product use"],
  ["Range alignment", "SKU, material and sizing"],
  ["Sample approval", "Fit, appearance and specification"],
  ["Artwork + pack", "Branding, carton and labels"],
  ["Production + QC", "Checkpoints and final pack"],
  ["Export handoff", "Documents and shipment coordination"],
];

const storyWords =
  "We transform plant fiber by-products into strong, reliable packaging engineered for the real demands of a global food supply chain.".split(
    " ",
  );

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProductCard({
  product,
  selected,
  onToggle,
}: {
  product: Product;
  selected: boolean;
  onToggle: (sku: string) => void;
}) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          className="product-image"
          src={product.image}
          alt={`${product.name}, ${product.sku}`}
          width={900}
          height={675}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>
      <div className="product-card-body">
        <div className="product-identity">
          <span>{product.sku}</span>
          <span>{product.family}</span>
        </div>
        <h3>{product.name}</h3>
        <dl className="spec-grid">
          <div>
            <dt>Material</dt>
            <dd>{product.material}</dd>
          </div>
          <div>
            <dt>Size</dt>
            <dd>{product.size}</dd>
          </div>
          <div>
            <dt>Dimensions</dt>
            <dd>{product.dimensions}</dd>
          </div>
          <div>
            <dt>Case pack</dt>
            <dd>{product.casePack}</dd>
          </div>
        </dl>
        <button
          className={`product-add ${selected ? "is-selected" : ""}`}
          type="button"
          onClick={() => onToggle(product.sku)}
          aria-pressed={selected}
        >
          <span>{selected ? "Added to inquiry" : "Add to inquiry"}</span>
          <span className="button-icon">
            {selected ? <Check size={17} weight="bold" /> : <Plus size={17} weight="bold" />}
          </span>
        </button>
      </div>
    </article>
  );
}

function InquiryDrawer({
  open,
  selectedProducts,
  onClose,
  onRemove,
  onClear,
}: {
  open: boolean;
  selectedProducts: Product[];
  onClose: () => void;
  onRemove: (sku: string) => void;
  onClear: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [buyer, setBuyer] = useState({ name: "", company: "", market: "", quantity: "" });

  const message = useMemo(
    () =>
      [
        "Hello ANWELLUP,",
        "",
        "I would like to request a quotation for:",
        ...selectedProducts.map((product) => `- ${product.sku} | ${product.name} | ${product.size}`),
        "",
        `Name: ${buyer.name || "Not provided"}`,
        `Company: ${buyer.company || "Not provided"}`,
        `Destination market: ${buyer.market || "Not provided"}`,
        `Estimated quantity: ${buyer.quantity || "To be discussed"}`,
        "",
        "Please share availability and the commercial terms applicable to this request. Thank you.",
      ].join("\n"),
    [buyer, selectedProducts],
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, open]);

  const copyInquiry = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyState("copied");
      trackEvent("inquiry_copy", { item_count: selectedProducts.length });
    } catch {
      setCopyState("error");
    }
    window.setTimeout(() => setCopyState("idle"), 2200);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            className="drawer-backdrop"
            type="button"
            aria-label="Close inquiry list"
            onClick={onClose}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="inquiry-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-title"
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="drawer-header">
              <div>
                <span>Inquiry list</span>
                <h2 id="inquiry-title">Build one clear request.</h2>
              </div>
              <button type="button" onClick={onClose} aria-label="Close inquiry list">
                <X size={21} />
              </button>
            </div>

            {selectedProducts.length === 0 ? (
              <div className="drawer-empty">
                <Package size={36} weight="light" />
                <h3>No products selected</h3>
                <p>Add products from the range, then copy the complete inquiry when it is ready.</p>
                <button
                  className="drawer-text-link"
                  type="button"
                  onClick={() => {
                    onClose();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Browse products <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <>
                <div className="drawer-list">
                  {selectedProducts.map((product) => (
                    <div className="drawer-item" key={product.sku}>
                      <img src={product.image} alt="" width={900} height={675} loading="lazy" decoding="async" />
                      <div>
                        <span>{product.sku}</span>
                        <strong>{product.name}</strong>
                        <small>{product.size}</small>
                      </div>
                      <button type="button" onClick={() => onRemove(product.sku)} aria-label={`Remove ${product.sku}`}>
                        <Minus size={17} />
                      </button>
                    </div>
                  ))}
                </div>
                <form className="drawer-actions" onSubmit={(event) => event.preventDefault()}>
                  <fieldset className="buyer-fields">
                    <legend>Help us qualify the request</legend>
                    <label>
                      <span>Your name</span>
                      <input
                        name="name"
                        value={buyer.name}
                        onChange={(event) => setBuyer((current) => ({ ...current, name: event.target.value }))}
                        autoComplete="name"
                        required
                      />
                    </label>
                    <label>
                      <span>Company</span>
                      <input
                        name="company"
                        value={buyer.company}
                        onChange={(event) => setBuyer((current) => ({ ...current, company: event.target.value }))}
                        autoComplete="organization"
                        required
                      />
                    </label>
                    <label>
                      <span>Destination market</span>
                      <input
                        name="market"
                        value={buyer.market}
                        onChange={(event) => setBuyer((current) => ({ ...current, market: event.target.value }))}
                        placeholder="Country or region"
                        required
                      />
                    </label>
                    <label>
                      <span>Estimated quantity</span>
                      <input
                        name="quantity"
                        value={buyer.quantity}
                        onChange={(event) => setBuyer((current) => ({ ...current, quantity: event.target.value }))}
                        placeholder="Optional"
                      />
                    </label>
                  </fieldset>
                  <p>
                    Each SKU and size is included. Specifications and commercial terms remain subject to written
                    confirmation.
                  </p>
                  <a
                    className="whatsapp-inquiry"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => {
                      const form = event.currentTarget.closest("form");
                      if (form && !form.reportValidity()) {
                        event.preventDefault();
                        return;
                      }
                      trackEvent("inquiry_whatsapp_click", { item_count: selectedProducts.length });
                    }}
                  >
                    <WhatsappLogo size={21} weight="fill" />
                    Send via WhatsApp
                  </a>
                  <button className="copy-inquiry" type="button" onClick={() => void copyInquiry()}>
                    {copyState === "copied" ? <Check size={20} weight="bold" /> : <CopySimple size={20} weight="bold" />}
                    {copyState === "copied"
                      ? "Inquiry copied"
                      : copyState === "error"
                        ? "Copy failed — select WhatsApp"
                        : "Copy inquiry details"}
                  </button>
                  <button type="button" onClick={onClear}>Clear list</button>
                </form>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function PersistentInquiry({ count, onOpen }: { count: number; onOpen: () => void }) {
  return (
    <div className="persistent-inquiry" aria-label="Inquiry builder">
      <button className="inquiry-console-main" type="button" onClick={onOpen}>
        <span className="console-icon"><Package size={22} weight="light" /></span>
        <span className="console-label">Build your inquiry</span>
        <strong>{count} {count === 1 ? "item" : "items"}</strong>
      </button>
      <button
        className="inquiry-console-search"
        type="button"
        aria-label="Browse products"
        onClick={() => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}
      >
        <MagnifyingGlass size={23} weight="light" />
      </button>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <a href="/" aria-label="ANWELLUP home">
        <img src="/assets/brand/logo-primary.svg" alt="ANWELLUP" />
      </a>
      <div>
        <span>Product range</span>
        <a href="/#materials">Materials</a>
        <a href="/#products">Products</a>
        <a href="/#customization">Customization</a>
      </div>
      <div>
        <span>Buyer information</span>
        <a href="/about/">About</a>
        <a href="/quality-compliance/">Quality + compliance</a>
        <a href="/samples-ordering/">Samples + ordering</a>
        <a href="/contact/">Contact</a>
      </div>
      <div>
        <span>WhatsApp</span>
        <a
          href={GENERAL_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("whatsapp_click", { placement: "footer" })}
        >
          {WHATSAPP_DISPLAY}
        </a>
        <nav className="legal-links" aria-label="Legal">
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
        </nav>
      </div>
      <p>Product specifications, certifications and destination-market claims require written confirmation.</p>
    </footer>
  );
}

function CookieConsent() {
  const [choice, setChoice] = useState<AnalyticsConsent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChoice(getAnalyticsConsent());
    setReady(true);
  }, []);

  if (!analyticsConfigured || !ready || choice) return null;

  const choose = (nextChoice: Exclude<AnalyticsConsent, null>) => {
    setAnalyticsConsent(nextChoice);
    setChoice(nextChoice);
  };

  return (
    <aside className="consent-banner" aria-label="Analytics choice">
      <p>
        We use essential browser storage for your inquiry list. Optional analytics help us understand product interest.
        <a href="/privacy/"> Read the privacy notice</a>.
      </p>
      <div>
        <button type="button" onClick={() => choose("essential")}>Essential only</button>
        <button type="button" onClick={() => choose("accepted")}>Accept analytics</button>
      </div>
    </aside>
  );
}

function InformationHeader() {
  return (
    <header className="information-header">
      <a className="brand-link" href="/" aria-label="ANWELLUP home">
        <img src="/assets/brand/logo-primary.svg" alt="ANWELLUP" />
      </a>
      <nav aria-label="Information pages">
        <a href="/#products">Products</a>
        <a href="/quality-compliance/">Quality</a>
        <a href="/samples-ordering/">Ordering</a>
        <a href="/contact/">Contact</a>
      </nav>
      <a
        className="information-whatsapp"
        href={GENERAL_WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("whatsapp_click", { placement: "information_header" })}
      >
        <WhatsappLogo size={18} weight="fill" /> WhatsApp
      </a>
    </header>
  );
}

function InformationPage({ pathname }: { pathname: string }) {
  const page = informationPages[pathname];
  if (!page) return <NotFoundPage />;

  const isContact = pathname === "/contact/";

  return (
    <div className="site-shell information-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <InformationHeader />
      <main id="main-content" className="information-main">
        <header className="information-hero">
          <p>{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <div>
            <p>{page.introduction}</p>
            <a href="/">Back to product range <ArrowRight size={18} /></a>
          </div>
        </header>
        <section className="information-grid" aria-label={`${page.eyebrow} details`}>
          {page.sections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>
        <section className="information-callout">
          <p>{page.note}</p>
          {isContact ? (
            <a
              href={GENERAL_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", { placement: "contact_callout" })}
            >
              <WhatsappLogo size={20} weight="fill" /> Message {WHATSAPP_DISPLAY}
            </a>
          ) : (
            <a href="/contact/">Continue to contact <ArrowRight size={18} /></a>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="site-shell information-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <InformationHeader />
      <main id="main-content" className="not-found">
        <p>404</p>
        <h1>This page is not in the catalogue.</h1>
        <p>The address may have changed, or the page may no longer be available.</p>
        <a href="/">Return to the product range <ArrowRight size={18} /></a>
      </main>
      <SiteFooter />
    </div>
  );
}

function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inquiryStorageReady = useRef(false);
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedSkus, setSelectedSkus] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [product.sku, product.name, product.family, product.material, product.size]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const visibleProducts =
    activeCategory === "all" && query.trim() === "" && !showAll ? filteredProducts.slice(0, 8) : filteredProducts;
  const selectedProducts = selectedSkus
    .map((sku) => products.find((product) => product.sku === sku))
    .filter((product): product is Product => Boolean(product));

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("anwellup_inquiry_skus");
      if (stored) {
        const parsed = JSON.parse(stored) as unknown;
        if (Array.isArray(parsed)) {
          setSelectedSkus(parsed.filter((sku): sku is string => typeof sku === "string" && products.some((product) => product.sku === sku)));
        }
      }
    } catch {
      window.localStorage.removeItem("anwellup_inquiry_skus");
    } finally {
      inquiryStorageReady.current = true;
    }
  }, []);

  useEffect(() => {
    if (!inquiryStorageReady.current) return;
    window.localStorage.setItem("anwellup_inquiry_skus", JSON.stringify(selectedSkus));
  }, [selectedSkus]);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    let disposeMotion = () => {};

    // Keep first paint independent from GSAP parsing, then attach the complete
    // motion system on the next frame without changing any animation behavior.
    const frame = window.requestAnimationFrame(() => {
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
        ([{ default: gsap }, { ScrollTrigger }]) => {
          if (cancelled) return;

          gsap.registerPlugin(ScrollTrigger);
          let revertMedia = () => {};
          const context = gsap.context(() => {
            const mm = gsap.matchMedia();
            revertMedia = () => mm.revert();

            mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
              gsap.from(".hero-title-line > span", {
                yPercent: 115,
                opacity: 0,
                duration: 1.25,
                stagger: 0.12,
                ease: "power4.out",
              });
              gsap.from(".hero-support, .hero-story-link", {
                y: 28,
                opacity: 0,
                duration: 0.9,
                stagger: 0.13,
                delay: 0.35,
                ease: "power3.out",
              });
              gsap.to(".hero-photo", {
                scale: 1.08,
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: ".cinematic-hero",
                  start: "top top",
                  end: "bottom top",
                  scrub: 1.2,
                },
              });
              gsap.fromTo(
                ".material-story-image",
                { scale: 0.86, opacity: 0.72 },
                {
                  scale: 1.04,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: ".material-story",
                    start: "top 85%",
                    end: "bottom 25%",
                    scrub: 1.1,
                  },
                },
              );
              gsap.to(".material-story-word", {
                opacity: 1,
                stagger: 0.05,
                ease: "none",
                scrollTrigger: {
                  trigger: ".material-story-copy",
                  start: "top 72%",
                  end: "bottom 42%",
                  scrub: 0.8,
                },
              });

              const track = document.querySelector<HTMLElement>(".materials-track");
              if (track) {
                const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
                gsap.to(track, {
                  x: () => -distance(),
                  ease: "none",
                  scrollTrigger: {
                    trigger: ".materials-showcase",
                    start: "top top",
                    end: () => `+=${distance() + 420}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                  },
                });
              }

              gsap.utils.toArray<HTMLElement>(".process-item").forEach((item, index) => {
                gsap.from(item, {
                  y: 70,
                  opacity: 0,
                  duration: 0.9,
                  delay: index * 0.03,
                  ease: "power3.out",
                  scrollTrigger: { trigger: item, start: "top 88%" },
                });
              });
            });
          }, rootRef);

          disposeMotion = () => {
            revertMedia();
            context.revert();
          };
        },
      );
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      disposeMotion();
    };
  }, [reduceMotion]);

  const toggleProduct = (sku: string) => {
    setSelectedSkus((current) => {
      const selected = current.includes(sku);
      const product = products.find((item) => item.sku === sku);
      trackEvent(selected ? "remove_from_inquiry" : "add_to_inquiry", {
        sku,
        category: product?.category,
      });
      return selected ? current.filter((item) => item !== sku) : [...current, sku];
    });
  };

  const selectCategory = (category: ActiveCategory) => {
    setActiveCategory(category);
    setQuery("");
    setShowAll(category !== "all");
    trackEvent("category_filter", { category });
  };

  const browseCategory = (category: CategoryId) => {
    selectCategory(category);
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const openInquiry = (placement: string) => {
    trackEvent("inquiry_open", { placement, item_count: selectedSkus.length });
    setDrawerOpen(true);
  };

  return (
    <div className="site-shell" ref={rootRef}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="cinematic-header">
        <a className="brand-link" href="#top" aria-label="ANWELLUP home" onClick={closeMobileMenu}>
          <img src="/assets/brand/logo-primary.svg" alt="ANWELLUP" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#materials">Materials</a>
          <a href="#products">Products</a>
          <a href="#customization">Customization</a>
          <a href="#process">Process</a>
        </nav>
        <div className="header-actions">
          <a
            className="download-link"
            href="/downloads/ANWELLUP_Product_Catalogue_2026.pdf"
            download
            onClick={() => trackEvent("catalog_download", { placement: "header" })}
          >
            <DownloadSimple size={17} /> Download catalogue
          </a>
          <button className="header-inquiry" type="button" onClick={() => openInquiry("header")}>
            <ShoppingCartSimple size={17} />
            Build inquiry
            {selectedSkus.length > 0 && <span>{selectedSkus.length}</span>}
          </button>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            {["Materials", "Products", "Customization", "Process"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMobileMenu}>{item}</a>
            ))}
            <a
              href="/downloads/ANWELLUP_Product_Catalogue_2026.pdf"
              download
              onClick={() => {
                closeMobileMenu();
                trackEvent("catalog_download", { placement: "mobile_menu" });
              }}
            >
              Download catalogue
            </a>
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="main-content">
        <section className="cinematic-hero" id="top">
          <img
            className="hero-photo"
            src="/assets/generated/cinematic/hero-regenerative-cinema.webp"
            alt="ANWELLUP sustainable food packaging on a sculptural material platform"
            width={1672}
            height={941}
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-vignette" />
          <div className="hero-content">
            <h1>
              <span className="hero-title-line"><span>Made to move.</span></span>
              <span className="hero-title-line"><span>Built to return.</span></span>
            </h1>
            <p className="hero-support">Premium food packaging.<br />Made from renewable resources.</p>
            <a className="hero-story-link" href="#material-story">
              See the material story <span><ArrowRight size={19} /></span>
            </a>
          </div>
          <a className="hero-scroll" href="#material-story" aria-label="Scroll to material story">
            <ArrowDown size={19} />
          </a>
        </section>

        <section className="material-story" id="material-story">
          <img
            className="material-story-image"
            src="/assets/generated/cinematic/fiber-macro-regenerative.webp"
            alt="Extreme close-up of molded plant-fiber packaging"
            width={1672}
            height={941}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          <div className="material-story-shade" />
          <div className="material-story-copy">
            <h2>From waste<br />to workhorse.</h2>
            <p>
              {storyWords.map((word, index) => (
                <span className="material-story-word" key={`${word}-${index}`}>{word} </span>
              ))}
            </p>
            <a href="#materials">Explore every material <ArrowDownRight size={19} /></a>
          </div>
        </section>

        <div className="material-marquee" aria-hidden="true">
          <div>
            {[...categories, ...categories].map((category, index) => (
              <span key={`${category.id}-${index}`}>{category.label}<i>•</i></span>
            ))}
          </div>
        </div>

        <section className="materials-showcase" id="materials">
          <div className="materials-heading">
            <p>One material is never the answer to every job.</p>
            <h2>Choose by performance,<br />market and end use.</h2>
          </div>
          <div className="materials-track">
            {categories.map((category) => (
              <article className="material-panel" key={category.id}>
                <img
                  src={category.image}
                  alt={`${category.label} packaging`}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
                <div className="material-panel-copy">
                  <span>{products.filter((product) => product.category === category.id).length} products</span>
                  <h3>{category.label}</h3>
                  <p>{category.description}</p>
                  <button type="button" onClick={() => browseCategory(category.id)}>
                    View the range <span><ArrowRight size={18} /></span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="products-section" id="products">
          <Reveal className="products-intro">
            <div>
              <p>Build the list around the real application.</p>
              <h2>Find the format.<br />Start the conversation.</h2>
            </div>
            <p>Search every SKU, combine materials and build one structured product inquiry.</p>
          </Reveal>

          <div className="product-tools">
            <div className="category-tabs" role="group" aria-label="Product category filters">
              <button className={activeCategory === "all" ? "active" : ""} type="button" onClick={() => selectCategory("all")}>
                All products
              </button>
              {categories.map((category) => (
                <button
                  className={activeCategory === category.id ? "active" : ""}
                  type="button"
                  key={category.id}
                  onClick={() => selectCategory(category.id)}
                >
                  {category.shortLabel}
                </button>
              ))}
            </div>
            <label className="search-box">
              <MagnifyingGlass size={19} />
              <span className="sr-only">Search products</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onBlur={() => {
                  const searchTerm = query.trim();
                  if (searchTerm) trackEvent("product_search", { query_length: searchTerm.length, result_count: filteredProducts.length });
                }}
                placeholder="Search SKU, format or size"
              />
              {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>}
            </label>
          </div>

          <div className="results-meta">
            <span>Showing {visibleProducts.length} of {filteredProducts.length} matches</span>
            {selectedSkus.length > 0 && (
              <button type="button" onClick={() => openInquiry("results_meta")}>
                {selectedSkus.length} in inquiry <ArrowRight size={16} />
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <MagnifyingGlass size={30} />
              <h3>No matching products</h3>
              <p>Try a SKU prefix, material name or capacity.</p>
              <button type="button" onClick={() => { setQuery(""); selectCategory("all"); }}>Reset filters</button>
            </div>
          ) : (
            <motion.div className="product-grid" layout>
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product) => (
                  <motion.div
                    key={product.sku}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <ProductCard product={product} selected={selectedSkus.includes(product.sku)} onToggle={toggleProduct} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {activeCategory === "all" && query.trim() === "" && !showAll && (
            <button className="show-all-button" type="button" onClick={() => setShowAll(true)}>
              Show all 63 products <span><ArrowDown size={18} /></span>
            </button>
          )}
        </section>

        <section className="buyer-proof" aria-labelledby="buyer-proof-title">
          <div className="buyer-proof-intro">
            <p>Buyer-ready by design</p>
            <h2 id="buyer-proof-title">Compare the range.<br />Verify the details.</h2>
            <p>
              The catalogue gives your team a practical starting point. Final specifications, documents and
              commercial terms are aligned to the exact request before commitment.
            </p>
          </div>
          <dl className="range-facts">
            <div><dt>{products.length}</dt><dd>catalogued SKUs</dd></div>
            <div><dt>{categories.length}</dt><dd>material families</dd></div>
            <div><dt>01</dt><dd>consolidated inquiry</dd></div>
          </dl>
          <nav className="buyer-proof-links" aria-label="Buyer information">
            <a href="/about/"><span>Company + approach</span><ArrowRight size={19} /></a>
            <a href="/quality-compliance/"><span>Quality + compliance</span><ArrowRight size={19} /></a>
            <a href="/samples-ordering/"><span>Samples + ordering</span><ArrowRight size={19} /></a>
            <a href="/contact/"><span>Contact sales</span><ArrowRight size={19} /></a>
          </nav>
        </section>

        <section className="customization-section" id="customization">
          <div className="customization-image">
            <img
              src="/assets/generated/scenes/customization-oem.webp"
              alt="OEM packaging customization samples"
              width={1003}
              height={1568}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>
          <Reveal className="customization-copy">
            <p>Make the range yours.</p>
            <h2>Configured for the channel.<br />Resolved before production.</h2>
            <div className="capability-list">
              {capabilities.map(([title, body]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="process-section" id="process">
          <Reveal className="process-heading">
            <p>A clear commercial path from idea to shipment.</p>
            <h2>Every handoff<br />stays visible.</h2>
          </Reveal>
          <div className="process-grid">
            {workflow.map(([title, body], index) => (
              <article className="process-item" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <img
            src="/assets/generated/scenes/quality-alignment.webp"
            alt="Packaging quality inspection"
            width={1568}
            height={1003}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          <div className="final-cta-shade" />
          <Reveal className="final-cta-copy">
            <h2>Bring the brief.<br />Leave with a clear next step.</h2>
            <p>Choose the formats you need and send the whole range as one structured inquiry.</p>
            <button type="button" onClick={() => openInquiry("final_cta")}>
              Build your inquiry <span><ArrowRight size={19} /></span>
            </button>
          </Reveal>
        </section>
      </main>

      <SiteFooter />

      <motion.a
        className="whatsapp-float"
        href={GENERAL_WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label={`Chat with ANWELLUP on WhatsApp at ${WHATSAPP_DISPLAY}`}
        onClick={() => trackEvent("whatsapp_click", { placement: "floating_button" })}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
      >
        <WhatsappLogo size={23} weight="fill" />
        <span>WhatsApp</span>
      </motion.a>

      <PersistentInquiry count={selectedSkus.length} onOpen={() => openInquiry("persistent_console")} />
      <InquiryDrawer
        open={drawerOpen}
        selectedProducts={selectedProducts}
        onClose={() => setDrawerOpen(false)}
        onRemove={toggleProduct}
        onClear={() => setSelectedSkus([])}
      />
    </div>
  );
}

function App({ pathname = "/" }: { pathname?: string }) {
  const normalizedPath = normalizePathname(pathname);
  return (
    <>
      {normalizedPath === "/" ? <HomePage /> : <InformationPage pathname={normalizedPath} />}
      <CookieConsent />
    </>
  );
}

export default App;
