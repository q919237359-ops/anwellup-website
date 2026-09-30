import type { Metadata } from "next";

export const defaultSocialImage = { url: "/assets/generated/cinematic/hero-regenerative-cinema.webp", width: 1672, height: 941, alt: "ANWELLUP food packaging range illustration" };

/** Keep a page's canonical URL and social preview about that same page. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: {
      title: `${title} | ANWELLUP`, description, url: path, type: "website",
      siteName: "ANWELLUP", locale: "en_US",
      images: [defaultSocialImage],
    },
  };
}
