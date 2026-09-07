import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import "./editorial.css";
import "./plan-a.css";
import "./motion.css";
import { SiteChrome } from "../components/SiteChrome";
import { WHATSAPP_DISPLAY } from "../lib/contact";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://anwellup.com/#organization",
      name: "ANWELLUP",
      url: "https://anwellup.com/",
      logo: "https://anwellup.com/assets/brand/anwellup-logo-primary-orange-transparent.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: WHATSAPP_DISPLAY,
        contactType: "sales",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://anwellup.com/#website",
      url: "https://anwellup.com/",
      name: "ANWELLUP",
      publisher: { "@id": "https://anwellup.com/#organization" },
      inLanguage: "en",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anwellup.com"),
  title: { default: "ANWELLUP | Food packaging for professional buyers", template: "%s | ANWELLUP" },
  description: "Explore a multi-material food-packaging range organized for distributors, foodservice programs and professional sourcing teams.",
  applicationName: "ANWELLUP",
  keywords: ["food packaging supplier", "B2B packaging", "takeaway containers", "foodservice packaging"],
  openGraph: { title: "ANWELLUP", description: "A clearer way to compare and enquire about multi-material food packaging.", url: "/", siteName: "ANWELLUP", images: [{ url: "/assets/catalog/2026-09-r1/cups-drinkware-v1.png", width: 1448, height: 1086, alt: "ANWELLUP cups and drinkware category" }], type: "website" },
  twitter: { card: "summary_large_image", title: "ANWELLUP", description: "Multi-material food packaging for professional sourcing briefs.", images: ["/assets/catalog/2026-09-r1/cups-drinkware-v1.png"] },
  icons: { icon: "/assets/brand/anwellup-logo-primary-orange-transparent.png" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} /></head><body><a className="skip-link" href="#main-content">Skip to content</a><SiteChrome>{children}</SiteChrome></body></html>;
}
