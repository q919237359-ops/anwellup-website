# Manufacturing image sources

The manufacturing page uses images extracted from supplied PDF catalogues. No AI retouching, machine reconstruction or resolution enhancement was performed. Original catalogue images are low resolution; replace them with original photography when supplied.

Original PNG extractions and pixel-identical lossless WebP delivery copies are in `public/assets/manufacturing/2026-09-source/`. The website serves the WebP copies; the PNG files remain as source evidence.

| Output filename | Source | PDF page (one-based) | Embedded image |
| --- | --- | --- | --- |
| aluminium-factory-overview-source.png | 03_Source_Aluminium_Foil.pdf | 3 | Im0.jp2, 720 x 362 |
| plastic-blister-injection-malaysia-source.png | 04_Source_CNYU_PACK_2026.pdf | 3 | Im1.jpg, 176 x 127 |
| plastic-blister-injection-sichuan-source.png | 04_Source_CNYU_PACK_2026.pdf | 3 | Im2.jpg, 185 x 172 |
| paper-cup-line-kunming-source.png | 04_Source_CNYU_PACK_2026.pdf | 3 | Im4.jpg, 180 x 153 |
| coated-paper-floor-philadelphia-source.png | 04_Source_CNYU_PACK_2026.pdf | 3 | Im6.jpg, 185 x 155 |
| injection-moulding-cangzhou-source.png | 04_Source_CNYU_PACK_2026.pdf | 3 | Im7.jpg, 175 x 125 |
| bag-production-chuzhou-source.png | 04_Source_CNYU_PACK_2026.pdf | 3 | Im8.jpg, 211 x 126 |

On 2026-09-07, each PNG was converted to lossless WebP and decoded back to RGBA for a byte-for-byte pixel comparison. All seven delivery copies passed. No crop, redraw, retouching or resolution change was applied.

Source root: `C:/Users/Administrator/Desktop/garden-skills-main/tmp/pdfs/ANWELLUP_Project_Handoff_2026/07_Source_PDFs/`.

Facility names come from the source factory-introduction spread, inspected visually. Catalogue attribution remains visible on the site. These source pictures do not establish ANWELLUP ownership, partnership, capacity, certification or the identity of the supplier for a future order. Equipment enquiry families are not matched to specific machines in these images.

## Brand and motion repair, 2026-09-05

The supplied orange transparent wordmark replaces the old SVG in the header, footer, metadata and favicon. A CSS viewport accommodates its transparent margins without changing the PNG.

The GSAP implementation is adapted from the repository's original `HEAD:src/App.tsx`: staggered headline entry, image parallax, scroll-triggered section entry and pinned horizontal browsing. The new responsive category structure is retained. Animation initializes only when supported and respects reduced-motion preferences; effect cleanup reverts GSAP on route changes.

## Cinematic redesign follow-through

The homepage now reuses the original cinematic hero, fibre macro and OEM studio imagery. Full-width visual chapters, serif headlines, warm colour fields and horizontal material browsing restore the original storytelling direction while retaining the Next.js product routes and enquiry list. The desktop horizontal chapter pins only on sufficiently tall, wide screens; smaller screens retain native horizontal scrolling. Reduced-motion mode leaves content static and accessible.

The manufacturing page displays the six catalogue floor images as small editorial thumbnails, not full-width hero photography. The factory overview remains capped at its source width of 720 pixels. Three equipment enquiry families remain separate from those source photographs. Capabilities and quality pages use the same typographic hierarchy and more concise customer-facing copy.

The enquiry drawer now accepts a project brief even before products are selected. Local selection persistence waits for stored items to load and degrades to a session-only selection if storage is unavailable.

Live browser inspection was not performed because the user's saved browser permission blocks localhost automation. Build and HTTP checks are separate from visual acceptance; motion pacing and rendered responsive layouts still require a permitted browser review.

### Validation of this revision

- `pnpm build`: passed; all 52 Next.js generation tasks completed.
- `pnpm check`: TypeScript passed.
- Export inspection: 51 HTML files; no Unicode replacement characters found.
- HTTP check at `http://127.0.0.1:4173`: 114 unique page, image, script, stylesheet, font and download references returned HTTP 200. Inline SVG fragment references were excluded from network checks.
- Homepage response uses `text/html; charset=utf-8` and includes the original hero, material chapter, horizontal collection and supplied orange logo.
- Manufacturing output includes six source-photo entries and all three equipment enquiry SKUs; quality output contains the revised copy without the old document-room placeholder.
- Browser interaction, visual overlap, animation pacing and responsive rendering remain unverified. HTTP checks do not exercise RFQ persistence or submission interaction.
