import fs from "node:fs";

// Read-only crawl. Node 24+: NODE_USE_ENV_PROXY=1 honors an existing HTTPS_PROXY.
const origin = process.env.AUDIT_ORIGIN || "https://anwellup.com";
const output = process.env.AUDIT_OUTPUT || ".private/live-seo-audit.json";
async function get(url) {
  const started = Date.now();
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
    return { url, finalUrl: response.url, status: response.status, ms: Date.now() - started,
      type: response.headers.get("content-type"), xRobots: response.headers.get("x-robots-tag"), body: await response.text() };
  } catch (error) { return { url, error: error.message }; }
}
const sitemap = await get(`${origin}/sitemap.xml`);
if (sitemap.status !== 200) throw new Error(`Sitemap unavailable: ${JSON.stringify(sitemap)}`);
const urls = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const strip = value => (value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const pages = [];
for (let index = 0; index < urls.length; index += 6) {
  const batch = await Promise.all(urls.slice(index, index + 6).map(async url => {
    const response = await get(url);
    const html = response.body || "";
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] || "";
    return { ...response, body: undefined, bytes: Buffer.byteLength(html),
      title: strip(html.match(/<title>(.*?)<\/title>/s)?.[1]),
      description: html.match(/<meta name="description" content="([^"]*)"/)?.[1],
      canonical: html.match(/<link rel="canonical" href="([^"]*)"/)?.[1],
      ogTitle: html.match(/<meta property="og:title" content="([^"]*)"/)?.[1],
      twitterTitle: html.match(/<meta name="twitter:title" content="([^"]*)"/)?.[1],
      ogUrl: html.match(/<meta property="og:url" content="([^"]*)"/)?.[1],
      ogImage: html.match(/<meta property="og:image" content="([^"]*)"/)?.[1],
      twitterImage: html.match(/<meta name="twitter:image" content="([^"]*)"/)?.[1],
      h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(match => strip(match[1])),
      noindex: /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(html),
      words: strip(main.replace(/<script\b[\s\S]*?<\/script>/g, "")).split(/\s+/).length,
      forms: [...html.matchAll(/<form\b/g)].length,
      links: [...new Set([...main.matchAll(/<a[^>]+href="([^"]+)"/g)].map(match => match[1]))],
    };
  }));
  pages.push(...batch);
}
const endpoints = await Promise.all([
  `${origin}/robots.txt`, `${origin}/image-sitemap.xml`, `${origin}/not-a-real-page-seo-audit/`,
  "https://www.googletagmanager.com/gtm.js?id=GTM-PJPQ86HK",
  "https://www.googletagmanager.com/gtag/js?id=G-M59JFV53QJ",
  "https://www.clarity.ms/tag/yeusnemjlt",
  "https://anwellup-inquiry-api.q919237359.workers.dev/health",
].map(async url => { const result = await get(url); return { ...result, body: result.body?.length < 1500 ? result.body : undefined }; }));
const titles = new Map();
for (const page of pages) titles.set(page.title, [...(titles.get(page.title) || []), page.url]);
const summary = {
  pages: pages.length, non200: pages.filter(page => page.status !== 200).map(page => page.url),
  noindex: pages.filter(page => page.noindex).map(page => page.url),
  wrongCanonicals: pages.filter(page => page.canonical !== page.url).map(page => ({ url: page.url, canonical: page.canonical })),
  h1Problems: pages.filter(page => page.h1.length !== 1).map(page => page.url),
  duplicateTitles: [...titles].filter(([, value]) => value.length > 1),
  missingDescriptions: pages.filter(page => !page.description).map(page => page.url),
  socialPreviewProblems: pages.flatMap(page => {
    const issues = [page.ogTitle !== page.title ? "Open Graph title" : "", page.twitterTitle !== page.title ? "Twitter title" : "", page.ogUrl !== page.canonical ? "Sharing URL" : "", !page.ogImage || page.twitterImage !== page.ogImage ? "Preview image" : ""].filter(Boolean);
    return issues.length ? [{ url: page.url, issues }] : [];
  }),
};
fs.mkdirSync(".private", { recursive: true });
fs.writeFileSync(output, JSON.stringify({ checkedAt: new Date().toISOString(), summary, endpoints, pages }, null, 2));
console.log(JSON.stringify({ output, summary, endpoints: endpoints.map(({ body, ...item }) => item) }, null, 2));
