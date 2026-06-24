/* Shared content types for the study application. */

export type SectionId =
  | 'overview'
  | 'competency'
  | 'precontract'
  | 'estimating'
  | 'tender'
  | 'postcontract'
  | 'profit'
  | 'procurement'
  | 'reporting'
  | 'admin'
  | 'soe'
  | 'flashcards'
  | 'quiz'

export interface NavSection {
  id: SectionId
  label: string
  /** lucide-react icon name resolved in the component layer */
  icon: string
  part: 1 | 2 | 0
}

export interface Flashcard {
  id: string
  term: string
  definition: string
  category: string
}

export interface TimelineStage {
  id: string
  index: number
  title: string
  tagline: string
  icon: string
  points: string[]
  detail?: string[]
}

export interface AccordionItem {
  id: string
  title: string
  icon: string
  summary?: string
  points: string[]
  sub?: { heading: string; items: string[] }[]
}

export interface TabItem {
  id: string
  label: string
  icon: string
  intro?: string
  points: string[]
  sub?: { heading: string; items: string[] }[]
}

export interface RiskOpp {
  title: string
  description?: string
}

export interface QuizOption {
  text: string
  correct: boolean
}

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
  explanation: string
}

/** A structured block of the presenter's spoken explanation (handwritten notes). */
export interface LectureBlock {
  heading: string
  points: string[]
  /** 📌 APC / exam tip */
  tip?: string
  /** 💡 worked example or anecdote from the lecture */
  example?: string
  /** ⚠ common mistake / thing to watch out for */
  watch?: string
}
