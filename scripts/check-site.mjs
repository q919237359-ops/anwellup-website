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
const { products: sourceProducts } = load("src/data.ts");
const { buyingGuides } = load("src/guides.ts");
const { sourcingSolutions } = load("src/solutions.ts");
const { filterCatalog, matchingVariants, materialsForCategory, readCatalogFilters, writeCatalogFilters } = load("src/lib/catalog-search.ts");
const { CONTACT_EMAIL, GENERAL_EMAIL_URL, WHATSAPP_NUMBER, WHATSAPP_DISPLAY, GENERAL_WHATSAPP_URL, emailInquiryUrl, whatsappInquiryUrl } = load("src/lib/contact.ts");
const { getSpecificationColumns } = load("src/lib/specification-columns.ts");
const { familyProcurementContent } = load("src/lib/family-procurement.ts");
const { galleryDistance, galleryProgress } = load("src/lib/gallery-motion.ts");
const { materialPages, materialFamilies, materialModelExamples, familyPath } = load("src/materials.ts");
const { sourcingPrograms, sourcingReferences } = load("src/sourcing-programs.ts");
const { productImageSize, variantIllustration } = load("src/lib/product-images.ts");
for (const family of productFamilies) {
  const heroSize = productImageSize(family.image, family.category);
  const heroMetadata = await sharp(path.join(root, "public", family.image)).metadata();
  assert.equal(heroSize.width, heroMetadata.width, `Family image width: ${family.id}`);
  assert.equal(heroSize.height, heroMetadata.height, `Family image height: ${family.id}`);
  for (const variant of family.variants) {
    const illustration = variantIllustration(family, variant);
    const imageMetadata = await sharp(path.join(root, "public", illustration.src)).metadata();
    assert.equal(illustration.width, imageMetadata.width, `Model image width: ${variant.sku}`);
    assert.equal(illustration.height, imageMetadata.height, `Model image height: ${variant.sku}`);
    if (variant.image) {
      assert(variant.image.endsWith(`/${variant.sku.toLowerCase()}.webp`), `Model artwork must identify its own SKU: ${variant.sku}`);
      assert(illustration.caption.includes("not a product photograph"), `Model artwork needs illustration context: ${variant.sku}`);
    } else {
      assert.equal(illustration.src, family.image, `Unillustrated model must retain its range fallback: ${variant.sku}`);
      assert(illustration.caption.includes("Representative range illustration"), `Range fallback needs context: ${variant.sku}`);
    }
  }
}
for (const program of sourcingPrograms) {
  const references = sourcingReferences(program);
  assert.equal(references.length, program.skus.length, `Sourcing route must resolve every published model: ${program.id}`);
  const imageMetadata = await sharp(path.join(root, "public", program.image)).metadata();
  assert.equal(imageMetadata.width, 900, `Sourcing image width: ${program.id}`);
  assert.equal(imageMetadata.height, 675, `Sourcing image height: ${program.id}`);
  for (const reference of references) assert.equal(reference.href, `${familyPath(reference.family)}#model-${reference.variant.sku}`, `Sourcing links must target the exact model: ${reference.variant.sku}`);
}
const baseline = JSON.stringify(productFamilies);
assert.equal(catalogCategories.length, 7);
assert.equal(productFamilies.length, 33);
assert.equal(equipmentFamilies.length, 3);
assert.equal(buyingGuides.length, 30);
assert.equal(new Set(buyingGuides.map(guide => guide.slug)).size, buyingGuides.length);
assert(buyingGuides.every(guide => guide.sections.length >= 6), "Every guide needs a substantial decision structure");
assert(buyingGuides.every(guide => guide.questions.length >= 3), "Every guide needs visible buyer questions");
assert(buyingGuides.every(guide => guide.related.length >= 3), "Every guide needs at least three related paths");
for (const guide of buyingGuides) {
  const imageMetadata = await sharp(path.join(root, "public", guide.image.replace(/^\//, ""))).metadata();
  assert.equal(imageMetadata.format, "webp", `Guide image must be WebP: ${guide.slug}`);
  assert.equal(imageMetadata.width, guide.imageWidth, `Guide image width mismatch: ${guide.slug}`);
  assert.equal(imageMetadata.height, guide.imageHeight, `Guide image height mismatch: ${guide.slug}`);
  if (guide.imageSrcSet) {
    const candidates = guide.imageSrcSet.split(",").map(candidate => {
      const match = candidate.trim().match(/^(\S+)\s+([1-9]\d*)w$/);
      assert(match, `Guide srcset needs URL and width descriptors: ${guide.slug}`);
      return { url: match[1], width: Number(match[2]) };
    });
    assert.equal(candidates.length, 3, `Responsive guide needs three image sizes: ${guide.slug}`);
    assert.equal(new Set(candidates.map(candidate => candidate.width)).size, 3, `Guide srcset widths must be distinct: ${guide.slug}`);
    assert(candidates.some(candidate => candidate.url === guide.image), `Guide fallback image must be one of its responsive sources: ${guide.slug}`);
    for (const candidate of candidates) {
      const file = path.join(root, "public", candidate.url.replace(/^\//, ""));
      assert(fs.existsSync(file), `Responsive guide image missing: ${candidate.url}`);
      const candidateMetadata = await sharp(file).metadata();
      assert.equal(candidateMetadata.format, "webp", `Responsive guide image must be WebP: ${candidate.url}`);
      assert.equal(candidateMetadata.width, candidate.width, `Guide srcset descriptor must match actual pixels: ${candidate.url}`);
      assert.equal(candidateMetadata.height, Math.round(guide.imageHeight * candidate.width / guide.imageWidth), `Responsive guide image must retain its full aspect ratio: ${candidate.url}`);
    }
  }
}
assert.equal(sourcingSolutions.length, 8);
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
const bagasseClamshells = productFamilies.find(family => family.id === "boxes-hinged-containers");
assert.deepEqual(filterCatalog(productFamilies, "all", "bagasse 9x6"), [bagasseClamshells], "Material and dimensions must match one real model");
for (const query of ["sugarcane 9 × 6", "bagasse 9*6", "bagasse 9 x 6 in"]) {
  assert.deepEqual(matchingVariants(bagasseClamshells.variants, query, bagasseClamshells).map(variant => variant.sku), ["AW-BG-H96"], `Model-level normalization: ${query}`);
}
assert(filterCatalog(productFamilies, "all", "aluminum trays").some(family => family.id === "boxes-wrinkle-wall-containers"), "US spelling and singular/plural must work");
assert(filterCatalog(productFamilies, "all", "take out kraft containers").some(family => family.id === "boxes-takeaway-containers"), "Takeout terminology must work without exact phrase order");
assert(filterCatalog(productFamilies, "cups", "paper cup 12oz").length > 0, "Material and capacity can be combined");
assert.equal(filterCatalog(productFamilies, "cups", "bagasse 9x6").length, 0, "Category scope must remain strict");
assert.equal(filterCatalog(productFamilies, "all", "AW-BG-H960").length, 0, "Do not partially match an unknown SKU to a shorter known SKU");
assert.equal(filterCatalog(productFamilies, "all", "AW-H96-BG").length, 0, "SKU segment order is meaningful");
assert.deepEqual(matchingVariants(bagasseClamshells.variants, "bagasse 6x6", bagasseClamshells).map(variant => variant.sku), ["AW-BG-H66"], "Repeated dimensions cannot reuse one numeric match");
assert.deepEqual(matchingVariants(bagasseClamshells.variants, "bagasse 9x9", bagasseClamshells).map(variant => variant.sku), ["AW-BG-H99"], "Square formats must not include rectangular formats");
assert.equal(filterCatalog(productFamilies, "all", "@@@").length, 0, "Punctuation-only searches must not pretend to match everything");
assert.equal(matchingVariants(bagasseClamshells.variants, "bagasse", bagasseClamshells).length, 0, "Family-only searches must not imply a size match");
const searchFixture = { ...bagasseClamshells, variants: [{ sku: "ONE", label: "12 oz" }, { sku: "TWO", label: "16 oz" }] };
assert.equal(filterCatalog([searchFixture], "all", "12 oz 16 oz").length, 0, "Never combine sizes from separate models to create a match");
assert.equal(filterCatalog([searchFixture], "all", "2 oz").length, 0, "Numeric capacity matches must be exact");
const kraftContainers = productFamilies.find(family => family.id === "boxes-takeaway-containers");
for (const query of ["500ml", "500 ml", "500 millilitres"]) {
  assert.deepEqual(matchingVariants(kraftContainers.variants, query, kraftContainers).map(variant => variant.sku), ["AW-PK-500"], `500 ml must not match 1,500 ml: ${query}`);
}
const colouredContainers = productFamilies.find(family => family.id === "boxes-premium-color-series");
for (const query of ["1000 ml", "1,000 ml"]) {
  assert.deepEqual(matchingVariants(colouredContainers.variants, query, colouredContainers).map(variant => variant.sku), ["AW-AL-G1000S", "AW-AL-G1000R"], `Thousands separators must not hide 1,000 ml models: ${query}`);
}
const capacityFixture = { ...kraftContainers, variants: [{ sku: "TEST-500", name: "Food Container", label: "1,500 ml", dimensions: "500 x 200 x 100 mm" }] };
assert.equal(filterCatalog([capacityFixture], "all", "500 ml").length, 0, "A dimension or SKU number must not become a capacity match");
const foilFormats = productFamilies.find(family => family.id === "foil-rolls-sheets-paper");
for (const [query, expectedSku] of [["silicone baking paper", "AW-BP-SHEET"], ["household foil", "AW-AF-H300"], ["catering foil", "AW-AF-C300"]]) {
  assert.deepEqual(filterCatalog(productFamilies, "all", query), [foilFormats], `Product names must be searchable: ${query}`);
  assert.deepEqual(matchingVariants(foilFormats.variants, query, foilFormats).map(variant => variant.sku), [expectedSku], `Product names must identify their own model: ${query}`);
}
assert.equal(matchingVariants(foilFormats.variants, "paper 300 mm", foilFormats).length, 0, "The paper member of a mixed family must not supply material to an aluminium model");
const handlingGloves = productFamilies.find(family => family.id === "gloves-handling-gloves");
assert.deepEqual(matchingVariants(handlingGloves.variants, "vinyl blue", handlingGloves).map(variant => variant.sku), ["AW-GL-VINYL"]);
assert.equal(filterCatalog(productFamilies, "all", "vinyl pink").length, 0, "Vinyl must not borrow a nitrile model's colour");
assert.equal(filterCatalog([handlingGloves], "all", "vinyl nitrile").length, 0, "Separate model materials must not be combined into one match");
assert.equal(filterCatalog([handlingGloves], "all", "pink", "Vinyl").length, 0, "A material filter must constrain the matching model");
assert.equal(filterCatalog([handlingGloves], "all", "nitrile", "Vinyl").length, 0, "Family-level material searches must respect the selected material");
assert.equal(filterCatalog([handlingGloves], "all", "AW-GL-NITRILE", "Vinyl").length, 0, "An exact SKU must still respect its own material");
assert.deepEqual(matchingVariants(handlingGloves.variants, "pink", handlingGloves, "Nitrile").map(variant => variant.sku), ["AW-GL-NITRILE"]);
for (const product of sourceProducts.filter(product => product.family !== "Paper Cups")) {
  const variant = productFamilies.flatMap(family => family.variants).find(variant => variant.sku === product.sku);
  assert.equal(variant?.name, product.name, `${product.sku}: preserve the source product name`);
  assert.equal(variant?.material, product.material, `${product.sku}: preserve the source model material`);
}
assert.equal(WHATSAPP_NUMBER, "8613202830014");
assert.equal(WHATSAPP_DISPLAY, "+86 132 0283 0014");
assert.equal(CONTACT_EMAIL, "admin@anwellup.com");
assert.equal(new URL(GENERAL_EMAIL_URL).pathname, CONTACT_EMAIL);
assert.equal(new URL(GENERAL_WHATSAPP_URL).pathname, "/8613202830014");
assert.equal(new URL(whatsappInquiryUrl("Model AW-01\nQty 100 & artwork")).searchParams.get("text"), "Model AW-01\nQty 100 & artwork");
const emailInquiry = new URL(emailInquiryUrl("Model AW-01\nQty 100 & artwork"));
assert.equal(emailInquiry.pathname, CONTACT_EMAIL);
assert.equal(emailInquiry.searchParams.get("subject"), "Food packaging RFQ | ANWELLUP website");
assert.equal(emailInquiry.searchParams.get("body"), "Model AW-01\nQty 100 & artwork");
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
    for (const field of ["material", "dimensions", "weight", "pack"]) {
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
if (process.argv.includes("--catalog-only")) {
  console.log(JSON.stringify({ status: "passed", scope: "catalogue search, source model data and specification columns", families: productFamilies.length, variantsChecked }, null, 2));
  process.exit(0);
}
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
assert(analyticsSource.includes('window.gtag("event", event, parameters)'), "Tracked actions must be queued and forwarded to GA4");
assert(analyticsSource.includes('"generate_lead"'), "High-intent contact actions must support the GA4 generate_lead event");
assert(trackingSource.includes("NEXT_PUBLIC_GA4_ID"), "GA4 must be configurable at deploy time");
assert(trackingSource.includes("googletagmanager.com/gtag/js"), "GA4 loader must be present");
assert(!trackingSource.includes('trackEvent("generate_lead"'), "Contact clicks must not be reported as accepted enquiries");
const inquiryFormSource = fs.readFileSync(path.join(root, "src/components/InquiryForm.tsx"), "utf8");
const inquiryProviderSource = fs.readFileSync(path.join(root, "src/components/InquiryProvider.tsx"), "utf8");
assert(inquiryProviderSource.includes('trackEvent("generate_lead"'), "Accepted website enquiries must support lead measurement");
assert(!inquiryFormSource.includes('trackEvent("generate_lead"'), "Individual form instances must not duplicate accepted-enquiry measurement");
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
  assert(html.includes(CONTACT_EMAIL), `Missing confirmed email in ${file}`);
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
    const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1];
    const twitterTitle = html.match(/<meta name="twitter:title" content="([^"]+)"/)?.[1];
    const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
    assert.equal(ogTitle, title, `Open Graph must identify the current page: ${file}`);
    assert.equal(twitterTitle, title, `Social card must identify the current page: ${file}`);
    assert.equal(ogUrl, canonical, `Social sharing URL must agree with the canonical: ${file}`);
    const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    const twitterImage = html.match(/<meta name="twitter:image" content="([^"]+)"/)?.[1];
    assert(ogImage?.startsWith("https://anwellup.com/"), `Missing social preview image: ${file}`);
    assert.equal(twitterImage, ogImage, `Social image must follow this route's image: ${file}`);
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
assert(home.includes("foil-roll-sheets-parchment-1440.webp"), "Homepage must show the focused foil and baking-paper range");
assert(home.includes("anwellup-logo-primary-orange-transparent.webp"));
assert(home.includes("carry-shopping-bags-sage-composite-v2.webp"));
assert(home.includes("Wholesale Food Packaging for Distributors | ANWELLUP"), "Homepage must expose the search-led buyer title");
assert(home.includes('href="/guides/"'), "Homepage must link to the buying-guide hub");
const distributorPage = readPage("distributors");
assert(home.includes('id="priority-range"'), "Focused starting range must be reachable from the hero");
assert(distributorPage.includes('"@type":"CollectionPage"') && distributorPage.includes('"@type":"FAQPage"'), "Distributor entry must describe its collection and visible questions");
assert(distributorPage.includes('href="/contact/#send-enquiry"'), "Distributor buyers must have a direct enquiry route");
for (const program of sourcingPrograms) for (const reference of sourcingReferences(program)) {
  for (const html of [home, distributorPage]) assert(html.includes(`href="${reference.href}"`), `Buyer route must expose the exact sourcing reference: ${reference.variant.sku}`);
}
const sitemap = fs.readFileSync(path.join(out, "sitemap.xml"), "utf8");
assert(sitemap.includes("https://anwellup.com/distributors/"), "Distributor entry must be discoverable in the sitemap");
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
assert(!imageSitemap.includes("/assets/brand/"), "Image sitemap must exclude navigation and footer branding");
const foilImagePage = readPage("products/foil-wraps-baking/foil-rolls-sheets-paper");
assert(foilImagePage.includes('class="model-illustrations"'), "Mixed foil and paper formats need a visible model gallery");
for (const variant of foilFormats.variants) {
  assert(variant.image, `Foil format needs its existing model illustration: ${variant.sku}`);
  assert(foilImagePage.includes(`src="${variant.image}"`), `Foil model image must be visible in the page HTML: ${variant.sku}`);
  assert(foilImagePage.includes(`href="#model-${variant.sku}"`), `Foil illustration must lead to the corresponding specification: ${variant.sku}`);
  assert(imageSitemap.includes(variant.image), `Image sitemap must retain each foil format image: ${variant.sku}`);
}
const imageSitemapLocs = [...imageSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(imageSitemapLocs.length, new Set(imageSitemapLocs).size, "Image sitemap page URLs must be unique");
assert(fs.existsSync(path.join(out, "a680f67e82022c38117b9661810d86dfdd6d8a4549fbbda6.txt")), "IndexNow verification file must be exported");
refs.add("/robots.txt");
refs.add("/sitemap.xml");
refs.add("/image-sitemap.xml");
refs.add("/a680f67e82022c38117b9661810d86dfdd6d8a4549fbbda6.txt");
assert.equal((home.match(/class="collection-panel/g) || []).length, 7);
assert.equal((readPage("products").match(/class="range-entry /g) || []).length, 7);
assert(readPage("products").includes("Wholesale food packaging.</h1>"), "Product hub must clearly name the wholesale product range");
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
  assert(family && ["cups", "boxes", "cutlery", "tableware", "foil", "bags", "gloves"].includes(family.category), `Procurement content must target a published family: ${familyId}`);
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
assert.equal(Object.keys(familyProcurementContent).filter(id => productFamilies.find(item => item.id === id)?.category === "bags").length, 2, "Every published bag family needs a procurement brief");
assert.equal(Object.keys(familyProcurementContent).filter(id => productFamilies.find(item => item.id === id)?.category === "gloves").length, 5, "Every published glove family needs a procurement brief");
assert.equal(Object.keys(familyProcurementContent).length, productFamilies.length, "Every product family needs a procurement brief");
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
const bagPillar = readPage("products/carry-shopping-bags");
assert(bagPillar.includes("Eight inputs for a comparable quotation"), "Bag pillar must expose the complete procurement brief");
assert(bagPillar.includes('href="/products/carry-shopping-bags/nonwoven-shopping-bags/"'), "Bag pillar must link to the non-woven family");
assert(bagPillar.includes('href="/guides/custom-food-packaging-printing-guide/"'), "Bag pillar must link to the printing guide");
assert(bagPillar.includes('data-analytics-location="category_bags"'), "Bag pillar must expose a tracked WhatsApp action");
const gloveCategory = readPage("products/gloves-protective-supplies");
assert(gloveCategory.includes("Eight inputs for a comparable quotation"), "Glove pillar must expose the complete procurement brief");
assert(gloveCategory.includes('href="/products/gloves-protective-supplies/nitrile-exam-gloves/"'), "Glove pillar must link to the nitrile family");
assert(gloveCategory.includes('href="/products/gloves-protective-supplies/hdpe-gloves/"'), "Glove pillar must link to the HDPE family");
assert(gloveCategory.includes('data-analytics-location="category_gloves"'), "Glove pillar must expose a tracked WhatsApp action");
assert(readPage("products/carry-shopping-bags/pe-shopping-bags").includes("category-source-master"));
assert(readPage("products/carry-shopping-bags/pe-shopping-bags").includes("spec-table-short"));
assert(readPage("products/carry-shopping-bags/pe-shopping-bags").includes('"@type":"CollectionPage"'), "Quotation catalogue must expose CollectionPage structured data");
assert(readPage("products/carry-shopping-bags/pe-shopping-bags").includes('"@type":"ItemList"'), "Quotation catalogue must describe its visible model list");
const guideIndex = readPage("guides");
assert(guideIndex.includes('"@type":"CollectionPage"'), "Guide index must expose CollectionPage structured data");
for (const guide of buyingGuides) {
  const html = readPage(`guides/${guide.slug}`);
  assert(html.includes('"@type":"Article"'), `Guide must expose Article structured data: ${guide.slug}`);
  assert(html.includes('"@type":"FAQPage"'), `Guide must expose visible FAQ structured data: ${guide.slug}`);
  assert(html.includes(guide.title), `Guide title missing from output: ${guide.slug}`);
  assert(html.includes('href="#guide-contents"') && html.includes('id="guide-contents"'), "Guide contents must be directly reachable before the lead image");
  assert(html.includes('href="/guides/food-packaging-rfq-checklist/"') || guide.slug === "food-packaging-rfq-checklist", `Guide must connect to the RFQ cluster: ${guide.slug}`);
}
for (const slug of ["food-packaging-materials-comparison", "food-container-size-guide", "custom-food-packaging-printing-guide", "food-packaging-moq-guide", "paper-vs-plastic-disposable-cups", "disposable-cup-lid-compatibility", "disposable-cup-moq", "disposable-cup-printing-samples", "disposable-cup-lead-time-packing", "how-to-evaluate-plastic-cup-manufacturer", "hinged-vs-folded-takeaway-containers", "how-to-choose-takeaway-packaging", "takeaway-container-moq", "takeaway-container-samples-prototyping", "takeaway-container-lead-time-packing", "how-to-verify-food-packaging-supplier", "disposable-cutlery-sets-bulk", "pp-vs-ps-disposable-cutlery", "bulk-vs-individually-wrapped-cutlery", "how-to-specify-airline-meal-kits", "disposable-cutlery-samples-quality-checks", "meal-kit-moq-packing-lead-time", "disposable-plates-bowls-trays-sourcing-guide", "aluminium-foil-food-wrap-sourcing-guide", "custom-shopping-bags-sourcing-guide", "disposable-gloves-wholesale-sourcing-guide"]) {
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
const chinaSourcing = readPage("solutions/food-packaging-sourcing-china");
assert(chinaSourcing.includes("Wholesale food packaging sourcing from China"), "China sourcing page must target the intended commercial query");
assert(chinaSourcing.includes("legal entity") && chinaSourcing.includes("production relationship"), "China sourcing page must preserve supplier and facility evidence boundaries");
assert(chinaSourcing.includes('data-analytics-location="solution_food-packaging-sourcing-china"'), "China sourcing page must expose a tracked WhatsApp action");
const buyerFaq = readPage("buyer-faq");
assert(buyerFaq.includes('"@type":"FAQPage"'), "Buyer FAQ must expose FAQPage structured data");
assert(buyerFaq.includes('"@type":"WebPage"'), "Buyer FAQ must expose WebPage structured data");
assert((buyerFaq.match(/<dt>/g) || []).length === 12, "Buyer FAQ must expose twelve visible procurement answers");
assert(buyerFaq.includes('href="/solutions/food-packaging-sourcing-china/"'), "Buyer FAQ must connect to the China sourcing page");
const contactPage = readPage("contact");
assert(contactPage.includes('<form'), "Contact page must render its enquiry form in the static HTML");
assert.match(contactPage, /<form\b[^>]*\bmethod="post"/, "Native form fallback must never append personal details to the URL");
assert(contactPage.includes('<noscript><p>Online submission requires JavaScript'), "Visitors without JavaScript need direct contact instructions");
assert(contactPage.includes('name="email"') && contactPage.includes('name="notes"'), "The enquiry must collect a reply address and requirements");
assert(contactPage.includes('data-clarity-mask="true"'), "Enquiry content must be marked for replay masking");
const sitemapXml = fs.readFileSync(path.join(out, "sitemap.xml"), "utf8");
for (const material of materialPages) {
  const route = `materials/${material.slug}`;
  const html = readPage(route);
  assert(sitemapXml.includes(`https://anwellup.com/${route}/`), "Each material landing page must be in the sitemap");
  assert(home.includes(`href="/${route}/"`), "Material pages must be reachable from the homepage");
  assert(html.includes('"@type":"CollectionPage"'), "Material pages must describe their actual collection");
  const families = materialFamilies(material);
  assert(families.length > 0, "Material landing pages must contain real catalogue families");
  for (const family of families) assert(html.includes(`href="${familyPath(family)}"`), "Material collections must link to real model pages");
  const examples = materialModelExamples(material);
  assert(examples.length > 0, "Each material page needs catalogue model examples");
  for (const { family, variant, href } of examples) {
    assert(families.includes(family) && family.variants.includes(variant), "Model examples must be original catalogue records");
    assert(html.includes(`href="${href}"`), "Material table must link to the exact model anchor");
    assert(readPage(familyPath(family).slice(1, -1)).includes(`id="model-${variant.sku}"`), "Every linked model anchor must exist");
  }
  for (const guide of material.guides) assert(html.includes(`href="${guide.href}"`), "Material pages must connect to relevant buying guides");
}
assert(readPage("materials").includes('"@type":"CollectionPage"'), "Material hub schema must describe the visible material ranges");
assert(contactPage.includes('"@type":"ContactPage"'), "Contact page must expose ContactPage structured data");
assert(contactPage.includes('"@type":"FAQPage"'), "Contact page must expose visible quotation questions");
assert(contactPage.includes(`href="mailto:${CONTACT_EMAIL}"`), "Contact page must expose the confirmed sales email");
assert(contactPage.includes('data-analytics-event="email_click"'), "Contact page email action must be tracked");
assert(contactPage.includes('"email":"admin@anwellup.com"'), "Organization structured data must expose the confirmed sales email");
assert(contactPage.includes('href="/guides/food-packaging-rfq-checklist/"'), "Contact page must connect to the RFQ checklist");
assert(contactPage.includes('href="/resources/food-packaging-rfq-template/"'), "Contact page must connect to the downloadable RFQ resource");
const rfqTemplatePage = readPage("resources/food-packaging-rfq-template");
assert(rfqTemplatePage.includes('"@type":"DigitalDocument"'), "RFQ template page must describe the downloadable workbook");
assert(rfqTemplatePage.includes('"@type":"FAQPage"'), "RFQ template page must expose visible buyer questions");
assert(rfqTemplatePage.includes('data-analytics-event="rfq_template_download"'), "RFQ template downloads must be tracked");
assert(rfqTemplatePage.includes('href="/downloads/ANWELLUP_Food_Packaging_RFQ_Template.xlsx"'), "RFQ template page must link to the workbook");
assert(rfqTemplatePage.includes('href="/resources/carton-cbm-calculator/"'), "RFQ template page must link to the carton calculator");
assert(fs.existsSync(path.join(out, "downloads", "ANWELLUP_Food_Packaging_RFQ_Template.xlsx")), "RFQ workbook must be exported with the site");
const cbmCalculatorPage = readPage("resources/carton-cbm-calculator");
assert(cbmCalculatorPage.includes('"@type":"WebApplication"'), "CBM calculator must describe the browser application");
assert(cbmCalculatorPage.includes('"@type":"FAQPage"'), "CBM calculator must expose visible buyer questions");
assert(cbmCalculatorPage.includes("Carton CBM calculator"), "CBM calculator must expose its intended search topic");
assert(cbmCalculatorPage.includes('data-analytics-location="cbm_calculator"'), "CBM calculator must expose a tracked WhatsApp action");
assert(analyticsSource.includes('"cbm_calculation"'), "Successful CBM calculations must support an analytics event");
for (const family of productFamilies) {
  const category = catalogCategories.find(item => item.id === family.category);
  const html = readPage(`products/${category.slug}/${family.id}`);
  const catalogue = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap(match => JSON.parse(match[1])).find(item => item["@type"] === "CollectionPage");
  assert(catalogue?.mainEntity?.["@type"] === "ItemList", `Missing catalogue model list: ${family.id}`);
  assert(!html.includes('"@type":"Product"') && !html.includes('"@type":"ProductGroup"'), "Unpriced quote catalogues must not claim product-snippet eligibility");
  if (family.variants.some(variant => variant.material)) assert(html.includes('<th scope="col">Material</th>'), `Known model materials must be visible in the specification table: ${family.id}`);
  for (const variant of family.variants) {
    assert(html.includes(variant.sku), `Missing exported model: ${variant.sku}`);
    assert(html.includes(`id="model-${variant.sku}"`), `Missing model anchor: ${variant.sku}`);
    const structuredModel = catalogue.mainEntity.itemListElement.find(item => item.identifier === variant.sku);
    assert(structuredModel, `Missing structured model: ${variant.sku}`);
    assert.equal(structuredModel.image.contentUrl, `https://anwellup.com${variant.image ?? family.image}`, `Model image must match: ${variant.sku}`);
    if (variant.material) assert(structuredModel.description.includes(`Material: ${variant.material}`), `Preserve known material: ${variant.sku}`);
    if (!variant.material) assert(!structuredModel.description.includes("Material:"), `Unconfirmed model material must be omitted: ${variant.sku}`);
    if (variant.name) assert.equal(structuredModel.name, `${variant.name} — ${variant.label}`, `Structured model name must preserve the source identity: ${variant.sku}`);
  }
}

for (const category of catalogCategories) {
  const html = readPage(`products/${category.slug}`);
  assert(!html.includes('"@type":"Product"'), "Category lists must not advertise incomplete product snippets");
}

const previewPort = process.env.ANWELLUP_PREVIEW_PORT ?? "4173";
const base = `http://127.0.0.1:${previewPort}`;
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
const rfqWorkbookResponse = await fetch(base + "/downloads/ANWELLUP_Food_Packaging_RFQ_Template.xlsx");
assert.equal(rfqWorkbookResponse.headers.get("content-type"), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "RFQ workbook must use the Excel content type");
console.log(JSON.stringify({ status: "passed", categories: catalogCategories.length, families: productFamilies.length, variantsChecked, htmlFiles: htmlFiles.length, uniquePageTitles: pageTitles.size, structuredDataBlocks, httpReferences: refs.size, contrastChecks, browserVisualReview: "not part of the automated suite" }, null, 2));
