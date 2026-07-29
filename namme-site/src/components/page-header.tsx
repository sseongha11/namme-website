import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Reveal } from "@/components/reveal";

export function Breadcrumbs({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-clay">
            Home
          </Link>
        </li>
        {trail.map((t) => (
          <li key={t.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" aria-hidden />
            {t.href ? (
              <Link href={t.href} className="transition-colors hover:text-clay">
                {t.label}
              </Link>
            ) : (
              <span className="text-ink">{t.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  trail,
  aside,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  trail?: { label: string; href?: string }[];
  aside?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper-2 px-6 pb-16 pt-10 lg:pb-20">
      <div className="mx-auto max-w-[1240px]">
        {trail ? <Breadcrumbs trail={trail} /> : null}
        <Reveal className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1 className="mt-3 max-w-3xl text-balance text-[38px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[50px]">
              {title}
            </h1>
          </div>
          {lead || aside ? (
            <div>
              {lead ? (
                <p className="max-w-xl text-[17px] leading-[1.7] text-ink-soft">
                  {lead}
                </p>
              ) : null}
              {aside}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
