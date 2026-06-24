/* ════════════════════════════════════════════════════════════════
   Complete Lecturer's Notes — faithful, page-by-page transcription of
   "Commercial Management (of Construction Works)" by Asmy Sheriff
   (MRICS, MAIQS, CQS, LLM, CCMP, MBA, MCIOB, BSc(Eng)).

   Every content page of the handout is captured here, in the original
   teaching order (Day 1 → Day 2 → Day 3), so nothing from the source
   is left out.
   ════════════════════════════════════════════════════════════════ */

export type NoteTone = 'tan' | 'sage' | 'coral' | 'sky' | 'plum' | 'amber'

export type NoteBlock =
  | { t: 'lead'; text: string }
  | { t: 'bullets'; heading?: string; items: string[] }
  | { t: 'cols'; cols: { heading: string; tone?: NoteTone; items: string[] }[] }
  | { t: 'steps'; heading?: string; steps: string[] }
  | { t: 'table'; headers: string[]; rows: string[][] }
  | { t: 'formula'; caption?: string; lines: string[] }
  | { t: 'note'; tone: 'tip' | 'example' | 'watch' | 'q'; title?: string; text: string }
  | { t: 'define'; term: string; text: string }
  | { t: 'pills'; items: string[] }

export interface NotePage {
  id: string
  /** short page tag e.g. "Pg 7" */
  page: string
  day: 1 | 2 | 3
  /** small kicker — the slide's running header */
  phase: string
  title: string
  /** flags the lecturer marked "Q" — likely APC / exam focus */
  exam?: boolean
  /** SOE / day-divider milestone card */
  milestone?: boolean
  blocks: NoteBlock[]
}

export interface NoteDay {
  day: 1 | 2 | 3
  title: string
  subtitle: string
}

export const NOTE_DAYS: NoteDay[] = [
  { day: 1, title: 'Day 1 — Prior to Contract', subtitle: 'Estimating, tendering, pricing the bid and the run-up to a winning, profitable price.' },
  { day: 2, title: 'Day 2 — Budgets & Post-Contract Control', subtitle: 'Tender adjudication, establishing the budget, and the post-contract control tools — CVR, CTC and cost reports.' },
  { day: 3, title: 'Day 3 — Performance & Cash', subtitle: 'Earned Value, cash-flow forecasting, supply-chain management and the commercial manager’s role.' },
]

export const COMPLETE_NOTES_INTRO =
  'This is the full lecturer’s handout, transcribed page by page in teaching order — the detailed companion to the slide deck. Use it as your complete revision reference; nothing from the source notes is left out.'

export const COMPLETE_NOTES: NotePage[] = [
  /* ───────────────────────── DAY 1 ───────────────────────── */
  {
    id: 'cn-checklist', page: 'Pg 0', day: 1, phase: 'Course checklist',
    title: 'Commercial Management of Construction Works',
    blocks: [
      { t: 'lead', text: 'Delivered by Asmy Sheriff — MRICS, MAIQS, CQS, LLM, CCMP, MBA, MCIOB, BSc(Eng). A three-day programme on managing the commercial life of a project from inception to completion.' },
      { t: 'cols', cols: [
        { heading: 'Commercial fundamentals', tone: 'tan', items: ['Estimating', 'Tendering', 'Profitability', 'Competitiveness', 'Establishing budgets', 'Cash flow', 'Reporting financial progress against budget'] },
        { heading: 'Procurement & control', tone: 'sage', items: ['Procurement of labour', 'Procurement of plant and materials', 'Procurement of subcontract', 'Financial management of the supply chain', 'Financial management of multiple projects', 'Earned Value Management', 'Cost Value Reconciliation'] },
      ] },
    ],
  },
  {
    id: 'cn-what-why', page: 'Pg 1', day: 1, phase: 'What is commercial management', exam: true,
    title: 'What & why of commercial management',
    blocks: [
      { t: 'define', term: 'Commercial management', text: 'The identification of risk and development of business opportunities — and to generate profit from inception to completion of the project.' },
      { t: 'bullets', heading: 'Why we need commercial management', items: ['To implement an effective cost-control system', 'Risk management', 'Avoid cost overrun', 'Manage contractual issues', 'Forecasting'] },
      { t: 'cols', cols: [
        { heading: 'Considerations', tone: 'sky', items: ['Authorities', 'Design', 'Services', 'HSE', 'Contractual'] },
        { heading: 'Opportunities to add value', tone: 'sage', items: ['Early completion', 'Buying gain', 'Reduce running cost', 'Value engineering', 'Increase productivity'] },
      ] },
    ],
  },
  {
    id: 'cn-when-starts', page: 'Pg 2', day: 1, phase: 'Prior to contract',
    title: 'When does commercial management start?',
    blocks: [
      { t: 'lead', text: 'At the time of collecting the tender. We need to think about why we are collecting this tender — comparing it to our long-term / short-term business plan.' },
      { t: 'note', tone: 'tip', text: 'After receiving the tender documents, if management decides not to go for that tender — considering the tender prices or any other reason — notify the employer immediately to maintain a good relationship.' },
    ],
  },
  {
    id: 'cn-tendering-def', page: 'Pg 6', day: 1, phase: 'Prior to contract — Tendering', exam: true,
    title: 'Tendering vs procurement',
    blocks: [
      { t: 'define', term: 'Procurement', text: 'The overall act of obtaining goods and services from external sources (i.e. a building contractor). This includes deciding how those goods are to be acquired by reviewing the client’s requirements — time, quality and cost — and their attitude to risk.' },
      { t: 'bullets', heading: 'Tendering is', items: ['The bidding process, to obtain a price', 'The appointment method of the contractor'] },
      { t: 'note', tone: 'q', text: 'Tendering is an important phase in the procurement strategy — but procurement involves much more than simply obtaining a price.' },
    ],
  },
  {
    id: 'cn-commercial-report', page: 'Pg 7', day: 1, phase: 'Prior to contract — Tendering', exam: true,
    title: 'The commercial manager’s report to management',
    blocks: [
      { t: 'lead', text: 'After collecting and before bidding, the commercial manager submits a commercial report to management. This report should include:' },
      { t: 'bullets', items: [
        'Brief of the project — to decide the staff level / skill required',
        'About the client — history of payment, continuous project, project type, client type',
        'About the consultant — history, level of detail they provide, design changes, communication level',
        'Location — massive impact in terms of cost and other factors',
        'Status of our resources — yard resources, machinery, required outsourcing',
        'Condition of contract and its impacts — FIDIC, bespoke, regional or specific, etc.',
        'Client’s financial position — payment method',
        'Execution of works — in-house or subcontract',
        'Assumptions',
        'Cash-flow requirements',
        'Alternative enhancement — value engineering',
        'Exclusions',
        'Risk and opportunity registry',
      ] },
    ],
  },
  {
    id: 'cn-cm-responsibility', page: 'Pg 8', day: 1, phase: 'Prior to contract — Tendering',
    title: 'Responsibilities once management says "go"',
    blocks: [
      { t: 'steps', steps: [
        'Identify all the required insurances',
        'Communicate with other departments to find detailed information and prices',
        'Make the decision on in-house or subcontract (e.g. design)',
        'If external support is used, identify the arrangements required — insurances, collateral warranties, etc.',
        'If design is by a subcontractor — arrange an undertaking / endorsement / consortium / joint venture',
        'Start to process the estimation',
        'Identify vendors and subcontractors',
        'Market research',
      ] },
    ],
  },
  {
    id: 'cn-estimation-holistic', page: 'Pg 9', day: 1, phase: 'Prior to contract — Tendering',
    title: 'The process of estimation — a holistic view',
    blocks: [
      { t: 'steps', steps: [
        'Initially prepare a basic cost estimation without any profit (Dry Cost) — it is very common that the basic cost estimation does not vary much between competitors',
        'Now include the profit margin to bring the price to a competitive pricing level',
        'Subsequently the price is adjusted by management as a last-minute adjustment for that specific project',
      ] },
      { t: 'bullets', heading: 'People involved in this process', items: ['Estimation Manager — pre-contract dealing', 'Commercial Manager — post-contract dealing'] },
    ],
  },
  {
    id: 'cn-pricing-methods', page: 'Pg 10', day: 1, phase: 'Prior to contract — Tendering', exam: true,
    title: 'Two methods to price the tender',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Estimator’s tender / estimate', tone: 'tan', items: ['Usual method of pricing the work, using the Method of Measurement (MoM)', 'Based on quantity / labour / material / services / plant, etc.'] },
        { heading: 'Operational tender / estimate', tone: 'plum', items: ['Experienced people recognise the cost or time required for any work using their experience (know-how)', 'Example — concrete: experienced people consider the complete volume and price it from their expertise'] },
      ] },
      { t: 'note', tone: 'tip', text: 'Operational tendering helps during pricing — it assists in identifying any price variance. Before submitting any bid, the estimator’s estimate should be compared against the operational tender.' },
    ],
  },
  {
    id: 'cn-estimation-techniques', page: 'Pg 11', day: 1, phase: 'Prior to contract — Tendering', exam: true,
    title: 'Estimator’s estimation techniques',
    blocks: [
      { t: 'define', term: 'Unit method', text: 'Simplest and quickest method of estimating the cost of a proposed construction project. The quantity surveyor counts the number of units which are going to be accommodated in a building.' },
      { t: 'define', term: 'Superficial method', text: 'Also known as the square-metre method — one of the quickest ways of calculating the cost of a building. It is the first estimate a QS prepares when initial sketch drawings are produced by the architect.' },
      { t: 'define', term: 'Elemental cost plan', text: 'For design and construction. Generally prepared by cost consultants (often QSs) using NRM1. Cost plans evolve through the life of the project, developing in detail and accuracy as more information becomes available; actual prices are then provided by specialist contractors, contractors and suppliers.' },
      { t: 'define', term: 'Comparative cost plan', text: 'Assumes initial feasibility studies and cost advice have determined the general layout within the total estimated or prescribed cost limit, and examines the "market of alternatives" open to the designer for each part of the building.' },
      { t: 'define', term: 'Approximate quantities method', text: 'Regarded as the best because it is more accurate and reliable than other methods. Based on measurement groups where bill items with the same dimensions (in metres or square metres) are grouped together.' },
    ],
  },
  {
    id: 'cn-estimation-def', page: 'Pg 3', day: 1, phase: 'Prior to contract — Estimation', exam: true,
    title: 'Estimation & the contractor’s cost element',
    blocks: [
      { t: 'define', term: 'Estimation', text: 'An approximate cost of a construction project or operation — usually at the pre-construction & pre-contract stage.' },
      { t: 'bullets', heading: 'Stages of a project', items: ['Inception', 'Pre-Contract', 'Construction', 'Operation'] },
      { t: 'formula', caption: 'Summary of estimation using the contractor’s cost element', lines: [
        'Variable cost  (Material · Goods · Resources)',
        '+ Fixed cost',
        '+ Marginal adjustment to the element (%)   →   unit price',
        '+ Profit margin (%)',
        '= Final price',
      ] },
    ],
  },
  {
    id: 'cn-preliminaries', page: 'Pg 4', day: 1, phase: 'Prior to contract — Estimation',
    title: 'Preliminaries (general items)',
    blocks: [
      { t: 'lead', text: 'General items required for any work package to deliver the employer’s requirements — not directly required to complete the work itself.' },
      { t: 'cols', cols: [
        { heading: 'Examples of preliminaries', tone: 'tan', items: ['Site staff — storekeeper, engineer, QS, foreman', 'Head-office staff', 'Toilet, mess huts, office', 'Temporary fencing', 'Small tools, compressors', 'Lab tests, approvals, completion procedures', 'Equipment transportation', 'Insurance', 'Signboards, security, cleaners', 'Scaffolding & hoisting'] },
        { heading: 'While assessing / estimating prelims', tone: 'amber', items: ['Length of the contract', 'Location of the project', 'Size of the project', 'Availability of the services', 'Authorities’ requirements', 'Existing facilities', 'Any other supports required'] },
      ] },
    ],
  },
  {
    id: 'cn-developing-estimate', page: 'Pg 5', day: 1, phase: 'Prior to contract — Estimation',
    title: 'Developing the detailed (cost) estimate',
    blocks: [
      { t: 'lead', text: 'Measured quantities and rate build-ups combine into the detailed estimate and, ultimately, the site budget.' },
      { t: 'cols', cols: [
        { heading: 'Inputs to the rate build-ups', tone: 'tan', items: ['1 · Measurement rules', '2 · Resource rates — labour, plant & material; labour & plant output; material usage', '3 · Subcontract prices & specifications', '4 · Contingency, risk, opportunities, overhead and profit', 'Sources: BCIS, price books, manufacturers / suppliers, previous projects'] },
        { heading: 'The detailed estimate adds (per programme)', tone: 'sage', items: ['5 · Programme', 'Preliminaries / site overhead', 'Provisional items', 'Contingency', 'Fixed prices / inflation', 'Risk and opportunities', 'Corporate overhead', 'Profit — check how each is impacted by the programme'] },
      ] },
    ],
  },
  {
    id: 'cn-boq-loading', page: 'Pg 12', day: 1, phase: 'Prior to contract — While pricing the tender', exam: true,
    title: 'Pricing the tender — BOQ loading & employer’s requirements',
    blocks: [
      { t: 'bullets', heading: 'The BOQ can be prepared in three manners', items: [
        'Front loaded — allocate a higher proportion of cost to the early stages (improves cash flow, avoids client-insolvency exposure)',
        'Back loaded — a higher proportion of cost is claimed at a later stage (to receive a bulk amount later)',
        'Spot pricing — adjusting BOQ item prices to reflect actual costs at the time of purchase or execution',
      ] },
      { t: 'bullets', heading: 'Employer’s requirements', items: ['1 · Condition of contract', '2 · Specification', '3 · Drawings', '4 · BOQ', '5 · Appendices'] },
    ],
  },
  {
    id: 'cn-labour-customs', page: 'Pg 13', day: 1, phase: 'Prior to contract — While pricing the tender',
    title: 'Labour · local customs & regulations',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Labour', tone: 'tan', items: ['Country labour law', 'Existing labour forces', 'Suitable places to bring labour from (e.g. for a high-rise, bring labour from China)', 'Charges', 'Productive time (records, pricing books, site feedback, government data)', 'Labour constraints'] },
        { heading: 'Local customs & regulations', tone: 'sky', items: ['Each country has different regulations — e.g. KSA changes the working schedule for extreme weather or Ramadan', 'Visa cost', 'Minimum salary requirements', 'Holidays', 'Health & safety requirements', 'Labour law'] },
      ] },
    ],
  },
  {
    id: 'cn-materials-transport', page: 'Pg 14', day: 1, phase: 'Prior to contract — While pricing the tender',
    title: 'Materials · transportation',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Materials', tone: 'tan', items: ['In accordance with the specification or drawing', 'Identify material requirements — types / methods of installation, quantity, contingency', 'Raise queries if more information is needed'] },
        { heading: 'Transportation', tone: 'plum', items: ['Consider transport from foreign countries & specialised shipping requirements', 'Supply, quantities, waste, local delivery', 'International transport may be CIF or FOB — if a quotation is FOB, calculate the CIF cost'] },
      ] },
    ],
  },
  {
    id: 'cn-plant-clarification', page: 'Pg 15', day: 1, phase: 'Prior to contract — While pricing the tender', exam: true,
    title: 'Plant & equipment · tender clarification',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Plant & equipment', tone: 'tan', items: ['What plant / equipment is required and the utilisation of existing plant', 'Capital cost', 'Depreciation', 'Wear and tear', 'Repair', 'Licenses', 'Consumables'] },
        { heading: 'Tender clarification', tone: 'amber', items: ['Any clarification should be recorded properly and estimated in cost or time impact', 'Especially for lump-sum projects, the tendering manager should have clear proof of who is responsible for any discrepancy'] },
      ] },
    ],
  },
  {
    id: 'cn-sitevisit-fluctuation', page: 'Pg 16', day: 1, phase: 'Prior to contract — While pricing the tender',
    title: 'Site visit · fluctuation',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Site visit (FIDIC 4.10)', tone: 'sky', items: ['Existing services', 'Site conditions', 'Soil conditions', 'Restrictions', 'Regulations and permits', 'Disposal arrangements', 'Any project next to the location', 'Availability of services'] },
        { heading: 'Fluctuation', tone: 'coral', items: ['Forecast from experience (especially material fluctuation)', 'Major fluctuation items: cable, wood, steel, cement, copper, concrete'] },
      ] },
    ],
  },
  {
    id: 'cn-provisional-risk', page: 'Pg 17', day: 1, phase: 'Prior to contract — Tendering',
    title: 'Provisional & prime cost sums · tender risk',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Pricing sums', tone: 'tan', items: ['Provisional sum — Defined: all attendances + OH + P + preliminaries · Undefined: nothing', 'Prime Cost sum — all attendances + OH + P + preliminaries'] },
        { heading: 'Risks associated with the tender', tone: 'coral', items: ['Risk in project duration', 'Payment terms', 'Consultant’s experience', 'Client cash flow & past payment experience', 'Risk in condition of contract', 'Discrepancies between documents', 'Long-lead items', 'Site access'] },
      ] },
      { t: 'steps', heading: 'How to identify and overcome these risks', steps: [
        'Conduct a risk workshop',
        'Identify and prepare a tender risk register',
        'Quantify them — magnitude and probability',
        'Find risk-management methods (avoid, transfer, etc.): propose value engineering as an alternative tender; take insurance; change the contract mechanism (target cost); for price fluctuation arrange a pre-bid agreement; for design / experience risk arrange collaboration',
        'If not possible, identify the contingency or allowance',
      ] },
    ],
  },
  {
    id: 'cn-soe-l1', page: 'Pg 20', day: 1, phase: 'Statement of Experience · End of Day 1', milestone: true,
    title: 'SOE — Level 1',
    blocks: [
      { t: 'lead', text: 'Apply the Day 1 pre-contract learning to a Level 1 Statement of Experience. See the "Sample SOEs" section for fully worked examples across Levels 1–3.' },
    ],
  },

  /* ───────────────────────── DAY 2 ───────────────────────── */
  {
    id: 'cn-adjudication', page: 'Pg 18', day: 2, phase: 'Prior to contract — Tendering', exam: true,
    title: 'Tender adjudication meeting',
    blocks: [
      { t: 'lead', text: 'After finalising the tender price, the commercial manager calls a discussion to elaborate how the bid was prepared. Mainly the CEO, project director, finance manager, directors and the relevant contract manager are invited.' },
      { t: 'bullets', heading: 'The discussion mainly covers', items: ['How the cost was established', 'Identified risks and mitigations', 'Cash flow', 'Opportunities', 'How the OH was calculated', 'Profit expectation', 'Profit for each year', 'Discounts or negotiations from suppliers or subcontractors'] },
    ],
  },
  {
    id: 'cn-reduce-failed', page: 'Pg 19', day: 2, phase: 'Prior to contract — Tendering',
    title: 'Reducing the price · if tenders keep failing',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'If asked to reduce the finalised tender price', tone: 'tan', items: ['Negotiate with suppliers or subcontractors for a discount', 'Optimise or reduce the overhead (OH) cost', 'Review the risk and opportunity register', 'Check the possibility of bringing money from own funds vs a bank loan (which charges interest)'] },
        { heading: 'If your submissions continuously fail', tone: 'coral', items: ['Study internal and external factors and the companies who won the project', 'Reduce the overhead (OH)', 'Establish a proper strategy', 'Check the contingency factors and optimise them'] },
      ] },
    ],
  },
  {
    id: 'cn-budget', page: 'Pg 20', day: 2, phase: 'Prior to contract — Establishing budget',
    title: 'Establishing the budget',
    blocks: [
      { t: 'define', term: 'Budget', text: '(Also called the "budget to build" / post-tender budget.) An evolution of the estimate, updated to reflect information that was not available when the estimate was first produced — and updated often.' },
      { t: 'bullets', heading: 'Budget is prepared considering', items: ['Specification', 'Assumptions', 'Cash-flow information', 'Drawings and others', 'List of value-enhancing activities', 'Risk register', 'Exclusions'] },
      { t: 'note', tone: 'q', text: 'The main objective of the budget is to meet cost, quality and time — so budget preparation deserves enough attention.' },
    ],
  },
  {
    id: 'cn-project-budget', page: 'Pg 21', day: 2, phase: 'Prior to contract — Establishing budget',
    title: 'Establishing the project budget (the project team executes this)',
    blocks: [
      { t: 'steps', steps: [
        'Receive the target cost (planned cost) from the estimation team',
        'Review and re-measure the drawings and contract documents to establish the final quantity',
        'Forecast cost for material and subcontract from the above calculation',
        'Discuss with the project manager and planning team',
        'Prepare the resource schedule to identify labour quantity and establish the forecasted labour cost',
        'Establish general requirements / prelims cost based on the calculated resources',
        'Prepare the plant & equipment schedule based on plant productivity',
      ] },
    ],
  },
  {
    id: 'cn-budget-evolution', page: 'Pg 22', day: 2, phase: 'Post contract — Establishing budget',
    title: 'Budget evolution & re-budgeting',
    blocks: [
      { t: 'lead', text: 'Measured quantities and rate build-ups feed the detailed estimate and the site budget — which then evolves. Re-budget very often (monthly or quarterly).' },
      { t: 'bullets', heading: 'Adjust the budget for', items: ['Tender addendum', 'Contract variations', 'Delivery methods', 'Update to outputs', 'Changes in prelims', 'Risk mitigation', 'Opportunity recognition', 'Value engineering / changes'] },
    ],
  },
  {
    id: 'cn-post-contract-cm', page: 'Pg 23', day: 2, phase: 'Commercial tools — Post contract', exam: true,
    title: 'Post-contract commercial management',
    blocks: [
      { t: 'lead', text: 'The main aim of post-contract commercial management is to maintain the anticipated profit margin by implementing proper controls.' },
      { t: 'cols', cols: [
        { heading: 'Managing profit properly by', tone: 'tan', items: ['Planning — budget', 'Controlling — cost saving', 'Monitoring the project — CVR / CTC / cost report'] },
        { heading: 'Tools being used', tone: 'sage', items: ['Monitoring (contractor): Cost Value Reconciliation (CVR) · Cost to Complete (CTC)', 'Monitoring (employer): Cost Report'] },
      ] },
      { t: 'bullets', heading: 'Purpose of these tools', items: ['Report against finance', 'Progress against budget', 'Measure expenditure against budget', 'Auditing', 'Information', 'Problem finding', 'Avoid waste', 'Detect the cost variant', 'Take corrective action', 'Make sure the contract sum is under budget'] },
    ],
  },
  {
    id: 'cn-cvr', page: 'Pg 24', day: 2, phase: 'Post contract — CVR', exam: true,
    title: 'Cost Value Reconciliation (CVR)',
    blocks: [
      { t: 'define', term: 'CVR / CVC', text: 'Cost Value Reconciliation (a.k.a. Cost Value Comparison) measures the project margin and provides a "snapshot" of the financial health of the project at a particular time.' },
      { t: 'formula', caption: 'The tender price is a constraint once the contract amount is agreed', lines: [
        'Cost + Profit = Tender price  (Value to the employer)',
        'When the contractor’s actual cost goes up, profit comes down.',
      ] },
      { t: 'lead', text: 'The contractor’s actual cost each month is compared with the money claimed from the employer (value) to know the profit. In all situations the cost of the work must not exceed the price anticipated at the time of tender.' },
    ],
  },
  {
    id: 'cn-cvr-contents', page: 'Pg 25', day: 2, phase: 'Post contract — CVR', exam: true,
    title: 'What a CVR report incorporates',
    blocks: [
      { t: 'lead', text: 'The contents depend on the managers / management of the project, but commonly include:' },
      { t: 'cols', cols: [
        { heading: 'Items 1–10', tone: 'tan', items: ['1 · Project details', '2 · Original budget', '3 · Variations (contractor’s)', '4 · Employer’s variation (Engineer’s Instruction)', '5 · Revised budget', '6 · Actual cost for the period', '7 · Accrual / liability', '8 · Incurred cost', '9 · Remaining work cost', '10 · Final forecasted cost'] },
        { heading: 'Items 11–20', tone: 'sage', items: ['11 · Variance', '12 · Forecasted variations', '13 · EOT cost', '14 · Employer’s claim', '15 · Engineer’s Instruction', '16 · Material on / off site', '17 · Provisional sum', '18 · Forecasted cost of any others', '19 · Payment status', '20 · Accruals / liability'] },
      ] },
    ],
  },
  {
    id: 'cn-cvr-sample', page: 'Pg 26', day: 2, phase: 'Post contract — CVR',
    title: 'Sample CVR format',
    blocks: [
      { t: 'lead', text: 'A sample CVR format is provided in the handout for reference. By tracking every cost code you can identify the performance of each item.' },
    ],
  },
  {
    id: 'cn-cvr-setup', page: 'Pg 27', day: 2, phase: 'Post contract — CVR',
    title: 'CVR procedures — initial setup & cost codes',
    blocks: [
      { t: 'bullets', heading: 'Initial setup', items: ['Establish the CVR framework — outline the purpose of CVR and select suitable software', 'Compile project data — gather information from BOQ, spec, drawings, baseline, etc.', 'Determine the desired level of control'] },
      { t: 'define', term: 'Cost code', text: 'A numerical or alphanumeric identifier used to categorise and track expenses by specific work activities, materials, or project components. Developed further according to the company’s requirements and system.' },
      { t: 'formula', caption: 'A cost code (also called the "cost entrance")', lines: [
        'PRJ001 – 100 – 110 – 01',
        'Project code · Major work activity · Sub activity · Cost type (Labour)',
        'e.g. Project 001 · foundation works · concrete pouring · labour',
      ] },
      { t: 'note', tone: 'tip', text: 'A BOQ is a detailed document listing all the work items required to complete a project — including descriptions, quantities and unit rates.' },
    ],
  },
  {
    id: 'cn-cvr-monthly', page: 'Pg 28', day: 2, phase: 'Post contract — CVR',
    title: 'CVR procedures — monthly data & reconciliation',
    blocks: [
      { t: 'bullets', heading: 'Monthly data collection (end of month — ensure the budget is 100% aligned with the contract)', items: ['Record actual costs — labour, material, plant, OH, sub / supplier invoices', 'Assess work done — record the physical actual execution', 'Budget data — original budget, approved changes, current budget', 'Revenue data — value of completed work that can be invoiced', 'Commitments — outstanding commitments and potential liabilities', 'Cash flow — inflows and outflows during the period'] },
      { t: 'steps', heading: 'The reconciliation process', steps: [
        'Identify the cost (ledger, invoices, accruals, accounts dept.)',
        'Identify the value (from interim payment certification) — can vary due to MOS, no payment, over / under measure, disputes, accruals, wrong calculation / certification, claims, penalties, fines, LD',
        'Reconcile costs and values (actual cost vs baseline budget)',
        'Analyse variances',
        'Report to relevant internal stakeholders and review timely',
        'Action and adjustment if any issues',
        'Continuous monitoring',
      ] },
    ],
  },
  {
    id: 'cn-cvr-valuation-loss', page: 'Pg 29', day: 2, phase: 'Post contract — CVR', exam: true,
    title: 'Internal vs external valuation · reasons for CVR loss',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Two valuation methods', tone: 'sky', items: ['Internal valuation — the contractor considers all cost incurred at the date of valuation, including work still pending client approval', 'External valuation — excludes any cost incurred for not-yet-approved work', 'As CVR is the contractor’s monitoring tool, the contractor always uses internal valuation'] },
        { heading: 'Reasons for CVR loss', tone: 'coral', items: ['Uneconomical / over-usage of resources', 'Productivity problems', 'Huge waste of material', 'Assumptions / norms are not correct', 'Material prices higher than the tender price'] },
      ] },
      { t: 'note', tone: 'tip', title: 'To overcome such problems', text: 'First check whether the site is working properly; if not, report to the relevant / project manager for immediate action. If the site is fine, the norms / assumptions should be rebuilt by proper work-study, and the budget / anticipated profit adjusted.' },
    ],
  },
  {
    id: 'cn-cvr-problems', page: 'Pg 30', day: 2, phase: 'Post contract — CVR',
    title: 'Problems & risks while preparing a CVR',
    blocks: [
      { t: 'bullets', items: ['MOS — material on site but no provision in the contract', 'Accruals — for material and subcontractor’s liability', 'Error — calculational error at the stage of tender', 'Over measure / under measure', 'Wrong cost entry'] },
      { t: 'note', tone: 'watch', text: 'An error entry in CVR will not change the overall project cost (the cost is still associated to the project), but the element-related cost will be impacted and must be corrected. For any Engineer’s Instruction, remember to deduct value and make the relevant adjustments in the CVR or other report.' },
    ],
  },
  {
    id: 'cn-ctc', page: 'Pg 31', day: 2, phase: 'Post contract — CTC',
    title: 'Cost to Complete (CTC)',
    blocks: [
      { t: 'lead', text: 'Used to identify, at a particular time, the forecasted cost to completion.' },
      { t: 'formula', caption: 'After agreeing the tender, the planned cost is a constraint (normally without profit)', lines: [
        'Total planned cost   X = Z + Y',
        'Incurred cost  Y  (at the date of calculation)',
        'Cost to complete  Z = X − Y',
        'CTC = Planned − Incurred',
      ] },
      { t: 'note', tone: 'watch', text: 'If Z goes up, the contractor needs to bring more money to complete the work — i.e. from his profit — so the profit shall be reduced.' },
    ],
  },
  {
    id: 'cn-ctc-overcome', page: 'Pg 32', day: 2, phase: 'Post contract — Commercial tools', exam: true,
    title: 'Overcoming profit loss · advantages & disadvantages',
    blocks: [
      { t: 'bullets', heading: 'To overcome profit loss in CTC / CVR', items: ['Utilise plant and resources in an efficient manner', 'Negotiate with subcontractors for any relief', 'Eliminate idle resources', 'Use alternative materials with the same specification', 'Value engineering', 'Early-completion pushes', 'Waste reductions'] },
      { t: 'cols', cols: [
        { heading: 'Advantages of CVR & CTC', tone: 'sage', items: ['Give accurate information', 'Assist in identifying problems', 'Provide management information to identify the problem', 'Control over the cost'] },
        { heading: 'Disadvantages', tone: 'coral', items: ['Not suitable for small value', 'Unable to find the event of loss', 'Depends on the skill of the individual', 'High number of information required'] },
      ] },
    ],
  },
  {
    id: 'cn-cost-control-system', page: 'Pg 33', day: 2, phase: 'Post contract — Commercial tools',
    title: 'Establishing a cost-control system',
    blocks: [
      { t: 'bullets', heading: 'Check for any existing format / template', items: ['If yes — adopt the same with the required adjustments for that specific project', 'If no — study the project and convince management by explaining the advantages / disadvantages of a suitable method (CVR / CTC), then implement it'] },
      { t: 'note', tone: 'tip', text: 'After that, establish cost codes per the tender price breakdown and the elements in the contract BOQ. Cost centres & cost codes vary from company to company — by tracking every code you can identify the performance of items.' },
    ],
  },
  {
    id: 'cn-implement-system', page: 'Pg 34', day: 2, phase: 'Post contract — Implement a system',
    title: 'Implementing a system · over / under measure',
    blocks: [
      { t: 'bullets', heading: 'While implementing any system, consider', items: ['Accuracy', 'Complexity', 'Easy to understand', 'Easy to prepare', 'Less time to prepare', 'Cost centres', 'Project duration', 'Management requirements'] },
      { t: 'cols', cols: [
        { heading: 'Over / under measure', tone: 'amber', items: ['The difference between the contractor’s internal valuation and the amount paid through external valuation is the "over / under measure"', 'Over measure — claiming money before the contractor’s eligibility to claim (e.g. concrete still being cast); may be paid or unpaid', 'Under measure — work completed but not claimed or not included in the IPA (e.g. subcontractor’s work done but no invoice / IR submitted)'] },
        { heading: 'Work in progress', tone: 'sky', items: ['The work carried out between the cut-off date and the valuation date'] },
      ] },
    ],
  },
  {
    id: 'cn-cost-report', page: 'Pg 35', day: 2, phase: 'Post contract — Cost report',
    title: 'Cost report (the employer’s tool)',
    blocks: [
      { t: 'lead', text: 'The employer uses this tool to control the project. In addition to the cover page, executive summary and contents page, it includes three sets of information.' },
      { t: 'cols', cols: [
        { heading: 'Project information', tone: 'tan', items: ['Name and brief of the project', 'Details about the consultant', 'Procurement status'] },
        { heading: 'Contract information', tone: 'sky', items: ['Contract sum', 'Commencement date', 'Time for completion', 'Procurement status'] },
        { heading: 'Financial information', tone: 'sage', items: ['Original contract sum', 'Approved variations', 'Approved claims', 'Status of provisional sum', 'EOT claims', 'Anticipated variations (via notice)', 'Payment history', 'Revised contract sum', 'Due payments'] },
      ] },
      { t: 'note', tone: 'tip', text: 'Finally, the executive summary is prepared and attached as the first page.' },
    ],
  },
  {
    id: 'cn-cost-report-template', page: 'Pg 36', day: 2, phase: 'Post contract — Cost report',
    title: 'Cost report template — key abbreviations',
    blocks: [
      { t: 'bullets', items: ['AVI — Agreed Variation Instruction', 'RFC — Request for Change', 'EW — Early Warning'] },
    ],
  },
  {
    id: 'cn-cost-report-consultant', page: 'Pg 37', day: 2, phase: 'Post contract — Cost report',
    title: 'Preparing a cost report as a consultant',
    blocks: [
      { t: 'lead', text: 'If appointed as a consultant and the employer requests a cost report, first check whether they already have one. If not, develop a template, get the employer’s approval, and implement it by presenting to the relevant team.' },
      { t: 'bullets', heading: 'How the cost report helps the employer control cost', items: ['The client understands the financial requirements and can overcome any financial aid required', 'Control variations', 'Stop provisional sums', 'Request the contractor to do value engineering', 'Early-stage financial arrangement', 'Minimise project staff by proper study'] },
    ],
  },
  {
    id: 'cn-soe-l2', page: 'Pg 38', day: 2, phase: 'Statement of Experience · End of Day 2', milestone: true,
    title: 'SOE — Level 2',
    blocks: [
      { t: 'lead', text: 'Apply the Day 2 budgeting and post-contract control learning to a Level 2 Statement of Experience. See the "Sample SOEs" section for worked examples.' },
    ],
  },

  /* ───────────────────────── DAY 3 ───────────────────────── */
  {
    id: 'cn-evm', page: 'Pg 39', day: 3, phase: 'Earned Value Method',
    title: 'Earned Value Method (EVM)',
    blocks: [
      { t: 'lead', text: 'A management tool used to compare actual work with the original budget and the original schedule — mainly focusing on schedule and cost. Generally monitored on a weekly basis.' },
      { t: 'cols', cols: [
        { heading: 'Initially determine the % of', tone: 'tan', items: ['Planned Value (PV)', 'Earned Value (EV)', 'Actual Cost (AC)'] },
        { heading: 'From which we calculate', tone: 'sage', items: ['Schedule Variance (SV)', 'Cost Variance (CV)'] },
      ] },
    ],
  },
  {
    id: 'cn-evm-example', page: 'Pg 40', day: 3, phase: 'EVM — worked example',
    title: 'EVM example — a 5,000 SAR project',
    blocks: [
      { t: 'lead', text: 'Project start 1 Jan, finish 10 Jan (10 days). At the calculation date (6 Jan) 60% should be complete, but actually only 40% is complete. Project budget 5,000 SAR.' },
      { t: 'formula', lines: [
        'Planned Value   PV = 5000 × 60% = 3,000 SAR',
        'Earned Value    EV = 5000 × 40% = 2,000 SAR',
        'Actual Cost     AC = 1,500 SAR   (labour, material, equipment, fixed cost, subcontract…)',
      ] },
    ],
  },
  {
    id: 'cn-evm-findings', page: 'Pg 41', day: 3, phase: 'EVM — worked example',
    title: 'EVM findings — SV, CV, SPI, CPI',
    blocks: [
      { t: 'formula', lines: [
        'SV = EV − PV = 2000 − 3000 = −1000   (behind the schedule)',
        'CV = EV − AC = 2000 − 1500 = +500    (under the budget)',
        'SPI = EV / PV = 2000 / 3000 = 0.67   (< 1 behind · > 1 ahead)',
        'CPI = EV / AC = 2000 / 1500 = 1.33   (> 1 profit · < 1 loss)',
      ] },
      { t: 'cols', cols: [
        { heading: 'Advantages', tone: 'sage', items: ['Can be applied for all capital projects in any industry', 'Output is easy to understand', 'Consistent method of analysis for project cost and schedule'] },
        { heading: 'Disadvantages', tone: 'coral', items: ['Emphasises time instead of actual progress', 'Not suitable for small projects', 'Does not address the critical path'] },
      ] },
    ],
  },
  {
    id: 'cn-cashflow', page: 'Pg 42', day: 3, phase: 'Cash flow',
    title: 'Cash flow',
    blocks: [
      { t: 'define', term: 'Cash flow', text: 'Incoming or outgoing of money to / from a company over a given period — showing when and what amount of money is needed for the project.' },
      { t: 'lead', text: 'At an early stage the contractor should focus on bringing money to the project from many sources, because projects normally face negative cash flow then (cash outgoing exceeds incoming).' },
      { t: 'bullets', heading: 'To have a good cash flow, the cost / commercial manager should', items: ['Review the brief from the employer', 'Prepare a cash flow based on this review (minimal info — use benchmarking; usually presented as an S-curve)', 'Consider any and all risk (mainly those 4 categories)', 'Update throughout tendering, procurement and construction using: actual progress / status, new risk events, sequence change, procurement-method change, EOT or changes agreed, possession or handover'] },
    ],
  },
  {
    id: 'cn-cashflow-elements', page: 'Pg 43', day: 3, phase: 'Cash flow',
    title: 'Post-contract cash flow — incoming & outgoing',
    blocks: [
      { t: 'table', headers: ['Element', 'Contractor', 'Client'], rows: [
        ['Incoming', 'IPC (advance / interim payment)', 'Bank money / stakeholders’ investment'],
        ['Outgoing', 'Supplier, subcontractor, staff salary, subconsultant, authorities, permit, labour, plant, equipment rental, etc.', 'Contractor’s payment, consultant’s payment, own staff payments, direct contract, free-issued material, authority payment'],
      ] },
      { t: 'bullets', heading: 'Main types of cash-flow forecast', items: ['Forecast for the entity (each company, e.g. cost consultant) — organisational cash flow', 'Forecast for the project — project cash flow'] },
    ],
  },
  {
    id: 'cn-cashflow-types', page: 'Pg 44', day: 3, phase: 'Cash flow',
    title: 'Typical & cumulative cash flow',
    blocks: [
      { t: 'bullets', heading: 'A project cash flow can be produced as', items: ['Planned (past)', 'Anticipated (future)', 'Actual (present)'] },
      { t: 'note', tone: 'tip', text: 'The main elements of any cash flow are Value and Duration. When preparing a cash flow for a full development, also consider the consultant’s fee (its payment period is longer than the construction period), direct contract, and VAT & taxes.' },
    ],
  },
  {
    id: 'cn-cashflow-negative', page: 'Pg 45', day: 3, phase: 'Cash flow',
    title: 'Negative cash flow',
    blocks: [
      { t: 'lead', text: 'Negative cash flow can occur because of: no advance payment, cash farming, delay in payment, internal issues, or poor progress / management of the project.' },
      { t: 'bullets', heading: 'To have a good cash flow', items: ['Review the brief from the employer', 'Prepare a cash flow based on this review', 'Update throughout the tendering, procurement and progress stages', 'Compare and update against actual and planned cash flow'] },
    ],
  },
  {
    id: 'cn-cashflow-actions', page: 'Pg 46', day: 3, phase: 'Cash flow',
    title: 'Acting on negative cash flow · uses of the forecast',
    blocks: [
      { t: 'bullets', heading: 'At the negative cash-flow stage, take immediate action such as', items: ['Take action to receive the advance payment', 'Negotiate payment terms with subcontractors', 'Start high-value work late if possible', 'Bring cash from another project of the company'] },
      { t: 'bullets', heading: 'We use cash-flow forecasts to', items: ['Obtain a bank loan and monitor the same', 'Manage the consultant’s resources (staff, training, equipment)', 'Monitor the contractor’s progress', 'Manage cash within a business', 'Forecast project performance against planned cash flow', 'Check the contractor’s qualification through prequalification', 'Manage stakeholders (funders and shareholders)'] },
    ],
  },
  {
    id: 'cn-cashflow-preparing', page: 'Pg 47', day: 3, phase: 'Cash flow',
    title: 'Preparing the project cash flow',
    blocks: [
      { t: 'bullets', items: ['First understand the work (e.g. electrical — first fixtures, wiring, then final fixtures)', 'Cyclical events — holidays, Ramadan, Easter, Christmas, winter', 'Retention percentage', 'Sectional & partial completion', 'Currency fluctuation', 'Variations likely to arise', 'Provisional sum', 'Material on / off site', 'Risks — design-development risk, construction risk, employer-change risk, other employer risk', 'Condition of contract', 'Baseline programme', 'BOQ'] },
      { t: 'note', tone: 'tip', text: 'Cash flow can be shown as a periodic type or a cumulative type.' },
    ],
  },
  {
    id: 'cn-cashflow-important', page: 'Pg 48', day: 3, phase: 'Cash flow', exam: true,
    title: 'Important considerations',
    blocks: [
      { t: 'bullets', items: ['Don’t assume — when variance occurs above / below the cash flow, always discuss with the contractor', 'Claims for loss & expense should be considered and the cash flow revised', 'Liquidated damages do not impact the construction cash flow but do impact the overall cash flow (LDs are just a transfer from one to another)', 'A change of procurement route should be considered a cash-flow impact', 'With many projects, prepare a co-operate / organisational cash flow for proper financial management; the cash flow for a single project is the "project cash flow"'] },
      { t: 'bullets', heading: 'General considerations while preparing a cash flow', items: ['Accuracy of information — update once information is available', 'Whom the cash flow is for', 'What to communicate', 'Legislation impact (tax or VAT)', 'Include the information used to produce the cash flow'] },
    ],
  },
  {
    id: 'cn-cashflow-variance', page: 'Pg 49', day: 3, phase: 'Cash flow', exam: true,
    title: 'Actual vs planned · subcontractor cash flow',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Actual below the forecast', tone: 'coral', items: ['Less progress', 'Not accurate at the first place of calculation', 'Material off-site not claimed', 'Adverse climate', 'Material not delivered', 'Re-sequencing'] },
        { heading: 'Actual ahead of the forecast', tone: 'sage', items: ['Front-end loading', 'Contractor acceleration', 'Re-sequencing', 'Material stockpiled', 'Inclusive of all variations'] },
        { heading: 'Subcontractor’s cash flow into the master', tone: 'sky', items: ['Make sure the subcontractor’s cash flow is in line with the baseline programme', 'If yes, incorporate the relevant cost with the baseline programme', 'Update the project master cash flow'] },
      ] },
    ],
  },
  {
    id: 'cn-cashflow-update', page: 'Pg 50', day: 3, phase: 'Cash flow',
    title: 'Updating the cash flow',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'To update the cash flow', tone: 'tan', items: ['Cash incoming', 'Daily wages including labour salary', 'Supplier’s payment', 'Staff salary', 'Plant & equipment expenses', 'Payment related to subcontractor', 'Petty-cash payment', 'Variations or any other changes'] },
        { heading: 'Check your tier-down cash flow (consultant→contractor or contractor→subcontractor)', tone: 'plum', items: ['Ensure it is based on the conditions of contract', 'Based on the baseline programme', 'Proper deduction or addition considered (advance recovery, etc.)', 'Actual work accurately updated'] },
      ] },
      { t: 'note', tone: 'tip', text: 'Update your cash flow when you receive an Instruction, EOT or Claim — on a regular (e.g. monthly) basis against your baseline cash flow, forecasting the monthly cash-flow requirements and ensuring progress will be achieved.' },
    ],
  },
  {
    id: 'cn-supply-chain', page: 'Pg 51', day: 3, phase: 'Supply chain management',
    title: 'Supply chain management',
    blocks: [
      { t: 'define', term: 'Supply chain management', text: 'A vital part of any project — the process of managing the parties involved in the supply of services, organisations, logistics, people, activities, information and resources that transform raw materials into a finished product that is fit for its purpose. It involves suppliers, subcontractors and any other parties delivering the same.' },
      { t: 'bullets', heading: 'The commercial manager’s duty', items: ['Make sure of a proper agreement with the relevant party', 'Administer the contract with attention', 'Plan at the proper stage of the project', 'Value the work and pay on time'] },
    ],
  },
  {
    id: 'cn-subcontractors', page: 'Pg 52', day: 3, phase: 'Supply chain — Subcontractors',
    title: 'Types of subcontractor',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Domestic subcontractor', tone: 'tan', items: ['All the arrangements — identify subcontractors, tender invitation, bidding, PQQ, tender evaluation, award — are by the contractor, who must still fulfil the contractual requirements'] },
        { heading: 'Named subcontractor', tone: 'sky', items: ['The employer includes a list of preferred subcontractors specialised in the works; the contractor conducts tendering for those only', 'If the contractor has previous bad experience, they must raise it to the client at the time of tender'] },
        { heading: 'Nominated / novated subcontractor', tone: 'plum', items: ['The employer nominates a single person for specialised work', 'Or the employer signs a contract with them and transfers it to the contractor as a novation'] },
      ] },
    ],
  },
  {
    id: 'cn-cm-summary', page: 'Pg 53', day: 3, phase: 'Commercial manager’s role — summary',
    title: 'The commercial manager — pre & post-contract',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Pre-contract role', tone: 'tan', items: ['Preselection process', 'Decision to tender', 'Project appreciation', 'Estimating', 'Tender submission', 'Post-tender submission'] },
        { heading: 'Post-contract role', tone: 'sage', items: ['Profit enhancement (risk & opportunity management)', 'Procurement', 'Reporting — CVR / CTC / EVM', 'Contract administration', 'Cost controlling', 'Forecasts'] },
      ] },
    ],
  },
  {
    id: 'cn-soe-l3', page: 'Pg 54', day: 3, phase: 'Statement of Experience · End of Day 3', milestone: true,
    title: 'SOE — Level 3',
    blocks: [
      { t: 'lead', text: 'Apply the Day 3 performance, cash-flow and supply-chain learning to a Level 3 Statement of Experience. See the "Sample SOEs" section for worked examples that demonstrate Level 3 advice and influence.' },
    ],
  },
]
