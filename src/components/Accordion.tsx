import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { AccordionItem } from '../types'
import { getIcon } from '../lib/icons'

interface AccordionProps {
  items: AccordionItem[]
  /** index of the item open by default */
  defaultOpen?: number
}

export default function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen)

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const Icon = getIcon(item.icon)
        const isOpen = open === i
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className={`glass overflow-hidden rounded-3xl transition-shadow duration-300 ${
              isOpen ? 'shadow-glass-lg' : 'hover:shadow-glass-lg'
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7"
            >
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-colors duration-300 ${
                  isOpen ? 'bg-bronze-500 text-cream shadow-bronze' : 'glass-tan text-bronze-700'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-bold text-charcoal sm:text-xl">
                  {item.title}
                </span>
                {item.summary && (
                  <span className="mt-0.5 block text-sm text-charcoal-400">{item.summary}</span>
                )}
              </span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-5 w-5 text-bronze-600" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/50 px-5 py-5 sm:px-7">
                    {item.points.length > 0 && (
                      <ul className="space-y-2.5">
                        {item.points.map((p, idx) => (
                          <li key={idx} className="flex gap-3 text-sm leading-relaxed text-charcoal-600">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-500" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.sub && (
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {item.sub.map((s, si) => (
                          <div key={si} className="neo-inset rounded-2xl p-4">
                            <p className="mb-2 text-sm font-bold text-bronze-700">{s.heading}</p>
                            <ul className="space-y-1.5">
                              {s.items.map((it, ii) => (
                                <li
                                  key={ii}
                                  className="flex gap-2 text-[0.82rem] leading-snug text-charcoal-600"
                                >
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze-400" />
                                  <span>{it}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
