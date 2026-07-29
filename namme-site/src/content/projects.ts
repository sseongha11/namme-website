/**
 * Projects.
 *
 * The portfolio is the highest-leverage content on a builder’s site — over half
 * of homeowners rule out builders who show no project evidence. Two rules the
 * research is emphatic about:
 *
 *  1. Photos alone don’t convert. Brief, constraint, materials, duration and
 *     outcome do. Every field below exists for that reason.
 *  2. Build-in-progress photos convert better than finished shots, because they
 *     prove you did the work rather than merely photographed it. The `photos`
 *     array supports a `stage` for exactly this.
 *
 * TODO: replace every entry with real Namme projects. Placeholder illustrations
 * render automatically wherever `photos` is empty, so the layout is already
 * correct and real photography drops straight in.
 */

export type ProjectPhoto = {
  src: string;
  alt: string;
  caption?: string;
  stage: "before" | "during" | "after";
};

export type Project = {
  slug: string;
  title: string;
  /** Location shown as the project’s name, e.g. "Allestree DE22" */
  location: string;
  postcode: string;
  serviceSlugs: string[];
  /** Property type — homeowners look for their own house here */
  propertyType: string;
  year: string;
  duration: string;
  /** Optional. Omit rather than invent. */
  value?: string;
  summary: string;
  brief: string;
  challenge: string;
  solution: string;
  outcome: string;
  materials: string[];
  photos: ProjectPhoto[];
  testimonial?: { quote: string; author: string };
};

export const projects: Project[] = [
  {
    slug: "normanton-rear-extension",
    title: "Rear extension and kitchen",
    location: "Normanton, Derby",
    postcode: "DE23",
    serviceSlugs: ["rear-extensions", "kitchen-renovations"],
    propertyType: "Victorian mid-terrace",
    year: "2025",
    duration: "13 weeks",
    summary:
      "A dark galley kitchen and a redundant rear outrigger became one 34m² family room.",
    brief:
      "A family of four had a kitchen that seated two and an outrigger used mainly for storage. They wanted one space where cooking, eating and homework could happen at once, without losing the garden.",
    challenge:
      "The existing foul drainage ran diagonally beneath the proposed extension and served the neighbouring property as well, so it could not simply be capped and moved. The party wall was in poor condition where the outrigger met it.",
    solution:
      "We agreed a build-over with Severn Trent and formed a new inspection chamber inside the extension footprint. The outrigger was removed and a goalpost steel frame installed across the full rear width, with a 3.2m rooflight over the dining end.",
    outcome:
      "The ground floor gained 16m² and now takes light from two directions. Completed a week ahead of the written programme.",
    materials: [
      "Structural steel goalpost frame",
      "3.2m aluminium-framed rooflight",
      "Reclaimed Derbyshire red brick to match existing",
      "Polished concrete floor with underfloor heating",
      "Bespoke oak and birch ply joinery",
    ],
    photos: [],
    testimonial: {
      quote:
        "They found the drainage problem in week one and told us straight away what it would cost to solve. No surprises after that — which is not what our neighbours experienced with their build.",
      author: "Homeowner, DE23", // TODO real attribution
    },
  },
  {
    slug: "mickleover-dormer-loft",
    title: "Rear dormer loft conversion",
    location: "Mickleover",
    postcode: "DE3",
    serviceSlugs: ["dormer-loft-conversions"],
    propertyType: "1970s semi-detached",
    year: "2025",
    duration: "9 weeks",
    summary:
      "A trussed roof void turned into a double bedroom with en-suite, under permitted development.",
    brief:
      "A third child meant the family needed a fourth bedroom or a move. The loft had a modern trussed roof, which two other builders had told them made conversion impractical.",
    challenge:
      "Trussed roofs carry load through their web members and cannot simply be cut. Head height at the ridge was 2.35m — workable, but with no margin for a deep floor build-up.",
    solution:
      "Steel beams were installed between the party wall and the gable to take the roof and floor loads, allowing the trusses to be removed entirely. A shallow floor cassette preserved head height, and the staircase rises over the existing flight so no bedroom below was lost.",
    outcome:
      "A 4.6m × 3.4m double bedroom with en-suite, delivered under permitted development with a lawful development certificate. No planning application required.",
    materials: [
      "Steel beams to party wall and gable",
      "Shallow-profile engineered floor cassette",
      "Anthracite standing seam dormer cladding",
      "Three conservation-style rooflights",
      "Fire-rated glazed door to protected stairwell",
    ],
    photos: [],
  },
  {
    slug: "allestree-double-storey",
    title: "Double-storey side extension",
    location: "Allestree",
    postcode: "DE22",
    serviceSlugs: ["double-storey-extensions", "bathroom-renovations"],
    propertyType: "1960s detached",
    year: "2025",
    duration: "22 weeks",
    summary:
      "An unused integral garage replaced by a utility and study below, fourth bedroom and en-suite above.",
    brief:
      "The garage had not held a car in a decade. The owners wanted the footprint working properly across both floors rather than storing bicycles and a freezer.",
    challenge:
      "Garage foundations are rarely designed to carry two storeys, and trial holes confirmed they were inadequate. A neighbour raised an objection during consultation on daylight grounds.",
    solution:
      "New foundations were underpinned beneath the retained garage walls in sequence. The upper floor was set back from the boundary and the roof pitched away from the neighbouring property, which resolved the daylight objection before determination.",
    outcome:
      "Utility and study at ground level, double bedroom and en-suite above. Permission granted with no objections outstanding at decision.",
    materials: [
      "Sequential underpinning to existing garage walls",
      "Brick matched to 1960s original",
      "Concrete interlocking tile roof set back from boundary",
      "Full-height glazing to study",
      "Tanked en-suite with large-format tiling",
    ],
    photos: [],
  },
  {
    slug: "littleover-kitchen-extension",
    title: "Wrap-around extension",
    location: "Littleover",
    postcode: "DE23",
    serviceSlugs: ["wrap-around-extensions", "kitchen-renovations"],
    propertyType: "1930s semi-detached",
    year: "2024",
    duration: "19 weeks",
    summary:
      "Side infill and a 3.5m rear extension combined into an L-shaped ground floor.",
    brief:
      "The owners had planned the side infill first and the rear extension two years later. We costed both routes and showed that doing them together saved a meaningful sum and one full disruption.",
    challenge:
      "The combined footprint exceeded permitted development, so full planning was required. A mature oak in the neighbouring garden carried a tree preservation order with a root protection area overlapping the proposed foundations.",
    solution:
      "An arboricultural report supported a design using a piled foundation across the affected zone, avoiding excavation within the root protection area entirely. Planning was granted in nine weeks.",
    outcome:
      "The ground floor went from four rooms to one connected space of 52m². Sliding doors span the full rear elevation.",
    materials: [
      "Mini-piled foundations to the tree-protected zone",
      "Aluminium sliding doors, 4.8m clear opening",
      "Two structural rooflights",
      "Reclaimed brick to match existing",
      "Large-format porcelain flooring with underfloor heating",
    ],
    photos: [],
    testimonial: {
      quote:
        "They talked us out of the more expensive option at design stage because it would not have solved the actual problem. I have never had a contractor do that before.",
      author: "Homeowner, DE23", // TODO real attribution
    },
  },
  {
    slug: "melbourne-listed-renovation",
    title: "Listed cottage renovation",
    location: "Melbourne",
    postcode: "DE73",
    serviceSlugs: ["full-house-renovations"],
    propertyType: "Grade II listed Georgian cottage",
    year: "2024",
    duration: "8 months",
    summary:
      "A cold, damp listed cottage made warm and workable without stripping out what made it worth listing.",
    brief:
      "New owners inherited a house with 1970s cement render trapping moisture in solid stone walls, original wiring, and a layout of six small rooms where they wanted three good ones.",
    challenge:
      "Listed building consent was required for every external alteration, and the cement render was actively causing the damp it was meant to prevent. Internal walls that looked removable turned out to be original fabric.",
    solution:
      "Cement render was removed and replaced with lime, allowing the walls to breathe again. Insulation was applied internally using breathable wood fibre rather than impermeable board. Only later partitions were removed; original fabric was retained and the layout worked around it.",
    outcome:
      "Damp resolved at source rather than masked. Heating demand fell materially against the pre-works assessment, with consent secured for every element.",
    materials: [
      "Lime render and lime plaster throughout",
      "Breathable wood fibre internal insulation",
      "Full rewire and replumb with concealed routing",
      "Reclaimed quarry tile and oak flooring",
      "Bespoke joinery matched to surviving detail",
    ],
    photos: [],
    testimonial: {
      quote:
        "Eight months is a long time to trust someone with a listed building. The weekly written update with photos was what made it bearable — we always knew exactly where we were.",
      author: "Homeowner, DE73", // TODO real attribution
    },
  },
  {
    slug: "belper-whs-renovation",
    title: "Millworker’s terrace renovation",
    location: "Belper",
    postcode: "DE56",
    serviceSlugs: ["full-house-renovations", "rear-extensions"],
    propertyType: "Gritstone terrace, World Heritage Site",
    year: "2024",
    duration: "6 months",
    summary:
      "A full renovation inside the Derwent Valley Mills World Heritage Site, consented first time.",
    brief:
      "The owners wanted a modern interior and a rear extension. They had been told informally that the World Heritage Site designation made an extension impossible.",
    challenge:
      "The property sits within the Derwent Valley Mills WHS, where alterations are assessed against the site’s management plan. The original scheme proposed materials and a roof form with no precedent in the terrace.",
    solution:
      "We surveyed the rear elevations along the row to document what already existed, redesigned the extension to sit within that established pattern, and specified reclaimed gritstone with a natural slate roof. Consent was granted without amendment.",
    outcome:
      "A rear extension and full internal renovation delivered inside the WHS, approved first time after an informal steer that it could not be done.",
    materials: [
      "Reclaimed gritstone to match the terrace",
      "Natural Welsh slate roof",
      "Lime mortar throughout",
      "Timber sash windows to heritage profile",
      "Internal breathable insulation upgrade",
    ],
    photos: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsForService(serviceSlug: string) {
  return projects.filter((p) => p.serviceSlugs.includes(serviceSlug));
}
