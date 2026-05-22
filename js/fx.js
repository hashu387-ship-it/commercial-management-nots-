/* ==========================================================================
   FX — Spotlight cursor, magnetic buttons, counter animations
   ========================================================================== */

function initFx() {
  initSpotlight();
  initCardSpotlight();
  initMagnetic();
  initCounters();
}

/* SPOTLIGHT — radial gradient that follows the mouse */
function initSpotlight() {
  const spot = document.getElementById('spotlight');
  if (!spot) return;
  let raf = null;
  let tx = 0, ty = 0;
  let cx = window.innerWidth / 2, cy = window.innerHeight / 2;

  document.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
    if (!raf) raf = requestAnimationFrame(loop);
  });

  function loop() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    spot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = null;
    }
  }

  // Hide on touch devices
  if ('ontouchstart' in window) spot.style.display = 'none';
}

/* CARD SPOTLIGHT — per-card glow that tracks mouse position */
function initCardSpotlight() {
  document.querySelectorAll('.content-card, .est-method, .summary-card, .stat-card, .minigame-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

/* MAGNETIC — buttons subtly track the mouse on approach */
function initMagnetic() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* COUNTERS — animate numbers from 0 on first scroll-in */
function initCounters() {
  const els = document.querySelectorAll('.stat-value, .big-stat-num');
  const seen = new WeakSet();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !seen.has(entry.target)) {
        seen.add(entry.target);
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
}

function animateCount(el) {
  const text = el.textContent.trim();
  const match = text.match(/^(\d+)(\+?)/);
  if (!match) return;
  const target = parseInt(match[1]);
  const suffix = match[2] || '';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}

window.initFx = initFx;
