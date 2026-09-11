import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectRequire = createRequire(import.meta.url);
const nextRequire = createRequire(projectRequire.resolve("next/package.json"));
const sharp = nextRequire("sharp");
const modules = new Map();
// Test pure TypeScript modules without adding a test runtime or browser dependency.
function load(relative) {
  const file = path.resolve(root, relative);
  if (modules.has(file)) return modules.get(file).exports;
  const module = { exports: {} };
  modules.set(file, module);
  const output = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInThisContext(`(function(require, module, exports) {${output}\n})`, { filename: file })(
    name => { assert(name.startsWith("."), "Only project-local modules are allowed"); return load(path.resolve(path.dirname(file), `${name}.ts`)); },
    module, module.exports,
  );
  return module.exports;
}

const { catalogCategories, productFamilies, equipmentFamilies } = load("src/catalog.ts");
const { buyingGuides } = load("src/guides.ts");
const { sourcingSolutions } = load("src/solutions.ts");
const { filterCatalog, matchingVariants, materialsForCategory, readCatalogFilters, writeCatalogFilters } = load("src/lib/catalog-search.ts");
const { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, GENERAL_WHATSAPP_URL, whatsappInquiryUrl } = load("src/lib/contact.ts");
const { getSpecificationColumns } = load("src/lib/specification-columns.ts");
const { familyProcurementContent } = load("src/lib/family-procurement.ts");
const { galleryDistance, galleryProgress } = load("src/lib/gallery-motion.ts");
const baseline = JSON.stringify(productFamilies);
assert.equal(catalogCategories.length, 7);
assert.equal(productFamilies.length, 33);
assert.equal(equipmentFamilies.length, 3);
assert.equal(buyingGuides.length, 25);
assert.equal(new Set(buyingGuides.map(guide => guide.slug)).size, buyingGuides.length);
assert(buyingGuides.every(guide => guide.sections.length >= 6), "Every guide needs a substantial decision structure");
assert(buyingGuides.every(guide => guide.questions.length >= 3), "Every guide needs visible buyer questions");
assert(buyingGuides.every(guide => guide.related.length >= 3), "Every guide needs at least three related paths");
for (const guide of buyingGuides) {
  const imageMetadata = await sharp(path.join(root, "public", guide.image.replace(/^\//, ""))).metadata();
  assert.equal(imageMetadata.format, "webp", `Guide image must be WebP: ${guide.slug}`);
  assert.equal(imageMetadata.width, guide.imageWidth, `Guide image width mismatch: ${guide.slug}`);
  assert.equal(imageMetadata.height, guide.imageHeight, `Guide image height mismatch: ${guide.slug}`);
}
assert.equal(sourcingSolutions.length, 7);
assert.equal(new Set(sourcingSolutions.map(solution => solution.slug)).size, sourcingSolutions.length);
assert(sourcingSolutions.every(solution => solution.sections.length >= 6), "Every sourcing solution needs a complete planning sequence");
assert(sourcingSolutions.every(solution => solution.questions.length >= 3), "Every sourcing solution needs buyer questions");
assert(sourcingSolutions.every(solution => solution.related.length >= 3), "Every sourcing solution needs related paths");
for (const solution of sourcingSolutions) {
  const imageMetadata = await sharp(path.join(root, "public", solution.image.replace(/^\//, ""))).metadata();
  assert.equal(imageMetadata.format, "webp", `Solution image must be WebP: ${solution.slug}`);
  assert.equal(imageMetadata.width, solution.imageWidth, `Solution image width mismatch: ${solution.slug}`);
  assert.equal(imageMetadata.height, solution.imageHeight, `Solution image height mismatch: ${solution.slug}`);
}
const bagCategory = catalogCategories.find(category => category.id === "bags");
assert.equal(bagCategory.image, "/assets/catalog/2026-09-r1/carry-shopping-bags-sage-composite-v2.webp");
const bagMetadata = await sharp(path.join(root, "public", bagCategory.image)).metadata();
assert.equal(bagMetadata.width, 640, "Bag composite width");
assert.equal(bagMetadata.height, 480, "Bag composite height");
assert.equal(createHash("sha256").update(fs.readFileSync(path.join(root, "public/assets/catalog/2026-09-r1/carry-shopping-bags-source-master-v1.png"))).digest("hex"), "1f2b5e31ef493e08bc2a80e0018c806b9b1c4616899cea588ba431bb2db07384", "Original bag photograph must remain intact");
assert.equal(new Set(productFamilies.map(f => f.id)).size, productFamilies.length);
assert.deepEqual(filterCatalog(productFamilies, "all", " "), productFamilies);
assert.equal(filterCatalog(productFamilies, "all", "no-such-product-q9z").length, 0);
assert.equal(WHATSAPP_NUMBER, "8613202830014");
assert.equal(WHATSAPP_DISPLAY, "+86 132 0283 0014");
assert.equal(new URL(GENERAL_WHATSAPP_URL).pathname, "/8613202830014");
assert.equal(new URL(whatsappInquiryUrl("Model AW-01\nQty 100 & artwork")).searchParams.get("text"), "Model AW-01\nQty 100 & artwork");
const categoryIds = catalogCategories.map(category => category.id);
assert.deepEqual(readCatalogFilters("?category=not-valid&q=12+oz", categoryIds), { category: "all", query: "12 oz", material: "all" });
const savedFilters = writeCatalogFilters("?utm_source=sample", "cups", "12 oz & lid", "Paper");
assert.deepEqual(readCatalogFilters(savedFilters, categoryIds), { category: "cups", query: "12 oz & lid", material: "Paper" });
assert.equal(new URLSearchParams(savedFilters).get("utm_source"), "sample");
assert.equal(writeCatalogFilters("?category=cups&q=12oz&material=Paper", "all", "", "all"), "");
let variantsChecked = 0;
for (const category of catalogCategories) {
  assert.deepEqual(filterCatalog(productFamilies, category.id, ""), productFamilies.filter(f => f.category === category.id));
}
for (const family of productFamilies) {
  assert(filterCatalog(productFamilies, "all", ` ${family.sku.toLowerCase()} `).includes(family));
  for (const material of family.materials) assert(filterCatalog(productFamilies, "all", material).includes(family));
  const columns = getSpecificationColumns(family.variants);
  for (const variant of family.variants) {
    variantsChecked++;
    assert(filterCatalog(productFamilies, family.category, variant.sku).includes(family));
    assert(matchingVariants(family.variants, variant.sku).includes(variant));
    assert(filterCatalog(productFamilies, family.category, variant.label).includes(family));
    for (const field of ["dimensions", "weight", "pack"]) {
      if (variant[field]?.trim()) assert(columns.some(column => column.field === field), `${variant.sku}: missing ${field}`);
    }
    assert(!columns.some(column => column.field === "referenceModel"), `${variant.sku}: supplier reference leaked into public columns`);
  }
}
const cupMaterials = materialsForCategory(productFamilies, "cups");
assert(cupMaterials.includes("Paper") && cupMaterials.includes("PP") && !cupMaterials.includes("Nitrile"));
assert(filterCatalog(productFamilies, "cups", "", "PP").every(family => family.category === "cups" && family.materials.includes("PP")));
assert(productFamilies.every(family => family.variants.every(variant => !("referenceModel" in variant))), "Public catalogue must not contain supplier references");
assert.deepEqual(getSpecificationColumns([{ sku: "TEST", label: "Test" }]), []);
assert.equal(JSON.stringify(productFamilies), baseline, "Search and column selection must not mutate records");
assert.equal(galleryDistance(4200, 1440, 80), 2840, "Gallery distance excludes its visible content width");
assert.equal(galleryDistance(1000, 1440, 80), 0, "Short galleries must not travel backwards");
assert.equal(galleryProgress(-50, 1000), 0);
assert.equal(galleryProgress(500, 1000), .5);
assert.equal(galleryProgress(1250, 1000), 1);

const luminance = hex => {
  const channels = hex.replace("#", "").match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
};
const contrast = (a, b) => { const values = [luminance(a), luminance(b)].sort((a, b) => b - a); return (values[0] + .05) / (values[1] + .05); };
const theme = fs.readFileSync(path.join(root, "src/app/plan-a.css"), "utf8");
const analyticsSource = fs.readFileSync(path.join(root, "src/lib/analytics.ts"), "utf8");
const trackingSource = fs.readFileSync(path.join(root, "src/components/TrafficAnalytics.tsx"), "utf8");
assert(analyticsSource.includes('window.gtag?.("event", event, parameters)'), "Tracked actions must be forwarded to GA4");
assert(analyticsSource.includes('"generate_lead"'), "High-intent contact actions must support the GA4 generate_lead event");
assert(trackingSource.includes("NEXT_PUBLIC_GA4_ID"), "GA4 must be configurable at deploy time");
assert(trackingSource.includes("googletagmanager.com/gtag/js"), "GA4 loader must be present");
assert(trackingSource.includes('trackEvent("generate_lead"'), "WhatsApp contacts must emit a lead-intent event");
const token = name => { const match = theme.match(new RegExp(`--${name}:\\s*(#[a-f0-9]{6})`, "i")); assert(match, `Missing Plan A token ${name}`); return match[1]; };
assert.equal(token("sage"), "#58715a");
assert.equal(token("paper-deep"), "#e4eadf");
assert(/\.category-image-stage, \.family-image-stage\s*\{[^}]*aspect-ratio:\s*auto;/s.test(theme), "Product image stages must use intrinsic height instead of letterboxing");
assert(/\.category-image-stage img, \.family-image-stage img\s*\{[^}]*height:\s*auto;/s.test(theme), "Product images must preserve their intrinsic ratio");
const contrastChecks = {
  body: contrast(token("ink"), token("paper")),
  secondaryOnPaper: contrast(token("ink-soft"), token("paper")),
  secondaryOnTint: contrast(token("ink-soft"), token("paper-deep")),
  accentButton: contrast("#ffffff", token("sage-dark")),
  inputPlaceholder: contrast("#626b5b", token("paper")),
};
for (const [name, ratio] of Object.entries(contrastChecks)) assert(ratio >= 4.5, `${name} contrast: ${ratio}`);

const out = path.join(root, "out");
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const files = walk(out);
const htmlFiles = files.filter(file => file.endsWith(".html"));
const refs = new Set(["/"]);
const pageTitles = new Map();
let structuredDataBlocks = 0;
const readPage = route => fs.readFileSync(path.join(out, route, "index.html"), "utf8");
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const isNotFoundPage = file.endsWith("404.html") || file.includes(`${path.sep}404${path.sep}`) || file.includes("_not-found");
  assert(!html.includes("\ufffd"), `Encoding replacement character in ${file}`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `One H1 required: ${file}`);
  assert(!/8618818283961|188 1828 3961/.test(html), `Superseded phone number in ${file}`);
  assert(!/Reference model|original reference model|referenceModel/i.test(html), `Private supplier-reference label in ${file}`);
  assert(html.includes(WHATSAPP_DISPLAY), `Missing confirmed phone in ${file}`);
  assert(html.includes('class="whatsapp-float"'), `Missing contact shortcut in ${file}`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    JSON.parse(match[1]);
    structuredDataBlocks++;
  }
  if (!isNotFoundPage) {
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert(title, `Missing page title: ${file}`);
    assert(description && description.length >= 70, `Missing or thin meta description: ${file}`);
    assert(canonical?.startsWith("https://anwellup.com/"), `Missing absolute canonical: ${file}`);
    assert(!pageTitles.has(title), `Duplicate page title: ${title}`);
    pageTitles.set(title, file);
  }
  for (const link of html.matchAll(/href="(https:\/\/wa\.me\/[^" ]*)"/g)) assert.equal(new URL(link[1].replaceAll("&amp;", "&")).pathname, `/${WHATSAPP_NUMBER}`);
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)) if (!match[1].startsWith("//")) refs.add(match[1]);
  if (!isNotFoundPage) refs.add("/" + path.relative(out, file).replaceAll("\\", "/").replace(/index\.html$/, ""));
}
const home = readPage("");
const robots = fs.readFileSync(path.join(out, "robots.txt"), "utf8");
const imageSitemap = fs.readFileSync(path.join(out, "image-sitemap.xml"), "utf8");
assert(home.includes("hero-regenerative-cinema.webp"));
assert(home.includes("anwellup-logo-primary-orange-transparent.webp"));
assert(home.includes("carry-shopping-bags-sage-composite-v2.webp"));
assert(home.includes("Wholesale Food Packaging Supplier | ANWELLUP"), "Homepage must expose the search-led title");
assert(home.includes('href="/guides/"'), "Homepage must link to the buying-guide hub");
assert(readPage("about").includes('"@type":"AboutPage"'), "About page must expose AboutPage structured data");
assert(readPage("about").includes("Content method"), "About page must explain the content method");
const manufacturingPage = readPage("manufacturing");
assert(manufacturingPage.includes('class="manufacturing-page"'), "Manufacturing page must use the evidence-led layout");
assert(manufacturingPage.includes('"@type":"WebPage"'), "Manufacturing page must expose WebPage structured data");
assert(manufacturingPage.includes("Facilities,"), "Manufacturing page must expose real production evidence");
assert.equal((manufacturingPage.match(/class="evidence-card"/g) || []).length, 5, "Manufacturing page must show five sourced facility views");
for (const image of ["factory-overview-signage-removed-v2.webp", "foshan-factory-signage-removed-v2.webp", "hubei-production-floor-restored.webp", "sichuan-production-floor-restored.webp", "mould-storage-room.webp", "aluminium-line-workshop.webp", "aluminium-production-line-studio-v2.webp", "aluminium-container-moulds-studio-v2.webp", "automatic-collection-equipment-studio-v2.webp"]) assert(manufacturingPage.includes(image), `Manufacturing page must expose approved real evidence: ${image}`);
for (const removedImage of ["aluminium-factory-overview-source.webp", "foshan-factory-exterior.webp", "wb45t-production-line.webp", "aluminium-container-moulds.webp", "automatic-collection-equipment.webp"]) assert(!manufacturingPage.includes(removedImage), `Manufacturing page must not expose unredacted source image: ${removedImage}`);
assert(!manufacturingPage.includes("Ningbo Times") && !manufacturingPage.includes("WEIBO"), "Manufacturing page must not publish redacted third-party brand names");
assert(!manufacturingPage.includes("plastic-blister-injection-malaysia-source.webp"), "Manufacturing page must not retain the superseded evidence gallery");
assert(manufacturingPage.includes("Verify the project, not the photograph."), "Manufacturing page must explain the verification path");
for (const item of equipmentFamilies) assert(manufacturingPage.includes(item.sku), `Manufacturing page must expose equipment reference: ${item.sku}`);
assert(!home.includes("carry-shopping-bags-source-master-v1.png"), "Homepage must use the approved matching backdrop");
assert(!home.includes("cinema-baseline"));
assert(robots.includes("https://anwellup.com/image-sitemap.xml"), "robots.txt must advertise the image sitemap");
assert(imageSitemap.includes("<image:image>"), "Image sitemap must include discoverable images");
const imageSitemapLocs = [...imageSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(imageSitemapLocs.length, new Set(imageSitemapLocs).size, "Image sitemap page URLs must be unique");
assert(fs.existsSync(path.join(out, "a680f67e82022c38117b9661810d86dfdd6d8a4549fbbda6.txt")), "IndexNow verification file must be exported");
refs.add("/robots.txt");
refs.add("/sitemap.xml");
refs.add("/image-sitemap.xml");
refs.add("/a680f67e82022c38117b9661810d86dfdd6d8a4549fbbda6.txt");
assert.equal((home.match(/class="collection-panel/g) || []).length, 7);
assert.equal((readPage("products").match(/class="range-entry /g) || []).length, 7);
assert(readPage("products/carry-shopping-bags").includes("format-list"));
assert(readPage("products/carry-shopping-bags").includes("Buyer&apos;s guide") || readPage("products/carry-shopping-bags").includes("Buyer&#x27;s guide"), "Category page must include the sourcing guide");
assert(readPage("products/cups-drinkware").includes('"@type":"CollectionPage"'), "Category page must expose CollectionPage structured data");
assert(readPage("products/cups-drinkware").includes('"@type":"FAQPage"'), "Category questions must expose FAQPage structured data");
const containerCategory = readPage("products/takeaway-boxes-containers");
assert(containerCategory.includes("Eight inputs for a comparable quotation"), "Container pillar must expose the complete procurement brief");
assert(containerCategory.includes('href="/solutions/custom-takeaway-containers/"'), "Container pillar must link to the transaction page");
assert(containerCategory.includes('href="/guides/takeaway-container-moq/"'), "Container pillar must link to the MOQ decision page");
assert(containerCategory.includes('data-analytics-location="category_boxes"'), "Container pillar must expose a tracked WhatsApp action");
const cupCategory = readPage("products/cups-drinkware");
assert(cupCategory.includes("Eight inputs for a comparable quotation"), "Cup pillar must expose the complete procurement brief");
assert(cupCategory.includes('href="/solutions/custom-printed-coffee-cups/"'), "Cup pillar must link to the custom-print solution");
assert(cupCategory.includes('href="/guides/disposable-cup-lid-compatibility/"'), "Cup pillar must link to the compatibility guide");
assert(cupCategory.includes('data-analytics-location="category_cups"'), "Cup pillar must expose a tracked WhatsApp action");
for (const [familyId, content] of Object.entries(familyProcurementContent)) {
  const family = productFamilies.find(item => item.id === familyId);
  assert(family && ["cups", "boxes", "cutlery", "tableware", "foil"].includes(family.category), `Procurement content must target a published cup, container, cutlery, tableware or foil family: ${familyId}`);
  const category = catalogCategories.find(item => item.id === family.category);
  assert(category, `Procurement family category must exist: ${familyId}`);
  assert(content.facts.length >= 8, `Family needs a complete procurement brief: ${familyId}`);
  assert(content.questions.length >= 4, `Family needs buyer questions: ${familyId}`);
  assert(content.related.length >= 3, `Family needs related decision paths: ${familyId}`);
  const html = readPage(`products/${category.slug}/${familyId}`);
  assert(html.includes("Wholesale buying brief"), `Family brief missing from output: ${familyId}`);
  assert(html.includes('"@type":"FAQPage"'), `Family FAQ schema missing from output: ${familyId}`);
  assert(html.includes(`data-analytics-location="family_${familyId}"`), `Family WhatsApp action must be tracked: ${familyId}`);
}
assert.equal(Object.keys(familyProcurementContent).filter(id => productFamilies.find(item => item.id === id)?.category === "boxes").length, 10, "Every published container family needs a procurement brief");
assert.equal(Object.keys(familyProcurementContent).filter(id => productFamilies.find(item => item.id === id)?.category === "cutlery").length, 2, "Every published cutlery family needs a procurement brief");
assert.equal(Object.keys(familyProcurementContent).filter(id => productFamilies.find(item => item.id === id)?.category === "tableware").length, 5, "Every published tableware family needs a procurement brief");
assert.equal(Object.keys(familyProcurementContent).filter(id => productFamilies.find(item => item.id === id)?.category === "foil").length, 4, "Every published foil family needs a procurement brief");
const cutleryCategory = readPage("products/cutlery-meal-kits");
assert(cutleryCategory.includes("Eight inputs for a comparable quotation"), "Cutlery pillar must expose the complete procurement brief");
assert(cutleryCategory.includes('href="/solutions/airline-catering-meal-kits/"'), "Cutlery pillar must link to the airline program page");
assert(cutleryCategory.includes('href="/guides/pp-vs-ps-disposable-cutlery/"'), "Cutlery pillar must link to the material comparison guide");
assert(cutleryCategory.includes('data-analytics-location="category_cutlery"'), "Cutlery pillar must expose a tracked WhatsApp action");
assert(cutleryCategory.includes("cutlery-foodservice-table-v1.webp"), "Cutlery pillar must use the foodservice scene image");
const tablewareCategory = readPage("products/plates-bowls-trays");
assert(tablewareCategory.includes("Eight inputs for a comparable quotation"), "Tableware pillar must expose the complete procurement brief");
assert(tablewareCategory.includes('href="/products/plates-bowls-trays/tableware-meal-trays/"'), "Tableware pillar must link to the meal-tray family");
assert(tablewareCategory.includes('href="/guides/food-container-size-guide/"'), "Tableware pillar must link to the size guide");
assert(tablewareCategory.includes('data-analytics-location="category_tableware"'), "Tableware pillar must expose a tracked WhatsApp action");
const foilCategory = readPage("products/foil-wraps-baking");
assert(foilCategory.includes("Eight inputs for a comparable quotation"), "Foil pillar must expose the complete procurement brief");
assert(foilCategory.includes('href="/products/foil-wraps-baking/popup-foil/"'), "Foil pillar must link to the pop-up sheet family");
assert(foilCategory.includes('href="/guides/custom-food-packaging-printing-guide/"'), "Foil pillar must link to the printing guide");
assert(foilCategory.includes('data-analytics-location="category_foil"'), "Foil pillar must expose a tracked WhatsApp action");
assert(readPage("products/carry-shopping-bags/pe-shopping-bags").includes("category-source-master"));
assert(readPage("products/carry-shopping-bags/pe-shopping-bags").includes("spec-table-short"));
assert(readPage("products/carry-shopping-bags/pe-shopping-bags").includes('"@type":"ProductGroup"'), "Family page must expose ProductGroup structured data");
assert(readPage("products/carry-shopping-bags/pe-shopping-bags").includes('"variesBy":["https://schema.org/size"]'), "Product groups must describe their variant axis");
assert(readPage("products/carry-shopping-bags/pe-shopping-bags").includes('"isVariantOf"'), "Product variants must link back to their group");
const guideIndex = readPage("guides");
assert(guideIndex.includes('"@type":"CollectionPage"'), "Guide index must expose CollectionPage structured data");
for (const guide of buyingGuides) {
  const html = readPage(`guides/${guide.slug}`);
  assert(html.includes('"@type":"Article"'), `Guide must expose Article structured data: ${guide.slug}`);
  assert(html.includes('"@type":"FAQPage"'), `Guide must expose visible FAQ structured data: ${guide.slug}`);
  assert(html.includes(guide.title), `Guide title missing from output: ${guide.slug}`);
  assert(html.includes('href="/guides/food-packaging-rfq-checklist/"') || guide.slug === "food-packaging-rfq-checklist", `Guide must connect to the RFQ cluster: ${guide.slug}`);
}
for (const slug of ["food-packaging-materials-comparison", "food-container-size-guide", "custom-food-packaging-printing-guide", "food-packaging-moq-guide", "paper-vs-plastic-disposable-cups", "disposable-cup-lid-compatibility", "disposable-cup-moq", "disposable-cup-printing-samples", "disposable-cup-lead-time-packing", "how-to-evaluate-plastic-cup-manufacturer", "hinged-vs-folded-takeaway-containers", "how-to-choose-takeaway-packaging", "takeaway-container-moq", "takeaway-container-samples-prototyping", "takeaway-container-lead-time-packing", "how-to-verify-food-packaging-supplier", "disposable-cutlery-sets-bulk", "pp-vs-ps-disposable-cutlery", "bulk-vs-individually-wrapped-cutlery", "how-to-specify-airline-meal-kits", "disposable-cutlery-samples-quality-checks", "meal-kit-moq-packing-lead-time"]) {
  const html = readPage(`guides/${slug}`);
  assert((html.match(/class="guide-inline-link"/g) || []).length >= 3, `Decision guide needs three or more contextual links: ${slug}`);
}
assert(readPage("guides/paper-vs-plastic-disposable-cups").includes("guide-evidence"), "Cup comparison must expose visible first-party evidence");
assert(readPage("guides/how-to-evaluate-plastic-cup-manufacturer").includes("AW SKU"), "Supplier evaluation must anchor review to public product identity");
assert(readPage("guides/disposable-cutlery-sets-bulk").includes("AW-CUT-MW"), "Cutlery guide must anchor review to public product identity");
assert(readPage("guides/how-to-specify-airline-meal-kits").includes("AW-KIT-HW-46"), "Airline guide must expose model-specific kit evidence");
assert(readPage("guides/how-to-specify-airline-meal-kits").includes("airline-meal-kit-service-v1.webp"), "Airline guide must use the airline-service scene");
const solutionIndex = readPage("solutions");
assert(solutionIndex.includes('"@type":"CollectionPage"'), "Solution index must expose CollectionPage structured data");
for (const solution of sourcingSolutions) {
  const html = readPage(`solutions/${solution.slug}`);
  assert(html.includes('"@type":"WebPage"'), `Solution must expose WebPage structured data: ${solution.slug}`);
  assert(html.includes('"@type":"FAQPage"'), `Solution must expose visible FAQ structured data: ${solution.slug}`);
  assert(html.includes(solution.title), `Solution title missing from output: ${solution.slug}`);
  assert((html.match(/class="guide-inline-link"/g) || []).length >= 3, `Solution needs three or more contextual links: ${solution.slug}`);
  assert(html.includes(`data-analytics-location="solution_${solution.slug}"`), `Solution must expose a tracked WhatsApp action: ${solution.slug}`);
}
assert(readPage("solutions/custom-printed-coffee-cups").includes("custom-printed-coffee-cups-cafe-v1.webp"), "Coffee-cup solution must use its service-context image");
assert(readPage("solutions/cold-drink-cup-programs").includes("pet-pp-cold-drink-cups-cafe-v1.webp"), "Cold-cup solution must use its service-context image");
assert(readPage("solutions/restaurant-chain-takeaway-packaging").includes("bagasse-kraft-takeaway-service-v1.webp"), "Restaurant-chain solution must use its food-service image");
assert(readPage("solutions/prepared-food-retail-packaging").includes("aluminium-pet-prepared-food-v1.webp"), "Prepared-food solution must use its service-context image");
assert(readPage("solutions/custom-wrapped-meal-kits").includes("wrapped-cutlery-takeaway-v1.webp"), "Wrapped-kit solution must use the takeaway packing scene");
for (const family of productFamilies) {
  const category = catalogCategories.find(item => item.id === family.category);
  const html = readPage(`products/${category.slug}/${family.id}`);
  for (const variant of family.variants) {
    assert(html.includes(variant.sku), `Missing exported model: ${variant.sku}`);
    assert(html.includes(`id="model-${variant.sku}"`), `Missing model anchor: ${variant.sku}`);
  }
}

const base = "http://127.0.0.1:4173";
for (const file of files.filter(file => file.endsWith(".css"))) {
  const css = fs.readFileSync(file, "utf8").replace(/url\("data:[^"]*"\)/g, "");
  const url = base + "/" + path.relative(out, file).replaceAll("\\", "/");
  for (const match of css.matchAll(/url\(["']?([^\s)"']+)/g)) if (!/^(data:|#|%23)/.test(match[1])) refs.add(new URL(match[1], url).pathname);
}
const references = [...refs];
for (let i = 0; i < references.length; i += 12) {
  await Promise.all(references.slice(i, i + 12).map(async ref => {
    const response = await fetch(base + ref);
    assert.equal(response.status, 200, `HTTP check: ${ref}`);
    await response.arrayBuffer();
  }));
}
const response = await fetch(base + "/");
assert.equal(response.headers.get("content-type"), "text/html; charset=utf-8");
assert.equal(await response.text(), home, "Preview must serve the latest export");
console.log(JSON.stringify({ status: "passed", categories: catalogCategories.length, families: productFamilies.length, variantsChecked, htmlFiles: htmlFiles.length, uniquePageTitles: pageTitles.size, structuredDataBlocks, httpReferences: refs.size, contrastChecks, browserVisualReview: "not part of the automated suite" }, null, 2));
