import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";

import { FaqSection } from "@/components/faq-section";
import { PageHeader } from "@/components/page-header";
import { QuoteForm } from "@/components/quote-form";
import { WhatsAppLink } from "@/components/whatsapp-button";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { faqs, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact — get a free, no-obligation quote",
  description: `Talk to ${site.name} about your job, large or small. Free visit and a written, no-obligation quote across Derby and Derbyshire.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what needs doing."
        lead="A free visit, a proper look at the job and a written quote with no obligation. We read every enquiry ourselves and reply within one working day."
        trail={[{ label: "Contact" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <Phone className="mt-1 size-4 shrink-0 text-clay" aria-hidden />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      Phone
                    </p>
                    <a
                      href={site.phoneHref}
                      className="mt-1 block text-[17px] font-medium transition-colors hover:text-clay"
                    >
                      {site.phone}
                    </a>
                    <p className="mt-1 text-[13.5px] text-ink-muted">
                      Quickest if the job is urgent
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="mt-1 size-4 shrink-0" aria-hidden />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      WhatsApp
                    </p>
                    <WhatsAppLink
                      label={site.phone}
                      className="mt-1 text-[17px] font-medium"
                    />
                    <p className="mt-1 text-[13.5px] text-ink-muted">
                      Send photos of the job — often the fastest way to start
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <Mail className="mt-1 size-4 shrink-0 text-clay" aria-hidden />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      Email
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-1 block text-[17px] font-medium transition-colors hover:text-clay"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <MapPin className="mt-1 size-4 shrink-0 text-clay" aria-hidden />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      Based in
                    </p>
                    <p className="mt-1 text-[16px] leading-relaxed">
                      {site.address.city} {site.address.postcode}
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <Clock className="mt-1 size-4 shrink-0 text-clay" aria-hidden />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      Hours
                    </p>
                    <dl className="mt-2 space-y-1.5 text-[14.5px]">
                      {site.hours.map((h) => (
                        <div key={h.days} className="flex justify-between gap-6 sm:max-w-[240px]">
                          <dt className="text-ink-soft">{h.days}</dt>
                          <dd>{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>

                <li className="flex gap-4 border-t border-line pt-6">
                  <MessageSquare className="mt-1 size-4 shrink-0 text-clay" aria-hidden />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      نتحدث العربية
                    </p>
                    <p className="mt-1.5 text-[14.5px] leading-[1.65] text-ink-soft">
                      We speak Arabic. You’re welcome to call, email or fill in this
                      form in Arabic —{" "}
                      <Link
                        href="/ar"
                        className="text-clay underline underline-offset-4"
                      >
                        الصفحة بالعربية
                      </Link>
                      .
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>

          <QuoteForm />
        </div>
      </Section>

      <Section tone="paper-2">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Before you ask"
            title="The questions we get most."
          />
          <FaqSection items={faqs} />
        </div>
      </Section>
    </>
  );
}
