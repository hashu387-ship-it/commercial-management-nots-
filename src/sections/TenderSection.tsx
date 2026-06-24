import { ArrowRight, FileText, Gavel, Wallet } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { BulletList, GlassPanel, Pills, Reveal } from '../components/ui'
import { ADJUDICATION, SUBMISSION } from '../data/content'

export default function TenderSection() {
  return (
    <Section id="tender">
      <SectionHeading
        part={1}
        kicker="Tender Adjudication & Submission"
        title="From Estimate to Offer"
        description="The settlement meeting converts the estimate into a bid; the submission packages it for the client."
      />

      {/* Adjudication */}
      <Reveal>
        <GlassPanel
          className="mb-6"
          title={
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-bronze-500 text-cream shadow-bronze">
                <Gavel className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold text-charcoal">Tender Adjudication</h3>
                <p className="text-sm text-bronze-700">The settlement meeting</p>
              </div>
            </div>
          }
        >
          <p className="text-balance leading-relaxed text-charcoal-500">{ADJUDICATION.purpose}</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="neo-inset rounded-2xl p-5">
              <p className="mb-3 font-display text-base font-bold text-bronze-700">Discussed in the meeting</p>
              <BulletList items={ADJUDICATION.discussed} />
            </div>
            <div className="rounded-2xl bg-white/40 p-5">
              <p className="mb-3 flex items-center gap-2 font-display text-base font-bold text-bronze-700">
                <Wallet className="h-4 w-4" /> Head office overheads (OH)
              </p>
              <Pills items={ADJUDICATION.overheads} />
            </div>
          </div>
        </GlassPanel>
      </Reveal>

      {/* Submission */}
      <Reveal delay={0.08}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass rounded-3xl p-6 sm:p-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-charcoal text-cream">
                <FileText className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-bold text-charcoal">Technical Submission</h3>
            </div>
            <BulletList items={SUBMISSION.technical} />
          </div>

          <div className="glass rounded-3xl p-6 sm:p-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bronze-500 text-cream shadow-bronze">
                <ArrowRight className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-bold text-charcoal">Commercial Submission</h3>
            </div>
            <BulletList items={SUBMISSION.commercial} />
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
