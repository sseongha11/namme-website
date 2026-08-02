import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { isPreview } from "@/lib/site-status";

export default function robots(): MetadataRoute.Robots {
  // While the site carries placeholder trust signals, keep it out of search
  // entirely. Flipping NEXT_PUBLIC_SITE_STATUS=live opens it up.
  if (isPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The card and leaflet PDFs are for someone who is already here. Left
      // crawlable they rank on their own, and a search result that opens a PDF
      // rather than a page is a dead end — no navigation, no way to enquire.
      disallow: "/downloads/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
