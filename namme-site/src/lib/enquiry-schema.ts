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
  "Brickwork",
  "Landscape gardening",
  "Extension",
  "Driveway",
  "Rendering",
  "Refurbishment",
  "Roofing",
  "Tiling",
  "Bathroom",
  "Painting & decorating",
  "Kitchen fitting",
  "Something else / not sure",
] as const;

export const BUDGETS = [
  "Under £1,000",
  "£1,000 – £5,000",
  "£5,000 – £15,000",
  "£15,000 – £40,000",
  "Over £40,000",
  "Not sure yet",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "Just researching",
] as const;
