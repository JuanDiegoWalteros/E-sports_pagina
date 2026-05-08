# E-Sports Academy — Landing Page

Landing educativa de **E-Sports Academy**: HTML5, CSS3 y JavaScript **vanilla** (sin frameworks). Incluye un backend **Express** mínimo que expone `POST /api/chat` como **proxy seguro** hacia **Google Gemini**; la `GEMINI_API_KEY` solo existe en `.env` y **nunca** se envía al navegador.

## Requisitos

- **Node.js 18+** (usa `fetch` nativo en el servidor)

## Instalación

```bash
cd esports-landing
npm install
```

## Configuración (`.env`)

1. Abre `.env` en la raíz del proyecto (ya incluye un placeholder).
2. Sustituye `REEMPLAZA_CON_TU_KEY` por tu API key de [Google AI Studio](https://aistudio.google.com/app/apikey).
3. Opcional: ajusta `GEMINI_MODEL` (por defecto `gemini-1.5-flash`) o `PORT` (por defecto `3000`).
4. Reinicia el servidor tras cualquier cambio en `.env`.

Si la key no está configurada, el servidor muestra un aviso en consola y `/api/chat` responde **503**; la web sigue funcionando y el chatbot muestra un mensaje orientativo.

Puedes copiar la plantilla versionada desde `.env.example` si necesitas un archivo limpio.

## Ejecución

```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000).

Desarrollo con recarga del proceso de Node:

```bash
npm run dev
```

## Comprobaciones rápidas

- **Salud del servidor:** `GET /api/health` → `{ ok, chatbotEnabled, model }`.
- **Chat:** con la key configurada, el panel inferior derecho envía mensajes a `POST /api/chat`.

## Estructura del proyecto

```
esports-landing/
├── index.html              # Página principal (14 bloques de contenido + chat)
├── server.js               # Express + archivos estáticos + proxy Gemini
├── package.json
├── .env                    # API key (no versionar; está en .gitignore)
├── .env.example            # Plantilla
├── README.md
└── assets/
    ├── css/
    │   ├── styles.css      # Variables, reset, utilidades, componentes
    │   ├── sections.css    # Estilos por sección + chat + footer
    │   └── animations.css  # @keyframes
    ├── js/
    │   ├── main.js         # Nav, menú, reveal, contadores, formulario
    │   ├── chatbot.js      # Panel y llamada a /api/chat
    │   └── animations.js   # Typewriter + partículas (canvas)
    └── img/icons/          # Placeholder (.gitkeep); iconos en SVG inline en HTML
```

## Accesibilidad y rendimiento

- HTML semántico (`nav`, `main`, `section`, `footer`).
- Foco visible en enlaces, botones e inputs (`:focus-visible`).
- `prefers-reduced-motion`: desactiva animaciones agresivas (reveal, typewriter, partículas, flip de roles).
- Imágenes de instructores/juegos: **placeholders CSS** (sin assets externos).

## SEO

Meta `title`, `description`, `keywords` y Open Graph básicos están en `index.html`. Cuando publiques en producción, añade una URL absoluta en `og:image` y `link rel="canonical"`.

## Licencia

MIT (proyecto académico / demo).
