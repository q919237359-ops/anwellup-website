import fs from "node:fs";
import path from "node:path";

const publicRoot = path.resolve("public");
const scanRoot = fs.existsSync(path.resolve("out")) ? path.resolve("out") : path.resolve("src");
const textExtensions = new Set([".html", ".tsx", ".ts", ".css", ".xml"]);
const assetPattern = /(?:https:\/\/anwellup\.com)?(\/assets\/[^"'<>\s)]+\.(?:png|jpe?g|webp|svg))/gi;
const references = new Set();

const walk = (directory, visit) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, visit);
    else if (entry.isFile()) visit(fullPath);
  }
};

walk(scanRoot, file => {
  if (!textExtensions.has(path.extname(file).toLowerCase())) return;
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(assetPattern)) references.add(match[1]);
});

const active = [...references].map(url => {
  const file = path.join(publicRoot, ...url.split("/").filter(Boolean));
  return { url, format: path.extname(url).slice(1).toLowerCase(), bytes: fs.existsSync(file) ? fs.statSync(file).size : null };
}).sort((a, b) => a.url.localeCompare(b.url));
const missing = active.filter(item => item.bytes === null);
const nonWebpRaster = active.filter(item => ["png", "jpg", "jpeg"].includes(item.format));
const totals = active.reduce((map, item) => {
  const current = map.get(item.format) ?? { count: 0, bytes: 0 };
  current.count += 1;
  current.bytes += item.bytes ?? 0;
  map.set(item.format, current);
  return map;
}, new Map());

console.log(JSON.stringify({
  scanned: path.relative(process.cwd(), scanRoot),
  activeImages: active.length,
  totals: Object.fromEntries(totals),
  activeNonWebpRaster: nonWebpRaster,
  missing,
}, null, 2));
if (missing.length) process.exitCode = 1;
