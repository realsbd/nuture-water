"use client"

import { IconCheck, IconArrowRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

type Plan = {
  /** Anchor id the FlyingBottle lands on for this card. */
  anchor: string
  badge: string
  name: string
  price: string
  cadence: string
  note: string
  features: string[]
  cta: string
  featured?: boolean
}

const PLANS: Plan[] = [
  {
    anchor: "bottle-pricing-0",
    badge: "Weekly",
    name: "Fresh Weekly",
    price: "$9",
    cadence: "/week",
    note: "A case delivered every week — easy in, easy out.",
    features: ["6 bottles / week", "Free doorstep delivery", "Pause or skip anytime"],
    cta: "Get started",
  },
  {
    anchor: "bottle-pricing-1",
    badge: "Monthly",
    name: "Steady Monthly",
    price: "$29",
    cadence: "/month",
    note: "Our most popular plan — stocked up and stress-free.",
    features: ["28 bottles / month", "Priority delivery windows", "Cancel anytime"],
    cta: "Get started",
    featured: true,
  },
  {
    anchor: "bottle-pricing-2",
    badge: "Yearly",
    name: "Year of Nurture",
    price: "$290",
    cadence: "/year",
    note: "Best value — save ~17% versus paying monthly.",
    features: ["Full year, fully stocked", "Save ~17% per bottle", "Cancel anytime"],
    cta: "Get started",
  },
]

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[var(--cream)] text-[var(--clay-900)]"
    >
      {/* soft decorative wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[var(--sage)]/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 lg:px-10 lg:pt-24">
        {/* heading band */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--clay-300)] bg-[var(--cream-soft)] px-4 py-1.5 text-xs font-medium tracking-widest text-[var(--clay-700)] uppercase">
            <span className="size-1.5 rounded-full bg-[var(--clay-600)]" />
            Pricing
          </span>
          <h2 className="mt-6 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
            Never
            <span className="text-[var(--clay-600)]"> run out.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[var(--clay-700)]">
            Pure alkaline hydration on your schedule. Cancel anytime.
          </p>
        </div>

        {/* plan cards */}
        <div className="mt-16 grid grid-cols-1 items-end gap-6 lg:grid-cols-3 lg:gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.anchor}
              className={[
                "relative flex flex-col rounded-3xl border p-7 transition-shadow",
                plan.featured
                  ? "border-[var(--clay-600)] bg-[var(--cream-soft)] shadow-xl lg:-mt-4 lg:pb-10"
                  : "border-[var(--clay-200)] bg-[var(--cream-soft)]/80 shadow-sm",
              ].join(" ")}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--clay-700)] px-4 py-1 text-[11px] font-semibold tracking-widest text-[var(--cream)] uppercase">
                  Most popular
                </span>
              )}

              {/* bottle landing slot — the FlyingBottle settles here as artwork */}
              <div className="mb-2 flex justify-center">
                <div
                  id={plan.anchor}
                  aria-hidden
                  className="relative aspect-[3/5] w-24 sm:w-28"
                >
                  {/* faint resting wash so the slot isn't bare pre-arrival */}
                  <div className="absolute inset-x-3 top-6 bottom-6 rounded-full bg-[var(--sage)]/20 blur-xl" />
                </div>
              </div>

              <span className="text-xs font-semibold tracking-widest text-[var(--clay-600)] uppercase">
                {plan.badge}
              </span>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-sm font-medium text-[var(--clay-600)]">
                  {plan.cadence}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--clay-700)]">
                {plan.note}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-[var(--clay-800)]"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[var(--sage)]/40 text-[var(--clay-800)]">
                      <IconCheck className="size-3.5" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={[
                  "group mt-8 h-12 rounded-full text-base",
                  plan.featured
                    ? "bg-[var(--clay-700)] text-[var(--cream)] hover:bg-[var(--clay-900)]"
                    : "border border-[var(--clay-300)] bg-transparent text-[var(--clay-800)] hover:bg-[var(--clay-100)]",
                ].join(" ")}
              >
                {plan.cta}
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
