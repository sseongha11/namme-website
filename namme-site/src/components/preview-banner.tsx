import { AlertTriangle } from "lucide-react";

import { isPreview } from "@/lib/site-status";

/**
 * Work-in-progress notice. Renders only while the site is in preview mode, and
 * disappears on its own once NEXT_PUBLIC_SITE_STATUS=live is set.
 *
 * It states plainly that the figures, reviews and accreditations on the page
 * are placeholders. That matters: this is a real trading business with a real
 * phone number on the page, and anyone who reaches it should know what they're
 * looking at.
 */
export function PreviewBanner() {
  if (!isPreview) return null;

  return (
    <div className="bg-amber-300 px-6 py-2.5 text-ink">
      <div className="mx-auto flex max-w-[1240px] items-start gap-3 text-[13px] leading-[1.5]">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
        <p>
          <strong className="font-semibold">Preview — not the live site.</strong>{" "}
          Review scores, project case studies, testimonials and accreditations on
          these pages are placeholders for layout purposes and are not yet
          verified. Please don’t rely on them.
        </p>
      </div>
    </div>
  );
}
