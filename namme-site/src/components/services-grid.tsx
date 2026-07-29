import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { serviceGroups, servicesByGroup } from "@/content/services";

const GROUP_IMAGE: Record<string, string> = {
  Extensions: "/images/service-extensions.svg",
  "Loft conversions": "/images/service-lofts.svg",
  Renovations: "/images/service-renovations.svg",
};

const GROUP_BLURB: Record<string, string> = {
  Extensions:
    "Rear, side return, wrap-around and double-storey — the ground floor rebuilt around how you actually use it.",
  "Loft conversions":
    "Dormer, mansard and hip-to-gable. A bedroom and bathroom out of space you already own.",
  Renovations:
    "Whole-house refurbishment, kitchens and bathrooms — services and structure first, finishes second.",
};

export function ServicesGrid() {
  return (
    <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {serviceGroups.map((group, i) => {
        const children = servicesByGroup(group);
        return (
          <Reveal key={group} delay={i * 0.07} as="article" className="group">
            <Link href={`/services/${children[0].slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                <Image
                  src={GROUP_IMAGE[group]}
                  alt={`${group} illustration`}
                  fill
                  sizes="(max-width: 640px) 100vw, 560px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-6 flex items-start justify-between gap-4">
                <h3 className="text-[22px] font-semibold tracking-[-0.025em]">
                  {group}
                </h3>
                <ArrowUpRight
                  className="mt-1 size-5 shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay"
                  aria-hidden
                />
              </div>
              <p className="mt-3 max-w-md text-[15.5px] leading-[1.65] text-ink-soft">
                {GROUP_BLURB[group]}
              </p>
            </Link>

            <ul className="mt-5 flex flex-wrap gap-2">
              {children.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-block border border-line px-3 py-1.5 text-[13px] text-ink-soft transition-colors hover:border-clay hover:text-clay"
                  >
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  );
}
