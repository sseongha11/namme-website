/**
 * Services.
 *
 * Eleven taken directly from Namme's business card — brickwork, landscape
 * gardening, extensions, driveways, rendering, refurbishments, roofing, tiling,
 * bathrooms, painting & decorating and kitchen fitting — plus commercial
 * fit-out, added afterwards and marked as such at the bottom of this file.
 *
 * Deliberately granular: someone searching "driveways Derby" and someone
 * searching "rendering Derby" are two different jobs with two different
 * intents. One combined "building services" page competes for neither well.
 * Each entry below becomes its own indexable page at /services/[slug].
 */

export type Service = {
  slug: string;
  title: string;
  /** Short label for nav and cards */
  short: string;
  group: "Building work" | "Outside" | "Inside" | "Commercial";
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
  /** Permission, notification or certification route — "none needed" is an answer */
  planning: string;
  includes: string[];
};

export const services: Service[] = [
  // ── Building work ──────────────────────────────────────────
  {
    slug: "extensions",
    title: "Extensions",
    short: "Extensions",
    group: "Building work",
    summary:
      "Single and two-storey extensions — more room without moving house.",
    intro: [
      "A single-storey rear extension is the most common way to fix the thing most older Derby houses get wrong: a dark, cut-off kitchen at the back of the house. Done properly it turns two or three cramped rooms into one space you actually live in.",
      "We take on the whole job — groundworks, structure, roof, glazing, then the trades that finish it. Same team throughout, one written specification, and staged payments against work that is actually done.",
    ],
    priceFrom: "£30,000",
    priceTo: "£75,000",
    priceDrivers: [
      "Depth and width — the structural opening into the existing house is the biggest single jump",
      "Glazing: standard patio doors versus a wide sliding or bi-fold set",
      "Ground conditions, drainage runs, and whether a manhole has to be moved",
      "Whether a new kitchen or bathroom goes into the finished space",
      "Roof type — flat with rooflights, or pitched and tied into the existing roof",
    ],
    duration: "12–18 weeks on site",
    planning:
      "Often permitted development up to 3m deep (terraced or semi-detached) or 4m (detached), and up to 6m/8m with prior approval. Building Control approval is needed either way. We check where you stand before you commit to anything.",
    includes: [
      "Foundations, drainage and groundworks",
      "Brickwork matched to the existing house",
      "Structural steel to the opening, to the engineer’s design",
      "Roof, guttering and weathering into the existing building",
      "Windows, doors and rooflights",
      "First and second fix, plastering and decoration",
    ],
  },
  {
    slug: "refurbishments",
    title: "Refurbishments",
    short: "Refurbishments",
    group: "Building work",
    summary:
      "Whole-house or room-by-room refurbishment, from strip-out to final coat.",
    intro: [
      "Refurbishment covers everything between a tired house and a finished one: taking out what has failed, putting the structure and services right, then rebuilding the finishes. It is the right call when the problems have stopped being cosmetic.",
      "We do the unglamorous half first — damp, wiring, plumbing, floors, plaster — because a good-looking room built on top of a bad one does not stay good-looking for long. Landlords and letting agents are welcome, and so is anyone who has just bought somewhere that needs work before they move in.",
    ],
    priceFrom: "£12,000",
    priceTo: "£90,000",
    priceDrivers: [
      "How much comes out — a full strip-back costs far more than replacing finishes",
      "Whether the wiring, plumbing and heating are being replaced wholesale",
      "Damp, rot or failed lintels found once the plaster comes off",
      "Structural changes such as removing a wall or forming a new opening",
      "Specification of the kitchen, bathroom and joinery at the end of it",
    ],
    duration: "4–16 weeks",
    planning:
      "Internal work needs no planning permission unless the building is listed. Structural openings, new circuits and drainage alterations are notifiable to Building Control, which we handle.",
    includes: [
      "Strip-out and waste removal",
      "Damp treatment and making good",
      "Structural alterations and new openings",
      "Rewire and replumb where needed",
      "Plastering, joinery and flooring",
      "Kitchens, bathrooms, tiling and decoration",
    ],
  },
  {
    slug: "brickwork",
    title: "Brickwork",
    short: "Brickwork",
    group: "Building work",
    summary:
      "Garden walls, piers, repointing and repairs — matched to what is already there.",
    intro: [
      "Brickwork is the trade this business was built on. Garden and boundary walls, gate piers, chimney rebuilds, new openings, lintel replacement, and repointing where the mortar has gone soft and started letting water in.",
      "Most of the job is in the matching. Derby has everything from soft Victorian reds to 1970s commons, and a repair in the wrong brick and the wrong mortar is visible from the pavement for the next fifty years. We match brick, bond and mortar colour before we start.",
    ],
    priceFrom: "£800",
    priceTo: "£12,000",
    priceDrivers: [
      "Area and height — walls over 1m need thicker construction and proper footings",
      "Brick matching, where reclaimed stock can cost several times new",
      "Repointing: raking out by hand is slower than it looks, and the only way that lasts",
      "Access and scaffolding, especially on chimney and gable work",
      "Whether foundations, drainage or a damp course have to be put right first",
    ],
    duration: "2 days – 4 weeks",
    planning:
      "Garden walls up to 2m need no permission — 1m where they front a highway, and less in a conservation area or against a listed building. Repointing needs none, though listed buildings usually require a lime mortar and consent.",
    includes: [
      "Brick and mortar matching before work starts",
      "Concrete footings dug and poured",
      "Walls, piers, copings and caps",
      "Lintel replacement and new openings",
      "Hand-raked repointing in a matched mix",
      "Chimney repairs and rebuilds",
    ],
  },
  {
    slug: "rendering",
    title: "Rendering",
    short: "Rendering",
    group: "Building work",
    summary:
      "Silicone, monocouche and sand-and-cement render, plus patch repairs.",
    intro: [
      "Render either protects a wall or traps water inside it, and which one you end up with comes down to the mix and the preparation rather than the finish coat. Cement render over a solid old wall with no damp course is a common and expensive mistake — the wall can no longer dry outward, so the damp appears somewhere else instead.",
      "We look at what the wall is actually built of first, then specify: silicone thin-coat for a low-maintenance coloured finish, monocouche for a through-coloured single application, sand and cement where it suits, and lime on solid walls that need to breathe.",
    ],
    priceFrom: "£3,000",
    priceTo: "£14,000",
    priceDrivers: [
      "Wall area and number of elevations — a whole house costs far less per m² than one gable",
      "System: sand and cement, monocouche, or silicone thin-coat over a basecoat",
      "Whether existing render has to come off, and what is found underneath",
      "Scaffolding, which is a largely fixed cost however much render goes on",
      "Beading, detailing around openings, and rendering onto insulation",
    ],
    duration: "1–3 weeks",
    planning:
      "Usually permitted development on a house. Conservation areas, Article 4 areas and listed buildings are the exception — there, rendering and cladding commonly need consent, and cement render on a solid wall is often refused for sound technical reasons.",
    includes: [
      "Survey of the substrate and any existing render",
      "Scaffolding, and protection to windows and ground",
      "Hacking off failed render and disposal",
      "Beading, mesh reinforcement and basecoat",
      "Topcoat in your chosen system and colour",
      "Sills, drips and detailing that keeps water off the wall",
    ],
  },
  {
    slug: "roofing",
    title: "Roofing",
    short: "Roofing",
    group: "Building work",
    summary:
      "Re-roofs, repairs, flat roofs, fascias and guttering — pitched and flat.",
    intro: [
      "Most roof calls start as a stain on a bedroom ceiling. Sometimes that is two slipped tiles; sometimes the battens have gone and the felt underneath has perished. We tell you which, with photographs, before quoting anything larger.",
      "Pitched roofs in tile and slate, flat roofs in EPDM and GRP, and all the detail at the edges — ridge and verge, valleys, flashings, fascias, soffits and gutters, which is where a surprising share of leaks actually begin.",
    ],
    priceFrom: "£350",
    priceTo: "£16,000",
    priceDrivers: [
      "Repair versus full re-roof — stripping back to the rafters is a different job entirely",
      "Covering: concrete tile, clay tile or natural slate, which can double the material cost",
      "Whether battens, membrane and insulation are replaced at the same time",
      "Scaffolding and access, especially on three-storey or terraced properties",
      "Chimneys, valleys and dormers, which take the time plain runs of tile do not",
    ],
    duration: "1 day – 3 weeks",
    planning:
      "Repairs and like-for-like re-roofing need no permission. A change of covering may, on a listed building or in a conservation area. Re-roofing more than 25% of a roof surface is notifiable to Building Control and triggers an insulation upgrade.",
    includes: [
      "Roof inspection with photographs of what we find",
      "Scaffolding and edge protection",
      "Strip, dispose, and new battens and membrane",
      "Tiling or slating, ridge, hip and verge",
      "Lead flashings, valleys and chimney work",
      "Fascias, soffits, guttering and downpipes",
    ],
  },

  // ── Outside ────────────────────────────────────────────────
  {
    slug: "driveways",
    title: "Driveways",
    short: "Driveways",
    group: "Outside",
    summary:
      "Block paving, resin, tarmac and gravel — laid on a base that lasts.",
    intro: [
      "A driveway is mostly the part you cannot see. Sunken block paving and cracked tarmac are nearly always a sub-base failure rather than a surface failure — dug too shallow, not compacted, or laid straight onto soft ground.",
      "We excavate to the right depth, lay and compact a proper MOT Type 1 sub-base in layers, and get the falls and drainage right before any surfacing goes down. Block paving, resin-bound, tarmac or gravel, with the edge restraints that stop it spreading.",
    ],
    priceFrom: "£2,800",
    priceTo: "£14,000",
    priceDrivers: [
      "Area, and how much excavated material has to be carted away",
      "Surface: gravel, tarmac, block paving or resin-bound, in roughly that price order",
      "Drainage — a permeable build-up, or a channel drain and soakaway",
      "A dropped kerb, if you are creating a new access onto the highway",
      "Retaining walls, steps or levelling on a sloping plot",
    ],
    duration: "3 days – 2 weeks",
    planning:
      "No permission needed if the surface is permeable, or if run-off drains to a soakaway or border rather than into the road. More than 5m² of impermeable surfacing draining to the highway does need planning permission. A new dropped kerb needs approval from the council’s highways team.",
    includes: [
      "Excavation and removal of spoil",
      "Compacted MOT Type 1 sub-base in layers",
      "Falls set away from the house and airbricks",
      "Drainage: permeable build-up, channel drain or soakaway",
      "Edge restraints haunched in concrete",
      "Surfacing, jointing and final compaction",
    ],
  },
  {
    slug: "landscape-gardening",
    title: "Landscape gardening",
    short: "Landscaping",
    group: "Outside",
    summary:
      "Patios, paths, fencing, decking, turf and garden walls — hard and soft.",
    intro: [
      "Most gardens we are called to have the same three problems: nowhere flat to sit, a fence that has had it, and a lawn that holds water all winter. Fixing those is groundwork and drainage before it is planting.",
      "We do the hard landscaping — patios, paths, steps, retaining and garden walls, fencing and decking — and the soft work that goes with it: levelling, topsoil, turf and beds. Whether it still looks right in five years is a question about drainage and foundations, not about slabs.",
    ],
    priceFrom: "£1,500",
    priceTo: "£25,000",
    priceDrivers: [
      "Levels — terracing a sloping garden means retaining walls, which carry most of the cost",
      "Paving material: concrete slab, natural sandstone or porcelain, roughly doubling as you go up",
      "Access, and whether materials and spoil have to come through the house",
      "Drainage, particularly on the clay soils common around Derby",
      "How much is hard landscaping versus turf and planting",
    ],
    duration: "1–4 weeks",
    planning:
      "Patios, paths, fences up to 2m (1m next to a highway) and decking under 30cm high need no permission. Raised decking, taller walls and fences, and anything against a listed building or in a conservation area may.",
    includes: [
      "Clearance, levelling and spoil removal",
      "Compacted sub-base to patios and paths",
      "Paving laid on a full mortar bed, falling away from the house",
      "Retaining and garden walls on proper footings",
      "Fencing, gates, decking and sleeper edging",
      "Topsoil, turf, beds and planting",
    ],
  },

  // ── Inside ─────────────────────────────────────────────────
  {
    slug: "kitchen-fitting",
    title: "Kitchen fitting",
    short: "Kitchen fitting",
    group: "Inside",
    summary:
      "Full kitchen installation — and the building work most kitchens actually need.",
    intro: [
      "Very few kitchen jobs are only a kitchen. They usually involve moving a radiator, taking out a wall, re-routing waste, adding circuits and levelling a floor that has never been level — builder’s work, with units fitted at the end of it.",
      "We fit kitchens from any supplier, including ones you have already bought. Because we do the building work as well, there is no gap between the trade that takes the wall out and the trade that fits the units against it.",
    ],
    priceFrom: "£3,500",
    priceTo: "£15,000",
    priceDrivers: [
      "Fitting alone, or fitting plus the plastering, flooring and electrics around it",
      "Whether a wall comes out, or an opening is formed between kitchen and dining room",
      "Moving the sink, waste, gas point or consumer unit",
      "Worktop material — laminate, solid timber, or stone that has to be templated",
      "Floor levelling, and whether underfloor heating goes down first",
    ],
    duration: "1–4 weeks",
    planning:
      "None needed. New circuits are notifiable under Part P, gas work must be carried out by a Gas Safe registered engineer, and any structural opening needs Building Control sign-off.",
    includes: [
      "Strip-out and disposal of the old kitchen",
      "Wall removal or new opening where required",
      "Plumbing and electrical first fix",
      "Plastering, floor levelling and preparation",
      "Units, worktops, appliances and extraction",
      "Tiling, flooring, sealing and decoration",
    ],
  },
  {
    slug: "bathrooms",
    title: "Bathrooms",
    short: "Bathrooms",
    group: "Inside",
    summary:
      "Full bathroom and wet room installation, waterproofed and ventilated properly.",
    intro: [
      "Bathrooms fail for two reasons: bad waterproofing and bad ventilation. Both are invisible once the tiles are on, which is exactly why they are the two things a cheap quote leaves out.",
      "We tank the wet areas properly, fit extraction that clears the moisture rather than just making a noise, and only then start on the part you can see. Family bathrooms, shower rooms, wet rooms, en-suites and downstairs WCs.",
    ],
    priceFrom: "£5,000",
    priceTo: "£16,000",
    priceDrivers: [
      "Moving the WC or soil pipe — the single most expensive change in a bathroom",
      "Wet room formation and full tanking, versus a standard tray and enclosure",
      "Tile format: large-format and natural stone need more preparation and more labour",
      "Sanitaryware and brassware, which can vary fivefold for the same layout",
      "Whether the water pressure needs a pump or a system upgrade to work properly",
    ],
    duration: "1.5 – 4 weeks",
    planning:
      "No planning permission needed. Electrical work in bathroom zones is notifiable under Part P and certified on completion, and a new soil connection is notifiable to Building Control.",
    includes: [
      "Strip-out and removal",
      "Waste, soil and pipework alterations",
      "Tanking to all wet areas",
      "Zone-compliant electrics and extraction",
      "Underfloor heating where specified",
      "Tiling, sanitaryware, screens and sealing",
    ],
  },
  {
    slug: "tiling",
    title: "Tiling",
    short: "Tiling",
    group: "Inside",
    summary: "Wall and floor tiling in ceramic, porcelain and natural stone.",
    intro: [
      "Good tiling is decided before the first tile goes on: a flat, dry, properly primed background, the right adhesive for that tile on that substrate, and a set-out that puts the cuts where nobody looks.",
      "Kitchens, bathrooms, hallways, porches and utility rooms — floors and walls, ceramic, porcelain and natural stone, including large-format and tiling over underfloor heating.",
    ],
    priceFrom: "£500",
    priceTo: "£5,000",
    priceDrivers: [
      "Area, and how many cuts the shape of the room forces",
      "Tile size — large-format needs levelling systems and two people to place",
      "Preparation: overboarding, screeding or levelling an uneven floor",
      "Natural stone, which needs sealing before and after grouting",
      "Patterns such as herringbone or brick bond, which add cutting and waste",
    ],
    duration: "2 days – 2 weeks",
    planning:
      "None needed. Where tiling goes over underfloor heating or into a wet area, the build-up and the waterproofing beneath matter far more than the tile.",
    includes: [
      "Substrate check, priming and levelling",
      "Overboarding or tile backer board where needed",
      "Tanking to showers and wet areas",
      "Set-out agreed with you before fixing",
      "Fixing, grouting and silicone",
      "Sealing to natural stone, and clean down",
    ],
  },
  {
    slug: "painting-decorating",
    title: "Painting & decorating",
    short: "Painting & decorating",
    group: "Inside",
    summary:
      "Interior and exterior decoration, with the preparation that makes it last.",
    intro: [
      "Decorating is preparation with paint at the end. Filling, sanding, caulking, stain-blocking and priming are what decide whether it still looks right in three years — the topcoat is the quick part.",
      "Whole houses, single rooms, new plaster, woodwork and ceilings, and exterior work including render, masonry, fascias and timber.",
    ],
    priceFrom: "£400",
    priceTo: "£7,000",
    priceDrivers: [
      "Condition — cracked, papered or badly painted surfaces need real preparation time",
      "New plaster, which needs a mist coat and usually an extra coat on top",
      "Woodwork: doors, skirting, architrave and windows are slow compared with walls",
      "Ceiling height and access, and whether furniture has to be moved and protected",
      "Exterior work, which carries tower or scaffold hire and depends on the weather",
    ],
    duration: "2 days – 3 weeks",
    planning:
      "None needed internally. Externally, painting previously unpainted brick or stone can need consent on a listed building or in a conservation area — and is usually a bad idea on a solid wall in any case.",
    includes: [
      "Protection of floors, furniture and fittings",
      "Filling, sanding, caulking and making good",
      "Stain blocking and priming as needed",
      "Mist coat to new plaster",
      "Two full topcoats to walls and ceilings",
      "Woodwork, exterior masonry and clean down",
    ],
  },

  // ── Commercial ─────────────────────────────────────────────
  //
  // The twelfth trade, and the only one not on the original business card. It
  // is here because the work exists — the barber shop footage on this page is
  // Namme's own — and a shop fit-out is a genuinely different sale from a
  // domestic job: a business is buying downtime, a deadline and a licence to
  // alter, not a kitchen.
  //
  // TODO: the cost range and duration below are indicative for a small retail
  // or salon unit and have NOT been checked against what Namme actually
  // charged. Every other entry in this file came from the business; this one
  // did not. Confirm both before this page does any selling, and correct them
  // here rather than anywhere else — the service page, cards and metadata all
  // read from these fields.
  {
    slug: "commercial-fit-out",
    title: "Commercial fit-out",
    short: "Commercial fit-out",
    group: "Commercial",
    summary:
      "Shops, salons and small commercial units — stripped back and fitted out, worked around your opening date.",
    intro: [
      "A commercial fit-out is priced on the same trades as a house and sold on something completely different: every week the unit is shut is a week it earns nothing. The programme matters more than any individual finish, and it is the first thing we put in writing.",
      "Strip-out, partitions, ceilings, flooring, feature lighting, joinery, tiling and decoration, with the electrics and plumbing that sit behind them. We work to a landlord's licence to alter where the unit is leased, and hand over the certificates the fit-out needs.",
    ],
    priceFrom: "£12,000",
    priceTo: "£60,000",
    priceDrivers: [
      "Floor area, and whether the unit is a shell or a working space being stripped back",
      "Trading around the work, or closing the unit — evening and weekend work costs more but shortens the shutdown",
      "Services: new distribution board, extraction, air conditioning, hot water and drainage runs to stations or basins",
      "Joinery — how much is bought in and how much is made and fitted on site",
      "Shopfront, signage and anything visible from the street, which is where consent gets involved",
    ],
    duration: "3–8 weeks",
    planning:
      "Depends on the unit. Fitting out within an existing Class E use needs no planning permission, but a change of use into Class E can, and a new shopfront, external signage or an extraction flue usually does — more so in a conservation area or on a listed building. Building Regulations apply throughout, the finished space must meet Part M access and the fire safety requirements of the Regulatory Reform (Fire Safety) Order 2005, and a leased unit will need the landlord's written licence to alter before anything starts.",
    includes: [
      "Strip-out, disposal and making good",
      "Partitions, suspended or feature ceilings and dry lining",
      "Electrical distribution, power, data and feature lighting",
      "Plumbing and drainage to basins, stations and WCs",
      "Joinery, counters, storage and fitted seating",
      "Flooring, tiling, decoration and final clean",
    ],
  },
];

export const serviceGroups = [
  "Building work",
  "Outside",
  "Inside",
  "Commercial",
] as const;

export function servicesByGroup(group: string) {
  return services.filter((s) => s.group === group);
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
