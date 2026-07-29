import { Star } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { testimonials } from "@/content/testimonials";

export function TestimonialsSection({ limit = 6 }: { limit?: number }) {
  return (
    <div className="mt-14 columns-1 gap-8 md:columns-2 lg:columns-3">
      {testimonials.slice(0, limit).map((t, i) => (
        <Reveal
          key={t.author}
          delay={(i % 3) * 0.07}
          className="mb-8 break-inside-avoid border border-line bg-paper p-7"
        >
          <div className="flex gap-0.5" aria-label={`${t.rating} out of 5`}>
            {Array.from({ length: t.rating }).map((_, s) => (
              <Star key={s} className="size-3.5 fill-clay text-clay" aria-hidden />
            ))}
          </div>

          <blockquote className="mt-5 text-[15.5px] leading-[1.7] text-ink">
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
