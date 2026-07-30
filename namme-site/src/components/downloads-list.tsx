import { ArrowDownToLine } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { downloadsFor } from "@/content/downloads";
import { cn } from "@/lib/utils";

/**
 * Things a customer can take away — the leaflet and the card.
 *
 * The file type and size are shown because someone on mobile data deserves to
 * know what they are about to tap. `download` on the anchor saves rather than
 * opening a PDF viewer in place, which is what people expect from a link that
 * says download.
 */
export function DownloadsList({
  lang = "en",
  className,
}: {
  lang?: "en" | "ar";
  className?: string;
}) {
  const items = downloadsFor(lang);
  if (items.length === 0) return null;

  return (
    <ul className={cn("grid gap-px border border-line bg-line", className)}>
      {items.map((d, i) => (
        <Reveal as="li" key={d.file} delay={(i % 3) * 0.05} className="bg-paper">
          <a
            href={`/downloads/${d.file}`}
            download
            className="group flex items-start gap-4 p-6 transition-colors hover:bg-paper-2"
          >
            <ArrowDownToLine
              className="mt-0.5 size-4 shrink-0 text-clay transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden
            />
            <div className="min-w-0">
              <p className="text-[15.5px] font-medium transition-colors group-hover:text-clay">
                {d.label}
              </p>
              <p className="mt-1 text-[14px] leading-[1.6] text-ink-soft">
                {d.description}
              </p>
              <p className="mt-2 text-[12.5px] uppercase tracking-[0.1em] text-ink-muted">
                {d.kind} · {d.size}
              </p>
            </div>
          </a>
        </Reveal>
      ))}
    </ul>
  );
}
