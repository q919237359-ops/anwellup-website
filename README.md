# ANWELLUP B2B product website

ANWELLUP's English multi-material food-packaging website for distributors, foodservice programs, retailers and professional sourcing teams.

## Current implementation

- Next.js 16 App Router with static export
- Seven category entry pages and model-level product-family routes
- Unified public `AW-*` SKUs; supplier references are excluded from the public repository and export
- Category-aware material filters plus family, size and `AW-*` SKU search
- Persistent browser-local RFQ list with a structured WhatsApp handoff
- Customization page and equipment enquiries without factory-ownership claims
- Dedicated `/manufacturing/` page with attributed source-catalogue factory and equipment images
- Approved orange wordmark in navigation and footer; original PNG pixels are preserved
- GSAP scroll reveals, hero parallax and desktop pinned category browsing, with reduced-motion fallback
- Cinematic homepage with original still-life, material macro and OEM imagery
- Model-specific quality and documentation enquiry guidance
- Responsive layout, keyboard focus styles, reduced-motion support and custom 404
- Per-route metadata, canonical URLs, Open Graph data, robots and sitemap
- Traceable category visuals with Product Truth, brand rules and image manifest

## Local development

Requires Node.js 20 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production build

```bash
pnpm check
pnpm build
```

`next build` creates a static export in `out/` because `next.config.ts` uses `output: "export"`.

To review that output locally:

```bash
pnpm preview
```

Then open `http://127.0.0.1:4173/`.

With the preview running, validate catalogue logic and exported references:

```bash
pnpm test:site
```

This checks search, specification fields, export structure, token contrast and HTTP resources. It does not replace browser visual and interaction review.

## Content maintenance

- Existing model records: `src/data.ts`
- Category and product-family taxonomy: `src/catalog.ts`
- Pages and metadata: `src/app/`
- Shared RFQ and site chrome: `src/components/`
- Visual system: `src/app/globals.css` and `src/app/editorial.css`
- Approved category assets: `public/assets/catalog/2026-09-r1/`
- Visual provenance and QA records: `docs/visual-trace/`

## Publication boundary

Category images support navigation and do not prove the specification or suitability of an exact SKU. Product specifications, certification or test status, destination-market suitability, availability, MOQ, price and lead time require written confirmation for the selected model and order configuration.

The Carry + Shopping Bags category uses the supplied source master without redrawing its printing. Generated bag alternatives rejected during visual QA are not part of the website.
