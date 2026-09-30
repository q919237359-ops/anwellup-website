import type { MetadataRoute } from "next";
import { catalogCategories, productFamilies } from "../catalog";
import { buyingGuides } from "../guides";
import { sourcingSolutions } from "../solutions";
import { materialPages } from "../materials";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://anwellup.com";
  const staticRoutes = ["", "/products", "/solutions", "/capabilities", "/manufacturing", "/quality-compliance", "/guides", "/buyer-faq", "/resources/food-packaging-rfq-template", "/resources/carton-cbm-calculator", "/about", "/contact", "/privacy", "/terms"];
  const entry = (route: string, lastModified: string): MetadataRoute.Sitemap[number] => ({
    url: `${base}${route}/`.replace(`${base}//`, `${base}/`),
    lastModified: new Date(lastModified),
    changeFrequency: route === "" ? "weekly" : route.includes("/products") || route.includes("/guides") || route.includes("/solutions") ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.split("/").length > 3 ? 0.6 : 0.8,
  });
  const staticEntries = staticRoutes.map((route) => entry(route, route === "/resources/carton-cbm-calculator" ? "2026-09-15" : route === "/resources/food-packaging-rfq-template" ? "2026-09-14" : route === "/buyer-faq" || route === "/contact" || route === "/solutions" ? "2026-09-13" : route === "/manufacturing" ? "2026-09-10" : route === "/guides" ? "2026-09-11" : "2026-09-09"));
  const categoryEntries = catalogCategories.map((category) => entry(`/products/${category.slug}`, ["cups", "boxes", "cutlery", "tableware", "foil", "bags", "gloves"].includes(category.id) ? "2026-09-11" : "2026-09-09"));
  const familyEntries = productFamilies.map((family) => {
    const category = catalogCategories.find((item) => item.id === family.category)!;
    return entry(`/products/${category.slug}/${family.id}`, ["cups", "boxes", "cutlery", "tableware", "foil", "bags", "gloves"].includes(family.category) ? "2026-09-11" : "2026-09-09");
  });
  const guideEntries = buyingGuides.map((guide) => entry(`/guides/${guide.slug}`, guide.updated));
  const solutionEntries = sourcingSolutions.map((solution) => entry(`/solutions/${solution.slug}`, solution.updated));
  const changedStaticRoutes = new Set([`${base}/`, `${base}/contact/`, `${base}/privacy/`, `${base}/guides/`, `${base}/about/`]);
  const materialEntries = [entry("/materials", "2026-09-30"), ...materialPages.map(material => entry(`/materials/${material.slug}`, "2026-09-30"))];
  return [...staticEntries.map(item => changedStaticRoutes.has(item.url) ? { ...item, lastModified: new Date("2026-09-30") } : item), ...categoryEntries, ...familyEntries, ...guideEntries, ...solutionEntries, ...materialEntries];
}
