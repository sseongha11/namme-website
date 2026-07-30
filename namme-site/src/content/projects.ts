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
 * ONE ENTRY, AND IT IS REAL. The invented case studies that used to sit here
 * have been deleted rather than padded out — one true job beats six convincing
 * ones. Add the next entry only when there is a real job to describe, and only
 * with the homeowner’s permission to name the street or postcode.
 *
 * Still to come on this one: photographs. Until they exist, the illustration
 * renders automatically wherever `photos` is empty, and real photos drop
 * straight in — see IMAGES.md.
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
  /** Location shown as the project’s name, e.g. "Loughborough LE11" */
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
    slug: "loughborough-first-floor-renovation",
    title: "First floor renovation",
    location: "Loughborough",
    postcode: "LE11",
    serviceSlugs: ["refurbishments", "bathrooms", "painting-decorating"],
    propertyType: "Detached house",
    year: "2026",
    duration: "3–4 weeks",
    summary:
      "The whole first floor in one go — toilet stripped back and rebuilt, new flooring throughout, ventilation installed and every room redecorated.",
    brief:
      "Sean and Wendy wanted the first floor dealt with properly and all at once, rather than a room at a time over several years. That meant a complete renovation of the toilet, new flooring across the floor, proper ventilation installed, and the whole level redecorated.",
    challenge:
      "Taking on an entire floor at the same time makes sequencing matter more than any individual trade. Get the order wrong and you are laying new flooring while there is still dusty work to come, or decorating twice because something after it was never going to be clean.",
    solution:
      "The toilet was stripped out first and the ventilation ducted through to outside while the walls were still open — much easier then than afterwards. Flooring went down only once every wet and dusty job was finished, and decoration came last, so nothing newly finished had to be protected from work still to come.",
    outcome:
      "Finished inside the dates agreed at the start, at the price quoted, with nothing added along the way.",
    materials: [
      "Toilet stripped back and completely refitted",
      "Mechanical extract ventilation, ducted to outside",
      "New flooring throughout the first floor",
      "Full redecoration — walls, ceilings and woodwork",
    ],
    photos: [],
    testimonial: {
      quote:
        "We had the whole first floor done at once — the toilet taken back to nothing and rebuilt, new flooring, ventilation put in and the lot repainted. It ran to the dates we were given, the price never moved, and the house was left tidy at the end of every day.",
      author: "Sean & Wendy, LE11",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsForService(serviceSlug: string) {
  return projects.filter((p) => p.serviceSlugs.includes(serviceSlug));
}
