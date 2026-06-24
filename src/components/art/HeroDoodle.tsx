import { motion } from 'framer-motion'

/**
 * A hand-drawn hero illustration: a blueprint / clipboard with a rising
 * profit arrow, gears and coins — the essence of commercial management,
 * sketched in the journal style.
 */
export default function HeroDoodle({ className = '' }: { className?: string }) {
  const draw = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
  }
  return (
    <svg viewBox="0 0 320 260" className={className} fill="none" role="img" aria-label="Hand-drawn sketch of a clipboard with a rising profit chart, gear and coins">
      {/* clipboard */}
      <motion.rect {...draw} transition={{ duration: 1.2 }} x="40" y="40" width="160" height="190" rx="10" stroke="#2D3436" strokeWidth="3" fill="#FFFDF7" />
      <motion.rect {...draw} transition={{ duration: 0.8 }} x="92" y="30" width="56" height="22" rx="6" stroke="#857049" strokeWidth="3" fill="#EDE6D3" />

      {/* rising chart bars */}
      <motion.rect initial={{ height: 0, y: 190 }} animate={{ height: 24, y: 166 }} transition={{ delay: 0.6, duration: 0.5 }} x="64" width="20" rx="2" fill="#9E875D" />
      <motion.rect initial={{ height: 0, y: 190 }} animate={{ height: 44, y: 146 }} transition={{ delay: 0.75, duration: 0.5 }} x="92" width="20" rx="2" fill="#7C8C5A" />
      <motion.rect initial={{ height: 0, y: 190 }} animate={{ height: 70, y: 120 }} transition={{ delay: 0.9, duration: 0.5 }} x="120" width="20" rx="2" fill="#E0A23B" />
      <motion.rect initial={{ height: 0, y: 190 }} animate={{ height: 96, y: 94 }} transition={{ delay: 1.05, duration: 0.5 }} x="148" width="20" rx="2" fill="#D9694C" />

      {/* profit arrow */}
      <motion.path {...draw} transition={{ delay: 1.2, duration: 1 }} d="M60 150 C90 120 130 96 178 70" stroke="#B25B3E" strokeWidth="3.5" strokeLinecap="round" />
      <motion.path {...draw} transition={{ delay: 2, duration: 0.4 }} d="M166 64 L182 66 L176 82" stroke="#B25B3E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* gear */}
      <motion.g initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ delay: 1.4, type: 'spring' }} style={{ transformOrigin: '250px 80px' }}>
        <circle cx="250" cy="80" r="26" stroke="#857049" strokeWidth="3" fill="#EDE6D3" />
        <circle cx="250" cy="80" r="9" stroke="#857049" strokeWidth="3" fill="#FFFDF7" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4
          return <line key={i} x1={250 + Math.cos(a) * 26} y1={80 + Math.sin(a) * 26} x2={250 + Math.cos(a) * 34} y2={80 + Math.sin(a) * 34} stroke="#857049" strokeWidth="3" strokeLinecap="round" />
        })}
      </motion.g>

      {/* coins */}
      <motion.g initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.7 }}>
        <ellipse cx="248" cy="190" rx="30" ry="11" fill="#E0A23B" />
        <ellipse cx="248" cy="180" rx="30" ry="11" fill="#9E875D" />
        <ellipse cx="248" cy="170" rx="30" ry="11" fill="#E0A23B" />
        <text x="248" y="174" fontSize="13" fill="#fff" fontFamily="Caveat" fontWeight="700" textAnchor="middle">£ £ £</text>
      </motion.g>
    </svg>
  )
}
