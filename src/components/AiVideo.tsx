import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Film } from 'lucide-react'

interface AiVideoProps {
  src: string
  poster?: string
  caption?: string
  className?: string
  rotate?: number
}

/**
 * A framed, muted, looping "explainer" video that only plays while it is
 * on screen (saves battery/bandwidth). Poster shows until it plays.
 */
export default function AiVideo({ src, poster, caption, className = '', rotate = 0 }: AiVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      style={{ rotate }}
      className={`group relative overflow-hidden rounded-3xl border border-white/60 bg-white/50 p-2 shadow-glass-lg backdrop-blur ${className}`}
    >
      <span className="washi -left-3 -top-2 -rotate-6" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl">
        <video
          ref={ref}
          className="aspect-video w-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label={caption ?? 'Background explainer video'}
        />
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-charcoal/60 px-2 py-1 font-note text-[0.7rem] font-bold text-cream backdrop-blur">
          <Film className="h-3 w-3" /> AI clip
        </span>
      </div>
      {caption && (
        <figcaption className="px-2 pb-1 pt-2 text-center font-hand text-xl font-bold text-charcoal">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}
