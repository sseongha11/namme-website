import { NextResponse } from "next/server";

import { enquirySchema } from "@/lib/enquiry-schema";

/**
 * Enquiry endpoint.
 *
 * TODO — this currently validates and logs only. Before launch, wire it to one
 * of: Resend / Postmark (email to the office), a CRM webhook, or both. Do not
 * launch without this connected: a contact form that silently discards
 * enquiries is worse than having no form at all.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot tripped — accept silently so the bot doesn’t learn anything.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const enquiry = { ...parsed.data, company: undefined };
  delete enquiry.company;

  // TODO: replace with real delivery.
  console.info("[enquiry]", {
    ...enquiry,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
