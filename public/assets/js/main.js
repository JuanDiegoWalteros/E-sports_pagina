/**
 * E-Sports Academy — main.js
 * Navbar sticky, menú móvil, reveal, contadores, skills, formulario
 */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  /* ---------- Navbar scroll + blur ---------- */
  function onScroll() {
    if (!navbar) return;
    const y = window.scrollY || document.documentElement.scrollTop;
    navbar.classList.toggle('scrolled', y > 24);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú hamburguesa ---------- */
  function setMenuOpen(open) {
    if (!navMenu || !navToggle) return;
    navMenu.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Cerrar menu' : 'Abrir menu');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      setMenuOpen(!navMenu.classList.contains('is-open'));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            io.unobserve(en.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Contadores numéricos ---------- */
  function formatInt(n) {
    return Math.round(n).toLocaleString('es');
  }

  function animateValue(el, end, duration, formatter) {
    const start = 0;
    const t0 = performance.now();

    function frame(now) {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = start + (end - start) * eased;
      el.textContent = formatter(val, p >= 1);
      if (p < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function initCounters() {
    if (reduceMotion) {
      document.querySelectorAll('[data-count]').forEach((el) => {
        const raw = el.getAttribute('data-count');
        if (el.classList.contains('stat-number')) {
          el.textContent = '$' + raw;
        } else if (el.classList.contains('prize')) {
          el.textContent = '$' + formatInt(Number(raw));
        } else if (el.classList.contains('stat-num')) {
          el.textContent = '+' + formatInt(Number(raw));
        } else {
          el.textContent = formatInt(Number(raw));
        }
      });
      return;
    }

    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          const raw = el.getAttribute('data-count');
          if (raw == null) return;

          if (el.classList.contains('stat-number')) {
            const end = parseFloat(raw);
            animateValue(
              el,
              end,
              1600,
              (v, done) => (done ? '$' + end.toFixed(1) : '$' + v.toFixed(1))
            );
          } else if (el.classList.contains('prize')) {
            const end = Number(raw);
            animateValue(el, end, 1400, (v, done) =>
              done ? '$' + formatInt(end) : '$' + formatInt(v)
            );
          } else if (el.classList.contains('stat-num')) {
            const end = Number(raw);
            animateValue(el, end, 1600, (v, done) =>
              done ? '+' + formatInt(end) : '+' + formatInt(v)
            );
          } else {
            const end = Number(raw);
            animateValue(el, end, 1600, (v, done) =>
              done ? formatInt(end) : formatInt(v)
            );
          }
          obs.unobserve(el);
        });
      },
      { threshold: 0.35 }
    );

    document.querySelectorAll('.stat-num[data-count], .prize[data-count], .stat-number[data-count]').forEach((el) =>
      counterObserver.observe(el)
    );
  }

  initCounters();

  /* ---------- Barras de habilidad ---------- */
  const skillSection = document.querySelector('.skills');
  if (skillSection && !reduceMotion && 'IntersectionObserver' in window) {
    const skObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          skillSection.querySelectorAll('.skill-fill').forEach((bar) => {
            const fill = bar.getAttribute('data-fill') || '0';
            bar.style.setProperty('--fill', fill + '%');
            requestAnimationFrame(() => bar.classList.add('is-animated'));
            const row = bar.closest('.skill');
            const label = row?.querySelector('.skill-head span:last-child');
            const target = row?.querySelector('[data-skill]');
            if (label && target) {
              const n = Number(target.getAttribute('data-skill')) || 0;
              animateValue(
                label,
                n,
                1200,
                (v, done) => (done ? n + '%' : Math.round(v) + '%')
              );
            }
          });
          obs.unobserve(en.target);
        });
      },
      { threshold: 0.4 }
    );
    skObs.observe(skillSection);
  } else if (skillSection) {
    skillSection.querySelectorAll('.skill-fill').forEach((bar) => {
      const fill = bar.getAttribute('data-fill') || '0';
      bar.style.setProperty('--fill', fill + '%');
      bar.classList.add('is-animated');
    });
    skillSection.querySelectorAll('.skill-head span:last-child').forEach((label) => {
      const row = label.closest('.skill');
      const n = row?.querySelector('[data-skill]')?.getAttribute('data-skill');
      if (n) label.textContent = n + '%';
    });
  }

  /* ---------- Formulario de contacto ---------- */
  const form = document.getElementById('contactForm');
  const successEl = document.getElementById('formSuccess');

  function setError(name, msg) {
    const span = document.querySelector('.field-error[data-for="' + name + '"]');
    if (span) span.textContent = msg || '';
  }

  function clearErrors() {
    ['name', 'email', 'game', 'message'].forEach((n) => setError(n, ''));
    form?.querySelectorAll('.invalid').forEach((i) => i.classList.remove('invalid'));
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      const name = /** @type {HTMLInputElement} */ (form.elements.namedItem('name'));
      const email = /** @type {HTMLInputElement} */ (form.elements.namedItem('email'));
      const game = /** @type {HTMLSelectElement} */ (form.elements.namedItem('game'));
      const message = /** @type {HTMLTextAreaElement} */ (form.elements.namedItem('message'));

      let ok = true;

      if (!name.value.trim() || name.value.trim().length < 2) {
        setError('name', 'Escribe al menos 2 caracteres.');
        name.classList.add('invalid');
        ok = false;
      }

      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        setError('email', 'Introduce un correo válido.');
        email.classList.add('invalid');
        ok = false;
      }

      if (!game.value) {
        setError('game', 'Selecciona un juego.');
        game.classList.add('invalid');
        ok = false;
      }

      if (!message.value.trim() || message.value.trim().length < 10) {
        setError('message', 'El mensaje debe tener al menos 10 caracteres.');
        message.classList.add('invalid');
        ok = false;
      }

      if (!ok) return;

      if (successEl) {
        successEl.hidden = false;
        successEl.focus?.();
      }
      form.reset();
    });
  }

  /* ---------- Hero → abrir chat (delegado; chatbot.js define detalle) ---------- */
  document.getElementById('heroChatBtn')?.addEventListener('click', () => {
    document.getElementById('chatFab')?.click();
  });
})();
