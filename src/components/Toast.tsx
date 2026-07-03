import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Info, Trash2, Download } from 'lucide-react'

/* ────────────────────────────────────────────────────────────────────
   A tiny, tasteful toast layer (Sonner-inspired). One import: call
   `toast('Saved')` from anywhere; `<Toaster />` renders + animates them.
   Springy, self-dismissing, palette-only, with an optional inline action.
   ──────────────────────────────────────────────────────────────────── */

type ToastIcon = 'check' | 'info' | 'trash' | 'download'
export interface ToastItem {
  id: number
  message: string
  icon?: ToastIcon
  action?: { label: string; onClick: () => void }
  duration: number
}

let items: ToastItem[] = []
let seq = 0
const listeners = new Set<(t: ToastItem[]) => void>()
const emit = () => listeners.forEach((l) => l(items))

function dismiss(id: number) {
  items = items.filter((t) => t.id !== id)
  emit()
}

export function toast(
  message: string,
  opts: { icon?: ToastIcon; action?: { label: string; onClick: () => void }; duration?: number } = {},
) {
  const id = ++seq
  const item: ToastItem = { id, message, icon: opts.icon, action: opts.action, duration: opts.duration ?? 2400 }
  items = [...items.slice(-2), item] // keep at most 3 stacked
  emit()
  window.setTimeout(() => dismiss(id), item.duration)
  return id
}

const ICONS: Record<ToastIcon, typeof Check> = { check: Check, info: Info, trash: Trash2, download: Download }

export default function Toaster() {
  const [list, setList] = useState<ToastItem[]>(items)
  useEffect(() => {
    listeners.add(setList)
    return () => {
      listeners.delete(setList)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[95] flex flex-col items-center gap-2 px-4 sm:bottom-8">
      <AnimatePresence>
        {list.map((t) => {
          const Icon = t.icon ? ICONS[t.icon] : null
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96, transition: { duration: 0.18 } }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              className="pointer-events-auto flex items-center gap-2.5 rounded-2xl border border-white/10 bg-charcoal-700/95 px-4 py-2.5 text-cream shadow-glass-lg backdrop-blur"
            >
              {Icon && (
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage/90 text-cream">
                  <Icon className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
              <span className="font-note text-sm font-bold">{t.message}</span>
              {t.action && (
                <button
                  onClick={() => {
                    t.action!.onClick()
                    dismiss(t.id)
                  }}
                  className="ml-1.5 rounded-full bg-cream/15 px-2.5 py-0.5 font-note text-xs font-bold text-bronze-200 transition-colors hover:bg-cream/25"
                >
                  {t.action.label}
                </button>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
