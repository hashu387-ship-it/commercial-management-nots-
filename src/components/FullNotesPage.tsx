import { ArrowLeft } from 'lucide-react'
import LiquidBackground from './LiquidBackground'
import NarratorDock from './NarratorDock'
import FullNotesSection from '../sections/FullNotesSection'

/** Standalone page for the Full Lecture Notes — opened in its own browser
    tab via `?view=notes`, so the handwritten book gets the whole screen. */
export default function FullNotesPage() {
  return (
    <div className="clay-ui relative min-h-screen overflow-x-clip">
      <LiquidBackground />

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 w-[min(96rem,calc(100%-1.5rem))]">
          <nav className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 sm:px-5">
            <a
              href="/"
              className="clay-sm clay-press inline-flex items-center gap-2 rounded-full px-4 py-2 font-note text-sm font-bold text-charcoal-600"
            >
              <ArrowLeft className="h-4 w-4" /> Back to study guide
            </a>
            <span className="font-clay text-sm font-bold text-charcoal sm:text-base">Full Lecture Notes</span>
            <span className="hidden w-[10.5rem] sm:block" aria-hidden />
          </nav>
        </div>
      </header>

      <main id="main" className="pt-20">
        <FullNotesSection />
      </main>

      <NarratorDock />
    </div>
  )
}
