import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: ["https://anwellup.com/sitemap.xml", "https://anwellup.com/image-sitemap.xml"],
    host: "https://anwellup.com",
  };
}
