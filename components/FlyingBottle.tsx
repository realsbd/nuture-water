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

function rectOf(id: string): Box | null {
  const el = document.getElementById(id)
  if (!el) return null
  const r = el.getBoundingClientRect()
  return { left: r.left, top: r.top, width: r.width, height: r.height }
}

/**
 * A single fixed bottle that flies from the hero's right slot (#bottle-start)
 * to the Alkaline section's center (#bottle-end) as the page scrolls.
 *
 * It reads both anchors' live rects each frame and lerps its own
 * position + size between them, so it stays correct on every screen size
 * with no hard-coded coordinates. Under reduced motion it simply rests on
 * the end anchor.
 */
export default function FlyingBottle() {
  const { scrollY, viewportH, reduceMotion } = usePageScroll()
  const [box, setBox] = useState<Box | null>(null)
  const [flair, setFlair] = useState({ rotate: 0, scale: 1, lift: 0 })

  useEffect(() => {
    const start = rectOf("bottle-start")
    const end = rectOf("bottle-end")
    if (!start || !end) {
      setBox(null)
      return
    }

    // Reduced motion: park on the end anchor, no flight.
    if (reduceMotion) {
      setBox(end)
      setFlair({ rotate: 0, scale: 1, lift: 0 })
      return
    }

    // Convert the anchors' viewport rects into absolute document positions
    // so the flight is anchored to page scroll, not the current scroll frame.
    const startDocTop = start.top + scrollY
    const endDocTop = end.top + scrollY

    // Handoff window: begin once the hero slot has scrolled up by ~25% of the
    // viewport, finish as the end anchor settles near the viewport center.
    const flightStart = startDocTop - viewportH * 0.25
    const flightEnd = endDocTop - viewportH * 0.5
    const t = easeInOut(range(scrollY, flightStart, flightEnd))

    setBox({
      left: lerp(start.left, end.left, t),
      top: lerp(start.top, end.top, t),
      width: lerp(start.width, end.width, t),
      height: lerp(start.height, end.height, t),
    })

    // Mid-flight flourish — peaks near t = 0.5, settles at both ends.
    const arc = Math.sin(t * Math.PI)
    setFlair({
      rotate: (t - 0.5) * 12,
      scale: 1 + arc * 0.06,
      lift: arc * -18,
    })
  }, [scrollY, viewportH, reduceMotion])

  if (!box) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-20"
      style={{
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        transform: `translateY(${flair.lift}px) rotate(${flair.rotate}deg) scale(${flair.scale})`,
        willChange: "transform",
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
  )
}
