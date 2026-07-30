/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR COMPANY DETAILS
 *  Edit this file to update the whole site.
 *  Anything marked TODO is a placeholder awaiting real data.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Namme",
  legalName: "Namme Ltd", // TODO confirm
  /** Straight off the business card — keep this wording. */
  tagline: "A small, local, friendly Derby-based general building company",
  description:
    "A small, local, friendly Derby-based general building company, providing a quality and reliable service at an affordable price. Brickwork, extensions, roofing, rendering, driveways, landscaping, bathrooms, kitchens, tiling and decorating.",

  phone: "07424 662851",
  phoneHref: "tel:+447424662851",
  email: "naeemhara1971@gmail.com",
  whatsapp: "https://wa.me/447424662851",

  address: {
    city: "Derby",
    postcode: "DE22 3QQ",
    country: "United Kingdom",
  },

  /** Primary town/city used across headings and metadata */
  primaryLocation: "Derby",

  /**
   * Used for canonical URLs, sitemap, Open Graph and structured data.
   * The vercel.app address is the real one — there is no custom domain, and
   * pointing canonicals at a domain nobody owns would deindex the live pages.
   */
  url: "https://namme-site.vercel.app",

  hours: [
    { days: "Monday – Thursday", time: "8:00 – 18:00" },
    { days: "Friday", time: "Closed" },
    { days: "Saturday – Sunday", time: "9:00 – 16:00" },
  ],

  social: {
    instagram: "", // TODO
    houzz: "",
    facebook: "",
  },
} as const;

/*
 * Deliberately absent: headline stats (years trading, projects completed),
 * a review score, and an accreditation list. Every one of those was invented
 * placeholder copy, and an unverifiable number on a builder's site is worse
 * than no number. Add them back only when they are real and checkable — a
 * membership number that can be looked up on the register, a review count that
 * matches the platform. Until then the site claims nothing it cannot support.
 */

/**
 * The five-stage process. This section appears on nearly every high-performing
 * builder site — homeowners are buying certainty as much as construction.
 */
export const processSteps = [
  {
    step: "01",
    title: "Call or message",
    duration: "Same day",
    body: "Tell us what needs doing — a leaking roof, a driveway, a whole house. If it’s something we don’t do, we’ll say so straight away and point you at someone who does.",
  },
  {
    step: "02",
    title: "We come and look",
    duration: "Within a few days",
    body: "We visit, measure up and talk it through on site. Free, and with no obligation — you get an honest view of what the job actually needs before anyone asks you for money.",
  },
  {
    step: "03",
    title: "Written quote",
    duration: "2–3 days later",
    body: "Itemised in writing, not one figure on a page. You can see what’s included, compare it properly against other quotes, and know what any change would cost.",
  },
  {
    step: "04",
    title: "The work",
    duration: "Agreed dates",
    body: "Start and finish dates agreed before we begin. Same faces on site each day, the place swept down at the end of it, and you’re told as soon as anything changes.",
  },
  {
    step: "05",
    title: "Finish and check",
    duration: "On completion",
    body: "We walk round it with you and put right anything you’re not happy with. Certificates for any notifiable electrical, gas or Building Control work are handed over with the invoice.",
  },
] as const;

export const faqs = [
  {
    q: "Is the quote really free?",
    a: "Yes. We come out, look at the job, and give you a written quote with no obligation and no charge, whether you go ahead or not. That applies to a day’s tiling as much as to an extension.",
  },
  {
    q: "Are the small jobs worth your while?",
    a: "They are, and they’re a large part of what we do. A garden wall, a slipped tile, a bathroom, a hallway that needs decorating — we’d rather do a small job well and be the people you ring next time than turn it down.",
  },
  {
    q: "Do I need planning permission?",
    a: "For most of what we do, no. Repairs, roofing, rendering, driveways with proper drainage, garden walls under 2m, patios, and anything internal are generally permitted development or outside the planning system altogether. Extensions often fall under permitted development too — up to 3m deep for a terraced or semi-detached house and 4m for a detached one. Conservation areas and listed buildings are the main exceptions. We tell you where you stand when we come out, free of charge.",
  },
  {
    q: "How do you handle payments?",
    a: "Payment follows completed work, never far in front of it. On small jobs that means settling up at the end; on longer ones, staged payments as each part is finished. Any deposit is for materials we’ve had to order, and never more than they cost.",
  },
  {
    q: "Do you use your own team or subcontractors?",
    a: "Brickwork, groundworks, roofing, tiling and decorating are our own people. Gas and electrical work goes to registered engineers we have used for years, so it can be certified properly — nobody should be doing that work uncertified, ourselves included.",
  },
  {
    q: "What happens if the price changes once you start?",
    a: "Nothing is charged that you haven’t agreed first. The usual causes are things nobody could see beforehand — rot under a floor, a failed lintel behind render, soft ground under a driveway. We show you what we’ve found, tell you what it costs to put right, and wait for your say-so.",
  },
  {
    q: "Are you insured?",
    a: "Yes — public liability insurance, and we’re happy to send the certificate before you commit to anything. Ask any builder for it. One who won’t send it is telling you something useful.",
  },
  {
    q: "How far do you travel?",
    a: "Derby and roughly an hour around it, across Derbyshire, Nottinghamshire and Leicestershire. If you’re on the edge of that, ring and ask — it usually depends on the size of the job rather than the distance.",
  },
] as const;
