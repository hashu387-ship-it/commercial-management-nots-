/* ════════════════════════════════════════════════════════════════
   The original lecture slides — faithful, slide-by-slide transcription
   of "Commercial Management in Construction (Parts 1 & 2)" delivered by
   Roshan de Silva (BSc(Hons) QS, LLM, MRICS, MAIQS, CQS) for the
   MRICS & AIQS APC coaching programme.

   Every slide heading, sub-heading and bullet is captured here, in the
   exact presentation order, so nothing from the deck is left out. These
   render as the "Lecture Slides" chapters of the handwritten notebook.
   ════════════════════════════════════════════════════════════════ */

import type { NotePage } from './completeNotes'

export const PRESENTATION_NOTES: NotePage[] = [
  /* ───────────────────────── PART 1 ───────────────────────── */
  {
    id: 'ps-p1-title', page: 'Part 1', day: 1, phase: 'MRICS & AIQS APC coaching programme', milestone: true,
    title: 'Commercial Management in Construction — Part 1',
    blocks: [
      { t: 'lead', text: 'Delivered by Roshan de Silva — BSc(Hons) QS, LLM (Construction Law), MRICS, MAIQS, CQS. RICS/AIQS APC Counsellor, Trained RICS APC Assessor, AIQS/CQS APC Chairman; Founder & CEO — apccoaching.me. Technical (Core) competency.' },
    ],
  },
  {
    id: 'ps-p1-agenda', page: 'Agenda', day: 1, phase: 'Part 1',
    title: 'Agenda — Part 1',
    blocks: [
      { t: 'bullets', items: [
        '1. About the competency (RICS vs AIQS)',
        '2. Competency mapping',
        '3. What & why?',
        '4. Pre-contract commercial management',
        '5. Preselection phase',
        '6. Decision to tender',
        '7. Project appreciation',
        '8. Estimating',
        '9. Tender adjudication',
        '10. Tender submission / post-tender dealings',
        '11. Recap',
      ] },
    ],
  },
  {
    id: 'ps-competency-rics', page: 'Slide', day: 1, phase: 'About the competency', exam: true,
    title: 'About the competency (RICS)',
    blocks: [
      { t: 'lead', text: 'This competency covers the commercial management of construction works. Candidates should have an awareness of how their work relates to the way commercial competitiveness balances against profitability, an awareness of the financial processes used to achieve profitability, and how these integrate with the overall delivery of the project.' },
      { t: 'cols', cols: [
        { heading: 'Mandatory', tone: 'sky', items: ['Ethics, Rules of Conduct & professionalism (L3)', 'Client care (L2)', 'Communication & negotiation (L2)', 'Health & safety (L2)', 'Accounting principles & procedures (L1)', 'Business planning (L1)', 'Conflict avoidance, management & dispute resolution procedures (L1)', 'Data management (L1)', 'Diversity, inclusion & teamworking (L1)', 'Inclusive environments (L1)', 'Sustainability (L1)'] },
        { heading: 'Core / Technical', tone: 'tan', items: ['Commercial management of construction works — taken to Level 3'] },
        { heading: 'Optional (two to L2)', tone: 'sage', items: ['Capital allowances', 'Conflict avoidance, management & dispute resolution', 'Contract administration', 'Corporate recovery & insolvency', 'Due diligence', 'Insurance', 'Programming & planning', 'Project feasibility analysis', 'Risk management'] },
      ] },
    ],
  },
  {
    id: 'ps-competency-aiqs', page: 'Slide', day: 1, phase: 'About the competency',
    title: 'About the competency (AIQS)',
    blocks: [
      { t: 'lead', text: 'For the AIQS pathway, commercial management sits within the project cost-management competencies — covering contract documentation & procurement, contract administration, and project finance (control and reporting).' },
    ],
  },
  {
    id: 'ps-mapping', page: 'Slide', day: 1, phase: 'Competency mapping',
    title: 'Competency mapping — MRICS vs MAIQS',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'MRICS (RICS)', tone: 'tan', items: ['Design economics & cost planning', 'Procurement & tendering', 'Commercial management (pre-contract)', 'Contract practice & administration', 'Commercial management (post-contract)', 'Project finance (control & reporting)'] },
        { heading: 'MAIQS (AIQS)', tone: 'sky', items: ['Quantification & costing', 'Contract documentation & procurement', 'Commercial management', 'Contract administration', 'Construction technology & environmental services', 'Project finance'] },
      ] },
    ],
  },
  {
    id: 'ps-what-why', page: 'Slide', day: 1, phase: 'What & why', exam: true,
    title: 'What & why',
    blocks: [
      { t: 'define', term: 'What is it?', text: 'A process that focuses — firstly, on securing the intended profit; then, on enhancing that profit.' },
      { t: 'bullets', heading: 'When?', items: ['In pre-contract stages; and', 'In post-contract stages'] },
    ],
  },
  {
    id: 'ps-precontract', page: 'Slide', day: 1, phase: 'Pre-contract commercial management',
    title: 'Pre-contract commercial management',
    blocks: [
      { t: 'lead', text: 'How? In the pre-contract stages, commercial management involves the following areas:' },
      { t: 'bullets', items: ['Preselection phase', 'Decision to tender', 'Project appreciation', 'Estimating', 'Tender submission / post-tender dealings'] },
    ],
  },
  {
    id: 'ps-preselection', page: 'Slide', day: 1, phase: 'Pre-contract — Preselection',
    title: 'Preselection phase',
    blocks: [
      { t: 'bullets', items: [
        'Generally, during the prequalification phase of the contractor.',
        'The contractor submits documents to the client to demonstrate its technical and financial competence.',
        'The commercial manager ensures the documents for financial prequalification are prepared.',
        'Documents needed (depends on the client’s requirement) — generally: audited financial statements for 3 years (Profit & Loss account, Balance Sheet, Auditor’s Statement, etc.)',
        'Why 3 years — the reports demonstrate the trend of the contractor’s financial performance over a period of time.',
        'Submission along with the technical prequalification documents.',
        'If needed, attend an interview with the client.',
      ] },
    ],
  },
  {
    id: 'ps-decision', page: 'Slide', day: 1, phase: 'Pre-contract — Decision to tender', exam: true,
    title: 'Decision to tender',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'The process (once the invitation is received)', tone: 'tan', items: ['Send a response informing acceptance / decline', 'Ensure collection of the tender documents per the instruction', 'Prepare a preliminary report — scope of work, client & other stakeholders, location, previous experience, etc.', 'Assess the current workload and the necessity of winning the project', 'Availability of resources (staff, labour, plant & equipment)', 'Importantly — the business plan of the organisation'] },
        { heading: 'It relies upon', tone: 'sky', items: ['Client / consultant relationship', 'Work type · work value', 'Current workload', 'Contract profitability', 'Project location', 'Contract form', 'Resource availability / requirements', 'Local environment', 'Contractor demand', 'Competitor quantity & type', 'Similar project experience', 'Tendering method', 'Project risk assessment', 'Tender timeframe'] },
      ] },
    ],
  },
  {
    id: 'ps-appreciation', page: 'Slide', day: 1, phase: 'Pre-contract — Project appreciation',
    title: 'Project appreciation (before commencing the estimate)',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Check list', tone: 'tan', items: ['Tender procedure', 'Appoint the lead estimator (if needed)', 'Have personnel with technical competence (PM, CMs)', 'Tender / estimation programme', 'Submission deadline', 'Method statements', 'Prepare labour and plant histogram', 'Pricing strategy', 'Site visits'] },
        { heading: 'Site visit', tone: 'sage', items: ['Location, nearest cities', 'Surrounding structures', 'Requirement of demolitions', 'Soil condition, obstructions, etc.', 'Site access', 'Any dumping areas / borrow pits', 'More essentially — the contractor participated in the site visit'] },
        { heading: 'Schedules', tone: 'plum', items: ['Material schedule', 'Labour histogram & workforce needs', 'Gathering material information', 'Specialist subcontractors & suppliers schedule', 'Identifying suppliers and subcontractors', 'Labour subcontract schedule', 'Subcontracting work schedule', 'Plant histograms'] },
      ] },
    ],
  },
  {
    id: 'ps-estimating-data', page: 'Slide', day: 1, phase: 'Pre-contract — Estimating (the works)',
    title: 'Estimating — sources of data',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Schedules of data', tone: 'tan', items: ['In-house cost databases', 'First principles', 'Supplier / subcontractor quotes', 'Operational estimates'] },
        { heading: 'In-house data', tone: 'sky', items: ['Ensure relevance to the tendering works', 'Make adjustments as necessary'] },
        { heading: 'First principles', tone: 'sage', items: ['Build up rates from scratch', 'Considering material, labour, plant & subcontractor costs'] },
      ] },
    ],
  },
  {
    id: 'ps-estimating-quotes', page: 'Slide', day: 1, phase: 'Pre-contract — Estimating (the works)', exam: true,
    title: 'Estimating — quotes & operational estimates',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Supplier / subcontractor quotes — every enquiry states', tone: 'tan', items: ['Project title and location', 'Work description and specifications', 'Quality requirements', 'Delivery period', 'Contractor-provided facilities', 'Date of the quotation request', 'Validity of the quotation'] },
        { heading: 'Operational estimates', tone: 'plum', items: ['A detailed assessment of the costs of a specific construction operation or activity, assessed on the resource requirement', 'Serve as benchmarks for future tender pricing — insight into real costs and performance'] },
      ] },
      { t: 'note', tone: 'example', title: 'McCaffer & Baldwin (1984, p.62)', text: 'If a truly operational estimating approach is adopted, the estimating process comprises planning, calculating the costs of the resources for each operation or activity, and transferring these data to the bill of quantities.' },
    ],
  },
  {
    id: 'ps-estimating-risks', page: 'Slide', day: 1, phase: 'Pre-contract — Estimating (the works)',
    title: 'Estimating — risks',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Procurement strategies', tone: 'tan', items: ['Traditional', 'Design & build / lump sum', 'Re-measured'] },
        { heading: 'Common risks', tone: 'coral', items: ['Lack of drawings, schedules and details', 'Missing specifications', 'BOQ accuracy', 'Project duration & liquidated damages', 'Price fixity'] },
        { heading: 'Market & site-specific', tone: 'amber', items: ['Market validity — price fluctuation, labour security, visa rules', 'Technical challenges', 'Buildability concerns'] },
      ] },
      { t: 'note', tone: 'tip', text: 'Risk can be reduced to a certain extent by issuing tender queries to the employer.' },
    ],
  },
  {
    id: 'ps-estimating-riskmgmt', page: 'Slide', day: 1, phase: 'Pre-contract — Estimating (the works)',
    title: 'Estimating — managing the risk',
    blocks: [
      { t: 'bullets', heading: 'Conduct a risk workshop', items: ['Gather stakeholders', 'Identify potential risks'] },
      { t: 'bullets', heading: 'Prepare a risk register', items: ['Document the identified risks', 'Categorise by type and impact'] },
      { t: 'bullets', heading: 'Quantitative risk analysis (QRA)', items: ['Assess risks numerically', 'Calculate probabilities and impacts'] },
      { t: 'bullets', heading: 'Then', items: ['Risk contingency budget — allocate budget for mitigation; cover potential cost overruns', 'Pre-bid agreement with suppliers — define risk-sharing terms; allocate responsibilities & liabilities in the bidding phase', 'JV or consortium for large projects — form partnerships to distribute risk; pool resources & expertise to mitigate collectively'] },
    ],
  },
  {
    id: 'ps-adjudication', page: 'Slide', day: 1, phase: 'Pre-contract — Tender adjudication', exam: true,
    title: 'Tender adjudication (settlement) meeting',
    blocks: [
      { t: 'lead', text: 'Purpose — a management process that makes a commercial judgement to determine the final bid amount based on various factors (i.e. the process of converting the contractor’s estimate into a tender bid).' },
      { t: 'bullets', heading: 'Generally discussed in the meeting', items: ['The head-office overhead (OH) cost', 'Profit based on this year’s business plan', 'The risk allowance'] },
      { t: 'bullets', heading: 'Head-office overheads include', items: ['Staff salaries', 'Office depreciation / rent and maintenance', 'Insurance and bank charges', 'Utilities (telephone, electricity, water)', 'Office supplies (printing, stationery, postage, advertising)', 'Equipment rentals (computers, servers, fax machines, plotters)', 'Tender document costs', 'Office registration and maintenance', 'Unrecoverable debts', 'Advertising', 'Recreation and entertainment', 'Recruitment costs', 'Audit fees', 'Legal, professional and license fees'] },
    ],
  },
  {
    id: 'ps-submission', page: 'Slide', day: 1, phase: 'Pre-contract — Tender submission',
    title: 'Tender (bid) submission',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Technical submission', tone: 'tan', items: ['Company trade license', 'Technical form of tender', 'Project profile', 'Execution plan', 'Method statement', 'Tender programme', 'Organisation chart', 'Key personnel CVs', 'Quality-control process and HSE detail / procedure', 'Detail of previously completed projects', 'Labour histogram and plant'] },
        { heading: 'Commercial submission', tone: 'sage', items: ['Covering letter (the offer)', 'Offer price', 'Schedule of qualifications / exclusions', 'Form of tender', 'Priced BOQs', 'Schedule of rates', 'Day-works rates'] },
      ] },
    ],
  },
  {
    id: 'ps-p1-recap', page: 'Recap', day: 1, phase: 'End of Part 1', milestone: true,
    title: 'Recap — Part 1',
    blocks: [
      { t: 'lead', text: 'Competency & mapping · what & why · pre-contract commercial management · preselection · decision to tender · project appreciation · estimating · tender adjudication · tender submission.' },
    ],
  },

  /* ───────────────────────── PART 2 ───────────────────────── */
  {
    id: 'ps-p2-title', page: 'Part 2', day: 2, phase: 'MRICS & AIQS APC coaching programme', milestone: true,
    title: 'Commercial Management in Construction — Part 2',
    blocks: [
      { t: 'lead', text: 'Part 2 — the post-contract life of the project: profit enhancement, procurement, reporting and contract administration.' },
    ],
  },
  {
    id: 'ps-p2-agenda', page: 'Agenda', day: 2, phase: 'Part 2',
    title: 'Agenda — Part 2',
    blocks: [
      { t: 'bullets', items: ['1. About the competency (RICS vs AIQS)', '2. Competency mapping', '3. What & why?', '4. Post-contract commercial management', '5. Profit enhancement', '6. Procurement', '7. Reporting', '8. Contract administration', '9. Task allocation', '10. Recap'] },
    ],
  },
  {
    id: 'ps-whatwhy2', page: 'Slide', day: 2, phase: 'What & why (revisited)', exam: true,
    title: 'Why does it begin pre-contract?',
    blocks: [
      { t: 'note', tone: 'q', text: 'How does pre-contract commercial management focus on securing the intended profit and enhancing the profit?' },
      { t: 'bullets', items: [
        'Without proper financial safeguards during bidding and contract formation, contractors risk entering unprofitable projects.',
        'Proper commercial management during the pre-contract stages ensures contracts are won at viable margins.',
        'Profitability is not just about winning contracts, but also about managing them effectively.',
        'Risks and opportunities exist at both stages that may harm securing the profitability.',
        'Therefore, securing and enhancing the profitability begins from the pre-contract stages.',
      ] },
    ],
  },
  {
    id: 'ps-postcontract', page: 'Slide', day: 2, phase: 'Post-contract commercial management',
    title: 'Post-contract commercial management',
    blocks: [
      { t: 'lead', text: 'How? In the post-contract stages, commercial management involves the following areas:' },
      { t: 'bullets', items: ['Profit enhancement', 'Procurement', 'Reporting', 'Contract administration'] },
    ],
  },
  {
    id: 'ps-profit-risks', page: 'Slide', day: 2, phase: 'Post-contract — Profit enhancement',
    title: 'Profit enhancement — the risks',
    blocks: [
      { t: 'lead', text: 'Profit enhancement depends on an appropriate balance between the risks and the opportunities. The risks include, but are not limited to:' },
      { t: 'bullets', items: [
        'Authorities — risk related to delays due to permit or approval issues.',
        'Design — risk from incomplete or inadequate project design, leading to delays or extra costs.',
        'Services — risk associated with the availability and reliability of essential utilities or services.',
        'HSE — risk involving health, safety and environmental concerns, including accidents and regulatory compliance.',
        'Contractual — risk stemming from disputes or breaches in project contracts, potentially leading to legal and financial problems.',
      ] },
    ],
  },
  {
    id: 'ps-profit-opps', page: 'Slide', day: 2, phase: 'Post-contract — Profit enhancement',
    title: 'Profit enhancement — the opportunities',
    blocks: [
      { t: 'lead', text: 'The opportunities include, but are not limited to:' },
      { t: 'bullets', items: [
        'Early completion — time and cost savings by finishing ahead of schedule (saving on preliminaries).',
        'Buying gains — reduce costs by obtaining materials/services at a lower price (economies of scale: higher quantities attract lower rates).',
        'Reducing running costs — water, electricity, fuel, pantry and other associated running expenses.',
        'Increasing productivity — improved efficiency and output (business-improvement targets and bonus schemes).',
        'Value engineering — review components and find cost savings without sacrificing quality; can lead to innovative, lower-cost solutions.',
      ] },
    ],
  },
  {
    id: 'ps-profit-bulk', page: 'Slide', day: 2, phase: 'Post-contract — Profit enhancement',
    title: 'When does bulk buying pay off?',
    blocks: [
      { t: 'steps', steps: [
        'The contractor can afford the upfront expense.',
        'Multiple projects are running at the same time with similar requirements (i.e. same specifications).',
        'The contractor’s stock in inventory can match the project specs.',
        'Costs spent on storage are less.',
        'The contractor has an organised material-management system.',
      ] },
    ],
  },
  {
    id: 'ps-risks-opps', page: 'Slide', day: 2, phase: 'Post-contract — Risks & opportunities',
    title: 'Risks & opportunities',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Risks', tone: 'coral', items: ['Market fluctuations', 'Regulatory compliance', 'Contractual', 'Labour shortages', 'Material price volatility', 'Weather delays', 'Safety incidents', 'Change orders', 'Payment issues', 'Design changes', 'Inaccurate estimates'] },
        { heading: 'Opportunities', tone: 'sage', items: ['Value engineering', 'Effective project management', 'Early completion', 'Buying gains', 'Supplier & contractor negotiations', 'Scope management', 'Risk management', 'Cost monitoring', 'Quality control', 'Resource allocation', 'Reduced running costs'] },
      ] },
      { t: 'note', tone: 'tip', text: 'How to manage R&O — use the risk & opportunity (R&O) register.' },
    ],
  },
  {
    id: 'ps-registers', page: 'Slide', day: 2, phase: 'Post-contract — Registers',
    title: 'Risk register & opportunities register',
    blocks: [
      { t: 'lead', text: 'Both a risk register and an opportunities register are maintained as live documents (e.g. for the “2×2 Hospital Project”) — each risk and opportunity is logged, quantified and tracked through to mitigation or realisation.' },
    ],
  },
  {
    id: 'ps-procurement', page: 'Slide', day: 2, phase: 'Post-contract — Procurement', exam: true,
    title: 'Procurement (material, labour & subcontracts)',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Materials', tone: 'tan', items: ['Set up a detailed schedule of material requirements based on: source locally or foreign; long-lead or short-lead; purpose-made or standard material; etc.', 'Get support from the operations team to identify materials and the central procurement team to lead procuring from suppliers / manufacturers', 'Ensure a tracker is maintained for monitoring and control'] },
        { heading: 'Labour', tone: 'amber', items: ['Engage planning & operational teams to assess labour needs', 'Determine if work can be done in-house or needs labour subcontractors', 'Identify reasons for outsourcing if in-house isn’t feasible (workload, delays, low productivity)', 'Assess which labour categories to subcontract (general or trade-specific)', 'Issue RFQs, evaluate, and negotiate; award the works; administer labour subcontracts'] },
        { heading: 'Subcontract', tone: 'plum', items: ['Set up a subcontracting schedule', 'Define the procurement & contract strategy (traditional, D&B / lump-sum, MP, etc.)', 'Plan the tendering strategy (open, selective or negotiated)', 'Prepare and issue tender docs to potential subcontractors', 'Manage tender queries & responses; evaluate technically & commercially', 'Negotiate for budget-aligned discounts; award; administer post-contract tasks'] },
      ] },
    ],
  },
  {
    id: 'ps-tender-docs', page: 'Slide', day: 2, phase: 'Post-contract — Procurement',
    title: 'Tender documents & procurement route',
    blocks: [
      { t: 'cols', cols: [
        { heading: 'Tender documents (5 volumes)', tone: 'tan', items: ['Vol I — Tendering & contract conditions (instructions to tenderers, tender acknowledgement, tender confirmation form, form of tender, form of agreement, contract conditions Part I general & Part II particular, specimen forms — tender bond, PG, APG, insurance)', 'Vol II — Specifications (scope of work; building specs; infrastructure specs)', 'Vol III — Drawings (architectural, structural, mechanical, electrical & external)', 'Vol IV — BOQ (pricing preambles, bill section, day works, PS & PC, summary)', 'Vol V — Soil report & other information'] },
        { heading: 'Procurement route', tone: 'sky', items: ['Before tendering the subcontract works, ensure the appropriate procurement strategy is selected', 'Traditional', 'Design & build (D&B)', 'Management contracting (seldom)', 'Construction management (seldom)'] },
      ] },
    ],
  },
  {
    id: 'ps-reporting-intro', page: 'Slide', day: 2, phase: 'Post-contract — Reporting', exam: true,
    title: 'Reporting in commercial management',
    blocks: [
      { t: 'lead', text: 'Inter alia, the following are used in commercial reporting in a contractor’s organisation:' },
      { t: 'bullets', items: ['Cash flow', 'Cost Value Reconciliation (CVR)', 'Cost to Complete (CTC)', 'Earned Value Analysis (EVA)'] },
      { t: 'note', tone: 'tip', title: 'Why is reporting important?', text: 'All of these contribute to better decision-making, compliance, efficiency and profitability.' },
    ],
  },
  {
    id: 'ps-cashflow', page: 'Slide', day: 2, phase: 'Post-contract — Reporting · Cash flow',
    title: 'Cash flow',
    blocks: [
      { t: 'lead', text: 'A cash-flow forecast analyses expected cash inflows and outflows over a specified period (typically a year) for business planning and financial assessment. In construction, a contract’s cash flow focuses on payments related to that specific contract, closely tied to the company’s overall cash flow.' },
      { t: 'cols', cols: [
        { heading: 'Two primary types', tone: 'tan', items: ['Organisational cash-flow forecast — for a company (the contractor’s organisation)', 'Project cash-flow forecast — for a specific construction contract / project'] },
        { heading: 'Benefits', tone: 'sage', items: ['Track liquidity (cash position) for operations', 'Early-warning system for cash shortages', 'Monitors cash in (client / main-contractor payments) and out (material, labour, plant, subcontractors)', 'Evaluates project profitability and alignment with goals', 'Assists in precise tax planning and timely payments', 'Supports financial decisions (e.g. additional funding)'] },
      ] },
    ],
  },
  {
    id: 'ps-cashflow-types', page: 'Slide', day: 2, phase: 'Post-contract — Reporting · Cash flow',
    title: 'Cash-flow types (RICS Black Book)',
    blocks: [
      { t: 'bullets', heading: 'Typically 3, as defined by the RICS Black Book', items: [
        'Based on assumptions of a series of equal cash in and outs',
        'Slightly accurate — assumes the ¼ – ½ – ¼ split: first third of the duration ¼ of total cost; second third ½; final third the remaining ¼',
        'Based on the construction programme — more accurate, based on the sequence of work',
      ] },
      { t: 'bullets', heading: 'Documents needed', items: ['Construction programme', 'BOQ', 'Conditions of contract'] },
    ],
  },
  {
    id: 'ps-cashflow-negative', page: 'Slide', day: 2, phase: 'Post-contract — Reporting · Cash flow', exam: true,
    title: 'Dealing with negative cash flow',
    blocks: [
      { t: 'lead', text: 'Negative cash flow occurs when cash out takes precedence over cash in.' },
      { t: 'bullets', heading: 'Potential remedies', items: [
        'Request ad-hoc (on-account) payments or additional advance payment from the client',
        'Negotiate with the supply chain for extended payment terms (until the situation improves)',
        'Reduce overhead costs',
        'Increase the rate of progress of the works',
        'Request upfront retention release by submitting a retention bond',
        'Request corporate cash to finance the works',
        'Use short-term financing from banks or financial organisations',
      ] },
      { t: 'note', tone: 'q', text: 'When is the right time to prepare the cash flow?' },
    ],
  },
  {
    id: 'ps-ctc', page: 'Slide', day: 2, phase: 'Post-contract — Reporting · CTC',
    title: 'Cost to Complete (CTC)',
    blocks: [
      { t: 'lead', text: 'A measuring tool used to determine the probable cost needed to complete from a given point in time.' },
      { t: 'formula', caption: 'Compared with the budget to analyse profitability', lines: [
        'CTC = actual cost as of date + forecasted cost to complete the balance works',
        'Then compared against the anticipated final account (revenue) → profit or loss on completion',
        'Actual cost — from the ledger (finance department)',
        'Forecasted cost — by the QS / commercial manager with planning & operations',
      ] },
      { t: 'bullets', heading: 'Benefits', items: ['Tracks actual vs estimate costs', 'Supports forecasting remaining costs', 'Early warning on cost overruns by element (material, labour, plant, subcontracts)', 'Aids quick decision-making on profitability', 'Aids claim preparation and dispute resolution'] },
    ],
  },
  {
    id: 'ps-cvr', page: 'Slide', day: 2, phase: 'Post-contract — Reporting · CVR', exam: true,
    title: 'Cost Value Reconciliation (CVR)',
    blocks: [
      { t: 'lead', text: 'A tool that compares the actual costs incurred on a project with the value of work performed and earned during a specific period. Typically done monthly / periodically — effectively the profit & loss account of a project.' },
      { t: 'cols', cols: [
        { heading: 'Information sources', tone: 'tan', items: ['Cost — ledger cost; accruals (costs incurred but not paid); cost provisions; subcontractor liability', 'Value — interim payment application / payment certificate'] },
        { heading: 'Adjustments & benefits', tone: 'sage', items: ['Adjust for: undermeasure, overmeasure, variations/claims in dispute, material on site, under-certifications', 'Tracks actual revenue vs actual costs', 'Insights on profitability for a given period', 'Early warning on cost overruns; aids quick decisions'] },
      ] },
    ],
  },
  {
    id: 'ps-admin', page: 'Slide', day: 2, phase: 'Post-contract — Contract administration',
    title: 'Contract administration',
    blocks: [
      { t: 'lead', text: 'Effective contract administration is mandatory to fulfil the commercial-management objectives.' },
      { t: 'steps', steps: [
        'Interim valuations — upstream (to the employer/client) and downstream (to subcontractors/suppliers)',
        'Variations — upstream (to the employer/client) and downstream (to subcontractors/suppliers)',
        'Claims — notices, detailed particulars (interim/final), negotiations, etc.',
        'Final accounts',
      ] },
    ],
  },
  {
    id: 'ps-task', page: 'Slide', day: 2, phase: 'Post-contract — Task allocation',
    title: 'Task allocation',
    blocks: [
      { t: 'lead', text: 'Candidates who chose commercial management as their core (technical) competency — and quantity surveyors with experience largely in contracting organisations — should draft their Statement of Experience (SOE) for Level 1 of commercial management.' },
      { t: 'note', tone: 'tip', text: 'Download and use the SOE tracker on the APC portal, available under the “Essential Communication Skills for SOE” module. See the Sample SOEs section for worked Level 1–3 examples.' },
    ],
  },
  {
    id: 'ps-p2-recap', page: 'Recap', day: 2, phase: 'End of Part 2', milestone: true,
    title: 'Recap — Part 2',
    blocks: [
      { t: 'lead', text: 'Post-contract commercial management · profit enhancement · procurement · reporting (cash flow, CVR, CTC, EVA) · contract administration · task allocation. End of the lecture slides — continue into the complete notes.' },
    ],
  },
]
