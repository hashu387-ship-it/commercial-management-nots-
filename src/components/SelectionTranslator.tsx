import { useCallback, useEffect, useRef, useState } from 'react'
import { Languages, Loader2, Volume2, X } from 'lucide-react'

interface Popover {
  word: string
  x: number
  y: number
  above: boolean
}

const cache = new Map<string, string>()

/** Looks plausible as an English word/short phrase worth translating. */
function isTranslatable(s: string): boolean {
  if (!s) return false
  if (s.length < 2 || s.length > 40) return false
  if (!/[a-zA-Z]/.test(s)) return false
  if (s.split(/\s+/).length > 4) return false
  return true
}

async function translate(word: string): Promise<string> {
  const key = word.toLowerCase()
  const hit = cache.get(key)
  if (hit) return hit
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|ta`
  const res = await fetch(url)
  if (!res.ok) throw new Error('translation failed')
  const data = await res.json()
  const out = (data?.responseData?.translatedText as string) || ''
  if (out) cache.set(key, out)
  return out
}

/**
 * Select any English word/phrase anywhere in the app → a Tamil translation
 * bubble appears next to it. Works in both Deck and Explore modes.
 */
export default function SelectionTranslator() {
  const [pop, setPop] = useState<Popover | null>(null)
  const [tamil, setTamil] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setPop(null)
    setTamil('')
    setErr(false)
  }, [])

  const onSelect = useCallback(() => {
    const sel = window.getSelection()
    const text = sel?.toString().trim() ?? ''
    // ignore selections inside our own popover
    if (boxRef.current && sel && sel.anchorNode && boxRef.current.contains(sel.anchorNode)) return
    if (!isTranslatable(text) || !sel || sel.rangeCount === 0) {
      return
    }
    const rect = sel.getRangeAt(0).getBoundingClientRect()
    if (rect.width === 0 && rect.height === 0) return
    const above = rect.top > 140
    setPop({
      word: text,
      x: Math.min(Math.max(rect.left + rect.width / 2, 120), window.innerWidth - 120),
      y: above ? rect.top - 10 : rect.bottom + 10,
      above,
    })
  }, [])

  useEffect(() => {
    const handler = () => window.setTimeout(onSelect, 10)
    document.addEventListener('mouseup', handler)
    document.addEventListener('touchend', handler)
    return () => {
      document.removeEventListener('mouseup', handler)
      document.removeEventListener('touchend', handler)
    }
  }, [onSelect])

  // fetch translation whenever the popover word changes
  useEffect(() => {
    if (!pop) return
    let live = true
    setLoading(true)
    setErr(false)
    setTamil('')
    translate(pop.word)
      .then((t) => {
        if (live) setTamil(t)
      })
      .catch(() => {
        if (live) setErr(true)
      })
      .finally(() => {
        if (live) setLoading(false)
      })
    return () => {
      live = false
    }
  }, [pop])

  // close on scroll / escape
  useEffect(() => {
    if (!pop) return
    const onScroll = () => close()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('keydown', onKey)
    }
  }, [pop, close])

  const speak = () => {
    if (!('speechSynthesis' in window) || !tamil) return
    const u = new SpeechSynthesisUtterance(tamil)
    u.lang = 'ta-IN'
    const v = window.speechSynthesis.getVoices().find((x) => x.lang.startsWith('ta'))
    if (v) u.voice = v
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(u)
  }

  if (!pop) return null

  return (
    <div
      ref={boxRef}
      role="dialog"
      aria-label="Tamil translation"
      className="fixed z-[70] -translate-x-1/2 select-none"
      style={{ left: pop.x, top: pop.y, transform: `translate(-50%, ${pop.above ? '-100%' : '0'})` }}
    >
      <div className="glass-dark relative w-[15rem] rounded-2xl p-3.5 shadow-glass-lg">
        <button
          onClick={close}
          aria-label="Close translation"
          className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-cream/15 text-cream/80 hover:bg-cream/25"
        >
          <X className="h-3.5 w-3.5" />
        </button>
        <p className="mb-1.5 flex items-center gap-1.5 font-note text-xs font-bold uppercase tracking-wide text-bronze-200">
          <Languages className="h-3.5 w-3.5" /> English → தமிழ்
        </p>
        <p className="truncate text-sm font-semibold text-cream/85">{pop.word}</p>
        <div className="mt-1 min-h-[1.75rem]">
          {loading ? (
            <span className="flex items-center gap-2 text-cream/70">
              <Loader2 className="h-4 w-4 animate-spin" /> <span className="text-sm">translating…</span>
            </span>
          ) : err ? (
            <span className="text-sm text-coral">Couldn’t translate — check connection.</span>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <span className="text-xl font-bold leading-tight text-cream" style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}>
                {tamil || '—'}
              </span>
              {tamil && (
                <button
                  onClick={speak}
                  aria-label="Pronounce in Tamil"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-bronze-500 text-cream"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
        {/* pointer */}
        <span
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-charcoal-800"
          style={pop.above ? { bottom: -6 } : { top: -6 }}
          aria-hidden
        />
      </div>
    </div>
  )
}
