import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[14px] font-semibold tracking-[0.01em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-clay text-white hover:bg-clay-dark active:translate-y-px shadow-[0_1px_2px_rgba(18,22,26,0.16)]",
        ink: "bg-ink text-paper hover:bg-deep active:translate-y-px",
        outline:
          "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-paper-2",
        onDark:
          "bg-paper text-ink hover:bg-white active:translate-y-px",
        outlineDark:
          "border border-white/25 text-paper hover:border-white/60 hover:bg-white/5",
        ghost: "text-ink hover:bg-paper-2",
        link: "text-clay underline underline-offset-4 hover:text-clay-dark",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
