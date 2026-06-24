import type { ReactNode } from 'react'
import type { SectionId } from '../types'

interface SectionProps {
  id: SectionId
  children: ReactNode
  className?: string
}

/** Anchored section wrapper with consistent vertical rhythm. */
export default function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`section-anchor scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  )
}
