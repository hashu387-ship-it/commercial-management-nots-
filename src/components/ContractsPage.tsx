import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Scale, ChevronDown, GitCompareArrows } from 'lucide-react'
import RadialHub from './contracts/RadialHub'
import StudyCards from './contracts/StudyCards'
import { CONTRACTS_COURSE, BRANCHES, KEY_CLAUSES, VAR_VS_CLAIM } from '../data/contracts'

/* Standalone page for the second subject — opened in its own tab via
   ?view=contracts. A distinct "legal blueprint" design + a radial mind map. */

function TopicCard({
  label,
  clause,
  points,
  color,
  open,
  onToggle,
}: {
  label: string
  clause?: string
  points: string[]
  color: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="ledger overflow-hidden" style={{ ['--edge' as string]: color }}>
      <button onClick={onToggle} className="flex w-full items-center gap-3 px-4 py-3 text-left">
        <span className="flex-1 font-clay text-[0.98rem] font-bold text-charcoal">{label}</span>
        {clause && (
          <span className="clause rounded-md px-2 py-0.5 text-[0.68rem] font-bold text-cream" style={{ backgroundColor: color }}>
            {clause}
          </span>
        )}
        <ChevronDown className={`h-4 w-4 shrink-0 text-charcoal-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="space-y-1.5 px-4 pb-3.5"
          >
            {points.map((p, i) => (
              <li key={i} className="flex gap-2 text-[0.86rem] leading-snug text-charcoal-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                <span>{p}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContractsPage() {
  const [active, setActive] = useState<string>('practice')
  const [openTopic, setOpenTopic] = useState(0)
  const branch = BRANCHES.find((b) => b.id === active) ?? BRANCHES[0]

  const select = (id: string) => {
    setActive(id)
    setOpenTopic(0)
  }

  return (
    <div className="blueprint clay-ui min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-charcoal-900/70 backdrop-blur">
        <div className="mx-auto flex w-[min(80rem,calc(100%-1.5rem))] items-center justify-between gap-3 py-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-note text-sm font-bold text-cream/90 transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" /> Study guide
          </a>
          <span className="inline-flex items-center gap-2 font-clay text-sm font-bold text-cream/90 sm:text-base">
            <Scale className="h-4 w-4 text-sky" /> Contract Practice &amp; Administration
          </span>
          <span className="clause hidden rounded-full border border-sky/30 px-3 py-1 text-[0.66rem] font-bold text-sky sm:block">
            FIDIC 1999
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-[min(80rem,calc(100%-1.5rem))] pb-4 pt-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="clause inline-block rounded-full border border-sky/30 bg-sky/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sky"
        >
          Subject 02 · New
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-fun mx-auto mt-4 max-w-3xl text-balance text-4xl font-black leading-[1.05] text-cream sm:text-6xl"
        >
          {CONTRACTS_COURSE.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-4 max-w-2xl text-balance font-note text-base leading-relaxed text-cream/70"
        >
          {CONTRACTS_COURSE.intro}
        </motion.p>
      </section>

      {/* Radial mind map + detail */}
      <section className="mx-auto grid w-[min(80rem,calc(100%-1.5rem))] items-start gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="blue-glass p-4 sm:p-6">
          <RadialHub active={active} onSelect={select} />
        </div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="h-9 w-1.5 rounded-full" style={{ backgroundColor: branch.color }} />
                <div>
                  <h2 className="font-fun text-2xl font-black text-cream">{branch.label}</h2>
                  <p className="font-note text-sm text-cream/60">{branch.blurb}</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {branch.topics.map((t, i) => (
                  <TopicCard
                    key={t.label}
                    label={t.label}
                    clause={t.clause}
                    points={t.points}
                    color={branch.color}
                    open={openTopic === i}
                    onToggle={() => setOpenTopic(openTopic === i ? -1 : i)}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Study cards — every note in the swipeable notebook format */}
      <section className="mx-auto w-[min(80rem,calc(100%-1.5rem))] py-10">
        <div className="mb-5 text-center">
          <h3 className="font-fun text-2xl font-black text-cream sm:text-3xl">Study cards</h3>
          <p className="mx-auto mt-1 max-w-md font-note text-sm text-cream/60">
            Flip through every note like a spiral notebook — swipe, or use the arrows / arrow keys.
          </p>
        </div>
        <StudyCards />
      </section>

      {/* Key clause map */}
      <section className="mx-auto w-[min(80rem,calc(100%-1.5rem))] py-8">
        <h3 className="mb-4 flex items-center gap-2 font-clay text-lg font-bold text-cream">
          <span className="clause text-sky">§</span> Know these clauses cold
        </h3>
        <div className="flex flex-wrap gap-2">
          {KEY_CLAUSES.map((k, i) => (
            <motion.span
              key={k.c}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5"
            >
              <span className="clause rounded-md bg-sky px-1.5 py-0.5 text-[0.72rem] font-bold text-charcoal-900">{k.c}</span>
              <span className="font-note text-xs font-semibold text-cream/80">{k.t}</span>
            </motion.span>
          ))}
        </div>
      </section>

      {/* Variation vs Claim */}
      <section className="mx-auto w-[min(80rem,calc(100%-1.5rem))] py-8">
        <h3 className="mb-4 flex items-center gap-2 font-clay text-lg font-bold text-cream">
          <GitCompareArrows className="h-5 w-5 text-amber" /> Variation vs Claim
        </h3>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-2 text-center font-clay text-sm font-bold">
            <div className="bg-sky/20 py-2.5 text-cream">Variation</div>
            <div className="bg-amber/20 py-2.5 text-cream">Claim</div>
          </div>
          {VAR_VS_CLAIM.map((row, i) => (
            <div key={i} className="grid grid-cols-2 border-t border-white/8">
              <div className="border-r border-white/8 px-4 py-3 text-sm text-cream/80">{row.a}</div>
              <div className="px-4 py-3 text-sm text-cream/80">{row.b}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto w-[min(80rem,calc(100%-1.5rem))] border-t border-white/5 py-8 text-center font-note text-xs text-cream/45">
        {CONTRACTS_COURSE.subtitle} · curated from the notes of {CONTRACTS_COURSE.author}
      </footer>
    </div>
  )
}
