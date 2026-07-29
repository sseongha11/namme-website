/**
 * Services.
 *
 * Deliberately granular: "rear extension", "side return" and "wrap-around" are
 * three separate searches with three separate intents. One combined
 * "Extensions" page competes for none of them well. Each child below becomes
 * its own indexable page at /services/[slug].
 */

export type Service = {
  slug: string;
  title: string;
  /** Short label for nav and cards */
  short: string;
  group: "Extensions" | "Loft conversions" | "Renovations";
  /** One-line summary used on cards and in metadata */
  summary: string;
  /** Opening paragraphs for the service page */
  intro: string[];
  /** Indicative cost range — homeowners search for this before anything else */
  priceFrom: string;
  priceTo: string;
  /** What actually drives the price up or down. Ranges alone are useless. */
  priceDrivers: string[];
  duration: string;
  planning: string;
  includes: string[];
};

export const services: Service[] = [
  // ── Extensions ─────────────────────────────────────────────
  {
    slug: "rear-extensions",
    title: "Rear extensions",
    short: "Rear extensions",
    group: "Extensions",
    summary:
      "Open up the back of the house and connect the kitchen to the garden.",
    intro: [
      "A single-storey rear extension is the most common way to fix the thing most period homes get wrong: a dark, cut-off kitchen at the back of the house. Done well, it turns three cramped rooms into one space you actually live in.",
      "We handle the whole thing — design, structural calculations, planning or permitted development, and the build itself. One contract, one point of contact, one team responsible for the result.",
    ],
    priceFrom: "£32,000",
    priceTo: "£62,000",
    priceDrivers: [
      "Depth and width — the structural opening is the single biggest cost jump",
      "Glazing specification: standard doors versus structural or slimline aluminium",
      "Ground conditions, drainage runs and whether a manhole needs relocating",
      "Kitchen and finishes, which can vary by more than the shell itself",
      "Whether the roof is flat, pitched, or carries rooflights",
    ],
    duration: "12–16 weeks on site",
    planning:
      "Usually permitted development up to 3m (terraced/semi) or 4m (detached), or up to 6m/8m under the larger home extension scheme with prior approval. We confirm this before you commit to anything.",
    includes: [
      "Measured survey and architectural drawings",
      "Structural engineer’s calculations",
      "Planning or permitted development application",
      "Building Control liaison and sign-off",
      "Groundworks, structure, roofing and glazing",
      "First and second fix, plastering and decoration",
    ],
  },
  {
    slug: "side-return-extensions",
    title: "Side return extensions",
    short: "Side returns",
    group: "Extensions",
    summary:
      "Claim the dead alleyway beside a Victorian terrace and widen the whole ground floor.",
    intro: [
      "The side return is the narrow strip of unused land running alongside the back of a Victorian or Edwardian terrace. Filling it in is one of the highest-value square metres in the Victorian terrace stock — you gain width where the house is at its most cramped, usually without touching the garden.",
      "It is also the least forgiving job on this list. Party wall agreements, existing drainage and steel design all have to be right, and there is very little room for error once the wall comes out.",
    ],
    priceFrom: "£38,000",
    priceTo: "£75,000",
    priceDrivers: [
      "Party wall awards — you will usually need agreements with one or both neighbours",
      "Steel design: a single goalpost frame versus a more complex arrangement",
      "Rooflight specification, which drives most of the visual result",
      "Existing drainage under the return and whether it can stay",
      "Whether the extension is combined with a rear extension (wrap-around)",
    ],
    duration: "14–18 weeks on site",
    planning:
      "Frequently permitted development, but conservation areas and previously extended properties often need a full application. Party wall notices are a legal requirement, not an optional extra.",
    includes: [
      "Party wall notices and surveyor coordination",
      "Structural steel design and installation",
      "Underpinning where required",
      "Drainage alteration and build-over agreement",
      "Structural glazing and rooflights",
      "Full internal fit-out",
    ],
  },
  {
    slug: "wrap-around-extensions",
    title: "Wrap-around extensions",
    short: "Wrap-arounds",
    group: "Extensions",
    summary:
      "Side return and rear extension combined — the largest ground-floor gain available.",
    intro: [
      "A wrap-around does both jobs at once: fills the side return and pushes out at the back, producing an L-shaped extension that transforms the entire ground floor rather than adding a room to it.",
      "Because both elements share scaffolding, groundworks and structure, doing them together is meaningfully cheaper than doing them two years apart — and avoids living through the disruption twice.",
    ],
    priceFrom: "£58,000",
    priceTo: "£112,000",
    priceDrivers: [
      "Total footprint and the resulting steel schedule",
      "Whether the rear element exceeds permitted development depth",
      "Extent of structural glazing across two elevations",
      "Reconfiguration of the retained house — moving stairs or a WC adds cost fast",
      "Level of kitchen and joinery specification",
    ],
    duration: "18–24 weeks on site",
    planning:
      "Usually requires full planning permission, since the combined footprint typically exceeds permitted development allowances. Allow 8–10 weeks for determination.",
    includes: [
      "Full architectural design and 3D visualisation",
      "Planning application and drawings",
      "Party wall process",
      "Structural design across both elevations",
      "Complete ground-floor reconfiguration",
      "Kitchen installation and decoration",
    ],
  },
  {
    slug: "double-storey-extensions",
    title: "Double-storey extensions",
    short: "Double-storey",
    group: "Extensions",
    summary:
      "Add a bedroom and a bathroom above a new ground-floor space in one build.",
    intro: [
      "Extending over two floors costs far less per square metre than extending once and returning later, because you build the foundations, scaffolding and roof only once. It is the most efficient way to add a genuine extra bedroom.",
      "It is also more visible from the street and to your neighbours, so the design has to earn its planning permission rather than assume it.",
    ],
    priceFrom: "£68,000",
    priceTo: "£125,000",
    priceDrivers: [
      "Foundation depth — two storeys of load usually means deeper footings",
      "Roof design and how it ties into the existing roofline",
      "Whether the upper floor includes a bathroom (drainage and waterproofing)",
      "Matching existing brickwork, which can be difficult on older properties",
      "Scaffolding duration across a longer programme",
    ],
    duration: "20–28 weeks on site",
    planning:
      "Almost always a full planning application. Rear two-storey extensions have tighter permitted development limits and are assessed on overlooking and daylight impact on neighbours.",
    includes: [
      "Design developed with planning risk in mind",
      "Pre-application advice where the case is marginal",
      "Deep foundations and structural frame",
      "Roof construction and weathering into the existing house",
      "New bedroom and en-suite fit-out",
      "Full decoration and making good",
    ],
  },

  // ── Loft conversions ───────────────────────────────────────
  {
    slug: "dormer-loft-conversions",
    title: "Dormer loft conversions",
    short: "Dormer lofts",
    group: "Loft conversions",
    summary:
      "The standard-bearer: maximum head height and floor area for the money.",
    intro: [
      "A dormer extends vertically from the existing roof slope to create a flat-ceilinged box, converting an unusable triangular void into a full room with standing height throughout. For most terraced and semi-detached houses it is the right answer.",
      "It typically adds a double bedroom and an en-suite, and it is the loft conversion type most likely to fall entirely within permitted development.",
    ],
    priceFrom: "£36,000",
    priceTo: "£60,000",
    priceDrivers: [
      "Volume of the dormer — permitted development caps it at 40m³ (terraced) or 50m³ (semi/detached)",
      "Staircase position, and whether a bedroom below has to be reconfigured",
      "En-suite inclusion and how far the soil stack has to move",
      "Steel requirement where existing ceiling joists cannot carry a floor load",
      "Whether the roof is trussed or cut — trussed roofs need more structural work",
    ],
    duration: "8–12 weeks on site",
    planning:
      "Commonly permitted development, provided the volume allowance is not exceeded and the dormer does not face the highway. Conservation areas are the main exception.",
    includes: [
      "Loft survey and head-height assessment",
      "Structural steel and new floor construction",
      "Building-regulation-compliant staircase",
      "Fire safety: doors, alarms and protected escape route",
      "Insulation to current Part L standards",
      "En-suite, electrics, heating and decoration",
    ],
  },
  {
    slug: "mansard-loft-conversions",
    title: "Mansard loft conversions",
    short: "Mansard lofts",
    group: "Loft conversions",
    summary:
      "The largest possible loft: rebuild the roof at a near-vertical pitch.",
    intro: [
      "A mansard replaces one or both roof slopes with a near-vertical wall at around 70 degrees, topped with a shallow flat roof. It produces significantly more usable floor area than a dormer and reads as part of the original building rather than an addition — which is why it is often the only loft type permitted in conservation areas.",
      "It is a rebuild rather than a conversion, so it costs more and takes longer. Where it applies, nothing else comes close on space gained.",
    ],
    priceFrom: "£54,000",
    priceTo: "£92,000",
    priceDrivers: [
      "The existing roof is largely demolished and rebuilt — that is the base cost",
      "Party wall awards with both neighbours on a terrace",
      "Brick or slate matching to satisfy conservation officers",
      "Two rooms versus one, and the bathroom drainage that follows",
      "Scaffolding and temporary roofing across a longer programme",
    ],
    duration: "12–16 weeks on site",
    planning:
      "Nearly always requires full planning permission. Derby City and the surrounding district councils apply conservation area guidance to roof alterations, and following it closely is the difference between approval and refusal.",
    includes: [
      "Design to borough-specific mansard guidance",
      "Full planning application and heritage statement where needed",
      "Party wall process for both neighbours",
      "Roof demolition, temporary weatherproofing and rebuild",
      "Structural floor, staircase and fire strategy",
      "Complete fit-out and decoration",
    ],
  },
  {
    slug: "hip-to-gable-loft-conversions",
    title: "Hip-to-gable conversions",
    short: "Hip-to-gable",
    group: "Loft conversions",
    summary:
      "Square off a sloping side roof to unlock the space a semi or end-terrace is wasting.",
    intro: [
      "Semi-detached and end-of-terrace houses have a hipped roof that slopes on three sides, which wastes the volume where you most need head height. Extending the sloping side up into a vertical gable wall recovers it.",
      "It is usually combined with a rear dormer, and the two together produce a loft close to the size of the floor below.",
    ],
    priceFrom: "£43,000",
    priceTo: "£72,000",
    priceDrivers: [
      "Whether it is combined with a rear dormer (most are)",
      "New gable wall construction and how it ties into the party wall",
      "Roof structure — cut roofs convert more easily than trussed",
      "Brick matching on a highly visible elevation",
      "Number of rooms and bathrooms created",
    ],
    duration: "10–14 weeks on site",
    planning:
      "Often permitted development for semi-detached and end-terrace properties within the 50m³ allowance, though the gable is prominent enough that some councils take a closer interest.",
    includes: [
      "Structural assessment of the existing roof",
      "New gable wall construction",
      "Combined rear dormer where appropriate",
      "Floor structure, staircase and fire strategy",
      "Insulation, heating and electrics",
      "Bedroom and en-suite fit-out",
    ],
  },

  // ── Renovations ────────────────────────────────────────────
  {
    slug: "full-house-renovations",
    title: "Full house renovations",
    short: "Full renovations",
    group: "Renovations",
    summary:
      "Strip back to brick and rebuild the house around how you actually live.",
    intro: [
      "A full renovation is the right call when the problems are structural rather than cosmetic: failing services, poor insulation, a layout that fights you daily. Working room by room over years costs more in the end and never quite resolves.",
      "We take the house back to what is worth keeping, replace what isn’t, and rebuild to a single coherent specification. Most clients move out for the duration; we plan the programme around that.",
    ],
    priceFrom: "£95,000",
    priceTo: "£350,000+",
    priceDrivers: [
      "Whether services — wiring, plumbing, heating — are replaced wholesale",
      "Structural alterations: removing walls, moving stairs, underpinning",
      "Damp, rot or subsidence found once the plaster comes off",
      "Listed status or conservation area constraints on materials",
      "Specification level, which on a full renovation can double the figure",
    ],
    duration: "6–12 months",
    planning:
      "Internal work is usually permission-free unless the building is listed. External alterations, extensions and window replacement in conservation areas will need consent.",
    includes: [
      "Full survey including damp and timber report",
      "Complete architectural and interior design",
      "Strip-out and structural alterations",
      "Rewire, replumb and new heating system",
      "Insulation upgrade and Part L compliance",
      "Joinery, kitchens, bathrooms and decoration",
    ],
  },
  {
    slug: "kitchen-renovations",
    title: "Kitchen renovations",
    short: "Kitchens",
    group: "Renovations",
    summary:
      "Rebuild the room the house revolves around — structure, services and all.",
    intro: [
      "Most kitchen projects are not really kitchen projects. They involve moving a wall, relocating drainage, upgrading a consumer unit and reworking how the room meets the garden — which is builder’s work with a kitchen fitted at the end.",
      "We do the structural and services work properly first, then install to a standard that survives twenty years of daily use.",
    ],
    priceFrom: "£20,000",
    priceTo: "£62,000",
    priceDrivers: [
      "Structural openings — removing a wall between kitchen and dining room",
      "Moving drainage, gas or the consumer unit",
      "Cabinetry: trade-supplied versus bespoke joinery",
      "Worktop material, where stone can be a five-figure line on its own",
      "Underfloor heating and floor build-up",
    ],
    duration: "6–10 weeks",
    planning:
      "No permission needed for internal work. Building Control notification is required for structural openings, new circuits and drainage alterations.",
    includes: [
      "Layout design and 3D visuals",
      "Structural openings and steelwork",
      "Full electrical and plumbing first fix",
      "Underfloor heating where specified",
      "Cabinetry, worktops and appliance installation",
      "Tiling, flooring and decoration",
    ],
  },
  {
    slug: "bathroom-renovations",
    title: "Bathroom renovations",
    short: "Bathrooms",
    group: "Renovations",
    summary:
      "Waterproofed properly, ventilated properly, and built to last two decades.",
    intro: [
      "Bathrooms fail for two reasons: bad waterproofing and bad ventilation. Both are invisible once the tiles go on, which is exactly why they get skipped.",
      "We tank wet areas fully, specify extraction that actually clears the moisture, and only then start on the part you can see.",
    ],
    priceFrom: "£8,500",
    priceTo: "£28,000",
    priceDrivers: [
      "Moving the soil stack or WC position",
      "Tanking and wetroom formation versus a standard enclosure",
      "Tile format — large-format and stone need more preparation and labour",
      "Brassware and sanitaryware specification",
      "Whether the water pressure needs a pump or system upgrade",
    ],
    duration: "3–5 weeks",
    planning:
      "No planning permission required. Electrical work in bathroom zones is notifiable under Part P and must be certified.",
    includes: [
      "Design and material selection",
      "Strip-out and waste alteration",
      "Full tanking to wet areas",
      "Zone-compliant electrics and extraction",
      "Underfloor heating, tiling and installation",
      "Certification on completion",
    ],
  },

];

export const serviceGroups = [
  "Extensions",
  "Loft conversions",
  "Renovations",
] as const;

export function servicesByGroup(group: string) {
  return services.filter((s) => s.group === group);
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
