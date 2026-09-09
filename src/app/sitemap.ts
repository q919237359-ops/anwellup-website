import type { MetadataRoute } from "next";
import { catalogCategories, productFamilies } from "../catalog";
import { buyingGuides } from "../guides";
import { sourcingSolutions } from "../solutions";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://anwellup.com";
  const staticRoutes = ["", "/products", "/solutions", "/capabilities", "/manufacturing", "/quality-compliance", "/guides", "/about", "/contact", "/privacy", "/terms"];
  const categoryRoutes = catalogCategories.map((category) => `/products/${category.slug}`);
  const familyRoutes = productFamilies.map((family) => { const category = catalogCategories.find((item) => item.id === family.category)!; return `/products/${category.slug}/${family.id}`; });
  const guideRoutes = buyingGuides.map((guide) => `/guides/${guide.slug}`);
  const solutionRoutes = sourcingSolutions.map((solution) => `/solutions/${solution.slug}`);
  return [...staticRoutes, ...categoryRoutes, ...familyRoutes, ...guideRoutes, ...solutionRoutes].map((route) => ({
    url: `${base}${route}/`.replace(`${base}//`, `${base}/`),
    lastModified: new Date("2026-09-08"),
    changeFrequency: route === "" ? "weekly" : route.includes("/products") || route.includes("/guides") || route.includes("/solutions") ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.split("/").length > 3 ? 0.6 : 0.8,
  }));
}
