import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function CtaBand({
  title = "Tell us what you’re thinking of building.",
  lead = "A free consultation, a measured survey and an honest view of what it will cost — before anyone asks you for money.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="bg-clay px-6 py-20 text-white lg:py-24">
      <Reveal className="mx-auto flex max-w-[1240px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-balance text-[34px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
            {title}
          </h2>
          <p className="mt-5 text-[17px] leading-[1.7] text-white/80">{lead}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button asChild size="lg" variant="onDark">
            <Link href="/contact">
              Book a consultation <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outlineDark">
            <a href={site.phoneHref}>
              <Phone aria-hidden /> {site.phone}
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
