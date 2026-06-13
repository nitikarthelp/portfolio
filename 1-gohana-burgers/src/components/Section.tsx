import type { ReactNode } from 'react'

/**
 * Standard section shell: consistent max-width + vertical rhythm.
 * py-24/md:py-32 keeps the 8px grid (96px / 128px).
 */
export function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">{children}</div>
    </section>
  )
}
