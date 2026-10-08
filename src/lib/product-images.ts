import type { CategoryId, ProductFamily, ProductVariant } from "../catalog";

const productImageHeights: Record<string, number> = {
  "aw-al-g1450.webp": 636,
  "aw-al-w1150.webp": 600,
  "aw-bg-h96.webp": 600,
  "aw-gl-vinyl.webp": 676,
  "aw-pb-1300.webp": 541,
};

export function productImageSize(image: string, category: CategoryId) {
  if (image.startsWith("/assets/generated/products/")) return { width: 900, height: productImageHeights[image.split("/").at(-1)!] ?? 675 };
  if (category === "bags") return { width: 640, height: 480 };
  return { width: 1448, height: 1086 };
}

export function variantIllustration(family: ProductFamily, variant: ProductVariant) {
  const src = variant.image ?? family.image;
  return {
    src,
    ...productImageSize(src, family.category),
    alt: variant.image
      ? `${variant.name ?? family.name}, ${variant.sku} — AI-generated format illustration`
      : `${family.name} range illustration; no model-specific image for ${variant.sku}`,
    caption: variant.image
      ? `AI-generated format illustration for ${variant.sku}; not a product photograph. Confirm the exact model, construction and sample with your enquiry.`
      : `Representative range illustration, not a photograph of ${variant.sku}. Confirm the selected model with your enquiry.`,
  };
}
