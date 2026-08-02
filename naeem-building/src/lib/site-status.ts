/**
 * Preview vs live.
 *
 * This defaults to PREVIEW, which keeps the site out of search results and
 * shows a banner saying it isn't finished. Going live is a deliberate act: set
 * NEXT_PUBLIC_SITE_STATUS=live in the hosting environment, and only after
 * working through the pre-launch checklist in the root README.
 */
export const isPreview = process.env.NEXT_PUBLIC_SITE_STATUS !== "live";

/**
 * Portfolio and reviews.
 *
 * ON, because the one project and the one review in `src/content/projects.ts`
 * and `src/content/testimonials.ts` are real. It was off while those files
 * held invented placeholders.
 *
 * This flag controls the homepage sections, the Projects nav item, the
 * /projects routes, the related-work strips on service and area pages, and the
 * sitemap entries. If the content ever goes back to being placeholder, set it
 * to `false` rather than deleting anything.
 */
export const showPortfolio = true;
