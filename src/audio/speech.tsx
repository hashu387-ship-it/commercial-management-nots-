import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type Status = 'idle' | 'speaking' | 'paused'

interface SpeechState {
  supported: boolean
  status: Status
  activeId: string | null
  rate: number
  setRate: (r: number) => void
  voices: SpeechSynthesisVoice[]
  voiceURI: string | null
  setVoiceURI: (uri: string) => void
  /** Speak the given text, tagged with an id. Toggles off if the same id is playing. */
  toggle: (id: string, text: string) => void
  /** Speak a queue of {id,text} sequentially (used by the "play tour"). */
  playQueue: (items: { id: string; text: string }[]) => void
  pause: () => void
  resume: () => void
  stop: () => void
}

const Ctx = createContext<SpeechState | null>(null)

/** Split text into speakable chunks (sentence-ish) to dodge the long-utterance cutoff. */
function chunk(text: string): string[] {
  const parts = text.match(/[^.!?]+[.!?]*\s*/g) ?? [text]
  const out: string[] = []
  let buf = ''
  for (const p of parts) {
    if ((buf + p).length > 220) {
      if (buf) out.push(buf.trim())
      buf = p
    } else {
      buf += p
    }
  }
  if (buf.trim()) out.push(buf.trim())
  return out
}

export function SpeechProvider({ children }: { children: ReactNode }) {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [status, setStatus] = useState<Status>('idle')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [rate, setRate] = useState(1)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [voiceURI, setVoiceURI] = useState<string | null>(null)

  // Live refs so async utterance callbacks read current values.
  const queueRef = useRef<{ id: string; text: string }[]>([])
  const chunksRef = useRef<string[]>([])
  const cancelledRef = useRef(false)
  const rateRef = useRef(rate)
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null)
  rateRef.current = rate

  // Load voices (async on most browsers).
  useEffect(() => {
    if (!supported) return
    const load = () => {
      const v = window.speechSynthesis.getVoices()
      if (v.length) {
        setVoices(v)
        setVoiceURI((prev) => {
          if (prev) return prev
          const en = v.find((x) => /^en[-_]?GB/i.test(x.lang)) ?? v.find((x) => x.lang.startsWith('en')) ?? v[0]
          return en?.voiceURI ?? null
        })
      }
    }
    load()
    window.speechSynthesis.addEventListener('voiceschanged', load)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load)
  }, [supported])

  useEffect(() => {
    voiceRef.current = voices.find((v) => v.voiceURI === voiceURI) ?? null
  }, [voices, voiceURI])

  // Keep-alive: Chrome pauses long synthesis after ~15s.
  useEffect(() => {
    if (!supported) return
    const t = setInterval(() => {
      const s = window.speechSynthesis
      if (s.speaking && !s.paused) {
        s.pause()
        s.resume()
      }
    }, 10000)
    return () => clearInterval(t)
  }, [supported])

  // Stop any narration when the tab is hidden / page unloads.
  useEffect(() => {
    if (!supported) return
    const onHide = () => {
      if (document.hidden) {
        cancelledRef.current = true
        window.speechSynthesis.cancel()
        setStatus('idle')
        setActiveId(null)
      }
    }
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('beforeunload', () => window.speechSynthesis.cancel())
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [supported])

  const speakChunks = useCallback(() => {
    if (!supported) return
    const next = chunksRef.current.shift()
    if (next == null) {
      // current item finished → advance the queue
      const nextItem = queueRef.current.shift()
      if (!nextItem || cancelledRef.current) {
        setStatus('idle')
        setActiveId(null)
        return
      }
      setActiveId(nextItem.id)
      chunksRef.current = chunk(nextItem.text)
      speakChunks()
      return
    }
    const u = new SpeechSynthesisUtterance(next)
    u.rate = rateRef.current
    u.pitch = 1
    if (voiceRef.current) {
      u.voice = voiceRef.current
      u.lang = voiceRef.current.lang
    }
    u.onend = () => {
      if (!cancelledRef.current) speakChunks()
    }
    u.onerror = () => {
      if (!cancelledRef.current) speakChunks()
    }
    window.speechSynthesis.speak(u)
  }, [supported])

  const start = useCallback(
    (items: { id: string; text: string }[]) => {
      if (!supported || items.length === 0) return
      cancelledRef.current = true
      window.speechSynthesis.cancel()
      // restart on the next tick so cancel fully clears
      window.setTimeout(() => {
        cancelledRef.current = false
        const [first, ...rest] = items
        queueRef.current = rest
        chunksRef.current = chunk(first.text)
        setActiveId(first.id)
        setStatus('speaking')
        speakChunks()
      }, 60)
    },
    [supported, speakChunks],
  )

  const stop = useCallback(() => {
    if (!supported) return
    cancelledRef.current = true
    queueRef.current = []
    chunksRef.current = []
    window.speechSynthesis.cancel()
    setStatus('idle')
    setActiveId(null)
  }, [supported])

  const toggle = useCallback(
    (id: string, text: string) => {
      if (activeId === id && status !== 'idle') {
        stop()
      } else {
        start([{ id, text }])
      }
    },
    [activeId, status, start, stop],
  )

  const playQueue = useCallback((items: { id: string; text: string }[]) => start(items), [start])

  const pause = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.pause()
    setStatus('paused')
  }, [supported])

  const resume = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.resume()
    setStatus('speaking')
  }, [supported])

  const value = useMemo<SpeechState>(
    () => ({
      supported,
      status,
      activeId,
      rate,
      setRate,
      voices,
      voiceURI,
      setVoiceURI,
      toggle,
      playQueue,
      pause,
      resume,
      stop,
    }),
    [supported, status, activeId, rate, voices, voiceURI, toggle, playQueue, pause, resume, stop],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useSpeech(): SpeechState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useSpeech must be used within a SpeechProvider')
  return ctx
}
