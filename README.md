# ANWELLUP Product Website

ANWELLUP's English B2B product website for sustainable food-packaging buyers, distributors, foodservice groups, retailers, airline caterers and food manufacturers.

## Features

- Cinematic single-page product and material story
- 63 products across five material categories
- SKU, material, product-name and size search
- Persistent inquiry list across the full page
- Structured WhatsApp quotation handoff and inquiry builder
- Downloadable English product catalogue
- Responsive desktop and mobile layouts
- Reduced-motion support for accessibility and performance
- Build-time prerendering for crawlable initial HTML
- Dedicated buyer-information, quality, ordering, contact, privacy and terms pages
- Robots, sitemap, canonical, social metadata and structured data
- Consent-aware GTM and Microsoft Clarity hooks (disabled until IDs are configured)

## Tech stack

- React 19
- TypeScript
- Vite
- GSAP + ScrollTrigger
- Motion
- Phosphor Icons

## Local development

Requires Node.js 20 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Production build:

```bash
pnpm build
```

The production build creates static HTML for the homepage and information routes,
then removes the temporary server-rendering bundle. Verify the generated files in
`dist/` before deployment.

Preview the production build:

```bash
pnpm preview
```

## Content maintenance

- Product data: `src/data.ts`
- Page structure and English copy: `src/App.tsx`
- Visual system and responsive styles: `src/styles.css`
- Brand and product imagery: `public/assets/`
- Product catalogue: `public/downloads/`

## Optional analytics configuration

Copy `.env.example` to `.env.local` for local testing, or add the following GitHub
Actions repository variables for production builds:

- `VITE_GTM_ID`
- `VITE_CLARITY_ID`

When neither value is present, no third-party analytics script is loaded and the
analytics consent banner remains hidden. Inquiry messages and personal details are
never added to analytics events.

Product specifications, certifications, availability and commercial terms require written confirmation for each order and destination market.
