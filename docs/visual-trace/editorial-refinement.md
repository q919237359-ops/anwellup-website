# Editorial refinement, 2026-09-05

> Superseded palette/contact assumptions, 2026-09-06: the user selected Plan A (porcelain + olive) on September 3 and changed the WhatsApp number on September 2. The warm/cocoa preserve-mode assumption below was incorrect. Current authority: `../已确认需求与版本依据.md`, `src/app/plan-a.css` and `src/lib/contact.ts`. Historical checks below describe the earlier build, not approval of its design.

## Design read

Preserve-mode redesign of ANWELLUP's B2B packaging website. The existing orange logo, warm ivory/mineral palette, Cormorant/Manrope typography and cinematic imagery are the brand starting point. This is an editorial brand catalogue, not a dashboard or a new identity. Design variance 6, motion intensity 5, visual density 3 on brand pages and 5 in specification tables.

## Audit and decisions

- Preserve URLs, navigation labels, product records, supplied bag printing, source attribution, legal copy and WhatsApp number.
- Remove repeated section numbering, redundant eyebrows, oversized closing slogans and implementation-facing copy.
- Make the range page image-led. Keep material/SKU search and category filtering, without opening on an unbroken list of 33 families.
- Use open typographic rows for category families instead of a repeated grid of empty-looking text cards.
- Fit category/family typography to its own column rather than the viewport. Keep long names readable without collisions.
- Display the supplied bag master uncropped and no larger than its native width. Do not recolour, regenerate or retouch it.
- Keep truthful catalogue attribution and separate equipment enquiries from source factory photographs.
- Keep product specification tables as real tables: this B2B comparison function is outside the landing-page aesthetic rules.
- Preserve the print-like light theme and existing brand imagery. No new image generation or palette replacement is needed for this refinement.
- Use motion for the material narrative and navigation feedback; do not add looping decoration. Retain reduced-motion fallbacks.
- Make the enquiry form immediately reachable, contain keyboard focus in the dialog and restore focus on close.

## Verification boundary

The saved browser permission blocks localhost automation. Do not bypass it with a different browser or screenshot mechanism. Build, server rendering, resource integrity, font metrics and pure logic tests are useful checks but are not browser visual or interaction acceptance.

## Implemented

- Homepage now uses two section eyebrows rather than one above every headline. Removed decorative scroll labels and repeated large closing slogans. Retained the image-led hero, material chapter and horizontal collection.
- Collection page opens on seven linked image entries. Search and category filters still return the full applicable family set. Family names are links, not just the adjacent arrows.
- Category pages use open format rows. Detail pages keep representative imagery distinct from specifications and protect the supplied bag image with uncropped, native-width-limited presentation.
- Type on category and detail pages scales against the text column. Small screens have explicit stacked layouts and reduced type sizes.
- Specifications omit entirely unpopulated columns, while retaining all existing values and SKU references. Tables have captions, scoped headings and keyboard-accessible overflow.
- Enquiry drawer exposes the brief fields immediately, uses a consistent neutral action style and adds focus containment, background inertness and focus restoration. Mobile navigation supports Escape.
- Brand and routes are unchanged. No assets were generated, recoloured or retouched.

## Checks

`pnpm build` passed. `pnpm test:site` passed with 7 categories, 33 families, 152 variant lookups, 51 HTML files and 114 HTTP references. Tests verify family and variant search, original model lookup, non-mutating data operations, preservation of every populated specification field, one H1 per export, the uncropped bag presentation class and that the preview serves the current export.

Token contrast ratios: primary text 12.78:1, secondary text 5.87:1 on paper / 5.05:1 on tinted sections, accent-button text 5.42:1, input placeholder 5.14:1. These checks do not measure text over photography.

Browser visual review, actual wrapping/overlap, Lighthouse, motion pacing, focus behavior and RFQ submission remain unverified. No alternative browser, screenshot tool or automation route was used to bypass the permission restriction.
