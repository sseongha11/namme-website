import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} handles the personal information you give us.`,
  alternates: { canonical: "/privacy" },
};

/**
 * TODO — LEGAL REVIEW REQUIRED BEFORE LAUNCH.
 * This is a plain-English starting point covering the basics a UK builder’s
 * enquiry form needs under UK GDPR. It is not legal advice and it is not a
 * substitute for a policy checked by someone qualified. In particular, confirm
 * the retention period, the lawful basis, and whether an ICO registration is
 * required for the volume of data actually processed.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lead="What we do with the details you give us, in plain English."
        trail={[{ label: "Privacy" }]}
      />
      <Section>
        <div className="max-w-[70ch] space-y-10">
          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.025em]">
              What we collect
            </h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-ink-soft">
              When you fill in an enquiry form we collect your name, email address,
              phone number, the property postcode, and whatever you tell us about
              the project. That is all — we do not ask for anything else and we do
              not collect payment details through this website.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.025em]">
              What we use it for
            </h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-ink-soft">
              Solely to respond to your enquiry and, if you go ahead, to run your
              project. We do not add you to a mailing list, we do not sell or share
              your details with other companies, and we do not pass them to lead
              generation services.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.025em]">
              How long we keep it
            </h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-ink-soft">
              {/* TODO: confirm these periods with Namme and with an adviser. */}
              Enquiries that do not become projects are deleted after 12 months.
              Records relating to completed work are kept for as long as our
              warranty and insurance obligations require.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.025em]">
              Your rights
            </h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-ink-soft">
              You can ask us what we hold about you, ask us to correct it, or ask us
              to delete it. Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-clay underline underline-offset-4"
              >
                {site.email}
              </a>{" "}
              and we will respond within one month. If you are not satisfied with
              how we handle it, you can complain to the Information Commissioner’s
              Office.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.025em]">Cookies</h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-ink-soft">
              {/* TODO: update if analytics are added — that changes the position. */}
              This website sets no tracking or advertising cookies.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
