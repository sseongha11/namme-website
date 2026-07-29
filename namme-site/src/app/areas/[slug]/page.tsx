import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, Landmark } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { Process } from "@/components/process";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { areas, getArea } from "@/content/areas";
import { getProject } from "@/content/projects";
import { getService } from "@/content/services";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/areas/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const area = getArea(slug);
  if (!area) return {};

  return {
    title: `Builders in ${area.name} — extensions, lofts and renovations`,
    description: `Extensions, loft conversions and renovations across ${area.name} (${area.postcodes.join(", ")}). ${area.planningNotes.slice(0, 110)}…`,
    alternates: { canonical: `/areas/${area.slug}` },
  };
}

export default async function AreaPage(props: PageProps<"/areas/[slug]">) {
  const { slug } = await props.params;
  const area = getArea(slug);
  if (!area) notFound();

  const services = area.popularServices
    .map((s) => getService(s))
    .filter((s) => s !== undefined);
  const projects = area.projectSlugs
    .map((p) => getProject(p))
    .filter((p) => p !== undefined);

  return (
    <>
      <PageHeader
        eyebrow="Areas we cover"
        title={`Builders in ${area.name}`}
        lead={`Extensions, loft conversions and full renovations across ${area.postcodes.join(", ")}. Same team, same specification, same weekly updates.`}
        trail={[{ label: "Areas", href: "/areas" }, { label: area.name }]}
      />

      {/* Local specifics — the reason this page is worth publishing at all */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="border border-line bg-paper-2 p-8 lg:p-10">
            <Building2 className="size-5 text-clay" aria-hidden />
            <h2 className="mt-5 text-[22px] font-semibold tracking-[-0.025em]">
              The housing stock here
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.7] text-ink-soft">
              {area.housingStock}
            </p>
          </Reveal>

          <Reveal delay={0.07} className="border border-line bg-paper-2 p-8 lg:p-10">
            <Landmark className="size-5 text-clay" aria-hidden />
            <h2 className="mt-5 text-[22px] font-semibold tracking-[-0.025em]">
              Planning in {area.name}
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.7] text-ink-soft">
              {area.planningNotes}
            </p>
            <p className="mt-6 border-t border-line pt-4 text-[13.5px] text-ink-muted">
              Planning authority: {area.council}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Most-requested services here */}
      <Section tone="paper-2">
        <SectionHeading
          eyebrow="Most requested"
          title={`What we build most in ${area.name}.`}
          lead="Driven by what the housing stock actually is, rather than by what we’d like to sell."
        />
        <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group bg-paper p-8 transition-colors hover:bg-paper-2"
            >
              <h3 className="text-[20px] font-semibold tracking-[-0.025em] transition-colors group-hover:text-clay">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft">
                {s.summary}
              </p>
              <p className="mt-5 border-t border-line pt-4 text-[13.5px] text-ink-muted">
                {s.priceFrom} – {s.priceTo} · {s.duration}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Local projects */}
      {projects.length > 0 ? (
        <Section>
          <SectionHeading
            eyebrow="Nearby work"
            title={`Projects we’ve completed in ${area.name}.`}
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="deep">
        <SectionHeading
          onDark
          eyebrow="How it works"
          title="The same five stages, wherever you are."
        />
        <Process />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Get started"
            title={`Building in ${area.name}?`}
            lead="Tell us the postcode and roughly what you have in mind. We’ll come and look, take measurements, and give you an honest view of the cost."
          />
          <QuoteForm />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
