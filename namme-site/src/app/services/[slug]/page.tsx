import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock, FileText, PoundSterling } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Process } from "@/components/process";
import { ProjectCard } from "@/components/project-card";
import { ContactChannels } from "@/components/contact-channels";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";
import { WorkStrip } from "@/components/work-strip";
import { projectsForService } from "@/content/projects";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";
import { clipsForService } from "@/content/work";
import { showPortfolio } from "@/lib/site-status";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: `${service.title} in ${site.primaryLocation} — cost, timescales and planning`,
    description: `${service.summary} ${service.priceFrom}–${service.priceTo} typical, ${service.duration}. Design, planning and build under one contract.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter(
    (s) => s.group === service.group && s.slug !== service.slug,
  );
  const projects = projectsForService(service.slug);
  const clips = clipsForService(service.slug);

  return (
    <>
      <PageHeader
        eyebrow={service.group}
        title={`${service.title} in ${site.primaryLocation}`}
        lead={service.summary}
        trail={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Key facts strip — cost, duration and planning route are the three
          things every visitor is actually here to find out. */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-[1240px] gap-px px-6 sm:grid-cols-3">
          <Reveal className="py-8 sm:pr-8">
            <PoundSterling className="size-4 text-clay" aria-hidden />
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Typical cost
            </p>
            <p className="numeral mt-2 text-[28px] leading-none">
              {service.priceFrom} – {service.priceTo}
            </p>
          </Reveal>
          <Reveal delay={0.06} className="py-8 sm:border-l sm:border-line sm:px-8">
            <Clock className="size-4 text-clay" aria-hidden />
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Time on site
            </p>
            <p className="numeral mt-2 text-[28px] leading-none">{service.duration}</p>
          </Reveal>
          <Reveal delay={0.12} className="py-8 sm:border-l sm:border-line sm:pl-8">
            <FileText className="size-4 text-clay" aria-hidden />
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Planning route
            </p>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-soft">
              {service.planning}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Intro + image */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            {service.intro.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="mb-6 text-[18px] leading-[1.72] text-ink-soft last:mb-0"
              >
                {p}
              </p>
            ))}

            <h2 className="mt-12 text-[24px] font-semibold tracking-[-0.03em]">
              What’s included
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-[1.6] text-ink-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-clay" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
              <Image
                src={`/images/service-${service.slug}.svg`}
                alt={`${service.title} illustration`}
                fill
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover"
              />
            </div>

            {/* Price drivers — the part that makes a cost page genuinely useful */}
            <div className="mt-10 border border-line bg-paper-2 p-8">
              <h2 className="text-[20px] font-semibold tracking-[-0.025em]">
                What moves the price
              </h2>
              <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft">
                A range on its own tells you nothing. These are the five things
                that decide where in it you land.
              </p>
              <ul className="mt-6 space-y-3.5">
                {service.priceDrivers.map((d, i) => (
                  <li key={d} className="flex gap-3.5 text-[14.5px] leading-[1.6] text-ink-soft">
                    <span className="numeral shrink-0 text-[16px] leading-tight text-clay">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Site footage. Sits directly under the intro because it answers the
          question the intro raises — "can you actually do this?" — before the
          visitor has to take anything else on trust. Renders nothing for the
          trades with no footage yet. */}
      {showPortfolio && clips.length > 0 ? (
        <Section tone="paper-2">
          <SectionHeading
            eyebrow="On site"
            title={`${service.title}, close up.`}
            lead={
              clips.some((c) => c.kind === "video")
                ? "Taken on a phone as we packed up, not staged for a photoshoot. Tap any clip to play it."
                : "Taken on a phone as we packed up, not staged for a photoshoot."
            }
          />
          <WorkStrip clips={clips} />
        </Section>
      ) : null}

      {/* Process */}
      <Section tone="deep">
        <SectionHeading
          onDark
          eyebrow="How it works"
          title="From first visit to handover."
          lead="The same five stages whatever we’re building. You always know which one you’re in."
        />
        <Process />
      </Section>

      {/* Related projects */}
      {showPortfolio && projects.length > 0 ? (
        <Section>
          <SectionHeading
            eyebrow="Recent work"
            title={`${service.title} we’ve done.`}
            action={
              <Button asChild variant="outline">
                <Link href="/projects">
                  All projects <ArrowRight aria-hidden />
                </Link>
              </Button>
            }
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Related services. A group can hold a single trade — commercial
          fit-out does — and then there is nothing to relate it to. Rendering
          the heading anyway leaves an empty bordered box that reads as a
          broken page, so the whole section goes. */}
      {related.length > 0 ? (
      <Section tone="paper-2">
        <SectionHeading
          eyebrow="Also in this category"
          title={`Other ${service.group.toLowerCase()} we do.`}
        />
        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group bg-paper p-8 transition-colors hover:bg-paper-2"
            >
              <h3 className="text-[18px] font-semibold tracking-[-0.02em] transition-colors group-hover:text-clay">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-soft">
                {s.summary}
              </p>
              <p className="mt-4 text-[13.5px] text-ink-muted">
                From {s.priceFrom} · {s.duration}
              </p>
            </Link>
          ))}
        </div>
      </Section>
      ) : null}

      {/* Enquiry */}
      <Section id="enquire">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Get started"
            title={`Thinking about ${service.title.toLowerCase()}?`}
            lead="Tell us roughly what you have in mind and we’ll come and look. Free, no obligation, and you get an honest view of the cost before anyone asks you for money."
          />
          <ContactChannels />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
