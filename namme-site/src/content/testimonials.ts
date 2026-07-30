/**
 * Testimonials.
 *
 * Research finding worth respecting: reviews naming a specific job type and a
 * specific behaviour convert considerably better than generic five-star praise.
 * "They were great" is worth almost nothing; "they found the drainage problem in
 * week one and told us what it would cost" is worth a lot.
 *
 * TODO: replace with real, attributable reviews. Pull them from whichever
 * platforms Namme actually uses and keep the source label accurate — claiming
 * a Checkatrade review that isn’t on Checkatrade is worse than having none.
 */

export type Testimonial = {
  quote: string;
  author: string;
  location: string;
  project: string;
  source: "Google" | "Checkatrade" | "Houzz" | "Trustpilot" | "Direct";
  rating: 5 | 4;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They found a drainage problem in the first week and told us immediately what it would cost to solve, rather than discovering it later as an extra. That set the tone for the whole job.",
    author: "Sarah & James M.",
    location: "Normanton, DE23",
    project: "Rear extension",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Two other quotes were just for the surface. Namme dug a hole first, showed us why the old drive had sunk, and explained why the cheaper option would do exactly the same again.",
    author: "Daniel O.",
    location: "Chaddesden, DE21",
    project: "Block paved driveway",
    source: "Checkatrade",
    rating: 5,
  },
  {
    quote:
      "We were braced for being told we needed a whole new roof. They went up, sent photographs, and said the front slope was sound and only the back needed doing. It would have been easy to sell us both.",
    author: "The Hartley family",
    location: "Mickleover, DE3",
    project: "Re-roof and guttering",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "They showed us exactly why the old bathroom had been leaking into the kitchen before quoting for a new one. It has been through a winter of teenagers and there is not a mark on the ceiling below.",
    author: "Priya R.",
    location: "Littleover, DE23",
    project: "Bathroom refit",
    source: "Houzz",
    rating: 5,
  },
  {
    quote:
      "The garden was a bog on a slope. Three weeks later we have two flat levels that drain, and they put the neighbour’s leaning fence right while they were at it without adding it to the bill.",
    author: "Michael T.",
    location: "Oakwood, DE21",
    project: "Landscaping and retaining wall",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Small job — one wall repointed and a gate pier rebuilt. They matched the brick and the mortar so well I genuinely cannot see where the repair is, and they turned up on the day they said.",
    author: "Ellen & Rob K.",
    location: "Allestree, DE22",
    project: "Brickwork and repointing",
    source: "Direct",
    rating: 5,
  },
];
