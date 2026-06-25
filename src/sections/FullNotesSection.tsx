import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  Sparkles,
} from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { DoodleStar } from '../components/art/Doodles'
import {
  COMPLETE_NOTES,
  COMPLETE_NOTES_INTRO,
  NOTE_DAYS,
} from '../data/completeNotes'
import type { NoteBlock, NotePage, NoteTone } from '../data/completeNotes'

const STORAGE = 'cm-notebook-page-v1'

/* Handwriting "ink" colours per accent (readable on warm + dark paper). */
const INK: Record<NoteTone, string> = {
  tan: 'text-bronze-700',
  sage: 'text-sage',
  coral: 'text-coral',
  sky: 'text-sky',
  plum: 'text-plum',
  amber: 'text-[#A9791F]',
}

const NOTE_STYLE = {
  tip: { Icon: Lightbulb, ink: 'text-sage', border: 'border-sage', marker: 'marker-sage', label: 'tip' },
  example: { Icon: Sparkles, ink: 'text-sky', border: 'border-sky', marker: '', label: 'note' },
  watch: { Icon: AlertTriangle, ink: 'text-coral', border: 'border-coral', marker: 'marker-coral', label: 'watch out' },
  q: { Icon: HelpCircle, ink: 'text-[#A9791F]', border: 'border-[#A9791F]', marker: 'marker', label: 'likely exam question' },
} as const

/* ── Handwritten block renderers (ink on paper) ───────────────── */
function HandList({ items, ink = 'text-bronze-600' }: { items: string[]; ink?: string }) {
  return (
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5 font-note text-[1.05rem] leading-snug text-charcoal-700">
          <span className={`mt-0.5 shrink-0 font-hand text-lg leading-none ${ink}`} aria-hidden>
            ›
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

function Block({ b }: { b: NoteBlock }) {
  switch (b.t) {
    case 'lead':
      return <p className="font-note text-[1.12rem] leading-relaxed text-charcoal-700">{b.text}</p>

    case 'bullets':
      return (
        <div>
          {b.heading && (
            <p className="mb-1.5 font-hand text-2xl font-bold text-bronze-700">{b.heading}</p>
          )}
          <HandList items={b.items} />
        </div>
      )

    case 'cols':
      return (
        <div className={`grid gap-x-7 gap-y-4 ${b.cols.length >= 2 ? 'sm:grid-cols-2' : ''}`}>
          {b.cols.map((c) => {
            const ink = INK[c.tone ?? 'tan']
            return (
              <div key={c.heading} className="border-l-2 border-charcoal-200 pl-3">
                <p className={`mb-1.5 font-hand text-2xl font-bold underline-hand ${ink}`}>{c.heading}</p>
                <HandList items={c.items} ink={ink} />
              </div>
            )
          })}
        </div>
      )

    case 'steps':
      return (
        <div>
          {b.heading && (
            <p className="mb-2 font-hand text-2xl font-bold text-bronze-700">{b.heading}</p>
          )}
          <ol className="space-y-2.5">
            {b.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 -rotate-3 place-items-center rounded-full border-2 border-bronze-500 font-hand text-lg font-bold text-bronze-700">
                  {i + 1}
                </span>
                <span className="pt-1 font-note text-[1.05rem] leading-snug text-charcoal-700">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )

    case 'table':
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-note text-[0.98rem]">
            <thead>
              <tr>
                {b.headers.map((h) => (
                  <th
                    key={h}
                    className="border-2 border-charcoal-300 px-3 py-2 text-left font-hand text-xl font-bold text-bronze-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, ri) => (
                <tr key={ri} className="align-top">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`border-2 border-charcoal-300 px-3 py-2 leading-snug ${
                        ci === 0 ? 'font-bold text-charcoal' : 'text-charcoal-700'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'formula':
      return (
        <div className="-rotate-[0.4deg] rounded-lg border-2 border-charcoal-400 bg-amber/10 p-4">
          <div className="space-y-1.5 font-note text-[1.05rem] leading-relaxed text-charcoal">
            {b.lines.map((l, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {l}
              </p>
            ))}
          </div>
          {b.caption && <p className="mt-2.5 font-hand text-lg text-coral">{b.caption}</p>}
        </div>
      )

    case 'note': {
      const s = NOTE_STYLE[b.tone]
      return (
        <div className={`border-l-[3px] pl-3.5 ${s.border}`}>
          <p className={`mb-0.5 flex items-center gap-1.5 font-hand text-xl font-bold ${s.ink}`}>
            <s.Icon className="h-4 w-4" aria-hidden />
            <span className={s.marker}>{b.title ?? s.label}</span>
          </p>
          <p className="font-note text-[1.02rem] leading-snug text-charcoal-700">{b.text}</p>
        </div>
      )
    }

    case 'define':
      return (
        <div>
          <p className="font-hand text-2xl font-bold text-bronze-700 underline-hand">{b.term}</p>
          <p className="mt-1.5 font-note text-[1.05rem] leading-relaxed text-charcoal-700">{b.text}</p>
        </div>
      )

    case 'pills':
      return (
        <div className="flex flex-wrap gap-x-3 gap-y-1 font-note text-[1.02rem] text-charcoal-700">
          {b.items.map((it, i) => (
            <span key={i} className="after:ml-3 after:text-bronze-300 after:content-['·'] last:after:content-['']">
              {it}
            </span>
          ))}
        </div>
      )

    default:
      return null
  }
}

/* ── A single notebook page (ink on ruled paper) ──────────────── */
function PageBody({ p }: { p: NotePage }) {
  if (p.milestone) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <DoodleStar className="mb-3 h-10 w-10" color="#9E875D" />
        <p className="font-hand text-2xl font-bold text-coral">{p.phase}</p>
        <h4 className="mt-1 font-hand text-4xl font-bold text-charcoal underline-hand">{p.title}</h4>
        {p.blocks.map((b, i) => (
          <p key={i} className="mt-5 max-w-md font-note text-[1.05rem] leading-relaxed text-charcoal-600">
            {b.t === 'lead' ? b.text : ''}
          </p>
        ))}
        <DoodleStar className="mt-5 h-6 w-6" color="#E0A23B" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col pl-12 pr-6">
      {/* page header */}
      <div className="mb-3 flex items-start justify-between gap-3 pt-1">
        <p className="font-hand text-xl font-bold text-coral">{p.phase}</p>
        <div className="flex shrink-0 flex-col items-end">
          <span className="-rotate-2 font-hand text-xl font-bold text-sky">{p.page}</span>
          {p.exam && (
            <span className="mt-1 grid h-8 w-8 -rotate-6 place-items-center rounded-full border-2 border-coral font-hand text-base font-bold text-coral">
              Q
            </span>
          )}
        </div>
      </div>
      <h4 className="mb-4 font-hand text-3xl font-bold leading-tight text-charcoal underline-hand sm:text-4xl">
        {p.title}
      </h4>

      <div className="space-y-4 pb-2">
        {p.blocks.map((b, i) => (
          <Block key={i} b={b} />
        ))}
      </div>
    </div>
  )
}

const variants = {
  enter: (d: number) => (d > 0 ? { rotateY: 0, opacity: 0, scale: 0.95 } : { rotateY: -160, opacity: 1 }),
  center: { rotateY: 0, opacity: 1, scale: 1 },
  exit: (d: number) => (d > 0 ? { rotateY: -160, opacity: 1 } : { rotateY: 0, opacity: 0, scale: 0.95 }),
}

function Notebook() {
  const total = COMPLETE_NOTES.length
  const [page, setPage] = useState(() => {
    const n = Number(localStorage.getItem(STORAGE))
    return Number.isFinite(n) && n >= 0 && n < total ? n : 0
  })
  const [dir, setDir] = useState(1)
  const touchX = useRef<number | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, String(page))
    } catch {
      /* ignore */
    }
  }, [page])

  const go = useCallback(
    (to: number, d: number) => {
      const n = Math.max(0, Math.min(total - 1, to))
      setPage((c) => {
        if (n === c) return c
        setDir(d)
        return n
      })
    },
    [total],
  )
  const next = useCallback(() => go(page + 1, 1), [go, page])
  const prev = useCallback(() => go(page - 1, -1), [go, page])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.changedTouches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 55) (dx < 0 ? next : prev)()
    touchX.current = null
  }

  const p = COMPLETE_NOTES[page]
  const firstOf = (d: number) => COMPLETE_NOTES.findIndex((x) => x.day === d)

  return (
    <div className="mx-auto max-w-2xl">
      {/* chapter (day) tabs */}
      <div className="mb-5 flex justify-center gap-2">
        {NOTE_DAYS.map((d) => {
          const idx = firstOf(d.day)
          const activeChapter = p.day === d.day
          return (
            <button
              key={d.day}
              onClick={() => go(idx, idx > page ? 1 : -1)}
              className={`chip font-note font-bold transition-transform duration-200 hover:-translate-y-0.5 ${
                activeChapter ? 'bg-bronze-500 text-cream' : 'glass-tan text-charcoal-600'
              }`}
            >
              Day {d.day}
            </button>
          )
        })}
      </div>

      {/* the book */}
      <div
        className="perspective relative outline-none"
        tabIndex={0}
        role="group"
        aria-roledescription="notebook"
        aria-label={`Lecture notes page ${page + 1} of ${total}`}
        onKeyDown={onKey}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* book thickness — stacked edges behind the page */}
        <div className="absolute inset-y-3 -right-1.5 -z-10 w-3 rounded-r-xl bg-bronze-200/60 shadow-glass" aria-hidden />
        <div className="absolute inset-y-1.5 -right-0.5 -z-10 w-2 rounded-r-xl bg-cream shadow-glass" aria-hidden />

        <div className="relative min-h-[68vh] sm:min-h-[32rem]">
          <AnimatePresence custom={dir} mode="popLayout" initial={false}>
            <motion.article
              key={p.id}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              className="ruled-paper page-curl absolute inset-0 overflow-y-auto rounded-l-md rounded-r-xl border border-bronze-200/70 py-5 shadow-glass-lg"
            >
              {/* binding holes + margin line */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-9 flex-col justify-around py-6" aria-hidden>
                {Array.from({ length: 11 }).map((_, i) => (
                  <span key={i} className="mx-auto h-3 w-3 rounded-full bg-charcoal/12 shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]" />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-10 w-px bg-coral/40" aria-hidden />
              {/* spine shadow */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/10 to-transparent dark:from-black/30" aria-hidden />

              <PageBody p={p} />
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      {/* progress */}
      <div className="mx-1 mt-5 h-1.5 overflow-hidden rounded-full bg-charcoal/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg,#C6B083,#6A5938)' }}
          animate={{ width: `${((page + 1) / total) * 100}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>

      {/* controls */}
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={prev}
          disabled={page === 0}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl glass-tan py-3 font-note font-bold text-charcoal-600 transition-transform hover:-translate-y-0.5 disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" /> Prev
        </button>
        <div className="shrink-0 text-center">
          <p className="font-hand text-xl font-bold leading-none text-bronze-700">
            {page + 1} <span className="text-charcoal-300">/</span> {total}
          </p>
          <p className="mt-0.5 font-note text-[0.7rem] text-charcoal-400">turn the page →</p>
        </div>
        <button
          onClick={next}
          disabled={page === total - 1}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-bronze-500 py-3 font-note font-bold text-cream shadow-bronze transition-transform hover:-translate-y-0.5 disabled:opacity-40"
        >
          Next <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default function FullNotesSection() {
  return (
    <Section id="fullnotes">
      <SectionHeading
        part={0}
        kicker="The complete lecturer's notes"
        title="Full Lecture Notes"
        description={COMPLETE_NOTES_INTRO}
        narration={{
          id: 'fullnotes',
          text: 'The full lecturer’s notes — every page of the Commercial Management handout by Asmy Sheriff, transcribed in teaching order across three days. Day one covers pre-contract estimating and tendering. Day two covers budgets and the post-contract control tools — cost value reconciliation, cost to complete and cost reports. Day three covers earned value, cash flow and supply-chain management. Turn the pages like a real notebook.',
        }}
      />
      <Notebook />
    </Section>
  )
}
