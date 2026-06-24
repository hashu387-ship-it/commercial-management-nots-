import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Tabs from '../components/Tabs'
import { PROCUREMENT_TABS } from '../data/content'

export default function ProcurementSection() {
  return (
    <Section id="procurement">
      <SectionHeading
        part={2}
        kicker="Procurement"
        title="Material · Labour · Subcontracts"
        description="Each procurement stream runs to its own schedule and strategy — supported by the right tender documents and route."
      />
      <Tabs tabs={PROCUREMENT_TABS} />
    </Section>
  )
}
