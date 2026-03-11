/* ============================================================
   IGNITE LABS — script.js
   ============================================================ */

'use strict';

/* ── Navigation: scroll shadow ─────────────────────────────── */
const nav = document.getElementById('nav');

const updateNav = () => {
  if (window.scrollY > 24) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', updateNav, { passive: true });
updateNav(); // run once on load

/* ── Mobile menu toggle ─────────────────────────────────────── */
const mobileBtn  = document.getElementById('mobile-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  mobileBtn.setAttribute('aria-expanded', String(open));

  // Swap hamburger ↔ close icon
  mobileBtn.innerHTML = open
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
         <line x1="18" y1="6"  x2="6"  y2="18"/>
         <line x1="6"  y1="6"  x2="18" y2="18"/>
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
         <line x1="3" y1="6"  x2="21" y2="6"/>
         <line x1="3" y1="12" x2="21" y2="12"/>
         <line x1="3" y1="18" x2="21" y2="18"/>
       </svg>`;
});

// Close menu when any link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
       <line x1="3" y1="6"  x2="21" y2="6"/>
       <line x1="3" y1="12" x2="21" y2="12"/>
       <line x1="3" y1="18" x2="21" y2="18"/>
     </svg>`;
  });
});

/* ── Scroll Reveal ──────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, {
  threshold:  0.08,
  rootMargin: '0px 0px -40px 0px',
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Active nav link on scroll ─────────────────────────────── */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('.nav__links a, .nav__mobile-menu a[href^="#"]');

const activeLinkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => activeLinkObserver.observe(s));
