/* ════════════════════════════════════════════════════════════════════
   Contract Practice & Administration — a second subject.
   Consolidated from Roshan de Silva's five-part CPD deck (FIDIC 1999 Red
   Book focus). Structured as six branches for the radial mind map, each
   with expandable topics carrying the exam-critical points.
   ════════════════════════════════════════════════════════════════════ */

export const CONTRACTS_COURSE = {
  title: 'Contract Practice & Administration',
  subtitle: 'FIDIC 1999 Red Book · MRICS & AIQS APC — Technical (Core) competency',
  author: 'Roshan de Silva',
  intro:
    'Contract practice, administration and law are an iceberg: contract creation & negotiation sit above the water; contract management — where value is realised — sits below.',
}

export interface Topic {
  label: string
  clause?: string
  points: string[]
}
export interface Branch {
  id: string
  label: string
  short: string
  color: string
  angle: number // degrees, 0 = right, clockwise
  blurb: string
  topics: Topic[]
}

/** Six spokes of the subject, arranged around the hub. */
export const BRANCHES: Branch[] = [
  {
    id: 'practice',
    label: 'Contract Practice',
    short: 'Practice',
    color: '#5B7DA6',
    angle: -90,
    blurb: 'Preparing & understanding the contract BEFORE it is executed.',
    topics: [
      {
        label: 'What is a Contract',
        points: [
          'Legally binding agreement, specific terms, promise vs benefit.',
          'Written or oral — property transactions SHALL be in writing.',
          'Terms: Express (agreed), Incorporated (by notice/course of dealing), Implied (by law — decennial liability).',
        ],
      },
      {
        label: 'Prerequisites (7 elements)',
        points: [
          'Offer · Acceptance (conditional = counter-offer) · Consideration',
          'Intention to create legal relations · Legal capacity · Legality',
          'Good faith & fair dealing.',
        ],
      },
      {
        label: 'Contract Documents',
        points: [
          'Vol 1 agreement/tender/CoC · Vol 2 specs · Vol 3 drawings · Vol 4 BOQ.',
          'Contract vs tender docs — LOA, addenda & PTCs are added to the Contract.',
        ],
      },
      {
        label: 'Priority of Documents',
        clause: 'FIDIC 1999',
        points: [
          'Resolves conflict between provisions — proactive dispute safeguard.',
          '1999 order: Agreement → LOA → Letter of Tender → Particular → General → Specs → Drawings → Schedules.',
          'Engineer issues clarification for any ambiguity/discrepancy.',
        ],
      },
      {
        label: 'Discrepancy vs Ambiguity',
        clause: 'Art. 226',
        points: [
          'Discrepancy — two different requirements for the same thing → priority of documents.',
          'Ambiguity — no information at all → contra proferentem (against the drafter).',
          'Article 226 — a doubt is resolved in favour of the obligor.',
        ],
      },
      {
        label: 'Standard Forms',
        points: [
          'FIDIC Red (employer-design) · Yellow (P&DB) · Silver (EPC) · Green (short).',
          'JCT · NEC 3/4. Balanced risk (FIDIC 1999 favours Employer), time-tested, fewer disputes.',
        ],
      },
    ],
  },
  {
    id: 'securities',
    label: 'Securities & Insurance',
    short: 'Securities',
    color: '#8A6491',
    angle: -30,
    blurb: 'Protecting the Employer against default, damage and loss.',
    topics: [
      {
        label: 'Performance Bond',
        clause: '4.2',
        points: [
          'Bank/FI, amount in contract (~10% of contract sum), locally reputed.',
          'Must be UNCONDITIONAL & ON DEMAND — Employer need not prove default.',
          'Not submitted → no payment, no works, right to terminate.',
        ],
      },
      {
        label: 'Alternatives to a bond',
        points: [
          'Standby Letter of Credit — pays against documents, not the default itself.',
          'Parent Company Guarantee — parent completes if subsidiary fails.',
          'Additional cash retention (not recommended).',
        ],
      },
      {
        label: 'Advance Payment',
        points: [
          'Not in FIDIC 1987; in 1999/2017. Eases negative early cash flow, lowers tender price.',
          'Paid against an advance-payment bond; recovered by % in each IPC.',
        ],
      },
      {
        label: 'Insurances',
        clause: '18',
        points: [
          'Works (full reinstatement + demolition/debris/fees) · Third Party · Plant · Workmen.',
          'Designer → Professional Indemnity. CAR = works + third-party (non-standard).',
        ],
      },
      {
        label: 'Occurrence vs Claims-made',
        points: [
          'Occurrence — incident during policy (long-tail), higher premium.',
          'Claims-made — claim reported during policy only, lower premium.',
        ],
      },
      {
        label: 'Subrogation',
        points: [
          'Insurer’s right to sue whoever caused the loss.',
          'Waiver of subrogation removes that right (e.g. Employer-caused fire).',
        ],
      },
    ],
  },
  {
    id: 'loaloi',
    label: 'LOI / LOA & Privity',
    short: 'LOI / LOA',
    color: '#E0A23B',
    angle: 30,
    blurb: 'Getting started early, and extending rights beyond the two parties.',
    topics: [
      {
        label: 'Letter of Intent (LOI)',
        points: [
          'Interest to contract at a future date — no contractual relationship, limited liability.',
          '3 types: comfort · instruction to proceed (to a value) · recognising a binding contract.',
          'Work done under LOI → quantum meruit (fair & reasonable value).',
        ],
      },
      {
        label: 'Letter of Acceptance (LOA)',
        points: [
          'Formal acceptance → binding contract.',
          'Consequences: commencement date, bonds, programme, cash-flow, insurance, LS breakdown.',
        ],
      },
      {
        label: 'Privity of Contract',
        points: [
          'Only parties to a contract can enforce it (may not apply in KSA/Qatar).',
          'Overcome via assignment, collateral warranty or novation.',
        ],
      },
      {
        label: 'Assignment vs Novation',
        points: [
          'Assignment — transfers the BENEFIT only, not the burden.',
          'Novation — transfers benefit AND burden; a new contract replaces the old party.',
          'Ab-initio (all historic liability) vs Switch (from novation date).',
        ],
      },
    ],
  },
  {
    id: 'admin',
    label: 'Contract Administration',
    short: 'Administration',
    color: '#D9694C',
    angle: 90,
    blurb: 'Managing the contract AFTER signing — compliance & change.',
    topics: [
      {
        label: 'Practice vs Administration',
        points: [
          'Practice — before execution (drafting & understanding).',
          'Administration — after signing (compliance & resolving issues).',
        ],
      },
      {
        label: 'Variations (Right to Vary)',
        clause: '13.1',
        points: [
          'Changes to the WORKS, not the Contract. Engineer may vary before TOC.',
          'Grounds: quantity, quality, levels/positions, omission, additional work, sequence/timing.',
          'No alteration until the Engineer instructs/approves.',
        ],
      },
      {
        label: 'Sources of variation',
        points: [
          'Engineer’s instructions · RFI responses · drawing/spec changes.',
          'Employer/authority requirements · unforeseen site conditions.',
        ],
      },
      {
        label: 'Materials on / off site',
        points: [
          'For permanent works, listed in appendix, 80% of Engineer-determined cost.',
          'Off-site: bill of lading, bank guarantee, proof of freight/insurance payment.',
        ],
      },
      {
        label: 'Vesting Certificate',
        points: [
          'Designates materials as the Employer’s property with title, wherever located.',
          'Less protection than an APG — remedy limited to breach damages.',
        ],
      },
      {
        label: 'Retention',
        clause: '14',
        points: [
          'Money withheld to secure defect rectification.',
          '1st half released at TOC, 2nd half at expiry of DNP. Retention bond → early release.',
        ],
      },
    ],
  },
  {
    id: 'claims',
    label: 'Time & Claims',
    short: 'Time & Claims',
    color: '#7C8C5A',
    angle: 150,
    blurb: 'Extension of time, prolongation and the claim machinery.',
    topics: [
      {
        label: 'Extension of Time (EOT)',
        clause: '8.4',
        points: [
          'Avoids LD exposure / a Time-at-Large situation.',
          'Grounds: variation, delay per a sub-clause, adverse climate, epidemic/gov’t shortage, Employer delay.',
        ],
      },
      {
        label: 'Time at Large & Prevention',
        points: [
          'No completion date / no power to extend when Employer delays.',
          'Prevention principle — Employer can’t enforce time nor apply LD for its own delay (Peak v McKinney).',
        ],
      },
      {
        label: 'Claim procedure (28/42/28)',
        clause: '20.1',
        points: [
          'Initial notice — within 28 days of awareness.',
          'Detailed particulars — within 42 days (ongoing).',
          'Final particulars — within 28 days after the event ends.',
        ],
      },
      {
        label: 'Types of claim',
        points: [
          'Contractual (Cl. 20) · at law (implied terms) · quantum meruit (LOI) · ex-gratia.',
          'Structure: Facts → Legal basis → Liability → Quantum. Show cause & effect.',
        ],
      },
      {
        label: 'HO overhead formulas',
        points: [
          'Hudson · Emden · Eichleay (SCL protocol).',
          'SCL doesn’t favour Hudson (uses tender HO/P) — Walter Lilly v Mackay.',
        ],
      },
    ],
  },
  {
    id: 'completion',
    label: 'Completion & Finance',
    short: 'Completion',
    color: '#D98324',
    angle: 210,
    blurb: 'Taking over, defects, final account and damages.',
    topics: [
      {
        label: 'Taking-Over Certificate',
        clause: '10',
        points: [
          'Requirements: substantially complete, passed Tests on Completion, written undertaking for outstanding work.',
          'Consequences: DNP starts, 1st-half retention released, LD liability ends, decennial liability starts.',
        ],
      },
      {
        label: 'Defects (DLP / DNP)',
        clause: '11',
        points: [
          'Patent (evident now) vs Latent (appear later). ~12 months to cover all climates.',
          'End of DNP → DLC in 28 days, 2nd-half retention released, security released.',
        ],
      },
      {
        label: 'Interim valuations',
        clause: '14.6',
        points: [
          'Monthly statement: permanent works + variations, BOQ items, MOS, fluctuations.',
          'IPC: retention, advance recovery, contra charges; min amount; within contract time frame.',
        ],
      },
      {
        label: 'Final Account',
        clause: '14.11',
        points: [
          'Draft final statement 56 days after Performance Certificate.',
          'FPC within 28 days; Employer pays within 56 days of the FPC.',
        ],
      },
      {
        label: 'Liquidated & Ascertained Damages',
        points: [
          'Genuine pre-estimate of the Employer’s loss for Contractor breach.',
          'Liquidated = pre-agreed not yet quantified; Ascertained = pre-agreed & calculable.',
        ],
      },
      {
        label: 'Termination & Force Majeure',
        clause: '15 / 16',
        points: [
          'Determination = mutual end; Termination = end for breach/default.',
          'Force majeure (Art. 273) auto-cancels; frustration (Art. 893) — either party may cancel.',
        ],
      },
    ],
  },
]

/** The signature clause map — memorise cold. */
export const KEY_CLAUSES: { c: string; t: string }[] = [
  { c: '2.4', t: 'Employer’s financial arrangements' },
  { c: '4.2', t: 'Performance security' },
  { c: '8.4', t: 'Extension of Time' },
  { c: '10', t: 'Taking over' },
  { c: '11', t: 'Defects' },
  { c: '12', t: 'Valuation' },
  { c: '13.1', t: 'Right to vary' },
  { c: '13.3', t: 'Variation procedure' },
  { c: '14.6', t: 'Issue of IPC' },
  { c: '14.7', t: 'Payment' },
  { c: '20.1', t: 'Claims (28/42 days)' },
]

/** Variation vs Claim — a classic exam contrast. */
export const VAR_VS_CLAIM: { a: string; b: string }[] = [
  { a: 'Formal scope change to the Works', b: 'Request for extra time / money' },
  { a: 'Initiated by client or contractor', b: 'Arises from delay / unforeseen events' },
  { a: 'Valued & executed per contract terms', b: 'Requires evidence of impact' },
  { a: 'Affects price and/or schedule', b: 'Must demonstrate cause & effect' },
]
