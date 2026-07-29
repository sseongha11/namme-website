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
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
