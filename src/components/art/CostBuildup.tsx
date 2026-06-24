import { motion } from 'framer-motion'

const NET = [
  { label: 'Material', color: '#9E875D', h: 46 },
  { label: 'Labour', color: '#7C8C5A', h: 40 },
  { label: 'Plant', color: '#5B7DA6', h: 26 },
  { label: 'Subcontract', color: '#8A6491', h: 34 },
]
const ADD = [
  { label: 'O/H', color: '#E0A23B', h: 24 },
  { label: 'Risk', color: '#D9694C', h: 18 },
  { label: 'Profit', color: '#B25B3E', h: 22 },
]

/** Stacked build-up: net estimate (1st principles) → + adjudication adds → tender bid. */
export default function CostBuildup() {
  let y = 210
  const bars: { label: string; color: string; h: number; y: number; group: string }[] = []
  for (const s of NET) {
    y -= s.h
    bars.push({ ...s, y, group: 'Estimate (first principles)' })
  }
  let y2 = 210
  const adds: typeof bars = []
  for (const s of ADD) {
    y2 -= s.h
    adds.push({ ...s, y: y2, group: 'Adjudication adds' })
  }

  return (
    <figure className="paper-dots rounded-3xl border border-bronze-200/60 p-5 shadow-neo-sm">
      <figcaption className="mb-2 font-hand text-2xl font-bold text-charcoal">
        From estimate → tender bid
      </figcaption>
      <svg viewBox="0 0 360 240" className="w-full" role="img" aria-label="Stacked cost build-up from net estimate plus overheads, risk and profit to the final bid">
        <line x1="30" y1="210" x2="350" y2="210" stroke="#2D3436" strokeWidth="2" />

        {/* net estimate stack */}
        {bars.map((b, i) => (
          <motion.g key={b.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
            <rect x="60" y={b.y} width="80" height={b.h - 3} rx="3" fill={b.color} />
            <text x="100" y={b.y + b.h / 2 + 3} fontSize="11" fill="#fff" fontFamily="Kalam" textAnchor="middle">{b.label}</text>
          </motion.g>
        ))}
        <text x="100" y="228" fontSize="12" fill="#857049" fontFamily="Caveat" fontWeight="700" textAnchor="middle">net estimate</text>

        {/* plus sign */}
        <text x="170" y="150" fontSize="28" fill="#857049" fontFamily="Caveat" fontWeight="700" textAnchor="middle">+</text>

        {/* adjudication adds */}
        {adds.map((b, i) => (
          <motion.g key={b.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.12 }}>
            <rect x="200" y={b.y} width="70" height={b.h - 3} rx="3" fill={b.color} />
            <text x="235" y={b.y + b.h / 2 + 3} fontSize="11" fill="#fff" fontFamily="Kalam" textAnchor="middle">{b.label}</text>
          </motion.g>
        ))}
        <text x="235" y="228" fontSize="12" fill="#857049" fontFamily="Caveat" fontWeight="700" textAnchor="middle">adds</text>

        {/* equals bid */}
        <text x="290" y="120" fontSize="24" fill="#857049" fontFamily="Caveat" fontWeight="700">=</text>
        <motion.rect initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1 }} x="306" y="96" width="40" height="114" rx="4" fill="#2D3436" />
        <text x="326" y="156" fontSize="13" fill="#F5F3EE" fontFamily="Caveat" fontWeight="700" textAnchor="middle" transform="rotate(90 326 156)">TENDER BID</text>
      </svg>
    </figure>
  )
}
