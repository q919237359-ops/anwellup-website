import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { sourcingPrograms, sourcingReferences } from "../sourcing-programs";

export function SourcingCollections() {
  return <div className="sourcing-collections">{sourcingPrograms.map(program => {
    const references = sourcingReferences(program);
    return <article className="sourcing-card" key={program.id}>
      <Link className="sourcing-card-image" href={references[0].href} aria-label={`Compare ${program.title.toLowerCase()}`}>
        <img src={program.image} alt={program.imageAlt} width={900} height={675} loading="lazy" />
      </Link>
      <div className="sourcing-card-copy"><span className="eyebrow">{program.audience}</span><h3><Link href={references[0].href}>{program.title}</Link></h3><p>{program.description}</p>
        <dl>{references.map(({ variant, href }) => <div key={variant.sku}><dt><Link href={href}>{variant.sku}</Link></dt><dd>{variant.label}</dd></div>)}</dl>
        <p className="sourcing-card-check">{program.check}</p>
        <Link className="editorial-link" href={references[0].href}>Compare references <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </article>;
  })}</div>;
}
