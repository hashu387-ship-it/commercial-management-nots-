import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Quiz from '../components/Quiz'

export default function QuizSection({ onComplete }: { onComplete?: () => void }) {
  return (
    <Section id="quiz">
      <SectionHeading
        kicker="Test Yourself"
        title="Knowledge Check"
        description="Ten questions spanning pre-contract and post-contract commercial management. Instant feedback on every answer."
      />
      <Quiz onComplete={onComplete} />
    </Section>
  )
}
