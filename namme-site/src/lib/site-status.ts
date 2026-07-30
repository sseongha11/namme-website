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
 * Portfolio and reviews: off until they are real.
 *
 * `src/content/projects.ts` and `src/content/testimonials.ts` still hold
 * invented placeholder entries. Rather than show made-up case studies and
 * made-up reviews, everything that renders them is hidden behind this flag:
 * the homepage sections, the Projects nav item, the /projects routes, the
 * related-work strips on service and area pages, and the sitemap entries.
 *
 * To switch it back on: replace the contents of those two files with real
 * jobs and real reviews, add photographs (see IMAGES.md), then flip this to
 * `true`. Nothing else needs changing.
 */
export const showPortfolio = false;
