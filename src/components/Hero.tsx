import { motion } from 'framer-motion'
import { ArrowDown, BookOpen, Building2, Layers, Sparkles } from 'lucide-react'
import { COURSE } from '../data/content'
import type { SectionId } from '../types'

const stats = [
  { value: '2', label: 'Parts · Pre & Post' },
  { value: '10', label: 'Core Stages' },
  { value: '18', label: 'Flashcards' },
  { value: '10', label: 'Quiz Questions' },
]

export default function Hero({ onJump }: { onJump: (id: SectionId) => void }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-28 pb-16">
      <div className="mx-auto w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full glass-tan px-4 py-2 text-xs font-semibold tracking-wide text-bronze-700"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {COURSE.programme}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-balance font-display text-5xl font-black leading-[1.05] text-charcoal sm:text-6xl lg:text-7xl"
        >
          Commercial Management
          <span className="mt-2 block text-gradient-bronze">in Construction</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-charcoal-400"
        >
          {COURSE.subtitle}. Move from securing the intended profit to enhancing it — across the entire
          pre-contract and post-contract life-cycle.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => onJump('overview')}
            className="group inline-flex items-center gap-2 rounded-full bg-bronze-500 px-7 py-3.5 font-semibold text-cream shadow-bronze transition-transform duration-300 hover:-translate-y-0.5"
          >
            <BookOpen className="h-4 w-4" /> Start learning
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
          <button
            onClick={() => onJump('flashcards')}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white/40 px-7 py-3.5 font-semibold text-charcoal backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glass"
          >
            <Layers className="h-4 w-4 text-bronze-600" /> Jump to flashcards
          </button>
        </motion.div>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-charcoal-400"
        >
          <Building2 className="h-4 w-4 text-bronze-600" />
          <span>
            Curated from the notes of <span className="font-semibold text-charcoal">{COURSE.author}</span>
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="neo rounded-3xl px-4 py-5">
              <div className="font-display text-3xl font-black text-bronze-600">{s.value}</div>
              <div className="mt-1 text-[0.72rem] font-semibold uppercase tracking-wide text-charcoal-400">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-bronze-500"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.div>
    </section>
  )
}
