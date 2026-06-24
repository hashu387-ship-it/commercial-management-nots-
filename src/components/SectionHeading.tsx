import { motion } from 'framer-motion'

interface SectionHeadingProps {
  kicker: string
  title: string
  description?: string
  part?: 1 | 2 | 0
}

const partLabel = (part?: 1 | 2 | 0) =>
  part === 1 ? 'Part 1 · Pre-Contract' : part === 2 ? 'Part 2 · Post-Contract' : null

export default function SectionHeading({ kicker, title, description, part }: SectionHeadingProps) {
  const pl = partLabel(part)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-bronze-400/60" />
        <span className="chip glass-tan text-bronze-700">{kicker}</span>
        <span className="h-px w-8 bg-bronze-400/60" />
      </div>
      <h2 className="text-balance text-4xl font-bold leading-tight text-charcoal sm:text-5xl">
        {title}
      </h2>
      {pl && (
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-bronze-700">{pl}</p>
      )}
      {description && (
        <p className="mt-5 text-balance text-base leading-relaxed text-charcoal-400 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}
