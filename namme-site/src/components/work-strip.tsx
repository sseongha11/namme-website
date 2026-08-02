"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { WorkClip } from "@/content/work";

/**
 * Site footage, in phone-shaped cards.
 *
 * The shape is not a stylistic choice. The source clips are 480x848, so a card
 * about 300px wide puts them above retina density and they look sharp; stretched
 * across a section they would look like exactly what they are, which is footage
 * that has been through WhatsApp. Holding them at phone size is what lets them
 * read as evidence from site rather than as a bad hero video.
 *
 * Nothing plays on its own. Eight clips autoplaying is a real cost on a phone
 * contract and a real drain on a battery, and the poster frame already tells
 * you what you would be starting. Each card mounts its <video> only when it is
 * clicked, so an untouched strip costs the posters and nothing else.
 */

function ClipCard({ clip, priority }: { clip: WorkClip; priority: boolean }) {
  const [playing, setPlaying] = useState(false);
  const isVideo = clip.kind === "video";

  return (
    <figure>
      <div className="relative aspect-[9/16] overflow-hidden bg-paper-2">
        {playing && isVideo ? (
          <video
            src={clip.src}
            poster={clip.poster}
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label={clip.alt}
            className="size-full object-cover"
          />
        ) : (
          <Image
            src={isVideo ? (clip.poster as string) : clip.src}
            alt={clip.alt}
            fill
            sizes="(max-width: 640px) 64vw, (max-width: 1024px) 38vw, 300px"
            priority={priority}
            className="object-cover"
          />
        )}

        {isVideo && !playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${clip.caption}`}
            className="group absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/45 via-transparent to-transparent p-4 transition-colors hover:from-black/60"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-paper/95 text-ink shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Play className="ml-0.5 size-4 fill-current" aria-hidden />
            </span>
          </button>
        ) : null}
      </div>

      <figcaption className="mt-3.5 text-[14px] leading-[1.5] text-ink-soft">
        {clip.caption}
      </figcaption>
    </figure>
  );
}

export function WorkStrip({ clips }: { clips: WorkClip[] }) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    // Embla is an external system: subscribe, and take one reading now because
    // it has already initialised by the time this effect runs.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  if (clips.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex gap-4 sm:gap-5">
          {clips.map((clip, i) => (
            <li
              key={clip.id}
              className="min-w-0 flex-[0_0_64%] sm:flex-[0_0_38%] lg:flex-[0_0_23.5%]"
            >
              <ClipCard clip={clip} priority={i < 2} />
            </li>
          ))}
        </ul>
      </div>

      {/* Arrows appear only when there is somewhere to scroll — on a wide screen
          four clips already fit, and dead controls read as broken. */}
      {canPrev || canNext ? (
        <div className="mt-8 flex justify-end gap-2">
          <button
            onClick={() => embla?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous clips"
            className="flex size-11 items-center justify-center border border-line-strong transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line-strong"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <button
            onClick={() => embla?.scrollNext()}
            disabled={!canNext}
            aria-label="Next clips"
            className="flex size-11 items-center justify-center border border-line-strong transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line-strong"
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}
