
# E-Sports Academy – Chatbot Multilingüe con Inteligencia Artificial

## Descripción del Proyecto

**E-Sports Academy** es una aplicación web orientada a la gestión del conocimiento en el área de los deportes electrónicos. El proyecto presenta una landing page informativa sobre formación, entrenamiento competitivo, roles dentro de los e-sports y orientación para usuarios interesados en mejorar sus habilidades en videojuegos competitivos.

Como parte de la actividad académica, el proyecto integra un **chatbot multilingüe funcional**, capaz de interactuar con los usuarios en **español e inglés** mediante inteligencia artificial. El chatbot responde preguntas relacionadas con los cursos, el entrenamiento, los roles competitivos, la ética digital y la filosofía formativa del proyecto.

Además, el sistema incorpora la **Declaración Persona Transhumana** como elemento institucional, relacionándola con la autonomía, la responsabilidad, el desarrollo humano, la transformación positiva, el bienestar y la responsabilidad social dentro del contexto de los e-sports.

---

## Objetivo General

Diseñar e integrar un chatbot funcional dentro del proyecto web **E-Sports Academy**, permitiendo una comunicación básica con el usuario en español e inglés mediante una interfaz web conectada a un backend que consume un modelo de inteligencia artificial.

---

## Objetivo del Chatbot

El chatbot tiene como propósito orientar a los usuarios dentro de la plataforma, responder preguntas frecuentes sobre los cursos disponibles y acompañar el proceso de exploración del proyecto desde una perspectiva técnica, ética y formativa.

El asistente virtual permite:

* Responder preguntas sobre los cursos disponibles.
* Orientar al usuario según su nivel de experiencia.
* Explicar conceptos relacionados con los e-sports.
* Interactuar en español e inglés.
* Promover valores como autonomía, responsabilidad, ética y desarrollo personal.
* Integrar la Declaración Persona Transhumana dentro de la experiencia conversacional.

---

## Tecnologías Utilizadas

### Frontend

* **HTML5:** estructura principal de la página web.
* **CSS3:** estilos visuales, diseño responsive e interfaz del chatbot.
* **JavaScript Vanilla:** lógica del chatbot en el navegador, manejo de eventos y comunicación con el backend.

### Backend

* **Node.js:** entorno de ejecución para JavaScript del lado del servidor.
* **Express.js:** framework utilizado para crear el servidor web y definir rutas.
* **dotenv:** librería utilizada para manejar variables de entorno de forma segura.
* **Fetch API:** mecanismo de comunicación entre el frontend y el backend.

### Inteligencia Artificial

* **Google Gemini API:** modelo de inteligencia artificial utilizado para generar las respuestas del chatbot.
* **Prompt del sistema:** configuración que define el comportamiento, el idioma, el contexto y los límites del asistente.

### Control de Versiones

* **Git:** herramienta de control de versiones.
* **GitHub:** plataforma utilizada para alojar el repositorio público del proyecto.

---

## Arquitectura General

El proyecto utiliza una arquitectura cliente-servidor sencilla. El frontend se encarga de la interacción visual con el usuario, mientras que el backend funciona como intermediario seguro entre la interfaz web y el modelo de inteligencia artificial.

Usuario
↓
Interfaz Web
HTML + CSS + JavaScript
↓
chatbot.js
Captura el mensaje del usuario
↓
POST /api/chat
Comunicación con el backend
↓
Servidor Express
Node.js + Express
↓
Google Gemini API
Generación de respuesta con IA
↓
Respuesta del chatbot
Español o Inglés

Esta arquitectura permite proteger la clave de la API, ya que la comunicación con Gemini se realiza desde el backend y no directamente desde el navegador.

---

## Funcionamiento del Chatbot

El flujo de funcionamiento del chatbot es el siguiente:

1. El usuario abre la página web del proyecto.
2. El usuario interactúa con el botón o panel del chatbot.
3. El usuario escribe una pregunta en español o inglés.
4. El archivo JavaScript del frontend captura el mensaje.
5. El mensaje se envía al backend mediante una petición POST a la ruta /api/chat.
6. El servidor recibe el mensaje y lo procesa junto con el contexto del sistema.
7. El backend consume la API de Google Gemini utilizando una clave protegida mediante variables de entorno.
8. Gemini genera una respuesta contextual.
9. El servidor devuelve la respuesta al frontend.
10. El chatbot muestra la respuesta dentro de la interfaz web.

---

## Comunicación entre Frontend y Backend

La comunicación entre el frontend y el backend se realiza mediante una petición HTTP de tipo POST.

El frontend envía el mensaje del usuario al siguiente endpoint:

/api/chat

El backend recibe la información, valida el contenido y construye una solicitud hacia el modelo de inteligencia artificial.

Este diseño permite proteger la clave de API, debido a que la variable GEMINI_API_KEY se utiliza únicamente en el servidor y no se expone directamente en el navegador.

---

## Manejo de Idiomas

El chatbot está diseñado para responder en el mismo idioma utilizado por el usuario.

* Si el usuario escribe en **español**, el chatbot responde en español.
* Si el usuario escribe en **inglés**, el chatbot responde en inglés.

Este comportamiento se controla mediante el prompt del sistema definido en el backend, donde se especifica que el asistente debe identificar el idioma del mensaje y responder de forma coherente.

### Ejemplo en Español

**Usuario:** Hola, quiero empezar en los e-sports. ¿Qué curso me recomiendas?

**Chatbot:** Te recomiendo iniciar con un curso de fundamentos competitivos, donde puedas aprender conceptos básicos como roles, comunicación, toma de decisiones y entrenamiento progresivo.

### Example in English

**User:** Hi, I want to improve my competitive gaming skills. Which course do you recommend?

**Chatbot:** I recommend starting with a fundamentals course focused on competitive roles, strategy, communication, and consistent practice routines.

---

## Integración de la Declaración Persona Transhumana

El proyecto integra la siguiente declaración institucional:

> “Soy LIBRE, AUTÓNOMO Y RESPONSABLE a través del diálogo y la construcción, como ideal regulativo; me dirijo, controlo y dicto mis propias leyes.”

Esta declaración se incorpora dentro del chatbot como parte de su enfoque formativo y ético. Su integración permite relacionar el uso de la tecnología con el desarrollo humano, la autonomía, la toma de decisiones y la responsabilidad social.

Dentro del contexto de **E-Sports Academy**, la declaración se interpreta como una filosofía orientadora para formar jugadores más conscientes, disciplinados, responsables y capaces de tomar decisiones de manera autónoma dentro de entornos digitales competitivos.

---

## Relación con Desarrollo Humano y Ética

La integración de la Declaración Persona Transhumana no se limita a un mensaje visual, sino que también se conecta con la finalidad educativa del proyecto.

En los e-sports, el desarrollo de habilidades competitivas no depende únicamente de la capacidad técnica del jugador, sino también de aspectos humanos como:

* Autonomía.
* Disciplina.
* Pensamiento crítico.
* Responsabilidad individual.
* Comunicación respetuosa.
* Trabajo en equipo.
* Bienestar emocional.
* Transformación positiva.
* Ética en entornos digitales.
* Responsabilidad social dentro de comunidades virtuales.

De esta manera, el chatbot no solo cumple una función informativa, sino también reflexiva, promoviendo una visión más integral del aprendizaje, la tecnología y el desarrollo personal.

---

## Formas de Integración de la Declaración en el Proyecto

La Declaración Persona Transhumana puede evidenciarse dentro del proyecto mediante:

* Mensaje inicial del chatbot.
* Respuestas contextuales relacionadas con ética, autonomía y responsabilidad.
* Filosofía orientadora del asistente virtual.
* Relación entre formación competitiva y desarrollo personal.
* Componente reflexivo dentro de la experiencia conversacional.
* Elemento institucional dentro de la interfaz del chatbot.

---

## Estructura del Proyecto

E-sports_pagina/
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   │
│   ├── js/
│   │   └── chatbot.js
│   │
│   └── img/
│       └── recursos gráficos del proyecto
│
├── index.html
├── server.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md

---

## Variables de Entorno Necesarias

Para ejecutar correctamente el proyecto, es necesario crear un archivo llamado **.env** en la raíz del proyecto.

Este archivo debe contener las siguientes variables:

GEMINI_API_KEY=TU_API_KEY_DE_GOOGLE_GEMINI
GEMINI_MODEL=gemini-flash-latest
PORT=3000

### Descripción de las Variables

| Variable       | Descripción                                                    |
| -------------- | -------------------------------------------------------------- |
| GEMINI_API_KEY | Clave privada utilizada para consumir la API de Google Gemini. |
| GEMINI_MODEL   | Modelo de inteligencia artificial utilizado por el chatbot.    |
| PORT           | Puerto donde se ejecuta el servidor local.                     |

**Importante:** el archivo **.env** no debe subirse al repositorio, ya que contiene información privada. Este archivo debe estar incluido en **.gitignore**.

---

## Archivo .env.example

El proyecto también debe incluir un archivo llamado **.env.example**.

Este archivo sirve como guía para que otros usuarios conozcan qué variables deben configurar, pero sin exponer claves privadas.

El archivo **.env.example** debe contener lo siguiente:

GEMINI_API_KEY=REEMPLAZA_CON_TU_API_KEY
GEMINI_MODEL=gemini-flash-latest
PORT=3000

**Nota:** el archivo **.env.example** sí puede subirse al repositorio, porque no contiene credenciales reales.

---

## Instrucciones de Ejecución

### 1. Clonar el Repositorio

git clone [https://github.com/JuanDiegoWalteros/E-sports_pagina.git](https://github.com/JuanDiegoWalteros/E-sports_pagina.git)

### 2. Ingresar a la Carpeta del Proyecto

cd E-sports_pagina

### 3. Instalar Dependencias

npm install

### 4. Crear el Archivo .env

Crear un archivo llamado **.env** en la raíz del proyecto y agregar las variables necesarias:

GEMINI_API_KEY=TU_API_KEY_DE_GOOGLE_GEMINI
GEMINI_MODEL=gemini-flash-latest
PORT=3000

### 5. Ejecutar el Servidor

npm start

En caso de que el proyecto no tenga configurado el script start, se puede ejecutar con:

node server.js

### 6. Abrir el Proyecto en el Navegador

Una vez iniciado el servidor, abrir el navegador en:

[http://localhost:3000](http://localhost:3000)

---

## Pruebas de Funcionamiento

Para verificar que el chatbot funciona correctamente, se pueden realizar las siguientes pruebas:

### Prueba 1: Conversación en Español

**Mensaje de prueba:**

Hola, quiero aprender sobre e-sports. ¿Qué curso me recomiendas?

**Resultado esperado:**

El chatbot responde en español y recomienda un curso relacionado con fundamentos, entrenamiento competitivo o roles dentro de los e-sports.

### Prueba 2: Conversación en Inglés

**Test message:**

Hi, I want to improve my competitive gaming skills. What course do you recommend?

**Expected result:**

The chatbot answers in English and recommends a course based on the user's interest.

### Prueba 3: Declaración Persona Transhumana

**Mensaje de prueba:**

¿Qué significa ser libre, autónomo y responsable en los e-sports?

**Resultado esperado:**

El chatbot relaciona la declaración institucional con autonomía, ética, disciplina, responsabilidad y desarrollo personal.

### Prueba 4: Ethical Reflection in English

**Test message:**

How is autonomy related to competitive gaming?

**Expected result:**

The chatbot explains autonomy, responsibility, decision-making, and positive transformation in the context of e-sports.

---

## Evidencia de Funcionamiento Bilingüe

El chatbot demuestra su funcionamiento bilingüe al responder correctamente en español e inglés según el idioma utilizado por el usuario.

Esta característica permite que la aplicación sea más accesible y se adapte a diferentes usuarios, fortaleciendo la experiencia dentro del proyecto web.

---

## Seguridad y Buenas Prácticas

El proyecto implementa buenas prácticas básicas de seguridad, especialmente en el manejo de la API Key.

* La clave de Gemini se almacena en un archivo .env.
* El archivo .env debe estar incluido en .gitignore.
* El frontend no accede directamente a la API Key.
* El backend funciona como intermediario seguro.
* Las dependencias se administran mediante npm.
* El repositorio incluye documentación técnica para facilitar la ejecución del proyecto.

---

## Código Principal del Chatbot

La lógica principal del chatbot se divide en dos partes: frontend y backend.

### Frontend

El archivo **chatbot.js** se encarga de:

* Capturar el mensaje ingresado por el usuario.
* Mostrar el mensaje dentro de la interfaz.
* Enviar la información al backend.
* Recibir la respuesta generada por la IA.
* Mostrar la respuesta dentro del panel del chatbot.

### Backend

El archivo **server.js** se encarga de:

* Crear el servidor con Express.
* Servir los archivos estáticos del proyecto.
* Recibir peticiones en la ruta /api/chat.
* Proteger la API Key mediante variables de entorno.
* Construir el prompt del sistema.
* Consumir el modelo de Google Gemini.
* Retornar la respuesta generada al frontend.

---

## Entregables del Proyecto

| Entregable                                        | Estado                |
| ------------------------------------------------- | --------------------- |
| Link del repositorio público de GitHub            | Completado            |
| Código fuente completo                            | Completado            |
| Proyecto funcional                                | Completado            |
| README técnico                                    | Completado            |
| Chatbot integrado en la web                       | Completado            |
| Funcionamiento en español                         | Completado            |
| Funcionamiento en inglés                          | Completado            |
| Integración de la Declaración Persona Transhumana | Completado            |
| Video explicativo en inglés                       | Pendiente de adjuntar |

---

## Video Explicativo

El video explicativo debe realizarse completamente en inglés y debe incluir:

1. Presentación personal.
2. Nombre del proyecto.
3. Objetivo del chatbot.
4. Arquitectura general de la solución.
5. Tecnologías utilizadas.
6. Flujo de funcionamiento del chatbot.
7. Comunicación frontend/backend.
8. Consumo de la API de inteligencia artificial.
9. Manejo de idiomas.
10. Explicación del código principal.
11. Demostración en español.
12. Demostración en inglés.
13. Evidencia de integración de la Declaración Persona Transhumana.

---

## Autor

Proyecto desarrollado por:

**Juan Diego Walteros Cortes**

Actividad académica sobre implementación de chatbot multilingüe en un proyecto web de Gestión del Conocimiento.

---

## Conclusión

El proyecto **E-Sports Academy** demuestra la integración funcional de un chatbot multilingüe dentro de una aplicación web, utilizando tecnologías modernas como Node.js, Express, JavaScript y Google Gemini.

La solución permite evidenciar conocimientos técnicos sobre arquitectura web, consumo de APIs, manejo de variables de entorno, interacción frontend/backend e integración de inteligencia artificial.

Además, el proyecto incorpora una dimensión ética y formativa mediante la Declaración Persona Transhumana, promoviendo valores como autonomía, responsabilidad, desarrollo humano, bienestar y transformación positiva dentro del contexto de los e-sports.
