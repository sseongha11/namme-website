import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Projects — recent work across ${site.primaryLocation}`,
  description:
    "Completed extensions, driveways, roofs, bathrooms, brickwork and refurbishments across Derby, Derbyshire, Nottingham and Leicester, including what went wrong on each and how it was resolved.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Every project here had a problem in it."
        lead="Drainage that couldn’t move, rot under the floor, a refusal, an objection from next door. Showing only the finished photograph hides the part that actually tells you whether a builder is any good."
        trail={[{ label: "Projects" }]}
      />

      <Section>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <ProjectCard project={p} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Want to see one in person?"
        lead="We can usually arrange a visit to a live site. How a site is run mid-build tells you far more than any photograph of a finished one."
      />
    </>
  );
}
