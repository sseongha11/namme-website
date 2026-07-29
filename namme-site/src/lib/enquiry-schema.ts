import { z } from "zod";

/**
 * Qualification-focused enquiry.
 *
 * Budget and timeline are asked for deliberately. A shorter form produces more
 * submissions and fewer real jobs; for a builder whose constraint is capacity
 * rather than lead volume, filtering at the form is the point.
 */
export const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(9, "Please enter a contactable phone number")
    .regex(/^[0-9+()\s-]+$/, "Please enter a valid phone number"),
  postcode: z
    .string()
    .min(5, "Please enter the property postcode")
    .max(9, "Please enter the property postcode"),
  projectType: z.string().min(1, "Please choose a project type"),
  budget: z.string().min(1, "Please choose a budget range"),
  timeline: z.string().min(1, "Please choose a timeline"),
  message: z
    .string()
    .max(2000, "Please keep this under 2000 characters")
    .optional()
    .or(z.literal("")),
  // Honeypot — real users never fill this; bots usually do.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const PROJECT_TYPES = [
  "Rear extension",
  "Side return extension",
  "Wrap-around extension",
  "Double-storey extension",
  "Loft conversion",
  "Whole house renovation",
  "Kitchen",
  "Bathroom",
  "Not sure yet",
] as const;

export const BUDGETS = [
  "Under £30,000",
  "£30,000 – £60,000",
  "£60,000 – £100,000",
  "£100,000 – £200,000",
  "Over £200,000",
  "Not sure yet",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "Just researching",
] as const;
