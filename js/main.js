/* ==========================================================================
   COMMERCIAL MANAGEMENT - INTERACTIVE STUDY GUIDE
   Red Sea Global inspired theme
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const inits = [
    initLoader, initAOS, initSidebar, initThemeToggle, initScrollEffects,
    initTabs, initApcTabs, initEvaCalculator, initCtcCalculator,
    initEmvCalculator, initCharts, initQuiz, initFlashcards, initBackToTop,
    initFitness
  ];
  inits.forEach(fn => {
    try { fn(); } catch (e) { console.warn(fn.name + ' failed:', e.message); }
  });
});

function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const el = document.getElementById('loader');
      if (el) el.classList.add('hidden');
    }, 1800);
  });
}

function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({ duration: 900, once: true, offset: 80, easing: 'ease-out-cubic' });
}

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle) menuToggle.addEventListener('click', () => sidebar.classList.add('open'));
  if (sidebarClose) sidebarClose.addEventListener('click', () => sidebar.classList.remove('open'));

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) sidebar.classList.remove('open');
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });
}

function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  const text = document.querySelector('#themeToggle span');
  if (!icon || !text) return;
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
    text.textContent = 'Light Mode';
  } else {
    icon.className = 'fas fa-moon';
    text.textContent = 'Dark Mode';
  }
}

function initScrollEffects() {
  const progressBar = document.getElementById('readingProgress');
  const completionFill = document.getElementById('completionFill');
  const completionPercent = document.getElementById('completionPercent');

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';
    if (completionFill) completionFill.style.width = scrolled + '%';
    if (completionPercent) completionPercent.textContent = Math.round(scrolled) + '%';
  });
}

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(`${tabId}-tab`);
      if (target) target.classList.add('active');
    });
  });
}

function initApcTabs() {
  document.querySelectorAll('.apc-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      const level = tab.getAttribute('data-apc');
      document.querySelectorAll('.apc-tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.apc-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(`apc-${level}`);
      if (target) target.classList.add('active');
    });
  });
}

/* EVA CALCULATOR */
function initEvaCalculator() {
  ['ev', 'ac', 'pv', 'bac'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculateEVA);
  });
  calculateEVA();
}

function calculateEVA() {
  const ev = parseFloat(document.getElementById('ev')?.value) || 0;
  const ac = parseFloat(document.getElementById('ac')?.value) || 0;
  const pv = parseFloat(document.getElementById('pv')?.value) || 0;
  const bac = parseFloat(document.getElementById('bac')?.value) || 0;

  const cpi = ac > 0 ? (ev / ac).toFixed(2) : 0;
  const spi = pv > 0 ? (ev / pv).toFixed(2) : 0;
  const eac = cpi > 0 ? (bac / cpi).toFixed(0) : 0;
  const sv = ev - pv;
  const cv = ev - ac;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set('cpiValue', cpi);
  set('spiValue', spi);
  set('eacValue', parseFloat(eac).toLocaleString());
  set('svcvValue', `${(sv/1000).toFixed(0)}K / ${(cv >= 0 ? '+' : '')}${(cv/1000).toFixed(0)}K`);

  set('cpiStatus', cpi >= 1 ? '✓ Cost Efficient' : '✗ Over Budget');
  set('spiStatus', spi >= 1 ? '✓ On/Ahead Schedule' : '✗ Behind Schedule');
  set('eacStatus', eac <= bac ? '✓ Under Budget' : '✗ Will Exceed');
}

/* CTC CALCULATOR */
function initCtcCalculator() {
  ['ctc-x', 'ctc-y'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculateCTC);
  });
  calculateCTC();
}

function calculateCTC() {
  const x = parseFloat(document.getElementById('ctc-x')?.value) || 0;
  const y = parseFloat(document.getElementById('ctc-y')?.value) || 0;
  const z = x - y;
  const pct = x > 0 ? ((y / x) * 100).toFixed(1) : 0;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set('ctc-z', z.toLocaleString());
  set('ctc-percent', pct + '%');
  set('ctc-remaining', z.toLocaleString());
  set('ctc-status', z > 0 ? '✓ Healthy' : '✗ Over-incurred');
}

/* EMV CALCULATOR */
function initEmvCalculator() {
  document.querySelectorAll('.emv-prob, .emv-impact').forEach(input => {
    input.addEventListener('input', calculateEMV);
  });
  calculateEMV();
}

function calculateEMV() {
  const probs = document.querySelectorAll('.emv-prob');
  const impacts = document.querySelectorAll('.emv-impact');
  let total = 0;
  for (let i = 0; i < probs.length; i++) {
    const p = parseFloat(probs[i].value) || 0;
    const imp = parseFloat(impacts[i].value) || 0;
    const emv = (p / 100) * imp;
    const el = document.getElementById(`emv-${i}`);
    if (el) el.textContent = emv.toLocaleString() + ' OMR';
    total += emv;
  }
  const totalEl = document.getElementById('emv-total');
  if (totalEl) totalEl.textContent = total.toLocaleString() + ' OMR';
}

/* CHARTS */
function initCharts() {
  if (typeof Chart === 'undefined') {
    document.querySelectorAll('canvas').forEach(c => {
      const wrapper = c.closest('.chart-container-wrapper');
      if (wrapper) wrapper.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem;"><i class="fas fa-chart-bar"></i> Chart library unavailable</p>';
    });
    return;
  }

  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = '#5a6373';

  const rsgColors = ['#0d4f5c', '#14919b', '#c9985f', '#e85a4f', '#ff7e5f', '#16a085'];

  // Tools Chart
  const toolsCtx = document.getElementById('toolsChart');
  if (toolsCtx) new Chart(toolsCtx, {
    type: 'doughnut',
    data: {
      labels: ['CVR', 'CTC', 'EVM', 'Cost Report', 'Cash Flow Forecast'],
      datasets: [{ data: [28, 22, 20, 17, 13], backgroundColor: rsgColors, borderWidth: 3, borderColor: '#fdfbf7' }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { padding: 15, font: { size: 11 } } },
        title: { display: true, text: 'Commercial Management Tools', font: { size: 14, weight: 'bold' } }
      }
    }
  });

  // CVR Chart
  const cvrCtx = document.getElementById('cvrChart');
  if (cvrCtx) new Chart(cvrCtx, {
    type: 'bar',
    data: {
      labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
      datasets: [
        { label: 'Earned Value (Revenue)', data: [120000, 280000, 450000, 620000, 800000, 980000], backgroundColor: 'rgba(20,145,155,0.75)', borderColor: '#14919b', borderWidth: 2 },
        { label: 'Actual Cost', data: [100000, 250000, 420000, 580000, 720000, 870000], backgroundColor: 'rgba(232,90,79,0.75)', borderColor: '#e85a4f', borderWidth: 2 },
        { label: 'Margin', data: [20000, 30000, 30000, 40000, 80000, 110000], backgroundColor: 'rgba(201,152,95,0.75)', borderColor: '#c9985f', borderWidth: 3, type: 'line', tension: 0.4, fill: false }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { title: { display: true, text: 'CVR: Value vs Cost vs Margin', font: { size: 14, weight: 'bold' } }, legend: { position: 'bottom' } },
      scales: { y: { beginAtZero: true, ticks: { callback: v => 'OMR ' + (v/1000) + 'k' } } }
    }
  });

  // Cashflow Chart - S-Curve
  const cfCtx = document.getElementById('cashflowChart');
  if (cfCtx) new Chart(cfCtx, {
    type: 'line',
    data: {
      labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
      datasets: [
        { label: 'Cumulative Inflow (Client)', data: [50000, 130000, 230000, 360000, 500000, 650000, 790000, 900000, 980000, 1040000, 1080000, 1100000], borderColor: '#16a085', backgroundColor: 'rgba(22,160,133,0.15)', tension: 0.4, fill: true, borderWidth: 3 },
        { label: 'Cumulative Outflow (Costs)', data: [80000, 180000, 310000, 460000, 620000, 770000, 900000, 990000, 1050000, 1090000, 1110000, 1120000], borderColor: '#e85a4f', backgroundColor: 'rgba(232,90,79,0.15)', tension: 0.4, fill: true, borderWidth: 3 },
        { label: 'Net Cash Position', data: [-30000, -50000, -80000, -100000, -120000, -120000, -110000, -90000, -70000, -50000, -30000, -20000], borderColor: '#c9985f', tension: 0.4, fill: false, borderWidth: 3, borderDash: [6,4] }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { title: { display: true, text: 'S-Curve: Annual Project Cash Flow', font: { size: 14, weight: 'bold' } }, legend: { position: 'bottom' } },
      scales: { y: { ticks: { callback: v => 'OMR ' + (v/1000) + 'k' } } }
    }
  });

  // Risk Categories Radar
  const riskCtx = document.getElementById('riskCategoriesChart');
  if (riskCtx) new Chart(riskCtx, {
    type: 'radar',
    data: {
      labels: ['Design', 'Procurement', 'Execution', 'Contractual', 'Financial', 'Environmental'],
      datasets: [
        { label: 'Probability (%)', data: [30, 25, 35, 20, 20, 15], borderColor: '#e85a4f', backgroundColor: 'rgba(232,90,79,0.2)', borderWidth: 2, pointBackgroundColor: '#e85a4f' },
        { label: 'Impact Level', data: [40, 35, 30, 45, 50, 35], borderColor: '#14919b', backgroundColor: 'rgba(20,145,155,0.2)', borderWidth: 2, pointBackgroundColor: '#14919b' }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { title: { display: true, text: 'Risk: Probability vs Impact', font: { size: 14, weight: 'bold' } }, legend: { position: 'bottom' } },
      scales: { r: { beginAtZero: true, max: 60 } }
    }
  });
}

/* QUIZ - 20 Questions covering both PDFs */
const quizQuestions = [
  { q: "What does commercial management primarily identify and develop?", options: ["Cost and time only", "Risk and business opportunities", "Drawings and specifications", "Material quantities"], correct: 1 },
  { q: "When does commercial management start?", options: ["At project handover", "At the time of collecting the tender", "After contract signing", "At final account"], correct: 1 },
  { q: "What does CVR stand for?", options: ["Cost Variance Report", "Cost Value Reconciliation", "Contract Value Review", "Capital Value Return"], correct: 1 },
  { q: "Which APC Level expects advising senior management on strategic matters?", options: ["Level 1", "Level 2", "Level 3", "Level 4"], correct: 2 },
  { q: "CPI formula is:", options: ["EV / PV", "AC / EV", "EV / AC", "PV / AC"], correct: 2 },
  { q: "If CPI > 1, the project is:", options: ["Behind schedule", "Cost efficient (profit)", "Over budget", "Cancelled"], correct: 1 },
  { q: "Which estimation method is regarded as the most accurate?", options: ["Unit Method", "Superficial Method", "Approximate Quantities", "Comparative Cost Plan"], correct: 2 },
  { q: "EMV = ?", options: ["Cost ÷ Probability", "Probability × Impact", "Impact ÷ Time", "Cost + Risk"], correct: 1 },
  { q: "Front-loaded BOQ means:", options: ["Higher costs at end", "Higher costs in early stages", "Same throughout", "Spot pricing each month"], correct: 1 },
  { q: "Which FIDIC clause covers Variation?", options: ["13.1", "8.4", "14", "4.10"], correct: 0 },
  { q: "CTC formula is:", options: ["Y = Z + X", "Z = X − Y (Planned − Incurred)", "Z = X + Y", "Z = Y / X"], correct: 1 },
  { q: "What does MOS stand for in CVR context?", options: ["Method of Statement", "Material on Site", "Mode of Service", "Margin on Sale"], correct: 1 },
  { q: "Over-measure means:", options: ["Work completed but not claimed", "Trying to claim before eligibility", "Excess materials delivered", "Cost overrun"], correct: 1 },
  { q: "A nominated subcontractor is:", options: ["Chosen by the contractor only", "Single specialist nominated by the Employer", "Any qualified bidder", "Self-nominated"], correct: 1 },
  { q: "First step in dispute resolution should be:", options: ["Litigation", "Arbitration", "Negotiation", "Adjudication"], correct: 2 },
  { q: "Which is a core RICS ethical standard (2021)?", options: ["Maximize profit at all costs", "Act with integrity", "Conceal errors", "Avoid documentation"], correct: 1 },
  { q: "Why might a project have negative cash flow early?", options: ["Outgoing exceeds incoming", "Too much profit booked", "Client overpays", "Bank gives free credit"], correct: 0 },
  { q: "An S-curve in cash flow represents:", options: ["Daily spending", "Cumulative cash position over time", "Liquidated damages", "Profit margin"], correct: 1 },
  { q: "Value Engineering aims to:", options: ["Increase costs", "Deliver equivalent performance at lower cost", "Delay procurement", "Inflate claims"], correct: 1 },
  { q: "Tender adjudication meeting discusses:", options: ["Only the OH", "How cost was established, risks, cash flow, profit, opportunities", "Only profit margin", "Site safety only"], correct: 1 }
];

let currentQ = 0;
let userAnswers = [];

function initQuiz() {
  const qTotal = document.getElementById('qTotal');
  const finalTotal = document.getElementById('finalTotal');
  if (qTotal) qTotal.textContent = quizQuestions.length;
  if (finalTotal) finalTotal.textContent = quizQuestions.length;
  renderQuestion();

  const nextBtn = document.getElementById('nextQ');
  const prevBtn = document.getElementById('prevQ');
  if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
  if (prevBtn) prevBtn.addEventListener('click', prevQuestion);
}

function renderQuestion() {
  const q = quizQuestions[currentQ];
  if (!q) return;
  const qText = document.getElementById('quizQuestion');
  const qCurrent = document.getElementById('qCurrent');
  if (qText) qText.textContent = q.q;
  if (qCurrent) qCurrent.textContent = currentQ + 1;

  const progress = ((currentQ + 1) / quizQuestions.length) * 100;
  const progFill = document.getElementById('quizProgressFill');
  if (progFill) progFill.style.width = progress + '%';

  const optionsContainer = document.getElementById('quizOptions');
  if (!optionsContainer) return;
  optionsContainer.innerHTML = '';

  const letters = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, idx) => {
    const div = document.createElement('div');
    div.className = 'quiz-option';
    if (userAnswers[currentQ] === idx) div.classList.add('selected');
    div.innerHTML = `<span class="quiz-option-letter">${letters[idx]}</span><span>${opt}</span>`;
    div.addEventListener('click', () => selectAnswer(idx));
    optionsContainer.appendChild(div);
  });

  const prevBtn = document.getElementById('prevQ');
  if (prevBtn) prevBtn.disabled = currentQ === 0;
  const nextBtn = document.getElementById('nextQ');
  if (nextBtn) nextBtn.innerHTML = currentQ === quizQuestions.length - 1
    ? 'Submit <i class="fas fa-check"></i>'
    : 'Next <i class="fas fa-arrow-right"></i>';
}

function selectAnswer(idx) {
  if (userAnswers[currentQ] !== undefined) return; // already answered
  userAnswers[currentQ] = idx;
  const correct = quizQuestions[currentQ].correct;
  const opts = document.querySelectorAll('.quiz-option');
  opts.forEach((o, i) => {
    if (i === correct) o.classList.add('correct');
    if (i === idx && idx !== correct) o.classList.add('wrong');
  });
  // Game integration
  try {
    if (idx === correct) {
      if (typeof quizAnswerCorrect === 'function') quizAnswerCorrect();
    } else {
      if (typeof quizAnswerWrong === 'function') quizAnswerWrong();
    }
  } catch (e) {}
}

function nextQuestion() {
  if (currentQ < quizQuestions.length - 1) {
    currentQ++;
    renderQuestion();
  } else submitQuiz();
}

function prevQuestion() {
  if (currentQ > 0) {
    currentQ--;
    renderQuestion();
  }
}

function submitQuiz() {
  let score = 0;
  userAnswers.forEach((ans, idx) => {
    if (ans === quizQuestions[idx].correct) score++;
  });
  try { if (typeof quizComplete === 'function') quizComplete(score, quizQuestions.length); } catch (e) {}

  document.getElementById('quizCard').style.display = 'none';
  document.querySelector('.quiz-nav').style.display = 'none';
  document.querySelector('.quiz-progress').style.display = 'none';
  document.getElementById('quizResults').style.display = 'block';

  document.getElementById('finalScore').textContent = score;
  const percent = (score / quizQuestions.length) * 100;
  const label = document.getElementById('scoreLabel');
  if (label) {
    if (percent >= 80) label.innerHTML = '🏆 Excellent! You\'re APC-ready!';
    else if (percent >= 60) label.innerHTML = '👏 Good progress, review key topics!';
    else if (percent >= 40) label.innerHTML = '📖 Keep studying - getting there!';
    else label.innerHTML = '📚 Time to review the material!';
  }
}

function restartQuiz() {
  currentQ = 0;
  userAnswers = [];
  document.getElementById('quizCard').style.display = 'block';
  document.querySelector('.quiz-nav').style.display = 'flex';
  document.querySelector('.quiz-progress').style.display = 'block';
  document.getElementById('quizResults').style.display = 'none';
  renderQuestion();
}

/* FLASHCARDS - 16 cards */
const flashcards = [
  { term: 'CVR', def: 'Cost Value Reconciliation — Compares earned value to cost incurred' },
  { term: 'CTC', def: 'Cost to Complete — Z = X − Y (Planned − Incurred). Forecasts final cost.' },
  { term: 'EVM', def: 'Earned Value Method — compares actual work with original budget & schedule' },
  { term: 'CPI', def: 'Cost Performance Index = EV / AC. > 1 = profit/efficient' },
  { term: 'SPI', def: 'Schedule Performance Index = EV / PV. > 1 = ahead of schedule' },
  { term: 'EAC', def: 'Estimate at Completion = BAC / CPI. Total cost at project end' },
  { term: 'EMV', def: 'Expected Monetary Value = Probability × Impact. Quantifies risk' },
  { term: 'BOQ', def: 'Bill of Quantities — measured quantities used for pricing' },
  { term: 'FIDIC', def: 'International Federation of Consulting Engineers — standard contracts' },
  { term: 'NRM', def: 'New Rules of Measurement (NRM1, NRM2) — RICS measurement standards' },
  { term: 'RICS', def: 'Royal Institution of Chartered Surveyors — global professional body' },
  { term: 'DAB', def: 'Dispute Adjudication Board — interim dispute decisions' },
  { term: 'MOS', def: 'Material on Site — received but no contract provision yet' },
  { term: 'IPC', def: 'Interim Payment Certificate — periodic payment for completed work' },
  { term: 'VE', def: 'Value Engineering — alternative materials/methods at lower cost' },
  { term: 'OH', def: 'Overhead — indirect costs (office, admin, head office staff)' }
];

let currentFc = 0;

function initFlashcards() {
  const total = document.getElementById('fcTotal');
  if (total) total.textContent = flashcards.length;
  renderFlashcard();

  const nextFc = document.getElementById('nextFc');
  const prevFc = document.getElementById('prevFc');
  const flashcard = document.getElementById('flashcard');

  if (nextFc) nextFc.addEventListener('click', () => {
    currentFc = (currentFc + 1) % flashcards.length;
    renderFlashcard();
  });

  if (prevFc) prevFc.addEventListener('click', () => {
    currentFc = (currentFc - 1 + flashcards.length) % flashcards.length;
    renderFlashcard();
  });

  if (flashcard) flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
  });

  document.querySelectorAll('.fc-mini').forEach(mini => {
    mini.addEventListener('click', () => {
      currentFc = parseInt(mini.getAttribute('data-fc'));
      renderFlashcard();
      const fc = document.getElementById('flashcard');
      if (fc) fc.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}

function renderFlashcard() {
  const fc = flashcards[currentFc];
  if (!fc) return;
  const term = document.getElementById('fcTerm');
  const def = document.getElementById('fcDefinition');
  const current = document.getElementById('fcCurrent');
  const card = document.getElementById('flashcard');

  if (term) term.textContent = fc.term;
  if (def) def.textContent = fc.def;
  if (current) current.textContent = currentFc + 1;
  if (card) card.classList.remove('flipped');

  document.querySelectorAll('.fc-mini').forEach((m, idx) => {
    m.classList.toggle('active', idx === currentFc);
  });

  try { if (typeof trackFlashcardView === 'function') trackFlashcardView(currentFc); } catch (e) {}
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.calculateEVA = calculateEVA;
window.calculateCTC = calculateCTC;
window.restartQuiz = restartQuiz;

/* ==========================================================================
   FITNESS PLAN (BONUS) — calculator, projection chart, weight log,
   day tabs, exercise checks, animated form-card flips
   ========================================================================== */

let fitChart = null;
const FIT_GOAL = 78;                 // target weight (kg)
const FIT_TARGET_DATE = new Date(2026, 7, 31); // 31 Aug 2026 (month is 0-indexed)

function initFitness() {
  if (!document.getElementById('fitness')) return;

  // live calculator
  ['fitWeight', 'fitHeight', 'fitAge', 'fitSex', 'fitActivity', 'fitPace'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', recalcFitness);
      el.addEventListener('change', recalcFitness);
    }
  });

  initFitCountdown();
  initFitDayTabs();
  initFitChecks();
  initFitDemos();
  initFitLog();
  recalcFitness();   // also draws/refreshes the chart
}

/* ---- Countdown to target date ---- */
function initFitCountdown() {
  const el = document.getElementById('fitCountdown');
  if (!el) return;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const days = Math.max(0, Math.round((FIT_TARGET_DATE - today) / 86400000));
  el.textContent = days;
}

/* ---- Core calculations (Mifflin–St Jeor) ---- */
function recalcFitness() {
  const w = parseFloat(val('fitWeight')) || 98;
  const h = parseFloat(val('fitHeight')) || 165;
  const age = parseFloat(val('fitAge')) || 32;
  const sex = val('fitSex') || 'male';
  const act = parseFloat(val('fitActivity')) || 1.55;
  const pace = parseFloat(val('fitPace')) || 1.0;

  const bmr = 10 * w + 6.25 * h - 5 * age + (sex === 'male' ? 5 : -161);
  const tdee = bmr * act;
  const deficit = pace * 7700 / 7;
  const floor = sex === 'male' ? 1500 : 1200;
  let target = Math.max(floor, tdee - deficit);
  target = Math.round(target / 10) * 10;

  // macros
  const protein = Math.round(1.8 * w);
  const fat = Math.round(0.6 * w);
  const carbs = Math.max(50, Math.round((target - (protein * 4 + fat * 9)) / 4));

  // BMI
  const bmi = w / Math.pow(h / 100, 2);
  const cat = bmiCategory(bmi);

  setText('fitBMR', Math.round(bmr).toLocaleString());
  setText('fitTDEE', Math.round(tdee).toLocaleString());
  setText('fitTarget', target.toLocaleString());
  setText('fitBMI', bmi.toFixed(1));
  setText('fitBMICat', cat);
  setText('fitProtein', protein);
  setText('fitCarbs', carbs);
  setText('fitFat', fat);

  // snapshot cards + hero orb
  setText('snapCals', target.toLocaleString());
  setText('snapProtein', '~' + protein + 'g');
  setText('snapBmi', bmi.toFixed(1));
  setText('snapToLose', Math.max(0, (w - FIT_GOAL)).toFixed(0));
  setText('fitOrbNow', Math.round(w));

  // ETA to goal at chosen pace
  const toLose = w - FIT_GOAL;
  const etaEl = document.getElementById('fitEta');
  if (etaEl) {
    if (toLose <= 0) {
      etaEl.innerHTML = "You're at or below your <strong>78 kg</strong> goal — switch to a maintenance plan. 🎉";
    } else {
      const weeks = Math.ceil(toLose / pace);
      const etaDate = new Date(); etaDate.setDate(etaDate.getDate() + weeks * 7);
      etaEl.innerHTML = `At ${pace} kg/week you reach <strong>78 kg</strong> in about <strong>${weeks} weeks</strong> (~${etaDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}).`;
    }
  }

  drawFitChart(w, pace);
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy';
  if (bmi < 30) return 'Overweight';
  if (bmi < 35) return 'Obese (I)';
  if (bmi < 40) return 'Obese (II)';
  return 'Obese (III)';
}

/* ---- Projection chart ---- */
function drawFitChart(currentW, pace) {
  const ctx = document.getElementById('fitProjectionChart');
  if (!ctx || typeof Chart === 'undefined') return;

  const numWeeks = 26;
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const labels = [];
  const planData = [];
  const stretchData = [];
  const goalData = [];

  // index (in weeks) of the Aug-2026 target date
  const stretchIdx = Math.max(1, Math.round((FIT_TARGET_DATE - start) / (86400000 * 7)));

  for (let i = 0; i <= numWeeks; i++) {
    const d = new Date(start); d.setDate(d.getDate() + i * 7);
    labels.push(d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }));
    planData.push(Math.max(FIT_GOAL, +(currentW - pace * i).toFixed(1)));
    stretchData.push(i <= stretchIdx
      ? +(currentW - (currentW - FIT_GOAL) * (i / stretchIdx)).toFixed(1)
      : FIT_GOAL);
    goalData.push(FIT_GOAL);
  }

  // user's logged weigh-ins mapped onto the weekly grid
  const log = getFitLog();
  const logData = new Array(numWeeks + 1).fill(null);
  log.forEach(e => {
    const d = new Date(e.date); d.setHours(0, 0, 0, 0);
    const idx = Math.round((d - start) / (86400000 * 7));
    if (idx >= 0 && idx <= numWeeks) logData[idx] = e.kg;
  });

  const datasets = [
    { label: 'Your plan (' + pace + ' kg/wk)', data: planData, borderColor: '#14919b', backgroundColor: 'rgba(20,145,155,0.12)', tension: 0.3, fill: true, borderWidth: 3, pointRadius: 0 },
    { label: 'Stretch (78 by Aug)', data: stretchData, borderColor: '#e85a4f', borderDash: [6, 4], tension: 0.2, fill: false, borderWidth: 2, pointRadius: 0 },
    { label: 'Goal 78 kg', data: goalData, borderColor: '#c9985f', borderDash: [2, 3], fill: false, borderWidth: 1.5, pointRadius: 0 },
    { label: 'Your log', data: logData, borderColor: '#16a085', backgroundColor: '#16a085', tension: 0.2, fill: false, borderWidth: 3, pointRadius: 5, pointHoverRadius: 7, spanGaps: true }
  ];

  if (fitChart) {
    fitChart.data.labels = labels;
    fitChart.data.datasets = datasets;
    fitChart.update();
    return;
  }

  fitChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
        title: { display: true, text: 'Projected vs actual weight (kg)', font: { size: 13, weight: 'bold' } }
      },
      scales: {
        y: { ticks: { callback: v => v + ' kg' }, suggestedMin: FIT_GOAL - 4 },
        x: { ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 9 } }
      }
    }
  });
}

/* ---- Weight log (localStorage) ---- */
function getFitLog() {
  try { return JSON.parse(localStorage.getItem('fitWeightLog') || '[]'); }
  catch (e) { return []; }
}
function saveFitLog(log) {
  try { localStorage.setItem('fitWeightLog', JSON.stringify(log)); } catch (e) {}
}
function initFitLog() {
  const btn = document.getElementById('fitLogBtn');
  const dateEl = document.getElementById('fitLogDate');
  if (dateEl && !dateEl.value) dateEl.value = new Date().toISOString().slice(0, 10);
  if (btn) btn.addEventListener('click', addFitLog);
  renderFitLog();
}
function addFitLog() {
  const dateEl = document.getElementById('fitLogDate');
  const kgEl = document.getElementById('fitLogWeight');
  const date = dateEl && dateEl.value ? dateEl.value : new Date().toISOString().slice(0, 10);
  const kg = parseFloat(kgEl && kgEl.value);
  if (!kg || kg < 30 || kg > 300) { if (kgEl) { kgEl.focus(); kgEl.style.borderColor = '#e85a4f'; } return; }
  if (kgEl) kgEl.style.borderColor = '';

  const log = getFitLog().filter(e => e.date !== date);
  log.push({ date, kg });
  log.sort((a, b) => a.date.localeCompare(b.date));
  saveFitLog(log);
  if (kgEl) kgEl.value = '';
  renderFitLog();
  recalcFitness();

  try { if (typeof awardXp === 'function') awardXp(15); } catch (e) {}
  try { if (typeof triggerConfetti === 'function') triggerConfetti(40); } catch (e) {}
}
function deleteFitLog(date) {
  saveFitLog(getFitLog().filter(e => e.date !== date));
  renderFitLog();
  recalcFitness();
}
function renderFitLog() {
  const ul = document.getElementById('fitLogList');
  if (!ul) return;
  const log = getFitLog();
  if (!log.length) {
    ul.innerHTML = '<li class="fit-log-empty">No weigh-ins yet. Log your first one above!</li>';
    return;
  }
  ul.innerHTML = '';
  log.slice().reverse().forEach((e, i, arr) => {
    const prev = arr[i + 1];
    let trend = '';
    if (prev) {
      const diff = +(e.kg - prev.kg).toFixed(1);
      const color = diff < 0 ? '#16a085' : (diff > 0 ? '#e85a4f' : 'var(--text-muted)');
      const sign = diff > 0 ? '+' : '';
      trend = ` <small style="color:${color};">(${sign}${diff})</small>`;
    }
    const d = new Date(e.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
    const li = document.createElement('li');
    li.innerHTML = `<span class="fit-log-date">${d}</span>` +
                   `<span><span class="fit-log-kg">${e.kg} kg</span>${trend} ` +
                   `<button class="fit-log-del" data-date="${e.date}" aria-label="Delete entry"><i class="fas fa-trash"></i></button></span>`;
    ul.appendChild(li);
  });
  ul.querySelectorAll('.fit-log-del').forEach(b => {
    b.addEventListener('click', () => deleteFitLog(b.getAttribute('data-date')));
  });
}

/* ---- Day tabs ---- */
function initFitDayTabs() {
  document.querySelectorAll('.fit-day-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const day = tab.getAttribute('data-day');
      document.querySelectorAll('.fit-day-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.fit-day-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector('.fit-day-panel[data-day="' + day + '"]');
      if (panel) panel.classList.add('active');
    });
  });
}

/* ---- Exercise checkboxes + per-day progress ---- */
function getFitDone() {
  try { return JSON.parse(localStorage.getItem('fitExDone') || '{}'); }
  catch (e) { return {}; }
}
function initFitChecks() {
  const done = getFitDone();
  document.querySelectorAll('.fit-check').forEach(item => {
    const ex = item.getAttribute('data-ex');
    if (done[ex]) markCheck(item, true);
    item.addEventListener('click', () => {
      const isDone = !item.classList.contains('done');
      markCheck(item, isDone);
      const map = getFitDone();
      if (isDone) map[ex] = true; else delete map[ex];
      try { localStorage.setItem('fitExDone', JSON.stringify(map)); } catch (e) {}
      updateDayProgress(item.closest('.fit-day-panel'));
    });
  });
  document.querySelectorAll('.fit-day-panel').forEach(updateDayProgress);
}
function markCheck(item, isDone) {
  item.classList.toggle('done', isDone);
  const icon = item.querySelector('i');
  if (icon) icon.className = isDone ? 'fas fa-circle-check' : 'far fa-circle';
}
function updateDayProgress(panel) {
  if (!panel) return;
  const items = panel.querySelectorAll('.fit-check');
  const done = panel.querySelectorAll('.fit-check.done').length;
  const pct = items.length ? Math.round(done / items.length * 100) : 0;
  const fill = panel.querySelector('.fit-progress-fill');
  const txt = panel.querySelector('.fit-progress-txt');
  if (fill) fill.style.width = pct + '%';
  if (txt) txt.textContent = pct + '% complete';
}

/* ---- Animated demo card flips ---- */
function initFitDemos() {
  document.querySelectorAll('.fit-demo').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
    });
  });
}

/* ---- tiny helpers ---- */
function val(id) { const el = document.getElementById(id); return el ? el.value : ''; }
function setText(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }
