import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  ListTree,
  Sparkles,
  X,
} from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { DoodleStar } from '../components/art/Doodles'
import { COMPLETE_NOTES } from '../data/completeNotes'
import { PRESENTATION_NOTES } from '../data/presentationNotes'
import type { NoteBlock, NotePage, NoteTone } from '../data/completeNotes'

const STORAGE = 'cm-notebook-page-v1'

/* The notebook reads end-to-end: the lecture slides first, then the
   detailed complete notes — every page in teaching order. Each chapter
   gets its own ink colour (used for tabs, ribbon and page accents). */
const CHAPTERS = [
  { id: 'sl1', label: 'Slides ①', color: '#9E875D', pages: PRESENTATION_NOTES.filter((p) => p.day === 1) },
  { id: 'sl2', label: 'Slides ②', color: '#5B7DA6', pages: PRESENTATION_NOTES.filter((p) => p.day === 2) },
  { id: 'nd1', label: 'Notes ①', color: '#7C8C5A', pages: COMPLETE_NOTES.filter((p) => p.day === 1) },
  { id: 'nd2', label: 'Notes ②', color: '#8A6491', pages: COMPLETE_NOTES.filter((p) => p.day === 2) },
  { id: 'nd3', label: 'Notes ③', color: '#B25B3E', pages: COMPLETE_NOTES.filter((p) => p.day === 3) },
]
const ALL_PAGES: NotePage[] = CHAPTERS.flatMap((c) => c.pages)
const CHAPTER_STARTS = CHAPTERS.map((_, i) =>
  CHAPTERS.slice(0, i).reduce((n, c) => n + c.pages.length, 0),
)
const chapterOf = (page: number) => {
  let idx = 0
  for (let i = 0; i < CHAPTER_STARTS.length; i++) if (page >= CHAPTER_STARTS[i]) idx = i
  return idx
}
const NOTEBOOK_INTRO =
  'The whole course as one handwritten book — flip the pages like the real thing. It opens with every lecture slide (Roshan de Silva’s APC deck, Parts 1 & 2) in presentation order, then the full detailed handout (Asmy Sheriff). Nothing from either source is left out.'

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

/** A wobbly hand-drawn underline in any ink colour. */
function HandUnderline({ color, className = '' }: { color: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      aria-hidden
      className={`absolute left-0 h-2.5 w-full ${className}`}
    >
      <path d="M2 7 C60 1 120 11 180 5 C220 2 260 9 298 4" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

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

/* ── A single hand-written page (ink on ruled paper) ──────────── */
function PageBody({ p, accent }: { p: NotePage; accent: string }) {
  if (p.milestone) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <DoodleStar className="mb-3 h-10 w-10" color={accent} />
        <p className="font-hand text-2xl font-bold" style={{ color: accent }}>
          {p.phase}
        </p>
        <span className="relative mt-1 inline-block">
          <h4 className="font-hand text-4xl font-bold text-charcoal">{p.title}</h4>
          <HandUnderline color={accent} className="-bottom-2" />
        </span>
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
        <p className="font-hand text-xl font-bold" style={{ color: accent }}>
          {p.phase}
        </p>
        <div className="flex shrink-0 flex-col items-end">
          <span className="-rotate-2 font-hand text-xl font-bold" style={{ color: accent }}>
            {p.page}
          </span>
          {p.exam && (
            <span className="mt-1 grid h-8 w-8 -rotate-6 place-items-center rounded-full border-2 border-coral font-hand text-base font-bold text-coral">
              Q
            </span>
          )}
        </div>
      </div>
      <span className="relative mb-5 inline-block self-start">
        <h4 className="font-hand text-3xl font-bold leading-tight text-charcoal sm:text-4xl">{p.title}</h4>
        <HandUnderline color={accent} className="-bottom-2" />
      </span>

      <div className="space-y-4 pb-2">
        {p.blocks.map((b, i) => (
          <Block key={i} b={b} />
        ))}
      </div>
    </div>
  )
}

/* page-turn (book peel around the left spine) + a moving spine shadow */
const variants = {
  enter: (d: number) => (d > 0 ? { rotateY: 0, opacity: 0, scale: 0.96 } : { rotateY: -172, opacity: 1 }),
  center: { rotateY: 0, opacity: 1, scale: 1 },
  exit: (d: number) => (d > 0 ? { rotateY: -172, opacity: 1 } : { rotateY: 0, opacity: 0, scale: 0.96 }),
}
const shadeVariants = { enter: { opacity: 0.16 }, center: { opacity: 0 }, exit: { opacity: 0.5 } }

function Notebook() {
  const total = ALL_PAGES.length
  const [page, setPage] = useState(() => {
    const n = Number(localStorage.getItem(STORAGE))
    return Number.isFinite(n) && n >= 0 && n < total ? n : 0
  })
  const [dir, setDir] = useState(1)
  const [contents, setContents] = useState(false)
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
  const jump = useCallback((to: number) => { go(to, to > page ? 1 : -1); setContents(false) }, [go, page])

  useEffect(() => {
    if (!contents) return
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setContents(false)
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [contents])

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

  const p = ALL_PAGES[page]
  const ci = chapterOf(page)
  const accent = CHAPTERS[ci].color

  return (
    <div className="mx-auto max-w-3xl">
      {/* colourful chapter index tabs + contents */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5">
        {CHAPTERS.map((c, i) => {
          const idx = CHAPTER_STARTS[i]
          const isActive = ci === i
          return (
            <button
              key={c.id}
              onClick={() => go(idx, idx > page ? 1 : -1)}
              className="rounded-t-xl px-3 py-1.5 font-note text-sm font-bold shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
              style={
                isActive
                  ? { background: c.color, color: '#F5F3EE' }
                  : { background: `${c.color}26`, color: c.color }
              }
            >
              {c.label}
            </button>
          )
        })}
        <button
          onClick={() => setContents(true)}
          className="ml-1 inline-flex items-center gap-1.5 rounded-xl glass-tan px-3 py-1.5 font-note text-sm font-bold text-charcoal-600 transition-transform hover:-translate-y-0.5"
        >
          <ListTree className="h-4 w-4 text-bronze-700" /> Contents
        </button>
      </div>

      {/* the book */}
      <div
        className="relative outline-none"
        tabIndex={0}
        role="group"
        aria-roledescription="book"
        aria-label={`Page ${page + 1} of ${total}`}
        onKeyDown={onKey}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* ribbon bookmark */}
        <div aria-hidden className="absolute -top-1.5 right-10 z-30 hidden sm:block">
          <div
            className="h-16 w-3.5 shadow-md"
            style={{ background: accent, clipPath: 'polygon(0 0,100% 0,100% 100%,50% 78%,0 100%)' }}
          />
        </div>

        {/* hardcover case */}
        <div className="rounded-[1.5rem] bg-gradient-to-br from-bronze-300 to-bronze-700 p-2.5 shadow-glass-lg ring-1 ring-black/10 dark:from-charcoal-600 dark:to-charcoal-900 sm:p-3">
          <div className="perspective relative min-h-[68vh] sm:min-h-[33rem]">
            {/* stacked page edges behind the open page (book thickness) */}
            <div className="book-stack absolute inset-0 rounded-r-xl rounded-l-md bg-cream dark:bg-charcoal-800" aria-hidden />

            <AnimatePresence custom={dir} mode="popLayout" initial={false}>
              <motion.article
                key={p.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.62, ease: [0.42, 0, 0.2, 1] }}
                style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d', transformPerspective: 1700, backfaceVisibility: 'hidden' }}
                className="ruled-paper page-curl absolute inset-0 overflow-y-auto rounded-l-md rounded-r-xl border border-bronze-200/70"
              >
                {/* coloured chapter band along the top edge */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1.5" style={{ background: accent }} aria-hidden />
                {/* binding holes + margin line */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-9 flex-col justify-around py-7" aria-hidden>
                  {Array.from({ length: 11 }).map((_, i) => (
                    <span key={i} className="mx-auto h-3 w-3 rounded-full bg-charcoal/12 shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]" />
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-10 w-px bg-coral/40" aria-hidden />
                {/* spine shadow + paper sheen */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black/12 to-transparent dark:from-black/35" aria-hidden />
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/25 to-transparent dark:from-white/[0.04]" aria-hidden />
                {/* moving shadow during the page turn */}
                <motion.div
                  variants={shadeVariants}
                  className="pointer-events-none absolute inset-0 z-20 rounded-r-xl"
                  style={{ background: 'linear-gradient(100deg, rgba(0,0,0,0.55), rgba(0,0,0,0.12) 22%, transparent 50%)' }}
                  aria-hidden
                />

                <div className="relative z-0 pt-2.5">
                  <PageBody p={p} accent={accent} />
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* big always-visible page arrows */}
        <button
          onClick={prev}
          disabled={page === 0}
          aria-label="Previous page"
          className="absolute -left-2 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream text-charcoal shadow-glass-lg ring-1 ring-bronze-200 transition hover:scale-110 disabled:opacity-25 dark:bg-charcoal-700 dark:text-cream dark:ring-charcoal-600 sm:-left-5"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={next}
          disabled={page === total - 1}
          aria-label="Next page"
          className="absolute -right-2 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-bronze-500 text-cream shadow-glass-lg ring-1 ring-bronze-600 transition hover:scale-110 disabled:opacity-25 sm:-right-5"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* progress */}
      <div className="mx-1 mt-5 h-1.5 overflow-hidden rounded-full bg-charcoal/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, #6A5938)` }}
          animate={{ width: `${((page + 1) / total) * 100}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>

      {/* bottom controls */}
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={prev}
          disabled={page === 0}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl glass-tan py-3 font-note font-bold text-charcoal-600 transition-transform hover:-translate-y-0.5 disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" /> Prev
        </button>
        <div className="shrink-0 px-1 text-center">
          <p className="font-hand text-xl font-bold leading-none" style={{ color: accent }}>
            {page + 1} <span className="text-charcoal-300">/</span> {total}
          </p>
          <p className="mt-0.5 font-note text-[0.7rem] text-charcoal-400">{CHAPTERS[ci].label} · swipe or tap ↔</p>
        </div>
        <button
          onClick={next}
          disabled={page === total - 1}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-bronze-500 py-3 font-note font-bold text-cream shadow-bronze transition-transform hover:-translate-y-0.5 disabled:opacity-40"
        >
          Next <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Contents drawer — jump to any page */}
      <AnimatePresence>
        {contents && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm"
            onClick={() => setContents(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[min(23rem,90vw)] flex-col bg-cream shadow-glass-lg dark:bg-charcoal-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-bronze-200/60 px-4 py-3">
                <p className="font-hand text-2xl font-bold text-charcoal">Contents</p>
                <button onClick={() => setContents(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-xl glass-tan">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-2">
                {CHAPTERS.map((c, i) => (
                  <div key={c.id} className="mb-2">
                    <p className="px-2 py-1.5 font-note text-sm font-bold" style={{ color: c.color }}>
                      {c.label}
                    </p>
                    {c.pages.map((pg, j) => {
                      const gi = CHAPTER_STARTS[i] + j
                      const active = gi === page
                      return (
                        <button
                          key={pg.id}
                          onClick={() => jump(gi)}
                          className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
                            active ? 'bg-bronze-500/15' : 'hover:bg-bronze-500/8'
                          }`}
                        >
                          <span
                            className="grid h-5 w-7 shrink-0 place-items-center rounded text-[0.62rem] font-bold text-cream"
                            style={{ background: c.color }}
                          >
                            {pg.page.replace(/[^0-9]/g, '') || '•'}
                          </span>
                          <span className={`truncate text-[0.82rem] ${active ? 'font-bold text-charcoal' : 'text-charcoal-600'}`}>
                            {pg.title}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
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
        description={NOTEBOOK_INTRO}
        narration={{
          id: 'fullnotes',
          text: 'The full lecturer’s notes as one handwritten book. It opens with every lecture slide — Roshan de Silva’s APC deck, Parts one and two — in presentation order, then the complete detailed handout by Asmy Sheriff across three days. Flip the pages like a real book; use the chapter tabs or the contents list to jump anywhere. Nothing from either source is left out.',
        }}
      />
      <Notebook />
    </Section>
  )
}
