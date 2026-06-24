import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { TabItem } from '../types'
import { getIcon } from '../lib/icons'

interface TabsProps {
  tabs: TabItem[]
}

export default function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(0)
  const pillId = useId()
  const tab = tabs[active]
  const ActiveIcon = getIcon(tab.icon)

  return (
    <div>
      {/* Tab strip */}
      <div className="glass mx-auto mb-8 flex w-full max-w-3xl flex-wrap justify-center gap-1.5 rounded-2xl p-1.5">
        {tabs.map((t, i) => {
          const Icon = getIcon(t.icon)
          const isActive = i === active
          return (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                isActive ? 'text-cream' : 'text-charcoal-500 hover:text-bronze-700'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={`tab-pill-${pillId}`}
                  className="absolute inset-0 rounded-xl bg-bronze-500 shadow-bronze"
                  transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="glass mx-auto max-w-4xl rounded-3xl p-6 sm:p-9"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-bronze-500 text-cream shadow-bronze">
              <ActiveIcon className="h-5 w-5" />
            </span>
            <h3 className="font-display text-2xl font-bold text-charcoal">{tab.label}</h3>
          </div>

          {tab.intro && (
            <p className="mb-5 text-balance leading-relaxed text-charcoal-500">{tab.intro}</p>
          )}

          {tab.points.length > 0 && (
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {tab.points.map((p, i) => (
                <li key={i} className="flex gap-3 rounded-2xl bg-white/40 p-3 text-sm leading-relaxed text-charcoal-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-500" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}

          {tab.sub && (
            <div className="mt-5 space-y-4">
              {tab.sub.map((s, si) => (
                <div key={si} className="neo-inset rounded-2xl p-5">
                  <p className="mb-3 font-display text-base font-bold text-bronze-700">{s.heading}</p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {s.items.map((it, ii) => (
                      <li key={ii} className="flex gap-2.5 text-sm leading-snug text-charcoal-600">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze-400" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
