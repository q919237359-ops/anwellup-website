import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { allMaterials, catalogCategories, getCategory, getFamiliesByCategory } from "../../../catalog";
import { CategoryFamilyBrowser } from "../../../components/CategoryFamilyBrowser";

export function generateStaticParams() { return catalogCategories.map((category) => ({ category: category.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return { title: category.label, description: category.description, alternates: { canonical: `/products/${category.slug}/` }, openGraph: { images: [{ url: category.image, width: category.id === "bags" ? 640 : 1448, height: category.id === "bags" ? 480 : 1086, alt: category.label }] } };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const families = getFamiliesByCategory(category.id);
  const materials = allMaterials(families);
  return <main id="main-content" className="page-main category-page">
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/products/"><ArrowLeft size={16}/> Product range</Link><span aria-hidden="true">/</span><span aria-current="page">{category.label}</span></nav>
    <header className="category-hero">
      <div className="category-hero-copy"><h1>{category.label.replaceAll(" + ", " & ")}</h1><p>{category.description}</p><div className="material-line"><span>Materials</span><p>{materials.join(", ")}</p></div><a className="editorial-link" href="#family-title">Explore formats <span><ArrowRight size={19}/></span></a></div>
      <figure className={category.id === "bags" ? "category-hero-image category-source-master" : "category-hero-image"}><div className="category-image-stage"><img src={category.image} alt={category.id === "bags" ? "Supplied PE carry-bag range with original red printing" : `${category.label} range illustration`} width={category.id === "bags" ? 640 : 1448} height={category.id === "bags" ? 480 : 1086} fetchPriority="high"/></div><figcaption>{category.id === "bags" ? "PE carry bags shown. Ask for non-woven format images with your enquiry." : "Range illustration. Refer to the selected model for specifications."}</figcaption></figure>
    </header>
    <CategoryFamilyBrowser category={category} families={families} />
  </main>;
}
