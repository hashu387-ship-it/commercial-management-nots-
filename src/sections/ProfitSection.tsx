import { motion } from 'framer-motion'
import { Boxes, CircleAlert, ListChecks, Sparkles, TrendingUp } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { Pills, Reveal } from '../components/ui'
import { BULK_BUYING, PROFIT_OPPORTUNITIES, PROFIT_RISKS, REGISTERS } from '../data/content'

export default function ProfitSection() {
  return (
    <Section id="profit">
      <SectionHeading
        part={2}
        kicker="Profit Enhancement"
        title="Risks ⚖ Opportunities"
        description="Profit enhancement depends on striking an appropriate balance between the project’s risks and its opportunities."
      />

      {/* Balance scale */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Risks */}
        <Reveal>
          <div className="glass h-full rounded-3xl p-6 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-charcoal text-cream">
                <CircleAlert className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-bold text-charcoal">Risks to manage</h3>
            </div>
            <div className="space-y-3">
              {PROFIT_RISKS.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border-l-4 border-charcoal/40 bg-white/40 p-4"
                >
                  <p className="font-display text-base font-bold text-charcoal">{r.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-charcoal-500">{r.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Opportunities */}
        <Reveal delay={0.08}>
          <div className="glass h-full rounded-3xl p-6 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bronze-500 text-cream shadow-bronze">
                <TrendingUp className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-bold text-charcoal">Opportunities to seize</h3>
            </div>
            <div className="space-y-3">
              {PROFIT_OPPORTUNITIES.map((o, i) => (
                <motion.div
                  key={o.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border-l-4 border-bronze-500 bg-bronze-500/8 p-4"
                >
                  <p className="font-display text-base font-bold text-bronze-700">{o.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-charcoal-500">{o.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bulk buying */}
      <Reveal delay={0.1} className="mt-6">
        <div className="glass-tan rounded-3xl p-6 sm:p-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bronze-500 text-cream shadow-bronze">
              <Boxes className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-charcoal">Bulk Buying Gains</h3>
              <p className="text-sm text-bronze-600">{BULK_BUYING.intro}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BULK_BUYING.conditions.map((c, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl bg-white/50 p-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-bronze-500 text-xs font-bold text-cream">
                  {i + 1}
                </span>
                <p className="text-sm leading-snug text-charcoal-600">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* R&O registers */}
      <Reveal delay={0.12} className="mt-6">
        <div className="glass rounded-3xl p-6 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-charcoal text-cream">
              <ListChecks className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-charcoal">The R&amp;O Register</h3>
              <p className="text-sm text-charcoal-400">{REGISTERS.note}</p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-charcoal-500">
                <CircleAlert className="h-4 w-4 text-charcoal" /> Common Risks
              </p>
              <Pills items={REGISTERS.risks} />
            </div>
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-bronze-700">
                <Sparkles className="h-4 w-4" /> Common Opportunities
              </p>
              <Pills items={REGISTERS.opportunities} tone="bronze" />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
