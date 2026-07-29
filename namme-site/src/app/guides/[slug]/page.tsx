import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { getGuide, guides, type Block } from "@/content/guides";
import { getService } from "@/content/services";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  props: PageProps<"/guides/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.summary,
    alternates: { canonical: `/guides/${guide.slug}` },
  };
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={i}
          className="mt-14 text-[27px] font-semibold leading-tight tracking-[-0.03em] first:mt-0"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="mt-10 text-[19px] font-semibold tracking-[-0.02em]">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="mt-5 text-[17.5px] leading-[1.75] text-ink-soft">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3.5 text-[16.5px] leading-[1.7] text-ink-soft"
            >
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-clay" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div key={i} className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-y border-line-strong">
                {block.head.map((h) => (
                  <th
                    key={h}
                    className="py-3.5 pr-6 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-ink-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-b border-line">
                  {row.map((cell, ci) => (
                    <td
                      key={cell}
                      className={
                        ci === 0
                          ? "py-4 pr-6 text-[15.5px] font-medium"
                          : "py-4 pr-6 text-[15.5px] text-ink-soft"
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside
          key={i}
          className="mt-10 border-l-2 border-clay bg-paper-2 p-7"
        >
          <p className="flex items-center gap-2.5 text-[15px] font-semibold">
            <Info className="size-4 text-clay" aria-hidden />
            {block.title}
          </p>
          <p className="mt-3 text-[16px] leading-[1.7] text-ink-soft">{block.text}</p>
        </aside>
      );
  }
}

export default async function GuidePage(props: PageProps<"/guides/[slug]">) {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guide.relatedServices
    .map((s) => getService(s))
    .filter((s) => s !== undefined);
  const others = guides.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <PageHeader
        eyebrow={`${guide.category} guide`}
        title={guide.title}
        lead={guide.summary}
        trail={[{ label: "Guides", href: "/guides" }, { label: guide.title }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-20">
          <Reveal as="article" className="max-w-[70ch]">
            <p className="mb-10 border-b border-line pb-6 text-[13.5px] text-ink-muted">
              {guide.readingTime} read · Updated {guide.updated} · Figures are for
              Derby and the East Midlands
            </p>
            {guide.body.map(renderBlock)}
          </Reveal>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {related.length > 0 ? (
              <div className="border border-line p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Related services
                </p>
                <ul className="mt-5 space-y-4">
                  {related.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group block">
                        <p className="text-[15.5px] font-medium transition-colors group-hover:text-clay">
                          {s.title}
                        </p>
                        <p className="mt-1 text-[13px] text-ink-muted">
                          {s.priceFrom} – {s.priceTo}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-6 border border-line bg-paper-2 p-7">
              <p className="text-[15.5px] font-semibold">Want a real number?</p>
              <p className="mt-2.5 text-[14.5px] leading-[1.65] text-ink-soft">
                Ranges only get you so far. We’ll visit, measure up and give you a
                written estimate for free.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-block text-[14.5px] font-semibold text-clay underline underline-offset-4"
              >
                Book a consultation
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="paper-2">
        <h2 className="text-[28px] font-semibold tracking-[-0.03em] sm:text-[34px]">
          Other guides
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {others.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">
                {g.category}
              </p>
              <h3 className="mt-3 text-[19px] font-semibold leading-snug tracking-[-0.02em] transition-colors group-hover:text-clay">
                {g.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft">
                {g.summary}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
