import HeroDoodle from '../components/art/HeroDoodle'
import CashFlowCurve from '../components/art/CashFlowCurve'
import CvrChart from '../components/art/CvrChart'
import CostBuildup from '../components/art/CostBuildup'
import BalanceScale from '../components/art/BalanceScale'
import TenderVolumes from '../components/art/TenderVolumes'
import AiPhoto from '../components/AiPhoto'
import AiVideo from '../components/AiVideo'
import { ContractScene, DashboardScene, SiteScene } from '../components/art/Scenes'

/**
 * Visuals that actually teach something — hand-drawn infographics, scene
 * illustrations and AI imagery. Abstract "floating icon" decorations were
 * removed; any slide whose `visual` is not listed here simply renders its
 * content full-width with no decorative graphic.
 */
const MEANINGFUL = new Set([
  'hero',
  'photo-hero',
  'photo-pre',
  'photo-post',
  'photo-site',
  'video-intro',
  'video-site',
  'video-reports',
  'costbuildup',
  'cashflow',
  'cvr',
  'balance',
  'volumes',
  'lifecycle-pre',
  'lifecycle-post',
  'reports',
  'submission',
])

/** Does this slide carry a real, content-bearing visual? */
export function hasSlideVisual(name: string): boolean {
  return MEANINGFUL.has(name)
}

/** Resolve a slide's `visual` key to a suitable image (or nothing). */
export default function SlideVisual({ name }: { name: string }) {
  switch (name) {
    case 'hero':
      return <HeroDoodle className="mx-auto w-full max-w-sm" />
    case 'photo-hero':
      return <AiPhoto src="/ai/hero.jpg" alt="A quantity surveyor's desk with blueprints, a hard hat and a calculator" className="mx-auto max-w-md" rotate={-1.5} />
    case 'photo-pre':
      return <AiPhoto src="/ai/precontract.jpg" alt="Tender documents and architectural drawings on a desk" className="mx-auto max-w-md" rotate={-1.5} />
    case 'photo-post':
      return <AiPhoto src="/ai/postcontract.jpg" alt="Printed cost reports with charts on a desk" className="mx-auto max-w-md" rotate={1.5} />
    case 'photo-site':
      return <AiPhoto src="/ai/site.jpg" alt="A construction site with a tower crane at golden hour" className="mx-auto max-w-md" rotate={-1} />
    case 'video-intro':
      return <AiVideo src="/ai/intro.mp4" poster="/ai/intro-poster.jpg" className="mx-auto max-w-md" rotate={-1.5} />
    case 'video-site':
      return <AiVideo src="/ai/site.mp4" poster="/ai/site-poster.jpg" className="mx-auto max-w-md" rotate={-1} />
    case 'video-reports':
      return <AiVideo src="/ai/reports.mp4" poster="/ai/reports-poster.jpg" className="mx-auto max-w-md" rotate={1.5} />
    case 'costbuildup':
      return <CostBuildup />
    case 'cashflow':
      return <CashFlowCurve />
    case 'cvr':
      return <CvrChart />
    case 'balance':
      return <BalanceScale />
    case 'volumes':
      return <TenderVolumes />
    case 'lifecycle-pre':
    case 'lifecycle-post':
      return <SiteScene className="mx-auto max-w-md" />
    case 'reports':
      return <DashboardScene className="mx-auto max-w-md" />
    case 'submission':
      return <ContractScene className="mx-auto max-w-sm" />
    default:
      return null
  }
}
