import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { TimelineStage } from '../types'
import { getIcon } from '../lib/icons'

interface TimelineProps {
  stages: TimelineStage[]
}

const NODE_ACCENTS = ['#9E875D', '#7C8C5A', '#5B7DA6', '#E0A23B', '#8A6491', '#D9694C']

export default function Timeline({ stages }: TimelineProps) {
  const [open, setOpen] = useState<string | null>(stages[0]?.id ?? null)

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Spine */}
      <div className="absolute left-[26px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-bronze-300 via-bronze-400/60 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

      <div className="space-y-6">
        {stages.map((stage, i) => {
          const Icon = getIcon(stage.icon)
          const isOpen = open === stage.id
          const onLeft = i % 2 === 0
          const accent = NODE_ACCENTS[i % NODE_ACCENTS.length]
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative pl-16 sm:pl-0"
            >
              {/* Node */}
              <div className="absolute left-0 top-1 z-10 sm:left-1/2 sm:-translate-x-1/2">
                <span
                  className="grid h-[54px] w-[54px] -rotate-3 place-items-center rounded-2xl text-cream shadow-neo-sm ring-4 ring-cream"
                  style={{ backgroundColor: accent }}
                >
                  <Icon className="h-6 w-6" />
                </span>
              </div>

              {/* Card */}
              <div
                className={`sm:w-[calc(50%-2.5rem)] ${
                  onLeft ? 'sm:mr-auto sm:pr-4' : 'sm:ml-auto sm:pl-4'
                }`}
              >
                <div className="glass overflow-hidden rounded-3xl">
                  <button
                    id={`tl-btn-${stage.id}`}
                    onClick={() => setOpen(isOpen ? null : stage.id)}
                    aria-expanded={isOpen}
                    aria-controls={`tl-panel-${stage.id}`}
                    className="flex w-full items-start gap-3 p-5 text-left"
                  >
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-note text-sm font-bold text-cream"
                      style={{ backgroundColor: accent }}
                    >
                      {stage.index}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-bold leading-snug text-charcoal">
                        {stage.title}
                      </span>
                      <span className="mt-0.5 block font-note text-sm font-semibold" style={{ color: accent }}>
                        {stage.tagline}
                      </span>
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="pt-1">
                      <ChevronDown className="h-5 w-5 text-bronze-600" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`tl-panel-${stage.id}`}
                        role="region"
                        aria-labelledby={`tl-btn-${stage.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/50 px-5 py-5">
                          <ul className="space-y-2.5">
                            {stage.points.map((p, idx) => (
                              <li key={idx} className="flex gap-3 text-sm leading-relaxed text-charcoal-600">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-500" />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                          {stage.detail && (
                            <div className="mt-4 space-y-2 rounded-2xl bg-tan/50 p-4">
                              {stage.detail.map((d, idx) => (
                                <p key={idx} className="text-[0.82rem] leading-relaxed text-charcoal-500">
                                  {d}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
