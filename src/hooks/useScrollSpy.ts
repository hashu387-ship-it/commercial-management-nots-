import { useEffect, useState } from 'react'
import type { SectionId } from '../types'

/**
 * Observes section elements and reports the one currently in view,
 * invoking onVisible the first time each section is seen.
 *
 * Selection is based on the *area* of each section intersecting the
 * reading band (intersectionRect height), NOT intersectionRatio — ratio is
 * capped by rootHeight/sectionHeight and becomes unreachable for tall
 * sections, which would make the nav skip them and progress stall < 100%.
 */
export function useScrollSpy(ids: SectionId[], onVisible?: (id: SectionId) => void) {
  const [active, setActive] = useState<SectionId>(ids[0])

  useEffect(() => {
    // Accumulate the latest entry per section — a callback only carries the
    // targets whose intersection changed, so we must remember the rest.
    const seen = new Map<SectionId, IntersectionObserverEntry>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id as SectionId, e)

        let best: IntersectionObserverEntry | null = null
        for (const e of seen.values()) {
          if (!e.isIntersecting) continue
          // Any section that enters the reading band counts as reviewed.
          onVisible?.(e.target.id as SectionId)
          if (!best || e.intersectionRect.height > best.intersectionRect.height) best = e
        }
        if (best) setActive(best.target.id as SectionId)
      },
      // threshold 0 → fire on every enter/leave; rootMargin defines the band.
      { threshold: 0, rootMargin: '-80px 0px -40% 0px' },
    )

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(',')])

  return active
}
