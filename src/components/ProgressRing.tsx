interface ProgressRingProps {
  percent: number
  size?: number
  stroke?: number
  label?: string
}

/** Circular progress indicator rendered with SVG, palette-only. */
export default function ProgressRing({ percent, size = 44, stroke = 4, label }: ProgressRingProps) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, percent))
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(45,52,54,0.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ring-bronze)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
        <defs>
          <linearGradient id="ring-bronze" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C6B083" />
            <stop offset="100%" stopColor="#6A5938" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-[0.62rem] font-bold tracking-tight text-charcoal">
        {label ?? `${clamped}%`}
      </span>
    </div>
  )
}
