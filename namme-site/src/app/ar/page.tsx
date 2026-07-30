import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { FaqSection } from "@/components/faq-section";
import { ContactChannels } from "@/components/contact-channels";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/whatsapp-button";
import { areas } from "@/content/areas";
import { ar } from "@/content/ar";
import { site } from "@/content/site";

const SERVICE_IMAGE = [
  "/images/service-group-building-work.svg",
  "/images/service-group-outside.svg",
  "/images/service-group-inside.svg",
];

export default function ArabicPage() {
  return (
    <>
      {/* Language bar — always offer the way back to the primary language */}
      <div className="border-b border-line bg-deep px-6 text-paper">
        <div className="mx-auto flex h-11 max-w-[1240px] items-center justify-between text-[13px]">
          <p className="text-white/60">نتحدث العربية · English is our main site</p>
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold transition-colors hover:text-clay-light"
          >
            {ar.nav.switchToEnglish}
            <ArrowLeft className="size-3.5 rotate-180" aria-hidden />
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-paper px-6 pb-16 pt-14 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <p className="eyebrow">{ar.hero.eyebrow}</p>
            <h1 className="mt-5 text-balance text-[40px] font-bold leading-[1.25] tracking-normal sm:text-[52px]">
              {ar.hero.title}
            </h1>
            <p className="mt-7 max-w-xl text-[18px] leading-[1.9] text-ink-soft">
              {ar.hero.lead}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href="#contact">{ar.hero.ctaPrimary}</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={site.phoneHref} dir="ltr">
                  <Phone aria-hidden /> {site.phone}
                </a>
              </Button>
              <WhatsAppLink variant="button" label="واتساب" className="h-13" />
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-line pt-7">
              <p className="text-[14px] text-ink-soft">{ar.hero.trustQuote}</p>
              <div className="h-4 w-px bg-line" aria-hidden />
              <p className="text-[14px] text-ink-soft">{ar.hero.trustSmallJobs}</p>
              <div className="hidden h-4 w-px bg-line sm:block" aria-hidden />
              <p className="text-[14px] text-ink-soft">{ar.hero.trustArea}</p>
            </div>
          </div>

          <div className="relative aspect-[16/11] overflow-hidden bg-paper-2">
            <Image
              src="/images/hero.svg"
              alt="رسم توضيحي لمنزل مع توسعة خلفية بطابق واحد ونوافذ سقفية وواجهة زجاجية كاملة"
              fill
              sizes="(max-width: 1024px) 100vw, 620px"
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Arabic-speaking welcome — the reason this page exists */}
      <section className="bg-clay px-6 py-16 text-white lg:py-20">
        <Reveal className="mx-auto max-w-[1240px]">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-white/70">
            {ar.arabicWelcome.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl text-[30px] font-bold leading-[1.35] sm:text-[36px]">
            {ar.arabicWelcome.title}
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-[1.9] text-white/85">
            {ar.arabicWelcome.body}
          </p>
        </Reveal>
      </section>

      {/* Services */}
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{ar.services.eyebrow}</p>
            <h2 className="mt-3 text-[34px] font-bold leading-[1.3] sm:text-[42px]">
              {ar.services.title}
            </h2>
            <p className="mt-5 text-[17px] leading-[1.9] text-ink-soft">
              {ar.services.lead}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {ar.services.items.map((s, i) => (
              <Reveal key={s.title} as="article" delay={i * 0.07} className="group">
                <Link href={s.href} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                    <Image
                      src={SERVICE_IMAGE[i]}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-6 text-[22px] font-bold transition-colors group-hover:text-clay">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-[1.85] text-ink-soft">
                    {s.body}
                  </p>
                  <p className="mt-5 border-t border-line pt-4 text-[14px] text-ink-muted">
                    <span dir="ltr">{s.price}</span> · {s.duration}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-deep px-6 py-20 text-paper lg:py-28">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{ar.process.eyebrow}</p>
            <h2 className="mt-3 text-[34px] font-bold leading-[1.3] sm:text-[42px]">
              {ar.process.title}
            </h2>
            <p className="mt-5 text-[17px] leading-[1.9] text-white/60">
              {ar.process.lead}
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-x-8 gap-y-10 lg:grid-cols-5">
            {ar.process.steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.step}
                delay={i * 0.06}
                className="border-t border-white/15 pt-7"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="numeral text-[30px] leading-none text-clay" dir="ltr">
                    {step.step}
                  </span>
                  <span className="text-[12px] text-white/40">{step.duration}</span>
                </div>
                <h3 className="mt-5 text-[19px] font-bold">{step.title}</h3>
                <p className="mt-3 text-[14.5px] leading-[1.85] text-white/55">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Promises */}
      <section className="bg-paper-2 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{ar.promises.eyebrow}</p>
            <h2 className="mt-3 text-[34px] font-bold leading-[1.3] sm:text-[42px]">
              {ar.promises.title}
            </h2>
            <p className="mt-5 text-[17px] leading-[1.9] text-ink-soft">
              {ar.promises.lead}
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {ar.promises.items.map((d, i) => (
              <Reveal as="li" key={d.title} delay={(i % 3) * 0.06}>
                <ShieldCheck className="size-5 text-clay" aria-hidden />
                <h3 className="mt-4 text-[18px] font-bold">{d.title}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.85] text-ink-soft">
                  {d.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Areas */}
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{ar.areas.eyebrow}</p>
            <h2 className="mt-3 text-[34px] font-bold leading-[1.3] sm:text-[42px]">
              {ar.areas.title}
            </h2>
            <p className="mt-5 text-[17px] leading-[1.9] text-ink-soft">
              {ar.areas.lead}
            </p>
          </Reveal>

          <Reveal>
            <ul className="grid grid-cols-2 gap-px border border-line bg-line">
              {areas.map((a) => (
                <li key={a.slug} className="bg-paper">
                  <Link
                    href={`/areas/${a.slug}`}
                    className="group block px-6 py-5 transition-colors hover:bg-paper-2"
                  >
                    <p className="text-[16px] font-medium transition-colors group-hover:text-clay">
                      {a.name}
                    </p>
                    <p className="mt-1 text-[13px] text-ink-muted" dir="ltr">
                      {a.postcodes.slice(0, 4).join(" · ")}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper-2 px-6 py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{ar.faq.eyebrow}</p>
            <h2 className="mt-3 text-[34px] font-bold leading-[1.3] sm:text-[42px]">
              {ar.faq.title}
            </h2>
          </Reveal>
          <div className="[&_p]:leading-[1.9]">
            <FaqSection items={ar.faq.items} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{ar.contact.eyebrow}</p>
            <h2 className="mt-3 text-[34px] font-bold leading-[1.3] sm:text-[42px]">
              {ar.contact.title}
            </h2>
            <p className="mt-5 text-[17px] leading-[1.9] text-ink-soft">
              {ar.contact.lead}
            </p>

            <ul className="mt-9 space-y-5 border-t border-line pt-8">
              <li className="flex gap-4">
                <Phone className="mt-1 size-4 shrink-0 text-clay" aria-hidden />
                <div>
                  <p className="text-[12px] text-ink-muted">{ar.contact.phoneLabel}</p>
                  <a
                    href={site.phoneHref}
                    dir="ltr"
                    className="mt-0.5 block text-[16px] font-medium hover:text-clay"
                  >
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 size-4 shrink-0" aria-hidden />
                <div>
                  <p className="text-[12px] text-ink-muted">واتساب</p>
                  <WhatsAppLink
                    label={site.phone}
                    className="mt-0.5 text-[16px] font-medium"
                  />
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 size-4 shrink-0 text-clay" aria-hidden />
                <div>
                  <p className="text-[12px] text-ink-muted">{ar.contact.emailLabel}</p>
                  <a
                    href={`mailto:${site.email}`}
                    dir="ltr"
                    className="mt-0.5 block text-[16px] font-medium hover:text-clay"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 size-4 shrink-0 text-clay" aria-hidden />
                <div>
                  <p className="text-[12px] text-ink-muted">{ar.contact.addressLabel}</p>
                  <p className="mt-0.5 text-[16px]" dir="ltr">
                    {site.address.city} {site.address.postcode}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 size-4 shrink-0 text-clay" aria-hidden />
                <div>
                  <p className="text-[12px] text-ink-muted">{ar.contact.hoursLabel}</p>
                  <dl className="mt-1 space-y-1 text-[15px]">
                    {ar.contact.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-6 sm:max-w-[260px]">
                        <dt className="text-ink-soft">{h.days}</dt>
                        <dd dir="ltr" className="text-ink">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            </ul>
          </Reveal>

          <div>
            <p className="mb-6 flex items-start gap-3 border-r-2 border-clay bg-paper-2 p-5 text-[15px] leading-[1.85] text-ink-soft">
              <Check className="mt-1 size-4 shrink-0 text-clay" aria-hidden />
              {ar.contact.formNote}
            </p>
            <ContactChannels
              lead={ar.contact.channelsLead}
              whatsappLabel={ar.contact.whatsappLabel}
              callLabel={ar.contact.callLabel}
              emailLabel={ar.contact.emailLabel}
              note={ar.contact.channelsNote}
            />
          </div>
        </div>
      </section>

      {/* Back to English */}
      <section className="border-t border-line bg-paper-2 px-6 py-14">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[15px] leading-[1.9] text-ink-soft">
            {ar.footer.note}
          </p>
          <Button asChild variant="outline" size="lg" className="shrink-0">
            <Link href="/">
              {ar.footer.toEnglish}
              <ArrowLeft className="rotate-180" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
