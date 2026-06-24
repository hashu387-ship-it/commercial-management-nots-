import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import FlashcardDeck from '../components/FlashcardDeck'

export default function FlashcardsSection() {
  return (
    <Section id="flashcards">
      <SectionHeading
        kicker="Active Recall"
        title="Interactive Flashcards"
        description="Tap any card to flip it in 3D and reveal the definition. Filter by topic to drill the areas you find hardest."
      />
      <FlashcardDeck />
    </Section>
  )
}
