import { useCallback, useEffect, useState } from 'react'
import type { SectionId } from '../types'

const STORAGE_KEY = 'cm-study-progress-v1'

/**
 * Tracks which sections the learner has viewed, persisted to localStorage.
 * Returns the completed set, helpers to mark sections, and an overall %.
 */
export function useProgress(total: number) {
  const [completed, setCompleted] = useState<Set<SectionId>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return new Set(JSON.parse(raw) as SectionId[])
    } catch {
      /* ignore */
    }
    return new Set<SectionId>()
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
    } catch {
      /* ignore */
    }
  }, [completed])

  const markComplete = useCallback((id: SectionId) => {
    setCompleted((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  // `completed` backs the percentage + persistence; it is not exposed.
  // cap at 100 — a returning learner's saved set may include sections that
  // have since moved off-page (e.g. the Full Lecture Notes now open in a tab)
  const percent = total > 0 ? Math.min(100, Math.round((completed.size / total) * 100)) : 0

  return { markComplete, percent }
}
