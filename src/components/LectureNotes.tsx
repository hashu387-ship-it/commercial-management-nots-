import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ChevronDown, Lightbulb, NotebookPen, TriangleAlert } from 'lucide-react'
import type { LectureBlock, SectionId } from '../types'
import { LECTURE_NOTES } from '../data/lectureNotes'
import { DoodleStar } from './art/Doodles'

function Callout({
  kind,
  text,
}: {
  kind: 'tip' | 'example' | 'watch'
  text: string
}) {
  const cfg = {
    tip: { color: '#E0A23B', label: 'APC tip', Icon: Lightbulb },
    example: { color: '#7C8C5A', label: 'Example', Icon: NotebookPen },
    watch: { color: '#D9694C', label: 'Watch out', Icon: TriangleAlert },
  }[kind]
  const { color, label, Icon } = cfg
  return (
    <div
      className="sticky-note mt-3 -rotate-1 rounded-md p-3"
      style={{ background: `${color}1f`, boxShadow: `3px 4px 10px ${color}33` }}
    >
      <p className="mb-1 flex items-center gap-1.5 font-note text-xs font-bold uppercase tracking-wide" style={{ color }}>
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      <p className="font-note text-[0.92rem] leading-snug text-charcoal-700">{text}</p>
    </div>
  )
}

function Block({ block, i }: { block: LectureBlock; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: i * 0.04 }}
      className="relative"
    >
      <h4 className="mb-2 flex items-center gap-2 font-hand text-2xl font-bold text-charcoal">
        <DoodleStar className="h-4 w-4" color="#9E875D" />
        {block.heading}
      </h4>
      <ul className="space-y-2 pl-1">
        {block.points.map((p, idx) => (
          <li key={idx} className="flex gap-2.5 font-note text-[0.95rem] leading-relaxed text-charcoal-700">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-400" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <div className="grid gap-2 sm:grid-cols-2">
        {block.example && <Callout kind="example" text={block.example} />}
        {block.tip && <Callout kind="tip" text={block.tip} />}
        {block.watch && <Callout kind="watch" text={block.watch} />}
      </div>
    </motion.div>
  )
}

/** Collapsible handwritten "from the lecture" notebook for a section. */
export default function LectureNotes({ id }: { id: SectionId }) {
  const blocks = LECTURE_NOTES[id]
  const [open, setOpen] = useState(false)
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full items-center gap-3 rounded-2xl bg-charcoal px-5 py-4 text-left text-cream transition-transform duration-300 hover:-translate-y-0.5"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-bronze-500 text-cream">
          <BookOpen className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-hand text-2xl font-bold leading-none text-bronze-200">
            The full explanation
          </span>
          <span className="font-note text-sm text-cream/70">
            From the lecture — {blocks.length} {blocks.length === 1 ? 'note' : 'notes'} in presentation order
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-5 w-5 text-bronze-200" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="paper mt-3 space-y-7 rounded-3xl border border-bronze-200/60 p-6 shadow-neo-sm sm:p-8">
              {blocks.map((b, i) => (
                <Block key={b.heading} block={b} i={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
