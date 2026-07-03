import { motion } from 'framer-motion'
import { BRANCHES } from '../../data/contracts'

/* A radial hub mind map — the subject at the centre with six spokes that
   burst outward on load. Tap a spoke to open its detail. Deliberately a
   different shape from the Commercial-Management horizontal tree. */

const CX = 310
const CY = 310
const R = 214
const rad = (d: number) => (d * Math.PI) / 180

function textOn(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62 ? '#2D3436' : '#ffffff'
}

export default function RadialHub({ active, onSelect }: { active: string | null; onSelect: (id: string) => void }) {
  const W = 152
  const H = 54
  return (
    <svg viewBox="0 0 620 620" className="mx-auto w-full max-w-xl" role="img" aria-label="Radial mind map of Contract Practice & Administration. Tap a branch to open its topics.">
      <defs>
        <filter id="bp-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.45" />
        </filter>
        <filter id="bp-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="9" floodColor="#5B7DA6" floodOpacity="0.55" />
        </filter>
        <radialGradient id="c-core" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0%" stopColor="#2b3d4a" />
          <stop offset="100%" stopColor="#141d22" />
        </radialGradient>
        {BRANCHES.map((b) => (
          <linearGradient key={b.id} id={`bp-${b.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={b.color} stopOpacity={0.94} />
            <stop offset="100%" stopColor={b.color} />
          </linearGradient>
        ))}
      </defs>

      {/* faint orbit ring */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(123,160,200,0.16)" strokeWidth={1} strokeDasharray="2 8" />

      {/* spokes */}
      {BRANCHES.map((b, i) => {
        const x = CX + R * Math.cos(rad(b.angle))
        const y = CY + R * Math.sin(rad(b.angle))
        const dim = active && active !== b.id
        return (
          <motion.line
            key={b.id}
            x1={CX}
            y1={CY}
            x2={x}
            y2={y}
            stroke={b.color}
            strokeWidth={active === b.id ? 3.5 : 2}
            strokeOpacity={dim ? 0.22 : 0.6}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.07 }}
          />
        )
      })}

      {/* centre */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 170, damping: 15 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <circle cx={CX} cy={CY} r={82} fill="url(#c-core)" stroke="rgba(123,160,200,0.55)" strokeWidth={1.5} filter="url(#bp-glow)" />
        <text x={CX} y={CY} textAnchor="middle" dominantBaseline="central" fill="#eef2f6" fontFamily="'Fraunces',Georgia,serif" fontWeight={600}>
          <tspan x={CX} dy="-1.35em" fontSize={17}>Contract</tspan>
          <tspan x={CX} dy="1.2em" fontSize={17}>Practice &amp;</tspan>
          <tspan x={CX} dy="1.2em" fontSize={17}>Administration</tspan>
        </text>
      </motion.g>

      {/* branch pills — burst out from the centre */}
      {BRANCHES.map((b, i) => {
        const x = CX + R * Math.cos(rad(b.angle))
        const y = CY + R * Math.sin(rad(b.angle))
        const isA = active === b.id
        const dim = active && !isA
        const tcol = textOn(b.color)
        return (
          <motion.g
            key={b.id}
            initial={{ x: CX, y: CY, opacity: 0 }}
            animate={{ x, y, opacity: dim ? 0.5 : 1 }}
            transition={{ delay: 0.25 + i * 0.07, type: 'spring', stiffness: 110, damping: 13 }}
            onClick={() => onSelect(b.id)}
            style={{ cursor: 'pointer' }}
          >
            <motion.g animate={{ scale: isA ? 1.08 : 1 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <rect
                x={-W / 2}
                y={-H / 2}
                width={W}
                height={H}
                rx={15}
                fill={`url(#bp-${b.id})`}
                stroke={isA ? '#ffffff' : 'rgba(255,255,255,0.5)'}
                strokeWidth={isA ? 2.2 : 1.2}
                filter="url(#bp-soft)"
              />
              <text x={0} y={-3} textAnchor="middle" dominantBaseline="central" fill={tcol} fontFamily="'Baloo 2',sans-serif" fontWeight={700} fontSize={13.5}>
                {b.short}
              </text>
              <text x={0} y={14} textAnchor="middle" dominantBaseline="central" fill={tcol} fontFamily="'Space Mono',monospace" fontWeight={700} fontSize={9} opacity={0.85}>
                {b.topics.length} topics
              </text>
            </motion.g>
          </motion.g>
        )
      })}
    </svg>
  )
}
