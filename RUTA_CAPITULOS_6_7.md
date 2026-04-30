# RUTA DE CONTENIDO — Capítulos 6 y 7
## Reporte Técnico TT 2026-A097 | Kuxipilli

> Este archivo define exactamente qué va en cada sección antes de redactarla.
> [x] = texto redactado y listo para pegar | [ ] = pendiente de redactar

---

## CAPÍTULO 6: IMPLEMENTACIÓN DEL SISTEMA

### 6.1 Configuración del entorno de desarrollo
- [x] Stack de herramientas: VS Code, Node.js, MongoDB Compass, Postman, GitHub
- [x] Estructura de repositorio: monorepo `/client` + `/server`, archivo `.env`, `.gitignore`
- [x] Variables de entorno necesarias: MONGO_URI, JWT_SECRET, GEMINI_API_KEY, GROQ_API_KEY,
      EMAIL_USER, EMAIL_PASS, RESEND_API_KEY, ALLOWED_ORIGINS, NODE_ENV
- [x] Comandos de arranque: `npm run dev` (server con --watch), `npm run dev` (Vite client)
- [x] Despliegue configurado: Netlify (frontend) + Render (backend) + MongoDB Atlas

---

### 6.2 Implementación del backend

#### 6.2 (intro)
- [x] Párrafo introductorio del backend: stack, modelo de capas, lista de subsecciones

#### 6.2.1 Servidor Express y middleware de seguridad
- [x] `server/src/index.js`: configuración de Express 5, CORS whitelist desde .env,
      Helmet, rate limiting diferenciado (100 req/15min producción, 1000/min desarrollo),
      registro de rutas API, middleware de error global
- [x] Decisión de diseño: rate limit relajado en desarrollo para no bloquear pruebas manuales

#### 6.2.2 Módulo de autenticación (`auth.routes.js`)
- [x] POST /register: validación de campos, creación de usuario no verificado,
      generación de código 6 dígitos, envío por correo
- [x] POST /verify: búsqueda por email+código, marcar isVerified=true, limpiar token
- [x] POST /resend-verification: regenerar código y reenviar
- [x] POST /login: verificar isVerified, comparar bcrypt, emitir JWT
- [x] POST /forgot-password: generar código reset, hash SHA-256, expiración 10 min
- [x] POST /reset-with-code: validar hash, cambiar contraseña
- [x] PUT /update-profile: Multer memoryStorage + Sharp (JPEG 200×200, 70% calidad) → Base64
- [x] GET /profile, PUT /update-password

#### 6.2.3 Módulo de contenido educativo (`content.routes.js`)
- [x] GET /api/content/courses: listar cursos publicados con virtual `modules`
- [x] GET /api/content/courses/:id: detalle con módulos y lecciones populadas
- [x] GET /api/content/lessons/:id: lección individual
- [x] Estructura de cursos: 3 cursos × hasta 7 módulos cada uno
- [x] Decisión de diseño: `courseId` denormalizado en Lesson para consultas directas
- [!] AGREGAR: GET /api/content/latest-update — endpoint de novedad dinámica para el dashboard

#### 6.2.4 Motor de evaluación (`quiz.routes.js` + `quizService.js`)
- [x] GET /api/quiz/:id: obtener quiz con preguntas mezcladas (shuffleArray en backend)
- [x] POST /api/quiz/:id/submit: motor de calificación en `quizService.js`
- [x] 10 tipos de pregunta con lógica de corrección diferenciada
- [x] Cálculo de score: round((weighted/total) × 100)
- [x] Cálculo de riskLevel: Alto (<50%), Medio (50-79%), Bajo (≥80%)
- [x] Registro de errorsByArea y errorsByPlatform
- [x] Sistema de lecciones guiadas con puntuación por criterios

#### 6.2.5 Sistema de progreso (`progress.routes.js` + `progressService.js`)
- [x] POST /api/progress/lesson/:lessonId/complete: $addToSet idempotente + upsert
- [x] GET /api/progress/course/:courseId: estado por curso
- [x] GET /api/progress/summary/all: resumen global con actividad reciente y diagnóstico
- [x] GET /api/progress/next-step: siguiente lección o quiz pendiente
- [x] Índice único {userId, courseId} en Progress

#### 6.2.6 Chatbot Kuxibot (`chatbot.routes.js`)
- [x] Cadena de fallback: Gemini (4 modelos en cascada) → Groq → 16 reglas estáticas
- [x] System Instruction, anonimización PII, historial 10 mensajes, mock mode

#### 6.2.7 Sistema de reportes de incidentes (`report.routes.js`)
- [x] POST /api/reports/submit: rate limit 3/hora + cooldown 10min en BD
- [x] Modelo CaseReport con 4 tipos de mensaje y campos enriquecidos
- [x] Notificación HTML por correo al administrador

#### 6.2.8 Módulo de recursos editoriales (`resource.routes.js`)
- [x] GET /api/resources: paginación (default 9), filtro por type
- [x] GET /api/resources/:slug: detalle por slug
- [x] Modelo Resource con subdocumentos: timeline[], details, tips[], steps[]

#### 6.2.9 Sistema de seed de contenido
- [x] seed.js (completo) / seed-target.js (por objetivo con aliases)
- [x] Comandos npm: seed, seed:games, seed:social, seed:streaming, seed:diagnostic, seed:content
- [x] Proceso idempotente con helpers getOrCreate por campo natural
- [x] getOrCreateQuiz elimina y recrea preguntas en cada sync
- [!] AGREGAR: correcciones de calidad de exámenes (multiple_selection, categorize, match_columns), mini glosarios, imágenes en artículos Redes Sociales

---

### 6.3 Implementación del frontend

#### 6.3.1 Arquitectura de la SPA
- [x] Vite + React 19, React Router DOM v7, contextos globales, ProtectedRoute, Layout

#### 6.3.2 Flujo de autenticación (UI)
- [x] Register → VerifyAccount → Login; ForgotPassword → ResetPassword

#### 6.3.3 Dashboard (Panel personal)
- [x] Saludo personalizado, tarjetas de resumen, feed de actividad, medidor SVG animado, PDF jsPDF
- [!] ACTUALIZAR: certificado ahora usa html2canvas+jsPDF; agregar tarjeta novedad dinámica y 4 fetches paralelos

#### 6.3.4 Visor de cursos y lecciones
- [x] CourseDetail (plan de estudios, progreso, examen final), LessonView (renderer Markdown, video YouTube, marcado automático al abrir)
- [!] ACTUALIZAR: agregar scroll-to-lesson al volver al curso (state + requestAnimationFrame + scrollIntoView)

#### 6.3.5 Sistema de evaluación (QuizTaker)
- [x] 10 tipos de pregunta renderizados, modo revisión, lecciones guiadas por pregunta fallida

#### 6.3.6 Chatbot Kuxibot (UI)
- [x] Widget flotante, burbujas, typing indicator, altura limitada al viewport, aviso de precisión

#### 6.3.7 Casos y guías (`RealCases`, `CaseDetail`)
- [x] Tabs por URL param, paginación incremental, CaseDetail con timeline y tips

#### 6.3.8 Perfil de usuario
- [x] Editar nombre/avatar con touch crop (drag + pinch), canvas 600px → FormData → Sharp, cambio de contraseña con toggles

---

### 6.4 Decisiones de arquitectura y cambios respecto al diseño original

| # | Decisión / Cambio | Razón | Commit de referencia |
|---|---|---|---|
| 1 | Verificación por código 6 dígitos en lugar de enlace | UX más simple; evita problemas con clientes de correo que bloquean links | 70e02b9 |
| 2 | Resend API como proveedor primario de email | SMTP Gmail tenía timeouts frecuentes (>5s) en producción | 190491b |
| 3 | Cadena Gemini→Groq→estático | Gemini 2.0 Flash deprecado; rate limits agresivos en plan gratuito | 31395bd |
| 4 | Avatar en Base64 MongoDB en lugar de /uploads/ local | Redespliegue en Render borraba archivos estáticos | 4da73b2 |
| 5 | Sharp para compresión antes de guardar | Avatar de 2MB en Base64 superaba el límite de documento de MongoDB (16MB) | 4da73b2 |
| 6 | shuffleArray en backend + IDs originales | Shuffle en frontend generaba IDs nuevas que no coincidían con la BD | 449177d |
| 7 | minPassing default 80% | Alineación con criterios académicos del reporte | (actual) |
| 8 | 6 módulos (videojuegos/streaming) y 7 módulos (redes sociales) | Mayor profundidad temática identificada durante desarrollo del contenido | seed refactors |
| 9 | Rutas en español (/cursos, /panel, etc.) | Coherencia con el público objetivo hispanohablante | ae2ebcd |
| 10 | ActivityLog con idempotencia por uniqueKey | Prevenir duplicados al completar lección y refrescar página simultáneamente | fix_activitylog_index |
| 11 | Rate limit diferenciado dev/prod | Rate limit estricto en dev bloqueaba flujos de prueba manuales | index.js |

---

### 6.5 Scripts de mantenimiento y migración de base de datos

Documentar cada script de operación creado durante el desarrollo:

| Script | Propósito | Cuándo se usó |
|---|---|---|
| `seed.js` / `seed-target.js` | Poblar BD con contenido curricular | Cada ciclo de re-seed |
| `backup_db.js` | Snapshot de colecciones antes de re-seed | Previo a cambios destructivos |
| `cleanup_courses.js` | Eliminar estructura antigua de módulos separados | Refactorización a módulos dentro de curso |
| `remove_duplicate_streaming.js` | Eliminar curso duplicado por doble ejecución del seed | Bug de idempotencia en seed |
| `delete_clone.js` | Eliminar clon de curso por ID específico | Variante de remove_duplicate |
| `fix_attempts.js` | Reasignar intentos huérfanos al quiz de diagnóstico nuevo | Tras re-seed que cambia IDs |
| `fix_activitylog_index.js` | Eliminar índice unique legacy, recrear índice parcial | Bug de duplicados en ActivityLog |
| `fix_videos.js` | Corregir videoUrl erróneas en módulos de Redes Sociales | Error en datos del seed |
| `migrate_users.js` | Actualizar campos de usuarios existentes al nuevo esquema | Cambio de schema en User |
| `restore_progress.js` (v1-v3) | Reconstruir Progress tras cambio de IDs por re-seed | Pérdida de progreso de usuarios |
| `sync_progress.js` | Sincronizar progreso calculando desde cero con IDs actuales | Verificación de integridad |
| `audit_orphans.js` / `clean_orphans.js` | Detectar y eliminar documentos huérfanos | Mantenimiento periódico |
| `clean_progress.js` | Limpiar registros de progreso inconsistentes | Tras migraciones complejas |

---

## CAPÍTULO 7: PRUEBAS

### 7.1 Estrategia de pruebas

- [ ] Enfoque mixto: pruebas automatizadas (Jest + Supertest + MongoMemoryServer) para
      lógica crítica del backend; pruebas manuales para flujos de UI y experiencia de usuario
- [ ] Herramientas: Jest 30, Supertest 7, mongodb-memory-server 11 (sin depender de Atlas)
- [ ] Entorno de pruebas: BD en memoria descartable por suite, sin efectos secundarios
- [ ] Cobertura: 3 suites automatizadas (auth, quiz, chatbot) + pruebas manuales por módulo

---

### 7.2 Pruebas unitarias e integración (automatizadas)

#### 7.2.1 Suite: Autenticación (`auth.test.js`)
- [ ] Caso 1 — Registro exitoso: POST /register devuelve 201 y mensaje de verificación;
      usuario creado en BD con isVerified=false
- [ ] Caso 2 — Login bloqueado sin verificar: POST /login devuelve 401 con mensaje
      "verifique su correo"
- [ ] Caso 3 — Verificación exitosa: GET /verify/:token actualiza isVerified=true
- [ ] Nota: este test fue escrito cuando la verificación era por enlace (GET con token en URL);
      en producción se cambió a POST /verify con código en body; el test refleja la versión
      anterior — pendiente actualizar test al mecanismo actual

#### 7.2.2 Suite: Motor de evaluación (`quiz.test.js`)
- [ ] Caso 1 — Cálculo de errores por área y plataforma (US08): submit con respuestas
      erróneas verifica errorsByArea y errorsByPlatform en el attempt guardado
- [ ] Caso 2 — Ocultamiento de detalles para quiz de acreditación: scope='course'
      devuelve questionDetails vacío
- [ ] Caso 3 — Lecciones guiadas para diagnóstico: respuesta incorrecta adjunta
      lecciones relacionadas por riskArea+platform
- [ ] Caso 4 — Lecciones guiadas por módulo: usa campo `teaches` de lecciones del
      mismo módulo para guiar el repaso (fill_blanks + módulo específico)

#### 7.2.3 Suite: Chatbot (`chatbot.test.js`)
- [ ] Caso 1 — Resiliencia con mock/sin API key: USE_MOCK_AI=true devuelve respuesta
      de fallback estático para "grooming"; persiste Conversation y Message en BD
- [ ] Caso 2 — Persistencia del historial (RF12): 2 mensajes en misma conversación
      generan ≥2 registros en messages
- [ ] Caso 3 — Respuesta a temas de seguridad: "hola" → respuesta contiene "seguridad digital"

---

### 7.3 Pruebas manuales de integración (Postman + BD)

- [ ] Documentar colección Postman usada durante desarrollo (endpoints probados)
- [ ] Flujo completo de registro → verificación → login → acceso protegido
- [ ] Flujo de olvido de contraseña: correo → código → reset → login con nueva contraseña
- [ ] Envío de reporte con token válido: `test-auth-report.js` confirmó que endpoint
      /api/reports/submit requiere token JWT y persiste en casereports
- [ ] Prueba de conexión SMTP: `test-email.js` validó credenciales Gmail y envío básico
- [ ] Prueba de Resend API: `test-sendEmail.js` validó función `sendEmail` completa
      (con fallback a SMTP cuando Resend falla)
- [ ] Prueba de lógica de diagnóstico: `test_api_logic.js` verificó que el último intento
      diagnóstico se recupera correctamente por userId
- [ ] Prueba de actividad reciente: `test_recent_activity.js` verificó populate de quizId
      en attempts con proyección de campos
- [ ] Prueba de login con bcrypt: `test_login.js` confirmó que hash almacenado coincide
      con contraseña ingresada manualmente
- [ ] Verificación de conexión a Atlas: `test_db.js` y `check_db.js` (local y raíz)
- [ ] Health check: `health_check.js` verificó disponibilidad del servidor en puertos 3000/5000
- [ ] Integridad de contenido: `check_lesson_count.js`, `check_integrity.js`,
      `check_progress_integrity.js`, `check_social_course.js`, `check_streaming_course.js`

---

### 7.4 Pruebas de seguridad

- [ ] Validación de inputs en todos los endpoints: campos requeridos, longitudes,
      formatos (email, contraseña ≥8 chars)
- [ ] JWT obligatorio en rutas protegidas: petición sin token devuelve 401
- [ ] Rate limiting: >100 peticiones/15min desde misma IP devuelven 429 en producción
- [ ] CORS: origen no listado en ALLOWED_ORIGINS devuelve error de CORS
- [ ] Prevención de enumeración de usuarios: register con email duplicado devuelve mensaje
      genérico, no expone existencia
- [ ] Contraseñas nunca expuestas: campo passHash excluido de todas las respuestas JSON
- [ ] Anonimización en chatbot: emails y teléfonos reemplazados antes de enviar a IA

---

### 7.5 Pruebas de rendimiento

- [ ] Tiempo de respuesta del chatbot: medido en desarrollo local con Gemini 2.5 Flash
      (promedio <1.5s), con Groq (~0.8s), con estático (<50ms)
- [ ] Carga de cursos con módulos y lecciones populadas: tiempo promedio <400ms (Atlas)
- [!] Generación de PDF de certificado: ~1-2s en cliente (html2canvas+jsPDF; antes <200ms con jsPDF puro) — ACTUALIZAR
- [ ] Carga de avatar: antes de Sharp (~1.5s para imagen 2MB), después de Sharp (<200ms)

---

### 7.6 Pruebas de usabilidad

- [ ] Flujo completo recorrido en dispositivos: escritorio (Chrome, Firefox), móvil (iOS Safari,
      Android Chrome)
- [ ] Verificación responsive: Tailwind breakpoints sm/md/lg probados en DevTools
- [ ] Problema detectado: en pantallas 13" (laptop), el chatbot desbordaba la pantalla →
      corrección con `max-h-[calc(100vh-...)]` (commit 83288fe)
- [ ] Problema detectado: crop táctil de avatar no respondía en iOS →
      corrección con pointer events (commit 31395bd)
- [ ] Navegación con teclado: formularios tienen orden de tabulación lógico

---

### 7.7 Resultados de las pruebas automatizadas

- [ ] Tabla de resultados: suite / # casos / pasados / fallidos / notas
- [ ] Evidencia: captura de `jest --coverage` (o resultado de `npm test`)
- [ ] Métricas de cobertura por módulo (porcentaje de funciones cubiertas)
- [ ] Casos pendientes de actualizar (auth.test.js refleja flujo de enlace antiguo)

---

### 7.8 Incidencias documentadas y resolución

Tabla de bugs encontrados durante TT2:

| ID | Descripción del bug | Módulo | Causa raíz | Solución aplicada | Commit |
|---|---|---|---|---|---|
| B01 | SMTP Gmail con timeout >10s | Email | Red restrictiva en producción | Agregar timeout 5s; migrar a Resend | 6ebbafe, 190491b |
| B02 | Avatar perdido en redespliegue | Perfil | Render borra /uploads/ en cada deploy | Migrar a Base64 en MongoDB | 4da73b2 |
| B03 | Respuestas de quiz inválidas | Evaluación | Shuffle regeneraba IDs de opciones | Shuffle solo en presentación | 449177d |
| B04 | Duplicado de curso Streaming | Seed | Seed no era idempotente | remove_duplicate_streaming.js | — |
| B05 | Progreso perdido tras re-seed | Progreso | IDs de módulos cambian en cada seed | restore_progress v1/v2/v3 | — |
| B06 | Error 11000 en ActivityLog | BD | Índice único sin filtro parcial | fix_activitylog_index.js | — |
| B07 | Pantalla en blanco en ForgotPassword | Frontend | Crash por modelo Gemini deprecado | Try/catch granular + modelo actualizado | 1e50a6a |
| B08 | Chatbot desbordaba en laptop 13" | UI | Altura fija sin límite de viewport | max-h calculado con CSS custom | 83288fe |
| B09 | fill_blanks fallaba con mayúsculas | Evaluación | Comparación case-sensitive | toLowerCase() + trim() en quizService | — |
| B10 | Imágenes Base64 rotas en frontend | UI | Prefijo data: faltante | avatarUrl.js normaliza prefijo | 22204fd |
| B11 | Rutas SPA mostraban 404 en Netlify | Despliegue | Netlify no redirigía a index.html | _redirects + netlify.toml | db6b970 |
| B12 | Intentos huérfanos tras re-seed | BD | quizIds obsoletos en attempts | fix_attempts.js reasigna al nuevo diag | — |

---

## ORDEN DE REDACCIÓN SUGERIDO

1. §6.4 primero (tabla de decisiones clave — da contexto a todo lo demás)
2. §6.2.1 → §6.2.2 → §6.2.4 (backend core)
3. §6.3.1 → §6.3.2 → §6.3.5 (frontend core)
4. §6.2.6 (chatbot — sección más rica en detalles)
5. §6.5 (scripts — documenta la historia operacional)
6. §6.2.3, §6.2.5, §6.2.7, §6.2.8, §6.3.3, §6.3.4, §6.3.6, §6.3.7, §6.3.8
7. §7.2 (pruebas automatizadas — tienen código concreto que citar)
8. §7.3 (pruebas manuales)
9. §7.4 → §7.5 → §7.6 (seguridad, rendimiento, usabilidad)
10. §7.7 → §7.8 (resultados e incidencias — cierra el capítulo)

---

*Archivo generado: 2026-04-21 | Basado en análisis de 70+ archivos del repositorio y git history completo*

---

## CORRECCIONES PENDIENTES EN EL REPORTE TÉCNICO
### (cambios de código realizados en sesiones 2026-04-28 al 2026-04-30)

> Cada ítem indica: qué sección del Word debe corregirse, qué dice actualmente y qué debe decir.

---

### §6.3.3 — Dashboard (Panel personal)

**Texto actual:**
> "PDF jsPDF"

**Debe decir:**
> Certificado generado client-side mediante `html2canvas` + `jsPDF`. La función `generateCertificate` (async) construye un div HTML oculto con el diseño del certificado, lo captura con `html2canvas` a escala 2× y lo inserta como imagen PNG en el PDF mediante `jsPDF`. El logo se pre-procesa en un canvas offscreen con `ctx.arc()` + `ctx.clip()` para garantizar recorte circular, ya que `html2canvas` no aplica correctamente `overflow:hidden` con `border-radius`.

**Agregar también:**
> El dashboard consume cuatro peticiones paralelas al cargar: resumen de progreso, lista de cursos, última recomendación pendiente (`/api/quiz/my-recommendations`) y última novedad publicada (`/api/content/latest-update`). La tarjeta "Novedad" muestra el artículo, guía o caso más reciente y navega al recurso correspondiente.

---

### §6.3.4 — Visor de cursos y lecciones

**Agregar al párrafo de CourseDetail/LessonView:**
> Al presionar "Volver al curso" desde una lección, `LessonView` envía `state={{ scrollToLessonId: lesson._id }}` mediante `react-router`. `CourseDetail` espera a que termine la carga y utiliza `requestAnimationFrame` + `scrollIntoView({ behavior: 'auto', block: 'center' })` para posicionar la vista sobre la tarjeta de la lección que se estaba viendo, evitando que el usuario pierda su lugar en el plan de estudios.

---

### §6.2.3 — Módulo de contenido educativo

**Agregar endpoint faltante en la tabla:**
> `GET /api/content/latest-update` — compara el documento más reciente entre lecciones tipo `article`/`guide` y recursos tipo `case`/`guide`; devuelve `{ label, title, description, href, createdAt }` para la tarjeta dinámica del dashboard.

---

### §6.2.4 — Motor de evaluación

**Actualizar párrafo de lecciones guiadas:**
> Las recomendaciones post-examen se calculan desde las **preguntas falladas concretas**, no desde áreas o plataformas agregadas del módulo completo. `saveRecommendation()` recibe `questionDetails` e identifica las lecciones más relevantes por coincidencia de `riskArea`, `platform` y `teaches`. Si el usuario vuelve a presentar el mismo quiz y lo acredita, las recomendaciones del intento anterior se eliminan automáticamente. El examen final de curso (`scope: 'course'`) no genera recomendaciones ni desglose por pregunta.

---

### §6.2.9 — Sistema de seed de contenido

**Agregar párrafo sobre calidad del contenido:**
> Durante el desarrollo se aplicaron correcciones sistemáticas al contenido de los tres cursos:
> - **Exámenes de módulo:** `multiple_selection` limitado a máximo 3–4 respuestas correctas de 5–6 opciones; `categorize` balanceado en distribución 3+3+3 o 2+3+2; `match_columns` con ítems referenciando elementos nombrados exclusivos de cada plataforma para evitar ambigüedad.
> - **Mini glosarios para padres:** agregados en artículos clave de los tres cursos para explicar términos técnicos (streamer, grooming, For You Page, Realms, Robux, etc.) en lenguaje cotidiano.
> - **Corrección conceptual Streaming M1:** YouTube se describe como plataforma de videos para ver cuando se quiera (con transmisiones en vivo posibles); Twitch como plataforma de directos (con grabaciones y fragmentos disponibles). Se eliminaron términos `VOD`, `clips`, `a demanda`.
> - **Imágenes en artículos:** el curso de Redes Sociales reemplazó tablas extensas por imágenes explicativas alojadas en `client/public/article-images/redes-sociales/` y servidas desde Netlify CDN. MongoDB almacena la referencia (ruta relativa en el markdown), no el binario.

---

### §6.4 — Decisiones de arquitectura

**Agregar dos filas nuevas a la tabla de DA:**

| # | Decisión / Cambio | Razón | Commit de referencia |
|---|---|---|---|
| 12 | Imágenes de artículos en Netlify estático (`client/public/`) | Render destruye archivos en redespliegue (DA04); MongoDB no está diseñado para binarios (límite 16MB/doc); imágenes atadas al seed → son contenido estático del código | 5355948 |
| 13 | Certificado PDF via html2canvas + jsPDF en lugar de jsPDF puro | jsPDF puro no soporta caracteres unicode, produce texto con espaciado irregular y no permite CSS real; html2canvas captura HTML/CSS con fidelidad total | 5355948 |

---

### §7.5 — Pruebas de rendimiento

**Texto actual:**
> "Generación de PDF de certificado: <200ms en cliente (jsPDF sin llamada al servidor)"

**Debe decir:**
> Generación de PDF de certificado: ~1–2 s en cliente (html2canvas captura el DOM y jsPDF inserta la imagen; no requiere llamada al servidor). El incremento respecto a jsPDF puro (<200ms) es aceptable dado que la operación es puntual y no afecta el flujo principal de la aplicación.

---

### §7.8 — Incidencias documentadas

**Agregar bug:**

| ID | Descripción | Módulo | Causa raíz | Solución | Commit |
|---|---|---|---|---|---|
| B13 | Certificado PDF con caracteres corruptos y texto desalineado | Frontend | jsPDF no soporta unicode ni CSS; coordenadas absolutas generaban huecos | Reemplazar jsPDF puro por html2canvas + jsPDF; diseño en HTML/CSS | 5355948 |
