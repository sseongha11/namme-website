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
 * TODO: replace every entry with real Namme jobs. These are written around the
 * trades on the business card so the layout and the service links are right,
 * but the specifics are placeholders. Illustrations render automatically
 * wherever `photos` is empty, so real photography drops straight in.
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
    serviceSlugs: ["extensions", "kitchen-fitting"],
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
      "We agreed a build-over with Severn Trent and formed a new inspection chamber inside the extension footprint. The outrigger came down, a goalpost steel frame went in across the full rear width, and the kitchen was fitted once the shell was watertight.",
    outcome:
      "The ground floor gained 16m² and now takes light from two directions. Finished a week ahead of the dates we gave them.",
    materials: [
      "Structural steel goalpost frame",
      "3.2m aluminium-framed rooflight",
      "Reclaimed Derbyshire red brick to match existing",
      "Aluminium sliding doors to the garden",
      "Porcelain floor tiling over underfloor heating",
    ],
    photos: [],
    testimonial: {
      quote:
        "They found the drainage problem in week one and told us straight away what it would cost to solve. No surprises after that — which is not what our neighbours got with their build.",
      author: "Homeowner, DE23", // TODO real attribution
    },
  },
  {
    slug: "chaddesden-block-paved-driveway",
    title: "Block paved driveway and front garden",
    location: "Chaddesden",
    postcode: "DE21",
    serviceSlugs: ["driveways", "landscape-gardening", "brickwork"],
    propertyType: "1950s semi-detached",
    year: "2025",
    duration: "9 days",
    summary:
      "A sinking tarmac drive replaced with block paving, a soakaway and a new front wall.",
    brief:
      "The existing tarmac had sunk into two ruts and puddled against the front door in winter. The owners wanted parking for two cars and something that would not need doing again in five years.",
    challenge:
      "Digging out showed why it had failed: barely 60mm of sub-base over made ground, and the previous drive fell towards the house rather than away from it. The front boundary wall had also lost its footing on one side.",
    solution:
      "We excavated to 250mm, laid and compacted MOT Type 1 in three layers, and set the falls away from the property into a new soakaway in the front border. Edge courses were haunched in concrete, and the boundary wall was rebuilt on a new footing in matched brick.",
    outcome:
      "Off-street parking for two cars, no standing water against the house, and no planning application needed because the run-off is contained on the plot.",
    materials: [
      "250mm compacted MOT Type 1 sub-base",
      "Charcoal and silver block paving, stretcher bond",
      "Concrete-haunched edge restraints",
      "Crated soakaway to the front border",
      "Reclaimed brick to the rebuilt boundary wall",
    ],
    photos: [],
    testimonial: {
      quote:
        "Two other quotes were just for the surface. Namme dug a hole first, showed us the problem underneath, and explained why the cheap option would sink again.",
      author: "Homeowner, DE21", // TODO real attribution
    },
  },
  {
    slug: "mickleover-re-roof",
    title: "Full re-roof and new guttering",
    location: "Mickleover",
    postcode: "DE3",
    serviceSlugs: ["roofing"],
    propertyType: "1930s semi-detached",
    year: "2025",
    duration: "8 days",
    summary:
      "Perished felt and rotten battens stripped back and replaced, with new fascias and gutters.",
    brief:
      "A damp patch on a bedroom ceiling had been patched twice by others and kept coming back. The owners wanted to know whether it was a repair or a re-roof, and wanted the truth either way.",
    challenge:
      "Once we lifted tiles at the valley, the felt beneath had perished across the whole rear slope and several battens were soft. A repair would have held for a winter at best.",
    solution:
      "We photographed what we found and quoted both options honestly. They chose the re-roof: strip both slopes, new breathable membrane and treated battens, re-lay the sound tiles and make up the shortfall with matched reclaimed, new lead to the valley and chimney, then new fascias, soffits and guttering.",
    outcome:
      "A dry roof with a written guarantee, insulation topped up to current levels while the access was there, and the ceiling stain gone for good.",
    materials: [
      "Breathable roofing membrane",
      "Treated 25×50 battens",
      "Reclaimed and existing concrete tiles",
      "Code 4 lead to valley and chimney flashings",
      "uPVC fascias, soffits and 112mm guttering",
    ],
    photos: [],
  },
  {
    slug: "allestree-render-and-brickwork",
    title: "Silicone render and brickwork repairs",
    location: "Allestree",
    postcode: "DE22",
    serviceSlugs: ["rendering", "brickwork"],
    propertyType: "1960s detached",
    year: "2024",
    duration: "3 weeks",
    summary:
      "Failed cement render removed, cracked brickwork repaired, and a silicone system applied.",
    brief:
      "The original render was cracked and hollow across the gable and had been overpainted twice. The owners wanted a finish that would not need repainting every few years.",
    challenge:
      "Tapping the wall showed roughly a third of the render had blown. Behind it, two courses of brickwork had cracked where a lintel over the garage opening had corroded and expanded.",
    solution:
      "All render came off rather than the blown sections only — patching a wall in that condition just moves the problem along. The lintel was replaced and the brickwork rebuilt, then a beaded basecoat with mesh reinforcement went on, followed by a through-coloured silicone topcoat.",
    outcome:
      "A breathable, self-cleaning finish with a 15-year system warranty, and the structural cause of the cracking dealt with rather than covered over.",
    materials: [
      "Replacement galvanised lintel to garage opening",
      "Matched brickwork rebuild in lime-modified mortar",
      "Mesh-reinforced polymer basecoat with stop beads",
      "Through-coloured silicone thin-coat topcoat",
      "New bellcast drips and window sills",
    ],
    photos: [],
  },
  {
    slug: "littleover-bathroom",
    title: "Bathroom and en-suite refit",
    location: "Littleover",
    postcode: "DE23",
    serviceSlugs: ["bathrooms", "tiling"],
    propertyType: "1930s semi-detached",
    year: "2025",
    duration: "3 weeks",
    summary:
      "A leaking over-bath shower replaced with a fully tanked walk-in, plus a small en-suite.",
    brief:
      "Water had been getting through to the kitchen ceiling below. The owners wanted a walk-in shower, a heated floor and an en-suite formed in the corner of the main bedroom.",
    challenge:
      "The leak was not the shower tray but the tiling: fixed straight onto plasterboard with no tanking, so every joint was a route to the floor. The en-suite also needed a new soil connection across a joisted floor.",
    solution:
      "Everything came out to the joists. New backer board, full tanking to the wet zone, then large-format porcelain over electric underfloor heating. The en-suite waste was run within the floor void to the existing stack, notched to the engineer’s limits rather than wherever was convenient.",
    outcome:
      "Both rooms finished in three weeks, kitchen ceiling made good, and Part P certificates issued for the new circuits.",
    materials: [
      "12.5mm tile backer board to wet areas",
      "Liquid tanking membrane and taped joints",
      "600×1200 porcelain wall and floor tiles",
      "Electric underfloor heating with programmable stat",
      "1200mm walk-in screen and concealed valves",
    ],
    photos: [],
    testimonial: {
      quote:
        "They showed us exactly why the old one leaked before quoting. The new one has been through a winter of teenagers and there is not a mark on the ceiling below.",
      author: "Homeowner, DE23", // TODO real attribution
    },
  },
  {
    slug: "belper-terrace-refurbishment",
    title: "Full refurbishment of a stone terrace",
    location: "Belper",
    postcode: "DE56",
    serviceSlugs: [
      "refurbishments",
      "kitchen-fitting",
      "painting-decorating",
      "tiling",
    ],
    propertyType: "Gritstone terrace, World Heritage Site",
    year: "2024",
    duration: "11 weeks",
    summary:
      "An empty, damp terrace stripped back and brought up to a lettable standard.",
    brief:
      "The owners had inherited a house that had been empty for two years. It needed to be habitable and warm, on a budget, without losing what made it worth keeping.",
    challenge:
      "Modern cement render and gypsum plaster on solid stone walls had trapped moisture, and the damp was blamed on a failed damp course that turned out not to be the problem at all. The property also sits inside the Derwent Valley Mills World Heritage Site, so external materials mattered.",
    solution:
      "Cement pointing and gypsum plaster came off the affected walls and were replaced with lime, letting the stone dry outward again. Then a straightforward refurbishment: rewire, new heating, replastering, a mid-range kitchen, a new bathroom, and decoration throughout.",
    outcome:
      "Let within three weeks of completion. The damp has not returned, because the cause was ventilation and finish rather than rising water.",
    materials: [
      "Lime plaster and lime pointing to solid walls",
      "Full rewire and new gas boiler",
      "Mid-range fitted kitchen and appliances",
      "Vinyl and porcelain flooring",
      "Breathable emulsion throughout",
    ],
    photos: [],
  },
  {
    slug: "oakwood-garden-landscaping",
    title: "Sloping garden terraced and turfed",
    location: "Oakwood",
    postcode: "DE21",
    serviceSlugs: ["landscape-gardening", "brickwork"],
    propertyType: "1990s detached",
    year: "2024",
    duration: "4 weeks",
    summary:
      "A steep, waterlogged lawn turned into two usable terraces with a patio and new fencing.",
    brief:
      "The garden dropped more than a metre across its length and held water at the bottom all winter. The family wanted somewhere flat for a table and somewhere flat for children to play.",
    challenge:
      "Heavy clay with no fall to anywhere. Terracing meant retaining a metre of soil, and the neighbouring fence line was already leaning under the pressure of the existing level difference.",
    solution:
      "Two terraces formed with a rendered blockwork retaining wall, drained behind with a perforated pipe and clean stone rather than relying on weep holes alone. Porcelain patio at house level on a full mortar bed, turf above, and the boundary refenced on concrete posts.",
    outcome:
      "Two flat, usable levels and a garden that drains. The neighbour’s fence line came back to vertical as part of the same job.",
    materials: [
      "Rendered blockwork retaining wall on concrete footings",
      "Perforated land drain and clean stone backfill",
      "Porcelain paving on a full mortar bed",
      "Concrete posts and feather-edge fencing",
      "Topsoil and cultivated turf",
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
