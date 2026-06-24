import { useCallback } from 'react'
import LiquidBackground from './components/LiquidBackground'
import Navbar from './components/Navbar'
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
    <div className="relative min-h-screen">
      <LiquidBackground />
      <Navbar active={active} percent={percent} />

      <main>
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
    </div>
  )
}
