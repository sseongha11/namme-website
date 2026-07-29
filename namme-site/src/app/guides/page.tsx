import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { guides } from "@/content/guides";

export const metadata: Metadata = {
  title: "Cost and planning guides",
  description:
    "What extensions and loft conversions actually cost in Derby and the East Midlands, what drives the price, and when you need planning permission.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Guides"
        title="Everything we’d tell you on the phone, written down."
        lead="Most people start thinking about an extension six months before they contact anyone. These are written for that stage — no email required, no form in the way, including the one explaining how to check up on builders like us."
        trail={[{ label: "Guides" }]}
      />

      <Section>
        <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
          {guides.map((g, i) => (
            <Reveal key={g.slug} as="article" delay={(i % 2) * 0.05} className="bg-paper">
              <Link
                href={`/guides/${g.slug}`}
                className="group flex h-full flex-col p-8 transition-colors hover:bg-paper-2 lg:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">
                    {g.category}
                  </p>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay"
                    aria-hidden
                  />
                </div>

                <h2 className="mt-4 max-w-md text-[26px] font-semibold leading-[1.2] tracking-[-0.03em] transition-colors group-hover:text-clay">
                  {g.title}
                </h2>
                <p className="mt-4 max-w-md text-[16px] leading-[1.65] text-ink-soft">
                  {g.summary}
                </p>

                <p className="mt-auto pt-8 text-[13px] text-ink-muted">
                  {g.readingTime} read · Updated {g.updated}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Read enough? Let’s look at your house."
        lead="Guides only get you so far. A free visit, a measure-up and a written estimate will tell you far more than any cost table can."
      />
    </>
  );
}
