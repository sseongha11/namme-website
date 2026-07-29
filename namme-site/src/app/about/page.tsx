import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Process } from "@/components/process";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { accreditations, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About — who we are and how we work",
  description: `${site.name} are builders based in ${site.primaryLocation}, specialising in extensions, loft conversions and full renovations across Derby and Derbyshire.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We build. That’s the whole business."
        lead="No design studio attached, no sales team, no sub-letting your job to whoever is free that week. A builder with directly employed trades and one site manager per project."
        trail={[{ label: "About" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            {/* TODO: replace with Namme’s real history — founding year, who
                started it, what they did before. Specific beats polished. */}
            <p className="text-[19px] leading-[1.75] text-ink-soft">
              Namme has been building in Derby since 2011. We started as a small
              team doing extensions on the Victorian terraces around Normanton, and
              the work has grown outward from there — into the inter-war semis of
              Littleover and Mickleover, the estates at Oakwood, and the stone
              properties out toward Belper and the Dales.
            </p>
            <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
              We are builders rather than a design-and-build practice, and we say so
              plainly because the distinction matters when you’re choosing. If you
              have drawings, we’ll price them and tell you honestly what will be
              awkward to construct. If you don’t, we’ll tell you what level of
              drawing your project actually needs — which is often less than you’ve
              been told — and point you to architects we’ve worked with locally.
            </p>
            <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
              Our team is originally from Syria. In practice that means you can deal
              with us in Arabic or English, whichever you prefer, from the first
              phone call through to handover.{" "}
              <Link href="/ar" className="text-clay underline underline-offset-4">
                الصفحة بالعربية
              </Link>
            </p>

            <h2 className="mt-14 text-[26px] font-semibold tracking-[-0.03em]">
              What we’re actually trying to be good at
            </h2>
            <p className="mt-5 text-[17px] leading-[1.75] text-ink-soft">
              Most complaints about builders aren’t about the brickwork. They’re
              about not knowing what’s happening, costs arriving unannounced, and
              nobody taking responsibility when two trades disagree. So that’s what
              we’ve built the business around: an itemised written specification
              before anything starts, a weekly written update with photographs, one
              named site manager who answers for the whole job, and no charge for
              anything you haven’t approved in writing first.
            </p>
            <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
              None of that is glamorous and none of it is hard. It’s just
              unfashionably ordinary to do it consistently.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
              <Image
                src="/images/about-team.svg"
                alt="Illustration of a period house of the kind we typically work on"
                fill
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover"
              />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-px border border-line bg-line">
              {site.stats.map((s) => (
                <div key={s.label} className="bg-paper p-7">
                  <p className="numeral text-[32px] leading-none">{s.value}</p>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.1em] text-ink-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="deep">
        <SectionHeading
          onDark
          eyebrow="How it works"
          title="Five stages, and you always know which one you’re in."
        />
        <Process />
      </Section>

      <Section tone="paper-2">
        <SectionHeading
          eyebrow="Accreditations"
          title="What the badges actually mean."
          lead="A wall of logos proves nothing on its own. Here’s what each of ours commits us to — and every one of them can be verified independently on the relevant register."
        />
        <ul className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {accreditations.map((a, i) => (
            <Reveal as="li" key={a.name} delay={(i % 3) * 0.06}>
              <p className="text-[17px] font-semibold">{a.name}</p>
              <p className="mt-1 text-[13.5px] text-ink-muted">{a.full}</p>
              <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft">
                {a.meaning}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
