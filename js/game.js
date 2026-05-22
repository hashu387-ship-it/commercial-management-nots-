/* ==========================================================================
   GAMIFICATION LAYER - XP, Achievements, Mini-Games
   ========================================================================== */

const ACHIEVEMENTS = [
  { id: 'first_steps', icon: 'fa-shoe-prints', name: 'First Steps', desc: 'Started your journey', condition: () => true },
  { id: 'explorer', icon: 'fa-map', name: 'Explorer', desc: 'Visit 5 sections', condition: s => s.visitedSections.length >= 5 },
  { id: 'scholar', icon: 'fa-graduation-cap', name: 'Scholar', desc: 'Visit all 11 sections', condition: s => s.visitedSections.length >= 11 },
  { id: 'quiz_master', icon: 'fa-trophy', name: 'Quiz Master', desc: 'Score 80% on quiz', condition: s => s.quizBest >= 16 },
  { id: 'perfect', icon: 'fa-medal', name: 'Perfect Score', desc: 'Get 20/20 on quiz', condition: s => s.quizBest >= 20 },
  { id: 'card_collector', icon: 'fa-clone', name: 'Card Collector', desc: 'Review all flashcards', condition: s => s.flashcardsViewed.length >= 16 },
  { id: 'calculator_pro', icon: 'fa-calculator', name: 'Calculator Pro', desc: 'Use all 3 calculators', condition: s => s.calculatorsUsed.length >= 3 },
  { id: 'on_fire', icon: 'fa-fire', name: 'On Fire', desc: '5 correct in a row', condition: s => s.bestCombo >= 5 },
  { id: 'sharp_shooter', icon: 'fa-bullseye', name: 'Sharp Shooter', desc: '10 correct in a row', condition: s => s.bestCombo >= 10 },
  { id: 'level_5', icon: 'fa-star', name: 'Rising Star', desc: 'Reach Level 5', condition: s => s.level >= 5 },
  { id: 'level_10', icon: 'fa-crown', name: 'Commercial King', desc: 'Reach Level 10', condition: s => s.level >= 10 },
  { id: 'gamer', icon: 'fa-gamepad', name: 'Gamer', desc: 'Win a mini-game', condition: s => s.miniGameWins >= 1 },
  { id: 'master_gamer', icon: 'fa-dragon', name: 'Mini-Game Master', desc: 'Win all 3 mini-games', condition: s => s.miniGameWinsByType.length >= 3 },
];

const DEFAULT_STATE = {
  name: 'Player',
  level: 1,
  xp: 0,
  points: 0,
  hearts: 3,
  combo: 0,
  bestCombo: 0,
  visitedSections: [],
  flashcardsViewed: [],
  calculatorsUsed: [],
  quizBest: 0,
  miniGameWins: 0,
  miniGameWinsByType: [],
  achievements: []
};

let state = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem('cmgame_state');
    if (saved) return { ...DEFAULT_STATE, ...JSON.parse(saved) };
  } catch (e) {}
  return { ...DEFAULT_STATE };
}

function saveState() {
  try { localStorage.setItem('cmgame_state', JSON.stringify(state)); } catch (e) {}
}

function xpForLevel(level) { return level * 100; }

function awardXp(amount, showPopup = true) {
  state.xp += amount;
  state.points += amount;
  let leveledUp = false;
  while (state.xp >= xpForLevel(state.level)) {
    state.xp -= xpForLevel(state.level);
    state.level++;
    leveledUp = true;
  }
  if (showPopup) showXpPopup(amount);
  if (leveledUp) showLevelUp(state.level);
  updateHud();
  checkAchievements();
  saveState();
}

function updateHud() {
  const hud = document.getElementById('gameHud');
  if (hud) hud.style.display = 'flex';

  setEl('hudAvatar', state.name.charAt(0).toUpperCase());
  setEl('hudLevel', state.level);
  setEl('hudXp', state.xp);
  setEl('hudPoints', state.points.toLocaleString());

  const xpFill = document.getElementById('hudXpFill');
  if (xpFill) xpFill.style.width = ((state.xp / xpForLevel(state.level)) * 100) + '%';

  // Update hearts
  document.querySelectorAll('.hud-heart').forEach((h, i) => {
    h.classList.toggle('lost', i >= state.hearts);
  });
}

function setEl(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

function showXpPopup(amount) {
  const popup = document.createElement('div');
  popup.className = 'xp-popup';
  popup.textContent = '+' + amount + ' XP';
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1500);
}

function showLevelUp(level) {
  setEl('levelUpNumber', level);
  document.getElementById('levelUpModal').classList.add('show');
  triggerConfetti(80);
}

function closeLevelUp() {
  document.getElementById('levelUpModal').classList.remove('show');
}

function checkAchievements() {
  ACHIEVEMENTS.forEach(a => {
    if (!state.achievements.includes(a.id) && a.condition(state)) {
      state.achievements.push(a.id);
      unlockAchievement(a);
    }
  });
  saveState();
}

function unlockAchievement(a) {
  awardXp(50, false);
  triggerConfetti(60);
  const toast = document.getElementById('achievementToast');
  const icon = document.getElementById('toastIcon');
  if (icon) icon.innerHTML = `<i class="fas ${a.icon}"></i>`;
  setEl('toastName', a.name);
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function openProfile() {
  setEl('profileAvatar', state.name.charAt(0).toUpperCase());
  setEl('profileName', state.name);
  setEl('profileLevel', state.level);
  setEl('profileXp', state.xp);
  setEl('profilePoints', state.points.toLocaleString());
  setEl('profileStreak', state.bestCombo);
  setEl('profileAchCount', state.achievements.length + '/' + ACHIEVEMENTS.length);

  const grid = document.getElementById('achievementsGrid');
  grid.innerHTML = '';
  ACHIEVEMENTS.forEach(a => {
    const unlocked = state.achievements.includes(a.id);
    const div = document.createElement('div');
    div.className = 'achievement' + (unlocked ? ' unlocked' : '');
    div.innerHTML = `
      <span class="achievement-icon"><i class="fas ${a.icon}"></i></span>
      <div class="achievement-name">${a.name}</div>
      <div class="achievement-desc">${a.desc}</div>
      ${!unlocked ? '<i class="fas fa-lock achievement-lock"></i>' : ''}
    `;
    grid.appendChild(div);
  });

  document.getElementById('profileModal').classList.add('show');
}

function closeProfile() {
  document.getElementById('profileModal').classList.remove('show');
}

/* CONFETTI */
function triggerConfetti(count = 50) {
  const container = document.getElementById('confettiContainer');
  if (!container) return;
  const colors = ['#c9985f', '#e85a4f', '#ff7e5f', '#14919b', '#16a085', '#f4e8c9'];
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = (2 + Math.random() * 2) + 's';
    c.style.animationDelay = (Math.random() * 0.5) + 's';
    c.style.width = c.style.height = (5 + Math.random() * 10) + 'px';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    container.appendChild(c);
    setTimeout(() => c.remove(), 4500);
  }
}

/* COMBO */
function showCombo(combo) {
  if (combo < 2) return;
  const ci = document.getElementById('comboIndicator');
  setEl('comboX', 'x' + combo);
  ci.classList.add('show');
  setTimeout(() => ci.classList.remove('show'), 1500);
}

/* NAME PROMPT */
function startGame() {
  const input = document.getElementById('playerNameInput');
  const name = (input.value || 'Champion').trim().substring(0, 20);
  state.name = name || 'Champion';
  saveState();
  document.getElementById('namePrompt').classList.remove('show');
  updateHud();
  setTimeout(() => awardXp(10), 500);
  setTimeout(() => checkAchievements(), 1000);
}

/* TRACK SECTION VISITS */
function trackSectionVisit(id) {
  if (!state.visitedSections.includes(id)) {
    state.visitedSections.push(id);
    awardXp(15);
  }
}

/* TRACK FLASHCARD VIEWS */
function trackFlashcardView(idx) {
  if (!state.flashcardsViewed.includes(idx)) {
    state.flashcardsViewed.push(idx);
    awardXp(5);
  }
}

/* TRACK CALCULATOR USE */
function trackCalculatorUse(name) {
  if (!state.calculatorsUsed.includes(name)) {
    state.calculatorsUsed.push(name);
    awardXp(20);
  }
}

/* QUIZ INTEGRATION */
function quizAnswerCorrect() {
  state.combo++;
  if (state.combo > state.bestCombo) state.bestCombo = state.combo;
  const multiplier = state.combo >= 5 ? 3 : state.combo >= 3 ? 2 : 1;
  awardXp(10 * multiplier);
  if (state.combo >= 2) showCombo(state.combo);
  saveState();
}

function quizAnswerWrong() {
  state.combo = 0;
  state.hearts = Math.max(0, state.hearts - 1);
  updateHud();
  saveState();
}

function quizComplete(score, total) {
  if (score > state.quizBest) state.quizBest = score;
  awardXp(score * 5);
  if (score === total) triggerConfetti(120);
  state.hearts = 3;
  state.combo = 0;
  updateHud();
  saveState();
}

/* MINI-GAMES */
const MATCH_TERMS = [
  { term: 'CVR', def: 'Cost Value Reconciliation' },
  { term: 'CTC', def: 'Cost to Complete' },
  { term: 'EVM', def: 'Earned Value Method' },
  { term: 'CPI', def: 'Cost Performance Index' },
  { term: 'SPI', def: 'Schedule Performance Index' },
  { term: 'BOQ', def: 'Bill of Quantities' },
  { term: 'EMV', def: 'Probability × Impact' },
  { term: 'MOS', def: 'Material on Site' }
];

const MEMORY_PAIRS = [
  { id: 1, a: 'CVR', b: 'Cost Value Reconciliation' },
  { id: 2, a: 'CTC', b: 'Cost to Complete' },
  { id: 3, a: 'EVM', b: 'Earned Value' },
  { id: 4, a: 'CPI', b: 'EV / AC' },
  { id: 5, a: 'SPI', b: 'EV / PV' },
  { id: 6, a: 'EMV', b: 'Prob × Impact' },
  { id: 7, a: 'BOQ', b: 'Bill of Quantities' },
  { id: 8, a: 'FIDIC', b: 'Engineers Contract' }
];

const SPEED_QUIZ = [
  { q: 'CVR stands for?', a: 'Cost Value Reconciliation', options: ['Cost Variance Report', 'Cost Value Reconciliation', 'Contract Value Review', 'Capital Value Return'], correct: 1 },
  { q: 'CPI formula?', a: 'EV / AC', options: ['EV / PV', 'EV / AC', 'AC / EV', 'PV / AC'], correct: 1 },
  { q: 'CTC = ?', a: 'Planned − Incurred', options: ['Planned + Incurred', 'Planned − Incurred', 'Incurred − Planned', 'BAC × CPI'], correct: 1 },
  { q: 'SPI > 1 means?', a: 'Ahead of schedule', options: ['Behind schedule', 'Ahead of schedule', 'Over budget', 'Under budget'], correct: 1 },
  { q: 'Most accurate estimation method?', a: 'Approximate Quantities', options: ['Unit', 'Superficial', 'Approximate Quantities', 'Elemental'], correct: 2 },
  { q: 'Front loaded BOQ?', a: 'Higher costs early', options: ['Higher costs late', 'Higher costs early', 'Equal split', 'Random'], correct: 1 },
  { q: 'EMV = ?', a: 'Probability × Impact', options: ['Cost ÷ Time', 'Probability × Impact', 'Risk × Profit', 'Time × Money'], correct: 1 },
  { q: 'First dispute step?', a: 'Negotiation', options: ['Arbitration', 'Litigation', 'Negotiation', 'Adjudication'], correct: 2 },
  { q: 'MOS means?', a: 'Material on Site', options: ['Mode of Service', 'Material on Site', 'Margin on Sale', 'Method of Statement'], correct: 1 },
  { q: 'Nominated subcontractor by?', a: 'Employer', options: ['Contractor', 'Employer', 'Engineer', 'Project Manager'], correct: 1 },
  { q: 'FIDIC 13.1?', a: 'Variation', options: ['Payment', 'Variation', 'EOT', 'Insurance'], correct: 1 },
  { q: 'CM starts when?', a: 'At tender collection', options: ['At handover', 'At tender collection', 'After signing', 'At final account'], correct: 1 },
  { q: 'EAC = ?', a: 'BAC / CPI', options: ['BAC + CPI', 'BAC / CPI', 'CPI × SPI', 'EV − AC'], correct: 1 },
  { q: 'Negative cash flow because?', a: 'Outgoing > Incoming', options: ['Too much profit', 'Outgoing > Incoming', 'Bank credit', 'Client overpays'], correct: 1 },
  { q: 'Value Engineering aim?', a: 'Same quality, lower cost', options: ['Higher cost', 'Same quality, lower cost', 'Delay work', 'Inflate claims'], correct: 1 },
];

let miniGameState = {};

function openMiniGame(type) {
  miniGameState = { type, score: 0, combo: 0 };
  const modal = document.getElementById('gameModal');
  modal.classList.add('show');

  if (type === 'match') initMatchGame();
  else if (type === 'memory') initMemoryGame();
  else if (type === 'speed') initSpeedQuiz();
}

function closeGameModal() {
  document.getElementById('gameModal').classList.remove('show');
  if (miniGameState.timerInterval) clearInterval(miniGameState.timerInterval);
}

/* TERM MATCH GAME */
function initMatchGame() {
  setEl('gameModalTitle', '🔗 Term Match');
  const terms = [...MATCH_TERMS].sort(() => Math.random() - 0.5);
  const defs = [...MATCH_TERMS].sort(() => Math.random() - 0.5);
  miniGameState.matched = 0;
  miniGameState.selected = null;
  miniGameState.startTime = Date.now();

  document.getElementById('gameModalStats').innerHTML = `
    <div class="game-stat"><i class="fas fa-bullseye"></i> <span id="mgMatched">0</span> / ${terms.length} matched</div>
  `;

  const body = document.getElementById('gameModalBody');
  body.innerHTML = `
    <p style="text-align:center;color:var(--text-light);margin-bottom:1rem;">Click a term, then click its matching definition.</p>
    <div class="match-game">
      <div class="match-col">
        <h4>Terms</h4>
        <div id="matchTerms"></div>
      </div>
      <div class="match-col">
        <h4>Definitions</h4>
        <div id="matchDefs"></div>
      </div>
    </div>
  `;

  const tCol = document.getElementById('matchTerms');
  const dCol = document.getElementById('matchDefs');
  terms.forEach(t => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.dataset.type = 'term';
    el.dataset.id = t.term;
    el.textContent = t.term;
    el.onclick = () => onMatchClick(el);
    tCol.appendChild(el);
  });
  defs.forEach(d => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.dataset.type = 'def';
    el.dataset.id = d.term;
    el.textContent = d.def;
    el.onclick = () => onMatchClick(el);
    dCol.appendChild(el);
  });
}

function onMatchClick(el) {
  if (el.classList.contains('matched')) return;
  if (!miniGameState.selected) {
    el.classList.add('selected');
    miniGameState.selected = el;
    return;
  }
  if (miniGameState.selected === el) {
    el.classList.remove('selected');
    miniGameState.selected = null;
    return;
  }
  const sel = miniGameState.selected;
  if (sel.dataset.type === el.dataset.type) {
    sel.classList.remove('selected');
    el.classList.add('selected');
    miniGameState.selected = el;
    return;
  }
  if (sel.dataset.id === el.dataset.id) {
    sel.classList.remove('selected');
    sel.classList.add('matched');
    el.classList.add('matched');
    miniGameState.matched++;
    setEl('mgMatched', miniGameState.matched);
    awardXp(10);
    if (miniGameState.matched === MATCH_TERMS.length) winMatchGame();
  } else {
    sel.classList.remove('selected');
    sel.classList.add('wrong');
    el.classList.add('wrong');
    setTimeout(() => { sel.classList.remove('wrong'); el.classList.remove('wrong'); }, 400);
  }
  miniGameState.selected = null;
}

function winMatchGame() {
  const time = Math.round((Date.now() - miniGameState.startTime) / 1000);
  const bonus = Math.max(0, 60 - time);
  awardXp(50 + bonus);
  triggerConfetti(80);
  state.miniGameWins++;
  if (!state.miniGameWinsByType.includes('match')) state.miniGameWinsByType.push('match');
  saveState();
  checkAchievements();
  setTimeout(() => {
    document.getElementById('gameModalBody').innerHTML = `
      <div style="text-align:center;padding:2rem;">
        <i class="fas fa-trophy" style="font-size:4rem;color:var(--rsg-gold);margin-bottom:1rem;"></i>
        <h3 style="font-family:'Playfair Display',serif;font-size:2rem;margin-bottom:0.5rem;">Match Complete!</h3>
        <p style="color:var(--text-light);">Time: ${time}s · Bonus: +${bonus} XP</p>
        <button onclick="initMatchGame()" class="btn btn-primary" style="margin-top:1rem;">Play Again <i class="fas fa-redo"></i></button>
      </div>
    `;
  }, 600);
}

/* MEMORY MATCH GAME */
function initMemoryGame() {
  setEl('gameModalTitle', '🧠 Memory Match');
  const cards = [];
  MEMORY_PAIRS.forEach(p => {
    cards.push({ id: p.id, text: p.a });
    cards.push({ id: p.id, text: p.b });
  });
  cards.sort(() => Math.random() - 0.5);

  miniGameState.cards = cards;
  miniGameState.flipped = [];
  miniGameState.matched = 0;
  miniGameState.moves = 0;

  document.getElementById('gameModalStats').innerHTML = `
    <div class="game-stat"><i class="fas fa-step-forward"></i> Moves: <span id="mgMoves">0</span></div>
    <div class="game-stat"><i class="fas fa-check"></i> Matched: <span id="mgMatched">0</span>/${MEMORY_PAIRS.length}</div>
  `;

  const body = document.getElementById('gameModalBody');
  body.innerHTML = `
    <p style="text-align:center;color:var(--text-light);margin-bottom:1rem;">Flip cards to find matching pairs.</p>
    <div class="memory-grid" id="memoryGrid"></div>
  `;

  const grid = document.getElementById('memoryGrid');
  cards.forEach((card, idx) => {
    const el = document.createElement('div');
    el.className = 'memory-card';
    el.dataset.idx = idx;
    el.innerHTML = `
      <div class="memory-card-face">?</div>
      <div class="memory-card-back">${card.text}</div>
    `;
    el.onclick = () => onMemoryClick(el, idx);
    grid.appendChild(el);
  });
}

function onMemoryClick(el, idx) {
  if (el.classList.contains('flipped') || el.classList.contains('matched')) return;
  if (miniGameState.flipped.length >= 2) return;
  el.classList.add('flipped');
  miniGameState.flipped.push({ el, idx });

  if (miniGameState.flipped.length === 2) {
    miniGameState.moves++;
    setEl('mgMoves', miniGameState.moves);
    const [a, b] = miniGameState.flipped;
    if (miniGameState.cards[a.idx].id === miniGameState.cards[b.idx].id) {
      setTimeout(() => {
        a.el.classList.add('matched');
        b.el.classList.add('matched');
        miniGameState.matched++;
        setEl('mgMatched', miniGameState.matched);
        miniGameState.flipped = [];
        awardXp(10);
        if (miniGameState.matched === MEMORY_PAIRS.length) winMemoryGame();
      }, 500);
    } else {
      setTimeout(() => {
        a.el.classList.remove('flipped');
        b.el.classList.remove('flipped');
        miniGameState.flipped = [];
      }, 1000);
    }
  }
}

function winMemoryGame() {
  const bonus = Math.max(0, 100 - miniGameState.moves * 5);
  awardXp(50 + bonus);
  triggerConfetti(100);
  state.miniGameWins++;
  if (!state.miniGameWinsByType.includes('memory')) state.miniGameWinsByType.push('memory');
  saveState();
  checkAchievements();
  setTimeout(() => {
    document.getElementById('gameModalBody').innerHTML = `
      <div style="text-align:center;padding:2rem;">
        <i class="fas fa-brain" style="font-size:4rem;color:var(--rsg-gold);margin-bottom:1rem;"></i>
        <h3 style="font-family:'Playfair Display',serif;font-size:2rem;margin-bottom:0.5rem;">Memory Mastered!</h3>
        <p style="color:var(--text-light);">Moves: ${miniGameState.moves} · Bonus: +${bonus} XP</p>
        <button onclick="initMemoryGame()" class="btn btn-primary" style="margin-top:1rem;">Play Again <i class="fas fa-redo"></i></button>
      </div>
    `;
  }, 800);
}

/* SPEED QUIZ */
function initSpeedQuiz() {
  setEl('gameModalTitle', '⚡ Speed Quiz');
  miniGameState.score = 0;
  miniGameState.combo = 0;
  miniGameState.time = 60;
  miniGameState.qIdx = 0;
  miniGameState.questions = [...SPEED_QUIZ].sort(() => Math.random() - 0.5);

  document.getElementById('gameModalStats').innerHTML = `
    <div class="game-stat"><i class="fas fa-stopwatch"></i> <span id="speedTime">60</span>s</div>
    <div class="game-stat"><i class="fas fa-star"></i> Score: <span id="speedScore">0</span></div>
    <div class="game-stat"><i class="fas fa-fire"></i> Combo: <span id="speedCombo">0</span></div>
  `;

  document.getElementById('gameModalBody').innerHTML = `
    <div class="speed-quiz-timer" id="speedTimer">60</div>
    <div id="speedQuizArea"></div>
  `;

  renderSpeedQuestion();
  miniGameState.timerInterval = setInterval(() => {
    miniGameState.time--;
    setEl('speedTime', miniGameState.time);
    const t = document.getElementById('speedTimer');
    if (t) {
      t.textContent = miniGameState.time;
      t.classList.toggle('danger', miniGameState.time <= 10);
    }
    if (miniGameState.time <= 0) endSpeedQuiz();
  }, 1000);
}

function renderSpeedQuestion() {
  const q = miniGameState.questions[miniGameState.qIdx % miniGameState.questions.length];
  const area = document.getElementById('speedQuizArea');
  if (!area) return;
  const letters = ['A', 'B', 'C', 'D'];
  area.innerHTML = `
    <div class="quiz-question" style="text-align:center;">${q.q}</div>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <div class="quiz-option" onclick="speedAnswer(${i})">
          <span class="quiz-option-letter">${letters[i]}</span><span>${opt}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function speedAnswer(idx) {
  const q = miniGameState.questions[miniGameState.qIdx % miniGameState.questions.length];
  if (idx === q.correct) {
    miniGameState.combo++;
    const mult = miniGameState.combo >= 5 ? 3 : miniGameState.combo >= 3 ? 2 : 1;
    miniGameState.score += 10 * mult;
    setEl('speedScore', miniGameState.score);
    setEl('speedCombo', miniGameState.combo);
    if (miniGameState.combo >= 2) showCombo(miniGameState.combo);
    awardXp(5 * mult, false);
  } else {
    miniGameState.combo = 0;
    setEl('speedCombo', 0);
  }
  miniGameState.qIdx++;
  renderSpeedQuestion();
}

function endSpeedQuiz() {
  clearInterval(miniGameState.timerInterval);
  if (miniGameState.combo > state.bestCombo) state.bestCombo = miniGameState.combo;
  state.miniGameWins++;
  if (!state.miniGameWinsByType.includes('speed')) state.miniGameWinsByType.push('speed');
  awardXp(miniGameState.score);
  if (miniGameState.score >= 100) triggerConfetti(100);
  saveState();
  checkAchievements();
  document.getElementById('gameModalBody').innerHTML = `
    <div style="text-align:center;padding:2rem;">
      <i class="fas fa-bolt" style="font-size:4rem;color:var(--rsg-gold);margin-bottom:1rem;"></i>
      <h3 style="font-family:'Playfair Display',serif;font-size:2rem;margin-bottom:0.5rem;">Time's Up!</h3>
      <p style="font-size:1.5rem;color:var(--rsg-coral);font-weight:800;">Score: ${miniGameState.score}</p>
      <p style="color:var(--text-light);">Best combo: ${miniGameState.combo}x</p>
      <button onclick="initSpeedQuiz()" class="btn btn-primary" style="margin-top:1rem;">Play Again <i class="fas fa-redo"></i></button>
    </div>
  `;
}

/* INIT GAME */
function initGame() {
  if (!state.name || state.name === 'Player') {
    document.getElementById('namePrompt').classList.add('show');
  } else {
    updateHud();
    checkAchievements();
  }

  // Track section visits via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) trackSectionVisit(e.target.id);
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));

  // Hook calculator inputs
  ['ev', 'ac', 'pv', 'bac'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => trackCalculatorUse('eva'), { once: true });
  });
  ['ctc-x', 'ctc-y'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => trackCalculatorUse('ctc'), { once: true });
  });
  document.querySelectorAll('.emv-prob, .emv-impact').forEach(el => {
    el.addEventListener('input', () => trackCalculatorUse('emv'), { once: true });
  });
}

window.startGame = startGame;
window.openProfile = openProfile;
window.closeProfile = closeProfile;
window.closeLevelUp = closeLevelUp;
window.openMiniGame = openMiniGame;
window.closeGameModal = closeGameModal;
window.initMatchGame = initMatchGame;
window.initMemoryGame = initMemoryGame;
window.initSpeedQuiz = initSpeedQuiz;
window.speedAnswer = speedAnswer;
window.quizAnswerCorrect = quizAnswerCorrect;
window.quizAnswerWrong = quizAnswerWrong;
window.quizComplete = quizComplete;
window.trackFlashcardView = trackFlashcardView;
window.initGame = initGame;
