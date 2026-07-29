import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * Project card. Titled by location rather than by a marketing phrase — someone
 * searching for work in their own neighbourhood is scanning for their postcode,
 * not for "stunning transformation".
 */
export function ProjectCard({
  project,
  className,
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
          <Image
            src={`/images/project-${project.slug}-after.svg`}
            alt={`${project.title} in ${project.location} — ${project.propertyType}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            loading={priority ? "eager" : "lazy"}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <span className="absolute left-0 top-0 bg-paper px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink">
            {project.postcode}
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[18px] font-semibold tracking-[-0.02em]">
              {project.location}
            </h3>
            <p className="mt-1 text-[14.5px] text-ink-soft">{project.title}</p>
          </div>
          <ArrowUpRight
            className="mt-1 size-4.5 shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay"
            aria-hidden
          />
        </div>

        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-3 text-[12.5px] text-ink-muted">
          <div className="flex gap-1.5">
            <dt className="sr-only">Property</dt>
            <dd>{project.propertyType}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="sr-only">Duration</dt>
            <dd>{project.duration}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="sr-only">Year</dt>
            <dd>{project.year}</dd>
          </div>
        </dl>
      </Link>
    </article>
  );
}
