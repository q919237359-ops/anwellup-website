# ANWELLUP Product Website

ANWELLUP's English B2B product website for sustainable food-packaging buyers, distributors, foodservice groups, retailers, airline caterers and food manufacturers.

## Features

- Cinematic single-page product and material story
- 63 products across five material categories
- SKU, material, product-name and size search
- Persistent inquiry list across the full page
- Structured WhatsApp quotation handoff
- Downloadable English product catalogue
- Responsive desktop and mobile layouts
- Reduced-motion support for accessibility and performance

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

Product specifications, certifications, availability and commercial terms require written confirmation for each order and destination market.
