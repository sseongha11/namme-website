import { cn } from "@/lib/utils";

/**
 * Naeem mark.
 *
 * The monogram is an N whose diagonal doubles as a roof pitch: two posts, an
 * apex, and the diagonal stroke that makes it read as a letter rather than a
 * house pictogram. It survives at 20px, which is where most logos fail.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      {/* posts + apex */}
      <path
        d="M6 34.5V15.2L20 5.5L34 15.2V34.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      {/* the diagonal that makes it an N */}
      <path
        d="M6 15.2L34 34.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Logo({
  className,
  showTagline = false,
  markClassName,
}: {
  className?: string;
  showTagline?: boolean;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("h-7 w-7 text-clay", markClassName)} />
      <span className="flex flex-col leading-none">
        <span className="text-[19px] font-semibold uppercase tracking-[0.16em]">
          Naeem
        </span>
        {showTagline ? (
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-ink-muted">
            General building · Derby
          </span>
        ) : null}
      </span>
    </span>
  );
}
