import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  // @ts-ignore
  const lenis = (window as any).__lenis
  if (lenis?.scrollTo) {
    lenis.scrollTo(el, {
      offset: -10,
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    })
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}
