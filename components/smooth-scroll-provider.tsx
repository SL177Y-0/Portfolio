"use client"

import { useEffect, type PropsWithChildren } from "react"
import Lenis from "lenis"

export default function SmoothScrollProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.08,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      gestureOrientation: "vertical",
    })

    // Safely attach to window and clean up on unmount.
    // @ts-ignore
    ;(window as any).__lenis = lenis

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      // @ts-ignore
      lenis.destroy?.()
      // @ts-ignore
      if ((window as any).__lenis === lenis) {
        // @ts-ignore
        delete (window as any).__lenis
      }
    }
  }, [])

  return children
}
