"use client"

import { IconGlassFull, IconRecycle } from "@tabler/icons-react"
import { useScrollProgress } from "@/lib/use-scroll-progress"

/** Clamp a sub-range of progress to [0,1]. */
function range(p: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (p - start) / (end - start)))
}
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

export default function AlkalineSection() {
  // The TALL outer section is the scroll track; the inner panel is sticky.
  const { ref, progress } = useScrollProgress<HTMLDivElement>()

  // Two copy phases cross-fade on opposite sides as you scroll.
  const leftIn = easeInOut(range(progress, 0.12, 0.42))
  const rightIn = easeInOut(range(progress, 0.5, 0.82))

  return (
    <section className="bg-[var(--cream-soft)] text-[var(--clay-900)]">
      {/* heading band */}
      <div className="mx-auto max-w-2xl px-6 pt-16 text-center lg:pt-18">
        <h2 className="mt-6 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
          Born
          <span className="text-[var(--clay-600)]"> Alkaline.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[var(--clay-700)]">
          No additives. No chemicals. Just pH 8.0, as nature made it.
        </p>
      </div>

      {/* TALL scroll track — drives the pinned animation */}
      <div ref={ref} className="relative mt-16 h-[260vh]">
        {/* STICKY stage — pinned to the viewport while the track scrolls */}
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* decorative washes */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--sage)]/25 blur-3xl"
          />

          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
            {/* LEFT copy — Still Water */}
            <div
              className="max-w-sm transition-none lg:justify-self-end lg:text-right"
              style={{
                opacity: leftIn,
                transform: `translateX(${(1 - leftIn) * -60}px)`,
              }}
            >
              <span className="inline-flex items-center gap-2 text-[var(--clay-600)] lg:flex-row-reverse">
                <IconGlassFull className="size-5" />
                <span className="text-xs font-semibold tracking-widest uppercase">
                  Still Water · Bottles
                </span>
              </span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                New Brunswick
              </h3>
              <p className="mt-2 text-base leading-relaxed text-[var(--clay-700)]">
                pH 8.0. Mineral-rich glass bottles, sourced from untouched
                springs and bottled at the source.
              </p>
            </div>

            {/* CENTER slot — invisible anchor the FlyingBottle lands on. */}
            <div className="justify-self-center">
              <div
                id="bottle-end"
                aria-hidden
                className="relative aspect-[3/5] w-52 sm:w-60 lg:w-72"
              >
                {/* faint resting wash so the center isn't bare pre-arrival */}
                <div className="absolute inset-x-6 top-10 bottom-10 rounded-full bg-[var(--sage)]/15 blur-2xl" />
              </div>
            </div>

            {/* RIGHT copy — Sparkling Water */}
            <div
              className="max-w-sm lg:justify-self-start lg:text-left"
              style={{
                opacity: rightIn,
                transform: `translateX(${(1 - rightIn) * 60}px)`,
              }}
            >
              <span className="inline-flex items-center gap-2 text-[var(--clay-600)]">
                <IconRecycle className="size-5" />
                <span className="text-xs font-semibold tracking-widest uppercase">
                  Sparkling · Cans
                </span>
              </span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Ontario
              </h3>
              <p className="mt-2 text-base leading-relaxed text-[var(--clay-700)]">
                Naturally carbonated and finished in recyclable cans — the same
                pure source, with a little sparkle.
              </p>
            </div>
          </div>

          {/* progress hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium tracking-widest text-[var(--clay-600)] uppercase">
            Still &amp; Sparkling
          </div>
        </div>
      </div>
    </section>
  )
}
