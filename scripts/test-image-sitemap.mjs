import assert from "node:assert/strict";
import test from "node:test";
import { contentImageUrls } from "./lib/image-sitemap.mjs";

test("content heroes survive while navigation, footer and decorative images are excluded", () => {
  const html = `<header><img src="/navigation.webp" alt="Navigation"></header>
    <main><header><img src="/product.webp" alt="Product format"></header>
      <img src="/assets/brand/logo.webp" alt="ANWELLUP">
      <img src="/decoration.webp" alt="">
      <img src="/presentation.webp" alt="Decoration" role="presentation">
      <figure aria-hidden="true"><img src="/hidden.webp" alt="Hidden decoration"></figure>
      <div hidden><img src="/hidden-attribute.webp" alt="Hidden decoration"></div>
      <figure><img src="/model.webp" alt="Model illustration" loading="lazy"></figure>
      <script>const sample = '<img src="/script.webp" alt="Example">';</script>
    </main><footer><img src="/footer.webp" alt="Footer illustration"></footer>`;
  assert.deepEqual(contentImageUrls(html, "https://anwellup.com/products/"), [
    "https://anwellup.com/product.webp", "https://anwellup.com/model.webp",
  ]);
  assert.deepEqual(contentImageUrls('<header><img src="/assets/brand/logo.webp" alt="Logo"></header><main><h1>Contact</h1></main>', "https://anwellup.com/contact/"), []);
});

test("content images are decoded, deduplicated and restricted to the site's origin", () => {
  const html = `<main><img alt='Reference &amp; illustration' src='/reference.webp?format=webp&amp;v=2'>
    <img src="https://anwellup.com/reference.webp?format=webp&amp;v=2" alt="Same reference">
    <img src="https://example.com/external.webp" alt="External">
    <img alt="Missing source"></main>`;
  assert.deepEqual(contentImageUrls(html, "https://anwellup.com/"), ["https://anwellup.com/reference.webp?format=webp&v=2"]);
});
