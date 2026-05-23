/* ==========================================================================
   MARGIN — main interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileMenu();
});

/* NAV scrolled state + scrollspy */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    lastScroll = y;
  }, { passive: true });

  // scrollspy
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link, .mobile-link');
  const map = {};
  links.forEach(l => {
    const href = l.getAttribute('href');
    if (href && href.startsWith('#')) {
      const id = href.slice(1);
      map[id] = map[id] || [];
      map[id].push(l);
    }
  });

  window.addEventListener('scroll', () => {
    let active = '';
    sections.forEach(s => {
      if (s.offsetTop - 120 <= window.scrollY) active = s.id;
    });
    Object.keys(map).forEach(id => {
      map[id].forEach(l => l.classList.toggle('active', id === active));
    });
  }, { passive: true });
}

/* Mobile menu */
function initMobileMenu() {
  const ham = document.getElementById('navHamburger');
  const menu = document.getElementById('mobileMenu');
  if (!ham || !menu) return;

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}
