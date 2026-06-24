import { GraduationCap, Mail, Globe } from 'lucide-react'
import { COURSE } from '../data/content'

export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-8">
      <div className="mx-auto max-w-6xl">
        <div className="glass-dark overflow-hidden rounded-[2rem] p-8 sm:p-12">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1.5 text-xs font-semibold text-bronze-200">
                <GraduationCap className="h-3.5 w-3.5" /> {COURSE.programme}
              </div>
              <h3 className="font-display text-3xl font-bold leading-tight text-cream">
                {COURSE.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/70">
                A study companion distilled from the presentation notes of {COURSE.author}. Use it to
                rehearse the pre-contract and post-contract commercial management workflow for your APC.
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-200">Presented by</p>
              <p className="mt-2 font-display text-xl font-bold text-cream">{COURSE.author}</p>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-cream/60">{COURSE.credentials}</p>
              <div className="mt-5 flex flex-wrap gap-2 md:justify-end">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1.5 text-xs text-cream/80">
                  <Globe className="h-3.5 w-3.5" /> apccoaching.me
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1.5 text-xs text-cream/80">
                  <Mail className="h-3.5 w-3.5" /> admin@apccoaching.me
                </span>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row">
            <span>Interactive study experience · Built for revision purposes.</span>
            <span>RICS · AIQS · Commercial Management of Construction Works</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
