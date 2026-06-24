import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Timeline from '../components/Timeline'
import { POST_CONTRACT_STAGES } from '../data/content'

export default function PostContractSection() {
  return (
    <Section id="postcontract">
      <SectionHeading
        part={2}
        kicker="Post-Contract Commercial Management"
        title="The Post-Contract Journey"
        description="Once the contract is won, four disciplines protect and grow the margin secured at tender."
      />
      <Timeline stages={POST_CONTRACT_STAGES} />
    </Section>
  )
}
