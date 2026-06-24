import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Timeline from '../components/Timeline'
import LectureNotes from '../components/LectureNotes'
import AiVideo from '../components/AiVideo'
import { Reveal } from '../components/ui'
import { PRE_CONTRACT_STAGES, SECTION_NARRATION } from '../data/content'

export default function PreContractSection() {
  return (
    <Section id="precontract">
      <SectionHeading
        part={1}
        kicker="Pre-Contract Commercial Management"
        title="The Pre-Contract Journey"
        description="Six sequential stages take a tender from invitation to a fully-formed, profit-secured bid. Tap any stage to expand the detail."
        narration={{ id: 'precontract', text: SECTION_NARRATION.precontract }}
      />
      <Reveal className="mx-auto mb-10 max-w-lg">
        <AiVideo src="/ai/site.mp4" poster="/ai/site.jpg" rotate={-1} />
      </Reveal>
      <Timeline stages={PRE_CONTRACT_STAGES} />
      <LectureNotes id="precontract" />
    </Section>
  )
}
