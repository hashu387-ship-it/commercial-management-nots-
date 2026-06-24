import type {
  AccordionItem,
  Flashcard,
  NavSection,
  QuizQuestion,
  RiskOpp,
  SectionId,
  TabItem,
  TimelineStage,
} from '../types'

/* ════════════════════════════════════════════════════════════════
   Meta
   ════════════════════════════════════════════════════════════════ */
export const COURSE = {
  title: 'Commercial Management in Construction',
  subtitle: 'An interactive study companion for the RICS (MRICS) & AIQS (MAIQS) APC',
  author: 'Roshan de Silva',
  credentials:
    'BSc (Hons) QS, LLM (Construction Law), MRICS, MAIQS, CQS · RICS/AIQS APC Counsellor · Trained RICS APC Assessor',
  programme: 'MRICS & AIQS APC Coaching Programme',
}

/* ════════════════════════════════════════════════════════════════
   Navigation / progress sections
   ════════════════════════════════════════════════════════════════ */
export const SECTIONS: NavSection[] = [
  { id: 'overview', label: 'What & Why', icon: 'Compass', part: 0 },
  { id: 'competency', label: 'The Competency', icon: 'Award', part: 0 },
  { id: 'precontract', label: 'Pre-Contract Journey', icon: 'Route', part: 1 },
  { id: 'estimating', label: 'Estimating', icon: 'Calculator', part: 1 },
  { id: 'tender', label: 'Tender & Adjudication', icon: 'Gavel', part: 1 },
  { id: 'postcontract', label: 'Post-Contract Journey', icon: 'Workflow', part: 2 },
  { id: 'profit', label: 'Profit Enhancement', icon: 'TrendingUp', part: 2 },
  { id: 'procurement', label: 'Procurement', icon: 'PackageSearch', part: 2 },
  { id: 'reporting', label: 'Reporting', icon: 'LineChart', part: 2 },
  { id: 'admin', label: 'Contract Admin', icon: 'FileSignature', part: 2 },
  { id: 'flashcards', label: 'Flashcards', icon: 'Layers', part: 0 },
  { id: 'quiz', label: 'Knowledge Check', icon: 'CircleCheckBig', part: 0 },
]

/* ════════════════════════════════════════════════════════════════
   Overview — What & Why
   ════════════════════════════════════════════════════════════════ */
export const WHAT_WHY = {
  what: 'A process that focuses — firstly, on securing the intended profit; then, on enhancing that profit.',
  whenPre: 'Pre-Contract stages',
  whenPost: 'Post-Contract stages',
  rationale: [
    'Without proper financial safeguards during bidding and contract formation, contractors risk entering unprofitable projects.',
    'Proper commercial management during pre-contract stages ensures that contracts are won at viable margins.',
    'Profitability is not just about winning contracts, but also about managing them effectively.',
    'Risks and opportunities exist at both stages that may harm securing the profitability.',
    'Therefore, securing and enhancing profitability begins from the pre-contract stages.',
  ],
}

/* ════════════════════════════════════════════════════════════════
   The Competency — RICS / AIQS / Mapping
   ════════════════════════════════════════════════════════════════ */
export const COMPETENCY_RICS = {
  mandatory: {
    'Level 3': ['Ethics, Rules of Conduct and professionalism'],
    'Level 2': ['Client care', 'Communication and negotiation', 'Health and safety'],
    'Level 1': [
      'Accounting principles and procedures',
      'Business planning',
      'Conflict avoidance, management and dispute resolution procedures',
      'Data management',
      'Diversity, inclusion and teamworking',
      'Inclusive environments',
      'Sustainability',
    ],
  },
  core: [
    'Commercial management of construction works',
    'Design economics and cost planning',
    'Construction technology and environmental services',
    'Contract practice',
    'Procurement and tendering',
    'Project finance (control and reporting)',
    'Quantification and costing of construction works',
  ],
  optional: [
    'Capital allowances',
    'Commercial management of construction works',
    'Conflict avoidance, management and dispute resolution procedures',
    'Contract administration',
    'Corporate recovery and insolvency',
    'Due diligence',
    'Insurance',
    'Programming and planning',
    'Project feasibility analysis',
    'Risk management',
  ],
  guidance: [
    'Candidates working in a commercial or contracting environment will likely choose Commercial management of construction works to Level 3.',
    'Candidates working in a consulting environment within either the public or private sector will likely choose Design economics and cost planning to Level 3.',
  ],
  summary:
    'This competency covers the commercial management of construction works. Candidates should have an awareness of the way their work relates to how commercial competitiveness balances against profitability. An awareness of the financial processes used to achieve profitability is required, as well as how these integrate with the overall delivery of the project.',
}

export const COMPETENCY_MAPPING = {
  mrics: [
    'Design Economics & Cost Planning',
    'Procurement & Tendering',
    'Commercial Management (Pre-Contract)',
    'Contract Practice & Administration',
    'Commercial Management (Post-Contract)',
    'Project Finance',
  ],
  mricsSupport: ['Quantification & Costing', 'Construction Technology & Environmental Services'],
  maiqs: [
    'Design Cost Advice, Cost Planning & Cost Engineering',
    'Contract Documentation & Procurement',
    'Contract Administration',
  ],
  note: 'Commercial Management spans both the pre-contract and post-contract halves of the project life-cycle and threads through the cost, procurement, contract and finance competencies in both the RICS and AIQS frameworks.',
}

/* AIQS Project Cost Management competency framework (38 units across 6 groups). */
export const COMPETENCY_AIQS = {
  intro:
    'The AIQS framework maps Commercial Management within the Project Cost Management competencies. Unit 8 — Commercial Management — sits under Contract Documentation & Procurement.',
  groups: [
    {
      title: 'Design Cost Advice, Cost Planning & Cost Engineering',
      tag: 'Project Cost Management',
      color: '#9E875D',
      units: ['1 · Strategic Planning', '2 · Budgetary Process', '3 · Cost Estimating', '4 · Cost Planning'],
    },
    {
      title: 'Contract Documentation & Procurement',
      tag: 'Project Cost Management',
      color: '#7C8C5A',
      units: [
        '5 · General Procurement Advice',
        '6 · Quantification, Measurement & Documentation',
        '7 · Tender Process',
        '8 · Commercial Management ★',
      ],
    },
    {
      title: 'Contract Administration',
      tag: 'Project Cost Management',
      color: '#5B7DA6',
      units: [
        '9 · Account Management',
        '10 · Construction Change Management',
        '11 · Claims & Dispute Resolution',
        '12 · Financial Audit',
        '13 · Resource',
      ],
    },
    {
      title: 'Support Competencies',
      tag: 'Support',
      color: '#E0A23B',
      units: [
        '14 · Computer Services',
        '15 · Construction Technology',
        '16 · Government Regulation & Law',
        '17 · Arbitration',
        '18 · Expert Witness / Evidence',
        '19 · Business Management',
        '20 · Research & Development',
        '21 · Cost Information Database',
      ],
    },
    {
      title: 'Asset Financial Management',
      tag: 'Asset Finance',
      color: '#8A6491',
      units: [
        '22 · Feasibility Studies',
        '23 · Life Cycle Cost Analysis',
        '24 · Tax Depreciation',
        '25 · Special Assessments',
        '26 · Audits',
        '27 · Technical Due Diligence',
        '28 · Compliance Issues',
      ],
    },
    {
      title: 'Specialised Management',
      tag: 'Specialised',
      color: '#D9694C',
      units: [
        '29 · Project Value Management',
        '30 · Project Management',
        '31 · Project Risk Management',
        '32 · Quality Assurance',
        '33 · Sustainability',
        '34 · BIM',
        '35 · Earned Value',
        '36 · Cost Engineering',
        '37 · Project Controls',
        '38 · Planning & Programming',
      ],
    },
  ],
  general: ['General', 'Soft Skills'],
}

/* ════════════════════════════════════════════════════════════════
   Pre-Contract journey timeline
   ════════════════════════════════════════════════════════════════ */
export const PRE_CONTRACT_STAGES: TimelineStage[] = [
  {
    id: 'preselection',
    index: 1,
    title: 'Preselection Phase',
    tagline: 'Prove technical & financial competence',
    icon: 'ClipboardCheck',
    points: [
      'Generally occurs during the prequalification phase of the Contractor.',
      'The Contractor submits documents to the Client to demonstrate its technical and financial competence.',
      'The Commercial Manager ensures documents are prepared for financial prequalification.',
      'Submission is made alongside the technical prequalification documents.',
      'If needed, attend an interview with the Client.',
    ],
    detail: [
      'Documents needed (depend on the client requirement) — generally Audited Financial Statements for 3 years (Profit & Loss Account, Balance Sheet, Auditor’s Statement etc.).',
      'Why 3 years? The reports demonstrate the trend of the financial performance of the Contractor over a period of time.',
    ],
  },
  {
    id: 'decision',
    index: 2,
    title: 'Decision to Tender',
    tagline: 'Bid / no-bid commercial judgement',
    icon: 'GitFork',
    points: [
      'Once the tender invitation is received, send a response informing acceptance / decline.',
      'Ensure collection of the Tender documents as per the instruction.',
      'Prepare a preliminary report outlining the SOW, Client and stakeholders, location and previous experience.',
      'Assess the current workload and the necessity of winning the project.',
      'Check availability of resources (Staff, Labour, Plant & Equipment etc.).',
      'Importantly — align with the business plan of the organization!',
    ],
    detail: [
      'Decision to Tender relies upon: Client/Consultant Relationship · Work Type · Work Value · Current Workload · Contract Profitability · Project Location · Contract Form · Resource Availability/Requirements · Tender Timeframe · Local Environment · Contractor Demand · Competitor Quantity & Type · Similar Project Experience · Tendering Method · Project Risk Assessment.',
    ],
  },
  {
    id: 'appreciation',
    index: 3,
    title: 'Project Appreciation',
    tagline: 'Understand the works before estimating',
    icon: 'Telescope',
    points: [
      'Confirm the Tender Procedure and appoint the Lead Estimator (if needed).',
      'Ensure personnel with technical competence (PM, CMs) are available.',
      'Set the Tender / Estimation programme and note the submission deadline.',
      'Prepare method statements, Labour & Plant histograms and a pricing strategy.',
      'Carry out site visits — and ensure the Contractor actually attends.',
    ],
    detail: [
      'Site visits cover: location & nearest cities, surrounding structures, requirement of demolitions, soil condition & obstructions, site access, and any dumping areas / borrow pits.',
      'Schedules to prepare: Material Schedule, Labour Histogram & Workforce Needs, Material Information, Specialist Subcontractors & Suppliers Schedule, Labour Subcontract Schedule, Subcontracting Work Schedule and Plant Histograms.',
    ],
  },
  {
    id: 'estimating',
    index: 4,
    title: 'Estimating the Works',
    tagline: 'Build the cost base',
    icon: 'Calculator',
    points: [
      'Use schedules of data: in-house cost databases, first principles, supplier / subcontractor quotes and operational estimates.',
      'Build up rates from first principles considering material, labour, plant and subcontractor costs.',
      'Identify and manage estimating risks (drawings, specs, BOQ accuracy, price fixity, market factors).',
    ],
    detail: [
      'See the dedicated Estimating section for the full breakdown of data sources, operational estimates and risk management.',
    ],
  },
  {
    id: 'adjudication',
    index: 5,
    title: 'Tender Adjudication',
    tagline: 'Convert the estimate into a bid',
    icon: 'Gavel',
    points: [
      'A management process that makes a commercial judgement to determine the final bid amount — converting the estimate into a tender bid.',
      'Discuss the head office overhead (OH) cost.',
      'Decide profit based on this year’s business plan.',
      'Discuss the risk allowance.',
    ],
    detail: [
      'Head office overheads include staff salaries, office depreciation/rent, insurance & bank charges, utilities, office supplies, equipment rentals, tender document costs, unrecoverable debts, advertising, recruitment, audit fees and legal/professional/licence fees.',
    ],
  },
  {
    id: 'submission',
    index: 6,
    title: 'Tender Submission',
    tagline: 'Technical + commercial offer',
    icon: 'Send',
    points: [
      'Technical Submission: trade licence, technical form of tender, project profile, execution plan, method statement, programme, org chart, key CVs, QC & HSE procedures, past project detail, labour histogram & plant.',
      'Commercial Submission: covering letter (offer price + schedule of qualifications/exclusions), form of tender, priced BOQs, schedule of rates and day-works rates.',
    ],
  },
]

/* ════════════════════════════════════════════════════════════════
   Estimating deep-dive (accordion)
   ════════════════════════════════════════════════════════════════ */
export const ESTIMATING_TOPICS: AccordionItem[] = [
  {
    id: 'data',
    title: 'Schedules of Data',
    icon: 'Database',
    summary: 'Where the rates come from.',
    points: [
      'In-house cost databases — ensure relevance to the tendering works and make adjustments as necessary.',
      'First principles — built-up rates from scratch, considering material, labour, plant and subcontractor costs.',
      'Supplier / subcontractor quotes.',
      'Operational estimates.',
    ],
  },
  {
    id: 'quotes',
    title: 'Supplier / Subcontractor Quotes',
    icon: 'Mail',
    summary: 'What to include in every enquiry.',
    points: [
      'Project Title and Location',
      'Work Description and Specifications',
      'Quality Requirements',
      'Delivery Period',
      'Contractor-Provided Facilities',
      'Date of Quotation Request',
      'Validity of the Quotation',
    ],
  },
  {
    id: 'operational',
    title: 'Operational Estimates',
    icon: 'Cog',
    summary: 'Costing by operation / activity.',
    points: [
      'A detailed assessment of the costs associated with a specific construction operation or activity, assessed based on the resource requirement.',
      '"If a truly operational estimating approach is adopted then the estimating process comprises planning, calculating the costs of the resources for each operation or activity and transferring these data to the bill of quantities." — McCaffer and Baldwin (1984, p.62)',
      'Operational estimates — created during initial planning or ongoing construction — serve as benchmarks for future tender pricing, offering insights into real costs and performance.',
    ],
  },
  {
    id: 'risks',
    title: 'Estimating Risks',
    icon: 'TriangleAlert',
    summary: 'What can go wrong in the estimate.',
    points: [],
    sub: [
      { heading: 'Procurement Strategies', items: ['Traditional', 'Design & Build / Lump Sum', 'Re-measured'] },
      {
        heading: 'Common Risks',
        items: [
          'Lack of Drawings, Schedules and Details',
          'Missing Specifications',
          'BOQ Accuracy',
          'Project Duration & Liquidated Damages',
          'Price Fixity',
        ],
      },
      {
        heading: 'Market & Technical Factors',
        items: ['Market Validity (Price Fluctuation, Labour Security, Visa Rules)'],
      },
      { heading: 'Site-Specific Risk', items: ['Technical Challenges', 'Buildability Concerns'] },
    ],
  },
  {
    id: 'manage-risk',
    title: 'Management of Risks',
    icon: 'ShieldCheck',
    summary: 'Risk can be reduced by issuing tender queries to the employer.',
    points: [],
    sub: [
      { heading: 'Conduct Risk Workshop', items: ['Gather stakeholders', 'Identify potential risks'] },
      { heading: 'Prepare Risk Register', items: ['Document identified risks', 'Categorize by type and impact'] },
      {
        heading: 'Quantitative Risk Analysis (QRA)',
        items: ['Assess risks numerically', 'Calculate probabilities and impacts'],
      },
      {
        heading: 'Risk Contingency Budget',
        items: ['Allocate budget for risk mitigation', 'Cover potential cost overruns'],
      },
      {
        heading: 'Pre-Bid Agreement with Supplier',
        items: ['Define risk-sharing terms', 'Allocate responsibilities and liabilities in the bidding phase'],
      },
      {
        heading: 'Joint Venture (JV) / Consortium',
        items: ['Form partnerships or JVs to distribute risk', 'Pool resources and expertise for large projects'],
      },
    ],
  },
]

/* ════════════════════════════════════════════════════════════════
   Tender Adjudication + Submission (tender section)
   ════════════════════════════════════════════════════════════════ */
export const ADJUDICATION = {
  purpose:
    'A management process that makes a commercial judgement to determine the final bid amount based on various factors — i.e. the process of converting the contractor’s estimate into a tender bid.',
  discussed: [
    'Discuss the head office overhead (OH) cost.',
    'Profit based on this year’s business plan.',
    'Discuss the risk allowance.',
  ],
  overheads: [
    'Staff Salaries',
    'Office Depreciation / Rent and Maintenance',
    'Insurance and Bank Charges',
    'Utilities (Telephone, Electricity, Water)',
    'Office Supplies (Printing, Stationery, Postage, Advertising)',
    'Equipment Rentals (Computers, Servers, Fax Machines, Plotters)',
    'Tender Document Costs',
    'Office Registration and Maintenance',
    'Unrecoverable Debts',
    'Advertising',
    'Recreation and Entertainment',
    'Recruitment Costs',
    'Audit Fees',
    'Legal, Professional and License Fees',
  ],
}

export const SUBMISSION = {
  technical: [
    'Company Trade Licence',
    'Technical Form of Tender',
    'Project Profile',
    'Execution Plan',
    'Method Statement',
    'Tender Programme',
    'Organization Chart',
    'Key Personnel CVs',
    'Quality Control Process and HSE detail / Procedure',
    'Detail about previously completed projects',
    'Labour Histogram and Plant',
  ],
  commercial: [
    'Covering Letter (Offer) — Offer price + Schedule of qualifications / exclusions',
    'Form of Tender',
    'Priced BOQs',
    'Schedule of Rates',
    'Day Works rates',
  ],
}

/* ════════════════════════════════════════════════════════════════
   Post-Contract journey timeline
   ════════════════════════════════════════════════════════════════ */
export const POST_CONTRACT_STAGES: TimelineStage[] = [
  {
    id: 'profit',
    index: 1,
    title: 'Profit Enhancement',
    tagline: 'Balance risks against opportunities',
    icon: 'TrendingUp',
    points: [
      'Profit enhancement depends on an appropriate balance between the Risks and the Opportunities.',
      'Identify and manage risks across Authorities, Design, Services, HSE and Contractual categories.',
      'Pursue opportunities such as early completion, buying gains, reduced running costs, productivity and value engineering.',
    ],
  },
  {
    id: 'procurement',
    index: 2,
    title: 'Procurement',
    tagline: 'Material, labour & subcontracts',
    icon: 'PackageSearch',
    points: [
      'Procure materials, labour and subcontract packages against detailed schedules.',
      'Select an appropriate procurement route before tendering subcontract works.',
      'Issue, evaluate and award tender documents in 5 volumes.',
    ],
  },
  {
    id: 'reporting',
    index: 3,
    title: 'Reporting',
    tagline: 'Cash flow, CVR, CTC & EVA',
    icon: 'LineChart',
    points: [
      'Cash Flow, Cost Value Reconciliation (CVR), Cost to Complete (CTC) and Earned Value Analysis (EVA).',
      'All contribute to better decision-making, compliance, efficiency and profitability.',
    ],
  },
  {
    id: 'admin',
    index: 4,
    title: 'Contract Administration',
    tagline: 'Valuations, variations, claims & final accounts',
    icon: 'FileSignature',
    points: [
      'Effective contract administration is mandatory to fulfil the commercial management objectives.',
      'Interim valuations, variations and claims — managed both upstream and downstream.',
      'Settle final accounts.',
    ],
  },
]

/* ════════════════════════════════════════════════════════════════
   Profit enhancement — risks vs opportunities + bulk buying
   ════════════════════════════════════════════════════════════════ */
export const PROFIT_RISKS: RiskOpp[] = [
  { title: 'Authorities', description: 'Risk related to delays due to permit or approval issues.' },
  {
    title: 'Design',
    description: 'Risk from incomplete or inadequate project design, leading to delays or extra costs.',
  },
  {
    title: 'Services',
    description: 'Risk associated with the availability and reliability of essential utilities or services.',
  },
  {
    title: 'HSE',
    description:
      'Risk involving health, safety and environmental concerns, including accidents and regulatory compliance.',
  },
  {
    title: 'Contractual',
    description:
      'Risk stemming from disputes or breaches in project contracts, potentially leading to legal and financial problems.',
  },
]

export const PROFIT_OPPORTUNITIES: RiskOpp[] = [
  {
    title: 'Early Completion',
    description: 'Time and cost savings by finishing ahead of schedule (saving on preliminaries).',
  },
  {
    title: 'Buying Gains',
    description:
      'Reduce costs by procuring at lower prices — economies of scale: higher quantities attract lower rates.',
  },
  {
    title: 'Reducing Running Costs',
    description: 'Reduce water, electricity, fuel, pantry and other associated running expenses.',
  },
  {
    title: 'Increasing Productivity',
    description: 'Improved efficiency and output via business improvement targets and bonus schemes.',
  },
  {
    title: 'Value Engineering',
    description: 'Identify cost savings without sacrificing quality; VE can lead to innovative, lower-cost solutions.',
  },
]

export const BULK_BUYING = {
  intro: 'Bulk buying gains will be beneficial only if:',
  conditions: [
    'The Contractor can afford the upfront expense.',
    'Multiple projects run at the same time with similar requirements (i.e. same specifications).',
    'The Contractor’s stock in inventory can match the project specs.',
    'Costs spent on storage are less.',
    'The Contractor has an organized material management system.',
  ],
}

export const REGISTERS = {
  risks: [
    'Market Fluctuations',
    'Regulatory Compliance',
    'Contractual',
    'Labour Shortages',
    'Material Price Volatility',
    'Weather Delays',
    'Safety Incidents',
    'Change Orders',
    'Payment Issues',
    'Design Changes',
    'Inaccurate Estimates',
  ],
  opportunities: [
    'Value Engineering',
    'Effective Project Management',
    'Early Completion',
    'Buying Gains',
    'Supplier & Contractor Negotiations',
    'Scope Management',
    'Risk Management',
    'Cost Monitoring',
    'Quality Control',
    'Resource Allocation',
    'Reduced Running Costs',
  ],
  note: 'Manage Risks & Opportunities using the R&O Register — a living document reviewed throughout the project.',
}

/* ════════════════════════════════════════════════════════════════
   Procurement (tabs)
   ════════════════════════════════════════════════════════════════ */
export const PROCUREMENT_TABS: TabItem[] = [
  {
    id: 'materials',
    label: 'Materials',
    icon: 'Boxes',
    intro: 'Set up a detailed schedule of material requirements.',
    points: [
      'Base the schedule on whether material is sourced locally or foreign, and whether it is purpose-made or standard material.',
      'Get support from the operations team to identify the materials, and the central procurement team to lead procurement from suppliers / manufacturers.',
      'Ensure a tracker is maintained for monitoring and controlling purposes.',
    ],
  },
  {
    id: 'labour',
    label: 'Labour',
    icon: 'HardHat',
    intro: 'Engage planning and operational teams to assess labour needs.',
    points: [
      'Determine if work can be done in-house or needs labour subcontractors.',
      'Identify reasons for outsourcing if in-house labour isn’t feasible (e.g. workload, design, low productivity).',
      'Assess which labour categories to subcontract (sub-specific).',
      'Issue RFQs, evaluate and negotiate if necessary.',
      'Award the works.',
      'Administer labour subcontracts.',
    ],
  },
  {
    id: 'subcontracts',
    label: 'Subcontracts',
    icon: 'Network',
    intro: 'Set up a subcontracting schedule and strategy.',
    points: [
      'Define the procurement and contract strategy (Traditional, D&B etc. / Lump Sum, VP etc.).',
      'Plan the tendering strategy (open, selective or negotiated).',
      'Prepare tender documents.',
      'Identify and issue tender docs to potential subcontractors.',
      'Manage tender queries and responses.',
      'Evaluate technically and commercially.',
      'Negotiate for budget-aligned discounts.',
      'Award the subcontract and administer post-contract tasks.',
    ],
  },
  {
    id: 'tender-docs',
    label: 'Tender Documents',
    icon: 'FolderOpen',
    intro: 'Tender documents are typically issued in five volumes.',
    points: [],
    sub: [
      {
        heading: 'Volume I — Tendering & Contract Conditions',
        items: [
          'Instructions to Tenderers',
          'Tender acknowledgement (confirmation all documents received)',
          'Tender Confirmation form (willing to participate or not) — if required',
          'Form of Tender & Form of Agreement',
          'Contract Conditions — Part I (General) & Part II (Particular)',
          'Specimen forms — Tender Bond, PG, APG, Insurance etc.',
        ],
      },
      {
        heading: 'Volume II — Specifications',
        items: [
          'Scope of Work',
          'Specifications (Building — General Civil, Architectural, M&E & Particular)',
          'Specification (Infra — General DM & Particular, Sewer)',
        ],
      },
      { heading: 'Volume III — Drawings', items: ['Architectural, Structural, Mechanical, Electrical & External'] },
      { heading: 'Volume IV — BOQ', items: ['Pricing Preambles, Bill Section, Day Works, PS & PC and Summary'] },
      { heading: 'Volume V — Soil report & other information', items: ['Soil report and other supporting information'] },
      {
        heading: 'Procurement Route (select before tendering)',
        items: ['Traditional', 'Design & Build (D&B)', 'Management Contracting (seldom)', 'Construction Management (seldom)'],
      },
    ],
  },
]

/* ════════════════════════════════════════════════════════════════
   Reporting (tabs)
   ════════════════════════════════════════════════════════════════ */
export const REPORTING_TABS: TabItem[] = [
  {
    id: 'cashflow',
    label: 'Cash Flow',
    icon: 'Banknote',
    intro:
      'A cash flow forecast analyses expected cash inflows and outflows over a specified period (typically a year) for business planning and financial assessment.',
    points: [
      'In construction, a contract’s cash flow focuses on payments related to that specific contract, closely tied to the company’s overall cash flow.',
      'Two primary types: Organizational cash flow forecast (company-wide) and Project cash flow forecast (project-specific).',
    ],
    sub: [
      {
        heading: 'Three forecast methods (RICS Black Book)',
        items: [
          'Equal cash in/out assumption — 1st third of duration: ¼ of cost; 2nd third: ½ of cost; final third: remaining ¼.',
          'Based on the construction programme — more accurate, based on the sequence of work.',
          'Documents needed for the programme method: Construction programme, BOQ and Conditions of Contract.',
        ],
      },
      {
        heading: 'Benefits',
        items: [
          'Track liquidity (cash position) for operations.',
          'Early warning system for cash shortages.',
          'Monitors cash in (payments) and outflows (material, labour, plant, subcontractors).',
          'Evaluates project profitability and alignment with goals.',
          'Assists precise tax planning and timely payments.',
          'Supports financial decisions (e.g. additional funding).',
        ],
      },
      {
        heading: 'Dealing with negative cash flow',
        items: [
          'Occurs when cash out takes precedence over cash in.',
          'Request ad-hoc (on-account) payments or advance payment from the Client.',
          'Negotiate with the supply chain for extended payment time.',
          'Reduce overhead costs and increase rate of progress.',
          'Request upfront retention release via a retention bond.',
          'Use corporate cash or short-term financing from banks.',
        ],
      },
    ],
  },
  {
    id: 'cvr',
    label: 'CVR',
    icon: 'Scale',
    intro:
      'Cost Value Reconciliation — comparing the actual costs incurred against the value of work performed during a specific period. Also known as the profit & loss account of a project.',
    points: [
      'Typically done on a monthly or periodic basis.',
      'Cost sources: Ledger Cost, Accruals (incurred but not paid) and Subcontractor Liability.',
      'Value sources: Interim payment application / Payment Certificate.',
      'Adjustments: under-measure, over-measure, variations/claims in dispute, material on site, under-certifications.',
    ],
    sub: [
      {
        heading: 'Benefits',
        items: [
          'Tracks actual revenue vs actual costs.',
          'Provides insight into the profitability of a project.',
          'Early warning on potential cost overruns (Material, Labour, Plant, Subcontracts).',
          'Aids quick decision-making concerning profitability.',
        ],
      },
    ],
  },
  {
    id: 'ctc',
    label: 'CTC',
    icon: 'Hourglass',
    intro:
      'Cost to Complete — a measuring tool used to determine the probable cost needed to complete the works from a given point in time.',
    points: [
      'How? Actual cost as of date + forecasted cost to complete the balance works.',
      'Compared against the anticipated final account (revenue) to determine profit or loss at completion.',
      'Also compared with the original budget to analyse profitability.',
      'Actual cost — from the ledger (finance department). Forecast cost — by the QS / Commercial Manager with planning & operations support.',
    ],
    sub: [
      {
        heading: 'Benefits',
        items: [
          'Tracks actual vs estimate costs.',
          'Supports forecasting remaining costs (expenses).',
          'Early warning on potential cost overruns on various elements.',
          'Aids quick decision-making concerning profitability.',
          'Aids claim preparation and dispute resolution.',
        ],
      },
    ],
  },
  {
    id: 'eva',
    label: 'EVA',
    icon: 'Activity',
    intro:
      'Earned Value Analysis — integrates scope, schedule and cost to measure project performance and progress against the baseline.',
    points: [
      'Listed alongside Cash Flow, CVR and CTC as a core commercial reporting tool in a Contractor’s organization.',
      'All of these reporting tools contribute to better decision-making, compliance, efficiency and profitability.',
    ],
  },
]

/* ════════════════════════════════════════════════════════════════
   Contract administration + task allocation
   ════════════════════════════════════════════════════════════════ */
export const CONTRACT_ADMIN = {
  intro: 'Effective contract administration is mandatory to fulfil the commercial management objectives.',
  items: [
    {
      title: 'Interim Valuations',
      description: 'Upstream (to the Employer / Client) and downstream (to subcontractors / suppliers).',
    },
    {
      title: 'Variations',
      description: 'Upstream (to the Employer / Client) and downstream (to subcontractors / suppliers).',
    },
    { title: 'Claims', description: 'Notices, detailed particulars (interim / final), negotiations etc.' },
    { title: 'Final Accounts', description: 'Settle and agree the final account to close out the contract.' },
  ],
  task: {
    title: 'Task Allocation',
    body: 'Candidates who have chosen Commercial Management as their Core (Technical) Competency, and Quantity Surveyors with experience largely in contracting organizations, should draft their SOE for Level 1 of Commercial Management — using the SOE tracker on the APC portal.',
  },
}

/* ════════════════════════════════════════════════════════════════
   Flashcards — key terms & definitions
   ════════════════════════════════════════════════════════════════ */
export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-cm',
    term: 'Commercial Management',
    definition:
      'A process that focuses firstly on securing the intended profit, then on enhancing that profit — across both pre-contract and post-contract stages.',
    category: 'Foundations',
  },
  {
    id: 'fc-preselection',
    term: 'Preselection Phase',
    definition:
      'The prequalification phase where the Contractor submits documents (incl. 3 years of audited financials) to demonstrate technical and financial competence to the Client.',
    category: 'Pre-Contract',
  },
  {
    id: 'fc-decision',
    term: 'Decision to Tender',
    definition:
      'The bid / no-bid judgement after a tender invitation — weighing workload, profitability, resources, risk and the organization’s business plan.',
    category: 'Pre-Contract',
  },
  {
    id: 'fc-appreciation',
    term: 'Project Appreciation',
    definition:
      'Understanding the works before estimating — tender procedure, programme, method statements, histograms, pricing strategy and site visits.',
    category: 'Pre-Contract',
  },
  {
    id: 'fc-firstprinciples',
    term: 'First Principles Rate',
    definition:
      'A rate built up from scratch by considering the underlying material, labour, plant and subcontractor costs of an item.',
    category: 'Estimating',
  },
  {
    id: 'fc-operational',
    term: 'Operational Estimate',
    definition:
      'A detailed assessment of costs for a specific construction operation or activity, based on the resource requirement (McCaffer & Baldwin, 1984).',
    category: 'Estimating',
  },
  {
    id: 'fc-adjudication',
    term: 'Tender Adjudication',
    definition:
      'The settlement meeting that converts the contractor’s estimate into a tender bid, applying head office overhead, profit and risk allowance.',
    category: 'Tender',
  },
  {
    id: 'fc-oh',
    term: 'Head Office Overheads',
    definition:
      'Indirect company costs (salaries, rent, utilities, insurance, audit, legal etc.) recovered through the tender as a percentage addition.',
    category: 'Tender',
  },
  {
    id: 'fc-profit-enh',
    term: 'Profit Enhancement',
    definition:
      'The post-contract pursuit of improved margin through an appropriate balance between project Risks and Opportunities.',
    category: 'Post-Contract',
  },
  {
    id: 'fc-ve',
    term: 'Value Engineering',
    definition:
      'Reviewing project components to identify cost savings without sacrificing quality — often producing innovative, lower-cost solutions.',
    category: 'Post-Contract',
  },
  {
    id: 'fc-buying',
    term: 'Buying Gains',
    definition:
      'Cost reductions from procuring materials/services at lower prices using economies of scale — higher quantities attract lower rates.',
    category: 'Post-Contract',
  },
  {
    id: 'fc-cashflow',
    term: 'Cash Flow Forecast',
    definition:
      'An analysis of expected cash inflows and outflows over a specified period for planning and financial assessment — organizational or project-specific.',
    category: 'Reporting',
  },
  {
    id: 'fc-cvr',
    term: 'Cost Value Reconciliation (CVR)',
    definition:
      'A periodic comparison of actual cost incurred against the value of work performed — effectively the profit & loss account of a project.',
    category: 'Reporting',
  },
  {
    id: 'fc-ctc',
    term: 'Cost to Complete (CTC)',
    definition:
      'Actual cost to date plus the forecast cost to finish the balance works — compared to the final account and budget to test profitability.',
    category: 'Reporting',
  },
  {
    id: 'fc-eva',
    term: 'Earned Value Analysis (EVA)',
    definition:
      'A reporting technique integrating scope, schedule and cost to measure performance against the baseline.',
    category: 'Reporting',
  },
  {
    id: 'fc-negcash',
    term: 'Negative Cash Flow',
    definition:
      'When cash out takes precedence over cash in — remedied via advance payments, supply-chain terms, retention release, corporate cash or short-term finance.',
    category: 'Reporting',
  },
  {
    id: 'fc-risk-register',
    term: 'R&O Register',
    definition:
      'A living Risk & Opportunities register used to record, categorize and manage project risks and opportunities throughout delivery.',
    category: 'Post-Contract',
  },
  {
    id: 'fc-contract-admin',
    term: 'Contract Administration',
    definition:
      'The mandatory post-contract management of interim valuations, variations, claims and final accounts — both upstream and downstream.',
    category: 'Post-Contract',
  },
]

/* ════════════════════════════════════════════════════════════════
   Quiz — knowledge check
   ════════════════════════════════════════════════════════════════ */
export const QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What are the two sequential focuses of commercial management?',
    options: [
      { text: 'Firstly securing the intended profit, then enhancing it', correct: true },
      { text: 'Winning the most contracts, then reducing staff', correct: false },
      { text: 'Minimising tax, then maximising turnover', correct: false },
      { text: 'Cutting costs, then increasing the contract sum', correct: false },
    ],
    explanation:
      'Commercial management is a process that focuses firstly on securing the intended profit, and then on enhancing that profit — across both pre- and post-contract stages.',
  },
  {
    id: 'q2',
    question: 'During the preselection phase, why are 3 years of audited financial statements typically required?',
    options: [
      { text: 'To demonstrate the trend of the Contractor’s financial performance over time', correct: true },
      { text: 'Because tax law requires exactly three years', correct: false },
      { text: 'To calculate the head office overhead percentage', correct: false },
      { text: 'To prepare the cash flow forecast', correct: false },
    ],
    explanation:
      'Three years of reports demonstrate the trend of the financial performance of the Contractor over a period of time, supporting financial prequalification.',
  },
  {
    id: 'q3',
    question: 'Which factor is NOT a typical input to the Decision to Tender?',
    options: [
      { text: 'The colour scheme of the site hoarding', correct: true },
      { text: 'Current workload and contract profitability', correct: false },
      { text: 'Resource availability and tender timeframe', correct: false },
      { text: 'Client/Consultant relationship and project risk assessment', correct: false },
    ],
    explanation:
      'Decision to Tender relies on factors like client relationship, work type/value, workload, profitability, resources, timeframe, competition and risk — not aesthetic site details.',
  },
  {
    id: 'q4',
    question: 'A rate "built up from scratch" considering material, labour, plant and subcontractor costs is known as:',
    options: [
      { text: 'A first-principles rate', correct: true },
      { text: 'A schedule of rates', correct: false },
      { text: 'A provisional sum', correct: false },
      { text: 'A day-works rate', correct: false },
    ],
    explanation:
      'First-principles estimating builds rates from scratch by considering the underlying material, labour, plant and subcontractor costs.',
  },
  {
    id: 'q5',
    question: 'What is the purpose of the tender adjudication (settlement) meeting?',
    options: [
      { text: 'To convert the contractor’s estimate into a tender bid', correct: true },
      { text: 'To agree the final account with the client', correct: false },
      { text: 'To prepare the project cash flow forecast', correct: false },
      { text: 'To select the labour subcontractors', correct: false },
    ],
    explanation:
      'Adjudication is a commercial-judgement process that determines the final bid amount — applying head office overhead, profit and risk allowance to convert the estimate into a bid.',
  },
  {
    id: 'q6',
    question: 'Profit enhancement in the post-contract stage depends on:',
    options: [
      { text: 'An appropriate balance between Risks and Opportunities', correct: true },
      { text: 'Always choosing the lowest-cost supplier', correct: false },
      { text: 'Maximising the number of variations', correct: false },
      { text: 'Eliminating all site supervision', correct: false },
    ],
    explanation:
      'Profit enhancement depends on an appropriate balance between the project’s Risks (Authorities, Design, Services, HSE, Contractual) and Opportunities (early completion, buying gains, VE etc.).',
  },
  {
    id: 'q7',
    question: 'Cost Value Reconciliation (CVR) is best described as:',
    options: [
      { text: 'The profit & loss account of a project, comparing cost to value periodically', correct: true },
      { text: 'A forecast of cash inflows and outflows over a year', correct: false },
      { text: 'A schedule of the materials required for the works', correct: false },
      { text: 'The instructions to tenderers document', correct: false },
    ],
    explanation:
      'CVR compares actual costs incurred against the value of work performed during a period — effectively a project profit & loss account, usually run monthly.',
  },
  {
    id: 'q8',
    question: 'Cost to Complete (CTC) is calculated as:',
    options: [
      { text: 'Actual cost to date + forecast cost to complete the balance works', correct: true },
      { text: 'Original budget − actual cost to date', correct: false },
      { text: 'Value of work done − cost of work done', correct: false },
      { text: 'Tender sum + head office overhead', correct: false },
    ],
    explanation:
      'CTC = actual cost as of date + forecasted cost to complete the remaining works, then compared to the final account and budget to assess profitability.',
  },
  {
    id: 'q9',
    question: 'Which is a valid remedy for a negative cash flow situation?',
    options: [
      { text: 'Request upfront retention release by submitting a retention bond', correct: true },
      { text: 'Stop issuing interim payment applications', correct: false },
      { text: 'Increase head office overheads', correct: false },
      { text: 'Delay all material deliveries indefinitely', correct: false },
    ],
    explanation:
      'Remedies include ad-hoc/advance payments, extended supply-chain terms, reduced overheads, faster progress, retention release via bond, corporate cash and short-term finance.',
  },
  {
    id: 'q10',
    question: 'Which volume of the tender documents typically contains the BOQ?',
    options: [
      { text: 'Volume IV', correct: true },
      { text: 'Volume I', correct: false },
      { text: 'Volume II', correct: false },
      { text: 'Volume V', correct: false },
    ],
    explanation:
      'Volume IV holds the BOQ (pricing preambles, bill section, day works, PS & PC and summary). Volume I is conditions, II specifications, III drawings, V soil report.',
  },
]

/* ════════════════════════════════════════════════════════════════
   Spoken narration scripts — one per section, written to cover every
   note from the presentation when read aloud (Web Speech API).
   ════════════════════════════════════════════════════════════════ */
export const SECTION_NARRATION: Record<SectionId, string> = {
  overview:
    'What and why. Commercial management is a process that focuses, firstly, on securing the intended profit, and then on enhancing that profit. It applies in two stages: the pre-contract stages, and the post-contract stages. Without proper financial safeguards during bidding and contract formation, contractors risk entering unprofitable projects. Proper commercial management during pre-contract stages ensures contracts are won at viable margins. Profitability is not just about winning contracts, but about managing them effectively. Risks and opportunities exist at both stages, so securing and enhancing profitability begins from the pre-contract stages.',
  competency:
    'About the competency. For the R.I.C.S. pathway, commercial management of construction works is a core competency taken to Level 3. Mandatory competencies include ethics and professionalism at Level 3; client care, communication and negotiation, and health and safety at Level 2; plus accounting, business planning, conflict avoidance, data management, diversity and inclusion, inclusive environments and sustainability at Level 1. Optional competencies, two taken to Level 2, include capital allowances, contract administration, corporate recovery and insolvency, due diligence, insurance, programming and planning, project feasibility analysis, and risk management. Candidates in a commercial or contracting environment usually take commercial management to Level 3, while those in a consulting environment usually take design economics and cost planning to Level 3. For the A.I.Q.S. pathway, commercial management is unit 8, sitting under contract documentation and procurement, within the wider project cost management competencies.',
  precontract:
    'The pre-contract journey has six stages. One: the preselection phase, where the contractor submits documents, including three years of audited financial statements, to prove technical and financial competence during prequalification. Two: the decision to tender, a bid or no-bid judgement that weighs workload, profitability, resources, risk and the business plan. Three: project appreciation, where you confirm the tender procedure, appoint the lead estimator, set the programme, prepare method statements and histograms, set a pricing strategy, and carry out site visits. Four: estimating the works. Five: tender adjudication, which converts the estimate into a bid. And six: tender submission, the technical and commercial offer.',
  estimating:
    'Estimating the works. Rates come from four data sources: in-house cost databases, first principles, supplier and subcontractor quotes, and operational estimates. First principles means building rates from scratch, considering material, labour, plant and subcontractor costs. Every supplier enquiry should state the project title and location, the work description and specifications, quality requirements, delivery period, contractor-provided facilities, the date of the request, and the validity of the quotation. An operational estimate is a detailed assessment of the costs of a specific construction operation or activity, based on the resource requirement, as defined by McCaffer and Baldwin in nineteen eighty-four. Estimating risks include a lack of drawings and details, missing specifications, BOQ accuracy, project duration and liquidated damages, and price fixity, plus market and buildability risks. Risk can be reduced by issuing tender queries to the employer, and managed through risk workshops, a risk register, quantitative risk analysis, a contingency budget, pre-bid agreements, and joint ventures.',
  tender:
    'Tender adjudication and submission. The adjudication, or settlement meeting, is a management process that makes a commercial judgement to determine the final bid amount — converting the estimate into a tender bid. The meeting discusses the head office overhead cost, the profit based on this year’s business plan, and the risk allowance. Head office overheads include staff salaries, office rent, insurance and bank charges, utilities, office supplies, equipment rentals, tender document costs, unrecoverable debts, advertising, recruitment, audit fees, and legal and professional fees. The tender submission has two parts. The technical submission includes the trade licence, technical form of tender, project profile, execution plan, method statement, programme, organisation chart, key C.V.s, quality and safety procedures, and the labour and plant histogram. The commercial submission includes the covering letter with the offer price and a schedule of qualifications, the form of tender, the priced bills of quantities, the schedule of rates, and the day-works rates.',
  postcontract:
    'The post-contract journey has four disciplines. One: profit enhancement, balancing risks against opportunities. Two: procurement of material, labour and subcontracts. Three: reporting, using cash flow, cost value reconciliation, cost to complete, and earned value analysis. And four: contract administration, covering valuations, variations, claims and final accounts. Together these protect and grow the margin secured at tender.',
  profit:
    'Profit enhancement depends on an appropriate balance between the risks and the opportunities. The risks include authorities risk from permit delays, design risk from incomplete design, services risk from utilities, health safety and environmental risk, and contractual risk from disputes. The opportunities include early completion, which saves on preliminaries; buying gains, using economies of scale where higher quantities attract lower rates; reducing running costs such as water, electricity and fuel; increasing productivity through targets and bonus schemes; and value engineering, which finds cost savings without sacrificing quality. Bulk buying only pays off if the contractor can afford the upfront expense, has multiple projects with similar specifications, has stock that matches the project, has low storage costs, and runs an organised material management system. Manage everything using the risks and opportunities register.',
  procurement:
    'Procurement covers materials, labour and subcontracts. For materials, set up a detailed schedule based on whether items are local or foreign, and purpose-made or standard, with support from the operations and central procurement teams, and keep a tracker. For labour, assess needs, decide in-house versus subcontract, issue requests for quotation, evaluate, negotiate, award and administer. For subcontracts, set up a schedule, define the procurement and contract strategy, plan the tendering strategy as open, selective or negotiated, prepare and issue tender documents, evaluate technically and commercially, negotiate discounts, award and administer. Tender documents come in five volumes: Volume one, tendering and contract conditions; Volume two, specifications; Volume three, drawings; Volume four, the bills of quantities; and Volume five, the soil report. Choose the procurement route — traditional, design and build, management contracting, or construction management — before tendering.',
  reporting:
    'Reporting in commercial management uses four tools: cash flow, cost value reconciliation, cost to complete, and earned value analysis. A cash flow forecast analyses expected inflows and outflows over a period, and can be organisational or project-specific. The R.I.C.S. Black Book defines three methods, including an equal cash assumption and a more accurate programme-based method. A negative cash flow, where cash out exceeds cash in, can be remedied with advance payments, extended supply-chain terms, reduced overheads, faster progress, retention release via a bond, or short-term finance. Cost to complete equals the actual cost to date plus the forecast cost to finish, compared against the final account and budget. Cost value reconciliation compares cost incurred against the value of work done, period by period — effectively the project profit and loss account. Earned value analysis integrates scope, schedule and cost against the baseline. All of these support better decision-making, compliance, efficiency and profitability.',
  admin:
    'Contract administration is mandatory to fulfil the commercial management objectives. It covers interim valuations, both upstream to the employer and downstream to subcontractors; variations, again upstream and downstream; claims, including notices, detailed particulars and negotiations; and final accounts. As a task, candidates who chose commercial management as their core technical competency should draft their statement of experience for Level 1, using the statement of experience tracker on the A.P.C. portal.',
  flashcards:
    'Use the flashcards for active recall. Tap any card to flip it and reveal the definition, and filter by topic to focus on the areas you find hardest.',
  quiz:
    'Test yourself with the ten-question knowledge check. It spans both pre-contract and post-contract commercial management, with instant feedback on every answer.',
}

/* Section order for the narrator’s "play full tour" feature. */
export const NARRATION_ORDER: SectionId[] = [
  'overview',
  'competency',
  'precontract',
  'estimating',
  'tender',
  'postcontract',
  'profit',
  'procurement',
  'reporting',
  'admin',
]
