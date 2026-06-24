import { motion } from 'framer-motion'
import { AlertTriangle, GraduationCap, HelpCircle, Lightbulb, Sparkles } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { Reveal } from '../components/ui'
import {
  COMPLETE_NOTES,
  COMPLETE_NOTES_INTRO,
  NOTE_DAYS,
} from '../data/completeNotes'
import type { NoteBlock, NotePage, NoteTone } from '../data/completeNotes'

/* Accent map — literal class strings so Tailwind's JIT keeps them. */
const TONE: Record<NoteTone, { bar: string; head: string; dot: string }> = {
  tan: { bar: 'border-bronze-400', head: 'text-bronze-700', dot: 'bg-bronze-500' },
  sage: { bar: 'border-sage', head: 'text-sage', dot: 'bg-sage' },
  coral: { bar: 'border-coral', head: 'text-coral', dot: 'bg-coral' },
  sky: { bar: 'border-sky', head: 'text-sky', dot: 'bg-sky' },
  plum: { bar: 'border-plum', head: 'text-plum', dot: 'bg-plum' },
  amber: { bar: 'border-amber', head: 'text-amber', dot: 'bg-amber' },
}

const NOTE_STYLE = {
  tip: { Icon: Lightbulb, klass: 'border-sage', tint: 'text-sage', label: 'tip' },
  example: { Icon: Sparkles, klass: 'border-sky', tint: 'text-sky', label: 'example' },
  watch: { Icon: AlertTriangle, klass: 'border-coral', tint: 'text-coral', label: 'watch out' },
  q: { Icon: HelpCircle, klass: 'border-amber', tint: 'text-amber', label: 'likely exam question' },
} as const

function Dotted({ items, dot = 'bg-bronze-500' }: { items: string[]; dot?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5 text-[0.95rem] leading-snug text-charcoal-600">
          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

function Block({ b }: { b: NoteBlock }) {
  switch (b.t) {
    case 'lead':
      return <p className="text-pretty text-[1.02rem] leading-relaxed text-charcoal-600">{b.text}</p>

    case 'bullets':
      return (
        <div>
          {b.heading && (
            <p className="mb-2 font-note text-base font-bold text-charcoal">{b.heading}</p>
          )}
          <Dotted items={b.items} />
        </div>
      )

    case 'cols':
      return (
        <div
          className={`grid gap-3 ${
            b.cols.length >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : b.cols.length === 2 ? 'sm:grid-cols-2' : ''
          }`}
        >
          {b.cols.map((c) => {
            const tone = TONE[c.tone ?? 'tan']
            return (
              <div key={c.heading} className={`glass-tan rounded-2xl border-l-4 ${tone.bar} p-4`}>
                <p className={`mb-2 font-hand text-xl font-bold ${tone.head}`}>{c.heading}</p>
                <Dotted items={c.items} dot={tone.dot} />
              </div>
            )
          })}
        </div>
      )

    case 'steps':
      return (
        <div>
          {b.heading && (
            <p className="mb-2.5 font-note text-base font-bold text-charcoal">{b.heading}</p>
          )}
          <ol className="space-y-2.5">
            {b.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-bronze-500 text-sm font-bold text-cream">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-[0.95rem] leading-snug text-charcoal-600">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )

    case 'table':
      return (
        <div className="overflow-x-auto rounded-2xl border border-bronze-200/60">
          <table className="w-full border-collapse text-left text-[0.9rem]">
            <thead>
              <tr className="glass-tan">
                {b.headers.map((h) => (
                  <th key={h} className="px-3 py-2.5 font-note font-bold text-charcoal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-bronze-200/50 align-top">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-3 py-2.5 leading-snug ${
                        ci === 0 ? 'font-semibold text-charcoal' : 'text-charcoal-600'
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
        <div className="rounded-2xl bg-charcoal p-5 shadow-glass-lg">
          <div className="space-y-1.5 font-note text-[0.98rem] leading-relaxed text-cream">
            {b.lines.map((l, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {l}
              </p>
            ))}
          </div>
          {b.caption && <p className="mt-3 font-hand text-lg text-bronze-300">{b.caption}</p>}
        </div>
      )

    case 'note': {
      const s = NOTE_STYLE[b.tone]
      return (
        <div className={`glass-tan flex gap-3 rounded-2xl border-l-4 ${s.klass} p-4`}>
          <s.Icon className={`h-5 w-5 shrink-0 ${s.tint}`} aria-hidden />
          <div>
            <p className={`mb-0.5 font-hand text-lg font-bold ${s.tint}`}>{b.title ?? s.label}</p>
            <p className="text-[0.95rem] leading-snug text-charcoal-600">{b.text}</p>
          </div>
        </div>
      )
    }

    case 'define':
      return (
        <div className="neo-inset rounded-2xl p-4">
          <p className="font-hand text-2xl font-bold text-bronze-700">{b.term}</p>
          <p className="mt-1 text-[0.98rem] leading-relaxed text-charcoal-600">{b.text}</p>
        </div>
      )

    case 'pills':
      return (
        <div className="flex flex-wrap gap-2">
          {b.items.map((it, i) => (
            <span key={i} className="chip glass-tan text-charcoal-600">
              {it}
            </span>
          ))}
        </div>
      )

    default:
      return null
  }
}

function NoteCard({ p }: { p: NotePage }) {
  if (p.milestone) {
    return (
      <Reveal>
        <div id={p.id} className="relative overflow-hidden scroll-mt-24 rounded-3xl bg-charcoal p-7 text-center shadow-glass-lg">
          <span className="washi -top-2 left-10 -rotate-6" aria-hidden />
          <div className="mb-2 flex items-center justify-center gap-2">
            <GraduationCap className="h-5 w-5 text-bronze-300" />
            <span className="font-hand text-xl font-bold text-bronze-300">{p.phase}</span>
          </div>
          <h4 className="font-display text-2xl font-bold text-cream sm:text-3xl">{p.title}</h4>
          {p.blocks.map((b, i) => (
            <p key={i} className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-cream/75">
              {b.t === 'lead' ? b.text : ''}
            </p>
          ))}
        </div>
      </Reveal>
    )
  }

  return (
    <Reveal>
      <article id={p.id} className="glass relative scroll-mt-24 rounded-3xl p-5 sm:p-7">
        {/* page tag + exam flag */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="font-hand text-lg font-bold text-coral">{p.phase}</p>
            <h4 className="mt-0.5 text-balance font-display text-2xl font-bold leading-tight text-charcoal">
              {p.title}
            </h4>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className="rounded-full bg-bronze-500 px-2.5 py-1 font-note text-xs font-bold text-cream">
              {p.page}
            </span>
            {p.exam && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber/15 px-2 py-0.5 font-note text-[0.68rem] font-bold uppercase tracking-wide text-amber">
                <HelpCircle className="h-3 w-3" /> Exam focus
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {p.blocks.map((b, i) => (
            <Block key={i} b={b} />
          ))}
        </div>
      </article>
    </Reveal>
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
          text: 'The full lecturer’s notes — every page of the Commercial Management handout by Asmy Sheriff, transcribed in teaching order across three days. Day one covers pre-contract estimating and tendering. Day two covers budgets and post-contract control with C V R, C T C and cost reports. Day three covers earned value, cash flow and supply chain. Use it as your complete revision reference.',
        }}
      />

      {/* day jump */}
      <Reveal className="mx-auto mb-12 flex max-w-2xl flex-wrap justify-center gap-2">
        {NOTE_DAYS.map((d) => (
          <a
            key={d.day}
            href={`#cn-day-${d.day}`}
            className="chip glass-tan font-note font-bold text-charcoal-600 transition-transform duration-200 hover:-translate-y-0.5"
          >
            {d.title}
          </a>
        ))}
      </Reveal>

      {NOTE_DAYS.map((day) => (
        <div key={day.day} className="mb-14 scroll-mt-24" id={`cn-day-${day.day}`}>
          {/* day divider */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="sticky-note mx-auto mb-7 max-w-2xl -rotate-1 rounded-md p-5 text-center"
          >
            <p className="font-display text-2xl font-bold text-charcoal sm:text-3xl">{day.title}</p>
            <p className="mt-1.5 font-note text-base text-charcoal-500">{day.subtitle}</p>
          </motion.div>

          <div className="grid gap-5">
            {COMPLETE_NOTES.filter((p) => p.day === day.day).map((p) => (
              <NoteCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      ))}
    </Section>
  )
}
