import { motion } from 'framer-motion'

/** Warm construction-site scene: finished tower, a building under
 *  construction with scaffolding, and a tower crane. */
export function SiteScene({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 250" className={`w-full ${className}`} role="img" aria-label="Illustration of a construction site with a crane and buildings">
      {/* sky wash */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6F2EA" />
          <stop offset="1" stopColor="#EDE6D3" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="250" rx="16" fill="url(#sky)" />
      <circle cx="300" cy="56" r="26" fill="#E0A23B" opacity="0.85" />

      {/* finished tower */}
      <motion.g initial={{ y: 18, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <rect x="40" y="90" width="64" height="120" rx="3" fill="#9E875D" />
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <rect key={`${r}-${c}`} x={50 + c * 18} y={100 + r * 26} width="11" height="16" rx="1" fill="#F5F3EE" opacity="0.85" />
          )),
        )}
      </motion.g>

      {/* under-construction building + scaffold */}
      <motion.g initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
        <rect x="140" y="120" width="86" height="90" fill="#7C8C5A" />
        <rect x="140" y="120" width="86" height="90" fill="none" stroke="#6A5938" strokeWidth="2" strokeDasharray="6 5" />
        {/* scaffold poles */}
        {[140, 162, 184, 206, 226].map((x) => (
          <line key={x} x1={x} y1="118" x2={x} y2="210" stroke="#857049" strokeWidth="2" />
        ))}
        {[140, 158, 176, 194].map((y) => (
          <line key={y} x1="138" y1={y} x2="228" y2={y} stroke="#857049" strokeWidth="2" />
        ))}
      </motion.g>

      {/* tower crane */}
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
        <line x1="250" y1="40" x2="250" y2="210" stroke="#2D3436" strokeWidth="4" />
        <line x1="250" y1="44" x2="330" y2="44" stroke="#2D3436" strokeWidth="4" />
        <line x1="250" y1="44" x2="210" y2="44" stroke="#2D3436" strokeWidth="4" />
        <line x1="250" y1="30" x2="320" y2="44" stroke="#857049" strokeWidth="2" />
        <line x1="250" y1="30" x2="214" y2="44" stroke="#857049" strokeWidth="2" />
        <line x1="312" y1="44" x2="312" y2="92" stroke="#857049" strokeWidth="2" />
        <rect x="304" y="92" width="16" height="12" rx="2" fill="#D9694C" />
        <rect x="242" y="44" width="16" height="14" rx="2" fill="#2D3436" />
      </motion.g>

      {/* ground */}
      <rect x="0" y="208" width="360" height="42" fill="#D8C9A8" />
      <rect x="0" y="208" width="360" height="6" fill="#C6B083" />
    </svg>
  )
}

/** A signed contract / SOE document with seal and pen. */
export function ContractScene({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 250" className={`w-full ${className}`} role="img" aria-label="Illustration of a signed document with a seal and pen">
      <rect x="0" y="0" width="360" height="250" rx="16" fill="#F6F2EA" />
      {/* paper */}
      <motion.g initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <rect x="96" y="34" width="168" height="200" rx="6" fill="#FFFDF7" stroke="#D8C9A8" strokeWidth="2" />
        <rect x="116" y="54" width="90" height="12" rx="3" fill="#9E875D" />
        {[84, 100, 116, 132, 148, 164].map((y) => (
          <rect key={y} x="116" y={y} width={y % 3 ? 128 : 96} height="6" rx="3" fill="#EDE6D3" />
        ))}
        {/* signature line */}
        <line x1="116" y1="196" x2="200" y2="196" stroke="#857049" strokeWidth="1.5" />
        <motion.path
          d="M120 194 c8 -10 14 6 22 -4 c6 -8 12 6 20 -2 c6 -6 12 4 18 0"
          fill="none"
          stroke="#2D3436"
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        />
      </motion.g>
      {/* wax seal */}
      <motion.g initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', delay: 0.5 }}>
        <circle cx="228" cy="200" r="18" fill="#D9694C" />
        <circle cx="228" cy="200" r="13" fill="none" stroke="#F6F2EA" strokeWidth="2" />
        <path d="M228 192 l3 6 h-6 z" fill="#F6F2EA" />
      </motion.g>
      {/* pen */}
      <motion.g initial={{ x: 20, y: 20, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
        <rect x="250" y="120" width="14" height="92" rx="6" transform="rotate(32 257 166)" fill="#857049" />
        <path d="M286 196 l8 18 l-16 -6 z" fill="#2D3436" transform="rotate(32 286 200)" />
      </motion.g>
    </svg>
  )
}

/** A commercial reporting dashboard: KPI tiles + line and bar charts. */
export function DashboardScene({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 250" className={`w-full ${className}`} role="img" aria-label="Illustration of a commercial reporting dashboard">
      <rect x="0" y="0" width="360" height="250" rx="16" fill="#F6F2EA" />
      <rect x="26" y="26" width="308" height="198" rx="12" fill="#FFFDF7" stroke="#D8C9A8" strokeWidth="2" />
      {/* KPI tiles */}
      {[
        { x: 40, c: '#9E875D', h: 'Margin' },
        { x: 138, c: '#7C8C5A', h: 'Cash' },
        { x: 236, c: '#8A6491', h: 'CTC' },
      ].map((k, i) => (
        <motion.g key={k.h} initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
          <rect x={k.x} y="42" width="84" height="44" rx="6" fill={`${k.c}22`} />
          <rect x={k.x + 10} y="52" width="34" height="7" rx="3" fill={k.c} />
          <rect x={k.x + 10} y="66" width="56" height="10" rx="3" fill={k.c} opacity="0.55" />
        </motion.g>
      ))}
      {/* line chart */}
      <rect x="40" y="100" width="150" height="104" rx="6" fill="#F6F2EA" />
      <motion.path
        d="M50 188 C78 168 96 176 120 150 C140 128 160 132 182 112"
        fill="none"
        stroke="#7C8C5A"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      {/* bar chart */}
      <rect x="206" y="100" width="118" height="104" rx="6" fill="#F6F2EA" />
      {[40, 64, 52, 80].map((h, i) => (
        <motion.rect
          key={i}
          x={220 + i * 26}
          width="16"
          rx="3"
          fill={['#9E875D', '#7C8C5A', '#E0A23B', '#D9694C'][i]}
          initial={{ height: 0, y: 196 }}
          whileInView={{ height: h, y: 196 - h }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
        />
      ))}
    </svg>
  )
}
