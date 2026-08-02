import { Mail, Phone } from "lucide-react";

import { WhatsAppLink } from "@/components/whatsapp-button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * How to reach us, in place of an enquiry form.
 *
 * The form is gone deliberately. For a builder whose number is a mobile, a
 * photograph of the actual job on WhatsApp is worth more than eight form fields
 * describing it — and unlike a form, nothing can silently fail to arrive.
 *
 * Labels are overridable so the Arabic page can pass its own without a second
 * copy of this component.
 */
export function ContactChannels({
  className,
  lead = "Send a photograph of the job on WhatsApp and we’ll come back with a price or a time to come and look. It’s the quickest way to reach us, and usually the easiest way to explain the work.",
  whatsappLabel = "Message us on WhatsApp",
  callLabel = "Call",
  emailLabel = "Email",
  note = "Messages come to us, not to an office. We reply the same day where we can — Monday to Thursday and at weekends. Closed Fridays.",
  dir,
}: {
  className?: string;
  lead?: string;
  whatsappLabel?: string;
  callLabel?: string;
  emailLabel?: string;
  note?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div
      dir={dir}
      className={cn("border border-line bg-paper-2 p-8 lg:p-10", className)}
    >
      <p className="text-[17px] leading-[1.7] text-ink-soft">{lead}</p>

      <div className="mt-8 flex flex-col gap-3">
        <WhatsAppLink
          variant="button"
          label={whatsappLabel}
          className="h-14 w-full border-[#25D366] text-[16px]"
        />

        <a
          href={site.phoneHref}
          className="inline-flex h-14 w-full items-center justify-center gap-2.5 border border-line-strong px-8 text-[16px] font-semibold transition-colors hover:border-ink"
        >
          <Phone className="size-4.5 shrink-0 text-clay" aria-hidden />
          {callLabel} {site.phone}
        </a>

        <a
          href={`mailto:${site.email}`}
          className="inline-flex h-14 w-full items-center justify-center gap-2.5 border border-line px-8 text-[15px] transition-colors hover:border-ink"
        >
          <Mail className="size-4.5 shrink-0 text-clay" aria-hidden />
          {emailLabel} {site.email}
        </a>
      </div>

      <p className="mt-7 border-t border-line pt-6 text-[14px] leading-[1.7] text-ink-muted">
        {note}
      </p>
    </div>
  );
}
