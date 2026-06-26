import { motion } from 'framer-motion'

/* A colourful left-to-right mind map of the whole course hierarchy.
   Built from the real Pre/Post-contract stages so the big picture lands
   before the detail. Pure SVG so it scales crisply on every screen. */

interface Node {
  id: string
  label: string
  cx: number
  cy: number
  w: number
  h: number
  color: string
}

const ROOT: Node = { id: 'root', label: 'Commercial|Management', cx: 138, cy: 320, w: 214, h: 92, color: '#9E875D' }
const PRE_HUB: Node = { id: 'pre', label: 'Part 1 · Pre-Contract', cx: 482, cy: 168, w: 196, h: 60, color: '#5B7DA6' }
const POST_HUB: Node = { id: 'post', label: 'Part 2 · Post-Contract', cx: 482, cy: 474, w: 196, h: 60, color: '#8A6491' }

const PRE = ['Preselection', 'Decision to Tender', 'Project Appreciation', 'Estimating the Works', 'Tender Adjudication', 'Tender Submission']
const POST = ['Profit Enhancement', 'Procurement', 'Reporting', 'Contract Administration']
const LEAF_COLORS = ['#D9694C', '#E0A23B', '#7C8C5A', '#5B7DA6', '#8A6491', '#C46B86', '#B25B3E', '#D98324']

const leaf = (label: string, i: number, y: number): Node => ({
  id: label,
  label,
  cx: 838,
  cy: y,
  w: 224,
  h: 46,
  color: LEAF_COLORS[i % LEAF_COLORS.length],
})

const preLeaves = PRE.map((l, i) => leaf(l, i, 40 + i * 53))
const postLeaves = POST.map((l, i) => leaf(l, i + 3, 384 + i * 56))

function connector(a: Node, b: Node) {
  const x1 = a.cx + a.w / 2
  const y1 = a.cy
  const x2 = b.cx - b.w / 2
  const y2 = b.cy
  const dx = (x2 - x1) / 2
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}

const slug = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '')

/** Pick a legible text colour (dark on light fills, white on dark fills). */
function textOn(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62 ? '#2D3436' : '#ffffff'
}

function wrap(label: string): string[] {
  if (label.includes('|')) return label.split('|')
  if (label.length <= 16) return [label]
  const words = label.split(' ')
  const lines: string[] = ['']
  for (const w of words) {
    if ((lines[lines.length - 1] + ' ' + w).trim().length > 16) lines.push(w)
    else lines[lines.length - 1] = (lines[lines.length - 1] + ' ' + w).trim()
  }
  return lines.slice(0, 2)
}

function NodeBox({ node, delay, big }: { node: Node; delay: number; big?: boolean }) {
  const lines = wrap(node.label)
  const fs = big ? 19 : node.id === 'pre' || node.id === 'post' ? 14 : 13
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 18 }}
      style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
    >
      <rect
        x={node.cx - node.w / 2}
        y={node.cy - node.h / 2}
        width={node.w}
        height={node.h}
        rx={node.h / 2}
        fill={`url(#g-${slug(node.id)})`}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={1.5}
        filter="url(#soft)"
      />
      <text
        x={node.cx}
        y={node.cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill={textOn(node.color)}
        fontFamily="'Baloo 2','Nunito',sans-serif"
        fontWeight={700}
        fontSize={fs}
      >
        {lines.map((ln, i) => (
          <tspan key={i} x={node.cx} dy={i === 0 ? -(lines.length - 1) * (fs * 0.55) : fs * 1.1}>
            {ln}
          </tspan>
        ))}
      </text>
    </motion.g>
  )
}

export default function MindMap({ className = '' }: { className?: string }) {
  const allNodes = [ROOT, PRE_HUB, POST_HUB, ...preLeaves, ...postLeaves]
  const links = [
    connector(ROOT, PRE_HUB),
    connector(ROOT, POST_HUB),
    ...preLeaves.map((n) => connector(PRE_HUB, n)),
    ...postLeaves.map((n) => connector(POST_HUB, n)),
  ]
  const linkColors = ['#5B7DA6', '#8A6491', ...preLeaves.map((n) => n.color), ...postLeaves.map((n) => n.color)]

  return (
    <svg viewBox="0 0 1000 640" className={className} role="img" aria-label="Mind map of the commercial-management course: a root splitting into Part 1 Pre-Contract and Part 2 Post-Contract branches with their stages.">
      <defs>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="5" stdDeviation="5" floodColor="#857049" floodOpacity="0.28" />
        </filter>
        {allNodes.map((n) => (
          <linearGradient key={n.id} id={`g-${slug(n.id)}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={n.color} stopOpacity={0.92} />
            <stop offset="100%" stopColor={n.color} />
          </linearGradient>
        ))}
      </defs>

      {links.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={linkColors[i]}
          strokeOpacity={0.5}
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.04 }}
        />
      ))}

      <NodeBox node={ROOT} delay={0.05} big />
      <NodeBox node={PRE_HUB} delay={0.25} />
      <NodeBox node={POST_HUB} delay={0.3} />
      {preLeaves.map((n, i) => (
        <NodeBox key={n.id} node={n} delay={0.4 + i * 0.06} />
      ))}
      {postLeaves.map((n, i) => (
        <NodeBox key={n.id} node={n} delay={0.55 + i * 0.06} />
      ))}
    </svg>
  )
}
