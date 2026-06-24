import { useEffect, useState } from 'react'
import type { SectionId } from '../types'

/**
 * Observes section elements and reports the one currently in view,
 * invoking onVisible the first time each section is seen.
 */
export function useScrollSpy(ids: SectionId[], onVisible?: (id: SectionId) => void) {
  const [active, setActive] = useState<SectionId>(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId
          if (entry.isIntersecting) {
            if (entry.intersectionRatio >= 0.4) setActive(id)
            if (entry.intersectionRatio >= 0.25) onVisible?.(id)
          }
        }
      },
      { threshold: [0.25, 0.4, 0.6], rootMargin: '-80px 0px -40% 0px' },
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
