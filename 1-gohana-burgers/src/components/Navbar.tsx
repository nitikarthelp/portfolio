/**
 * Floating pill navbar shell. Rename BRAND, fill links per project.
 */
const LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-line shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <a href="#hero" className="font-[family-name:var(--font-display)] font-semibold px-4 text-step-0">
        BRAND
      </a>
      <div className="hidden md:flex items-center">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="px-4 py-2 text-step--1 text-muted hover:text-ink rounded-full transition-colors duration-300"
            style={{ transitionTimingFunction: 'var(--ease-out-strong)' }}
          >
            {l.label}
          </a>
        ))}
      </div>
      <a
        href="#contact"
        className="bg-ink text-paper text-step--1 font-medium px-5 py-2.5 rounded-full active:scale-[0.97] transition-transform duration-200"
      >
        Get started
      </a>
    </nav>
  )
}
