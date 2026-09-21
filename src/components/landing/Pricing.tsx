import { Check, Sparkles } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const frost =
  "bg-white/80 backdrop-blur-xl border border-white/90 shadow-lg ring-1 ring-inset ring-white/90";

const plans = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    blurb: "Prove the inbox before you connect a single account.",
    features: [
      "Two social channels",
      "1 workspace",
      "Comment-to-DM automations",
      "7-day conversation history",
      "Community support",
    ],
    cta: "Start free",
    featured: false,
    footnote: "No credit card required",
  },
  {
    name: "Growth",
    price: "$49",
    cadence: "/seat /mo",
    blurb: "The command center for teams that live in customer conversations.",
    features: [
      "Every channel included",
      "Likes & comments engine",
      "Collision lock + team CRM",
      "Visual automations",
      "Priority support",
    ],
    cta: "Get started",
    featured: true,
    footnote: "Most teams start here",
  },
  {
    name: "Scale",
    price: "Let’s talk",
    cadence: "",
    blurb: "Security, a dedicated partner, and a workspace built for larger orgs.",
    features: [
      "Everything in Growth",
      "Dedicated success partner",
      "Custom channel automations",
      "SSO & team sign-on",
      "99.99% uptime guarantee",
    ],
    cta: "Talk to us",
    featured: false,
    footnote: "Custom onboarding included",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative mx-auto max-w-6xl scroll-mt-28 px-5 py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-10 -z-10 flex justify-center" aria-hidden>
        <div className="h-56 w-[36rem] rounded-full bg-blue-300/25 blur-[90px]" />
      </div>

      <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Pricing</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Simple plans for growing inboxes.
        </h2>
        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
          Start free. Add seats when conversations pick up. Stay in one workspace — cancel anytime.
        </p>
      </Reveal>

      <Stagger className="grid items-stretch gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
        {plans.map((plan) => (
          <StaggerItem key={plan.name} className={plan.featured ? "md:-mt-3 md:mb-0" : ""}>
            <article
              className={cn(
                frost,
                "relative flex h-full flex-col overflow-hidden rounded-[1.65rem] p-6 sm:p-7",
                plan.featured
                  ? "border-blue-200/80 bg-white/95 shadow-[0_28px_70px_-28px_rgba(37,99,235,0.45)] ring-blue-200/80 md:p-8"
                  : "shadow-slate-900/5",
              )}
            >
              {plan.featured ? (
                <>
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-blue-400/20 blur-3xl"
                    aria-hidden
                  />
                </>
              ) : null}

              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-[13px] font-bold tracking-wide text-slate-500">{plan.name}</p>
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-1.5">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-950">
                      {plan.price}
                    </span>
                    {plan.cadence ? (
                      <span className="text-sm font-medium text-slate-500">{plan.cadence}</span>
                    ) : null}
                  </div>
                </div>
                {plan.featured ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm shadow-blue-600/30">
                    <Sparkles className="size-3" />
                    Most popular
                  </span>
                ) : null}
              </div>

              <p className="relative mt-3 text-sm leading-6 text-slate-600">{plan.blurb}</p>

              <div className="relative my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <ul className="relative flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span
                      className={cn(
                        "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                        plan.featured ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600",
                      )}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.featured ? "luminous" : "glass"}
                className={cn(
                  "relative mt-8 h-12 w-full rounded-full text-[15px] font-semibold",
                  plan.featured
                    ? "hover:scale-100 active:scale-100"
                    : cn(frost, "text-slate-800 hover:translate-y-0"),
                )}
                asChild
              >
                <a href="#workspace">{plan.cta}</a>
              </Button>
              <p className="relative mt-3 text-center text-[11px] font-medium text-slate-400">
                {plan.footnote}
              </p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <p className="mt-10 flex flex-col items-center gap-1.5 text-center text-[12px] font-medium text-slate-500 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-0 sm:gap-y-1">
        <span>
          <span className="text-emerald-600">✓</span> No credit card required on Starter
        </span>
        <span className="hidden px-2 text-slate-300 sm:inline">•</span>
        <span>Cancel anytime</span>
        <span className="hidden px-2 text-slate-300 sm:inline">•</span>
        <span>Official Meta Integration</span>
      </p>
    </section>
  );
}
