import { motion } from 'framer-motion'

/**
 * Hand-annotated cash-flow infographic: the classic S-curve of cumulative
 * value against the stepped cost line, illustrating the negative-cash-flow
 * trough a contractor must fund.
 */
export default function CashFlowCurve() {
  return (
    <figure className="paper-grid rounded-3xl border border-bronze-200/60 p-5 shadow-neo-sm">
      <figcaption className="mb-2 font-hand text-2xl font-bold text-charcoal">
        Cash flow — value vs cost over time
      </figcaption>
      <svg viewBox="0 0 420 260" className="w-full" role="img" aria-label="Cash flow S-curve showing cumulative value above the cost line">
        {/* axes */}
        <line x1="40" y1="20" x2="40" y2="210" stroke="#2D3436" strokeWidth="2" />
        <line x1="40" y1="210" x2="404" y2="210" stroke="#2D3436" strokeWidth="2" />
        <text x="8" y="120" fontSize="11" fill="#857049" transform="rotate(-90 12 120)" fontFamily="Kalam">£ cumulative</text>
        <text x="320" y="228" fontSize="12" fill="#857049" fontFamily="Kalam">project time →</text>

        {/* value S-curve (revenue / certified) */}
        <motion.path
          d="M40 200 C110 196 150 150 210 110 C270 70 300 40 404 32"
          fill="none"
          stroke="#7C8C5A"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
        {/* cost line (slightly ahead → trough) */}
        <motion.path
          d="M40 200 C100 176 150 120 210 92 C270 64 310 46 404 44"
          fill="none"
          stroke="#D9694C"
          strokeWidth="4"
          strokeDasharray="7 6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
        />

        {/* trough callout */}
        <circle cx="150" cy="135" r="5" fill="#B25B3E" />
        <text x="150" y="175" fontSize="13" fill="#B25B3E" fontFamily="Caveat" fontWeight="700" textAnchor="middle">
          negative cash-flow
        </text>
        <text x="150" y="190" fontSize="13" fill="#B25B3E" fontFamily="Caveat" fontWeight="700" textAnchor="middle">
          gap to fund
        </text>

        {/* legend */}
        <g fontFamily="Kalam" fontSize="12">
          <line x1="250" y1="206" x2="280" y2="206" stroke="#7C8C5A" strokeWidth="4" />
          <text x="286" y="210" fill="#2D3436">value in</text>
          <line x1="250" y1="224" x2="280" y2="224" stroke="#D9694C" strokeWidth="4" strokeDasharray="7 6" />
          <text x="286" y="228" fill="#2D3436">cost out</text>
        </g>
      </svg>
    </figure>
  )
}
