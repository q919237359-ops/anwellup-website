import type { MetadataRoute } from "next";
import { catalogCategories, productFamilies } from "../catalog";
import { buyingGuides } from "../guides";
import { sourcingSolutions } from "../solutions";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://anwellup.com";
  const staticRoutes = ["", "/products", "/solutions", "/capabilities", "/manufacturing", "/quality-compliance", "/guides", "/about", "/contact", "/privacy", "/terms"];
  const entry = (route: string, lastModified: string): MetadataRoute.Sitemap[number] => ({
    url: `${base}${route}/`.replace(`${base}//`, `${base}/`),
    lastModified: new Date(lastModified),
    changeFrequency: route === "" ? "weekly" : route.includes("/products") || route.includes("/guides") || route.includes("/solutions") ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.split("/").length > 3 ? 0.6 : 0.8,
  });
  const staticEntries = staticRoutes.map((route) => entry(route, route === "/manufacturing" ? "2026-09-10" : "2026-09-09"));
  const categoryEntries = catalogCategories.map((category) => entry(`/products/${category.slug}`, ["cups", "boxes", "cutlery", "tableware"].includes(category.id) ? "2026-09-11" : "2026-09-09"));
  const familyEntries = productFamilies.map((family) => {
    const category = catalogCategories.find((item) => item.id === family.category)!;
    return entry(`/products/${category.slug}/${family.id}`, ["cups", "boxes", "cutlery", "tableware"].includes(family.category) ? "2026-09-11" : "2026-09-09");
  });
  const guideEntries = buyingGuides.map((guide) => entry(`/guides/${guide.slug}`, guide.updated));
  const solutionEntries = sourcingSolutions.map((solution) => entry(`/solutions/${solution.slug}`, solution.updated));
  return [...staticEntries, ...categoryEntries, ...familyEntries, ...guideEntries, ...solutionEntries];
}
