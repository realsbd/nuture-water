"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Tracks how far a target element has scrolled through the viewport.
 *
 * Returns a value in [0, 1]:
 *   0  -> the element's top edge has just reached the bottom of the viewport
 *   1  -> the element's bottom edge has just left the top of the viewport
 *
 * The reading is rAF-throttled so it stays smooth for scroll-linked motion,
 * and it respects prefers-reduced-motion by snapping to the resting state.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduceMotion) {
      setProgress(0.5)
      return
    }

    let frame = 0

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // distance scrolled from "entering bottom" to "leaving top"
      const total = rect.height + vh
      const scrolled = vh - rect.top
      const next = Math.min(1, Math.max(0, scrolled / total))
      setProgress(next)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return { ref, progress }
}

/**
 * Tracks raw page scroll position and viewport height for whole-page,
 * scroll-linked motion that spans multiple sections.
 *
 * Returns:
 *   scrollY     -> current window.scrollY
 *   viewportH   -> current window.innerHeight
 *   reduceMotion-> true when the user prefers reduced motion
 *
 * Readings are rAF-throttled. SSR-safe: state starts at 0 so the first
 * paint matches the server, then real values are read in the effect.
 */
export function usePageScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [viewportH, setViewportH] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)

    let frame = 0

    const update = () => {
      frame = 0
      setScrollY(window.scrollY)
      setViewportH(window.innerHeight)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    const onMotionChange = () => setReduceMotion(mq.matches)

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    mq.addEventListener("change", onMotionChange)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      mq.removeEventListener("change", onMotionChange)
    }
  }, [])

  return { scrollY, viewportH, reduceMotion }
}
