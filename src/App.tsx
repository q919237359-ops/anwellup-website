import { useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  Check,
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
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories, products, type CategoryId, type Product } from "./data";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "8618818283961";
type ActiveCategory = "all" | CategoryId;

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
          loading="lazy"
          decoding="async"
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
  const message = [
    "Hello ANWELLUP,",
    "",
    "I would like to request a quotation for:",
    ...selectedProducts.map((product) => `- ${product.sku} | ${product.name} | ${product.size}`),
    "",
    "Please share availability and commercial terms. Thank you.",
  ].join("\n");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

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
                <p>Add products from the range, then send the complete list through WhatsApp.</p>
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
                      <img src={product.image} alt="" />
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
                <div className="drawer-actions">
                  <p>
                    Each SKU and size is included. Specifications and commercial terms remain subject to written
                    confirmation.
                  </p>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    <WhatsappLogo size={20} weight="fill" />
                    Send via WhatsApp
                  </a>
                  <button type="button" onClick={onClear}>Clear list</button>
                </div>
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

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
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

  useGSAP(
    () => {
      if (reduceMotion) return;
      const mm = gsap.matchMedia();

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

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [reduceMotion] },
  );

  const toggleProduct = (sku: string) => {
    setSelectedSkus((current) =>
      current.includes(sku) ? current.filter((item) => item !== sku) : [...current, sku],
    );
  };

  const selectCategory = (category: ActiveCategory) => {
    setActiveCategory(category);
    setQuery("");
    setShowAll(category !== "all");
  };

  const browseCategory = (category: CategoryId) => {
    selectCategory(category);
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="site-shell" ref={rootRef}>
      <header className="cinematic-header">
        <a className="brand-link" href="#top" aria-label="ANWELLUP home" onClick={closeMobileMenu}>
          <img src="/assets/brand/logo-reversed.svg" alt="ANWELLUP" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#materials">Materials</a>
          <a href="#products">Products</a>
          <a href="#customization">Customization</a>
          <a href="#process">Process</a>
        </nav>
        <div className="header-actions">
          <a className="download-link" href="/downloads/ANWELLUP_Product_Catalogue_2026.pdf" download>
            <DownloadSimple size={17} /> Download catalogue
          </a>
          <button className="header-inquiry" type="button" onClick={() => setDrawerOpen(true)}>
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
            <a href="/downloads/ANWELLUP_Product_Catalogue_2026.pdf" download onClick={closeMobileMenu}>
              Download catalogue
            </a>
          </motion.nav>
        )}
      </AnimatePresence>

      <main>
        <section className="cinematic-hero" id="top">
          <img
            className="hero-photo"
            src="/assets/generated/cinematic/hero-regenerative-cinema.jpg"
            alt="ANWELLUP sustainable food packaging on a sculptural material platform"
            fetchPriority="high"
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
            src="/assets/generated/cinematic/fiber-macro-regenerative.jpg"
            alt="Extreme close-up of molded plant-fiber packaging"
            loading="lazy"
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
                <img src={category.image} alt={`${category.label} packaging`} loading="lazy" />
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
            <p>Search every SKU, combine materials and send one structured WhatsApp inquiry.</p>
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
                placeholder="Search SKU, format or size"
              />
              {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>}
            </label>
          </div>

          <div className="results-meta">
            <span>Showing {visibleProducts.length} of {filteredProducts.length} matches</span>
            {selectedSkus.length > 0 && (
              <button type="button" onClick={() => setDrawerOpen(true)}>
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

        <section className="customization-section" id="customization">
          <div className="customization-image">
            <img src="/assets/generated/scenes/customization-oem.jpg" alt="OEM packaging customization samples" loading="lazy" />
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
          <img src="/assets/generated/scenes/quality-alignment.jpg" alt="Packaging quality inspection" loading="lazy" />
          <div className="final-cta-shade" />
          <Reveal className="final-cta-copy">
            <h2>Bring the brief.<br />Leave with a clear next step.</h2>
            <p>Choose the formats you need and send the whole range as one structured inquiry.</p>
            <button type="button" onClick={() => setDrawerOpen(true)}>
              Build your inquiry <span><ArrowRight size={19} /></span>
            </button>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <img src="/assets/brand/logo-reversed.svg" alt="ANWELLUP" />
        <div>
          <a href="#materials">Materials</a>
          <a href="#products">Products</a>
          <a href="#customization">Customization</a>
          <a href="#process">Process</a>
        </div>
        <div>
          <span>WhatsApp</span>
          <a href="https://wa.me/8618818283961" target="_blank" rel="noreferrer">+86 188 1828 3961</a>
        </div>
        <p>Product specifications, certifications and destination-market claims require written confirmation.</p>
      </footer>

      <PersistentInquiry count={selectedSkus.length} onOpen={() => setDrawerOpen(true)} />
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

export default App;
