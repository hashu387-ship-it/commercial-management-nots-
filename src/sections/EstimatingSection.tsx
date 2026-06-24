import { Lightbulb } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Accordion from '../components/Accordion'
import { Reveal } from '../components/ui'
import CostBuildup from '../components/art/CostBuildup'
import { ESTIMATING_TOPICS, SECTION_NARRATION } from '../data/content'

export default function EstimatingSection() {
  return (
    <Section id="estimating">
      <SectionHeading
        part={1}
        kicker="Estimating the Works"
        title="Building the Cost Base"
        description="Rates can be drawn from in-house data, built from first principles, sourced from suppliers, or modelled operationally — then risk-adjusted."
        narration={{ id: 'estimating', text: SECTION_NARRATION.estimating }}
      />

      <Reveal className="mx-auto mb-10 max-w-2xl">
        <CostBuildup />
      </Reveal>

      <div className="mx-auto max-w-4xl">
        <Accordion items={ESTIMATING_TOPICS} />

        <Reveal delay={0.1} className="mt-6">
          <div className="glass-tan flex items-start gap-4 rounded-3xl p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-bronze-500 text-cream shadow-bronze">
              <Lightbulb className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-charcoal">Key takeaway</p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-500">
                Estimating risk can be reduced to a certain extent by issuing tender queries to the employer —
                clarifying drawings, specifications and BOQ ambiguities before the price is fixed.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
