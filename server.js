/**
 * E-Sports Academy — Servidor Express minimo
 * ------------------------------------------
 * - Sirve la landing page estatica (index.html + assets/)
 * - Expone POST /api/chat como proxy seguro hacia Google Gemini
 *
 * La GEMINI_API_KEY se lee desde .env y NUNCA se expone al navegador.
 */

import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';
const GEMINI_FALLBACK_MODELS = ['gemini-flash-latest', 'gemini-2.0-flash', 'gemini-1.5-flash'];
const PLACEHOLDER_KEY = 'REEMPLAZA_CON_TU_KEY';

const SYSTEM_PROMPT = `Eres el asistente virtual oficial de E-Sports Academy.

Tu función es ayudar a los visitantes de la landing page a:

1) Elegir un curso de e-sports.
2) Entender roles competitivos.
3) Recibir orientación inicial sobre juegos como Valorant, League of Legends, Fortnite, Counter-Strike y otros e-sports.
4) Resolver dudas sobre inscripción, torneos y entrenamiento.

IDIOMA:

Responde siempre en el mismo idioma del último mensaje del usuario.

Si el usuario escribe en español, responde completamente en español.

Si el usuario escribe en inglés, responde completamente en inglés.

DECLARACIÓN PERSONA TRANSHUMANA:

El chatbot debe integrar de manera natural la siguiente declaración institucional:

“Soy LIBRE, AUTÓNOMO Y RESPONSABLE a través del diálogo y la construcción, como ideal regulativo; me dirijo, controlo y dicto mis propias leyes.”

Cuando el usuario pregunte sobre ética, autonomía, responsabilidad, bienestar, desarrollo humano, transformación positiva o propósito del proyecto, relaciona esta declaración con los e-sports.

Explica que un jugador competitivo no solo debe mejorar sus habilidades técnicas, sino también desarrollar disciplina, autocontrol, pensamiento crítico, comunicación respetuosa, trabajo en equipo y responsabilidad social.

Si el usuario escribe en español, explica esta declaración en español.
Si el usuario escribe en inglés, explain this statement in English.

ESTILO:

Sé amable, claro, directo y útil.

No respondas de forma incompleta.

No termines frases a medias.

No uses Markdown, ni asteriscos, ni títulos con #.

Usa frases cortas y fáciles de leer.

CURSOS DISPONIBLES:`;

// ----- Validacion de la API key al arrancar -----
function isKeyConfigured() {
  const k = (process.env.GEMINI_API_KEY || '').trim();
  return k.length > 0 && k !== PLACEHOLDER_KEY && k !== 'tu_key_aqui';
}

function logKeyStatus() {
  if (isKeyConfigured()) {
    console.log('[OK] GEMINI_API_KEY configurada. El chatbot esta activo.');
  } else {
    console.warn('\n=========================================================');
    console.warn(' AVISO: GEMINI_API_KEY no configurada.');
    console.warn(' La landing funcionara, pero el chatbot estara deshabilitado.');
    console.warn(' Para activarlo:');
    console.warn('   1. Abre el archivo .env en la raiz del proyecto');
    console.warn('   2. Reemplaza REEMPLAZA_CON_TU_KEY por tu API key real');
    console.warn('   3. Obten una key gratis en https://aistudio.google.com/app/apikey');
    console.warn('   4. Reinicia el servidor con: npm start');
    console.warn('=========================================================\n');
  }
}

// ----- Middlewares -----
app.use(express.json({ limit: '64kb' }));

// ----- API (antes de static para evitar colisiones con archivos) -----
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    chatbotEnabled: isKeyConfigured(),
    model: GEMINI_MODEL,
  });
});

app.post('/api/chat', async (req, res) => {
  if (!isKeyConfigured()) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY no configurada',
      hint: 'Edita el archivo .env y reemplaza REEMPLAZA_CON_TU_KEY por tu API key real. Obtenla en https://aistudio.google.com/app/apikey',
    });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: 'Solicitud invalida',
      hint: 'El cuerpo debe incluir { messages: [{ role, content }, ...] } con al menos un mensaje.',
    });
  }

  // Convertir el formato { role, content } al esquema de Gemini.
  const contents = messages
    .filter(m => m && typeof m.content === 'string' && m.content.trim())
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

  if (contents.length === 0) {
    return res.status(400).json({
      error: 'Mensajes vacíos',
      hint: 'No se pudo construir el historial. Escribe un mensaje e inténtalo de nuevo.',
    });
  }

  const apiKey = process.env.GEMINI_API_KEY.trim();
  const payload = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: {
      temperature: 0.4,
      topP: 0.8,
      maxOutputTokens: 700,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  };

  /** Orden: modelo del .env primero, luego fallbacks sin duplicar */
  const modelsToTry = [...new Set([GEMINI_MODEL, ...GEMINI_FALLBACK_MODELS])];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  function parseGeminiErrorText(text) {
    try {
      const j = JSON.parse(text);
      return j?.error?.message || j?.message || null;
    } catch {
      return null;
    }
  }

  try {
    let upstream = null;
    let lastErrText = '';
    let usedModel = '';

    for (const model of modelsToTry) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
      usedModel = model;
      upstream = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
        signal: controller.signal,
        body: JSON.stringify(payload),
      });

      if (upstream.ok) break;

      lastErrText = await upstream.text().catch(() => '');
      const msg = parseGeminiErrorText(lastErrText);
      console.error('[Gemini]', model, upstream.status, msg || lastErrText.slice(0, 500));

      if (upstream.status === 404) {
        continue;
      }

      clearTimeout(timeout);
      const hint =
        msg ||
        (upstream.status === 403
          ? 'Clave API inválida o sin permiso. Revisa GEMINI_API_KEY en .env y crea una nueva en Google AI Studio si hace falta.'
          : upstream.status === 429
            ? 'Cuota excedida o demasiadas peticiones. Espera un momento e inténtalo de nuevo.'
            : 'Revisa la consola del servidor (terminal) para más detalle.');

      return res.status(502).json({
        error: 'Error al consultar Gemini',
        hint: `(${upstream.status}) ${hint}`,
      });
    }

    clearTimeout(timeout);

    if (!upstream || !upstream.ok) {
      const hint = parseGeminiErrorText(lastErrText) || 'Ninguno de los modelos probados está disponible para tu cuenta.';
      return res.status(502).json({
        error: 'Error al consultar Gemini',
        hint: `Modelo probado: ${usedModel}. ${hint} Prueba GEMINI_MODEL=gemini-flash-latest en .env`,
      });
    }

    const data = await upstream.json();
    const blockReason = data?.promptFeedback?.blockReason;
    if (blockReason) {
      return res.status(502).json({
        error: 'Respuesta bloqueada',
        hint: `Gemini bloqueó la respuesta (${blockReason}). Prueba reformular la pregunta.`,
      });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') ||
      'Lo siento, no pude generar una respuesta. Intenta de nuevo.';

    res.json({ reply });
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Tiempo de espera agotado al consultar Gemini.' });
    }
    console.error('[chat] error', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// ----- Archivos estáticos (landing) -----
app.use(express.static(__dirname, {
  extensions: ['html'],
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  },
}));

// ----- Fallback: cualquier GET no resuelto sirve index.html -----
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ----- Arranque -----
app.listen(PORT, () => {
  console.log(`\nE-Sports Academy escuchando en http://localhost:${PORT}`);
  logKeyStatus();
});
