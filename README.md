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

For a self-contained release check after building, run `pnpm test:release`. It starts and stops its own temporary-port preview, leaving existing previews alone. GitHub Pages runs `pnpm test:release --production` before uploading the artifact, also requiring the online form and a configured analytics route. Run `pnpm test:inquiry` to verify enquiry behavior without sending mail.

## Content maintenance

### Enquiries and measurement

- Copy `.env.example` to `.env.local` for local configuration. These are public browser identifiers; server secrets belong only in the Cloudflare Worker.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` enables online submission to the existing inquiry Worker. Without it, the form retains email, WhatsApp and copy-for-webmail options.
- The real widget is restricted to the production domain; localhost preview is for content/layout review. Test submission logic with `pnpm test:inquiry` (mocked verification and email providers, no real messages).
- `NEXT_PUBLIC_ANALYTICS_MODE=ga4` uses direct GA4; `gtm` uses the published GTM container instead. Do not configure both delivery paths for the same event. Localhost previews do not load analytics.
- `generate_lead` means the website service accepted an enquiry. Email/WhatsApp clicks have separate events. Acceptance does not prove inbox delivery or lead quality.
- The contact page and RFQ drawer share one in-memory submission status: closing the drawer or navigating within the site preserves an in-flight request and its receipt. A deliberate new enquiry resets the draft and selection. Reloading or closing the browser tab does not preserve personal details or receipts.
- Production builds read public values from GitHub repository variables. Changing a variable requires a new build to affect the site.
- `pnpm audit:live` performs a read-only sitemap/metadata crawl and saves `.private/live-seo-audit.json`. It does not inspect Search Console indexing or send enquiries.
- Material landing pages use `src/materials.ts` and real catalogue records. Regulatory-source content is in `src/plastic-alternatives-guide.ts`; check its references before updating market claims.
- Catalogue search accepts material/size combinations, spelling variants and normalized units, but preserves exact AW model identifiers and numeric sizes. Add regression cases in `scripts/check-site.mjs` when expanding supported terms; do not turn unverified environmental claims into product aliases.
- Material model examples are selected directly from catalogue records and link to existing model anchors. Do not replace missing specifications with inferred values.
- Root Twitter metadata deliberately sets only the card type so each route inherits its own Open Graph preview. `pageMetadata` supplies static page defaults; release and live audits check titles, sharing URLs and images for stale homepage inheritance.

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
