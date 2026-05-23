/* ==========================================================================
   FX — Spotlight cursor, magnetic buttons, counter animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSpotlight();
  initMagnetic();
  initCounters();
  initCardSpotlight();
});

function initSpotlight() {
  const spot = document.getElementById('spotlight');
  if (!spot) return;
  if ('ontouchstart' in window) { spot.style.display = 'none'; return; }

  let tx = 0, ty = 0, cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  let raf = null;

  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    if (!raf) raf = requestAnimationFrame(loop);
  });

  function loop() {
    cx += (tx - cx) * 0.14;
    cy += (ty - cy) * 0.14;
    spot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
      raf = requestAnimationFrame(loop);
    } else raf = null;
  }
}

function initMagnetic() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

function initCounters() {
  const els = document.querySelectorAll('.counter');
  const seen = new WeakSet();
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !seen.has(e.target)) {
        seen.add(e.target);
        animate(e.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
}

function animate(el) {
  const target = parseFloat(el.dataset.target || el.textContent);
  if (isNaN(target)) return;
  const decimals = (el.dataset.target || '').includes('.') ? 1 : 0;
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const v = target * eased;
    el.textContent = decimals ? v.toFixed(1) : Math.round(v);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = decimals ? target.toFixed(1) : target;
  }
  requestAnimationFrame(tick);
}

function initCardSpotlight() {
  document.querySelectorAll('.problem-card, .proof-card, .feature-section .viz-card, .sec-badge').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });
}
