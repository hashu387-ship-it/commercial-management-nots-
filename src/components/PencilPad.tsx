import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Highlighter,
  Eraser,
  Undo2,
  Trash2,
  Download,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react'
import PenNib from './art/PenNib'

/* ────────────────────────────────────────────────────────────────────
   PencilPad — a handwriting notepad you draw on with an Apple Pencil
   (or mouse / finger). Double-tap anywhere to open it (or tap the
   floating button). Pressure-sensitive ink, marker + eraser, multiple
   pages, and everything auto-saves to the browser so your notes survive
   a reload. Long-press to select text still triggers the translator —
   the two gestures don't clash.
   ──────────────────────────────────────────────────────────────────── */

type Tool = 'pen' | 'marker' | 'eraser'
interface Pt { x: number; y: number; p: number }
interface Stroke { tool: Tool; color: string; size: number; pts: Pt[]; w: number; h: number }
interface Page { id: string; strokes: Stroke[] }

const STORE = 'cm-notepad-v1'
const INK = ['#2D3436', '#9E875D', '#D9694C', '#E0A23B', '#7C8C5A', '#8A6491', '#5B7DA6', '#C46B86']
const SIZES: Record<'S' | 'M' | 'L', number> = { S: 2.2, M: 4, L: 7 }

function loadPages(): Page[] {
  try {
    const raw = localStorage.getItem(STORE)
    if (raw) {
      const p = JSON.parse(raw)
      if (Array.isArray(p) && p.length) return p
    }
  } catch {
    /* ignore */
  }
  return [{ id: 'p1', strokes: [] }]
}

function isInteractive(el: EventTarget | null): boolean {
  return !!(el instanceof Element && el.closest('a,button,input,textarea,select,summary,[role="button"],canvas,[data-no-pad]'))
}

/** Replays one stroke onto a 2D context, scaled from its authored size. */
function drawStroke(ctx: CanvasRenderingContext2D, s: Stroke, sx: number, sy: number) {
  if (s.pts.length === 0) return
  ctx.save()
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  if (s.tool === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.strokeStyle = 'rgba(0,0,0,1)'
  } else if (s.tool === 'marker') {
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 0.32
    ctx.strokeStyle = s.color
  } else {
    ctx.globalCompositeOperation = 'source-over'
    ctx.strokeStyle = s.color
  }
  const pts = s.pts
  if (pts.length === 1) {
    const p = pts[0]
    ctx.fillStyle = s.tool === 'eraser' ? 'rgba(0,0,0,1)' : s.color
    ctx.beginPath()
    ctx.arc(p.x * sx, p.y * sy, (s.size * (s.tool === 'marker' ? 3 : 1)) / 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    return
  }
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    const mult = s.tool === 'eraser' ? 6 : s.tool === 'marker' ? 3.4 : 1
    ctx.lineWidth = s.size * mult * (0.55 + b.p)
    ctx.beginPath()
    ctx.moveTo(a.x * sx, a.y * sy)
    const mx = (a.x + b.x) / 2
    const my = (a.y + b.y) / 2
    ctx.quadraticCurveTo(a.x * sx, a.y * sy, mx * sx, my * sy)
    ctx.lineTo(b.x * sx, b.y * sy)
    ctx.stroke()
  }
  ctx.restore()
}

export default function PencilPad() {
  const [open, setOpen] = useState(false)
  const [pages, setPages] = useState<Page[]>(loadPages)
  const [idx, setIdx] = useState(0)
  const [tool, setTool] = useState<Tool>('pen')
  const [color, setColor] = useState(INK[0])
  const [size, setSize] = useState<'S' | 'M' | 'L'>('M')
  const [saved, setSaved] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const drawing = useRef<Stroke | null>(null)
  const dims = useRef({ w: 0, h: 0 })
  // keep latest tool/colour/size for the pointer handlers without re-binding
  const cfg = useRef({ tool, color, size })
  cfg.current = { tool, color, size }
  // latest page strokes ref (so handlers read current page)
  const pagesRef = useRef(pages)
  pagesRef.current = pages
  const idxRef = useRef(idx)
  idxRef.current = idx

  const persist = useCallback((next: Page[]) => {
    try {
      localStorage.setItem(STORE, JSON.stringify(next))
      setSaved(true)
      window.setTimeout(() => setSaved(false), 1100)
    } catch {
      /* ignore quota */
    }
  }, [])

  /* ── set up / size the canvas and redraw the active page ─────────── */
  const redraw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    const { w, h } = dims.current
    ctx.clearRect(0, 0, w, h)
    const page = pagesRef.current[idxRef.current]
    if (!page) return
    for (const s of page.strokes) {
      const sx = s.w ? w / s.w : 1
      const sy = s.h ? h / s.h : 1
      drawStroke(ctx, s, sx, sy)
    }
  }, [])

  const fitCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5)
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctxRef.current = ctx
    dims.current = { w: rect.width, h: rect.height }
    redraw()
  }, [redraw])

  useEffect(() => {
    if (!open) return
    fitCanvas()
    const onResize = () => fitCanvas()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [open, fitCanvas])

  // redraw when the active page changes
  useEffect(() => {
    if (open) redraw()
  }, [open, idx, pages, redraw])

  /* ── double-tap (touch) to open ──────────────────────────────────── */
  useEffect(() => {
    let lastTap = 0
    let lx = 0
    let ly = 0
    const onTouchEnd = (e: TouchEvent) => {
      if (open) return
      const t = e.changedTouches[0]
      if (!t) return
      // don't hijack double-taps on controls, links or active text selections
      if (isInteractive(e.target) || (window.getSelection()?.toString().length ?? 0) > 0) {
        lastTap = 0
        return
      }
      const now = Date.now()
      if (now - lastTap < 330 && Math.hypot(t.clientX - lx, t.clientY - ly) < 32) {
        setOpen(true)
        lastTap = 0
      } else {
        lastTap = now
        lx = t.clientX
        ly = t.clientY
      }
    }
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => document.removeEventListener('touchend', onTouchEnd)
  }, [open])

  /* ── drawing handlers (Pointer Events → pen pressure) ────────────── */
  const pointAt = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect()
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      p: e.pointerType === 'pen' ? Math.max(e.pressure, 0.05) : 0.5,
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    e.preventDefault()
    canvasRef.current?.setPointerCapture(e.pointerId)
    const { tool: tl, color: cl, size: sz } = cfg.current
    const p = pointAt(e)
    drawing.current = { tool: tl, color: cl, size: SIZES[sz], pts: [p], w: dims.current.w, h: dims.current.h }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const cur = drawing.current
    const ctx = ctxRef.current
    if (!cur || !ctx) return
    e.preventDefault()
    const p = pointAt(e)
    cur.pts.push(p)
    // draw just the new segment live (full redraw happens only when needed)
    const n = cur.pts.length
    if (n >= 2) drawStroke(ctx, { ...cur, pts: cur.pts.slice(n - 2) }, 1, 1)
  }

  const endStroke = useCallback(() => {
    const cur = drawing.current
    drawing.current = null
    if (!cur || cur.pts.length === 0) return
    setPages((prev) => {
      const next = prev.map((pg, i) => (i === idxRef.current ? { ...pg, strokes: [...pg.strokes, cur] } : pg))
      persist(next)
      return next
    })
  }, [persist])

  const onPointerUp = (e: React.PointerEvent) => {
    canvasRef.current?.releasePointerCapture?.(e.pointerId)
    endStroke()
  }

  /* ── page + edit actions ─────────────────────────────────────────── */
  const undo = () => {
    setPages((prev) => {
      const next = prev.map((pg, i) =>
        i === idx ? { ...pg, strokes: pg.strokes.slice(0, -1) } : pg,
      )
      persist(next)
      return next
    })
  }
  const clearPage = () => {
    setPages((prev) => {
      const next = prev.map((pg, i) => (i === idx ? { ...pg, strokes: [] } : pg))
      persist(next)
      return next
    })
  }
  const addPage = () => {
    setPages((prev) => {
      const next = [...prev, { id: `p${Date.now()}`, strokes: [] }]
      persist(next)
      return next
    })
    setIdx(pages.length)
  }
  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    // compose on a cream background so the PNG isn't transparent
    const out = document.createElement('canvas')
    out.width = canvas.width
    out.height = canvas.height
    const octx = out.getContext('2d')!
    octx.fillStyle = '#fbf8ef'
    octx.fillRect(0, 0, out.width, out.height)
    octx.drawImage(canvas, 0, 0)
    const a = document.createElement('a')
    a.href = out.toDataURL('image/png')
    a.download = `notes-page-${idx + 1}.png`
    a.click()
  }

  const page = pages[idx]
  const empty = !page || page.strokes.length === 0

  return (
    <>
      {/* Right-edge pen-nib tab (the "notch"). Tap to slide the pad open. */}
      {!open && (
        <button
          data-no-pad
          onClick={() => setOpen(true)}
          aria-label="Open handwriting notepad"
          title="Notepad — write with your pencil (or double-tap anywhere)"
          className="group fixed right-0 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2 rounded-l-2xl border-y border-l border-bronze-300/30 bg-charcoal/95 py-4 pl-3 pr-2.5 text-cream shadow-glass-lg backdrop-blur transition-all duration-300 hover:pr-4"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-b from-bronze-200 to-bronze-500 text-charcoal shadow-inner">
            <PenNib className="h-5 w-5" />
          </span>
          <span className="font-note text-[0.72rem] font-bold uppercase tracking-[0.15em] [writing-mode:vertical-rl]">
            Notes
          </span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-charcoal/40 backdrop-blur-sm" data-no-pad>
          {/* Toolbar */}
          <div className="clay-ui flex flex-wrap items-center gap-2 px-3 py-2.5 sm:px-5" style={{ background: 'transparent' }}>
            <div className="glass flex items-center gap-1 rounded-2xl px-2 py-1.5">
              {(
                [
                  { t: 'pen' as Tool, Icon: PenNib, label: 'Pen' },
                  { t: 'marker' as Tool, Icon: Highlighter, label: 'Marker' },
                  { t: 'eraser' as Tool, Icon: Eraser, label: 'Eraser' },
                ]
              ).map(({ t, Icon, label }) => (
                <button
                  key={t}
                  onClick={() => setTool(t)}
                  aria-label={label}
                  aria-pressed={tool === t}
                  className={`grid h-9 w-9 place-items-center rounded-xl transition ${
                    tool === t ? 'clay-bronze text-cream' : 'text-charcoal-500 hover:text-charcoal'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>

            {/* Colours */}
            <div className="glass flex items-center gap-1.5 rounded-2xl px-2.5 py-2">
              {INK.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setColor(c)
                    if (tool === 'eraser') setTool('pen')
                  }}
                  aria-label={`Ink ${c}`}
                  className="h-6 w-6 rounded-full ring-2 ring-offset-2 ring-offset-cream transition"
                  style={{ backgroundColor: c, boxShadow: color === c ? `0 0 0 2px ${c}` : 'none', outline: color === c ? '2px solid #2D3436' : 'none' }}
                />
              ))}
            </div>

            {/* Sizes */}
            <div className="glass flex items-center gap-1 rounded-2xl px-2 py-1.5">
              {(['S', 'M', 'L'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  aria-label={`Size ${s}`}
                  aria-pressed={size === s}
                  className={`grid h-9 w-9 place-items-center rounded-xl font-mono text-xs font-bold transition ${
                    size === s ? 'clay-bronze text-cream' : 'text-charcoal-500 hover:text-charcoal'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-1.5">
              <button onClick={undo} disabled={empty} aria-label="Undo" className="glass clay-press grid h-9 w-9 place-items-center rounded-xl text-charcoal-600 disabled:opacity-40">
                <Undo2 className="h-4 w-4" />
              </button>
              <button onClick={clearPage} disabled={empty} aria-label="Clear page" className="glass clay-press grid h-9 w-9 place-items-center rounded-xl text-charcoal-600 disabled:opacity-40">
                <Trash2 className="h-4 w-4" />
              </button>
              <button onClick={download} aria-label="Download page" className="glass clay-press grid h-9 w-9 place-items-center rounded-xl text-charcoal-600">
                <Download className="h-4 w-4" />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close notepad" className="clay-coral clay-press grid h-9 w-9 place-items-center rounded-xl text-cream">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Paper / canvas */}
          <div className="relative flex-1 px-2 pb-2 sm:px-5 sm:pb-5">
            <div className="ruled-paper book-stack relative h-full w-full overflow-hidden rounded-[1.75rem] border border-bronze-200/60">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
                style={{ touchAction: 'none', cursor: tool === 'eraser' ? 'cell' : 'crosshair' }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                onPointerCancel={onPointerUp}
              />
              {empty && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
                  <p className="font-hand text-3xl text-bronze-400">Write your notes here ✍️</p>
                  <p className="font-note text-sm text-charcoal-400">Apple Pencil, mouse or finger · everything saves automatically</p>
                </div>
              )}

              {/* save chip */}
              <div
                className={`pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-sage/90 px-3 py-1 font-note text-xs font-bold text-cream transition-opacity duration-300 ${
                  saved ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Check className="h-3.5 w-3.5" /> Saved
              </div>
            </div>
          </div>

          {/* Page controls */}
          <div className="flex items-center justify-center gap-3 pb-3">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              aria-label="Previous page"
              className="glass clay-press grid h-9 w-9 place-items-center rounded-full text-charcoal-600 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-mono text-xs font-bold uppercase tracking-wide text-cream">
              Page {idx + 1} / {pages.length}
            </span>
            <button
              onClick={() => setIdx((i) => Math.min(pages.length - 1, i + 1))}
              disabled={idx >= pages.length - 1}
              aria-label="Next page"
              className="glass clay-press grid h-9 w-9 place-items-center rounded-full text-charcoal-600 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button onClick={addPage} aria-label="Add page" className="clay-sage clay-press inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-note text-sm font-bold text-cream">
              <Plus className="h-4 w-4" /> New page
            </button>
          </div>
        </div>
      )}
    </>
  )
}
