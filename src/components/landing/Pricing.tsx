import { Check } from "lucide-react";
import { GlassCard } from "@/components/landing/GlassCard";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/Reveal";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    blurb: "Prove the inbox before you wire anything.",
    features: [
      "2 of 8 native channels",
      "1 workspace",
      "Comment-to-DM starter flow",
      "7-day history",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Growth",
    price: "$49",
    cadence: "/seat /mo",
    blurb: "The calm command center for growing teams.",
    features: [
      "All 8 native channels",
      "Likes & comments engine",
      "Team collision lock + CRM",
      "Visual flows",
    ],
    cta: "Get started",
    featured: true,
  },
  {
    name: "Scale",
    price: "Let’s talk",
    cadence: "",
    blurb: "SSO, sandboxes, and a partner who ships with you.",
    features: ["Dedicated success", "Custom webhooks", "SSO / SCIM", "99.99% uptime SLA"],
    cta: "Talk to us",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-16 sm:py-20">
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Pricing</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Start quiet. Scale loud.
        </h2>
        <p className="mt-4 text-sm text-slate-600 sm:text-base">
          Simple glass tiers. No tab-tax. Cancel anytime.
        </p>
      </Reveal>
      <Stagger className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <StaggerItem key={plan.name}>
            <GlassCard
              className={`flex h-full flex-col p-6 sm:p-7 ${plan.featured ? "ring-blue-300/70" : ""}`}
            >
              {plan.featured ? (
                <span className="mb-3 w-fit rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                  Most loved
                </span>
              ) : null}
              <p className="text-sm font-semibold text-slate-500">{plan.name}</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {plan.price}
                <span className="ml-1 text-sm font-medium text-slate-500">{plan.cadence}</span>
              </p>
              <p className="mt-2 text-sm text-slate-600">{plan.blurb}</p>
              <ul className="mt-6 space-y-2.5 text-sm text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-blue-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.featured ? "luminous" : "glass"}
                className="mt-8 h-11 w-full"
                asChild
              >
                <a href="#workspace">{plan.cta}</a>
              </Button>
            </GlassCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
