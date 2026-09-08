import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import "./editorial.css";
import "./plan-a.css";
import "./motion.css";
import { SiteChrome } from "../components/SiteChrome";
import { TrafficAnalytics } from "../components/TrafficAnalytics";
import { JsonLd } from "../components/JsonLd";
import { GENERAL_WHATSAPP_URL, WHATSAPP_DISPLAY } from "../lib/contact";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://anwellup.com/#organization",
      name: "ANWELLUP",
      url: "https://anwellup.com/",
      logo: "https://anwellup.com/assets/brand/anwellup-logo-primary-orange-transparent.webp",
      description: "An English-language B2B catalogue and enquiry service for professional food-packaging sourcing.",
      knowsAbout: [
        "Cups and drinkware",
        "Takeaway boxes and containers",
        "Plates, bowls and trays",
        "Foil, wraps and baking paper",
        "Cutlery and meal kits",
        "Carry and shopping bags",
        "Gloves and protective supplies",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: WHATSAPP_DISPLAY,
        url: GENERAL_WHATSAPP_URL,
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
  title: { default: "Wholesale Food Packaging Supplier | ANWELLUP", template: "%s | ANWELLUP" },
  description: "Source cups, takeaway containers, tableware, foil, cutlery, carry bags and gloves for wholesale, foodservice and custom packaging projects.",
  applicationName: "ANWELLUP",
  authors: [{ name: "ANWELLUP", url: "https://anwellup.com/about/" }],
  creator: "ANWELLUP",
  publisher: "ANWELLUP",
  keywords: ["wholesale food packaging", "food packaging supplier", "custom food packaging", "takeaway containers", "foodservice packaging"],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { title: "Wholesale Food Packaging Supplier | ANWELLUP", description: "Compare multi-material food packaging and prepare a clear wholesale or custom sourcing brief.", url: "/", siteName: "ANWELLUP", locale: "en_US", images: [{ url: "/assets/catalog/2026-09-r1/cups-drinkware-v1.webp", width: 1448, height: 1086, alt: "ANWELLUP cups and drinkware range" }], type: "website" },
  twitter: { card: "summary_large_image", title: "Wholesale Food Packaging Supplier | ANWELLUP", description: "Compare multi-material food packaging for wholesale, foodservice and custom sourcing projects.", images: ["/assets/catalog/2026-09-r1/cups-drinkware-v1.webp"] },
  icons: { icon: "/assets/brand/anwellup-logo-primary-orange-transparent.png" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><JsonLd data={structuredData} /></head><body><TrafficAnalytics /><a className="skip-link" href="#main-content">Skip to content</a><SiteChrome>{children}</SiteChrome></body></html>;
}
