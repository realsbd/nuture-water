"use client"

import { useState } from "react"
import Image from "next/image"
import { IconStarFilled, IconArrowRight, IconX } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Products", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
]

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="relative min-h-svh overflow-hidden bg-[var(--cream)] text-[var(--clay-900)]">
      {/* soft decorative wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-[var(--sage)]/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-32 h-[32rem] w-[32rem] rounded-full bg-[var(--clay-300)]/40 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col px-6 lg:px-10">
        {/* ---------- NAV ---------- */}
        <header className="flex items-center justify-between py-6">
          <a href="#" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-[var(--clay-600)] text-sm font-semibold text-[var(--cream)]">
              N
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Nurture
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[var(--clay-700)] transition-colors hover:text-[var(--clay-900)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button className="hidden h-10 rounded-full bg-[var(--clay-700)] px-5 text-[var(--cream)] hover:bg-[var(--clay-900)] md:inline-flex">
              Shop Now
            </Button>

            {/* hamburger */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-full border border-[var(--clay-300)] text-[var(--clay-800)] transition-colors hover:bg-[var(--clay-100)] md:hidden"
            >
              {menuOpen ? (
                <IconX className="size-5" />
              ) : (
                <span className="flex flex-col gap-[5px]">
                  <span className="h-0.5 w-5 rounded-full bg-current" />
                  <span className="h-0.5 w-5 rounded-full bg-current" />
                </span>
              )}
            </button>
          </div>
        </header>

        {/* mobile menu */}
        {menuOpen && (
          <div className="rounded-2xl border border-[var(--clay-200)] bg-[var(--cream-soft)] p-4 md:hidden">
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--clay-700)] transition-colors hover:bg-[var(--clay-100)]"
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-2 h-10 rounded-full bg-[var(--clay-700)] text-[var(--cream)] hover:bg-[var(--clay-900)]">
                Shop Now
              </Button>
            </nav>
          </div>
        )}

        {/* ---------- HERO ---------- */}
        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-2 lg:gap-6 lg:py-16">
          {/* left: copy */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--clay-300)] bg-[var(--cream-soft)] px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--clay-700)] uppercase">
              <span className="size-1.5 rounded-full bg-[var(--clay-600)]" />
              100% Natural Spring Water
            </span>

            <h1 className="mt-6 text-5xl leading-[1.05] font-semibold tracking-tight text-[var(--clay-900)] sm:text-6xl lg:text-7xl">
              Pure hydration,
              <span className="block text-[var(--clay-600)]">
                rooted in nature.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--clay-700)]">
              Sourced from untouched springs and bottled with care, Nurture
              delivers crisp, mineral-rich water that nourishes your body the
              way nature intended.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button className="group h-12 rounded-full bg-[var(--clay-700)] px-7 text-base text-[var(--cream)] hover:bg-[var(--clay-900)]">
                Explore Products
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-full border-[var(--clay-300)] bg-transparent px-7 text-base text-[var(--clay-800)] hover:bg-[var(--clay-100)]"
              >
                Learn More
              </Button>
            </div>

            {/* rating / social proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {["/can1.jpeg", "/can2.jpeg", "/1.png"].map((src, i) => (
                  <span
                    key={i}
                    className="size-10 overflow-hidden rounded-full border-2 border-[var(--cream)] bg-[var(--clay-100)]"
                  >
                    <Image
                      src={src}
                      alt=""
                      width={40}
                      height={40}
                      className="size-full object-cover"
                    />
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-[var(--clay-600)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStarFilled key={i} className="size-3.5" />
                  ))}
                </div>
                <p className="mt-0.5 text-sm text-[var(--clay-700)]">
                  Loved by 12,000+ customers
                </p>
              </div>
            </div>
          </div>

          {/* right: imagery */}
          <div className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] ">
              {/* invisible anchor — the FlyingBottle fills this slot visually.
                  The m-8 inset matches the old image's p-8 padding so the
                  bottle starts at the same size users saw before. */}
              <div id="bottle-start" aria-hidden className="absolute inset-0 m-8" />
            </div>

            {/* floating product card */}
            <div className="absolute -bottom-5 -left-2 flex items-center gap-3 rounded-2xl border border-[var(--clay-200)] bg-[var(--cream-soft)]/95 p-3 pr-5 shadow-xl backdrop-blur-sm sm:-left-6">
              <span className="size-14 overflow-hidden rounded-xl bg-[var(--clay-100)]">
                <Image
                  src="/can1.jpeg"
                  alt=""
                  width={56}
                  height={56}
                  className="size-full object-cover"
                />
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--clay-900)]">
                  Spring Reserve
                </p>
                <p className="text-xs text-[var(--clay-600)]">
                  From $4.50 / bottle
                </p>
              </div>
            </div>

            {/* floating stat badge */}
            <div className="absolute -top-3 right-2 rounded-2xl border border-[var(--clay-200)] bg-[var(--cream-soft)]/95 px-4 py-3 text-center shadow-xl backdrop-blur-sm sm:right-0">
              <p className="text-2xl font-semibold text-[var(--clay-700)]">
                0.0
              </p>
              <p className="text-[11px] tracking-wide text-[var(--clay-600)] uppercase">
                Additives
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
