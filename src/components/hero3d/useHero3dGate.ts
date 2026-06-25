import { useEffect, useRef, useState } from 'react'

/**
 * Capability + preference gate for the WebGL hero.
 *
 * - `capable`  — the device can run the 3D scene (WebGL2, ≥768px, motion allowed).
 * - `enabled`  — capable AND the user hasn't switched it off.
 *
 * Note: we deliberately gate on viewport width (≥768) rather than pointer
 * type, so the iPad (a touch device) still gets the full 3D experience while
 * phones fall back to the static poster for battery/perf.
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

  const capable = webgl2 && wide && !reduced
  const enabled = capable && !skip
  return { capable, enabled, skip, setSkip }
}
