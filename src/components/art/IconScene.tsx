import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface IconSceneProps {
  Icon: LucideIcon
  accent?: string
  satellites?: LucideIcon[]
  className?: string
}

/**
 * A "suitable image" generator for slides: a large central icon in a
 * tactile medallion, ringed by smaller related icons and hand-drawn
 * accents. Palette-only, scales crisply on iPad.
 */
export default function IconScene({ Icon, accent = '#9E875D', satellites = [], className = '' }: IconSceneProps) {
  const sats = satellites.slice(0, 4)
  return (
    <div className={`relative grid aspect-[4/3] w-full place-items-center ${className}`}>
      {/* soft backdrop */}
      <div
        className="absolute inset-6 rounded-[2rem] opacity-70 blur-2xl"
        style={{ background: `radial-gradient(60% 60% at 50% 45%, ${accent}33, transparent 70%)` }}
      />
      {/* dotted orbit */}
      <svg viewBox="0 0 300 230" className="absolute inset-0 h-full w-full" aria-hidden>
        <ellipse
          cx="150"
          cy="115"
          rx="110"
          ry="86"
          fill="none"
          stroke={accent}
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeDasharray="3 9"
          strokeLinecap="round"
        />
      </svg>

      {/* central medallion */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 14 }}
        className="neo relative grid h-28 w-28 place-items-center rounded-[1.75rem] sm:h-32 sm:w-32"
      >
        <span
          className="grid h-20 w-20 place-items-center rounded-[1.25rem] text-cream shadow-bronze sm:h-24 sm:w-24"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
        >
          <Icon className="h-9 w-9 sm:h-11 sm:w-11" />
        </span>
      </motion.div>

      {/* satellites */}
      {sats.map((Sat, i) => {
        const angle = (-90 + (360 / Math.max(sats.length, 1)) * i) * (Math.PI / 180)
        const x = 50 + Math.cos(angle) * 38
        const y = 50 + Math.sin(angle) * 40
        return (
          <motion.span
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 180, damping: 12 }}
            className="glass absolute grid h-11 w-11 place-items-center rounded-2xl sm:h-12 sm:w-12"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', color: accent }}
          >
            <Sat className="h-5 w-5" />
          </motion.span>
        )
      })}
    </div>
  )
}
