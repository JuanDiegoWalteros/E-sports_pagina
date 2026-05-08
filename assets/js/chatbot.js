/**
 * E-Sports Academy — chatbot.js
 * Panel flotante, historial en memoria, POST /api/chat
 */

(function () {
  'use strict';

  const fab = document.getElementById('chatFab');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const body = document.getElementById('chatBody');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const statusEl = document.getElementById('chatStatus');

  if (!fab || !panel || !body || !form || !input) return;

  /** @type {{ role: string, content: string }[]} */
  let history = [];
  let welcomeShown = false;

  function setOpen(open) {
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    fab.setAttribute('aria-expanded', open ? 'true' : 'false');
    fab.setAttribute('aria-label', open ? 'Cerrar chatbot' : 'Abrir chatbot');
    if (open) {
      input.focus();
      if (!welcomeShown) {
        welcomeShown = true;
        appendBubble(
          'bot',
          'Hola, soy el asistente de E-Sports Academy. Pregúntame por cursos, roles, torneos o inscripciones.'
        );
      }
    }
  }

  function appendBubble(role, text, extraClass) {
    const div = document.createElement('div');
    div.className = 'chat-msg chat-msg--' + role + (extraClass ? ' ' + extraClass : '');
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function setTyping(on) {
    const existing = body.querySelector('.chat-msg--typing');
    if (on) {
      if (existing) return;
      appendBubble('bot', 'Escribiendo…', 'chat-msg--typing');
    } else {
      existing?.remove();
    }
  }

  async function sendUserMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    appendBubble('user', trimmed);
    history.push({ role: 'user', content: trimmed });
    input.value = '';

    setTyping(true);
    if (statusEl) statusEl.textContent = 'escribiendo…';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json().catch(() => ({}));

      setTyping(false);
      if (statusEl) statusEl.textContent = 'en línea';

      if (!res.ok) {
        const hint = data.hint || data.error || 'No se pudo conectar con el asistente.';
        appendBubble('bot', hint);
        return;
      }

      const reply = data.reply || 'Sin respuesta.';
      appendBubble('bot', reply);
      history.push({ role: 'assistant', content: reply });
    } catch {
      setTyping(false);
      if (statusEl) statusEl.textContent = 'en línea';
      appendBubble('bot', 'Error de red. Comprueba tu conexión e intenta de nuevo.');
    }
  }

  fab.addEventListener('click', () => {
    setOpen(!panel.classList.contains('is-open'));
  });

  closeBtn?.addEventListener('click', () => setOpen(false));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendUserMessage(input.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });
})();
