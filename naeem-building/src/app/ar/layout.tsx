import type { Metadata } from "next";

import { ar } from "@/content/ar";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: ar.meta.title,
  description: ar.meta.description,
  alternates: {
    canonical: "/ar",
    languages: {
      "en-GB": "/",
      ar: "/ar",
    },
  },
  openGraph: {
    locale: "ar",
    alternateLocale: "en_GB",
    title: ar.meta.title,
    description: ar.meta.description,
    siteName: site.name,
  },
};

/**
 * The Arabic page sets `dir="rtl"` on its own wrapper rather than on <html>,
 * because the root layout stays `lang="en-GB"` — English is the primary
 * language of the site and the shared header/footer remain LTR. Everything
 * inside this subtree flips.
 */
export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" lang="ar" className="font-arabic">
      {children}
    </div>
  );
}
