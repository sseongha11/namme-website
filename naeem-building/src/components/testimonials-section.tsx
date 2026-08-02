import { Star } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsSection({ limit = 6 }: { limit?: number }) {
  // A three-column masonry holding one quote looks like a layout bug. With a
  // single review it becomes one wider block instead.
  const single = testimonials.length < 2;

  return (
    <div
      className={
        single
          ? "mt-14 max-w-2xl"
          : "mt-14 columns-1 gap-8 md:columns-2 lg:columns-3"
      }
    >
      {testimonials.slice(0, limit).map((t, i) => (
        <Reveal
          key={t.author}
          delay={(i % 3) * 0.07}
          className={cn(
            "mb-8 break-inside-avoid border border-line bg-paper",
            single ? "p-9" : "p-7",
          )}
        >
          <div className="flex gap-0.5" aria-label={`${t.rating} out of 5`}>
            {Array.from({ length: t.rating }).map((_, s) => (
              <Star key={s} className="size-3.5 fill-clay text-clay" aria-hidden />
            ))}
          </div>

          <blockquote
            className={cn(
              "mt-5 leading-[1.7] text-ink",
              single ? "text-[18px]" : "text-[15.5px]",
            )}
          >
            “{t.quote}”
          </blockquote>

          <footer className="mt-6 border-t border-line pt-4">
            <p className="text-[14px] font-semibold">{t.author}</p>
            <p className="mt-1 text-[13px] text-ink-muted">
              {t.project} · {t.location}
            </p>
            <p className="mt-2 text-[11.5px] uppercase tracking-[0.1em] text-ink-muted">
              via {t.source}
            </p>
          </footer>
        </Reveal>
      ))}
    </div>
  );
}
