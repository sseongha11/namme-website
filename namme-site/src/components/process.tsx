import { Reveal } from "@/components/reveal";
import { processSteps } from "@/content/site";

export function Process({ onDark = true }: { onDark?: boolean }) {
  return (
    <ol className="mt-14 grid gap-px lg:grid-cols-5">
      {processSteps.map((step, i) => (
        <Reveal
          key={step.step}
          as="li"
          delay={i * 0.06}
          className={
            onDark
              ? "border-t border-white/15 pt-7 lg:pr-6"
              : "border-t border-line pt-7 lg:pr-6"
          }
        >
          <div className="flex items-baseline justify-between gap-3">
            <span
              className={`numeral text-[30px] leading-none ${onDark ? "text-clay" : "text-clay"}`}
            >
              {step.step}
            </span>
            <span
              className={`text-[11.5px] uppercase tracking-[0.12em] ${
                onDark ? "text-white/40" : "text-ink-muted"
              }`}
            >
              {step.duration}
            </span>
          </div>
          <h3
            className={`mt-5 text-[19px] font-semibold tracking-[-0.02em] ${
              onDark ? "text-paper" : "text-ink"
            }`}
          >
            {step.title}
          </h3>
          <p
            className={`mt-3 text-[14.5px] leading-[1.65] ${
              onDark ? "text-white/55" : "text-ink-soft"
            }`}
          >
            {step.body}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
