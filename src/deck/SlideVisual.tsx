import {
  Award,
  Banknote,
  Boxes,
  Calculator,
  ClipboardCheck,
  ClipboardList,
  Coins,
  FileSignature,
  FileStack,
  Gavel,
  GitCompareArrows,
  HardHat,
  Handshake,
  Hourglass,
  LineChart,
  ListChecks,
  Mail,
  Network,
  PackageSearch,
  PartyPopper,
  Route,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Telescope,
  TrendingUp,
  TriangleAlert,
  Trophy,
} from 'lucide-react'
import HeroDoodle from '../components/art/HeroDoodle'
import CashFlowCurve from '../components/art/CashFlowCurve'
import CvrChart from '../components/art/CvrChart'
import CostBuildup from '../components/art/CostBuildup'
import BalanceScale from '../components/art/BalanceScale'
import TenderVolumes from '../components/art/TenderVolumes'
import IconScene from '../components/art/IconScene'
import AiPhoto from '../components/AiPhoto'
import { ContractScene, DashboardScene, SiteScene } from '../components/art/Scenes'

/** Resolve a slide's `visual` key to a suitable image. */
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

    case 'agenda':
      return <IconScene Icon={ListChecks} accent="#9E875D" satellites={[Route, Calculator, Gavel, Send]} />
    case 'competency':
      return <IconScene Icon={Award} accent="#9E875D" satellites={[ListChecks, Target, ShieldCheck]} />
    case 'aiqs':
      return <IconScene Icon={Award} accent="#5B7DA6" satellites={[FileStack, ClipboardList, Scale]} />
    case 'map':
      return <IconScene Icon={GitCompareArrows} accent="#8A6491" satellites={[Award, FileSignature]} />
    case 'securenhance':
      return <IconScene Icon={Target} accent="#7C8C5A" satellites={[ShieldCheck, TrendingUp, Sparkles, Coins]} />
    case 'docs':
      return <IconScene Icon={ClipboardCheck} accent="#5B7DA6" satellites={[FileStack, Banknote]} />
    case 'decision':
      return <IconScene Icon={GitCompareArrows} accent="#E0A23B" satellites={[Target, Scale, TriangleAlert]} />
    case 'appreciation':
      return <IconScene Icon={Telescope} accent="#7C8C5A" satellites={[ClipboardList, HardHat, ListChecks]} />
    case 'quote':
      return <IconScene Icon={Mail} accent="#5B7DA6" satellites={[FileStack, Hourglass]} />
    case 'risk':
      return <IconScene Icon={TriangleAlert} accent="#D9694C" satellites={[ShieldCheck, Scale, HardHat]} />
    case 'shield':
      return <IconScene Icon={ShieldCheck} accent="#7C8C5A" satellites={[Handshake, ClipboardList, Scale]} />
    case 'adjudication':
      return <IconScene Icon={Gavel} accent="#9E875D" satellites={[Coins, Banknote, Scale]} />
    case 'recap':
      return <IconScene Icon={ListChecks} accent="#7C8C5A" satellites={[Trophy, Sparkles]} />
    case 'opportunities':
      return <IconScene Icon={TrendingUp} accent="#7C8C5A" satellites={[Hourglass, Coins, Sparkles, HardHat]} />
    case 'boxes':
      return <IconScene Icon={Boxes} accent="#9E875D" satellites={[Coins, PackageSearch]} />
    case 'register':
      return <IconScene Icon={ClipboardList} accent="#D9694C" satellites={[TriangleAlert, Sparkles, Scale]} />
    case 'materials':
      return <IconScene Icon={PackageSearch} accent="#9E875D" satellites={[Boxes, ClipboardList]} />
    case 'labour':
      return <IconScene Icon={HardHat} accent="#E0A23B" satellites={[ClipboardList, Handshake]} />
    case 'network':
      return <IconScene Icon={Network} accent="#5B7DA6" satellites={[Handshake, FileStack, Scale]} />
    case 'ctc':
      return <IconScene Icon={Hourglass} accent="#8A6491" satellites={[Coins, LineChart, ClipboardList]} />
    case 'admin':
      return <IconScene Icon={FileSignature} accent="#9E875D" satellites={[Handshake, FileStack, Scale]} />
    case 'thanks':
      return <IconScene Icon={PartyPopper} accent="#E0A23B" satellites={[Trophy, Sparkles]} />
    default:
      return <IconScene Icon={Sparkles} accent="#9E875D" />
  }
}
