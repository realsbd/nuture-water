"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { usePageScroll } from "@/lib/use-scroll-progress"

/** Clamp a sub-range of progress to [0,1]. */
function range(p: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (p - start) / (end - start)))
}
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

type Box = { left: number; top: number; width: number; height: number }
type Flair = { rotate: number; scale: number; lift: number; opacity: number }
type Bottle = { box: Box; flair: Flair }

function rectOf(id: string): Box | null {
  const el = document.getElementById(id)
  if (!el) return null
  const r = el.getBoundingClientRect()
  return { left: r.left, top: r.top, width: r.width, height: r.height }
}

function lerpBox(a: Box, b: Box, t: number): Box {
  return {
    left: lerp(a.left, b.left, t),
    top: lerp(a.top, b.top, t),
    width: lerp(a.width, b.width, t),
    height: lerp(a.height, b.height, t),
  }
}

/** Anchor ids the three pricing bottles land on, left → right. */
const PRICING_ANCHORS = ["bottle-pricing-0", "bottle-pricing-1", "bottle-pricing-2"]

/**
 * A fixed bottle that flies from the hero's right slot (#bottle-start) to the
 * Alkaline section's center (#bottle-end) as the page scrolls — then, on the
 * way into the Pricing section, fans into three staggered copies that settle
 * onto the plan cards (#bottle-pricing-0/1/2) and rest there as their artwork.
 *
 * Every position is read live from the anchors' rects each frame and lerped,
 * so the flight stays correct on any screen size with no hard-coded
 * coordinates. Under reduced motion the bottles simply rest on their anchors.
 */
export default function FlyingBottle() {
  const { scrollY, viewportH, reduceMotion } = usePageScroll()
  const [bottles, setBottles] = useState<Bottle[] | null>(null)

  useEffect(() => {
    const start = rectOf("bottle-start")
    const end = rectOf("bottle-end")
    const pricing = PRICING_ANCHORS.map(rectOf)
    if (!start || !end) {
      setBottles(null)
      return
    }

    const havePricing = pricing.every((p): p is Box => p !== null)

    // Reduced motion: park bottles on their final resting anchors, no flight.
    if (reduceMotion) {
      if (havePricing) {
        setBottles(
          (pricing as Box[]).map((box) => ({
            box,
            flair: { rotate: 0, scale: 1, lift: 0, opacity: 1 },
          })),
        )
      } else {
        setBottles([
          { box: end, flair: { rotate: 0, scale: 1, lift: 0, opacity: 1 } },
        ])
      }
      return
    }

    // ---- Phase 1: hero slot → alkaline center -----------------------------
    // Convert the anchors' viewport rects into absolute document positions so
    // the flight is anchored to page scroll, not the current scroll frame.
    const startDocTop = start.top + scrollY
    const endDocTop = end.top + scrollY

    const flightStart = startDocTop - viewportH * 0.25
    const flightEnd = endDocTop - viewportH * 0.5
    const t1 = easeInOut(range(scrollY, flightStart, flightEnd))

    const heroBox = lerpBox(start, end, t1)
    const arc1 = Math.sin(t1 * Math.PI)

    // ---- Phase 2: center → three pricing cards ----------------------------
    // Begins once the first pricing anchor approaches the viewport and finishes
    // as the cards settle near center. Before this window the bottle behaves
    // exactly as the original single-bottle flight.
    let split = 0
    if (havePricing) {
      const cards = pricing as Box[]
      const firstDocTop = cards[0].top + scrollY
      const splitStart = firstDocTop - viewportH * 0.85
      const splitEnd = firstDocTop - viewportH * 0.3
      split = range(scrollY, splitStart, splitEnd)
    }

    // Before the split has any effect, render the single travelling bottle.
    if (!havePricing || split <= 0) {
      setBottles([
        {
          box: heroBox,
          flair: {
            rotate: (t1 - 0.5) * 12,
            scale: 1 + arc1 * 0.06,
            lift: arc1 * -18,
            opacity: 1,
          },
        },
      ])
      return
    }

    // Splitting: fan the bottle out into three, each easing toward its card on
    // a slightly staggered schedule so they peel apart rather than mirror-split.
    const cards = pricing as Box[]
    const next = cards.map((card, i) => {
      // Stagger: outer cards (0 and 2) lead, the centre (1) trails a touch.
      const delay = i === 1 ? 0.12 : 0.04 * i
      const t2 = easeInOut(range(split, delay, 1))
      const box = lerpBox(end, card, t2)
      const arc2 = Math.sin(t2 * Math.PI)
      // Direction the copy fans toward: left card tilts left, right card right.
      const dir = i === 0 ? -1 : i === 2 ? 1 : 0
      return {
        box,
        flair: {
          rotate: dir * arc2 * 10 + (t2 - 0.5) * 4,
          scale: 1 + arc2 * 0.05,
          lift: arc2 * -22,
          // Copies fade in from the parent as they separate; the parent stays
          // fully opaque so there's always a continuous bottle on screen.
          opacity: i === 1 ? 1 : Math.min(1, split * 1.6),
        },
      }
    })
    setBottles(next)
  }, [scrollY, viewportH, reduceMotion])

  if (!bottles) return null

  return (
    <>
      {bottles.map((bottle, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none fixed z-20"
          style={{
            left: bottle.box.left,
            top: bottle.box.top,
            width: bottle.box.width,
            height: bottle.box.height,
            opacity: bottle.flair.opacity,
            transform: `translateY(${bottle.flair.lift}px) rotate(${bottle.flair.rotate}deg) scale(${bottle.flair.scale})`,
            willChange: "transform, opacity",
          }}
        >
          {/* traveling sage glow */}
          <div className="absolute inset-x-6 top-10 bottom-10 rounded-full bg-[var(--sage)]/40 blur-2xl" />
          <Image
            src="/product.png"
            alt=""
            fill
            priority
            className="object-contain drop-shadow-2xl"
            sizes="(max-width: 1024px) 60vw, 28rem"
          />
        </div>
      ))}
    </>
  )
}
