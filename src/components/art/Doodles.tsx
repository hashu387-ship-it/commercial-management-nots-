/**
 * Hand-drawn SVG doodles — rough, sketch-style accents that give the
 * app its annotated study-journal personality. All stroke colours come
 * from the palette / accent set (no teal).
 */

export function DoodleArrow({ className = '', color = '#D9694C' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" aria-hidden>
      <path
        d="M4 30 C30 12 70 12 96 26"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M84 16 L98 27 L82 34" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DoodleUnderline({ className = '', color = '#E0A23B' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 14" className={className} fill="none" preserveAspectRatio="none" aria-hidden>
      <path
        d="M3 8 C45 3 90 12 130 6 C160 2 185 9 197 5"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function DoodleCircle({ className = '', color = '#8A6491' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 70" className={className} fill="none" aria-hidden>
      <path
        d="M60 6 C95 6 114 22 114 35 C114 52 88 64 58 64 C26 64 6 50 6 34 C6 19 28 7 60 6 Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 0"
      />
    </svg>
  )
}

export function DoodleStar({ className = '', color = '#E0A23B' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <path d="M20 4 L20 36 M4 20 L36 20 M9 9 L31 31 M31 9 L9 31" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function DoodleSparkle({ className = '', color = '#D9694C' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 30 30" className={className} fill="none" aria-hidden>
      <path
        d="M15 2 C16 9 21 14 28 15 C21 16 16 21 15 28 C14 21 9 16 2 15 C9 14 14 9 15 2 Z"
        fill={color}
        opacity="0.9"
      />
    </svg>
  )
}

/** Decorative paper-clip in the corner of a card. */
export function PaperClip({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 80" className={className} fill="none" aria-hidden>
      <path
        d="M27 14 L27 56 C27 66 13 66 13 56 L13 20 C13 13 24 13 24 20 L24 52"
        stroke="#857049"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Curly connector arrow used between steps. */
export function DoodleCurlArrow({ className = '', color = '#7C8C5A' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden>
      <path
        d="M14 12 C58 14 64 40 40 54 C24 63 18 50 30 44 C40 39 48 50 44 60"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M50 56 L44 64 L36 59" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
