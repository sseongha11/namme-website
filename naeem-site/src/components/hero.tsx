import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-6 pb-16 pt-14 lg:grid-cols-[1fr_1.08fr] lg:gap-16 lg:pb-24 lg:pt-20">
        <div>
          <p className="eyebrow">{site.primaryLocation} · General building company</p>

          <h1 className="mt-5 text-balance text-[42px] font-semibold leading-[1.03] tracking-[-0.04em] sm:text-[56px] lg:text-[62px]">
            A small, local, friendly{" "}
            <span className="relative whitespace-nowrap">
              Derby based
              <svg
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden
                className="absolute -bottom-1 left-0 h-2.5 w-full text-clay"
              >
                <path
                  d="M2 8.5 C 70 3, 150 3, 298 6"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            general building company.
          </h1>

          <p className="mt-7 max-w-lg text-[18px] leading-[1.65] text-ink-soft">
            Providing a quality and reliable service at an affordable price.
            Brickwork, extensions, roofing, rendering, driveways, landscaping,
            bathrooms, kitchens, tiling and decorating — one team for all of it.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Get a free quote <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={site.phoneHref}>
                <Phone aria-hidden /> {site.phone}
              </a>
            </Button>
          </div>

          {/* Trust strip. Only things we can stand behind — no review score, no
              accreditation badges, until there are real ones to point at. */}
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-line pt-7">
            <p className="text-[14px] text-ink-soft">Free written quotes</p>
            <div className="h-4 w-px bg-line" aria-hidden />
            <p className="text-[14px] text-ink-soft">No job too small</p>
            <div className="hidden h-4 w-px bg-line sm:block" aria-hidden />
            <p className="text-[14px] text-ink-soft">
              {site.primaryLocation} and about an hour around it
            </p>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative">
          <div className="relative aspect-[16/11] overflow-hidden bg-paper-2">
            <Image
              src="/images/hero.svg"
              alt="Illustration of a Victorian house with a single-storey rear extension, structural rooflights and full-width glazing"
              fill
              sizes="(max-width: 1024px) 100vw, 620px"
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
          </div>

          {/* Floating stat card — anchors the image and repeats the core promise */}
          <div className="absolute -bottom-6 -left-6 hidden border border-line bg-paper p-6 shadow-[0_20px_50px_-24px_rgba(18,22,26,0.35)] sm:block">
            <p className="numeral text-[38px] leading-none text-clay">Free</p>
            <p className="mt-2 max-w-[150px] text-[13.5px] leading-snug text-ink-soft">
              no-obligation quotes, however small the job
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
