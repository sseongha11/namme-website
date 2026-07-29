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
  tagline: "Extensions, lofts and renovations",
  description:
    "Builders specialising in home extensions, loft conversions and full renovations. Fixed written specifications, staged payments and one site manager from start to handover.",

  phone: "07424 662851",
  phoneHref: "tel:+447424662851",
  // TODO: replace the email and address below with the real ones.
  email: "hello@namme.co.uk",
  whatsapp: "https://wa.me/447424662851",

  // TODO: replace with the real base + service area
  address: {
    line1: "1 Example Street",
    city: "Derby",
    postcode: "DE1 0AA",
    country: "United Kingdom",
  },

  /** Primary town/city used across headings and metadata */
  primaryLocation: "Derby",

  /** Used for canonical URLs, sitemap and Open Graph */
  url: "https://www.namme.co.uk", // TODO confirm domain

  hours: [
    { days: "Monday – Friday", time: "8:00 – 18:00" },
    { days: "Saturday", time: "9:00 – 14:00" },
    { days: "Sunday", time: "Closed" },
  ],

  social: {
    instagram: "", // TODO
    houzz: "",
    facebook: "",
  },

  /**
   * Headline numbers. These sit in the stats bar directly under the hero —
   * research shows they carry a lot of the early credibility load, so keep
   * them accurate. Do not inflate: specific beats impressive.
   */
  stats: [
    { value: "15+", label: "Years building" },
    { value: "350+", label: "Projects completed" },
    { value: "4.9", label: "Average rating" },
    { value: "5 yr", label: "Structural warranty" },
  ],

  /**
   * Review score shown in the hero trust strip.
   */
  rating: {
    score: "4.9",
    count: "120",
    source: "Google & Checkatrade", // TODO confirm platforms
  },
} as const;

/**
 * Accreditations. Industry research is clear that these only convert when you
 * explain what they *mean* — a bare logo wall is close to worthless. Each entry
 * carries a one-line explanation which is rendered alongside the name.
 */
export const accreditations = [
  {
    name: "FMB",
    full: "Federation of Master Builders",
    meaning:
      "Independently inspected, fully insured and bound by a published code of practice.",
  },
  {
    name: "TrustMark",
    full: "Government Endorsed Quality",
    meaning:
      "Government-backed vetting covering technical competence and trading standards.",
  },
  {
    name: "5-Year Warranty",
    full: "Structural warranty",
    meaning:
      "Insurance-backed structural cover on the work we carry out, transferable if you sell.",
  },
  {
    name: "Gas Safe",
    full: "Gas Safe Register",
    meaning: "Every gas appliance and pipework alteration signed off legally.",
  },
  {
    name: "NICEIC",
    full: "Approved Contractor",
    meaning: "Electrical work certified to BS 7671 and Part P on completion.",
  },
  {
    name: "CSCS",
    full: "Site safety accredited",
    meaning: "Every operative on your site is carded and safety-assessed.",
  },
] as const;

/**
 * The five-stage process. This section appears on nearly every high-performing
 * builder site — homeowners are buying certainty as much as construction.
 */
export const processSteps = [
  {
    step: "01",
    title: "Consultation",
    duration: "Week 1",
    body: "We visit, measure up and talk through what you want from the space. You get an honest view of what’s buildable and what it’s likely to cost — before anyone asks you for money.",
  },
  {
    step: "02",
    title: "Quote & specification",
    duration: "Weeks 2–3",
    body: "A written specification line by line, not a single figure on one page. You can see exactly what is included, compare it properly against other quotes, and know what any change would cost.",
  },
  {
    step: "03",
    title: "Approvals & preparation",
    duration: "Weeks 4–8",
    body: "We coordinate the structural engineer, deal with Building Control, serve party wall notices where they’re needed and order long-lead materials so nothing stalls the programme later.",
  },
  {
    step: "04",
    title: "Build",
    duration: "12–20 weeks",
    body: "One dedicated site manager, a fixed programme and weekly written updates with photographs. You always know what happened this week and what happens next.",
  },
  {
    step: "05",
    title: "Handover",
    duration: "Completion",
    body: "Full snagging walkthrough, all certificates and warranties issued in one pack, and a call at six months to check everything is still performing.",
  },
] as const;

export const faqs = [
  {
    q: "Do I need planning permission for a rear extension?",
    a: "Often not. Many single-storey rear extensions fall under permitted development — up to 3m for a terraced or semi-detached house, or 4m for a detached one, and up to 6m and 8m respectively under the larger home extension scheme. It depends on your property type, whether it has been extended before, and whether you sit in a conservation area. We check this for you free of charge at the consultation stage.",
  },
  {
    q: "How long does an extension take?",
    a: "Design and planning typically runs 3–4 months before anyone is on site. The build itself is usually 12–16 weeks for a single-storey rear extension and 16–24 weeks for a double-storey or wrap-around. We give you a written programme before we start and update it weekly.",
  },
  {
    q: "How do you handle payments?",
    a: "Staged payments against completed work, never large sums up front. Each stage is defined in the contract, and you release payment once that stage is signed off. We do not ask for a deposit that exceeds the cost of materials ordered.",
  },
  {
    q: "Do you use your own team or subcontractors?",
    a: "Our core trades — groundworks, carpentry, brickwork and site management — are directly employed. Specialist trades such as electrics, gas and plastering are long-standing subcontractors we have worked with for years, all accredited and insured.",
  },
  {
    q: "Do I need an architect before I contact you?",
    a: "Not to get started. We’re builders rather than designers, so for anything structural you’ll need drawings eventually — but come to us first and we’ll tell you what level of drawing your project actually needs. Some jobs need a full architectural package; plenty need only a structural engineer and a Building Control application, which we handle.",
  },
  {
    q: "Can you work from my own architect’s drawings?",
    a: "Yes, and that’s how most of our work arrives. We review any drawing set for buildability before quoting and will flag anything that will be expensive or awkward to construct — better to hear it at quote stage than halfway through. If you don’t have an architect yet, we’ll point you to practices we’ve worked with locally.",
  },
  {
    q: "What happens if the cost changes mid-project?",
    a: "Nothing gets charged without a written variation you approve first. The most common causes of change are unforeseen ground conditions and client-requested upgrades — we flag both in writing with a cost before proceeding.",
  },
] as const;
