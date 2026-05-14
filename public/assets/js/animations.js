/**
 * E-Sports Academy — animations.js
 * Typewriter en hero + partículas canvas
 */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Typewriter ---------- */
  const tw = document.querySelector('.typewriter[data-text]');
  if (tw && !reduceMotion) {
    const full = tw.getAttribute('data-text') || '';
    let i = 0;
    tw.textContent = '';

    function step() {
      if (i <= full.length) {
        tw.textContent = full.slice(0, i);
        i++;
        setTimeout(step, i > 4 && i < full.length ? 55 : 80);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(step, 400));
    } else {
      setTimeout(step, 400);
    }
  } else if (tw) {
    tw.textContent = tw.getAttribute('data-text') || '';
    tw.style.borderRight = 'none';
    tw.style.paddingRight = '0';
  }

  /* ---------- Partículas canvas ---------- */
  const canvas = document.getElementById('heroParticles');
  if (!canvas || reduceMotion) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  /** @type {{ x: number; y: number; s: number; vy: number; vx: number; a: number }[]} */
  let particles = [];
  let raf = 0;

  function resize() {
    const hero = canvas.closest('.hero');
    if (!hero) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(80, Math.floor((w * h) / 18000));
    particles = [];
    for (let n = 0; n < count; n++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        s: Math.random() * 2.5 + 0.5,
        vy: -(Math.random() * 0.6 + 0.15),
        vx: (Math.random() - 0.5) * 0.35,
        a: Math.random() * 0.5 + 0.2,
      });
    }
  }

  function tick() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.y += p.vy;
      p.x += p.vx;
      if (p.y < -4) {
        p.y = h + 4;
        p.x = Math.random() * w;
      }
      ctx.fillStyle = 'rgba(0, 255, 159, ' + p.a + ')';
      ctx.fillRect(p.x, p.y, p.s, p.s);
    }

    raf = requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  tick();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(tick);
    }
  });
})();
