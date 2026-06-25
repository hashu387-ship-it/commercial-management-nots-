import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'
import { Boxes, Pause, Play } from 'lucide-react'
import { DoodleArrow } from '../art/Doodles'
import HeroPoster from './HeroPoster'
import { useHero3dGate } from './useHero3dGate'

const Hero3D = lazy(() => import('./Hero3D'))

/** Any WebGL/runtime error in the 3D subtree degrades to the static poster. */
class SafeBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default function HeroStage() {
  const { capable, enabled, skip, setSkip } = useHero3dGate()
  const wrap = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  // Pause the render loop while the hero is offscreen or the tab is hidden.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    let inView = true
    let visible = typeof document !== 'undefined' ? !document.hidden : true
    const update = () => setPaused(!inView || !visible)
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting
        update()
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    const onVis = () => {
      visible = !document.hidden
      update()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div ref={wrap} className="relative">
      {enabled ? (
        <figure
          style={{ rotate: '1.5deg' }}
          className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/50 p-2 shadow-glass-lg backdrop-blur"
        >
          <span className="washi -left-3 -top-2 -rotate-6" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-charcoal" aria-hidden>
            <SafeBoundary fallback={<HeroPoster />}>
              <Suspense fallback={<HeroPoster />}>
                <Hero3D paused={paused} />
              </Suspense>
            </SafeBoundary>
            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-charcoal/60 px-2 py-1 font-note text-[0.7rem] font-bold text-cream backdrop-blur">
              <Boxes className="h-3 w-3 text-bronze-300" /> 3D · live
            </span>
          </div>
          <button
            onClick={() => setSkip(true)}
            className="neo absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-note text-xs font-bold text-charcoal-600 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500"
          >
            <Pause className="h-3 w-3" /> Reduce motion
          </button>
          <figcaption className="px-2 pb-1 pt-2 text-center font-hand text-xl font-bold text-charcoal">
            secure it. then grow it.
          </figcaption>
        </figure>
      ) : (
        <>
          <HeroPoster />
          {capable && skip && (
            <button
              onClick={() => setSkip(false)}
              className="neo absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-note text-xs font-bold text-charcoal-600 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500"
            >
              <Play className="h-3 w-3 text-bronze-700" /> Play 3D
            </button>
          )}
        </>
      )}
      <DoodleArrow className="absolute -bottom-8 -left-10 hidden h-12 w-24 -rotate-12 lg:block" color="#7C8C5A" />
    </div>
  )
}
