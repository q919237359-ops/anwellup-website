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
const { filterCatalog, matchingVariants, materialsForCategory, readCatalogFilters, writeCatalogFilters } = load("src/lib/catalog-search.ts");
const { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, GENERAL_WHATSAPP_URL, whatsappInquiryUrl } = load("src/lib/contact.ts");
const { getSpecificationColumns } = load("src/lib/specification-columns.ts");
const { galleryDistance, galleryProgress } = load("src/lib/gallery-motion.ts");
const baseline = JSON.stringify(productFamilies);
assert.equal(catalogCategories.length, 7);
assert.equal(productFamilies.length, 33);
assert.equal(equipmentFamilies.length, 3);
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
assert(!home.includes("carry-shopping-bags-source-master-v1.png"), "Homepage must use the approved matching backdrop");
assert(!home.includes("cinema-baseline"));
assert(robots.includes("https://anwellup.com/image-sitemap.xml"), "robots.txt must advertise the image sitemap");
assert(imageSitemap.includes("<image:image>"), "Image sitemap must include discoverable images");
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
assert(readPage("products/carry-shopping-bags/pe-shopping-bags").includes("category-source-master"));
assert(readPage("products/carry-shopping-bags/pe-shopping-bags").includes("spec-table-short"));
assert(readPage("products/carry-shopping-bags/pe-shopping-bags").includes('"@type":"ProductGroup"'), "Family page must expose ProductGroup structured data");
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
