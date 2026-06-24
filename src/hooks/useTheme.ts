import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const KEY = 'cm-theme-v1'

function apply(t: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', t === 'dark')
  root.style.colorScheme = t
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', t === 'dark' ? '#14181A' : '#F5F3EE')
}

function initial(): Theme {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* ignore */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** App theme (light / dark) with persistence; applies the `dark` class. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initial)

  useEffect(() => {
    apply(theme)
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  return { theme, toggle }
}
