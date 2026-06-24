import { motion } from 'framer-motion'

/**
 * Hand-drawn balance scale: profit enhancement = balancing Risks against
 * Opportunities. The beam tips gently toward opportunities (the goal).
 */
export default function BalanceScale() {
  return (
    <figure className="rounded-3xl">
      <svg viewBox="0 0 360 240" className="mx-auto w-full max-w-md" role="img" aria-label="A balance scale weighing risks against opportunities">
        {/* stand */}
        <line x1="180" y1="40" x2="180" y2="200" stroke="#857049" strokeWidth="6" strokeLinecap="round" />
        <path d="M150 200 L210 200" stroke="#857049" strokeWidth="6" strokeLinecap="round" />
        <path d="M150 206 C160 196 200 196 210 206" stroke="#857049" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="180" cy="40" r="6" fill="#9E875D" />

        {/* beam, gently tipped toward opportunities (right side up) */}
        <motion.g
          initial={{ rotate: 0 }}
          whileInView={{ rotate: -7 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 60, damping: 9, delay: 0.3 }}
          style={{ transformOrigin: '180px 44px' }}
        >
          <line x1="70" y1="44" x2="290" y2="44" stroke="#6A5938" strokeWidth="5" strokeLinecap="round" />

          {/* left pan — Risks */}
          <line x1="80" y1="44" x2="80" y2="92" stroke="#857049" strokeWidth="2.5" />
          <path d="M52 92 A28 14 0 0 0 108 92 Z" fill="#D9694C" opacity="0.85" />
          <text x="80" y="84" fontSize="15" fontFamily="Caveat" fontWeight="700" fill="#fff" textAnchor="middle">Risks</text>

          {/* right pan — Opportunities */}
          <line x1="280" y1="44" x2="280" y2="92" stroke="#857049" strokeWidth="2.5" />
          <path d="M250 92 A30 14 0 0 0 310 92 Z" fill="#7C8C5A" opacity="0.9" />
          <text x="280" y="84" fontSize="13" fontFamily="Caveat" fontWeight="700" fill="#fff" textAnchor="middle">Opps</text>
        </motion.g>

        <text x="180" y="232" fontSize="16" fontFamily="Caveat" fontWeight="700" fill="#857049" textAnchor="middle">
          tip the balance toward opportunity = profit ↑
        </text>
      </svg>
    </figure>
  )
}
