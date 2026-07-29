import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { serviceGroups, servicesByGroup } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Services — extensions, loft conversions and renovations in ${site.primaryLocation}`,
  description:
    "Everything we build, with indicative costs, timescales and the planning route for each. Extensions, loft conversions and full renovations across Derby, Derbyshire, Nottingham and Leicester.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything we build, with the numbers attached."
        lead="Each page gives an indicative cost range, what drives it up or down, how long the build takes and which planning route applies. No form in the way."
        trail={[{ label: "Services" }]}
      />

      {serviceGroups.map((group, gi) => (
        <Section key={group} tone={gi % 2 === 1 ? "paper-2" : "paper"}>
          <Reveal>
            <p className="eyebrow">{`0${gi + 1}`}</p>
            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.035em] sm:text-[38px]">
              {group}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-2">
            {servicesByGroup(group).map((s) => (
              <Reveal key={s.slug} as="article" className="bg-paper">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col p-8 transition-colors hover:bg-paper-2 lg:p-10"
                >
                  <h3 className="text-[22px] font-semibold tracking-[-0.025em] transition-colors group-hover:text-clay">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[15.5px] leading-[1.65] text-ink-soft">
                    {s.summary}
                  </p>

                  <dl className="mt-7 grid grid-cols-2 gap-6 border-t border-line pt-6">
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                        Typical cost
                      </dt>
                      <dd className="numeral mt-1.5 text-[20px] leading-none">
                        {s.priceFrom} – {s.priceTo}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                        Time on site
                      </dt>
                      <dd className="mt-1.5 text-[15px]">{s.duration}</dd>
                    </div>
                  </dl>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      ))}

      <CtaBand />
    </>
  );
}
