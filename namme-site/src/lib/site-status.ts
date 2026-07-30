/**
 * Preview vs live.
 *
 * The site currently carries placeholder trust signals — testimonials and
 * project case studies that are realistic but not yet real. Until those are
 * replaced with real jobs and real reviews, the site must not be indexed by
 * search engines or read by a customer as a live claim.
 *
 * This defaults to PREVIEW. Going live is a deliberate act: set
 * NEXT_PUBLIC_SITE_STATUS=live in the hosting environment, and only after
 * working through the pre-launch checklist in the root README.
 */
export const isPreview = process.env.NEXT_PUBLIC_SITE_STATUS !== "live";
