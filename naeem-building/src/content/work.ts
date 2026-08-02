/**
 * Site footage.
 *
 * Short clips and stills from finished jobs, indexed by the trades they show.
 * Every service page renders whatever is tagged for it and nothing at all when
 * the list comes back empty — so a partly-covered site still looks deliberate,
 * the same way `projects.photos` works.
 *
 * These are phone recordings, 480px wide, that have been through WhatsApp.
 * That is not a problem to hide: the strip renders them at roughly 300px, where
 * the source is still above retina density, and footage that plainly came off a
 * phone at the end of a job reads as evidence in a way a polished wide shot
 * does not. Do not stretch them full-bleed — that is the one presentation the
 * resolution cannot survive.
 *
 * The raw originals live in /data and are cut to these clips by
 * `scripts/build-media.mjs` (`make media`), which is also where the trim
 * windows and the reasons for them are recorded.
 *
 * TWO RULES, both the same rule that governs projects.ts and testimonials.ts:
 *
 *  1. Only Naeem's own work goes here. Never a supplier photo, never a stock
 *     shot, never a job someone else finished.
 *  2. Caption the trade, not the room. "Marble-effect porcelain, floor to
 *     ceiling" tells a homeowner what they would be buying; "beautiful
 *     bathroom" tells them nothing and sounds like everyone else.
 *
 * TODO: none of these clips is tied to a named job, a location or a date,
 * because that information did not come with the files. When it is known, they
 * should be attached to entries in projects.ts so a visitor can get from the
 * clip to the story behind it.
 *
 * TODO: consent. Publishing footage of the inside of a client's home needs the
 * client's agreement, and it is worth having that in writing before these go
 * live. The clips have been cut to remove the people who appeared in them, but
 * that is not the same thing as permission. `hair-shop-1` is a trading business
 * rather than a home, which usually makes this easier — most shops are glad of
 * the link — but it still needs asking, and the shop is identifiable.
 */

export type WorkClip = {
  id: string;
  kind: "video" | "photo";
  /** `/media/<id>.mp4` for video, `/images/work/<id>.webp` for a still */
  src: string;
  /** Video only. The clip's own first frame, so playing it causes no jump. */
  poster?: string;
  /** What a screen reader announces. Describe the room, not the trade. */
  alt: string;
  /** Shown under the card. Name the trade — see rule 2 above. */
  caption: string;
  serviceSlugs: string[];
};

export const workClips: WorkClip[] = [
  {
    id: "kitchen-4",
    kind: "video",
    src: "/media/kitchen-4.mp4",
    poster: "/media/kitchen-4.webp",
    alt: "Large white kitchen with an island, dark stone worktops and a polished marble-effect floor",
    caption: "Handleless units, stone worktops and a lit island",
    serviceSlugs: ["kitchen-fitting", "refurbishments"],
  },
  {
    id: "kitchen-1",
    kind: "video",
    src: "/media/kitchen-1.mp4",
    poster: "/media/kitchen-1.webp",
    alt: "White gloss kitchen with a black granite worktop, tiled splashback and a gas hob",
    caption: "Brick-bond splashback, granite worktop, glass extractor",
    serviceSlugs: ["kitchen-fitting", "tiling"],
  },
  {
    id: "bathroom-2",
    kind: "video",
    src: "/media/bathroom-2.mp4",
    poster: "/media/bathroom-2.webp",
    alt: "White bathroom with a bath, lit recesses in the tiling and a walk-in shower",
    caption: "Bath, walk-in shower and lit recesses cut into the tiling",
    serviceSlugs: ["bathrooms", "tiling"],
  },
  {
    id: "bathroom-1",
    kind: "video",
    src: "/media/bathroom-1.mp4",
    poster: "/media/bathroom-1.webp",
    alt: "Bathroom tiled floor to ceiling in marble-effect porcelain with a patterned feature panel",
    caption: "Marble-effect porcelain, floor to ceiling, with a feature panel",
    serviceSlugs: ["bathrooms", "tiling"],
  },
  {
    id: "living-room-3",
    kind: "video",
    src: "/media/living-room-3.mp4",
    poster: "/media/living-room-3.webp",
    alt: "Media wall tiled in marble-effect porcelain around an inset fire and a wall-mounted television",
    caption: "Media wall tiled around an inset fire, with the TV recessed",
    serviceSlugs: ["tiling", "refurbishments"],
  },
  {
    id: "living-room-1",
    kind: "video",
    src: "/media/living-room-1.mp4",
    poster: "/media/living-room-1.webp",
    alt: "Living room media wall with a full-width inset fire below a wall-mounted television",
    caption: "Full-width inset fire, built in and plastered flush",
    serviceSlugs: ["refurbishments", "painting-decorating"],
  },
  {
    id: "room-1",
    kind: "video",
    src: "/media/room-1.mp4",
    poster: "/media/room-1.webp",
    alt: "Bedroom with LED coving, fitted wardrobes and downlights",
    caption: "LED coving run round the room, then decorated out",
    serviceSlugs: ["painting-decorating", "refurbishments"],
  },
  {
    id: "ground-floor-1",
    kind: "video",
    src: "/media/ground-floor-1.mp4",
    poster: "/media/ground-floor-1.webp",
    alt: "Stairwell with a crystal chandelier, LED coving and a painted balustrade",
    caption: "Stairwell, coving and lighting through the ground floor",
    serviceSlugs: ["refurbishments", "painting-decorating"],
  },
  {
    id: "hair-shop-1",
    kind: "video",
    src: "/media/hair-shop-1.mp4",
    poster: "/media/hair-shop-1.webp",
    alt: "Barber shop fitted out with a hexagon LED ceiling, timber slat walls, fitted cabinetry and barber chairs",
    caption: "Barber shop: slat walls, fitted cabinetry and a hexagon-lit ceiling",
    serviceSlugs: ["commercial-fit-out"],
  },
  {
    id: "extension-1",
    kind: "photo",
    src: "/images/work/extension-1.webp",
    alt: "Rendered white house with new gables and dark grey windows, the driveway still to be laid",
    caption: "Extended, re-rendered and glazed — driveway still to come",
    serviceSlugs: ["extensions", "rendering"],
  },
  {
    id: "living-room-2",
    kind: "photo",
    src: "/images/work/living-room-2.webp",
    alt: "Marble-effect tiled chimney breast with a recessed television and a landscape inset fire",
    caption: "Chimney breast tiled out, fire and TV recessed into it",
    serviceSlugs: ["tiling", "refurbishments"],
  },
  {
    id: "living-room-5",
    kind: "photo",
    src: "/images/work/living-room-5.webp",
    alt: "Living room with built-in lit alcoves either side of a television and an inset fire",
    caption: "Built-in alcoves, lit and painted out",
    serviceSlugs: ["painting-decorating", "refurbishments"],
  },
];

/**
 * Clips tagged for a service, most representative first — the order of
 * `workClips` is the running order, so put the strongest footage for a trade
 * above the rest of it.
 */
export function clipsForService(serviceSlug: string) {
  return workClips.filter((c) => c.serviceSlugs.includes(serviceSlug));
}
