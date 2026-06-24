import { motion } from 'framer-motion'
import { FileSignature, Lightbulb, TriangleAlert } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { Reveal } from '../components/ui'
import { ContractScene } from '../components/art/Scenes'
import { SAMPLE_SOES, SOE_INTRO, SOE_TIPS } from '../data/soes'
import { SECTION_NARRATION } from '../data/content'

export default function SoeSection() {
  return (
    <Section id="soe">
      <SectionHeading
        kicker="Write Your APC"
        title="Sample Summaries of Experience"
        description="Three worked Commercial Management SOEs — structured across Levels 1, 2 and 3 — to model your own."
        narration={{ id: 'soe', text: SECTION_NARRATION.soe }}
      />

      <Reveal className="mx-auto mb-8 max-w-md">
        <div className="glass rounded-3xl p-3">
          <ContractScene />
        </div>
      </Reveal>

      {/* Disclaimer + tips */}
      <Reveal className="mb-8">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div className="glass-tan rounded-3xl p-6">
            <p className="mb-2 flex items-center gap-2 font-hand text-2xl font-bold text-charcoal">
              <TriangleAlert className="h-5 w-5 text-coral" /> Models, not copy
            </p>
            <p className="font-note text-[0.98rem] leading-relaxed text-charcoal-600">{SOE_INTRO}</p>
          </div>
          <div className="glass rounded-3xl p-6">
            <p className="mb-3 flex items-center gap-2 font-hand text-2xl font-bold text-bronze-700">
              <Lightbulb className="h-5 w-5" /> Writing tips
            </p>
            <ul className="space-y-2">
              {SOE_TIPS.map((t, i) => (
                <li key={i} className="flex gap-2 font-note text-sm leading-snug text-charcoal-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* SOEs */}
      <div className="space-y-8">
        {SAMPLE_SOES.map((soe, i) => (
          <motion.article
            key={soe.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass overflow-hidden rounded-[2rem]"
            style={{ borderTop: `5px solid ${soe.color}` }}
          >
            {/* header */}
            <div className="flex flex-wrap items-start gap-4 border-b border-white/50 p-6 sm:p-8">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-cream shadow-bronze"
                style={{ background: soe.color }}
              >
                <FileSignature className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="chip font-note font-bold text-cream" style={{ background: soe.color }}>
                    SOE {i + 1}
                  </span>
                  <span className="chip glass-tan font-note font-bold text-charcoal-600">{soe.stage}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-charcoal">{soe.title}</h3>
                <p className="font-note text-sm text-bronze-700">{soe.focus}</p>
              </div>
            </div>

            {/* context */}
            <div className="bg-tan/40 px-6 py-3 sm:px-8">
              <p className="font-note text-sm text-charcoal-600">
                <span className="font-bold text-charcoal">Project context — </span>
                {soe.context}
              </p>
            </div>

            {/* levels (all visible, no click) */}
            <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-3">
              {soe.levels.map((lvl) => (
                <div key={lvl.level} className="neo-inset rounded-2xl p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="grid h-7 w-7 place-items-center rounded-full font-note text-sm font-bold text-cream"
                      style={{ background: soe.color }}
                    >
                      {lvl.level.split(' ')[1]}
                    </span>
                    <p className="font-hand text-xl font-bold text-charcoal">{lvl.heading}</p>
                  </div>
                  <p className="text-[0.92rem] leading-relaxed text-charcoal-600">{lvl.body}</p>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
