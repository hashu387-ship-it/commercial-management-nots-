import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  LayoutGrid,
  ListTree,
  Maximize,
  Minimize,
  Square,
  X,
} from 'lucide-react'
import Slide from './Slide'
import { SLIDES } from './slides'
import { slideSpeech } from './narration'
import { useSpeech } from '../audio/speech'

const STORAGE_KEY = 'cm-deck-slide-v1'

export default function Deck({ onExit }: { onExit: () => void }) {
  const total = SLIDES.length
  const [current, setCurrent] = useState(() => {
    const n = Number(localStorage.getItem(STORAGE_KEY))
    return Number.isFinite(n) && n >= 0 && n < total ? n : 0
  })
  const [dir, setDir] = useState(1)
  const [contents, setContents] = useState(false)
  const [fs, setFs] = useState(false)
  const touchX = useRef<number | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef(current)
  currentRef.current = current

  const speech = useSpeech()
  const narrating = speech.supported && speech.status !== 'idle'

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(current))
    } catch {
      /* ignore */
    }
  }, [current])

  // ── Navigation ──────────────────────────────────────────────
  const setSlide = useCallback(
    (to: number, d: number) => {
      setDir(d)
      setCurrent((c) => {
        const n = Math.max(0, Math.min(total - 1, to))
        return n === c ? c : n
      })
    },
    [total],
  )

  // manual navigation cancels any running narration
  const go = useCallback(
    (to: number, d: number) => {
      if (narrating) speech.stop()
      setSlide(to, d)
    },
    [narrating, speech, setSlide],
  )
  const next = useCallback(() => go(currentRef.current + 1, 1), [go])
  const prev = useCallback(() => go(currentRef.current - 1, -1), [go])

  // ── Narration follows the slide order, auto-advancing the deck ──
  useEffect(() => {
    if (!speech.activeId) return
    const idx = SLIDES.findIndex((s) => s.id === speech.activeId)
    if (idx >= 0 && idx !== currentRef.current) {
      setSlide(idx, idx > currentRef.current ? 1 : -1)
    }
  }, [speech.activeId, setSlide])

  const listen = useCallback(() => {
    if (narrating) {
      speech.stop()
    } else {
      const queue = SLIDES.slice(currentRef.current).map((s) => ({ id: s.id, text: slideSpeech(s) }))
      speech.playQueue(queue)
    }
  }, [narrating, speech])

  // ── Fullscreen / kiosk ──────────────────────────────────────
  const canFs =
    typeof document !== 'undefined' &&
    (document.fullscreenEnabled || Boolean((document as unknown as { webkitFullscreenEnabled?: boolean }).webkitFullscreenEnabled))

  useEffect(() => {
    const onFs = () =>
      setFs(
        Boolean(
          document.fullscreenElement ||
            (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement,
        ),
      )
    document.addEventListener('fullscreenchange', onFs)
    document.addEventListener('webkitfullscreenchange', onFs as EventListener)
    return () => {
      document.removeEventListener('fullscreenchange', onFs)
      document.removeEventListener('webkitfullscreenchange', onFs as EventListener)
    }
  }, [])

  const toggleFs = useCallback(() => {
    const el = rootRef.current as unknown as { requestFullscreen?: () => Promise<void>; webkitRequestFullscreen?: () => void } | null
    const doc = document as unknown as { webkitExitFullscreen?: () => void; webkitFullscreenElement?: Element }
    const isFs = document.fullscreenElement || doc.webkitFullscreenElement
    if (isFs) {
      ;(document.exitFullscreen?.bind(document) || doc.webkitExitFullscreen?.bind(doc))?.()
    } else if (el) {
      ;(el.requestFullscreen?.bind(el) || el.webkitRequestFullscreen?.bind(el))?.()
    }
  }, [])

  // ── Keyboard ────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (contents) {
        if (e.key === 'Escape') setContents(false)
        return
      }
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') go(0, -1)
      else if (e.key === 'End') go(total - 1, 1)
      else if (e.key.toLowerCase() === 'f') toggleFs()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, total, contents, toggleFs])

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.changedTouches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 55) (dx < 0 ? next : prev)()
    touchX.current = null
  }

  const slide = SLIDES[current]
  const part = slide.part
  const partColor = part === 1 ? '#9E875D' : part === 2 ? '#8A6491' : '#7C8C5A'

  return (
    <div ref={rootRef} className="flex h-[100dvh] flex-col bg-cream">
      {/* Top bar */}
      <header className="flex items-center justify-between gap-2 px-3 pt-3 sm:px-5">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 rounded-xl glass-tan px-3 py-2 font-note text-sm font-bold text-charcoal-600 transition-transform hover:-translate-y-0.5"
        >
          <LayoutGrid className="h-4 w-4 text-bronze-700" />
          <span className="hidden sm:inline">Explore</span>
        </button>

        <div className="flex items-center gap-2">
          <span
            className="hidden rounded-full px-3 py-1 font-note text-xs font-bold text-cream sm:inline"
            style={{ background: partColor }}
          >
            {part === 1 ? 'Part 1 · Pre-Contract' : part === 2 ? 'Part 2 · Post-Contract' : 'Overview'}
          </span>

          <button
            onClick={listen}
            aria-label={narrating ? 'Stop narration' : 'Listen from here'}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 font-note text-sm font-bold transition-transform hover:-translate-y-0.5 ${
              narrating ? 'bg-coral text-cream' : 'glass-tan text-charcoal-600'
            }`}
          >
            {narrating ? <Square className="h-4 w-4" /> : <Headphones className="h-4 w-4 text-bronze-700" />}
            <span className="hidden sm:inline">{narrating ? 'Stop' : 'Listen'}</span>
          </button>

          {canFs && (
            <button
              onClick={toggleFs}
              aria-label={fs ? 'Exit fullscreen' : 'Fullscreen'}
              className="grid h-9 w-9 place-items-center rounded-xl glass-tan text-charcoal-600 transition-transform hover:-translate-y-0.5"
            >
              {fs ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
          )}

          <button
            onClick={() => setContents(true)}
            aria-label="Slide contents"
            className="grid h-9 w-9 place-items-center rounded-xl glass-tan text-charcoal-600 transition-transform hover:-translate-y-0.5"
          >
            <ListTree className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* progress */}
      <div className="mx-3 mt-2 h-1.5 overflow-hidden rounded-full bg-charcoal/10 sm:mx-5">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg,#C6B083,#6A5938)' }}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>

      {/* Slide stage */}
      <main
        className="relative flex flex-1 items-stretch justify-center overflow-hidden px-2 py-3 sm:px-4"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative w-full max-w-[880px]">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={slide.id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 80, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: dir * -80, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="absolute inset-0"
            >
              <Slide slide={slide} index={current} total={total} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* side arrows */}
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous slide"
          className="absolute left-1 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full glass p-2 text-charcoal-600 transition-transform hover:-translate-y-[calc(50%+2px)] disabled:opacity-30 sm:grid"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={next}
          disabled={current === total - 1}
          aria-label="Next slide"
          className="absolute right-1 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full glass p-2 text-charcoal-600 transition-transform hover:-translate-y-[calc(50%+2px)] disabled:opacity-30 sm:grid"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </main>

      {/* Bottom controls */}
      <footer className="flex items-center gap-3 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-1 sm:px-5">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl glass-tan py-3.5 font-note font-bold text-charcoal-600 transition-transform hover:-translate-y-0.5 disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" /> Prev
        </button>
        <span className="font-note text-sm font-bold text-charcoal-400">
          {current + 1} / {total}
        </span>
        <button
          onClick={next}
          disabled={current === total - 1}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-bronze-500 py-3.5 font-note font-bold text-cream shadow-bronze transition-transform hover:-translate-y-0.5 disabled:opacity-40"
        >
          Next <ChevronRight className="h-5 w-5" />
        </button>
      </footer>

      {/* Contents drawer */}
      <AnimatePresence>
        {contents && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
            onClick={() => setContents(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col bg-cream shadow-glass-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-bronze-200/60 px-4 py-3">
                <p className="font-hand text-2xl font-bold text-charcoal">Slides</p>
                <button onClick={() => setContents(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-xl glass-tan">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-2">
                {SLIDES.map((s, i) => {
                  const active = i === current
                  const c = s.part === 1 ? '#9E875D' : s.part === 2 ? '#8A6491' : '#7C8C5A'
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        go(i, i > current ? 1 : -1)
                        setContents(false)
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        active ? 'bg-bronze-500/15' : 'hover:bg-bronze-500/8'
                      }`}
                    >
                      <span
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold text-cream"
                        style={{ background: c }}
                      >
                        {i + 1}
                      </span>
                      <span className={`truncate text-sm ${active ? 'font-bold text-charcoal' : 'text-charcoal-600'}`}>
                        {s.title}
                      </span>
                    </button>
                  )
                })}
              </nav>
              <div className="border-t border-bronze-200/60 p-3">
                <button
                  onClick={onExit}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-charcoal py-3 font-note font-bold text-cream"
                >
                  <LayoutGrid className="h-4 w-4 text-bronze-300" /> Open Explore mode
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
