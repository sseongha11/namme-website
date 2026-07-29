import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export function StatsBar() {
  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-px px-6 lg:grid-cols-4">
        {site.stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.06}
            className="flex flex-col justify-center py-9 lg:py-11"
          >
            <p className="numeral text-[40px] leading-none text-ink lg:text-[46px]">
              {stat.value}
            </p>
            <p className="mt-2.5 text-[13.5px] uppercase tracking-[0.1em] text-ink-muted">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
