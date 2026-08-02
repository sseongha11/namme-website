import type { Metadata } from "next";
import {
  IBM_Plex_Sans_Arabic,
  Instrument_Sans,
  Instrument_Serif,
} from "next/font/google";

import { PreviewBanner } from "@/components/preview-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-button";
import { site } from "@/content/site";
import { isPreview } from "@/lib/site-status";

import "./globals.css";

const sans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Arabic face for the secondary /ar route. Instrument Sans has no Arabic. */
const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic-ibm",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — builders in ${site.primaryLocation} | brickwork, extensions, roofing, driveways`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: isPreview
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
  alternates: { canonical: "/" },
};

/**
 * LocalBusiness structured data — what populates the knowledge panel in search
 * results. No aggregateRating block: publishing a review score as structured
 * data states it to search engines as fact, so it goes in only once there are
 * real reviews on a real platform to back it.
 */
function OrganisationJsonLd() {
  if (isPreview) return null;

  const json = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      postalCode: site.address.postcode,
      addressCountry: "GB",
    },
    areaServed: site.primaryLocation,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable} ${arabic.variable}`}>
      {/* Grammarly and similar extensions inject attributes onto <body> before
          React hydrates, which React reports as a hydration mismatch. It is the
          extension, not our markup — suppress it at this one node only. */}
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <PreviewBanner />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
        <OrganisationJsonLd />
      </body>
    </html>
  );
}
