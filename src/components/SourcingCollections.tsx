import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { sourcingPrograms, sourcingReferences } from "../sourcing-programs";

const compactDescriptions = {
  "foil-rolls": "Compare foil roll formats for catering and household retail.",
  "baking-paper": "Compare baking paper formats for bakeries and food production.",
  "foil-containers": "Compare aluminium trays and lid references for takeaway and prepared food.",
} as const;

export function SourcingCollections({ compact = false }: { compact?: boolean } = {}) {
  return <div className={`sourcing-collections${compact ? " sourcing-collections-compact" : ""}`}>{sourcingPrograms.map(program => {
    const references = sourcingReferences(program);
    const visibleReferences = compact ? references.slice(0, 2) : references;
    return <article className="sourcing-card" key={program.id}>
      <Link className="sourcing-card-image" href={references[0].href} aria-label={`Compare ${program.title.toLowerCase()}`}>
        <img src={program.image} alt={program.imageAlt} width={900} height={675} loading="lazy" />
      </Link>
      <div className="sourcing-card-copy">{!compact && <span className="eyebrow">{program.audience}</span>}<h3><Link href={references[0].href}>{program.title}</Link></h3><p>{compact ? compactDescriptions[program.id] : program.description}</p>
        <dl>{visibleReferences.map(({ variant, href }) => <div key={variant.sku}><dt><Link href={href}>{variant.sku}</Link></dt><dd>{variant.label}</dd></div>)}</dl>
        {!compact && <p className="sourcing-card-check">{program.check}</p>}
        <Link className="editorial-link" href={references[0].href}>{compact ? "Compare models" : "Compare references"} <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </article>;
  })}</div>;
}
