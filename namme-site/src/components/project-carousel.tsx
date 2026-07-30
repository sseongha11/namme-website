"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    // Embla is an external system: we subscribe to it, and take one initial
    // reading because it has already initialised by the time this effect runs.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSnaps(embla.scrollSnapList());
    onSelect();
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  // One project is not a carousel. Dots and arrows on a single slide read as
  // broken, so it renders as a plain card at a readable width instead.
  if (projects.length < 2) {
    return (
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} priority />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-14">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 lg:gap-8">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className="min-w-0 flex-[0_0_84%] sm:flex-[0_0_46%] lg:flex-[0_0_31.5%]"
            >
              <ProjectCard project={p} priority={i < 3} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between gap-6">
        {/* Progress dots double as the position indicator */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Projects">
          {snaps.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === selected}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => embla?.scrollTo(i)}
              className={cn(
                "h-0.5 transition-all duration-300",
                i === selected ? "w-8 bg-clay" : "w-4 bg-line-strong hover:bg-ink-muted",
              )}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => embla?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous projects"
            className="flex size-11 items-center justify-center border border-line-strong transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line-strong"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <button
            onClick={() => embla?.scrollNext()}
            disabled={!canNext}
            aria-label="Next projects"
            className="flex size-11 items-center justify-center border border-line-strong transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line-strong"
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
