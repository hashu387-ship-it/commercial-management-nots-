import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Filter } from 'lucide-react'
import Flashcard from './Flashcard'
import { FLASHCARDS } from '../data/content'

export default function FlashcardDeck() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(FLASHCARDS.map((c) => c.category)))],
    [],
  )
  const [filter, setFilter] = useState('All')
  const [flipped, setFlipped] = useState<Set<string>>(new Set())

  const cards = useMemo(
    () => (filter === 'All' ? FLASHCARDS : FLASHCARDS.filter((c) => c.category === filter)),
    [filter],
  )

  const toggle = (id: string) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const reviewed = FLASHCARDS.filter((c) => flipped.has(c.id)).length

  return (
    <div>
      {/* Controls */}
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="glass flex flex-wrap items-center justify-center gap-1.5 rounded-2xl p-1.5">
          <span className="grid h-9 w-9 place-items-center text-bronze-600">
            <Filter className="h-4 w-4" />
          </span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors duration-300 ${
                filter === c ? 'bg-bronze-500 text-cream shadow-bronze' : 'text-charcoal-500 hover:text-bronze-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="flex items-center gap-2 text-sm text-charcoal-400">
          <Check className="h-4 w-4 text-bronze-600" />
          <span>
            <span className="font-bold text-bronze-700">{reviewed}</span> of {FLASHCARDS.length} terms revealed
          </span>
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            layout
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
          >
            <Flashcard card={card} flipped={flipped.has(card.id)} onFlip={() => toggle(card.id)} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
