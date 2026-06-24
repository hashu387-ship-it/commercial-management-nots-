import { motion } from 'framer-motion'
import { ArrowDown, BookOpen, Building2, Layers, Sparkles } from 'lucide-react'
import { COURSE } from '../data/content'
import AiPhoto from './AiPhoto'
import { DoodleArrow } from './art/Doodles'
import type { SectionId } from '../types'

const stats = [
  { value: '2', label: 'Parts · Pre & Post', color: '#9E875D' },
  { value: '10', label: 'Core Stages', color: '#7C8C5A' },
  { value: '18', label: 'Flashcards', color: '#E0A23B' },
  { value: '10', label: 'Quiz Questions', color: '#D9694C' },
]

export default function Hero({ onJump }: { onJump: (id: SectionId) => void }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left — copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-coral/15 px-4 py-2 font-note text-sm font-bold tracking-wide text-rust lg:mx-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {COURSE.programme}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-balance text-5xl font-black leading-[1.05] text-charcoal sm:text-6xl"
          >
            Commercial Management
            <span className="mt-2 block font-hand text-6xl text-gradient-bronze sm:text-7xl">in Construction</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-charcoal-400 lg:mx-0"
          >
            {COURSE.subtitle}. Go from <span className="marker font-semibold">securing the intended profit</span> to{' '}
            <span className="marker marker-sage font-semibold">enhancing it</span> — across the whole project life-cycle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
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
              <Layers className="h-4 w-4 text-bronze-700" /> Flashcards
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-charcoal-400 lg:justify-start"
          >
            <Building2 className="h-4 w-4 text-bronze-700" />
            <span>
              Curated from the notes of <span className="font-semibold text-charcoal">{COURSE.author}</span>
            </span>
          </motion.div>
        </div>

        {/* Right — illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <AiPhoto
            src="/ai/hero.jpg"
            alt="A quantity surveyor's desk with rolled blueprints, a bronze hard hat, calculator and coffee"
            caption="secure it. then grow it."
            rotate={1.5}
          />
          <DoodleArrow className="absolute -bottom-8 -left-10 hidden h-12 w-24 -rotate-12 lg:block" color="#7C8C5A" />
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="absolute inset-x-0 bottom-6 mx-auto hidden max-w-3xl grid-cols-4 gap-3 px-5 lg:grid"
      >
        {stats.map((s) => (
          <div key={s.label} className="neo rounded-2xl px-4 py-3 text-center">
            <div className="font-hand text-3xl font-black" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-[0.68rem] font-semibold uppercase tracking-wide text-charcoal-400">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
