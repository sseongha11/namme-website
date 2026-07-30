import { NextResponse } from "next/server";

import { site } from "@/content/site";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry-schema";

/**
 * Enquiry endpoint — delivers the form to Namme's inbox.
 *
 * Sent through Resend's REST API rather than an SDK, so there is no dependency
 * to keep current and nothing to go wrong at build time. Configuration:
 *
 *   RESEND_API_KEY   required. From resend.com — the free tier covers this
 *                    volume comfortably.
 *   ENQUIRY_TO       optional. Defaults to the address in content/site.ts.
 *   ENQUIRY_FROM     optional. Defaults to Resend's shared sending address,
 *                    which works without owning a domain.
 *
 * The rule this file exists to enforce: never accept an enquiry we cannot
 * deliver. If the key is missing or Resend rejects the send, this returns an
 * error and the form tells the customer to ring instead. A form that says
 * "thanks, we'll be in touch" and quietly drops the message is worse than no
 * form at all.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Plain text beats HTML here — it renders identically on every phone. */
function composeEmail(enquiry: EnquiryInput) {
  return [
    `Name:      ${enquiry.name}`,
    `Phone:     ${enquiry.phone}`,
    `Email:     ${enquiry.email}`,
    `Postcode:  ${enquiry.postcode}`,
    `Job:       ${enquiry.projectType}`,
    `Budget:    ${enquiry.budget}`,
    `Timeline:  ${enquiry.timeline}`,
    "",
    enquiry.message?.trim() ? enquiry.message.trim() : "(no message)",
    "",
    "—",
    `Sent from ${site.url}. Reply to this email to answer ${enquiry.name} directly.`,
  ].join("\n");
}

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

  const enquiry = { ...parsed.data };
  delete enquiry.company;

  // Logged as a backstop: if delivery ever breaks, the enquiry is still
  // recoverable from the Vercel runtime logs rather than lost outright.
  console.info("[enquiry]", { ...enquiry, receivedAt: new Date().toISOString() });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[enquiry] RESEND_API_KEY is not set — nothing was delivered");
    return NextResponse.json(
      { error: "Email delivery is not configured" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM ?? "Namme website <onboarding@resend.dev>",
        to: [process.env.ENQUIRY_TO ?? site.email],
        reply_to: enquiry.email,
        subject: `${enquiry.projectType} — ${enquiry.name}, ${enquiry.postcode}`,
        text: composeEmail(enquiry),
      }),
    });

    if (!res.ok) {
      console.error(
        "[enquiry] Resend rejected the send",
        res.status,
        await res.text(),
      );
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("[enquiry] Could not reach Resend", error);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
