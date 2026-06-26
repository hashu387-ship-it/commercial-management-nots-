/** A fountain-pen nib icon (uses currentColor). Echoes the Apple-Pencil /
    fountain-pen look the user asked for. */
export default function PenNib({ className = '', strokeWidth = 1.4 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {/* nib body */}
      <path
        d="M12 2c2.7 3.1 4.6 6.6 4.6 10.1L12 22l-4.6-9.9C7.4 8.6 9.3 5.1 12 2Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* breather hole */}
      <circle cx="12" cy="8.2" r="1.45" fill="currentColor" />
      {/* ink slit */}
      <path d="M12 9.7V21" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}
