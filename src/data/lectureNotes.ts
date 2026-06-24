import type { LectureBlock, SectionId } from '../types'

/* ════════════════════════════════════════════════════════════════
   Lecture explanations — the presenter's spoken teaching, distilled
   into structured handwritten study notes, kept in presentation order.
   Source: full 2h44m transcript (Parts 1 & 2), Roshan de Silva.
   ════════════════════════════════════════════════════════════════ */
export const LECTURE_NOTES: Partial<Record<SectionId, LectureBlock[]>> = {
  overview: [
    {
      heading: 'Profit vs Value for Money — never mix them',
      points: [
        'A contractor is a business entity — without profit it cannot sustain in the market, so the contractor always chases profit.',
        'A client (or consultant acting for the client) chases value for money — the maximum benefit for the money the client spends.',
        'The contractor earns profit by complying with the client’s requirements and delivering better value for money.',
      ],
      watch:
        'In your SOE, “commercial management” = profitability; “design economics & cost planning” = value for money. Assessors see these two terms misused constantly — keep them clean.',
    },
    {
      heading: 'What “intended profit” means',
      points: [
        'The tender team prices a profit over and above the cost — e.g. 10% over the cost. That target margin is the intended profit.',
        'Commercial management first secures that intended profit, then finds avenues to enhance it — pushing 10% up toward 12%, 15%, 20%.',
        'It spans the whole life-cycle: pre-contract commercial management and post-contract commercial management.',
      ],
      example:
        'Tender value = X, cost = Y. The delta (X − Y) is the profit. If the estimate carries 10% profit, post-contract CM hunts for ways to lift the realised margin above 10%.',
    },
    {
      heading: 'Why it is a contractor’s competency (per RICS)',
      points: [
        'RICS defines the competency as covering the commercial management of construction works.',
        'Candidates must show awareness of how commercial competitiveness balances against profitability, and of the financial processes used to achieve profitability and integrate them with overall project delivery.',
        'That wording — competitiveness vs profitability — is what ties the competency to the contractor.',
      ],
    },
  ],

  competency: [
    {
      heading: 'A “switching” core competency',
      points: [
        'Commercial Management is one of two competencies you can switch between at core level.',
        'If your experience is largely in a contractor’s organisation → choose Commercial Management to Level 3.',
        'If your experience is largely client / consultant side → you have no choice but Design Economics & Cost Planning to Level 3.',
        'Level 3 = advisory. Advisory only works when Level 1 (fundamental knowledge) is blended with Level 2 (practical exposure) — that combination lets you give reasonable advice.',
      ],
    },
    {
      heading: 'AIQS mapping',
      points: [
        'Under AIQS, Commercial Management sits as a unit under the Contract Documentation & Procurement core competencies (unit 8).',
        'RICS pre-contract Commercial Management aligns closely with AIQS Contract Documentation & Procurement.',
      ],
    },
    {
      heading: 'Writing your SOE',
      points: [
        'If you have worked in both pre- and post-contract, you can write about both; if only one, write that one — it doesn’t matter.',
        'At Level 1 you can note that commercial management spans both stages and list the operations under each.',
        'At Level 2 and Level 3 (doing / advisory) you write specifically about what you actually did — a post-contract QS writes post-contract.',
      ],
    },
  ],

  precontract: [
    {
      heading: 'Preselection — proving competence',
      points: [
        'During prequalification the contractor submits documents to demonstrate technical and financial competence.',
        'Financial prequalification generally needs audited financial statements for a minimum of 3 years — profit & loss account, balance sheet and the auditor’s statement.',
        'Why 3 years? The client wants to see the financial trend over time — proof the contractor has the backbone to fund the works until the client pays.',
      ],
      tip: 'A classic interview question: “How do you know the statements are audited?” Answer: check the auditor’s statement — the official, signed and stamped confirmation on the auditing firm’s letterhead showing liquidity, assets/liabilities and whether GAAP or IFRS was used.',
    },
    {
      heading: 'Decision to Tender — bid or no-bid',
      points: [
        'When the invitation arrives, best practice is to respond first — accept, or send a regret letter if declining.',
        'If accepting, collect the tender documents and prepare a preliminary report: scope of works, client and stakeholders, location, previous experience.',
        'A poor-paymaster client, or a rigorous / inflexible / client-biased cost or project-management consultant, can itself be a reason to regret.',
        'The organisation’s business plan and yearly job-winning targets heavily influence the decision — and the pressure to hit targets can push teams into wrong submissions.',
      ],
      watch:
        'A very tight tender timeframe makes a competitive, accurate bid risky — sometimes the right call is not to tender.',
    },
    {
      heading: 'Project Appreciation — pricing strategy (ethics)',
      points: [
        'Front loading: loading higher value into the early stages of execution to pull revenue forward quickly.',
        'Back loading: pushing the majority of value toward the end of the works.',
        'Spot loading: targeting specific items and hiding costs within them.',
      ],
      watch:
        'Front / back / spot loading are NOT ethical. Never present them as your pricing strategy in an APC discussion — mention them only as practices to avoid.',
      tip: 'At the site visit, also note which other contractors attend — it tells you how competitive the tender will be.',
    },
  ],

  estimating: [
    {
      heading: 'First-principles unit rate — the sub-components',
      points: [
        'A first-principles rate is built from scratch and accumulates into one unit rate: material + labour + plant + subcontractor + risk + overhead & profit.',
        'Labour (all-in rate): basic pay + holidays + visa charges + air freight + welfare + site tools, etc.',
        'Material: split local vs overseas; net cost + delivery & haulage + wastage + distribution cost.',
        'Subcontractor: specialised vs normal; allow for unloading facilities, scaffolding, accommodation, transportation as needed.',
      ],
    },
    {
      heading: 'Quotes & operational estimates',
      points: [
        'Enquiries to suppliers/subcontractors use only the minimum documents — not the full structured tender volumes: project title & location, work description & specs, quality, delivery period, contractor-provided facilities, the date the quote is required, and its validity.',
        'An operational estimate comes from experience / a work study by technical people who assess the realistic resources for a task.',
        'A QS on site can build a realistic operational estimate from actual requirements and feed it back to the estimating department for future tenders.',
      ],
      example:
        'Quote validity is sometimes brutally short — a European HVAC unit was priced with only a two-hour validity; miss it and the supplier can lift the price.',
    },
    {
      heading: 'Risks in the estimate',
      points: [
        'Procurement-strategy risk: traditional, design & build, management contracting or construction management — each carries its own risk.',
        'Contract-type risk: remeasure, lump sum, or cost reimbursement. Cost reimbursement has three flavours — cost plus percentage, target cost, and guaranteed maximum price (GMP).',
        'Common risk: lack of drawings/scope clarity, missing specs, inaccurate BOQ quantities, project duration & liquidated damages, price fixity.',
        'Market & technical: price fluctuation, labour security, visa rules, regional conflict; plus technical challenges and buildability.',
      ],
      example:
        'If a project realistically needs 24 months but the client demands 18, the contractor gambles — and the liquidated-damages exposure for the 6 missing months gets loaded into the price.',
    },
    {
      heading: 'Managing the risk',
      points: [
        'A certain level of risk can be eliminated by issuing tender queries and getting employer responses.',
        'For major tenders, run a risk workshop with all stakeholders; prepare a risk register and categorise by likelihood and impact.',
        'Use quantitative risk analysis (probability × impact) and allow a risk contingency budget where needed.',
        'Pre-bid agreement: ask a supplier/subcontractor for a competitive, fixed price in exchange for committing to procure from them if you win — locks the price.',
        'Joint venture / consortium: distribute risk and pool expertise where you can’t deliver alone.',
      ],
    },
  ],

  tender: [
    {
      heading: 'Adjudication — estimate → tender price',
      points: [
        'The estimate is cost only — no overhead, no profit.',
        'Adjudication is the formal commercial-judgement meeting that decides how much overhead, profit and risk allowance to apply, converting the estimate into the tender (selling) price.',
        'Overheads split two ways: site overheads (recovered in the preliminaries) and head office overheads (the support business — HR, procurement, estimating, central workshops, building rent, utilities, internet, audit fees, legal fees).',
        'How much head-office overhead a project must carry (5%, 8%, 10%, 20%…) is decided in the meeting.',
      ],
      example:
        'On a major tender the whole leadership sits in the room — MD, CEO, CFO, HSE director, commercial director, estimation manager — and jointly fix the profit and the overhead the project will bear.',
    },
    {
      heading: 'Submission & post-tender dealings',
      points: [
        'The client evaluates the technical submission first against weighted criteria (often a ~75% cut-off); only technically-qualified bids pass to commercial evaluation.',
        'Post-tender can include clarification meetings, negotiations and technical workshops, leading to a BAFO/LAFO — best / last and final offer.',
        'A “no-regret offer” is the contractor saying, in effect, “take it or leave it — this is my final price, I won’t negotiate further.”',
      ],
    },
  ],

  postcontract: [
    {
      heading: 'The one idea under everything',
      points: [
        'Beneath all the theory, effective commercial management is balancing risks and opportunities for both parties.',
        'For every risk you carry, find an opportunity to offset it — opportunities are events that minimise, eliminate or transfer the risks you identified.',
        'You administer two directions: upstream (the main contract with the client) and downstream (the supply chain / subcontractors).',
      ],
    },
  ],

  profit: [
    {
      heading: 'The risks to balance',
      points: [
        'Contractual: obligations in the conditions of contract, and contract type — lump sum carries less remeasure risk but a fixed-price lump sum allows no remeasure and no fluctuation; a normal lump sum may allow fluctuation claims.',
        'HSE: compliance, site safety, environmental concerns, accidents, regulatory compliance.',
        'Design: is it buildable, does it have integrity, is it fit for purpose?',
        'Services/utilities: availability and reliability of essential services.',
        'Authorities: approval delays — one of the most significant risks, and one contractors often fail to mitigate because authorities take their time.',
      ],
    },
    {
      heading: 'The opportunities to seize',
      points: [
        'Early completion: finish ahead of the time for completion and the preliminaries for the saved months become a saving (prelims aren’t adjusted unless specifically required).',
        'Buying gains: economies of scale — like wholesale vs retail, larger quantities attract lower rates; bulk buying earns more competitive rates.',
        'Reducing running costs: cut, eliminate or transfer unnecessary running costs.',
        'Increasing productivity: productivity loss isn’t only unskilled labour — motivation, lack of trade-specific experience, fatigue and environment all bite; deploy the right-fit, trade-specific workforce and efficient plant.',
        'Value engineering: the front end gives the client a genuine cost saving with the same functionality; the back end lets the contractor cut construction cost and reduce risk / LD exposure.',
      ],
      example:
        'Complete a 12-month job in 10 months and the prelims you would have spent in those 2 months are yours to keep — a real margin gain.',
    },
    {
      heading: 'Bulk buying — proceed with care',
      points: [
        'Bulk buying gains a good commercial rate but ties up cash, because you pay a big lump up front and distribute internally across projects.',
        'Only opt for it when: you can afford the upfront expense; multiple concurrent projects share the same specification (e.g. rebar); inventory control can track which project needs which quantity; and storage cost is low.',
      ],
      tip: 'If your SOE says you advised on bulk-buying gains, expect: “What factors did you consider before advising that?” Know the four factors and the cash-flow trade-off.',
    },
    {
      heading: 'Managing R&O — the register',
      points: [
        'Risks and opportunities are logged, categorised (design, contractual, programme, procurement, client…), with root cause, description, effect, likelihood and impact owner.',
        'Each is assessed on a three-tier probabilistic method: worst case, expected case, and (extreme) best case.',
        'The delta between opportunities and risks is carried forward into the Cost to Complete (CTC) report.',
      ],
    },
  ],

  procurement: [
    {
      heading: 'Who does what',
      points: [
        'A QS mainly handles labour and subcontract procurement; material procurement needs an engineering touch, so lean on the central procurement department — they have the supplier connections to get competitive deals.',
        'Material schedule classifies by: local vs foreign, long-lead vs short-lead, purpose-made vs standard. Always keep a tracker once material is ordered.',
        'For labour, brainstorm with the execution team first: why can’t in-house labour deliver — competence, skill, productivity, not trade-specific? Then decide general vs trade-specific subcontracting.',
      ],
    },
    {
      heading: 'How contractors really tender subcontracts',
      points: [
        'Open: contractors don’t advertise publicly like clients — they find subcontractors via the internet, databases (and, back in the day, the Yellow Pages) and send enquiries, usually with NO prequalification.',
        'Selective: subcontractors will give technical prequalification but almost never 3 years of audited financials — so contractors judge them on past dealings, testimonials, on-time delivery, workforce and quality.',
        'Negotiated: going with a single party.',
      ],
      watch:
        'A QS should not touch the technical qualification — that’s for a technically-qualified person. The QS evaluates only the commercial side.',
    },
    {
      heading: 'The word “discount” is banned in APC',
      points: [
        '“Discount” implies bombarding the counterparty for an undue advantage — treated as unethical, because pricing should be done in good faith.',
        'Use “negotiate for budget-aligned gains” instead. Negotiation is give-and-take.',
      ],
      example:
        'Ethical: “Mr Contractor, I’ll improve your payment terms from 60 to 45 days and increase your advance — can you offer a reduced price?” Unethical: simply demanding a lower price for the same scope.',
    },
  ],

  reporting: [
    {
      heading: 'What contractors report',
      points: [
        'Four documents, but Earned Value Analysis really belongs to project controls / planning — not the QS.',
        'The three core QS reports are Cash Flow, Cost Value Reconciliation (CVR) and Cost to Complete (CTC).',
        'Reporting is a decision-making tool for competent, efficient and compliant decisions focused on profitability.',
      ],
    },
    {
      heading: 'Cash flow — and the three methods',
      points: [
        'Cash in = revenue/income; cash out = cost/expenditure; the delta is profit (negative cash flow when out > in). Two types: organisational and project-specific.',
        '1) Equal apportioning: contract sum ÷ duration — basic, not a true picture; useful right after award before the programme is agreed.',
        '2) One-quarter / “thirds” method: split the duration in three — ¼ of cost in the first third, ½ in the middle, ¼ in the last — giving the classic bell / S-curve.',
        '3) Construction-programme based: the accurate method.',
      ],
      tip: 'For the programme method you need: the construction programme (a must, for work sequence) and the conditions of contract (a must, for payment timing — e.g. you bill in May but get paid 56/60 days later); the BOQ is optional but good to have for item-wise tracking.',
    },
    {
      heading: 'Negative cash flow — remedies',
      points: [
        'Prepare the cash flow from the moment the project is awarded, then keep it as a recurring event.',
        'Request an ad-hoc (on-account) payment or additional advance from the client (against an advance-payment guarantee).',
        'Negotiate extended supply-chain credit (30 → 60/90 days); reduce overheads; increase the rate of progress to earn revenue.',
        'Release retention early by submitting a retention bond; request corporate cash; and, as a last resort, short-term bank finance.',
      ],
    },
    {
      heading: 'Cost to Complete (CTC)',
      points: [
        'CTC = actual cost to date + forecast cost of the balance works.',
        'Compare it against the anticipated final account (revenue) to see profit/loss at completion, and against the original budget to analyse profitability.',
        'Actual cost comes from the ledger (finance); the forecast is by the QS / commercial manager with planning & operations support.',
      ],
      example:
        '3 months into a 12-month job: 300k incurred + 800k forecast for the balance = 1.1M total, then benchmarked against budget and revenue. It’s often presented blended with the cash flow (e.g. original margin 9.25% → revised forecast 6.42%).',
    },
    {
      heading: 'Cost Value Reconciliation (CVR)',
      points: [
        'CVR is in-period movement analysis — the profit or loss earned between the last report and this one; effectively the profit & loss account of the project, done monthly.',
        'Cost sources: ledger cost, accruals/provisions (incurred but not yet paid) and subcontractor liability. Value: interim payment application OR payment certificate.',
        'Adjustments to value: under-measure, over-measure, variations/claims in dispute (excluded), under-certifications — and material on site is taken OUT.',
      ],
      watch:
        'Why exclude material on site? It is effectively an advance payment against delivered material. Counting it as value would double-count once it converts into permanent works, projecting a false profit. Only count it when it’s built in.',
    },
  ],

  admin: [
    {
      heading: 'Upstream and downstream',
      points: [
        'Upstream = the contract with the client; downstream = the supply chain, including subcontractors.',
        'Administer interim valuations/payments, variations, and claims (notices, detailed interim/final particulars, negotiations) in both directions.',
        'Settle the final accounts — upstream and downstream.',
        'All of this falls under the commercial management competency; the deeper detail belongs to Contract Practice & Administration.',
      ],
    },
  ],
}
