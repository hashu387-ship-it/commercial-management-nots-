import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { Presentation } from 'lucide-react'
import { SpeechProvider } from './audio/speech'
import Deck from './deck/Deck'
import SelectionTranslator from './components/SelectionTranslator'
import LiquidBackground from './components/LiquidBackground'
import Navbar from './components/Navbar'
import NarratorDock from './components/NarratorDock'
import Hero from './components/Hero'
import Footer from './components/Footer'
import OverviewSection from './sections/OverviewSection'
import CompetencySection from './sections/CompetencySection'
import PreContractSection from './sections/PreContractSection'
import EstimatingSection from './sections/EstimatingSection'
import TenderSection from './sections/TenderSection'
import PostContractSection from './sections/PostContractSection'
import ProfitSection from './sections/ProfitSection'
import ProcurementSection from './sections/ProcurementSection'
import ReportingSection from './sections/ReportingSection'
import AdminSection from './sections/AdminSection'
import FullNotesSection from './sections/FullNotesSection'
import SoeSection from './sections/SoeSection'
import FlashcardsSection from './sections/FlashcardsSection'
import QuizSection from './sections/QuizSection'
import { SECTIONS } from './data/content'
import { useProgress } from './hooks/useProgress'
import { useScrollSpy } from './hooks/useScrollSpy'
import type { SectionId } from './types'

const SECTION_IDS = SECTIONS.map((s) => s.id)
const VIEW_KEY = 'cm-view-v1'

export default function App() {
  const { markComplete, percent } = useProgress(SECTIONS.length)
  const active = useScrollSpy(SECTION_IDS, markComplete)
  const [view, setView] = useState<'deck' | 'explore'>(() =>
    localStorage.getItem(VIEW_KEY) === 'explore' ? 'explore' : 'deck',
  )

  const setMode = useCallback((m: 'deck' | 'explore') => {
    setView(m)
    try {
      localStorage.setItem(VIEW_KEY, m)
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0 })
  }, [])

  const jump = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const completeQuiz = useCallback(() => markComplete('quiz'), [markComplete])

  return (
    <MotionConfig reducedMotion="user">
      <SpeechProvider>
        <SelectionTranslator />
        {view === 'deck' ? (
          <Deck onExit={() => setMode('explore')} />
        ) : (
          <div className="relative min-h-screen overflow-x-clip">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-xl focus:bg-charcoal focus:px-4 focus:py-2 focus:font-semibold focus:text-cream focus:shadow-glass-lg"
            >
              Skip to content
            </a>
            <LiquidBackground />
            <Navbar active={active} percent={percent} />

            <main id="main" tabIndex={-1}>
              <Hero onJump={jump} />
              <OverviewSection />
              <CompetencySection />
              <PreContractSection />
              <EstimatingSection />
              <TenderSection />
              <PostContractSection />
              <ProfitSection />
              <ProcurementSection />
              <ReportingSection />
              <AdminSection />
              <FullNotesSection />
              <SoeSection />
              <FlashcardsSection />
              <QuizSection onComplete={completeQuiz} />
            </main>

            <Footer />
            <NarratorDock />

            {/* Switch back to the slide deck */}
            <button
              onClick={() => setMode('deck')}
              className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-3 font-note text-sm font-bold text-cream shadow-glass-lg transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Presentation className="h-4 w-4 text-bronze-300" />
              Study slides
            </button>
          </div>
        )}
      </SpeechProvider>
    </MotionConfig>
  )
}
