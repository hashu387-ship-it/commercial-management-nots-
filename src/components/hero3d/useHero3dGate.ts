import { useEffect, useRef, useState } from 'react'

/**
 * Capability + preference gate for the WebGL hero.
 *
 * - `capable`  — the device can run the 3D scene (WebGL2 + motion allowed).
 * - `enabled`  — capable AND the user hasn't switched it off.
 * - `compact`  — a small screen (<768px); the scene renders a lighter,
 *                battery-safe preset (fewer particles, no post-processing).
 *
 * The 3D runs on phones, tablet and desktop alike; only no-WebGL2 or
 * prefers-reduced-motion (or the user's own skip) fall back to the poster.
 */
const OFF_KEY = 'cm-hero3d-off'

function probeWebGL2(): boolean {
  if (typeof document === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!c.getContext('webgl2')
  } catch {
    return false
  }
}

export function useHero3dGate() {
  const webgl2 = useRef(probeWebGL2()).current

  const [reduced, setReduced] = useState(
    () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [wide, setWide] = useState(
    () => typeof matchMedia !== 'undefined' && matchMedia('(min-width: 768px)').matches,
  )
  const [skip, setSkipState] = useState(() => {
    try {
      return localStorage.getItem(OFF_KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    const rm = matchMedia('(prefers-reduced-motion: reduce)')
    const wm = matchMedia('(min-width: 768px)')
    const onRm = () => setReduced(rm.matches)
    const onWm = () => setWide(wm.matches)
    rm.addEventListener('change', onRm)
    wm.addEventListener('change', onWm)
    return () => {
      rm.removeEventListener('change', onRm)
      wm.removeEventListener('change', onWm)
    }
  }, [])

  const setSkip = (v: boolean) => {
    setSkipState(v)
    try {
      localStorage.setItem(OFF_KEY, v ? '1' : '0')
    } catch {
      /* ignore */
    }
  }

  const capable = webgl2 && !reduced
  const enabled = capable && !skip
  const compact = !wide
  return { capable, enabled, compact, skip, setSkip }
}
