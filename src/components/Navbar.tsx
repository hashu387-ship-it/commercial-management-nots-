import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SECTIONS } from '../data/content'
import { getIcon } from '../lib/icons'
import ProgressRing from './ProgressRing'
import type { SectionId } from '../types'

interface NavbarProps {
  active: SectionId
  percent: number
}

export default function Navbar({ active, percent }: NavbarProps) {
  const [open, setOpen] = useState(false)

  const go = (id: SectionId) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 w-[min(96rem,calc(100%-1.5rem))]">
        <nav className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 sm:px-5">
          {/* Brand */}
          <button onClick={() => go('overview')} className="flex items-center gap-3 text-left">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-charcoal text-cream">
              <span className="font-display text-lg font-black text-bronze-300">C</span>
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-sm font-bold text-charcoal">Commercial Management</span>
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-bronze-700">
                Interactive Study
              </span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-0.5 xl:flex">
            {SECTIONS.slice(0, 10).map((s) => {
              const isActive = active === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className={`rounded-lg px-2.5 py-1.5 text-[0.78rem] font-semibold transition-colors duration-300 ${
                    isActive ? 'bg-bronze-500/15 text-bronze-700' : 'text-charcoal-400 hover:text-bronze-700'
                  }`}
                >
                  {s.label}
                </button>
              )
            })}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl glass-tan px-3 py-1.5 sm:flex">
              <ProgressRing percent={percent} size={34} stroke={3.5} />
              <span className="text-[0.7rem] font-semibold text-charcoal-500">Reviewed</span>
            </div>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="grid h-10 w-10 place-items-center rounded-xl glass-tan text-charcoal xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile / tablet drawer */}
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Sections"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="glass mt-2 grid grid-cols-2 gap-1.5 rounded-2xl p-2 sm:grid-cols-3 xl:hidden"
            >
              {SECTIONS.map((s) => {
                const Icon = getIcon(s.icon)
                const isActive = active === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => go(s.id)}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[0.8rem] font-semibold transition-colors ${
                      isActive ? 'bg-bronze-500 text-cream' : 'text-charcoal-500 hover:bg-bronze-500/10'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    <span className="truncate">{s.label}</span>
                  </button>
                )
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
