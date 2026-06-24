import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Building2, GitCompareArrows, ListChecks, Quote } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { BulletList, Pills, Reveal } from '../components/ui'
import LectureNotes from '../components/LectureNotes'
import { COMPETENCY_AIQS, COMPETENCY_MAPPING, COMPETENCY_RICS, SECTION_NARRATION } from '../data/content'

type View = 'rics' | 'aiqs' | 'mapping'

const VIEWS = [
  { id: 'rics', label: 'RICS Competencies', icon: ListChecks },
  { id: 'aiqs', label: 'AIQS Framework', icon: Building2 },
  { id: 'mapping', label: 'MRICS vs MAIQS', icon: GitCompareArrows },
] as const

export default function CompetencySection() {
  const [view, setView] = useState<View>('rics')
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = VIEWS.findIndex((v) => v.id === view)
    let next = i
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % VIEWS.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + VIEWS.length) % VIEWS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = VIEWS.length - 1
    else return
    e.preventDefault()
    setView(VIEWS[next].id)
    btnRefs.current[next]?.focus()
  }

  return (
    <Section id="competency">
      <SectionHeading
        kicker="About the Competency"
        title="RICS & AIQS Alignment"
        description="Commercial management of construction works sits at the heart of both the MRICS and MAIQS pathways."
        narration={{ id: 'competency', text: SECTION_NARRATION.competency }}
      />

      {/* View switch */}
      <div className="mb-9 flex justify-center">
        <div role="tablist" aria-label="Competency view" onKeyDown={onKeyDown} className="glass flex gap-1.5 rounded-2xl p-1.5">
          {VIEWS.map((opt, i) => {
            const isActive = view === opt.id
            return (
              <button
                key={opt.id}
                ref={(el) => (btnRefs.current[i] = el)}
                role="tab"
                id={`comp-tab-${opt.id}`}
                aria-selected={isActive}
                aria-controls={`comp-panel-${opt.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setView(opt.id)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  isActive ? 'text-cream' : 'text-charcoal-500 hover:text-bronze-700'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="comp-pill"
                    className="absolute inset-0 rounded-xl bg-bronze-500 shadow-bronze"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <opt.icon className="h-4 w-4" aria-hidden />
                  {opt.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'rics' && (
          <motion.div
            key="rics"
            role="tabpanel"
            id="comp-panel-rics"
            aria-labelledby="comp-tab-rics"
            tabIndex={0}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 lg:grid-cols-3"
          >
            {/* Mandatory */}
            <div className="glass rounded-3xl p-6">
              <h3 className="mb-4 font-display text-xl font-bold text-charcoal">Mandatory</h3>
              <div className="space-y-4">
                {Object.entries(COMPETENCY_RICS.mandatory).map(([level, items]) => (
                  <div key={level}>
                    <span className="chip bg-bronze-500/15 text-bronze-700">{level}</span>
                    <ul className="mt-2 space-y-1.5">
                      {items.map((it) => (
                        <li key={it} className="flex gap-2 text-sm leading-snug text-charcoal-600">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze-400" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Core */}
            <div className="glass rounded-3xl p-6 ring-1 ring-bronze-300/50">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-charcoal">Core</h3>
                <span className="chip bg-bronze-500 text-cream">Level 3</span>
              </div>
              <BulletList items={COMPETENCY_RICS.core} />
            </div>

            {/* Optional */}
            <div className="glass rounded-3xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-charcoal">Optional</h3>
                <span className="chip glass-tan text-bronze-700">Two to Level 2</span>
              </div>
              <Pills items={COMPETENCY_RICS.optional} />
            </div>
          </motion.div>
        )}

        {view === 'aiqs' && (
          <motion.div
            key="aiqs"
            role="tabpanel"
            id="comp-panel-aiqs"
            aria-labelledby="comp-tab-aiqs"
            tabIndex={0}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-5 rounded-2xl bg-tan/60 p-4 text-center text-sm leading-relaxed text-charcoal-600">
              {COMPETENCY_AIQS.intro}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {COMPETENCY_AIQS.groups.map((g) => (
                <div key={g.title} className="glass rounded-3xl p-5" style={{ borderTop: `4px solid ${g.color}` }}>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold leading-tight text-charcoal">{g.title}</h3>
                  </div>
                  <span
                    className="chip mb-3 font-note font-bold"
                    style={{ backgroundColor: `${g.color}22`, color: g.color }}
                  >
                    {g.tag}
                  </span>
                  <ul className="space-y-1.5">
                    {g.units.map((u) => {
                      const star = u.includes('★')
                      return (
                        <li
                          key={u}
                          className={`flex gap-2 text-[0.82rem] leading-snug ${
                            star ? 'font-bold text-coral' : 'text-charcoal-600'
                          }`}
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: g.color }} />
                          {u}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center font-note text-sm text-charcoal-400">
              Plus the cross-cutting <span className="font-bold text-bronze-700">General</span> and{' '}
              <span className="font-bold text-bronze-700">Soft Skills</span> competencies. ★ = the
              Commercial Management unit covered by this programme.
            </p>
          </motion.div>
        )}

        {view === 'mapping' && (
          <motion.div
            key="mapping"
            role="tabpanel"
            id="comp-panel-mapping"
            aria-labelledby="comp-tab-mapping"
            tabIndex={0}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            <div className="glass rounded-3xl p-7">
              <h3 className="mb-5 font-display text-xl font-bold text-charcoal">MRICS pathway</h3>
              <ol className="space-y-2">
                {COMPETENCY_MAPPING.mrics.map((m, i) => (
                  <li
                    key={m}
                    className={`flex items-center gap-3 rounded-2xl p-3 text-sm font-medium ${
                      m.includes('Commercial Management')
                        ? 'bg-bronze-500/15 text-bronze-700'
                        : 'bg-white/40 text-charcoal-600'
                    }`}
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-charcoal/10 text-xs font-bold text-charcoal-500">
                      {i + 1}
                    </span>
                    {m}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                Supporting competencies
              </p>
              <div className="mt-2">
                <Pills items={COMPETENCY_MAPPING.mricsSupport} />
              </div>
            </div>

            <div className="glass rounded-3xl p-7">
              <h3 className="mb-5 font-display text-xl font-bold text-charcoal">MAIQS pathway</h3>
              <ol className="space-y-2">
                {COMPETENCY_MAPPING.maiqs.map((m, i) => (
                  <li
                    key={m}
                    className="flex items-center gap-3 rounded-2xl bg-white/40 p-3 text-sm font-medium text-charcoal-600"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-charcoal/10 text-xs font-bold text-charcoal-500">
                      {i + 1}
                    </span>
                    {m}
                  </li>
                ))}
              </ol>
              <div className="mt-5 rounded-2xl bg-tan/60 p-4 text-sm leading-relaxed text-charcoal-500">
                {COMPETENCY_MAPPING.note}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary quote */}
      <Reveal delay={0.1} className="mt-6">
        <div className="glass-dark relative overflow-hidden rounded-3xl p-7 sm:p-9">
          <Quote className="absolute -right-2 -top-2 h-24 w-24 text-cream/5" />
          <p className="relative max-w-3xl text-balance text-base leading-relaxed text-cream/90 sm:text-lg">
            {COMPETENCY_RICS.summary}
          </p>
          <div className="relative mt-5 space-y-2">
            {COMPETENCY_RICS.guidance.map((g, i) => (
              <p key={i} className="flex gap-2 text-sm text-bronze-100">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-300" />
                {g}
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      <LectureNotes id="competency" />
    </Section>
  )
}
