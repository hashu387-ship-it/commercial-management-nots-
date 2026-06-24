import { motion } from 'framer-motion'
import type { DeckSlide } from './slides'
import SlideVisual from './SlideVisual'
import LectureNotes from '../components/LectureNotes'
import { DoodleStar, DoodleUnderline } from '../components/art/Doodles'
import { COURSE } from '../data/content'

const partMeta = (part: 0 | 1 | 2) =>
  part === 1
    ? { label: 'Part 1 · Pre-Contract', color: '#9E875D' }
    : part === 2
      ? { label: 'Part 2 · Post-Contract', color: '#8A6491' }
      : { label: 'Commercial Management', color: '#7C8C5A' }

function Bullets({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.06 }}
          className="flex gap-3 text-[1.02rem] leading-snug text-charcoal-700"
        >
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
          <span>{it}</span>
        </motion.li>
      ))}
    </ul>
  )
}

function Columns({ cols, color }: { cols: { heading: string; items: string[] }[]; color: string }) {
  return (
    <div className={`grid gap-3 ${cols.length >= 3 ? 'sm:grid-cols-3' : cols.length === 2 ? 'sm:grid-cols-2' : ''}`}>
      {cols.map((c) => (
        <div key={c.heading} className="neo-inset rounded-2xl p-4">
          <p className="mb-2 font-note text-base font-bold" style={{ color }}>
            {c.heading}
          </p>
          <ul className="space-y-1.5">
            {c.items.map((it, i) => (
              <li key={i} className="flex gap-2 text-[0.92rem] leading-snug text-charcoal-600">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: color }} />
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function Slide({ slide, index, total }: { slide: DeckSlide; index: number; total: number }) {
  const meta = partMeta(slide.part)
  const isTitle = slide.kind === 'title' || slide.kind === 'closing'

  return (
    <div className="paper-grid relative flex h-full w-full flex-col overflow-y-auto rounded-[2rem] border border-bronze-200/60 shadow-glass-lg">
      {/* washi tape + slide number */}
      <span className="washi -top-2 left-8 -rotate-6" aria-hidden />
      <span
        className="absolute right-5 top-5 z-10 grid h-9 min-w-9 place-items-center rounded-full px-2 font-note text-sm font-bold text-cream"
        style={{ background: meta.color }}
      >
        {index + 1}/{total}
      </span>

      <div className={`flex flex-1 flex-col gap-5 p-6 sm:p-9 ${isTitle ? 'justify-center text-center' : ''}`}>
        {/* kicker + title */}
        <div className={isTitle ? '' : ''}>
          <div className={`mb-2 flex items-center gap-2 ${isTitle ? 'justify-center' : ''}`}>
            <DoodleStar className="h-4 w-4" color={meta.color} />
            <span className="font-hand text-2xl font-bold" style={{ color: meta.color }}>
              {slide.kicker ?? meta.label}
            </span>
          </div>
          <div className="relative inline-block">
            <h2
              className={`font-display font-bold leading-tight text-charcoal ${
                isTitle ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'
              }`}
            >
              {slide.title}
            </h2>
            <DoodleUnderline className="absolute -bottom-2 left-0 h-2.5 w-full" color={meta.color} />
          </div>
          {slide.subtitle && (
            <p className="mt-4 font-note text-lg text-charcoal-500">{slide.subtitle}</p>
          )}
        </div>

        {/* visual */}
        <div className={`${isTitle ? 'mx-auto w-full max-w-md' : 'w-full'}`}>
          <SlideVisual name={slide.visual} />
        </div>

        {/* body */}
        {!isTitle && (
          <div className="space-y-4">
            {slide.bullets && <Bullets items={slide.bullets} color={meta.color} />}
            {slide.columns && <Columns cols={slide.columns} color={meta.color} />}
          </div>
        )}

        {isTitle && slide.bullets && (
          <div className="mx-auto max-w-md">
            <Bullets items={slide.bullets} color={meta.color} />
          </div>
        )}

        {/* key takeaway */}
        {slide.note && (
          <div className="sticky-note -rotate-1 rounded-md p-3" style={{ background: `${meta.color}1f` }}>
            <p className="font-note text-[0.98rem] font-semibold leading-snug text-charcoal-700">
              <span className="mr-1 font-hand text-xl" style={{ color: meta.color }}>
                note —
              </span>
              {slide.note}
            </p>
          </div>
        )}

        {/* full explanation */}
        {slide.lecture && <LectureNotes id={slide.lecture} />}

        {slide.kind === 'closing' && (
          <p className="mt-2 font-note text-sm text-charcoal-400">
            {COURSE.author} · {COURSE.credentials}
          </p>
        )}
      </div>
    </div>
  )
}
