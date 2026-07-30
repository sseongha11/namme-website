import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Quote } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { showPortfolio } from "@/lib/site-status";

export function generateStaticParams() {
  // No pages generated while the portfolio is hidden.
  return showPortfolio ? projects.map((p) => ({ slug: p.slug })) : [];
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title}, ${project.location} ${project.postcode}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project || !showPortfolio) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const facts = [
    { label: "Property", value: project.propertyType },
    { label: "Location", value: `${project.location} ${project.postcode}` },
    { label: "Duration", value: project.duration },
    { label: "Completed", value: project.year },
  ];

  const story = [
    { heading: "The brief", body: project.brief },
    { heading: "The problem", body: project.challenge },
    { heading: "What we did", body: project.solution },
    { heading: "The result", body: project.outcome },
  ];

  return (
    <>
      <PageHeader
        eyebrow={`${project.location} · ${project.postcode}`}
        title={project.title}
        lead={project.summary}
        trail={[{ label: "Projects", href: "/projects" }, { label: project.location }]}
      />

      {/* Facts strip */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-y-8 px-6 py-9 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {f.label}
              </p>
              <p className="mt-2 text-[16px] font-medium">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Finished + in-progress. The during shot is deliberately given equal
          weight — it is the frame that proves the work is ours. */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
              <Image
                src={`/images/project-${project.slug}-after.svg`}
                alt={`${project.title} in ${project.location}, completed`}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                loading="eager"
                fetchPriority="high"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-[13px] text-ink-muted">Completed</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
              <Image
                src={`/images/project-${project.slug}-during.svg`}
                alt={`${project.title} in ${project.location}, mid-build with scaffolding`}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-[13px] text-ink-muted">
              Mid-build — how a site is run tells you more than the finished photograph
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Story */}
      <Section tone="paper-2">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            {story.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.05} className="mb-12 last:mb-0">
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-clay">
                  {s.heading}
                </h2>
                <p className="mt-4 text-[18px] leading-[1.75] text-ink-soft">{s.body}</p>
              </Reveal>
            ))}
          </div>

          <div>
            <Reveal className="border border-line bg-paper p-8">
              <h2 className="text-[19px] font-semibold tracking-[-0.02em]">
                Materials &amp; specification
              </h2>
              <ul className="mt-6 space-y-3">
                {project.materials.map((m) => (
                  <li
                    key={m}
                    className="border-b border-line pb-3 text-[14.5px] leading-[1.6] text-ink-soft last:border-0 last:pb-0"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Services used
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.serviceSlugs.map((slug) => {
                  const s = getService(slug);
                  if (!s) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/services/${slug}`}
                        className="inline-block border border-line-strong px-3.5 py-2 text-[13.5px] transition-colors hover:border-clay hover:text-clay"
                      >
                        {s.short}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Testimonial */}
      {project.testimonial ? (
        <Section>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto size-7 text-clay" aria-hidden />
            <blockquote className="mt-7 text-balance text-[24px] leading-[1.55] tracking-[-0.02em] sm:text-[28px]">
              “{project.testimonial.quote}”
            </blockquote>
            <p className="mt-7 text-[14px] text-ink-muted">
              {project.testimonial.author}
            </p>
          </Reveal>
        </Section>
      ) : null}

      {/* More projects */}
      <Section tone="paper-2">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-[28px] font-semibold tracking-[-0.03em] sm:text-[34px]">
            More recent work
          </h2>
          <Button asChild variant="outline">
            <Link href="/projects">
              All projects <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
