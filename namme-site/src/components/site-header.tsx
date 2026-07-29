"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { serviceGroups, servicesByGroup } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Projects", href: "/projects" },
  { label: "Guides", href: "/guides" },
  { label: "Areas", href: "/areas" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close both menus when the route changes. Adjusting state during render is
  // React's documented pattern for deriving from a prop — an effect here would
  // render the stale open menu first, then close it.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(false);
    setOpenServices(false);
  }

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMenu]);

  return (
    <>
      {/* Utility bar — phone number above the fold on every page, which is the
          single most-cited conversion element on builder sites. */}
      <div className="hidden bg-deep text-paper md:block">
        <div className="mx-auto flex h-10 max-w-[1240px] items-center justify-between px-6 text-[12.5px]">
          <p className="text-white/70">
            Free consultation and written estimate · No obligation
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/ar"
              lang="ar"
              dir="rtl"
              hrefLang="ar"
              className="font-arabic text-white/70 transition-colors hover:text-clay-light"
            >
              العربية
            </Link>
            <span className="text-white/70">
              {site.rating.score} ★ from {site.rating.count}+ reviews
            </span>
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 font-semibold transition-colors hover:text-clay-light"
            >
              <Phone className="size-3.5" aria-hidden />
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-line bg-paper/90 backdrop-blur-md"
            : "border-transparent bg-paper",
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between gap-8 px-6">
          <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {/* Services mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setOpenServices(true)}
              onMouseLeave={() => setOpenServices(false)}
            >
              <button
                className="flex items-center gap-1.5 px-3.5 py-2 text-[14.5px] font-medium text-ink transition-colors hover:text-clay"
                aria-expanded={openServices}
                onClick={() => setOpenServices((v) => !v)}
              >
                Services
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    openServices && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>

              <AnimatePresence>
                {openServices ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-full w-[660px] -translate-x-1/2 pt-3"
                  >
                    <div className="grid grid-cols-3 gap-x-8 gap-y-2 border border-line bg-paper p-7 shadow-[0_24px_60px_-20px_rgba(18,22,26,0.22)]">
                      {serviceGroups.map((group) => (
                        <div key={group}>
                          <p className="mb-3 border-b border-line pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                            {group}
                          </p>
                          <ul className="space-y-1">
                            {servicesByGroup(group).map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/services/${s.slug}`}
                                  className="block py-1.5 text-[14px] leading-snug text-ink-soft transition-colors hover:text-clay"
                                >
                                  {s.short}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-2 text-[14.5px] font-medium transition-colors hover:text-clay",
                  pathname.startsWith(item.href) ? "text-clay" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/contact">Book a consultation</Link>
            </Button>
            <button
              className="-mr-2 p-2 lg:hidden"
              onClick={() => setOpenMenu((v) => !v)}
              aria-label={openMenu ? "Close menu" : "Open menu"}
              aria-expanded={openMenu}
            >
              {openMenu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {openMenu ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[68px] z-40 overflow-y-auto bg-paper lg:hidden"
          >
            <div className="px-6 py-8">
              {serviceGroups.map((group) => (
                <div key={group} className="mb-7">
                  <p className="mb-3 border-b border-line pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    {group}
                  </p>
                  <ul>
                    {servicesByGroup(group).map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="block py-2.5 text-[16px] text-ink"
                        >
                          {s.short}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <ul className="border-t border-line pt-5">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-2.5 text-[16px] font-medium text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">Book a consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={site.phoneHref}>
                    <Phone aria-hidden /> {site.phone}
                  </a>
                </Button>
                <Link
                  href="/ar"
                  lang="ar"
                  dir="rtl"
                  hrefLang="ar"
                  className="font-arabic mt-1 text-center text-[16px] text-ink-soft"
                >
                  تصفّح الموقع بالعربية
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
