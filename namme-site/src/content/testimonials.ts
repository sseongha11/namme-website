/**
 * Testimonials.
 *
 * Research finding worth respecting: reviews naming a specific project type and
 * a specific behaviour convert considerably better than generic five-star
 * praise. "They were great" is worth almost nothing; "they found the drainage
 * problem in week one and told us what it would cost" is worth a lot.
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
      "They found a drainage problem in the first week and told us immediately what it would cost to solve, rather than discovering it later as a variation. That set the tone for the whole job.",
    author: "Sarah & James M.",
    location: "Normanton, DE23",
    project: "Rear extension",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Two builders told us a trussed roof made the loft impractical. Namme explained how the steels would work, priced it, and did exactly that. We have a fourth bedroom instead of a new mortgage.",
    author: "Daniel O.",
    location: "Mickleover, DE3",
    project: "Dormer loft conversion",
    source: "Checkatrade",
    rating: 5,
  },
  {
    quote:
      "Eight months living out of a listed cottage is a lot to ask. The weekly written update with photographs meant we always knew where we were, which made it bearable.",
    author: "The Hartley family",
    location: "Melbourne, DE73",
    project: "Listed cottage renovation",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "We had been told the World Heritage Site designation made an extension impossible. They surveyed the rest of the terrace, built the application around what was already there, and it went through first time.",
    author: "Priya R.",
    location: "Belper, DE56",
    project: "Renovation and rear extension",
    source: "Houzz",
    rating: 5,
  },
  {
    quote:
      "The site was swept every evening and the skip never blocked the road for more than a day. Small things, but our neighbours still speak to us, which was not a given.",
    author: "Michael T.",
    location: "Littleover, DE23",
    project: "Wrap-around extension",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "They talked us out of the more expensive option at the design stage because it would not have solved the actual problem. I have never had a contractor do that before.",
    author: "Ellen & Rob K.",
    location: "Allestree, DE22",
    project: "Double-storey side extension",
    source: "Direct",
    rating: 5,
  },
];
