import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
  ═══════════════════════════════════════════════════════════════
   GOHANA BURGERS — full-bleed frame-sequence hero explosion
   240 photoreal frames on a full-screen <canvas>; scroll scrubs
   the explosion. Ingredient callouts reveal as it detonates.
  ═══════════════════════════════════════════════════════════════
*/

const FRAME_COUNT = 240
const framePath = (i: number) => `/frames/f_${String(i).padStart(3, '0')}.jpg`

// ingredient callouts — name, which side, vertical position, when to appear (0-1)
const INGREDIENTS = [
  { name: 'Premium Sesame Bun', side: 'left',  top: '14%', at: 0.45 },
  { name: 'Grilled Onions',     side: 'right', top: '26%', at: 0.52 },
  { name: 'Aged Cheddar',       side: 'left',  top: '40%', at: 0.59 },
  { name: 'Flame-Grilled Patty',side: 'right', top: '50%', at: 0.66 },
  { name: 'Crisp Garden Lettuce',side:'left',  top: '64%', at: 0.73 },
  { name: 'Vine-Ripe Tomato',   side: 'right', top: '72%', at: 0.80 },
  { name: 'Toasted Potato Bun', side: 'left',  top: '84%', at: 0.87 },
]

const NAV = ['Menu', 'Our Story', 'Locations']

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = heroRef.current
    if (!canvas || !hero) return
    const ctx = canvas.getContext('2d')!
    const images: HTMLImageElement[] = []
    const state = { frame: 0 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(canvas.clientWidth * dpr)
      canvas.height = Math.floor(canvas.clientHeight * dpr)
      render()
    }

    // draw current frame with COVER fit (fills the hero, crops overflow)
    const render = () => {
      const img = images[state.frame]
      if (!img || !img.complete || !img.naturalWidth) return
      const cw = canvas.width, ch = canvas.height
      const ir = img.naturalWidth / img.naturalHeight
      const cr = cw / ch
      let dw, dh, dx, dy
      if (cr > ir) { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2 }
      else { dh = ch; dw = ch * ir; dy = 0; dx = (cw - dw) / 2 }
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = framePath(i + 1)
      if (i === 0) img.onload = () => { resize() }
      images.push(img)
    }
    window.addEventListener('resize', resize)

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: '+=3400',   // scroll length of the explosion
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress
        state.frame = Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1)))
        render()
        // fade the title out as it explodes
        if (titleRef.current) titleRef.current.style.opacity = String(gsap.utils.clamp(0, 1, 1 - p * 2.2))
        // reveal ingredient callouts
        labelRefs.current.forEach((el, i) => {
          if (!el) return
          const o = gsap.utils.clamp(0, 1, (p - INGREDIENTS[i].at) / 0.06)
          el.style.opacity = String(o)
          el.style.transform = `translateX(${(1 - o) * (INGREDIENTS[i].side === 'left' ? -24 : 24)}px)`
        })
      },
    })

    return () => { trigger.kill(); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <main className="relative w-full bg-[#0d0a08] text-white overflow-x-hidden">

      {/* ░░░ NAVBAR ░░░ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-gradient-to-b from-black/70 to-transparent">
        <span className="font-[family-name:var(--font-display)] text-step-2 tracking-[0.12em] text-white">
          GOHANA <span className="text-[var(--color-accent)]">BURGERS</span>
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a key={n} href="#menu" className="text-step--1 uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors duration-300">{n}</a>
          ))}
        </div>
        <a href="#book" className="bg-[var(--color-accent)] text-[#0d0a08] text-step--1 font-semibold uppercase tracking-[0.12em] px-6 py-3 rounded-full active:scale-[0.97] transition-transform duration-200 hover:brightness-110">
          Book a Table
        </a>
      </nav>

      {/* ░░░ HERO — full-bleed pinned explosion ░░░ */}
      <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden">
        {/* the burger canvas fills the whole hero */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

        {/* legibility wash */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, rgba(13,10,8,0.55) 100%)' }} />

        {/* TASTE THE EXPLOSION — fades as it detonates */}
        <div ref={titleRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <p className="text-step--1 uppercase tracking-[0.4em] text-[var(--color-accent)] mb-5 font-[family-name:var(--font-mono)]">
            Gohana, Haryana · Since 2026
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,11vw,9rem)] leading-[0.85] tracking-tight"
            style={{ textShadow: '0 8px 40px rgba(0,0,0,0.7)' }}>
            Taste the
            <br /><span className="text-[var(--color-accent)]">Explosion</span>
          </h1>
        </div>

        {/* ingredient callouts — reveal as the burger blows apart */}
        {INGREDIENTS.map((ing, i) => (
          <div
            key={ing.name}
            ref={(el) => { labelRefs.current[i] = el }}
            className={`absolute z-20 opacity-0 flex items-center gap-3 ${ing.side === 'left' ? 'left-[4%] md:left-[7%]' : 'right-[4%] md:right-[7%] flex-row-reverse'}`}
            style={{ top: ing.top }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0" style={{ boxShadow: '0 0 12px var(--color-accent)' }} />
            <span className={`hidden sm:block h-px w-10 md:w-16 bg-gradient-to-r ${ing.side === 'left' ? 'from-[var(--color-accent)] to-transparent' : 'from-transparent to-[var(--color-accent)]'}`} />
            <span className={`font-[family-name:var(--font-display)] text-step-2 md:text-step-3 tracking-tight whitespace-nowrap ${ing.side === 'right' ? 'text-right' : ''}`}
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
              {ing.name}
            </span>
          </div>
        ))}

        {/* bottom bar: book a table + scroll hint */}
        <div className="absolute bottom-7 left-0 right-0 z-20 flex flex-col items-center gap-4">
          <a href="#book" className="md:hidden bg-[var(--color-accent)] text-[#0d0a08] text-step-0 font-semibold uppercase tracking-[0.1em] px-8 py-3.5 rounded-full active:scale-[0.97]">
            Book a Table
          </a>
          <span className="text-step--1 uppercase tracking-[0.3em] text-white/45 font-[family-name:var(--font-mono)] animate-pulse">Scroll to detonate</span>
        </div>
      </section>

      {/* ░░░ MENU ░░░ */}
      <section id="menu" className="relative py-28 md:py-36 px-6">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-step--1 uppercase tracking-[0.35em] text-[var(--color-accent)] mb-4 text-center font-[family-name:var(--font-mono)]">The line-up</p>
          <h2 className="font-[family-name:var(--font-display)] text-step-6 md:text-step-7 tracking-tight text-center mb-16 leading-[0.9]">Signature Stacks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: 'The Gohana Classic', d: 'Double flame-grilled patty, aged cheddar, grilled onions, potato bun.', p: '₹249' },
              { n: 'Smoke & Fire', d: 'Smoked patty, jalapeño, chipotle mayo, crisp lettuce, vine tomato.', p: '₹299' },
              { n: 'The Big Detonator', d: 'Triple patty, triple cheese, caramelised onion, secret sauce.', p: '₹379' },
            ].map((item) => (
              <div key={item.n} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:border-[var(--color-accent)]/40 transition-colors duration-500">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="font-[family-name:var(--font-display)] text-step-3 tracking-tight">{item.n}</h3>
                  <span className="text-[var(--color-accent)] font-semibold text-step-1">{item.p}</span>
                </div>
                <p className="text-step-0 text-white/55 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ░░░ BOOK A TABLE ░░░ */}
      <section id="book" className="relative py-32 md:py-44 px-6 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,107,43,0.16) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <h2 className="relative font-[family-name:var(--font-display)] text-step-6 md:text-step-7 tracking-tight mb-6 leading-[0.9]">
          Bring your <span className="text-[var(--color-accent)]">appetite.</span>
        </h2>
        <p className="relative text-step-1 text-white/55 max-w-[40ch] mx-auto mb-10 leading-relaxed">
          Walk-ins welcome, but the good tables go fast. Reserve yours.
        </p>
        <a href="#" className="relative inline-flex items-center gap-3 bg-[var(--color-accent)] text-[#0d0a08] text-step-1 font-bold uppercase tracking-[0.1em] px-12 py-5 rounded-full active:scale-[0.97] transition-transform duration-200 hover:brightness-110">
          Book a Table
        </a>
        <p className="relative mt-16 text-step--1 text-white/30 font-[family-name:var(--font-mono)]">© 2026 Gohana Burgers · Gohana, Haryana</p>
      </section>
    </main>
  )
}
