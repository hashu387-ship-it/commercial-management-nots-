import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Maximize2, RotateCcw } from 'lucide-react'
import { MIND_MAP, DEFAULT_OPEN, LEGEND, type MNode } from '../../data/mindmap'

/* One big, explorable, colour-coded mind map. Tap any branch to drill into
   the exam detail (what's included, qualifications, exclusions, risks…).
   Built as an animated SVG tree with an expand/collapse layout. */

const COL = 238
const ROW = 36

const splitLines = (label: string) => (label.includes('|') ? label.split('|') : [label])
const pillW = (label: string) => {
  const longest = Math.max(...splitLines(label).map((s) => s.length))
  return Math.min(Math.max(longest * 7.1 + 30, 96), 210)
}
const pillH = (label: string) => (splitLines(label).length > 1 ? 48 : 32)

function textOn(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62 ? '#2D3436' : '#ffffff'
}
const slug = (hex: string) => hex.replace('#', '')

interface Placed {
  node: MNode
  depth: number
  x: number
  y: number
  w: number
  h: number
  open: boolean
  hasKids: boolean
}

function collectExpandable(node: MNode, acc: string[] = []): string[] {
  if (node.children?.length) {
    acc.push(node.id)
    node.children.forEach((c) => collectExpandable(c, acc))
  }
  return acc
}

export default function InteractiveMindMap({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(DEFAULT_OPEN))

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const { placed, links, width, height, colors } = useMemo(() => {
    const placed: Placed[] = []
    const links: { from: Placed; to: Placed }[] = []
    const colorSet = new Set<string>()
    let leafY = 0
    let maxRight = 0

    const walk = (node: MNode, depth: number): Placed => {
      colorSet.add(node.color)
      const isOpen = open.has(node.id)
      const kids = isOpen && node.children ? node.children : []
      let y: number
      let childPos: Placed[] = []
      if (kids.length === 0) {
        y = leafY * ROW
        leafY += 1
      } else {
        childPos = kids.map((k) => walk(k, depth + 1))
        y = (childPos[0].y + childPos[childPos.length - 1].y) / 2
      }
      const w = pillW(node.label)
      const pos: Placed = {
        node,
        depth,
        x: depth * COL,
        y,
        w,
        h: pillH(node.label),
        open: isOpen,
        hasKids: !!node.children?.length,
      }
      maxRight = Math.max(maxRight, pos.x + w)
      placed.push(pos)
      childPos.forEach((cp) => links.push({ from: pos, to: cp }))
      return pos
    }
    walk(MIND_MAP, 0)
    return {
      placed,
      links,
      width: maxRight + 36,
      height: Math.max(leafY, 1) * ROW + 48,
      colors: [...colorSet],
    }
  }, [open])

  const PAD = 24

  return (
    <div className={className}>
      {/* controls */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setOpen(new Set(collectExpandable(MIND_MAP)))}
          className="clay-sm clay-press inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-note text-xs font-bold text-charcoal-600"
        >
          <Maximize2 className="h-3.5 w-3.5" /> Expand all
        </button>
        <button
          onClick={() => setOpen(new Set(DEFAULT_OPEN))}
          className="clay-sm clay-press inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-note text-xs font-bold text-charcoal-600"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
        <span className="ml-auto font-note text-xs text-charcoal-400">tap a branch to open ▸</span>
      </div>

      {/* legend */}
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {LEGEND.map((l) => (
          <span key={l.label} className="inline-flex items-center gap-1.5 font-note text-xs font-bold text-charcoal-500">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: l.color }} />
            {l.label}
          </span>
        ))}
      </div>

      {/* scrollable canvas */}
      <div className="clay-inset overflow-auto rounded-2xl p-2" style={{ maxHeight: '74vh' }}>
        <svg
          width={width + PAD * 2}
          height={height + PAD * 2}
          viewBox={`${-PAD} ${-PAD} ${width + PAD * 2} ${height + PAD * 2}`}
          role="img"
          aria-label="Interactive mind map of the commercial-management course. Tap a branch to expand its detail."
          style={{ display: 'block' }}
        >
          <defs>
            <filter id="mm-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#857049" floodOpacity="0.3" />
            </filter>
            {colors.map((c) => (
              <linearGradient key={c} id={`g-${slug(c)}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c} stopOpacity={0.92} />
                <stop offset="100%" stopColor={c} />
              </linearGradient>
            ))}
          </defs>

          {/* connectors */}
          <AnimatePresence>
            {links.map(({ from, to }) => {
              const x1 = from.x + from.w
              const y1 = from.y
              const x2 = to.x
              const y2 = to.y
              const dx = (x2 - x1) / 2
              return (
                <motion.path
                  key={`${from.node.id}>${to.node.id}`}
                  d={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
                  fill="none"
                  stroke={to.node.color}
                  strokeOpacity={0.55}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                />
              )
            })}
          </AnimatePresence>

          {/* nodes */}
          <AnimatePresence>
            {placed.map((p) => {
              const big = p.depth === 0
              const lines = splitLines(p.node.label)
              const fs = big ? 16 : p.depth === 1 ? 13.5 : 12.5
              const tcol = textOn(p.node.color)
              return (
                <g key={p.node.id} transform={`translate(${p.x},${p.y})`}>
                  <motion.g
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center', cursor: p.hasKids ? 'pointer' : 'default' }}
                    onClick={() => p.hasKids && toggle(p.node.id)}
                  >
                    <rect
                      x={0}
                      y={-p.h / 2}
                      width={p.w}
                      height={p.h}
                      rx={p.h / 2}
                      fill={`url(#g-${slug(p.node.color)})`}
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth={1.4}
                      filter="url(#mm-soft)"
                    />
                    <text
                      x={p.hasKids ? p.w / 2 - 8 : p.w / 2}
                      y={0}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={tcol}
                      fontFamily="'Baloo 2','Nunito',sans-serif"
                      fontWeight={700}
                      fontSize={fs}
                    >
                      {lines.map((ln, i) => (
                        <tspan key={i} x={(p.hasKids ? p.w / 2 - 8 : p.w / 2)} dy={i === 0 ? -(lines.length - 1) * (fs * 0.56) : fs * 1.12}>
                          {ln}
                        </tspan>
                      ))}
                    </text>
                    {p.hasKids && (
                      <g transform={`translate(${p.w - 17},0)`} pointerEvents="none">
                        <circle r={9} fill={tcol === '#ffffff' ? 'rgba(255,255,255,0.22)' : 'rgba(45,52,54,0.14)'} />
                        {p.open ? (
                          <Minus x={-6} y={-6} width={12} height={12} color={tcol} />
                        ) : (
                          <Plus x={-6} y={-6} width={12} height={12} color={tcol} />
                        )}
                      </g>
                    )}
                  </motion.g>
                </g>
              )
            })}
          </AnimatePresence>
        </svg>
      </div>
    </div>
  )
}
