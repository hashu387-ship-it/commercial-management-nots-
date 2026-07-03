import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Check,
  Bookmark,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Scale,
  Heart,
  Sparkles,
} from 'lucide-react'
import { buildCards, BRANCHES, KEY_CLAUSES, VAR_VS_CLAIM, type StudyCard } from '../../data/contracts'

/* A swipeable spiral-notebook "study card" deck — every note as a card in
   the shared study-guide format: numbered badge, hand-underlined title,
   check-bullets, sticky-note tips, colour tabs and a recap/next-up footer. */

function keyword(point: string, color: string) {
  const i = point.indexOf(' — ')
  if (i === -1) return <span>{point}</span>
  return (
    <span>
      <b style={{ color }}>{point.slice(0, i)}</b>
      {point.slice(i)}
    </span>
  )
}

function Sticky({ tip, tone = 'plum' }: { tip: string; tone?: 'plum' | 'amber' }) {
  const bg = tone === 'amber' ? '#fdf3d1' : '#e9def2'
  return (
    <div
      className="pointer-events-none absolute -right-1 -top-4 z-20 hidden w-40 rotate-3 rounded-sm p-3 shadow-[4px_6px_14px_rgba(45,52,54,0.22)] sm:block"
      style={{ background: bg }}
    >
      <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-charcoal/30" />
      <p className="font-hand text-[1.05rem] font-bold leading-tight text-charcoal">{tip}</p>
      <Heart className="mt-1 h-3.5 w-3.5 text-plum" />
    </div>
  )
}

function IconRow({ text, color, i }: { text: string; color: string; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + i * 0.06 }}
      className="flex items-start gap-3 rounded-2xl bg-plum/[0.07] px-3 py-2.5"
    >
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-cream" style={{ backgroundColor: color }}>
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      <span className="text-[0.92rem] leading-snug text-charcoal-600">{keyword(text, color)}</span>
    </motion.li>
  )
}

function Body({ card }: { card: StudyCard }) {
  if (card.kind === 'cover') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <span className="clause mb-3 rounded-full bg-plum/12 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum">
          APC Study Series
        </span>
        <h2 className="underline-hand font-clay text-4xl font-extrabold leading-[1.05] text-charcoal sm:text-5xl">
          {card.title}
        </h2>
        <p className="mt-5 max-w-md font-note text-sm text-charcoal-500">{card.subtitle}</p>
        <p className="mt-6 font-hand text-2xl text-plum">Flip through every note →</p>
      </div>
    )
  }
  if (card.kind === 'chapter') {
    return (
      <div className="flex flex-1 flex-col justify-center">
        <div className="dash-box relative px-5 py-5">
          <span className="absolute -top-3 left-4 font-serif text-4xl leading-none text-plum/40">“</span>
          <p className="font-note text-base font-semibold leading-relaxed text-charcoal-600">{card.subtitle}</p>
        </div>
        <p className="mt-5 flex items-center gap-2 font-note text-sm font-bold text-plum">
          <Sparkles className="h-4 w-4" />
          {BRANCHES.find((b) => b.id === card.branchId)?.topics.length} topics in this chapter
        </p>
      </div>
    )
  }
  if (card.kind === 'clauses') {
    return (
      <div className="flex flex-1 flex-col justify-center">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {KEY_CLAUSES.map((k) => (
            <div key={k.c} className="flex items-center gap-2.5 rounded-xl bg-plum/[0.07] px-3 py-2">
              <span className="clause rounded-md bg-sky px-1.5 py-0.5 text-[0.72rem] font-bold text-charcoal-900">{k.c}</span>
              <span className="font-note text-sm font-semibold text-charcoal-600">{k.t}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (card.kind === 'compare') {
    return (
      <div className="flex flex-1 flex-col justify-center">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-charcoal/10">
          <div className="bg-sky/20 py-2 text-center font-clay text-sm font-bold text-charcoal">Variation</div>
          <div className="bg-amber/20 py-2 text-center font-clay text-sm font-bold text-charcoal">Claim</div>
          {VAR_VS_CLAIM.map((r, i) => (
            <div key={i} className="contents">
              <div className="border-t border-charcoal/10 px-3 py-2.5 text-[0.86rem] text-charcoal-600">{r.a}</div>
              <div className="border-l border-t border-charcoal/10 px-3 py-2.5 text-[0.86rem] text-charcoal-600">{r.b}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  // topic
  return (
    <div className="relative flex flex-1 flex-col justify-center">
      {card.clause && (
        <div
          className="absolute -top-1 right-0 grid h-16 w-16 rotate-6 place-items-center rounded-full text-center text-cream"
          style={{ backgroundColor: card.color }}
        >
          <span className="clause text-[0.6rem] font-bold leading-tight">
            CLAUSE
            <br />
            <span className="text-sm">{card.clause}</span>
          </span>
        </div>
      )}
      <ul className="space-y-2.5">
        {card.points?.map((p, i) => (
          <IconRow key={i} text={p} color={card.color} i={i} />
        ))}
      </ul>
    </div>
  )
}

export default function StudyCards() {
  const cards = useMemo(() => buildCards(), [])
  const total = cards.length
  const [[idx, dir], setState] = useState<[number, number]>([0, 0])
  const card = cards[idx]
  const next = cards[idx + 1]

  const go = useCallback(
    (d: number) => setState(([i]) => {
      const ni = Math.min(total - 1, Math.max(0, i + d))
      return [ni, d]
    }),
    [total],
  )
  const jumpTo = (i: number) => setState(([cur]) => [i, i > cur ? 1 : -1])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const branchTabs = BRANCHES
  const chapterIndex = (bid: string) => cards.findIndex((c) => c.kind === 'chapter' && c.branchId === bid)

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* arrows */}
      <button
        onClick={() => go(-1)}
        disabled={idx === 0}
        aria-label="Previous card"
        className="absolute -left-3 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-charcoal text-cream shadow-glass-lg transition-transform hover:-translate-y-[calc(50%+2px)] disabled:opacity-30 sm:-left-5"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(1)}
        disabled={idx === total - 1}
        aria-label="Next card"
        className="absolute -right-3 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-charcoal text-cream shadow-glass-lg transition-transform hover:-translate-y-[calc(50%+2px)] disabled:opacity-30 sm:-right-5"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="relative overflow-hidden px-1 py-2">
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={idx}
            custom={dir}
            initial={{ opacity: 0, x: dir >= 0 ? 90 : -90, rotate: dir >= 0 ? 1.5 : -1.5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: dir >= 0 ? -90 : 90, rotate: dir >= 0 ? -1.5 : 1.5 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1)
              else if (info.offset.x > 80) go(-1)
            }}
          >
            {/* paper card */}
            <div className="book-stack relative flex min-h-[32rem] overflow-hidden rounded-[1.75rem] border border-bronze-200/60 bg-[#fbf8ef]">
              {/* spiral binding */}
              <div className="spiral-binding hidden w-9 shrink-0 rounded-l-[1.75rem] sm:block" aria-hidden />

              {/* content */}
              <div className="relative flex flex-1 flex-col px-5 py-5 sm:px-7">
                {/* brand bar */}
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 font-clay text-xs font-bold text-charcoal">
                    <GraduationCap className="h-4 w-4 text-plum" /> APC · Contract Practice
                  </span>
                  <span className="clause inline-flex items-center gap-1 rounded-full border border-plum/30 bg-plum/10 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-plum">
                    <Scale className="h-3 w-3" /> Study Series
                  </span>
                </div>

                {/* framed body */}
                <div className="relative flex flex-1 flex-col rounded-[1.5rem] border-[2.5px] border-plum/45 px-4 pb-4 pt-7 sm:px-6">
                  {/* number badge */}
                  <span className="absolute -left-3 -top-4 grid h-11 w-11 place-items-center rounded-full border-[3px] border-plum bg-cream font-clay text-lg font-black text-plum shadow-md">
                    {card.n}
                  </span>

                  {card.tip && <Sticky tip={card.tip} tone={card.kind === 'compare' ? 'amber' : 'plum'} />}

                  {card.kind !== 'cover' && (
                    <div className="mb-4 flex items-start gap-2">
                      <h3 className="underline-hand font-clay text-[1.7rem] font-extrabold leading-[1.1] text-charcoal sm:text-3xl">
                        {card.title}
                      </h3>
                      <Sparkles className="mt-1 h-5 w-5 shrink-0 text-amber" />
                    </div>
                  )}

                  <Body card={card} />
                </div>
              </div>

              {/* colour tabs */}
              <div className="absolute right-0 top-16 z-10 hidden flex-col gap-1.5 sm:flex">
                {branchTabs.map((b) => {
                  const on = b.id === card.branchId
                  return (
                    <button
                      key={b.id}
                      onClick={() => jumpTo(chapterIndex(b.id))}
                      aria-label={b.label}
                      title={b.label}
                      className="h-8 rounded-l-md transition-all"
                      style={{ width: on ? 26 : 16, backgroundColor: b.color, opacity: on ? 1 : 0.55 }}
                    />
                  )
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* footer strip */}
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-2.5 shadow-glass sm:gap-5">
        <span className="hidden items-center gap-2 sm:flex">
          <Bookmark className="h-4 w-4 shrink-0 text-plum" />
          <span className="font-note text-xs font-bold leading-tight text-charcoal-600">
            {card.tip ?? 'Lock it in.'}
          </span>
        </span>
        <span className="mx-auto flex items-center gap-2">
          <Lightbulb className="h-4 w-4 shrink-0 text-amber" />
          <span className="font-note text-xs font-semibold text-charcoal-500">
            {next ? (
              <>
                Next up: <b className="text-charcoal">{next.title}</b>
              </>
            ) : (
              <b className="text-plum">You’ve got this ♥</b>
            )}
          </span>
        </span>
        <span className="clause grid h-8 min-w-[2.75rem] place-items-center rounded-full bg-charcoal px-2 text-xs font-bold text-cream">
          {card.n}/{total}
        </span>
      </div>
    </div>
  )
}
