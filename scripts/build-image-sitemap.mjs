import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
if (!fs.existsSync(root)) throw new Error("Build output not found. Run this after next build.");

const htmlFiles = [];
const walk = directory => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(fullPath);
  }
};
walk(root);

const escapeXml = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const imagesByPage = new Map();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1];
  if (!canonical?.startsWith("https://anwellup.com/")) continue;
  const images = [...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)]
    .map(match => new URL(match[1], canonical).href)
    .filter(url => url.startsWith("https://anwellup.com/"));
  const uniqueImages = [...new Set(images)];
  if (!uniqueImages.length) continue;
  const pageImages = imagesByPage.get(canonical) ?? new Set();
  for (const image of uniqueImages) pageImages.add(image);
  imagesByPage.set(canonical, pageImages);
}

const pages = [...imagesByPage.entries()].map(([canonical, images]) => ({
  canonical,
  images: [...images],
}));

const body = pages.sort((a, b) => a.canonical.localeCompare(b.canonical)).map(page => [
  "  <url>",
  `    <loc>${escapeXml(page.canonical)}</loc>`,
  ...page.images.map(url => `    <image:image><image:loc>${escapeXml(url)}</image:loc></image:image>`),
  "  </url>",
].join("\n")).join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;
fs.writeFileSync(path.join(root, "image-sitemap.xml"), xml);
console.log(`Image sitemap: ${pages.length} pages, ${pages.reduce((sum, page) => sum + page.images.length, 0)} page-image references.`);
