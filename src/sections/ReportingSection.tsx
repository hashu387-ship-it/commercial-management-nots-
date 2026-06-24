import { Info } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Tabs from '../components/Tabs'
import { Reveal } from '../components/ui'
import CashFlowCurve from '../components/art/CashFlowCurve'
import CvrChart from '../components/art/CvrChart'
import { REPORTING_TABS } from '../data/content'

export default function ReportingSection() {
  return (
    <Section id="reporting">
      <SectionHeading
        part={2}
        kicker="Reporting in Commercial Management"
        title="Cash Flow · CVR · CTC · EVA"
        description="Inter alia, these four reports drive better decision-making, compliance, efficiency and profitability."
      />

      <Reveal className="mb-10">
        <div className="grid gap-6 md:grid-cols-2">
          <CashFlowCurve />
          <CvrChart />
        </div>
      </Reveal>

      <Tabs tabs={REPORTING_TABS} />

      <Reveal delay={0.1} className="mt-6">
        <div className="glass-tan mx-auto flex max-w-3xl items-center gap-3 rounded-2xl p-4">
          <Info className="h-5 w-5 shrink-0 text-bronze-600" />
          <p className="text-sm text-charcoal-500">
            <span className="font-semibold text-charcoal">Worth revising:</span> when is the right time to
            prepare the cash flow? The earlier and more programme-driven the forecast, the more reliable the
            early warning it provides.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
