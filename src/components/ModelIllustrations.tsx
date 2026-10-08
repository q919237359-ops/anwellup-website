import Link from "next/link";
import type { ProductFamily } from "../catalog";
import { variantIllustration } from "../lib/product-images";

export function ModelIllustrations({ family }: { family: ProductFamily }) {
  const illustrated = family.variants.filter(variant => variant.image);
  if (!illustrated.length) return null;

  return <section className="model-illustrations" aria-labelledby="model-illustrations-title">
    <header><span className="eyebrow">Format reference</span><h2 id="model-illustrations-title">Compare the listed formats.</h2><p>AI-generated illustrations for orientation, not product photographs. Use the model specifications below and confirm the exact construction and sample with your enquiry.</p></header>
    <div className="model-illustration-grid">{illustrated.map(variant => {
      const illustration = variantIllustration(family, variant);
      return <figure key={variant.sku}>
        <img src={illustration.src} alt={illustration.alt} width={illustration.width} height={illustration.height} loading="lazy" decoding="async" />
        <figcaption><code>{variant.sku}</code><h3>{variant.name ?? family.name}</h3><p>{variant.label}</p><Link href={`#model-${variant.sku}`} aria-label={`View specifications for ${variant.name ?? family.name}, ${variant.sku}`}>View specifications <span aria-hidden="true">→</span></Link></figcaption>
      </figure>;
    })}</div>
  </section>;
}
