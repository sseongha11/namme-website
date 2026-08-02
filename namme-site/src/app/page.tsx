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
import { TestimonialsSection } from "@/components/testimonials-section";
import { Button } from "@/components/ui/button";
import { areas } from "@/content/areas";
import { guides } from "@/content/guides";
import { projects } from "@/content/projects";
import { faqs } from "@/content/site";
import { showPortfolio } from "@/lib/site-status";

const DIFFERENTIATORS = [
  {
    title: "A specification, not a number",
    body: "Our quotes are itemised line by line, so you can compare them properly and see instantly what any change costs. A single figure on one page is not a quote.",
  },
  {
    title: "Small jobs welcome",
    body: "A day’s tiling and a full extension get quoted the same way and turned up for on the same day we said. Plenty of builders won’t take the small ones. We do.",
  },
  {
    title: "You pay for finished work",
    body: "Never large sums up front. Any deposit covers materials we’ve had to order, and never more than they cost.",
  },
  {
    title: "Nothing charged you haven’t agreed",
    body: "If we find rot, soft ground or a failed lintel, you see it, you get the price to put it right, and you decide. Surprises at the end are a failure of process.",
  },
  {
    title: "Our own trades",
    body: "Brickwork, groundworks, roofing, tiling and decorating are our own people. Gas and electrics go to registered engineers so the work can be certified.",
  },
  {
    title: "We tidy up",
    body: "Swept down at the end of each day, the skip kept off the road where we can, and everything taken away at the end. Your neighbours still have to live there too.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Services */}
      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Twelve trades, one team, one standard."
          lead="Brickwork, landscape gardening, extensions, driveways, rendering, refurbishments, roofing, tiling, bathrooms, painting &amp; decorating, kitchen fitting and commercial fit-out. Priced and run the same way whatever the size of the job."
          action={
            <Button asChild variant="outline">
              <Link href={showPortfolio ? "/projects" : "/contact"}>
                {showPortfolio ? "See recent projects" : "Get a free quote"}{" "}
                <ArrowRight aria-hidden />
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
      {showPortfolio ? (
        <Section>
          <SectionHeading
            eyebrow="Recent work"
            title="A job we finished this year."
            lead="One real project rather than a wall of stock photographs. More go up here as we finish them and get permission to show them."
            action={
              <Button asChild variant="outline">
                <Link href="/projects">
                  {projects.length > 1 ? "All projects" : "Read the case study"}{" "}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            }
          />
          <ProjectCarousel projects={projects} />
        </Section>
      ) : null}

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
      {showPortfolio ? (
        <Section>
          <SectionHeading
            eyebrow="What clients say"
            title="In their words, not ours."
            lead="A star average tells you very little, so these say what the job was and what we actually did."
          />
          <TestimonialsSection />
        </Section>
      ) : null}

      {/* Guides — research-stage content */}
      <Section tone={showPortfolio ? "paper-2" : "paper"}>
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
      <Section tone={showPortfolio ? "paper" : "paper-2"}>
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
      <Section tone={showPortfolio ? "paper-2" : "paper"}>
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
