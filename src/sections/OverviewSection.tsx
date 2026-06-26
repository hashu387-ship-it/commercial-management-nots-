import { Shield, Sparkles, Target, Clock } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { BulletList, GlassPanel, Reveal } from '../components/ui'
import LectureNotes from '../components/LectureNotes'
import InteractiveMindMap from '../components/art/InteractiveMindMap'
import { SECTION_NARRATION, WHAT_WHY } from '../data/content'

export default function OverviewSection() {
  return (
    <Section id="overview">
      <SectionHeading
        kicker="The Foundation"
        title="What & Why"
        description="Before the tools and techniques, fix the purpose of commercial management firmly in mind."
        narration={{ id: 'overview', text: SECTION_NARRATION.overview }}
      />

      {/* The whole course as one explorable, colour-coded mind map */}
      <Reveal className="mb-8">
        <GlassPanel>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-clay text-2xl font-bold text-charcoal">The big picture — one map to memorise it all</h3>
            <span className="chip bg-sky/15 font-note font-bold text-sky">interactive mind map</span>
          </div>
          <p className="mb-4 font-note text-sm text-charcoal-400">
            One subject, two halves — secure the profit before the contract, then enhance it after. Tap any
            branch to open its detail: what each stage includes, its risks, qualifications and exclusions, all
            colour-coded so it sticks.
          </p>
          <InteractiveMindMap />
        </GlassPanel>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* What */}
        <Reveal>
          <GlassPanel
            className="h-full"
            title={
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-bronze-500 text-cream shadow-bronze">
                  <Target className="h-5 w-5" />
                </span>
                <h3 className="font-display text-2xl font-bold text-charcoal">What is it?</h3>
              </div>
            }
          >
            <p className="text-balance text-lg leading-relaxed text-charcoal-500">{WHAT_WHY.what}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border-2 border-dashed border-sage/50 bg-sage/10 p-4 text-center">
                <Shield className="mx-auto mb-2 h-5 w-5 text-sage" />
                <p className="font-hand text-2xl font-bold text-charcoal">Secure</p>
                <p className="font-note text-xs text-charcoal-500">the intended profit</p>
              </div>
              <div className="rounded-2xl border-2 border-dashed border-amber/60 bg-amber/10 p-4 text-center">
                <Sparkles className="mx-auto mb-2 h-5 w-5 text-amber" />
                <p className="font-hand text-2xl font-bold text-charcoal">Enhance</p>
                <p className="font-note text-xs text-charcoal-500">the secured profit</p>
              </div>
            </div>
          </GlassPanel>
        </Reveal>

        {/* When */}
        <Reveal delay={0.08}>
          <GlassPanel
            className="h-full"
            title={
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-charcoal text-cream">
                  <Clock className="h-5 w-5" />
                </span>
                <h3 className="font-display text-2xl font-bold text-charcoal">When does it happen?</h3>
              </div>
            }
          >
            <div className="flex gap-3">
              <div className="flex-1 rounded-2xl bg-bronze-500/12 p-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-bronze-700">Part 1</p>
                <p className="mt-1 font-display text-xl font-bold text-charcoal">{WHAT_WHY.whenPre}</p>
              </div>
              <div className="grid place-items-center">
                <span className="font-display text-2xl text-bronze-400">→</span>
              </div>
              <div className="flex-1 rounded-2xl bg-tan/70 p-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-bronze-700">Part 2</p>
                <p className="mt-1 font-display text-xl font-bold text-charcoal">{WHAT_WHY.whenPost}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-charcoal-400">
              Securing and enhancing profitability is a continuum — it begins the moment a tender lands and
              continues until the final account is settled.
            </p>
          </GlassPanel>
        </Reveal>
      </div>

      {/* Rationale */}
      <Reveal delay={0.12} className="mt-6">
        <GlassPanel tone="glass-tan">
          <h3 className="mb-4 font-display text-xl font-bold text-charcoal">
            How does pre-contract management secure <em>and</em> enhance profit?
          </h3>
          <BulletList items={WHAT_WHY.rationale} />
        </GlassPanel>
      </Reveal>

      <LectureNotes id="overview" />
    </Section>
  )
}
