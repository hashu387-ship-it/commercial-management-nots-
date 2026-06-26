/* ════════════════════════════════════════════════════════════════════
   Mind-map content — the whole course as one explorable, colour-coded
   tree. Categories are colour-coded so they're easy to memorise:
     • sky   = a stage / phase
     • sage  = what it includes / inputs
     • amber = advantages / opportunities / why
     • coral = risks / watch-outs
     • plum  = exclusions / qualifications / boundaries
     • rose  = techniques / methods
   ════════════════════════════════════════════════════════════════════ */

export interface MNode {
  id: string
  label: string
  color: string
  kind?: string
  children?: MNode[]
}

export const CAT = {
  stage: '#5B7DA6', // sky
  include: '#7C8C5A', // sage
  advantage: '#E0A23B', // amber
  risk: '#D9694C', // coral
  exclude: '#8A6491', // plum
  technique: '#C46B86', // rose
  root: '#9E875D', // bronze
  branch: '#B25B3E', // rust
} as const

export const LEGEND: { label: string; color: string }[] = [
  { label: 'Stage', color: CAT.stage },
  { label: 'Includes', color: CAT.include },
  { label: 'Advantage', color: CAT.advantage },
  { label: 'Risk', color: CAT.risk },
  { label: 'Exclusion / Limit', color: CAT.exclude },
  { label: 'Technique', color: CAT.technique },
]

const leaf = (id: string, label: string, color: string): MNode => ({ id, label, color })

export const MIND_MAP: MNode = {
  id: 'root',
  label: 'Commercial|Management',
  color: CAT.root,
  children: [
    {
      id: 'pre',
      label: 'Part 1 · Pre-Contract',
      color: CAT.stage,
      children: [
        {
          id: 'presel',
          label: 'Preselection',
          color: CAT.stage,
          children: [
            leaf('presel-1', 'Strategic fit', CAT.include),
            leaf('presel-2', 'Capacity & resources', CAT.include),
            leaf('presel-3', 'Client & funding check', CAT.risk),
            leaf('presel-4', 'Wins viable work', CAT.advantage),
          ],
        },
        {
          id: 'd2t',
          label: 'Decision to Tender',
          color: CAT.stage,
          children: [
            leaf('d2t-1', 'Bid / no-bid call', CAT.technique),
            leaf('d2t-2', 'Competition level', CAT.risk),
            leaf('d2t-3', 'Resource availability', CAT.include),
            leaf('d2t-4', 'Programme fit', CAT.include),
          ],
        },
        {
          id: 'appr',
          label: 'Project Appreciation',
          color: CAT.stage,
          children: [
            leaf('appr-1', 'Site visit', CAT.include),
            leaf('appr-2', 'Drawings & specs', CAT.include),
            leaf('appr-3', 'Constraints & access', CAT.risk),
            leaf('appr-4', 'Buildability', CAT.technique),
          ],
        },
        {
          id: 'est',
          label: 'Estimating the Works',
          color: CAT.stage,
          children: [
            leaf('est-1', 'Schedules of data', CAT.include),
            leaf('est-2', 'Supplier / subbie quotes', CAT.include),
            leaf('est-3', 'Operational estimates', CAT.technique),
            leaf('est-4', 'Estimating risks', CAT.risk),
          ],
        },
        {
          id: 'adj',
          label: 'Tender Adjudication',
          color: CAT.stage,
          children: [
            leaf('adj-1', 'Review the estimate', CAT.include),
            leaf('adj-2', 'Risk & opportunity', CAT.risk),
            leaf('adj-3', 'Margin & mark-up', CAT.technique),
            leaf('adj-4', 'Final tender price', CAT.advantage),
          ],
        },
        {
          id: 'sub',
          label: 'Tender Submission',
          color: CAT.stage,
          children: [
            {
              id: 'sub-tech',
              label: 'Technical submission',
              color: CAT.include,
              children: [
                leaf('sub-tech-1', 'Method statement', CAT.include),
                leaf('sub-tech-2', 'Programme', CAT.include),
                leaf('sub-tech-3', 'Key CVs & experience', CAT.include),
                leaf('sub-tech-4', 'Case studies', CAT.advantage),
              ],
            },
            {
              id: 'sub-comm',
              label: 'Commercial submission',
              color: CAT.technique,
              children: [
                leaf('sub-comm-1', 'Priced BoQ', CAT.include),
                leaf('sub-comm-2', 'Schedule of rates', CAT.include),
                leaf('sub-comm-3', 'Cash-flow forecast', CAT.technique),
              ],
            },
            {
              id: 'sub-qual',
              label: 'Qualifications',
              color: CAT.advantage,
              children: [
                leaf('sub-qual-1', 'Assumptions made', CAT.advantage),
                leaf('sub-qual-2', 'Clarifications', CAT.advantage),
              ],
            },
            {
              id: 'sub-excl',
              label: 'Exclusions',
              color: CAT.exclude,
              children: [
                leaf('sub-excl-1', 'Scope not included', CAT.exclude),
                leaf('sub-excl-2', 'Provisional sums', CAT.exclude),
                leaf('sub-excl-3', 'Client-supplied items', CAT.exclude),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'post',
      label: 'Part 2 · Post-Contract',
      color: CAT.exclude,
      children: [
        {
          id: 'profit',
          label: 'Profit Enhancement',
          color: CAT.advantage,
          children: [
            leaf('profit-1', 'Early completion', CAT.advantage),
            leaf('profit-2', 'Buying gains', CAT.advantage),
            leaf('profit-3', 'Reduce running costs', CAT.technique),
            leaf('profit-4', 'Increase productivity', CAT.technique),
            leaf('profit-5', 'Value engineering', CAT.technique),
          ],
        },
        {
          id: 'proc',
          label: 'Procurement',
          color: CAT.stage,
          children: [
            leaf('proc-1', 'Bulk buying', CAT.advantage),
            leaf('proc-2', 'Subcontract packages', CAT.include),
            leaf('proc-3', 'Material scheduling', CAT.technique),
          ],
        },
        {
          id: 'rep',
          label: 'Reporting',
          color: CAT.stage,
          children: [
            leaf('rep-1', 'CVR (cost-value)', CAT.technique),
            leaf('rep-2', 'Cash-flow report', CAT.include),
            leaf('rep-3', 'Variance analysis', CAT.risk),
          ],
        },
        {
          id: 'admin',
          label: 'Contract Administration',
          color: CAT.stage,
          children: [
            leaf('admin-1', 'Interim valuations', CAT.include),
            leaf('admin-2', 'Variations', CAT.technique),
            leaf('admin-3', 'Claims & notices', CAT.risk),
            leaf('admin-4', 'Final accounts', CAT.advantage),
          ],
        },
      ],
    },
    {
      id: 'profit-aim',
      label: 'The Aim · Profit',
      color: CAT.branch,
      children: [
        {
          id: 'secure',
          label: 'Secure',
          color: CAT.include,
          children: [
            leaf('secure-1', 'Win at viable margin', CAT.include),
            leaf('secure-2', 'Risk safeguards', CAT.risk),
          ],
        },
        {
          id: 'enhance',
          label: 'Enhance',
          color: CAT.advantage,
          children: [
            leaf('enhance-1', 'Exploit opportunities', CAT.advantage),
            leaf('enhance-2', 'Drive efficiency', CAT.technique),
          ],
        },
      ],
    },
  ],
}

/** Ids expanded on first render — show the spine, hide the deep detail. */
export const DEFAULT_OPEN = ['root', 'pre', 'post', 'profit-aim']
