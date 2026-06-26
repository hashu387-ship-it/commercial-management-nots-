import { motion } from 'framer-motion'
import { DoodleStar, DoodleUnderline } from './art/Doodles'
import ListenButton from './ListenButton'

interface SectionHeadingProps {
  kicker: string
  title: string
  description?: string
  part?: 1 | 2 | 0
  /** Override the auto colour. Otherwise an accent is picked per-section. */
  accent?: string
  /** When provided, renders a "Listen" control that narrates this section. */
  narration?: { id: string; text: string }
}

const partLabel = (part?: 1 | 2 | 0) =>
  part === 1 ? 'Part 1 · Pre-Contract' : part === 2 ? 'Part 2 · Post-Contract' : null

// Full accent palette (no teal/cyan) cycled across sections for a lively,
// multi-colour journey down the page.
const ACCENTS = ['#D9694C', '#E0A23B', '#7C8C5A', '#5B7DA6', '#8A6491', '#C46B86', '#B25B3E', '#D98324']
const STAR = ['#E0A23B', '#D9694C', '#7C8C5A', '#5B7DA6', '#8A6491', '#C46B86']

function pick<T>(arr: T[], key: string): T {
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return arr[h % arr.length]
}

export default function SectionHeading({ kicker, title, description, part, accent, narration }: SectionHeadingProps) {
  const pl = partLabel(part)
  const hue = accent ?? pick(ACCENTS, title)
  const star = pick(STAR, kicker)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <div className="mb-3 flex items-center justify-center gap-2">
        <DoodleStar className="h-5 w-5" color={star} />
        <span className="font-hand text-2xl font-bold" style={{ color: hue }}>{kicker}</span>
        <DoodleStar className="h-5 w-5" color={star} />
      </div>
      <div className="relative inline-block">
        <h2 className="text-balance text-4xl font-bold leading-tight text-charcoal sm:text-5xl">{title}</h2>
        <DoodleUnderline className="absolute -bottom-3 left-0 h-3 w-full" color={hue} />
      </div>
      {pl && (
        <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.2em]" style={{ color: hue }}>{pl}</p>
      )}
      {description && (
        <p className="mt-5 text-balance text-base leading-relaxed text-charcoal-400 sm:text-lg">
          {description}
        </p>
      )}
      {narration && (
        <div className="mt-6 flex justify-center">
          <ListenButton id={narration.id} text={narration.text} />
        </div>
      )}
    </motion.div>
  )
}
