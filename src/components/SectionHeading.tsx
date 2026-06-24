import { motion } from 'framer-motion'
import { DoodleStar, DoodleUnderline } from './art/Doodles'

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
      <div className="mb-3 flex items-center justify-center gap-2">
        <DoodleStar className="h-5 w-5" color="#E0A23B" />
        <span className="font-hand text-2xl font-bold text-coral">{kicker}</span>
        <DoodleStar className="h-5 w-5" color="#E0A23B" />
      </div>
      <div className="relative inline-block">
        <h2 className="text-balance text-4xl font-bold leading-tight text-charcoal sm:text-5xl">{title}</h2>
        <DoodleUnderline className="absolute -bottom-3 left-0 h-3 w-full" color="#9E875D" />
      </div>
      {pl && (
        <p className="mt-5 font-note text-sm font-bold uppercase tracking-[0.2em] text-bronze-700">{pl}</p>
      )}
      {description && (
        <p className="mt-5 text-balance text-base leading-relaxed text-charcoal-400 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}
