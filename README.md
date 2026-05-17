# Kuxipilli

Plataforma web de educación digital para madres, padres y tutores sobre prevención de riesgos digitales en niños de 6 a 12 años.

**Trabajo Terminal 2026-A097 · ESCOM · IPN**
Autores: Martínez López Gerardo Esteban / Núñez Martínez Miguel Ángel
Directora: Patricia Escamilla Miranda

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 19 · Vite 7 · TailwindCSS v4 · Framer Motion |
| Backend | Node.js 20 · Express 5 · Mongoose 9 |
| Base de datos | MongoDB Atlas |
| IA (chatbot) | Gemini 2.5 Flash → Groq llama-3.3-70b → reglas estáticas |
| Email | Resend API (primario) · Nodemailer/SMTP (fallback) |
| Despliegue | Netlify (frontend) · Render (backend) · Cloudflare (DNS) |

---

## Requisitos

- Node.js 20 o superior
- npm 10 o superior
- Cuenta en MongoDB Atlas (plan gratuito M0)
- Cuenta en Resend (plan gratuito)
- Clave de API de Google AI Studio (Gemini)
- Clave de API de Groq (opcional, fallback de IA)

---

## Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Tiboryeah/techaware-academy.git
cd techaware-academy
```

### 2. Configurar el backend

```bash
cd server
npm install
```

Crear `server/.env` con las siguientes variables:

```env
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<bd>
JWT_SECRET=<cadena_aleatoria_min_32_chars>
RESEND_API_KEY=re_<tu_clave>
EMAIL_FROM=no-reply@tudominio.com
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=<contraseña_de_aplicación>
GOOGLE_API_KEY=<tu_clave_gemini>
GROQ_API_KEY=<tu_clave_groq>
NODE_ENV=development
PORT=5000
ADMIN_EMAIL=admin@tudominio.com
```

Sembrar la base de datos:

```bash
npm run seed
```

Iniciar el servidor:

```bash
npm run dev
```

El backend queda disponible en `http://localhost:5000`. Verificar con `GET /api/health`.

### 3. Configurar el frontend

```bash
cd client
npm install
```

Crear `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Iniciar Vite:

```bash
npm run dev
```

El frontend queda disponible en `http://localhost:5173`.

---

## Scripts de seeds disponibles

```bash
npm run seed              # Todos los cursos + diagnóstico
npm run seed:games        # Curso Videojuegos (Roblox y Minecraft)
npm run seed:social       # Curso Redes Sociales (TikTok, Discord, Instagram)
npm run seed:streaming    # Curso Streaming (YouTube y Twitch)
npm run seed:content      # Casos reales y guías prácticas
```

---

## Despliegue en producción

### Backend — Render

- Root directory: `server`
- Build command: `npm install`
- Start command: `node src/index.js`
- Agregar todas las variables de `server/.env` en el panel de Render

### Frontend — Netlify

- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `client/dist`
- Variable de entorno: `VITE_API_URL=https://<tu-backend>.onrender.com`

El archivo `client/public/_redirects` ya está configurado para el enrutamiento SPA de Netlify.

---

## Estructura del proyecto

```
techaware-academy/
├── client/                  # Aplicación React (frontend)
│   ├── public/              # Assets estáticos (imágenes, banners, badges)
│   └── src/
│       ├── components/      # Componentes reutilizables (Layout, Chatbot, etc.)
│       ├── context/         # Contextos de React (Auth, Theme, Toast)
│       ├── pages/           # Páginas de la aplicación
│       ├── services/        # Cliente Axios
│       └── utils/           # Utilidades (lessonType, avatarUrl, lessonBanner)
└── server/                  # API REST (backend)
    └── src/
        ├── config/          # Conexión a MongoDB
        ├── middleware/       # Autenticación JWT, manejo de errores
        ├── models/          # Esquemas Mongoose (15 colecciones)
        ├── routes/          # Endpoints REST
        ├── scripts/         # Seeds y scripts de mantenimiento
        ├── services/        # Lógica de negocio (quiz, progreso, actividad)
        └── tests/           # Pruebas Jest + Supertest + MongoMemoryServer
```

---

## Pruebas automatizadas

```bash
cd server
npx jest --runInBand
```

Suites disponibles: `auth.test.js`, `quiz.test.js`, `chatbot.test.js` (15 casos en total).

---

## Variables de entorno requeridas

| Variable | Descripción |
|---|---|
| `MONGODB_URI` | Cadena de conexión a MongoDB Atlas |
| `JWT_SECRET` | Secreto para firmar tokens JWT |
| `RESEND_API_KEY` | Clave de Resend para envío de correos |
| `EMAIL_FROM` | Dirección de origen de los correos |
| `EMAIL_USER` | Correo Gmail para SMTP fallback |
| `EMAIL_PASS` | Contraseña de aplicación Gmail |
| `GOOGLE_API_KEY` | Clave de Google AI Studio (Gemini) |
| `GROQ_API_KEY` | Clave de Groq (fallback IA) |
| `ADMIN_EMAIL` | Correo que recibe notificaciones de reportes |
| `VITE_API_URL` | URL del backend (solo frontend) |
