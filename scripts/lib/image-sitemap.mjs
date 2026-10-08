const voidElements = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
const decodeAttribute = value => value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, entity => {
  const named = { "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">" };
  if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
  const hex = entity[2].toLowerCase() === "x";
  return String.fromCodePoint(Number.parseInt(entity.slice(hex ? 3 : 2, -1), hex ? 16 : 10));
});

// Read only content images from exported HTML. A header inside main can hold a
// product hero; global navigation and the site footer live outside main.
export function contentImageUrls(html, canonical) {
  const ancestors = [];
  const urls = new Set();
  const tokens = /<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script\s*>|<\/?([a-z][\w:-]*)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi;
  for (const token of html.matchAll(tokens)) {
    if (!token[1]) continue;
    const tag = token[1].toLowerCase();
    if (token[0].startsWith("</")) {
      const index = ancestors.findLastIndex(element => element.tag === tag);
      if (index >= 0) ancestors.length = index;
      continue;
    }
    const attributes = Object.fromEntries([...token[2].matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)]
      .map(match => [match[1].toLowerCase(), decodeAttribute(match[2] ?? match[3] ?? match[4] ?? "")]));
    const hidden = Object.hasOwn(attributes, "hidden") || attributes["aria-hidden"] === "true" || ancestors.some(element => element.hidden);
    if (tag === "img" && ancestors.some(element => element.tag === "main") && !hidden && attributes.src?.trim() && attributes.alt?.trim() && !["none", "presentation"].includes(attributes.role)) {
      try {
        const url = new URL(attributes.src, canonical);
        if (url.origin === new URL(canonical).origin && !url.pathname.startsWith("/assets/brand/")) urls.add(url.href);
      } catch { /* Ignore an absent or invalid image source. */ }
    }
    if (!voidElements.has(tag) && !token[0].endsWith("/>")) ancestors.push({ tag, hidden });
  }
  return [...urls];
}
