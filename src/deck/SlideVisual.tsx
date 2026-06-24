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
  Workflow,
} from 'lucide-react'
import HeroDoodle from '../components/art/HeroDoodle'
import CashFlowCurve from '../components/art/CashFlowCurve'
import CvrChart from '../components/art/CvrChart'
import CostBuildup from '../components/art/CostBuildup'
import BalanceScale from '../components/art/BalanceScale'
import TenderVolumes from '../components/art/TenderVolumes'
import IconScene from '../components/art/IconScene'

/** Resolve a slide's `visual` key to a suitable image. */
export default function SlideVisual({ name }: { name: string }) {
  switch (name) {
    case 'hero':
      return <HeroDoodle className="mx-auto w-full max-w-sm" />
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
    case 'lifecycle-pre':
      return <IconScene Icon={Route} accent="#9E875D" satellites={[ClipboardCheck, Telescope, Calculator, Gavel]} />
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
    case 'submission':
      return <IconScene Icon={Send} accent="#8A6491" satellites={[FileStack, FileSignature]} />
    case 'recap':
      return <IconScene Icon={ListChecks} accent="#7C8C5A" satellites={[Trophy, Sparkles]} />
    case 'lifecycle-post':
      return <IconScene Icon={Workflow} accent="#8A6491" satellites={[TrendingUp, PackageSearch, LineChart, FileSignature]} />
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
    case 'reports':
      return <IconScene Icon={LineChart} accent="#9E875D" satellites={[Banknote, Scale, Hourglass]} />
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
