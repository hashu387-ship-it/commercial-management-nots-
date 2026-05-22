/* ==========================================================================
   COMMERCIAL MANAGEMENT IN CONSTRUCTION - INTERACTIVE STUDY GUIDE
   Main JavaScript File
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const inits = [
    initLoader, initAOS, initSidebar, initThemeToggle, initScrollEffects,
    initTabs, initApcTabs, initEvaCalculator, initEmvCalculator,
    initCharts, initQuiz, initFlashcards, initBackToTop
  ];
  inits.forEach(fn => {
    try { fn(); } catch (e) { console.warn(fn.name + ' failed:', e.message); }
  });
});

/* ==========================================================================
   LOADER
   ========================================================================== */
function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 1500);
  });
}

/* ==========================================================================
   AOS (Animate On Scroll)
   ========================================================================== */
function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({ duration: 800, once: true, offset: 100 });
}

/* ==========================================================================
   SIDEBAR
   ========================================================================== */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => sidebar.classList.add('open'));
  sidebarClose.addEventListener('click', () => sidebar.classList.remove('open'));

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
      }
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Update active link based on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  const text = document.querySelector('#themeToggle span');
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
    text.textContent = 'Light Mode';
  } else {
    icon.className = 'fas fa-moon';
    text.textContent = 'Dark Mode';
  }
}

/* ==========================================================================
   SCROLL EFFECTS
   ========================================================================== */
function initScrollEffects() {
  const progressBar = document.getElementById('readingProgress');
  const completionFill = document.getElementById('completionFill');
  const completionPercent = document.getElementById('completionPercent');

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
    completionFill.style.width = scrolled + '%';
    completionPercent.textContent = Math.round(scrolled) + '%';
  });
}

/* ==========================================================================
   TABS
   ========================================================================== */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
}

function initApcTabs() {
  const tabs = document.querySelectorAll('.apc-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const level = tab.getAttribute('data-apc');
      document.querySelectorAll('.apc-tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.apc-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`apc-${level}`).classList.add('active');
    });
  });
}

/* ==========================================================================
   EVA CALCULATOR
   ========================================================================== */
function initEvaCalculator() {
  ['ev', 'ac', 'pv', 'bac'].forEach(id => {
    document.getElementById(id).addEventListener('input', calculateEVA);
  });
  calculateEVA();
}

function calculateEVA() {
  const ev = parseFloat(document.getElementById('ev').value) || 0;
  const ac = parseFloat(document.getElementById('ac').value) || 0;
  const pv = parseFloat(document.getElementById('pv').value) || 0;
  const bac = parseFloat(document.getElementById('bac').value) || 0;

  const cpi = ac > 0 ? (ev / ac).toFixed(2) : 0;
  const spi = pv > 0 ? (ev / pv).toFixed(2) : 0;
  const eac = cpi > 0 ? (bac / cpi).toFixed(0) : 0;

  document.getElementById('cpiValue').textContent = cpi;
  document.getElementById('spiValue').textContent = spi;
  document.getElementById('eacValue').textContent = parseFloat(eac).toLocaleString();

  document.getElementById('cpiStatus').textContent = cpi >= 1 ? '✓ Cost Efficient' : '✗ Over Budget';
  document.getElementById('spiStatus').textContent = spi >= 1 ? '✓ On/Ahead Schedule' : '✗ Behind Schedule';
  document.getElementById('eacStatus').textContent = eac <= bac ? '✓ Under Budget' : '✗ Will Exceed Budget';
}

/* ==========================================================================
   EMV CALCULATOR
   ========================================================================== */
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
    document.getElementById(`emv-${i}`).textContent = emv.toLocaleString() + ' OMR';
    total += emv;
  }
  document.getElementById('emv-total').textContent = total.toLocaleString() + ' OMR';
}

/* ==========================================================================
   CHARTS
   ========================================================================== */
function initCharts() {
  if (typeof Chart === 'undefined') {
    document.querySelectorAll('canvas').forEach(c => {
      const wrapper = c.closest('.chart-container-wrapper');
      if (wrapper) wrapper.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem;"><i class="fas fa-chart-bar"></i> Chart library unavailable</p>';
    });
    return;
  }
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-light').trim();

  // Tools Chart
  const toolsCtx = document.getElementById('toolsChart');
  if (toolsCtx) {
    new Chart(toolsCtx, {
      type: 'doughnut',
      data: {
        labels: ['CVR', 'CTC', 'EVA', 'Cashflow Forecast', 'Risk Registers', 'Procurement Schedules'],
        datasets: [{
          data: [25, 20, 18, 15, 12, 10],
          backgroundColor: [
            '#1e3a8a', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 15, font: { size: 11 } }
          },
          title: {
            display: true,
            text: 'Commercial Management Tools',
            font: { size: 14, weight: 'bold' }
          }
        }
      }
    });
  }

  // Estimating Chart
  const estCtx = document.getElementById('estimatingChart');
  if (estCtx) {
    new Chart(estCtx, {
      type: 'polarArea',
      data: {
        labels: ['First-Principles', 'Operational', 'Quotation-Based', 'Benchmarking'],
        datasets: [{
          data: [35, 25, 25, 15],
          backgroundColor: [
            'rgba(30,58,138,0.7)',
            'rgba(59,130,246,0.7)',
            'rgba(6,182,212,0.7)',
            'rgba(245,158,11,0.7)'
          ],
          borderColor: ['#1e3a8a', '#3b82f6', '#06b6d4', '#f59e0b'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          title: {
            display: true,
            text: 'Estimating Methods Usage',
            font: { size: 14, weight: 'bold' }
          }
        }
      }
    });
  }

  // CVR Chart
  const cvrCtx = document.getElementById('cvrChart');
  if (cvrCtx) {
    new Chart(cvrCtx, {
      type: 'bar',
      data: {
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
        datasets: [
          {
            label: 'Earned Value (Revenue)',
            data: [120000, 280000, 450000, 620000, 800000, 980000],
            backgroundColor: 'rgba(59,130,246,0.7)',
            borderColor: '#3b82f6',
            borderWidth: 2
          },
          {
            label: 'Actual Cost',
            data: [100000, 250000, 420000, 580000, 720000, 870000],
            backgroundColor: 'rgba(16,185,129,0.7)',
            borderColor: '#10b981',
            borderWidth: 2
          },
          {
            label: 'Margin',
            data: [20000, 30000, 30000, 40000, 80000, 110000],
            backgroundColor: 'rgba(245,158,11,0.7)',
            borderColor: '#f59e0b',
            borderWidth: 2,
            type: 'line',
            tension: 0.4,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'CVR: Value vs Cost vs Margin Trend',
            font: { size: 14, weight: 'bold' }
          },
          legend: { position: 'bottom' }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => 'OMR ' + (value/1000) + 'k'
            }
          }
        }
      }
    });
  }

  // Cashflow Chart
  const cfCtx = document.getElementById('cashflowChart');
  if (cfCtx) {
    new Chart(cfCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Cash Inflow (Client Payments)',
            data: [50000, 120000, 200000, 280000, 350000, 420000, 500000, 580000, 650000, 700000, 750000, 800000],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16,185,129,0.1)',
            tension: 0.4,
            fill: true,
            borderWidth: 3
          },
          {
            label: 'Cash Outflow (Costs)',
            data: [80000, 180000, 240000, 320000, 380000, 440000, 510000, 580000, 640000, 690000, 730000, 770000],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.1)',
            tension: 0.4,
            fill: true,
            borderWidth: 3
          },
          {
            label: 'Net Position',
            data: [-30000, -60000, -40000, -40000, -30000, -20000, -10000, 0, 10000, 10000, 20000, 30000],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245,158,11,0.2)',
            tension: 0.4,
            fill: false,
            borderWidth: 3,
            borderDash: [5,5]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Annual Cashflow Forecast',
            font: { size: 14, weight: 'bold' }
          },
          legend: { position: 'bottom' }
        },
        scales: {
          y: {
            ticks: {
              callback: value => 'OMR ' + (value/1000) + 'k'
            }
          }
        }
      }
    });
  }

  // Risk Categories Chart
  const riskCtx = document.getElementById('riskCategoriesChart');
  if (riskCtx) {
    new Chart(riskCtx, {
      type: 'radar',
      data: {
        labels: ['Design Risk', 'Procurement Risk', 'Execution Risk', 'Contractual Risk', 'Financial Risk', 'Environmental Risk'],
        datasets: [
          {
            label: 'Probability (%)',
            data: [30, 25, 35, 20, 20, 15],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.2)',
            borderWidth: 2
          },
          {
            label: 'Impact Level',
            data: [40, 35, 30, 45, 50, 35],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.2)',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Risk Categories: Probability vs Impact',
            font: { size: 14, weight: 'bold' }
          },
          legend: { position: 'bottom' }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 60
          }
        }
      }
    });
  }
}

/* ==========================================================================
   QUIZ
   ========================================================================== */
const quizQuestions = [
  {
    q: "What does CVR stand for in commercial management?",
    options: ["Cost Variance Report", "Cost Value Reconciliation", "Contract Value Report", "Construction Value Review"],
    correct: 1
  },
  {
    q: "At which APC Level are candidates expected to advise senior management on strategic commercial matters?",
    options: ["Level 1 - Knowledge", "Level 2 - Application", "Level 3 - Advice", "All Levels"],
    correct: 2
  },
  {
    q: "Which formula correctly represents Cost Performance Index (CPI)?",
    options: ["CPI = EV / PV", "CPI = AC / EV", "CPI = EV / AC", "CPI = PV / AC"],
    correct: 2
  },
  {
    q: "What is the primary purpose of pre-contract commercial management?",
    options: ["To certify payments", "To resolve disputes", "To ensure profitable tendering and bid strategy", "To manage variations"],
    correct: 2
  },
  {
    q: "Which FIDIC sub-clause typically deals with variation orders?",
    options: ["Sub-Clause 8.4", "Sub-Clause 13.1", "Sub-Clause 14", "Sub-Clause 20"],
    correct: 1
  },
  {
    q: "EMV (Expected Monetary Value) is calculated by:",
    options: ["Cost ÷ Probability", "Probability × Impact", "Impact ÷ Time", "Cost + Risk"],
    correct: 1
  },
  {
    q: "Which is NOT a recognised estimating method?",
    options: ["First-Principles Estimating", "Operational Estimates", "Quotation-Based", "Reactive Estimating"],
    correct: 3
  },
  {
    q: "What is the first step in dispute resolution mechanisms?",
    options: ["Litigation", "Arbitration", "Negotiation", "Adjudication"],
    correct: 2
  },
  {
    q: "Cost to Complete (CTC) reports primarily forecast:",
    options: ["Hourly labour rates", "Total expenditure and final profit margin", "Tax obligations", "Project schedule changes"],
    correct: 1
  },
  {
    q: "If CPI = 1.20, the project is:",
    options: ["Behind schedule", "Cost efficient", "Over budget", "Cancelled"],
    correct: 1
  },
  {
    q: "Which is a core RICS ethical standard (2021)?",
    options: ["Act with profit motive", "Act with integrity", "Maximize claims", "Avoid documentation"],
    correct: 1
  },
  {
    q: "A 'back-to-back' subcontract aligns:",
    options: ["Payment dates only", "Liability with main contract obligations", "Color schemes", "Office locations"],
    correct: 1
  },
  {
    q: "Value Engineering aims to:",
    options: ["Increase costs", "Deliver equivalent performance at lower cost", "Delay procurement", "Inflate variations"],
    correct: 1
  },
  {
    q: "Which is the highest authority in the dispute ladder?",
    options: ["Negotiation", "Mediation", "Adjudication", "Litigation"],
    correct: 3
  },
  {
    q: "What is the recommended frequency for preparing CVR reports?",
    options: ["Annually", "Once at project end", "Monthly", "Only when problems arise"],
    correct: 2
  }
];

let currentQ = 0;
let userAnswers = [];

function initQuiz() {
  document.getElementById('qTotal').textContent = quizQuestions.length;
  document.getElementById('finalTotal').textContent = quizQuestions.length;
  renderQuestion();

  document.getElementById('nextQ').addEventListener('click', nextQuestion);
  document.getElementById('prevQ').addEventListener('click', prevQuestion);
}

function renderQuestion() {
  const q = quizQuestions[currentQ];
  document.getElementById('quizQuestion').textContent = q.q;
  document.getElementById('qCurrent').textContent = currentQ + 1;

  const progress = ((currentQ + 1) / quizQuestions.length) * 100;
  document.getElementById('quizProgressFill').style.width = progress + '%';

  const optionsContainer = document.getElementById('quizOptions');
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

  document.getElementById('prevQ').disabled = currentQ === 0;
  const nextBtn = document.getElementById('nextQ');
  nextBtn.innerHTML = currentQ === quizQuestions.length - 1
    ? 'Submit <i class="fas fa-check"></i>'
    : 'Next <i class="fas fa-arrow-right"></i>';
}

function selectAnswer(idx) {
  userAnswers[currentQ] = idx;
  renderQuestion();
}

function nextQuestion() {
  if (currentQ < quizQuestions.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    submitQuiz();
  }
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

  document.getElementById('quizCard').style.display = 'none';
  document.querySelector('.quiz-nav').style.display = 'none';
  document.querySelector('.quiz-progress').style.display = 'none';
  document.getElementById('quizResults').style.display = 'block';

  document.getElementById('finalScore').textContent = score;
  const percent = (score / quizQuestions.length) * 100;
  const label = document.getElementById('scoreLabel');
  if (percent >= 80) label.innerHTML = '🏆 Excellent! You\'re APC-ready!';
  else if (percent >= 60) label.innerHTML = '👏 Good progress, review key topics!';
  else if (percent >= 40) label.innerHTML = '📖 Keep studying - you\'re getting there!';
  else label.innerHTML = '📚 Time to review the material!';
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

/* ==========================================================================
   FLASHCARDS
   ========================================================================== */
const flashcards = [
  { term: 'CVR', def: 'Cost Value Reconciliation - Compares earned value to cost incurred to monitor profit' },
  { term: 'CTC', def: 'Cost to Complete - Forecasts total final cost and margin variance' },
  { term: 'EVA', def: 'Earned Value Analysis - Measures cost and schedule performance indices' },
  { term: 'CPI', def: 'Cost Performance Index = EV / AC. CPI > 1 indicates cost efficiency' },
  { term: 'SPI', def: 'Schedule Performance Index = EV / PV. SPI > 1 shows schedule advancement' },
  { term: 'EAC', def: 'Estimate at Completion = BAC / CPI. Predicts total cost at project end' },
  { term: 'EMV', def: 'Expected Monetary Value = Probability × Impact. Used to quantify risk' },
  { term: 'BOQ', def: 'Bill of Quantities - Detailed measured quantities used for pricing' },
  { term: 'FIDIC', def: 'International Federation of Consulting Engineers - Standard contract forms' },
  { term: 'NRM', def: 'New Rules of Measurement - RICS standards for cost planning and measurement' },
  { term: 'RICS', def: 'Royal Institution of Chartered Surveyors - Global professional body' },
  { term: 'DAB', def: 'Dispute Adjudication Board - Provides interim decisions on disputes' }
];

let currentFc = 0;

function initFlashcards() {
  document.getElementById('fcTotal').textContent = flashcards.length;
  renderFlashcard();

  document.getElementById('nextFc').addEventListener('click', () => {
    currentFc = (currentFc + 1) % flashcards.length;
    renderFlashcard();
  });

  document.getElementById('prevFc').addEventListener('click', () => {
    currentFc = (currentFc - 1 + flashcards.length) % flashcards.length;
    renderFlashcard();
  });

  document.getElementById('flashcard').addEventListener('click', () => {
    document.getElementById('flashcard').classList.toggle('flipped');
  });

  document.querySelectorAll('.fc-mini').forEach(mini => {
    mini.addEventListener('click', () => {
      currentFc = parseInt(mini.getAttribute('data-fc'));
      renderFlashcard();
      document.getElementById('flashcard').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}

function renderFlashcard() {
  const fc = flashcards[currentFc];
  document.getElementById('fcTerm').textContent = fc.term;
  document.getElementById('fcDefinition').textContent = fc.def;
  document.getElementById('fcCurrent').textContent = currentFc + 1;
  document.getElementById('flashcard').classList.remove('flipped');

  document.querySelectorAll('.fc-mini').forEach((m, idx) => {
    m.classList.toggle('active', idx === currentFc);
  });
}

/* ==========================================================================
   BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Expose for inline onclick
window.calculateEVA = calculateEVA;
window.restartQuiz = restartQuiz;
