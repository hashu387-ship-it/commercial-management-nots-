import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Timeline from '../components/Timeline'
import LectureNotes from '../components/LectureNotes'
import { POST_CONTRACT_STAGES, SECTION_NARRATION } from '../data/content'

export default function PostContractSection() {
  return (
    <Section id="postcontract">
      <SectionHeading
        part={2}
        kicker="Post-Contract Commercial Management"
        title="The Post-Contract Journey"
        description="Once the contract is won, four disciplines protect and grow the margin secured at tender."
        narration={{ id: 'postcontract', text: SECTION_NARRATION.postcontract }}
      />
      <Timeline stages={POST_CONTRACT_STAGES} />
      <LectureNotes id="postcontract" />
    </Section>
  )
}
