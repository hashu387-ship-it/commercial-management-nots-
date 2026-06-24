import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, RefreshCw, Trophy, X } from 'lucide-react'
import { QUIZ } from '../data/content'
import ProgressRing from './ProgressRing'

interface QuizProps {
  onComplete?: () => void
}

export default function Quiz({ onComplete }: QuizProps) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)

  const q = QUIZ[current]
  const score = useMemo(() => answers.filter(Boolean).length, [answers])
  const pct = Math.round((score / QUIZ.length) * 100)

  const choose = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    setAnswers((prev) => [...prev, QUIZ[current].options[i].correct])
  }

  const next = () => {
    if (current + 1 >= QUIZ.length) {
      setFinished(true)
      onComplete?.()
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  const restart = () => {
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
  }

  if (finished) {
    const message =
      pct >= 80 ? 'Outstanding — APC-ready!' : pct >= 50 ? 'Solid effort — review the gaps.' : 'Keep studying — you’ll get there.'
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass mx-auto max-w-lg rounded-3xl p-9 text-center"
      >
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-bronze-500 text-cream shadow-bronze">
          <Trophy className="h-7 w-7" />
        </div>
        <h3 className="font-display text-3xl font-bold text-charcoal">{score} / {QUIZ.length}</h3>
        <p className="mt-2 text-bronze-700">{message}</p>
        <div className="my-6 flex justify-center">
          <ProgressRing percent={pct} size={120} stroke={10} />
        </div>
        <button
          onClick={restart}
          className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 font-semibold text-cream transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg"
        >
          <RefreshCw className="h-4 w-4" /> Try again
        </button>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-6 flex items-center justify-between">
        <span className="chip glass-tan text-bronze-700">
          Question {current + 1} / {QUIZ.length}
        </span>
        <span className="text-sm font-semibold text-charcoal-400">Score: {score}</span>
      </div>
      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-charcoal/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-bronze-300 to-bronze-600"
          animate={{ width: `${(current / QUIZ.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-3xl p-6 sm:p-8"
        >
          <h3 className="mb-6 font-display text-xl font-bold leading-snug text-charcoal sm:text-2xl">
            {q.question}
          </h3>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i
              const revealed = selected !== null
              const state = revealed
                ? opt.correct
                  ? 'correct'
                  : isSelected
                    ? 'wrong'
                    : 'idle'
                : 'idle'
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={revealed}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-300 sm:text-base ${
                    state === 'correct'
                      ? 'border-bronze-500 bg-bronze-500/15 text-charcoal'
                      : state === 'wrong'
                        ? 'border-charcoal-300 bg-charcoal/5 text-charcoal-400 line-through'
                        : 'border-white/60 bg-white/40 text-charcoal-600 hover:-translate-y-0.5 hover:border-bronze-300 hover:shadow-glass disabled:hover:translate-y-0'
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs ${
                      state === 'correct'
                        ? 'bg-bronze-500 text-cream'
                        : state === 'wrong'
                          ? 'bg-charcoal-300 text-cream'
                          : 'bg-charcoal/10 text-charcoal-500'
                    }`}
                  >
                    {state === 'correct' ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : state === 'wrong' ? (
                      <X className="h-3.5 w-3.5" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  <span>{opt.text}</span>
                </button>
              )
            })}
          </div>

          <AnimatePresence>
            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-5 rounded-2xl bg-tan/60 p-4 text-sm leading-relaxed text-charcoal-600">
                  {q.explanation}
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={next}
                    className="inline-flex items-center gap-2 rounded-full bg-bronze-500 px-6 py-3 font-semibold text-cream shadow-bronze transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {current + 1 >= QUIZ.length ? 'See results' : 'Next question'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
