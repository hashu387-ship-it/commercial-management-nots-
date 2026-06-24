import { useCallback } from 'react'
import { MotionConfig } from 'framer-motion'
import { SpeechProvider } from './audio/speech'
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
import FlashcardsSection from './sections/FlashcardsSection'
import QuizSection from './sections/QuizSection'
import { SECTIONS } from './data/content'
import { useProgress } from './hooks/useProgress'
import { useScrollSpy } from './hooks/useScrollSpy'
import type { SectionId } from './types'

const SECTION_IDS = SECTIONS.map((s) => s.id)

export default function App() {
  const { markComplete, percent } = useProgress(SECTIONS.length)
  const active = useScrollSpy(SECTION_IDS, markComplete)

  const jump = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // reinforce quiz completion when the learner finishes the quiz
  const completeQuiz = useCallback(() => markComplete('quiz'), [markComplete])

  return (
    <MotionConfig reducedMotion="user">
      <SpeechProvider>
      <div className="relative min-h-screen">
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
          <FlashcardsSection />
          <QuizSection onComplete={completeQuiz} />
        </main>

        <Footer />
        <NarratorDock />
      </div>
      </SpeechProvider>
    </MotionConfig>
  )
}
