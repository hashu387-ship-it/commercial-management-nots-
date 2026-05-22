/* ==========================================================================
   COMMERCIAL MANAGEMENT - INTERACTIVE STUDY GUIDE
   Red Sea Global inspired theme
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const inits = [
    initLoader, initAOS, initSidebar, initThemeToggle, initScrollEffects,
    initTabs, initApcTabs, initEvaCalculator, initCtcCalculator,
    initEmvCalculator, initCharts, initQuiz, initFlashcards, initBackToTop
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
