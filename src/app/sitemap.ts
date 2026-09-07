import type { MetadataRoute } from "next";
import { catalogCategories, productFamilies } from "../catalog";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://anwellup.com";
  const staticRoutes = ["", "/products", "/capabilities", "/manufacturing", "/quality-compliance", "/contact", "/privacy", "/terms"];
  const categoryRoutes = catalogCategories.map((category) => `/products/${category.slug}`);
  const familyRoutes = productFamilies.map((family) => { const category = catalogCategories.find((item) => item.id === family.category)!; return `/products/${category.slug}/${family.id}`; });
  return [...staticRoutes, ...categoryRoutes, ...familyRoutes].map((route) => ({ url: `${base}${route}/`.replace(`${base}//`, `${base}/`), lastModified: new Date("2026-09-05"), changeFrequency: route.includes("/products") ? "monthly" : "yearly", priority: route === "" ? 1 : route.split("/").length > 3 ? 0.6 : 0.8 }));
}
