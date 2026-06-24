/**
 * Decorative liquid-glass background: softly drifting colour blobs
 * built strictly from the bronze / tan palette. Purely cosmetic.
 */
export default function LiquidBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-bronze-300/30 blur-3xl animate-blob-1" />
      <div className="absolute right-[-10rem] top-1/4 h-[30rem] w-[30rem] rounded-full bg-tan/60 blur-3xl animate-blob-2" />
      <div className="absolute bottom-[-12rem] left-1/3 h-[36rem] w-[36rem] rounded-full bg-bronze-200/40 blur-3xl animate-blob-3" />
      <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-bronze-400/20 blur-3xl animate-blob-1" />
      {/* faint grain / vignette to keep it tactile */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_55%,rgba(45,52,54,0.06)_100%)]" />
    </div>
  )
}
