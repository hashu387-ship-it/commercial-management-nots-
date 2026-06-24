import { motion } from 'framer-motion'

const VOLS = [
  { v: 'I', t: 'Conditions', color: '#9E875D' },
  { v: 'II', t: 'Specifications', color: '#7C8C5A' },
  { v: 'III', t: 'Drawings', color: '#5B7DA6' },
  { v: 'IV', t: 'BOQ', color: '#E0A23B' },
  { v: 'V', t: 'Soil report', color: '#8A6491' },
]

/** Five stacked "book" spines representing the tender document volumes. */
export default function TenderVolumes() {
  return (
    <figure className="rounded-3xl">
      <svg viewBox="0 0 300 220" className="mx-auto w-full max-w-xs" role="img" aria-label="Five stacked book spines for tender document volumes one to five">
        {VOLS.map((vol, i) => {
          const y = 24 + i * 36
          const w = 220 - i * 8
          return (
            <motion.g
              key={vol.v}
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 80, damping: 12 }}
            >
              <rect x={40} y={y} width={w} height="30" rx="3" fill={vol.color} />
              <rect x={40} y={y} width="12" height="30" fill="rgba(0,0,0,0.18)" />
              <text x={64} y={y + 20} fontSize="15" fill="#fff" fontFamily="Caveat" fontWeight="700">{vol.v}</text>
              <text x={88} y={y + 20} fontSize="13" fill="#fff" fontFamily="Kalam">{vol.t}</text>
            </motion.g>
          )
        })}
      </svg>
    </figure>
  )
}
