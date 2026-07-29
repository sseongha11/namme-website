"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  BUDGETS,
  PROJECT_TYPES,
  TIMELINES,
  enquirySchema,
  type EnquiryInput,
} from "@/lib/enquiry-schema";
import { cn } from "@/lib/utils";

const field =
  "h-12 w-full border border-line-strong bg-paper px-4 text-[15px] text-ink transition-colors placeholder:text-ink-muted focus:border-clay focus:outline-none";

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[12.5px] font-semibold uppercase tracking-[0.08em] text-ink-soft"
    >
      {children}
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-[13px] text-clay">{msg}</p>;
}

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      postcode: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
      company: "",
    },
  });

  async function onSubmit(values: EnquiryInput) {
    setFailed(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
    } catch {
      setFailed(
        "Something went wrong sending that. Please call us instead — we’d rather not lose your enquiry to a form.",
      );
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-start border border-line bg-paper p-10"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-clay text-white">
              <Check className="size-6" aria-hidden />
            </span>
            <h3 className="mt-6 text-[24px] font-semibold tracking-[-0.025em]">
              Thanks — that’s with us.
            </h3>
            <p className="mt-3 max-w-md text-[15.5px] leading-[1.7] text-ink-soft">
              We read every enquiry ourselves and reply within one working day. If
              your project is urgent, calling is faster than waiting for us to get
              to the inbox.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={false}
            className={cn(
              "grid gap-5",
              compact ? "sm:grid-cols-2" : "sm:grid-cols-2",
            )}
          >
            <div>
              <Label htmlFor="name">Your name</Label>
              <input id="name" className={field} placeholder="Jane Bennett" {...register("name")} />
              <FieldError msg={errors.name?.message} />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <input
                id="phone"
                type="tel"
                className={field}
                placeholder="07700 900000"
                {...register("phone")}
              />
              <FieldError msg={errors.phone?.message} />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                className={field}
                placeholder="jane@example.com"
                {...register("email")}
              />
              <FieldError msg={errors.email?.message} />
            </div>

            <div>
              <Label htmlFor="postcode">Property postcode</Label>
              <input
                id="postcode"
                className={field}
                placeholder="N16 8AB"
                {...register("postcode")}
              />
              <FieldError msg={errors.postcode?.message} />
            </div>

            <div>
              <Label htmlFor="projectType">Project type</Label>
              <select id="projectType" className={cn(field, "appearance-none")} {...register("projectType")}>
                <option value="">Select…</option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <FieldError msg={errors.projectType?.message} />
            </div>

            <div>
              <Label htmlFor="budget">Budget range</Label>
              <select id="budget" className={cn(field, "appearance-none")} {...register("budget")}>
                <option value="">Select…</option>
                {BUDGETS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              <FieldError msg={errors.budget?.message} />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="timeline">When are you hoping to start?</Label>
              <select id="timeline" className={cn(field, "appearance-none")} {...register("timeline")}>
                <option value="">Select…</option>
                {TIMELINES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <FieldError msg={errors.timeline?.message} />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="message">Tell us about the project</Label>
              <textarea
                id="message"
                rows={5}
                className={cn(field, "h-auto py-3.5 leading-[1.6]")}
                placeholder="What you’re hoping to achieve, anything you already know about the property, whether you have drawings already…"
                {...register("message")}
              />
              <FieldError msg={errors.message?.message} />
            </div>

            {/* Honeypot */}
            <div className="hidden" aria-hidden>
              <label htmlFor="company">Company</label>
              <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
            </div>

            <div className="sm:col-span-2">
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden /> Sending…
                  </>
                ) : (
                  "Send enquiry"
                )}
              </Button>
              <p className="mt-4 text-[13px] leading-relaxed text-ink-muted">
                We reply within one working day. Your details are used only to
                respond to this enquiry — we don’t add you to a mailing list and we
                don’t pass them on.
              </p>
              {failed ? <p className="mt-3 text-[14px] text-clay">{failed}</p> : null}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
