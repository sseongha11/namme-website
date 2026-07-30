/**
 * Testimonials.
 *
 * ONE ENTRY, AND IT IS REAL. The six invented reviews that used to sit here
 * have been deleted. A single review from a customer who will stand behind it
 * is worth more than a wall of plausible ones, and unlike them it survives
 * being checked.
 *
 * Rules for adding the next one:
 *  - Only words the customer actually said or approved. Ask them to read it.
 *  - `source` must be accurate. "Direct" means given to us directly; only put
 *    Google or Checkatrade if the review is genuinely on that platform.
 *  - Reviews naming a specific job and a specific behaviour convert far better
 *    than generic praise. "They were great" is worth almost nothing.
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
      "We had the whole first floor done at once — the toilet taken back to nothing and rebuilt, new flooring, ventilation put in and the lot repainted. It ran to the dates we were given, the price never moved, and the house was left tidy at the end of every day.",
    author: "Sean & Wendy",
    location: "Loughborough, LE11",
    project: "First floor renovation",
    source: "Direct",
    rating: 5,
  },
];
