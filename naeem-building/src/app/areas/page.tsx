import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { areas } from "@/content/areas";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Areas we cover — ${site.primaryLocation}, Derbyshire, Nottingham and Leicester`,
  description:
    "Builders working across Derby, Allestree, Mickleover, Littleover, Belper, Melbourne, Ilkeston, Nottingham, Loughborough, Leicester and the Derbyshire Dales.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Coverage"
        title="Derby, and about an hour around it."
        lead="We work out from Derby across Derbyshire, Nottinghamshire and Leicestershire — a radius our site managers can genuinely cover. Each area below has its own planning quirks: the housing stock in Belper has almost nothing in common with Oakwood, and neither does the policy that governs it."
        trail={[{ label: "Areas" }]}
      />

      <Section>
        <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
          {areas.map((a, i) => (
            <Reveal key={a.slug} as="article" delay={(i % 2) * 0.05} className="bg-paper">
              <Link
                href={`/areas/${a.slug}`}
                className="group flex h-full flex-col p-8 transition-colors hover:bg-paper-2 lg:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-[24px] font-semibold tracking-[-0.03em] transition-colors group-hover:text-clay">
                      {a.name}
                    </h2>
                    <p className="mt-1.5 text-[13.5px] text-ink-muted">
                      {a.postcodes.join(" · ")}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-1.5 size-5 shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay"
                    aria-hidden
                  />
                </div>

                <p className="mt-5 text-[15.5px] leading-[1.65] text-ink-soft">
                  {a.housingStock}
                </p>

                <p className="mt-6 border-t border-line pt-4 text-[13px] text-ink-muted">
                  {a.council}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Not sure if you’re in our patch?"
        lead="Give us your postcode and we’ll tell you straight away. If you’re outside it, we’d rather say so than stretch and do a worse job."
      />
    </>
  );
}
