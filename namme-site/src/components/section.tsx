import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "paper-2" | "deep";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "px-6 py-20 lg:py-28",
        tone === "paper-2" && "bg-paper-2",
        tone === "deep" && "bg-deep text-paper",
        className,
      )}
    >
      <div className="mx-auto max-w-[1240px]">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  onDark = false,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  action?: ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2
          className={cn(
            "mt-3 text-balance text-[34px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]",
            onDark ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
        {lead ? (
          <p
            className={cn(
              "mt-5 text-[17px] leading-[1.7]",
              onDark ? "text-white/60" : "text-ink-soft",
            )}
          >
            {lead}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
