import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getPageMeta, render } from "../dist-ssr/entry-server.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(projectRoot, "dist");
const serverDir = resolve(projectRoot, "dist-ssr");
const template = await readFile(resolve(distDir, "index.html"), "utf8");
const origin = "https://anwellup.com";
const routes = [
  "/",
  "/about/",
  "/quality-compliance/",
  "/samples-ordering/",
  "/contact/",
  "/privacy/",
  "/terms/",
];

const escapeJson = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");
const escapeAttribute = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function buildDocument(pathname) {
  const meta = getPageMeta(pathname);
  const canonical = `${origin}${pathname}`;
  const socialImage = `${origin}/assets/generated/cinematic/hero-regenerative-cinema.webp`;
  const head = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="ANWELLUP" />`,
    `<meta property="og:title" content="${escapeAttribute(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${socialImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttribute(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(meta.description)}" />`,
    `<meta name="twitter:image" content="${socialImage}" />`,
    `<script type="application/ld+json">${escapeJson(meta.structuredData)}</script>`,
  ].join("\n    ");

  return template
    .replace(/<title>.*?<\/title>/s, `<title>${meta.title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/s, `<meta name="description" content="${escapeAttribute(meta.description)}" />`)
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${render(pathname)}</div>`);
}

for (const pathname of routes) {
  const output = pathname === "/" ? resolve(distDir, "index.html") : resolve(distDir, pathname.slice(1), "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, buildDocument(pathname));
}

const notFoundDocument = buildDocument("/404/").replace('<meta name="robots" content="index,follow" />', '<meta name="robots" content="noindex,follow" />');
await writeFile(resolve(distDir, "404.html"), notFoundDocument);

await rm(serverDir, { recursive: true, force: true });

