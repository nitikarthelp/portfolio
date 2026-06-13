import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll-reveal for everything matching `.reveal` inside the ref.
 * Elements start hidden via the `.reveal` class (see index.css),
 * so they are never stuck invisible if JS fails — gsap.to, not gsap.from.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [ref])
}
