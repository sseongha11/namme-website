import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { LogoMark } from "@/components/logo";
import { areas } from "@/content/areas";
import { serviceGroups, servicesByGroup } from "@/content/services";
import { accreditations, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-deep text-paper">
      <div className="mx-auto max-w-[1240px] px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          {/* Identity + contact */}
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-7 w-7 text-clay" />
              <span className="text-[19px] font-semibold uppercase tracking-[0.16em]">
                {site.name}
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/60">
              {site.description}
            </p>

            <ul className="mt-7 space-y-3 text-[14.5px]">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 text-white/80 transition-colors hover:text-clay-light"
                >
                  <Phone className="size-4 shrink-0 text-clay" aria-hidden />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-white/80 transition-colors hover:text-clay-light"
                >
                  <Mail className="size-4 shrink-0 text-clay" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="mt-0.5 size-4 shrink-0 text-clay" aria-hidden />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.city} {site.address.postcode}
                </span>
              </li>
            </ul>

            <dl className="mt-7 space-y-1.5 text-[13.5px] text-white/50">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-6 sm:max-w-[260px]">
                  <dt>{h.days}</dt>
                  <dd className="text-white/70">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {serviceGroups.slice(0, 2).map((group) => (
              <div key={group}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-clay">
                  {group}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {servicesByGroup(group).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-[14.5px] text-white/65 transition-colors hover:text-white"
                      >
                        {s.short}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-clay">
                Renovations
              </h3>
              <ul className="mt-4 space-y-2.5">
                {servicesByGroup("Renovations").map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-[14.5px] text-white/65 transition-colors hover:text-white"
                    >
                      {s.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-clay">
                Areas we cover
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
                {areas.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/areas/${a.slug}`}
                      className="text-[14.5px] text-white/65 transition-colors hover:text-white"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Accreditations — named with what they mean, not a bare logo wall */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {accreditations.map((a) => (
              <li key={a.name} className="flex gap-3.5">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay"
                  aria-hidden
                />
                <div>
                  <p className="text-[13.5px] font-semibold">
                    {a.name}{" "}
                    <span className="font-normal text-white/40">— {a.full}</span>
                  </p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-white/50">
                    {a.meaning}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white/70">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white/70">
              Terms
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white/70">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
