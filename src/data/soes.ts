/* ════════════════════════════════════════════════════════════════
   Sample Summaries of Experience — Commercial Management of
   construction works (RICS APC). Written in first person across
   Levels 1–3, following standard SOE conventions (knowledge → doing →
   advising), as worked examples / structural models only.
   ════════════════════════════════════════════════════════════════ */

export interface SoeLevel {
  level: 'Level 1' | 'Level 2' | 'Level 3'
  heading: string
  body: string
}

export interface SampleSoe {
  id: string
  title: string
  focus: string
  stage: 'Pre-Contract' | 'Post-Contract'
  color: string
  context: string
  levels: SoeLevel[]
}

export const SOE_INTRO =
  'These are illustrative models showing how a Commercial Management SOE can be structured — knowledge at Level 1, application at Level 2, and reasoned advice at Level 3. They are written in the first person and kept deliberately concise. Use them to shape your own statements; never copy them — your SOE must evidence your real projects, your decisions and your reflection.'

export const SOE_TIPS = [
  'Write in the first person and the past tense — “I prepared…”, “I advised…”.',
  'Level 1 = knowledge & understanding; Level 2 = applying it on a real project; Level 3 = the reasoned advice you gave and why.',
  'Use specific, anonymised projects and quantify where you can (value, %, programme).',
  'Show judgement and alternatives considered — not just what you did, but why.',
  'Avoid prohibited framing: contractors pursue profitability (not “value for money”); never write “discount”.',
  'Keep within the word count and be ready to be questioned on every claim at interview.',
]

export const SAMPLE_SOES: SampleSoe[] = [
  {
    id: 'soe-estimating',
    title: 'Estimating & Tender Adjudication',
    focus: 'Pre-contract · securing the intended profit at bid stage',
    stage: 'Pre-Contract',
    color: '#9E875D',
    context:
      'A ~£24m design-and-build commercial fit-out tender on which I represented the estimating team as the lead quantity surveyor.',
    levels: [
      {
        level: 'Level 1',
        heading: 'Knowledge & understanding',
        body: 'I understand that commercial management for a contractor is the process of first securing the intended profit priced at tender and then enhancing it, and that this differs fundamentally from the client’s pursuit of value for money. I understand how a tender price is built up from first principles — the net unit rate comprising material, labour, plant and subcontractor costs — and how a cost-only estimate is converted into a tender bid by the addition of head office overhead, profit and a risk allowance at adjudication. I am aware of the principal estimating risks, including incomplete drawings, BOQ inaccuracy, price fixity and liquidated-damages exposure, and of the procurement and contract types that carry them.',
      },
      {
        level: 'Level 2',
        heading: 'Application of knowledge',
        body: 'On the fit-out tender I built up the major rates from first principles, separating the all-in labour rate (basic pay, visa, welfare and site tools) from material costs (net cost plus delivery, wastage and distribution). Where in-house data was not relevant I sourced supplier quotations, issuing enquiries that stated the scope, specification, delivery period and required validity. I prepared the risk register, categorising each risk by likelihood and impact, and I reduced several items by raising tender queries to the employer to clarify the specification. I then presented the estimate at the adjudication meeting, setting out the net cost, the recommended head-office overhead recovery and the residual priced risk.',
      },
      {
        level: 'Level 3',
        heading: 'Reasoned advice',
        body: 'At adjudication I advised the directors that the liquidated-damages exposure created by the client’s compressed 14-month programme should be carried as a priced risk rather than absorbed in the margin, because our realistic programme required 16 months. I quantified the exposure and recommended a corresponding allowance, while advising that a pre-bid agreement with our principal cladding supplier — fixing his price in return for a commitment to procure from him on award — would offset the market-fluctuation risk. I advised against any front- or back-loading of the priced rates on ethical grounds. The bid was submitted at a defensible margin and won; my reasoning on the risk allowance was later vindicated when the programme was formally extended.',
      },
    ],
  },
  {
    id: 'soe-reporting',
    title: 'Cost Reporting — CVR & Cost to Complete',
    focus: 'Post-contract · protecting and enhancing the secured margin',
    stage: 'Post-Contract',
    color: '#8A6491',
    context:
      'A ~£40m hospital project on which I was the project quantity surveyor responsible for monthly commercial reporting.',
    levels: [
      {
        level: 'Level 1',
        heading: 'Knowledge & understanding',
        body: 'I understand that post-contract commercial management protects and enhances the margin secured at tender, principally through reporting. I understand that Cost Value Reconciliation compares the cost incurred against the value of work earned in a period — the project’s profit-and-loss account — drawing cost from the ledger, accruals and subcontractor liabilities, and value from the interim application or certificate, with adjustments for under- and over-measure, disputed items and material on site. I understand that Cost to Complete adds the forecast cost of the balance works to the actual cost to date, to test the anticipated final position against both the budget and the final account.',
      },
      {
        level: 'Level 2',
        heading: 'Application of knowledge',
        body: 'I produced the monthly CVR for the project, reconciling the certified value against ledger cost and accruals and adjusting for under-measure in our application and for subcontractor liabilities not yet invoiced. I deliberately excluded material on site from the value, treating it as an advance payment recoverable on incorporation. I also maintained the Cost to Complete, forecasting the cost of the remaining works with the planning and operations teams and comparing the projected final cost against the original budget. I integrated the risks-and-opportunities register into the forecast so that the net position carried through to the reported margin.',
      },
      {
        level: 'Level 3',
        heading: 'Reasoned advice',
        body: 'When a two-month CVR trend showed the in-period margin eroding on the MEP package, I advised the commercial lead that the cause was an under-recovered variation rather than a true cost overrun, and recommended we accelerate the variation account upstream while holding the subcontractor’s liability flat in the forecast. I advised excluding the disputed claim from value until it was agreed, to avoid reporting an unrealised profit. I further advised that material on site should remain outside the CVR to prevent double-counting once it was built in. These recommendations kept the reported forecast honest and gave the board reliable early warning, allowing corrective action before the final account.',
      },
    ],
  },
  {
    id: 'soe-procurement',
    title: 'Subcontract Procurement & Risk',
    focus: 'Post-contract · procurement, negotiation and risk balance',
    stage: 'Post-Contract',
    color: '#7C8C5A',
    context:
      'A ~£18m residential project on which I led the procurement of the major subcontract packages and the risk-and-opportunity process.',
    levels: [
      {
        level: 'Level 1',
        heading: 'Knowledge & understanding',
        body: 'I understand that effective procurement protects the tendered margin and that profit enhancement rests on an appropriate balance between risks and opportunities. I understand the subcontract tendering routes available to a contractor — open, selective and negotiated — and that, in a contracting organisation, financial prequalification of subcontractors is seldom obtained, so capability is assessed from past performance and references. I understand the ethical position on negotiation: as a professional I must act in good faith, so I negotiate for budget-aligned gains through give-and-take rather than demanding a “discount”, which RICS treats as seeking an undue advantage.',
      },
      {
        level: 'Level 2',
        heading: 'Application of knowledge',
        body: 'I prepared the subcontracting schedule and, after a brainstorming session with the execution team on whether the works could be self-delivered, issued enquiries to a selective list assessed on their previous delivery, workforce and quality. I evaluated the returns commercially — leaving the technical assessment to a qualified engineer — and negotiated improved positions by offering better payment terms and increased advance payment in exchange for reduced prices. I maintained the risks-and-opportunities register on a three-tier probabilistic basis (worst, expected and best case) and carried the net position into the cost-to-complete report.',
      },
      {
        level: 'Level 3',
        heading: 'Reasoned advice',
        body: 'On the groundworks package I advised against the lowest return, because that subcontractor’s history of late delivery created a programme risk that outweighed the saving; I recommended the second tender, supported by my register’s assessment of the delay exposure. Separately, I advised the project manager that a bulk rebar order across our two concurrent projects of the same specification would secure a genuine buying gain, but only if we could fund the upfront commitment without harming cash flow and could control the inventory — so I recommended proceeding only once the cash-flow forecast confirmed the headroom. Both recommendations were adopted and protected the package margins.',
      },
    ],
  },
]
