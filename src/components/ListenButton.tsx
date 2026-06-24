import { Pause, Volume2 } from 'lucide-react'
import { useSpeech } from '../audio/speech'

interface ListenButtonProps {
  id: string
  text: string
  label?: string
}

/** Small inline control that narrates a block of text aloud. */
export default function ListenButton({ id, text, label = 'Listen' }: ListenButtonProps) {
  const { supported, toggle, activeId, status } = useSpeech()
  if (!supported) return null

  const isActive = activeId === id && status !== 'idle'

  return (
    <button
      onClick={() => toggle(id, text)}
      aria-pressed={isActive}
      aria-label={isActive ? 'Stop narration' : `${label} to this section`}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-note text-sm font-bold transition-all duration-300 ${
        isActive
          ? 'bg-coral text-cream shadow-bronze'
          : 'border border-bronze-300/60 bg-white/50 text-bronze-700 hover:-translate-y-0.5 hover:shadow-glass'
      }`}
    >
      {isActive ? (
        <>
          <span className="flex items-end gap-0.5" aria-hidden>
            <span className="h-2.5 w-0.5 animate-pulse rounded bg-cream" style={{ animationDelay: '0ms' }} />
            <span className="h-3.5 w-0.5 animate-pulse rounded bg-cream" style={{ animationDelay: '150ms' }} />
            <span className="h-2 w-0.5 animate-pulse rounded bg-cream" style={{ animationDelay: '300ms' }} />
          </span>
          Stop
        </>
      ) : (
        <>
          <Volume2 className="h-4 w-4" /> {label}
        </>
      )}
      {isActive && status === 'paused' && <Pause className="h-3.5 w-3.5" />}
    </button>
  )
}
