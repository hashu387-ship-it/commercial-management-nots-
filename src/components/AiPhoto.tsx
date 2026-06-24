import { motion } from 'framer-motion'

interface AiPhotoProps {
  src: string
  alt: string
  caption?: string
  className?: string
  rotate?: number
}

/** A framed, "photo-card" wrapper for the generated AI imagery. */
export default function AiPhoto({ src, alt, caption, className = '', rotate = 0 }: AiPhotoProps) {
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
      <div className="overflow-hidden rounded-2xl">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      {caption && (
        <figcaption className="px-2 pb-1 pt-2 text-center font-hand text-xl font-bold text-charcoal">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}
