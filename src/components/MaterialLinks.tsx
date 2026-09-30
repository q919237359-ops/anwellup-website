import Link from "next/link";
import { materialPages, materialFamilies } from "../materials";
import type { CategoryId } from "../catalog";

export function MaterialLinks({ category }: { category?: CategoryId }) {
  const materials = materialPages.filter(material => !category || materialFamilies(material).some(family => family.category === category));
  if (!materials.length) return null;
  return <nav className="material-links" aria-label="Compare food packaging by material"><span>Compare by material</span>{materials.map(material => <Link href={`/materials/${material.slug}/`} key={material.slug}>{material.name}</Link>)}</nav>;
}
