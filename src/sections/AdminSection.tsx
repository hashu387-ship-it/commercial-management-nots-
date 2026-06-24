import { motion } from 'framer-motion'
import { ArrowLeftRight, ClipboardList, FileSignature, GraduationCap } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { Reveal } from '../components/ui'
import { CONTRACT_ADMIN, SECTION_NARRATION } from '../data/content'

export default function AdminSection() {
  return (
    <Section id="admin">
      <SectionHeading
        part={2}
        kicker="Contract Administration"
        title="Closing Out the Contract"
        description={CONTRACT_ADMIN.intro}
        narration={{ id: 'admin', text: SECTION_NARRATION.admin }}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {CONTRACT_ADMIN.items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="glass group rounded-3xl p-6 transition-shadow duration-300 hover:shadow-glass-lg"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bronze-500 text-cream shadow-bronze transition-transform duration-300 group-hover:scale-105">
                {i < 2 ? <ArrowLeftRight className="h-5 w-5" /> : <FileSignature className="h-5 w-5" />}
              </span>
              <h3 className="font-display text-xl font-bold text-charcoal">{item.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-charcoal-500">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Task allocation */}
      <Reveal delay={0.1} className="mt-6">
        <div className="glass-dark flex flex-col gap-5 rounded-3xl p-7 sm:flex-row sm:items-center sm:p-9">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-bronze-500 text-cream shadow-bronze">
            <GraduationCap className="h-7 w-7" />
          </span>
          <div className="flex-1">
            <div className="mb-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-bronze-200">
              <ClipboardList className="h-3.5 w-3.5" /> {CONTRACT_ADMIN.task.title}
            </div>
            <p className="text-sm leading-relaxed text-cream/85">{CONTRACT_ADMIN.task.body}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
