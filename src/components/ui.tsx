import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

/** Reveal-on-scroll wrapper. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Bronze-bulleted list. */
export function BulletList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-charcoal-600">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-500" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

/** Wrapping chip cloud. */
export function Pills({ items, tone = 'tan' }: { items: string[]; tone?: 'tan' | 'bronze' | 'dark' }) {
  const cls =
    tone === 'bronze'
      ? 'bg-bronze-500/15 text-bronze-700'
      : tone === 'dark'
        ? 'glass-dark text-cream/90'
        : 'glass-tan text-charcoal-600'
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it, i) => (
        <span key={i} className={`chip ${cls} transition-transform duration-200 hover:-translate-y-0.5`}>
          {it}
        </span>
      ))}
    </div>
  )
}

/** Glass panel with optional title + icon header. */
export function GlassPanel({
  title,
  children,
  className = '',
  tone = 'glass',
}: {
  title?: ReactNode
  children: ReactNode
  className?: string
  tone?: 'glass' | 'glass-tan' | 'neo'
}) {
  return (
    <div className={`${tone} rounded-3xl p-6 sm:p-7 ${className}`}>
      {title && <div className="mb-4">{title}</div>}
      {children}
    </div>
  )
}
