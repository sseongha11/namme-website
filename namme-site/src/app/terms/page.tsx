import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `Terms covering use of the ${site.name} website.`,
  alternates: { canonical: "/terms" },
};

/**
 * TODO — LEGAL REVIEW REQUIRED BEFORE LAUNCH.
 * These terms cover use of the website only. They are NOT the contract for
 * building work — that should be a JCT Home Owner Contract or equivalent,
 * issued separately for each project.
 */
export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of use"
        lead="These cover the website. The contract for building work is a separate document issued for each project."
        trail={[{ label: "Terms" }]}
      />
      <Section>
        <div className="max-w-[70ch] space-y-10">
          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.025em]">
              Costs shown on this site
            </h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-ink-soft">
              Every price range on this website is indicative and provided for
              guidance while you are working out whether a project is feasible. It
              is not a quotation and does not constitute an offer. A binding price
              can only follow a site visit and a written specification.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.025em]">
              Planning and regulatory information
            </h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-ink-soft">
              Our guides describe permitted development rights, planning routes and
              building regulations as we understand them at the time of writing.
              Policy changes, and local authorities apply it differently. Nothing
              here replaces confirmation from your local planning authority or a
              lawful development certificate.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.025em]">
              Building contracts
            </h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-ink-soft">
              Work we carry out is governed by a written contract signed before the
              project starts, setting out the specification, programme, payment
              stages and the process for agreeing variations. Nothing on this
              website varies that contract.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.025em]">Contact</h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-ink-soft">
              Questions about these terms:{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-clay underline underline-offset-4"
              >
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
