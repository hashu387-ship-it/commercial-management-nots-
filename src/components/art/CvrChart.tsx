import { motion } from 'framer-motion'

/** CVR infographic: value of work done vs cost incurred = the project P&L. */
export default function CvrChart() {
  const periods = [
    { m: 'P1', value: 70, cost: 58 },
    { m: 'P2', value: 120, cost: 104 },
    { m: 'P3', value: 150, cost: 132 },
  ]
  return (
    <figure className="paper rounded-3xl border border-bronze-200/60 p-5 shadow-neo-sm">
      <figcaption className="mb-2 font-hand text-2xl font-bold text-charcoal">
        CVR — value vs cost = profit
      </figcaption>
      <svg viewBox="0 0 360 220" className="w-full" role="img" aria-label="Bar chart comparing value of work done against cost incurred each period">
        <line x1="34" y1="180" x2="350" y2="180" stroke="#2D3436" strokeWidth="2" />
        {periods.map((p, i) => {
          const x = 60 + i * 100
          return (
            <g key={p.m}>
              <motion.rect initial={{ height: 0, y: 180 }} whileInView={{ height: p.value, y: 180 - p.value }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }} x={x} width="34" rx="3" fill="#7C8C5A" />
              <motion.rect initial={{ height: 0, y: 180 }} whileInView={{ height: p.cost, y: 180 - p.cost }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }} x={x + 40} width="34" rx="3" fill="#D9694C" />
              <text x={x + 37} y="196" fontSize="12" fill="#857049" fontFamily="Kalam" textAnchor="middle">{p.m}</text>
              <text x={x + 37} y={180 - p.value - 6} fontSize="12" fill="#7C8C5A" fontFamily="Caveat" fontWeight="700" textAnchor="middle">+{p.value - p.cost}</text>
            </g>
          )
        })}
        <g fontFamily="Kalam" fontSize="12">
          <rect x="210" y="10" width="14" height="14" rx="2" fill="#7C8C5A" />
          <text x="230" y="22" fill="#2D3436">value done</text>
          <rect x="300" y="10" width="14" height="14" rx="2" fill="#D9694C" />
          <text x="320" y="22" fill="#2D3436">cost</text>
        </g>
      </svg>
    </figure>
  )
}
