import { motion } from 'framer-motion'
import { RotateCw, Sparkles } from 'lucide-react'
import type { Flashcard as FlashcardType } from '../types'

interface FlashcardProps {
  card: FlashcardType
  flipped: boolean
  onFlip: () => void
}

/** A single 3D-flipping definition card. */
export default function Flashcard({ card, flipped, onFlip }: FlashcardProps) {
  return (
    <div className="perspective h-64 w-full">
      <motion.button
        type="button"
        onClick={onFlip}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `${card.term}. Definition: ${card.definition}. Click to flip back.`
            : `Flashcard: ${card.term}. Click to reveal the definition.`
        }
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="preserve-3d relative h-full w-full cursor-pointer rounded-3xl text-left"
      >
        {/* Front */}
        <div
          aria-hidden={flipped}
          className="backface-hidden glass liquid-sheen absolute inset-0 flex flex-col justify-between rounded-3xl p-6"
        >
          <div className="flex items-center justify-between">
            <span className="chip bg-bronze-500/15 text-bronze-700">{card.category}</span>
            <Sparkles className="h-4 w-4 text-bronze-400" />
          </div>
          <h4 className="font-display text-2xl font-bold leading-tight text-charcoal">{card.term}</h4>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-bronze-700">
            <RotateCw className="h-3.5 w-3.5" /> Tap to reveal
          </span>
        </div>

        {/* Back */}
        <div
          aria-hidden={!flipped}
          className="backface-hidden rotate-y-180 glass-dark absolute inset-0 flex flex-col justify-between rounded-3xl p-6"
        >
          <span className="chip bg-cream/15 text-cream/80">{card.term}</span>
          <p className="text-sm leading-relaxed text-cream/95">{card.definition}</p>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-bronze-200">
            <RotateCw className="h-3.5 w-3.5" /> Tap to flip back
          </span>
        </div>
      </motion.button>
    </div>
  )
}
