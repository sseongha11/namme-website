import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { FaqJsonLd, FaqSection } from "@/components/faq-section";
import { Hero } from "@/components/hero";
import { Process } from "@/components/process";
import { ProjectCarousel } from "@/components/project-carousel";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { ServicesGrid } from "@/components/services-grid";
import { StatsBar } from "@/components/stats-bar";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Button } from "@/components/ui/button";
import { areas } from "@/content/areas";
import { guides } from "@/content/guides";
import { projects } from "@/content/projects";
import { faqs, site } from "@/content/site";

const DIFFERENTIATORS = [
  {
    title: "A specification, not a number",
    body: "Our quotes are itemised line by line, so you can compare them properly and see instantly what any change costs. A single figure on one page is not a quote.",
  },
  {
    title: "Written weekly updates",
    body: "Every Friday: what happened this week, what happens next, and photographs. You never have to ask how it’s going.",
  },
  {
    title: "Staged payments only",
    body: "You pay for completed work, never in advance of it. No deposit larger than the materials it covers.",
  },
  {
    title: "Variations in writing first",
    body: "Nothing is charged without your written approval. Surprises at the end are a failure of process, not a fact of building.",
  },
  {
    title: "Directly employed trades",
    body: "Groundworks, carpentry, brickwork and site management are our own people, not whoever happened to be free that week.",
  },
  {
    title: "Six-month callback",
    body: "We ring you half a year after handover to check everything is still performing. Most of the time it is.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />

      {/* Services */}
      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Three things, done to one standard."
          lead="Almost all our work is one of these. Each is priced, programmed and managed the same way — the difference is only what we’re building."
          action={
            <Button asChild variant="outline">
              <Link href="/projects">
                See recent projects <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />
        <ServicesGrid />
      </Section>

      {/* Process — inverted band, the credibility centrepiece */}
      <Section tone="deep">
        <SectionHeading
          onDark
          eyebrow="How it works"
          title="Five stages, and you always know which one you’re in."
          lead="Homeowners are buying certainty as much as construction. This is the sequence every project follows, and roughly how long each part takes."
        />
        <Process />
      </Section>

      {/* Projects */}
      <Section>
        <SectionHeading
          eyebrow="Recent work"
          title="Projects, with the parts that went wrong included."
          lead="Every one of these had a problem in it — drainage, rot, a refusal, an objection. What matters is what happened next."
          action={
            <Button asChild variant="outline">
              <Link href="/projects">
                All projects <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />
        <ProjectCarousel projects={projects} />
      </Section>

      {/* Why us */}
      <Section tone="paper-2">
        <SectionHeading
          eyebrow="Why Namme"
          title="The promises that are actually checkable."
          lead="Anyone can claim quality and reliability. These are six commitments you can hold us to — and afterwards tell whether we kept."
        />
        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATORS.map((d, i) => (
            <Reveal as="li" key={d.title} delay={(i % 3) * 0.06}>
              <ShieldCheck className="size-5 text-clay" aria-hidden />
              <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.02em]">
                {d.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.68] text-ink-soft">{d.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeading
          eyebrow="What clients say"
          title={`${site.rating.score} out of 5, across ${site.rating.count}+ reviews.`}
          lead="A star average tells you very little, so these say what the project was and what we actually did."
        />
        <TestimonialsSection />
      </Section>

      {/* Guides — research-stage content */}
      <Section tone="paper-2">
        <SectionHeading
          eyebrow="Before you commit"
          title="Cost and planning guides."
          lead="Written for people who are months away from starting. No email required and no form in the way — including the guide explaining how to check up on us."
          action={
            <Button asChild variant="outline">
              <Link href="/guides">
                All guides <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {guides.map((g, i) => (
            <Reveal as="article" key={g.slug} delay={(i % 4) * 0.06}>
              <Link href={`/guides/${g.slug}`} className="group block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">
                  {g.category}
                </p>
                <h3 className="mt-3 text-[19px] font-semibold leading-snug tracking-[-0.02em] transition-colors group-hover:text-clay">
                  {g.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft">
                  {g.summary}
                </p>
                <p className="mt-4 text-[13px] text-ink-muted">{g.readingTime} read</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Areas */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Where we work"
              title="Derby, and about an hour around it."
              lead="Across Derbyshire, Nottinghamshire and Leicestershire — a radius our site managers can cover properly. A builder claiming the whole country is telling you something about how often they’ll actually be on your site."
            />
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href="/areas">
                  All areas <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </div>

          <Reveal>
            <ul className="grid grid-cols-2 gap-px border border-line bg-line">
              {areas.map((a) => (
                <li key={a.slug} className="bg-paper">
                  <Link
                    href={`/areas/${a.slug}`}
                    className="group block px-6 py-5 transition-colors hover:bg-paper-2"
                  >
                    <p className="text-[16px] font-medium transition-colors group-hover:text-clay">
                      {a.name}
                    </p>
                    <p className="mt-1 text-[13px] text-ink-muted">
                      {a.postcodes.slice(0, 4).join(" · ")}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="paper-2">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Common questions"
            title="The things people ask before they ring."
          />
          <div>
            <FaqSection items={faqs} />
            <p className="mt-8 text-[15px] text-ink-soft">
              Something not covered?{" "}
              <Link href="/contact" className="text-clay underline underline-offset-4">
                Ask us directly
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <CtaBand />
      <FaqJsonLd items={faqs} />
    </>
  );
}
