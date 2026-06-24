import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Tabs from '../components/Tabs'
import TenderVolumes from '../components/art/TenderVolumes'
import { Reveal } from '../components/ui'
import { PROCUREMENT_TABS, SECTION_NARRATION } from '../data/content'

export default function ProcurementSection() {
  return (
    <Section id="procurement">
      <SectionHeading
        part={2}
        kicker="Procurement"
        title="Material · Labour · Subcontracts"
        description="Each procurement stream runs to its own schedule and strategy — supported by the right tender documents and route."
        narration={{ id: 'procurement', text: SECTION_NARRATION.procurement }}
      />

      <Reveal className="mx-auto mb-10 max-w-md">
        <div className="paper rounded-3xl border border-bronze-200/60 p-5 text-center shadow-neo-sm">
          <p className="mb-1 font-hand text-2xl font-bold text-charcoal">The 5 tender volumes</p>
          <p className="mb-2 text-sm text-charcoal-400">
            Flip to the “Tender Documents” tab below for the full contents of each.
          </p>
          <TenderVolumes />
        </div>
      </Reveal>

      <Tabs tabs={PROCUREMENT_TABS} />
    </Section>
  )
}
