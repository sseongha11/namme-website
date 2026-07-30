import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Process } from "@/components/process";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About — who we are and how we work",
  description: `${site.name} are a small, local, friendly ${site.primaryLocation}-based general building company, providing a quality and reliable service at an affordable price.`,
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
              We are a small, local, friendly, Derby based general building
              company, providing a quality and reliable service at an affordable
              price. That sentence has been on our business card for years and it
              is still the honest description: brickwork and groundwork to start
              with, and everything that grew out of it — extensions, roofing,
              rendering, driveways, landscaping, and the kitchens, bathrooms,
              tiling and decorating that finish a house off.
            </p>
            <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
              Small is deliberate. It means the person who quotes your job is on
              site while it happens, and that a day’s repointing gets the same
              attention as a twelve-week extension. If a job needs a trade we
              don’t have — gas, electrics, structural design — we bring in people
              we have used for years and who can certify their own work, rather
              than pretending it is all in-house.
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
              about not turning up, not knowing what’s happening, costs arriving
              unannounced, and nobody taking responsibility when two trades
              disagree. So that’s what we’ve built the business around: an
              itemised written quote before anything starts, agreed start and
              finish dates, one person who answers for the whole job, and no
              charge for anything you haven’t agreed first.
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

      <CtaBand />
    </>
  );
}
