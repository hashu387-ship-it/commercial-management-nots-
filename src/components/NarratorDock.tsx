import { AnimatePresence, motion } from 'framer-motion'
import { Headphones, Pause, Play, Square, Gauge } from 'lucide-react'
import { useSpeech } from '../audio/speech'
import { NARRATION_ORDER, SECTION_NARRATION, SECTIONS } from '../data/content'

const LABEL: Record<string, string> = Object.fromEntries(SECTIONS.map((s) => [s.id, s.label]))

const RATES = [0.8, 1, 1.2, 1.5]

/** Floating audio narrator: play the whole guide, pause/resume, stop, speed + voice. */
export default function NarratorDock() {
  const { supported, status, activeId, rate, setRate, voices, voiceURI, setVoiceURI, playQueue, pause, resume, stop } =
    useSpeech()

  if (!supported) return null

  const playing = status !== 'idle'

  const playTour = () =>
    playQueue(NARRATION_ORDER.map((id) => ({ id, text: SECTION_NARRATION[id] })))

  return (
    <div className="fixed bottom-4 left-4 z-50 print:hidden">
      <AnimatePresence mode="wait">
        {!playing ? (
          <motion.button
            key="cta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={playTour}
            className="group inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-3 font-note text-sm font-bold text-cream shadow-glass-lg transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Headphones className="h-4 w-4 text-bronze-300" />
            Listen to the guide
          </motion.button>
        ) : (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="glass-dark w-[19rem] rounded-2xl p-4"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-coral/40" />
                <Headphones className="h-4 w-4 text-bronze-200" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-note text-xs font-bold uppercase tracking-wide text-bronze-200">Now narrating</p>
                <p className="truncate font-hand text-xl font-bold leading-none text-cream">
                  {activeId ? LABEL[activeId] ?? 'Section' : '…'}
                </p>
              </div>
            </div>

            {/* Transport */}
            <div className="mb-3 flex items-center gap-2">
              {status === 'paused' ? (
                <button
                  onClick={resume}
                  aria-label="Resume"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-bronze-500 text-cream transition-transform hover:-translate-y-0.5"
                >
                  <Play className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={pause}
                  aria-label="Pause"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-bronze-500 text-cream transition-transform hover:-translate-y-0.5"
                >
                  <Pause className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={stop}
                aria-label="Stop"
                className="grid h-10 w-10 place-items-center rounded-xl bg-cream/15 text-cream transition-transform hover:-translate-y-0.5"
              >
                <Square className="h-4 w-4" />
              </button>

              {/* Speed */}
              <div className="ml-auto flex items-center gap-1 rounded-xl bg-cream/10 px-2 py-1">
                <Gauge className="h-3.5 w-3.5 text-bronze-200" />
                {RATES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRate(r)}
                    className={`rounded-md px-1.5 py-0.5 text-xs font-bold transition-colors ${
                      rate === r ? 'bg-bronze-500 text-cream' : 'text-cream/70 hover:text-cream'
                    }`}
                  >
                    {r}×
                  </button>
                ))}
              </div>
            </div>

            {/* Voice picker */}
            {voices.length > 1 && (
              <label className="block">
                <span className="sr-only">Choose a voice</span>
                <select
                  value={voiceURI ?? ''}
                  onChange={(e) => setVoiceURI(e.target.value)}
                  className="w-full rounded-xl border border-cream/15 bg-charcoal/60 px-3 py-2 text-xs text-cream/90 focus:outline-none"
                >
                  {voices
                    .filter((v) => v.lang.startsWith('en'))
                    .map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                </select>
              </label>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
