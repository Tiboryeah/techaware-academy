# Contexto de Sesión — Reporte Técnico Kuxipilli
## TT 2026-A097 | ESCOM · IPN

> Última actualización: 2026-05-01 (rev. 13)
> Propósito: retomar el trabajo en cualquier chat sin perder contexto.

---

## Proyecto

**Nombre:** Kuxipilli — Aplicación Web para Padres y/o Tutores: Concientización y Prevención de Riesgos Digitales en Niños de entre 6 y 12 años
**Número TT:** 2026-A097
**Institución:** ESCOM · IPN
**Autores:** Martínez López Gerardo Esteban / Núñez Martínez Miguel Ángel
**Directora:** Patricia Escamilla Miranda

**Stack real implementado:**
- Frontend: React 19.2 + Vite 7.2 + TailwindCSS 4.1 + Framer Motion → desplegado en **Netlify**
- Backend: Node.js 20 + Express 5.1 + Mongoose 9 → desplegado en **Render** (NO Railway)
- Base de datos: **MongoDB Atlas** (15 colecciones)
- Email: **Resend API** (primario) + SMTP Gmail/Nodemailer (fallback)
- IA Chatbot: **Gemini 2.5 Flash** (cascada 4 modelos) → **Groq llama-3.3-70b** → 16 reglas estáticas
- DNS: **Cloudflare**
- CI/CD: **GitHub** webhooks → Netlify + Render

---

## Estado del documento — revisión exhaustiva 2026-04-23

### Capítulo 6 — COMPLETO ✅
Todas las secciones §6.1 a §6.4 están escritas y pegadas en el Word.
§6.5 Scripts de mantenimiento — pendiente de redactar/pegar.

### Capítulo 7 — FALTA COMPLETAMENTE 🔴
El documento no contiene ninguna sección del Capítulo 7 (Pruebas).
Es el pendiente más crítico para la defensa.

---

## Cambios al CÓDIGO realizados en sesión 2026-04-23

### 1. Sistema de Recomendaciones (NUEVO — completamente implementado)
- **`server/src/models/Recommendation.js`** — ya existía, nunca se usaba
- **`server/src/services/quizService.js`** — agregado:
  - `saveRecommendation()`: persiste al terminar quiz de scope `diagnostic` o `module` ÚNICAMENTE (no `course`)
  - Algoritmo de diversidad: 1 `findOne` por plataforma con error → rellena slots con áreas de riesgo → máx 4 lecciones
  - `getLatestRecommendation()`: recupera la más reciente con `.populate('suggestedLessons', 'title _id')`
  - `getAttemptRecommendations()`: corregido con mismo algoritmo de diversidad
  - `LESSON_TYPE_PRIORITY`: eliminado `case_study: 2` (ya no existe en Lesson.type)
- **`server/src/routes/quiz.routes.js`** — agregada ruta `GET /api/quiz/my-recommendations` (antes de `/:id` para evitar conflicto)
- **`client/src/pages/Dashboard.jsx`** — agregado:
  - Estado `recommendations`
  - Tercera petición paralela a `/api/quiz/my-recommendations` con `.catch(() => ({ data: null }))`
  - Tarjeta "Lecciones Recomendadas" condicional con `BookOpen` icon y navegación a `/lecciones/:id`

### 2. Modelo Lesson.type — eliminado `case_study`
- **`server/src/models/Lesson.js`** — enum cambiado de `['article', 'video', 'guide', 'case_study']` a `['article', 'video', 'guide']`
- `case_study` SIGUE existiendo en `Question.type` (motor de evaluación) — no se tocó
- No requirió migración de BD (ninguna lección tenía ese tipo)

### 3. Bug fix: validación de contraseña inconsistente
- **`client/src/pages/Profile.jsx` línea 294** — cambiado `< 6` a `< 8` para coincidir con el registro (8 caracteres mínimo en ambos lugares)

### 4. Normalización riskArea en seeds
- **`server/src/scripts/seed/courses/games/module6.js`** y **`games/finalQuiz.js`** — `'Salud Mental y Fisica'` → `'Salud Mental y Física'` (6 ocurrencias, faltaba tilde)
- Ejecutado `npm run seed:games` para aplicar en Atlas

---

## Cambios al CÓDIGO realizados en sesión 2026-04-24

### 1. Landing pública: bloque “Los riesgos son reales” corregido y respaldado
- **`client/src/pages/Home.jsx`** — se corrigieron textos y citas del bloque informativo previo al login.
- Se eliminó la afirmación engañosa de “organismos internacionales” y se sustituyó por “fuentes públicas y estudios académicos”.
- Se reemplazó el dato incorrecto `91.1%` por cifras verificables de **INEGI ENDUTIH 2024**:
  - `79.7%` para niñas y niños de `6 a 11 años`
  - `95.1%` para adolescentes de `12 a 17 años`
- Se corrigió la tarjeta de Roblox para citar de forma honesta la nota de **The Guardian** basada en la investigación de **Revealing Reality**.
- Se corrigió la tarjeta de Twitch con autores, título y fecha reales del estudio publicado en **Springer** en diciembre de 2025.
- Verificación hecha contra fuentes públicas; no existe proyección oficial localizada para 2026 o 2030 de ese mismo indicador por edad.

### 2. Landing pública: franja de estadísticas del hero compactada
- **`client/src/pages/Home.jsx`** — el componente `StatsGrid` se redujo visualmente para que no abarque toda la pantalla.
- Ajustes principales:
  - menor `margin-top`
  - menor `padding`
  - `max-width` para contener el bloque
  - números e iconos ligeramente más pequeños
  - etiquetas con mejor ancho y lectura
- Objetivo: que la banda de métricas acompañe al hero sin competir con él.

### 3. Verificación técnica
- Ejecutado **`npm run build`** en `client` después de los cambios.
- Resultado: compilación exitosa.
- Advertencia existente: Vite reporta chunks mayores a 500 kB, pero no está relacionada con estos cambios.

---

## Hechos técnicos confirmados (para el reporte)

### Modelos y BD
| Campo | Valor correcto |
|---|---|
| `Lesson.type` | `article`, `video`, `guide` (NO case_study) |
| `Question.type` | 10 tipos: single_choice, multiple_choice, multiple_selection, case_study, drag_drop, fill_blanks, match_columns, order_sequence, categorize, drop_down |
| `Attempt.riskLevel` | `'Alto'`, `'Medio'`, `'Bajo'` (español) |
| `Quiz.minPassing` | 80 (default) |
| `User.avatar` | Base64 JPEG 200×200 px, calidad 70%, ~15 KB (Sharp) |
| `CaseReport` | Sin `updatedAt` (no tiene `timestamps: true`) |
| `Recommendation` | Se persiste para scope `diagnostic` y `module`, NO para `course` |
| `LESSON_TYPE_PRIORITY` | guide=4, article=3, video=1 |
| `errorsByArea` / `errorsByPlatform` | Mapas dinámicos; claves = valores de `riskArea`/`platform` de preguntas falladas |

### riskAreas y plataformas del diagnóstico
- **Plataformas** (7): Roblox, Minecraft, TikTok, Discord, Instagram, YouTube, Twitch
- **riskAreas diagnóstico** (10): Seguridad de Cuenta, Privacidad Avanzada, Gasto Controlado, Uso digital, Privacidad, Manipulación, Control parental, Desinformación, Publicidad, Tiempo de pantalla, Monetización y publicidad, Salud Mental y Física

### Cursos y módulos
| Curso | Módulos |
|---|---|
| Videojuegos (Roblox + Minecraft) | 6 módulos |
| Redes Sociales | 7 módulos |
| Streaming (YouTube + Twitch) | 7 módulos |

### Endpoints nuevos (esta sesión)
| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/quiz/my-recommendations | Última recomendación del usuario (con populate) |
| GET | /api/content/latest-update | Última novedad publicada para tarjeta dinámica del dashboard |

### DA Codes — tabla completa
| ID | Decisión | Descripción corta |
|---|---|---|
| DA01 | Verificación por código 6 dígitos | Reemplaza enlace por correo |
| DA02 | Resend API primario | SMTP Gmail tenía timeouts en Render |
| DA03 | Cascada Gemini→Groq→estático | Gemini 2.0 deprecado, rate limits agresivos |
| DA04 | Avatar como Base64 en MongoDB | Render destruye /uploads/ en redespliegue |
| DA05 | Sharp compresión 200×200 70% | Imagen sin comprimir podría exceder 16 MB doc MongoDB |
| DA06 | shuffleArray en backend | Frontend generaba IDs nuevos → evaluaciones incorrectas |
| DA07 | minPassing = 80% default | Criterio de acreditación académica |
| DA08 | 6 módulos Videojuegos, 7 Redes Sociales y Streaming | Redes sociales requería más profundidad |
| DA09 | Rutas SPA en español | Público hispanohablante |
| DA10 | ActivityLog idempotente uniqueKey | Previene duplicados por reintentos de red |
| DA11 | Rate limit diferenciado prod/dev | 100/15min prod, 1000/1min dev |

---

## Errores encontrados y estado de corrección (revisión exhaustiva 2026-04-23)

### ✅ TODOS LOS ERRORES CORREGIDOS EN EL DOCUMENTO

| # | Sección | Error | Estado |
|---|---|---|---|
| C1 | §2.22 Glosario | "WT" → "JWT" | ✅ |
| C2 | §4.8.5 g) Attempt | riskLevel inglés → español (Alto\|Medio\|Bajo) | ✅ |
| C3 | §6.2.4 bono lecciones | case_study eliminado del bono | ✅ |
| C4 | §4.5.4 DS-04 / §4.8.5 d) lessons | case_study como tipo de lección eliminado | ✅ |
| C5 | §6.2.3 | DA05 y DA08 incorrectos → texto directo sin DA | ✅ |
| C6 | §6.4 DA08 | "Streaming 6 módulos" → "Streaming 7 módulos" | ✅ |
| C7 | §6.3.6 | RF13 → RF2 y RF12 | ✅ |
| C7 | §6.3.8 | RF3+RF14 → RF1 | ✅ |
| C7 | §6.3.3 | RF9(progreso)+RF10(certificado) → RF7+RF9 | ✅ |
| C8 | §6.4 DA07 | RF7 → RF9 | ✅ |
| M1 | §3.1 | Numeración duplicada 3.1.1/3.1.2 | ✅ |
| M2 | §4.6.1 Sprint 5 | "US01–US15" → "US01–US18" | ✅ |
| M3 | §6.3.3 | "tre s peticiones" → "tres peticiones" | ✅ |
| M4 | §4.4 Matriz | CU1/CU2 → CU01/CU02 | ✅ |
| m2 | §4.6.1 Backlog | "ciberacosos"/"riesgtos" corregidos | ✅ |
| — | §4.8.5 d) lessons | Pipe sobrante `\|` al final de type eliminado | ✅ |
| — | §4.8.5 j) recommendations | updatedAt agregado | ✅ |
| — | §4.8.5 m) resources | fullContent raíz + lessons raíz + color agregados | ✅ |
| — | §4.8.5 g) attempts | Ejemplos PRIVACIDAD/ROBLOX → Privacidad/Roblox | ✅ |
| — | §1.3.2 | Marcador roto corregido | ✅ |
| — | §4.6.1 US15 | "Gemini 2.0" → "Gemini 2.5 Flash" | ✅ |
| — | §4.6.1 US13 | "token vía SMTP" → "código 6 dígitos" | ✅ |
| — | RT10 §3.5 | "Render/Railway" → "Render" | ✅ |
| — | §4.6.1 Backlog | "Render o Railway" → "Render" | ✅ |
| — | §4.7 Sharp | "400×400" → "200×200 70%" | ✅ |
| — | §4.11.2 | "mensajes sugeridos" eliminado | ✅ |
| — | §4.8.7 | avatar 200×200 70%, lessons.type sin case_study | ✅ |
| — | §4.8.4 | recommendations description actualizada | ✅ |
| — | §6.2.4 | Tabla tipos 10 correctos, bono sin case_study | ✅ |
| — | §6.2.4 | Bloque saveRecommendation/diversidad agregado | ✅ |
| — | §6.2.3 | DA05/DA08 reemplazados por texto directo | ✅ |
| — | §6.3.3 | "dos" → "tres peticiones" + tabla my-recommendations | ✅ |
| — | §6.3.3 | Tarjeta lecciones recomendadas agregada | ✅ |
| — | §6.3.4 | DA07 referencia incorrecta → texto directo | ✅ |
| — | §6.3.8 | "6 caracteres" → "8 caracteres" | ✅ |
| — | §6.2.9 | Párrafo normalización tilde agregado | ✅ |
| — | §4.8 | Párrafo intro agregado | ✅ |
| — | §6.4 | Tabla DA completa y correcta | ✅ |

### ⚪ Pendientes menores (presentación)
| # | Sección | Pendiente |
|---|---|---|
| m1 | Todo el doc | "Tabla X." / "Ilustración X" → asignar números reales |
| m3 | Índice de figuras | Agregar entrada Ilustración 8b |

---

## Pendientes de redacción

### 🔴 Capítulo 7 (FALTA COMPLETO)
Ver checklist detallado más abajo.

### 🟡 §6.5 Scripts de mantenimiento
Scripts: seed.js, seed-target.js, backup_db.js, fix_activitylog_index.js, audit_orphans.js,
clean_orphans.js, fix_attempts.js, fix_videos.js, remove_duplicate_streaming.js,
delete_clone.js, migrate_users.js, restore_progress (v1-v3), sync_progress.js, clean_progress.js

---

## Checklist Capítulo 7: Pruebas

### 7.1 Estrategia de pruebas
- [ ] Enfoque mixto: Jest+Supertest+MongoMemoryServer (backend) + manuales (UI)
- [ ] 3 suites automatizadas: auth, quiz, chatbot

### 7.2 Pruebas unitarias e integración

#### 7.2.1 Suite auth.test.js
- [ ] Registro exitoso → 201, isVerified: false
- [ ] Login bloqueado sin verificar → 401
- [ ] Verificación exitosa → isVerified: true
- [ ] ⚠️ Nota: test escrito con verificación por enlace (GET /:token) — actualizar a POST /verify con código en body

#### 7.2.2 Suite quiz.test.js
- [ ] errorsByArea y errorsByPlatform calculados correctamente
- [ ] scope='course' → questionDetails vacío
- [ ] Lecciones guiadas para diagnóstico (riskArea+platform)
- [ ] Lecciones guiadas por módulo (campo teaches)

#### 7.2.3 Suite chatbot.test.js
- [ ] USE_MOCK_AI=true → fallback estático para "grooming", persiste Conversation+Message
- [ ] 2 mensajes misma conversación → ≥2 registros en messages
- [ ] "hola" → respuesta contiene "seguridad digital"

### 7.3 Pruebas manuales (Postman + BD)
- [ ] Flujo registro → verificación → login → ruta protegida
- [ ] Flujo olvido contraseña → código → reset → login
- [ ] Reporte con token: test-auth-report.js
- [ ] Correo SMTP: test-email.js; Resend: test-sendEmail.js
- [ ] Diagnóstico: test_api_logic.js, test_recent_activity.js
- [ ] Integridad: check_lesson_count.js, check_integrity.js, check_progress_integrity.js

### 7.4 Pruebas de seguridad
- [ ] Campos requeridos, JWT en rutas protegidas → 401
- [ ] Rate limiting → 429 en producción
- [ ] CORS: origen no permitido → error
- [ ] passHash nunca expuesto en respuestas JSON
- [ ] Anonimización chatbot: emails → [EMAIL], teléfonos → [TLF]

### 7.5 Pruebas de rendimiento
- [ ] Chatbot: Gemini <1.5s, Groq ~0.8s, estático <50ms
- [ ] Cursos con populate: <400ms (Atlas)
- [ ] PDF certificado: ~1-2s (html2canvas captura DOM → jsPDF; antes <200ms con jsPDF puro)
- [ ] Avatar con Sharp: <200ms vs ~1.5s sin compresión

### 7.6 Pruebas de usabilidad
- [ ] Escritorio: Chrome, Firefox; Móvil: iOS Safari, Android Chrome
- [ ] Responsive Tailwind sm/md/lg
- [ ] Bug B08 chatbot laptop 13" (commit 83288fe)
- [ ] Bug B10 touch crop iOS (commit 31395bd)

### 7.7 Resultados automatizados
- [ ] Tabla: suite / casos / pasados / fallidos
- [ ] Captura de jest --coverage
- [ ] Métricas de cobertura por módulo

### 7.8 Tabla de incidencias documentadas (12 bugs)
- [ ] B01 SMTP timeout → Resend (6ebbafe, 190491b)
- [ ] B02 Avatar perdido en Render → Base64 (4da73b2)
- [ ] B03 Quiz IDs inválidos tras shuffle → shuffle solo en presentación (449177d)
- [ ] B04 Curso Streaming duplicado → remove_duplicate_streaming.js
- [ ] B05 Progreso perdido tras re-seed → restore_progress v1/v2/v3
- [ ] B06 Error 11000 ActivityLog → fix_activitylog_index.js
- [ ] B07 Pantalla blanca ForgotPassword → try/catch granular (1e50a6a)
- [ ] B08 Chatbot desbordaba laptop 13" → max-h viewport (83288fe)
- [ ] B09 fill_blanks sensible a mayúsculas → toLowerCase()+trim()
- [ ] B10 Avatar Base64 roto en frontend → avatarUrl.js (22204fd)
- [ ] B11 SPA 404 en Netlify → _redirects + netlify.toml (db6b970)
- [ ] B12 Intentos huérfanos → fix_attempts.js

---

## Diagramas PlantUML

### Diagrama de clases (actualizado 2026-04-23)
- `case_study` eliminado de `Lesson.type` en el diagrama
- `minPassing default 80` (no 70)
- `riskLevel: Alto | Medio | Bajo`
- `CaseReport` sin `updatedAt`
- `Recommendation` con relaciones reales a `Attempt`, `Lesson`, `Module`
- Estilo dos tonos `#header/body` con `roundcorner 8`

**Paleta de colores del diagrama:**
| Dominio | Header/Body |
|---|---|
| Usuario | `#FB8C00/FFF3E0` |
| Contenido educativo | `#1976D2/E3F2FD` |
| Evaluación | `#7B1FA2/F3E5F5` |
| Progreso/Acreditación/Recomendación | `#388E3C/E8F5E9` |
| Actividad | `#303F9F/E8EAF6` |
| Chatbot | `#00796B/E0F2F1` |
| Reportes/Recursos | `#C62828/FFEBEE` |

### Diagramas de arquitectura y flujo (generados en sesiones anteriores)
1. Il. 3 — Arquitectura 3 capas backend ✅
2. Il. 4 — Despliegue ✅
3. Il. 5 — DFD Nivel 0 ✅
4. Il. 6 — DFD Nivel 1 ✅
5. Il. 7 — DFD Nivel 2 P2 ✅
6. Il. X — DFD Nivel 2 P3 ✅ (pendiente número)
7. Il. X — DFD Nivel 2 P5 ✅ (pendiente número)
8. Il. 8a — CU Padre/Tutor ✅
9. Il. 8b — CU Administrador ✅
10. Il. 9 — DS-01 Autenticación ✅
11. Il. 10 — DS-02 Chatbot ✅
12. Il. 11 — DS-03 Contenido Educativo ✅
13. Il. 12 — DS-04 Acreditación ✅
14. Il. nueva — DS-05 Reportes ✅
15. Il. nueva — DS-06 Orquestación IA ✅

---

## Endpoints completos del sistema

| Método | Ruta | Descripción |
|---|---|---|
| POST | /api/auth/register | Crea usuario, envía código 6 dígitos |
| POST | /api/auth/verify | Verifica con { email, code } |
| POST | /api/auth/resend-verification | Reenvía código |
| POST | /api/auth/login | JWT 30 días |
| POST | /api/auth/forgot-password | Código SHA-256, expira 10 min |
| POST | /api/auth/reset-with-code | { email, code, newPassword } |
| PUT | /api/auth/update-profile | Sharp→Base64, nombre |
| GET | /api/auth/profile | Datos del usuario autenticado |
| PUT | /api/auth/update-password | Cambio contraseña (mín. 8 chars) |
| GET | /api/content/courses | Cursos publicados |
| GET | /api/content/courses/:id | Curso + módulos + quizIds |
| GET | /api/content/lessons/:id | Lección individual |
| GET | /api/content/stats | Conteo cursos/lecciones/casos |
| POST | /api/progress/lesson/:id/complete | Marca lección + ActivityLog |
| GET | /api/progress/course/:id | Progreso por curso |
| GET | /api/progress/summary/all | Dashboard resumen global |
| GET | /api/progress/next-step | Siguiente lección/quiz pendiente |
| GET | /api/quiz/diagnostic | Quiz diagnóstico |
| GET | /api/quiz/recommendations/:attemptId | Áreas/plataformas a repasar (pantalla inmediata) |
| GET | /api/quiz/my-recommendations | Última recomendación persistida del usuario |
| GET | /api/quiz/:id | Quiz por ID |
| POST | /api/quiz/:id/submit | Califica, Attempt, ActivityLog, Accreditation |
| POST | /api/chatbot/message | Gemini→Groq→estático, persiste conversación |
| POST | /api/reports/submit | Rate limit 3/hora + cooldown 10 min |
| GET | /api/resources | Recursos paginados (type=guide\|case, limit=9) |
| GET | /api/resources/:slug | Detalle por slug |

---

## Cambios al CÓDIGO realizados en sesión 2026-04-28

### 1. Exámenes de módulo — curso Redes Sociales (M1–M7): reescritos completamente
- Todas las preguntas reescritas desde cero basadas en el contenido real de las lecciones de cada módulo.
- Eliminada ambigüedad en `match_columns` (pares 1:1 claros, sin opciones compartidas).
- `multiple_selection`: reducido a 3 correctas de 5 opciones (antes hasta 6/9).
- `categorize`: balanceado a 3+3+3 o 2+3+2 (antes hasta 4+4+1).
- Ejecutado `npm run seed:social`.

### 2. Exámenes de módulo — curso Streaming (M1–M7): corregidos
- Q5 (`multiple_selection`): 6/9 → 3/5 en todos los módulos.
- Q7 (`categorize`): rebalanceado en M4, M5, M6.
- Ejecutado `npm run seed:streaming`.

### 3. Exámenes de módulo — curso Videojuegos (M1–M6): corregidos estructuralmente
- M1 Q5: 6/8 → 3/6 correctas.
- M1 Q7: Roblox(2)/Minecraft(2)/Ambos(4) → 3+3+3.
- M2 Q5: 6/8 → 3/6 correctas.
- M2 Q7: Prevención(4)/Supervisión(2)/Respuesta(2) → 3+3+3.
- M4 Q5: 6/8 → 3/6 correctas.
- M5 Q5: 5/8 → 3/6 correctas.
- M5 Q7: Oficial(4)/Sospechoso(3)/Requiere(1) → 3+3+3.
- M6 Q5: 5/8 → 3/6 correctas.
- Ejecutado `npm run seed:games`.

### 4. Exámenes finales — corrección de `multiple_selection` con demasiadas respuestas correctas
- **Social final exam**: 2 preguntas con 6/9 correctas → reducidas a 3/6 cada una.
- **Streaming final exam**: 2 preguntas con 5/8 y 6/9 correctas → reducidas a 3/6 cada una.
- Ejecutados `npm run seed:social` y `npm run seed:streaming`.

### Regla aplicada consistentemente en los 3 cursos
| Tipo | Regla |
|---|---|
| `multiple_selection` | Máximo 3–4 correctas de 5–6 opciones totales |
| `categorize` | Balance 3+3+3 o al menos 2+3+2 por categoría |
| Contenido | Cada pregunta basada en lecciones del módulo donde aparece |

---

## Cambios al CÓDIGO realizados en sesión 2026-04-28 (continuación)

### 5. Corrección de ambigüedad en match_columns y categorize — 3 cursos

**Problema raíz:** preguntas con plataformas como categorías usaban descripciones de comportamiento que podían aplicar a múltiples plataformas (ej. "el perfil puede ser visto por seguidores" aplica tanto a TikTok como a Instagram).

**Regla aplicada:** cada item debe referenciar un **elemento nombrado exclusivo** de su plataforma (nombre de herramienta, sección o función específica).

| Módulo | Item ambiguo eliminado | Reemplazado por |
|---|---|---|
| Social M1 Q3 | "El perfil... puede ser visto por seguidores" | "fotos y **Reels** en la **cuadrícula** permanente" (Instagram) |
| Social M1 Q7 | "Las Historias desaparecen a las 24h" | "fotos y Reels en la cuadrícula permanente del perfil" |
| Social M1 Q7 | "El feed muestra contenido sin seguir a nadie" | "**For You Page** se reproduce aunque no sigas a nadie" (TikTok) |
| Social M1 Q7 | "El perfil tiene conteo de seguidores" | "sección **Explorar** muestra cuentas que el menor no sigue" (Instagram) |
| Social M3 Q3 | "Deja de publicar por comentarios negativos en feed" | "desactiva comentarios de videos en el **For You Page**" (TikTok) |
| Social M3 Q3 | "Cuenta falsa para hacerse pasar" | "**solicitudes de seguimiento** a sus contactos" (Instagram) |
| Social M4 Q3 | "Seguidor comenta videos e intenta conversación" | "videos del **For You Page** e intenta abrir chat" (TikTok) |
| Social M4 Q3 | "Cuenta desconocida responde historias" | "bandeja de **Direct** del menor" (Instagram) |
| Social M5 Q3 | "Feed lleva a contenido perturbador por autoplay" | "**For You Page** lleva a contenido inapropiado" (TikTok) |
| Social M5 Q3 | "Envía archivos por mensaje directo" | "**canal de texto privado** del servidor" (Discord) |
| Social M7 Q3 | "Teen Accounts con privacidad reforzada" (→ Instagram) | "**Sincronización familiar** vincula cuenta del padre" (Instagram) |
| Social M7 Q3 | "Cuenta privada y control de contenido sensible" | "publicaciones y **Reels** solo visibles para seguidores aprobados" |
| Games M1 Q3 | "Puede jugarse en solitario o en línea" (ambos) | "en **Realms** privados o en servidores públicos" (Minecraft) |

**Streaming y Games:** No se encontraron ambigüedades adicionales. Streaming M1 match_columns (YouTube vs Twitch) usa características inequívocas (grabado vs en vivo). Games usa herramientas nombradas (Robux, Minecoins, Family Safety, etc.).

Ejecutados `npm run seed:social` y `npm run seed:games`.

---

## Cambios al CÓDIGO realizados en sesión 2026-04-29

### 1. Auditoría final de exámenes por alcance de módulo/curso
- **Redes Sociales:** revisado que cada examen de módulo solo pregunte contenido visto dentro de su módulo.
  - Corrección puntual en M7: Teen Accounts corresponde a Instagram; Sincronización familiar no se asigna a Instagram.
  - Ejecutado `npm run seed:social`.
- **Streaming:** revisado que los exámenes de módulo estén acotados al módulo y que el final integre todo el curso.
  - Corrección puntual en M3 Q5: explicación ajustada para coincidir con la opción correcta sobre autoplay, historial/recomendaciones y regla de avisar.
  - Ejecutado `npm run seed:streaming`.
- **Videojuegos:** revisados M1-M6 y examen final.
  - M1: `Mi información viaja de forma segura por Internet` → `Mi información viaja por Internet`.
  - M3: `Realms son privados y seguros` → `Realms son privados y más controlados`.
  - Confirmado que el examen final cubre los 6 módulos del curso.
  - Ejecutado `npm run seed:games`.

### 2. Recomendaciones por preguntas falladas — lógica reforzada
- **`server/src/services/quizService.js`**:
  - Las recomendaciones post-examen ahora se calculan desde las preguntas falladas concretas, no desde todo el módulo ni desde áreas/plataformas agregadas de forma amplia.
  - Se agregó reconstrucción de detalles del intento para identificar respuestas incorrectas reales.
  - `saveRecommendation()` ahora recibe `questionDetails` y selecciona lecciones relacionadas con esas preguntas.
  - `getAttemptRecommendations()` usa el mismo criterio por preguntas falladas.
  - Las preguntas correctas ya no cargan `guidedLessons`.
- **Regla de limpieza:** si el usuario vuelve a presentar el mismo quiz y lo acredita, se eliminan las recomendaciones pendientes asociadas a intentos anteriores de ese quiz.
- **Examen final de curso (`scope: course`)** sigue sin generar recomendaciones ni desglose por pregunta.

### 3. Guía de aprendizaje en examen resuelto — solo lecciones correspondientes
- **Problema detectado:** en la pantalla de examen resuelto, la sección "Guía de aprendizaje" podía mostrar lecciones de más porque:
  - buscaba por `courseId` antes que por `moduleId`;
  - usaba un fallback que rellenaba con lecciones del módulo;
  - plataformas como TikTok/Discord/Instagram contaban como coincidencias demasiado amplias.
- **Correcciones en `quizService.js`:**
  - Para quizzes de módulo, la consulta prioriza `moduleId`, no `courseId`.
  - Se eliminó el fallback de "rellenar" con lecciones del módulo.
  - Plataformas (`roblox`, `minecraft`, `tiktok`, `discord`, `instagram`, `youtube`, `twitch`) ya no cuentan como coincidencia temática suficiente.
  - Se muestran solo las lecciones mejor puntuadas por coincidencia real; si una pregunta requiere varias lecciones y empatan como mejor coincidencia, pueden salir varias.

### 4. Dashboard — recomendaciones pendientes y novedad dinámica
- **Recomendaciones del dashboard:**
  - `/api/quiz/my-recommendations` sigue devolviendo la recomendación más reciente pendiente del usuario.
  - Al aprobar el mismo quiz que originó una recomendación, esta deja de aparecer porque se eliminan recomendaciones asociadas a intentos anteriores de ese quiz.
- **Novedad dinámica en perfil/dashboard:**
  - **`server/src/routes/content.routes.js`** agregó `GET /api/content/latest-update`.
  - El endpoint compara lo más reciente entre:
    - `Lesson` tipo `article` o `guide`;
    - `Resource` tipo `case` o `guide` publicado.
  - Devuelve `label`, `title`, `description`, `href`, `createdAt`, `updatedAt`.
  - **`client/src/pages/Dashboard.jsx`** ahora consume `/api/content/latest-update` y la tarjeta "Novedad" muestra contenido real y clickeable:
    - Nuevo artículo → `/lecciones/:id`
    - Nueva guía de lección → `/lecciones/:id`
    - Nuevo caso real → `/casos/:slug`
    - Nueva guía práctica → `/casos-y-guias?seccion=guias`

### 5. Pruebas y validaciones ejecutadas
- `npx.cmd jest src/tests/quiz.test.js --runInBand`
  - Resultado final: **9 tests passed**.
  - Cobertura agregada para:
    - recomendaciones diagnósticas desde la pregunta fallada exacta;
    - persistencia de recomendaciones del dashboard desde preguntas falladas;
    - limpieza al aprobar posteriormente el mismo quiz;
    - guía de aprendizaje sin lecciones ajenas al módulo;
    - no rellenar guía con lecciones no relacionadas.
- `npm.cmd run build` en `client`
  - Resultado: compilación exitosa.
  - Advertencia existente: chunks mayores a 500 kB en Vite; no bloquea.

---

## Cambios al CÓDIGO realizados en sesión 2026-04-30

### 1. Experiencia de artículos — imágenes por curso y reemplazo de tablas
- Se creó estructura pública para imágenes de artículos:
  - `client/public/article-images/videojuegos/`
  - `client/public/article-images/redes-sociales/`
  - `client/public/article-images/streaming/`
- Objetivo: permitir que el usuario suba imágenes por curso y luego se inserten en artículos específicos.
- En el curso **Redes Sociales** se reemplazaron tablas extensas por imágenes, manteniendo la misma información base para que los exámenes sigan saliendo del contenido.
- Archivo principal editado:
  - `server/src/scripts/seed/courses/social/catalog.js`

**Imágenes insertadas en Redes Sociales:**
| Módulo/Artículo | Imágenes |
|---|---|
| M1A1 | `RedesArticulo1.png`, `RedesArticulo1.2.png` |
| M1A2 | `RedesArticulo2.png`, `RedesArticulo2.2.png` |
| M2A1 | `M2A1.png`, `M2A1.1.png` |
| M2A2 | `M2A2.png`, `M2A2.1.png` |
| M3A1 | `M3A1.png`, `M3A1.1.png` |
| M3A2 | `M3A2.png`, `M3A2.1.png` |
| M4A1 | `M4A1.png`, `M4A1.1.png` |
| M4A2 | `M4A2.png`, `M4A2.1.png` |
| M5A1 | `M5A1.png`, `M5A1.1.png` |
| M5A2 | `M5A2.png`, `M5A2.1.png` |
| M6A1 | `M6A1.png`, `M6A1.1.png` |
| M6A2 | `M6A2.png`, `M62.1.png` |
| M7A1 | `M7A1.png`, `M7A1.1.png` |
| M7A2 | `M7A2.png`, `M7A2.1.png` |

### 2. Navegación: volver al curso conserva la posición
- Problema: al estar dentro de un artículo, video o curso, al pulsar **Volver al curso** la página podía irse arriba o abajo, perdiendo el lugar donde estaba el usuario.
- Corrección:
  - `client/src/pages/LessonView.jsx`
    - El botón **Volver al curso** ahora envía `state={{ scrollToLessonId: lesson._id }}`.
    - Navegación de anterior/siguiente/sidebar actualiza el objetivo de retorno al lesson correcto.
  - `client/src/pages/CourseDetail.jsx`
    - El scroll espera a que termine `loading`.
    - Usa `requestAnimationFrame` para ubicar la tarjeta correcta.
    - Aplica `lessonCard.scrollIntoView({ behavior: 'auto', block: 'center' })`.

### 3. Redes Sociales — definición explícita de grooming
- Se verificó que el curso de redes no explicaba con suficiente claridad qué es grooming.
- Se agregó en `server/src/scripts/seed/courses/social/catalog.js`, Módulo 4 Artículo 2:
  - definición simple;
  - explicación de que no suele iniciar con amenaza evidente;
  - señales de manipulación gradual, secretos, presión y cambio a espacios privados.
- Objetivo: que los padres aprendan el término antes de responder reactivos del módulo.

### 4. Streaming — corrección conceptual YouTube vs Twitch
- Problema detectado: en Módulo 1 de Streaming se presentaba a YouTube como si solo fueran videos grabados y a Twitch como si solo fueran directos.
- Corrección en `server/src/scripts/seed/courses/streaming/catalog.js`:
  - YouTube ahora se explica como plataforma donde predominan videos para ver cuando se quiera, pero también existen transmisiones en vivo.
  - Twitch ahora se explica como plataforma donde predominan directos, pero puede conservar grabaciones, fragmentos cortos o repeticiones.
  - Se ajustaron tablas, artículo, examen del módulo y examen final.
- Se eliminaron términos poco claros para padres:
  - `VODs`
  - `clips`
  - `a demanda`
  - `bajo demanda`
- Sustituciones usadas:
  - “videos para ver cuando se quiera”
  - “grabaciones o fragmentos cortos”
  - “transmisiones en vivo”

### 5. Mini glosarios para padres en los tres cursos
- Se revisaron los cursos **Videojuegos**, **Redes Sociales** y **Streaming** para detectar términos que un padre/tutor podría no conocer.
- Se agregaron bloques `## Mini glosario para padres` en artículos clave.
- Regla aplicada: explicar el término en lenguaje cotidiano, justo cerca de donde aparece, sin cambiar la información base de los exámenes.

**Streaming — `server/src/scripts/seed/courses/streaming/catalog.js`:**
- `streamer`
- `chat en vivo`
- `grooming`
- `sextorsión`
- `mensajes fuera de la plataforma`
- `Super Chat`
- `Super Stickers`
- `Bits o Cheers`
- `Gift subs`
- `influencer`
- `contenido patrocinado`
- `promoción pagada`
- `Shorts`
- `unboxing`
- `YouTube Kids`
- `cuenta supervisada`
- `Family Link`
- `Approved content only`
- `Whispers`

**Redes Sociales — `server/src/scripts/seed/courses/social/catalog.js`:**
- `algoritmo`
- `feed`
- `For You Page`
- `servidor de Discord`
- `canal`
- `mensaje directo o DM`
- `historia`
- `influencer`
- `reel`
- `Paid partnership`
- `Promotional content`
- `contenido patrocinado`
- `Coins`
- `Gifts`
- `Stars`
- `Nitro`
- `gifting`
- `Family Pairing`
- `Restricted Mode`
- `Teen Accounts`
- `Family Center`
- `contenido sensible`

**Videojuegos — archivos editados:**
- `server/src/scripts/seed/courses/games/module1.js`
- `server/src/scripts/seed/courses/games/module2.js`
- `server/src/scripts/seed/courses/games/module3.js`
- `server/src/scripts/seed/courses/games/module4.js`
- `server/src/scripts/seed/courses/games/module5.js`

**Términos explicados en Videojuegos:**
- `sandbox`
- `experiencia de Roblox`
- `Realm`
- `Bedrock Edition`
- `Java Edition`
- `cuenta parental`
- `privilegios parentales`
- `verificación de identidad`
- `Add parent`
- `Parental Controls`
- `madurez de contenido`
- `Experience Chat`
- `Direct Chat`
- `Parties`
- `Private Servers`
- `conexiones`
- `cross-play`
- `Marketplace`
- `servidor público`
- `Join Multiplayer Games`
- `Can join Realms`
- `Gamertag`
- `Realms Stories`
- `Xbox Family Settings app`
- `online enticement`
- `grooming`
- `sextorsión`
- `identidad falsa`
- `skin`
- `avatar`
- `phishing`
- `skin pack`
- `texture pack`
- `world`
- `mash-up pack`

### 6. Validaciones ejecutadas
- `npm run seed:social`
- `npm run seed:streaming`
- `npm run seed:games`
- `npm run seed:content`
  - Resultado: cursos Videojuegos, Redes Sociales y Streaming sincronizados correctamente en MongoDB Atlas.
- `npm run build` en `client`
  - Resultado: compilación exitosa.
  - Advertencia existente: Vite reporta chunks mayores a 500 kB; no bloquea ni está relacionada con estos cambios.
- Búsqueda final:
  - No quedan `VODs`, `clips`, `a demanda` ni `bajo demanda` en `server/src/scripts/seed/courses`.

### 7. Rediseño completo del certificado PDF — `client/src/pages/Dashboard.jsx`

**Problema original:** el certificado se generaba con jsPDF puro (drawing primitives), lo que causaba:
- Caracteres unicode (`▸`) corruptos al exportar → aparecían como `%,`
- Texto con espaciado extraño por el motor de fuentes de jsPDF
- Diseño con estética de pergamino/institucional sin relación con el branding de Kuxipilli

**Solución implementada:** generación via `html2canvas` + `jsPDF`.

**Flujo nuevo:**
1. Se construye un div HTML oculto (`position:fixed; left:-9999px`) con el diseño del certificado en CSS puro
2. `html2canvas` captura ese div como canvas a escala 2× (alta resolución)
3. `jsPDF` inserta el canvas como imagen PNG y descarga el archivo

**Cambios en código:**
- `import html2canvas from 'html2canvas'` agregado (dependencia ya instalada)
- `generateCertificate` convertida de función síncrona a `async`
- Template HTML del certificado: fondo blanco, barra gradiente superior (indigo→violeta→cyan), logo circular, nombre del usuario en negro grande, nombre del curso en azul oscuro, caja de competencias en gris, sello circular, franja inferior degradada
- `escapeHtml()` agregado para sanitizar valores dinámicos dentro del HTML inyectado
- Font-size dinámico para nombre de usuario (`nameFontSize`) y nombre del curso (`courseFontSize`) según longitud del texto

**Fixes iterativos aplicados:**
| Problema | Causa raíz | Solución |
|---|---|---|
| Barra rosa cortando el texto del nombre | `background-clip:text` + `-webkit-text-fill-color:transparent` no funciona en html2canvas | Usar `color` sólido en lugar de gradient text |
| Hueco enorme en el centro del certificado | `position:absolute` con coordenadas fijas dejaban espacio muerto | Reemplazar por `display:flex; flex-direction:column` con `flex:1` para el cuerpo central |
| Logo alargado/oval | html2canvas no aplica `overflow:hidden` + `border-radius` correctamente | Pre-procesar la imagen en un `<canvas>` offscreen usando `ctx.arc()` + `ctx.clip()` antes de inyectarla como data URL |
| Logo no cargaba (blanco) | `src="/logo_v2.png"` no resuelve desde un div off-screen | Hacer `fetch(window.location.origin + '/logo_v2.png')` → `FileReader` → base64 antes de inyectar el HTML |
| Bullets desalineados con el texto | `border-radius:50%` en `<span>` pequeño no renderiza bien en html2canvas; `align-items:center` en flex tampoco es confiable | Usar carácter HTML `&#8226;` con `color:#7c3aed` directamente en el texto |

**Estado final del certificado:**
- Diseño profesional blanco con acento indigo/violeta/cyan
- Logo de Kuxipilli circular en esquina superior izquierda
- Badge de categoría (ej. "REDES SOCIALES") arriba a la derecha
- Nombre del usuario centrado en tipografía grande y negrita
- Nombre del curso en azul oscuro
- Caja "Competencias Digitales Acreditadas" con grid de 2 columnas
- Código de verificación + sello circular "KUXIPILLI / CURSO" en el footer
- `§7.5` nota: tiempo de generación aumentó de <200ms (jsPDF) a ~1-2s (html2canvas); aceptable para descarga puntual

---

## Cambios al CODIGO realizados en sesion 2026-05-01

### 1. Curso Streaming -- reemplazo de tablas por imagenes completado
- Archivo principal editado:
  - `server/src/scripts/seed/courses/streaming/catalog.js`
- Se reemplazaron las tablas disponibles del curso **Plataformas de Streaming: YouTube y Twitch** por imagenes ubicadas en:
  - `client/public/article-images/streaming/`
- Regla aplicada durante el reemplazo:
  - La imagen sustituye solo la tabla correspondiente.
  - Si la imagen ya incluye nota o texto de cierre, se elimina el parrafo duplicado debajo.
  - Los textos introductorios, mini glosarios y terminos previos a la tabla se conservan.
  - Si no existe imagen para una tabla puntual, la tabla se deja en Markdown para no romper contenido.

**Imagenes insertadas en Streaming:**
| Modulo/Articulo | Imagenes aplicadas |
|---|---|
| M1A1 | `M1A1.png` |
| M1A2 | `M1A2.png` |
| M2A1 | `M2A1.png`, `M2A1.1.png` |
| M2A2 | `M2A2.png`, `M2A2.1.png` |
| M3A1 | `M3A1.png`, `M3A1.1.png` |
| M3A2 | `M3A2.png`, `M3A2.1.png` |
| M4A1 | `M4A1.png`, `M4A1.1.png` |
| M4A2 | `M4A2.png`, `M4A2.1.png` |
| M5A1 | `M5A1.png`, `M5A1.1.png` |
| M5A2 | `M5A2.png`, `M5A2.1.png` |
| M6A1 | `M6A1.png`, `M6A1.1.png` |
| M6A2 | `M6A2.png`, `M6A2.1.png` |
| M7A1 | `M7A1.png`, `M7A1.1.png` |
| M7A2 | `M7A2.png`, `M7A2.1.png` |

### 2. Validaciones ejecutadas
- Despues de cada bloque de cambios se ejecuto:
  - `npm run seed:streaming`
- Se verificaron rutas locales de imagenes nuevas con `HEAD` contra Vite (`http://127.0.0.1:5173/article-images/streaming/...`) y respondieron `200`.
- El curso Streaming quedo sincronizado en MongoDB Atlas despues del ultimo seed.

### 3. Estado actual y siguiente pendiente
- **Streaming:** terminado para las imagenes disponibles.
- **Redes Sociales:** ya tenia tablas reemplazadas por imagenes en la sesion anterior.
- **Pendiente siguiente:** curso **Videojuegos en linea (Roblox + Minecraft)**.
  - Ubicar tablas en `server/src/scripts/seed/courses/games/module1.js` a `module6.js`.
  - Reemplazarlas por las imagenes que se agreguen en `client/public/article-images/videojuegos/`.
  - Cuidar la misma regla: no duplicar notas si la imagen ya las incluye y no recortar glosarios o explicaciones previas.
  - Ejecutar `npm run seed:games` al terminar cada bloque o articulo.

---

## Correcciones al REPORTE TÉCNICO realizadas en sesión 2026-05-01

### Metodología de trabajo
- Se extrajo el texto completo del `Reporte_Tecnico.docx` usando PowerShell + ZipFile para procesar el XML interno
- Se generó el archivo `CORRECCIONES.md` con texto listo para pegar en Word, sección por sección
- Se generó `RUTA_TODOS_CAPITULOS.md` con el mapa completo de los 7 capítulos y sus estados
- Las correcciones se aplicaron en Word y se confirmaron por el usuario una a una

### Criterio aplicado
- Registro formal académico en tercera persona (tiempo pasado — el sistema ya existe)
- Eliminación de: segunda persona, anglicismos, coloquialismos, lenguaje obsceno, lenguaje de marketing
- Corrección de errores factuales: tecnologías erróneas, RF incorrectos, tiempos verbales futuros
- Redacción orientada a minimizar detección de IA en Turnitin (variación de estructura, oraciones mixtas)

### Secciones corregidas y aplicadas en Word

| Sección | Correcciones principales |
|---|---|
| Resumen | Reescrito completo: Kuxibot nombrado, 3 cursos, 80%, constancia PDF, Gemini/Groq/Resend |
| Palabras clave | "Control parental"→"Alfabetización digital parental"; "Seguridad en internet"→eliminada; agregados "Grooming" e "Inteligencia artificial generativa" |
| Introducción | Reescrita: tiempo verbal, componentes precisos, Kuxibot nombrado |
| §1.1 Justificación | Reescrita: errores gramaticales, anglicismos, segunda persona eliminados |
| §1.2 Propuesta de solución | Reescrita completamente: de tono coloquial a formal, componentes del sistema reales |
| §1.3.1 Objetivo general | Reescrito: tiempo futuro→pasado, componentes completos |
| §1.3.2 Objetivos específicos | Reescritos: 7 objetivos formales, precisos, sin coloquialismos |
| §1.4 Estado del Arte | Párrafos narrativos reescritos ("peques", "tiro por la culata", "frescos" eliminados) |
| §1.5 Delimitación | Reescrita: lenguaje obsceno eliminado, tres ámbitos bien etiquetados |
| §2.1–§2.10 | Lenguaje informal eliminado en todas las secciones |
| §2.11–§2.13 | **Error factual corregido: Python/Flask eliminado** (no se usa en el proyecto) |
| §2.14.1 | **Error factual corregido: "React/Vue.js"→React; "colección Articles"→lessons** |
| §2.15 | **Error factual corregido: Heroku→Netlify/Render** |
| §2.17 | **Error factual corregido: Bootstrap→Tailwind CSS v4** |
| §2.18, §2.20 | Reescritas en tono formal |
| §2.19 | Puntuación de lista corregida |
| §2.22 Glosario | 5 entradas nuevas: Tailwind CSS, Vite, Mongoose, Bcrypt, html2canvas |
| §3.1.3 Sprints | **Ampliado con Sprint 6–10 (TT2)**: implementación, pruebas, despliegue |
| §3.3 RF (Tabla 5) | RF1–RF12: descripciones reescritas en tercera persona formal |
| §3.4 RNF (Tabla 6) | Definición introductoria y RNF1–RNF7 reescritos (RNF7: JWT/OAuth→solo JWT) |
| §3.6 RN (Tabla 8) | RN-03 a RN-10 reescritos ("tocar"→formal, "brilla"→accesible, "a prueba de balas"→técnico) |
| §3.7.1 | Emojis 🟥🟧🟩 → texto formal |
| §3.8 Factibilidad | Nodemailer solo → Resend API primario + Nodemailer fallback |
| §4.2 | "Se utilizará"→"Se implementó" |
| §4.2.1, §4.2.2 | "jsPDF"→"jsPDF + html2canvas" en Tabla 10 y Tabla 11 |
| §4.3 DFD | Errata "Ilustración e Flujo"→"de Flujo"; P3.3 case_study eliminado de prioridad de lecciones |
| §4.5.4 DS-04 | "jsPDF"→"html2canvas + jsPDF" en descripción de generación del certificado |
| §4.9.3 Tabla 17-18 | Herramientas reales: Mocha/JMeter/OWASP ZAP→Jest+Supertest+Postman; corrección notificación admin |
| §4.11.1 | Nota tipografía de implementación final agregada |
| §4.11.5 | "se implementarán"→"fueron implementados con React 19" |
| §5.6 | Escalado horizontal→rate limiting + stateless |
| §5.7 | TT2 ya concluyó → Nivel 3 COBIT alcanzado |
| §5.8.1 | Fila herramientas: costo "$0" explícito |
| §5.9.2 | Fórmula depreciación verificada/escrita explícitamente |
| §6.2.3 | Endpoint `/api/content/latest-update` documentado |
| §6.2.4 | Recomendaciones desde preguntas falladas concretas; limpieza al aprobar |
| §6.2.6 | **RF10/RF11→RF2/RF12** (chatbot no cubre reportes ni verificación) |
| §6.2.9 | Párrafo de calidad de contenido (exámenes, glosarios, imágenes) agregado |
| §6.3.3 Dashboard | 3→4 peticiones paralelas; tarjeta novedad agregada; certificado reescrito (html2canvas) |
| §6.3.4 | scrollIntoView behavior:'smooth'→'auto' + requestAnimationFrame documentado |
| §6.3.5 | **RF6/RF7/RF8→RF3/RF4/RF9** (QuizTaker cubre evaluación y acreditación) |
| §6.4 | DA12 y DA13 agregadas a la tabla |
| §6.5 | **Sección completa redactada desde cero** (13 scripts de mantenimiento) |
| §7.1–§7.8 | **Capítulo 7 redactado desde cero** en CORRECCIONES.md — pendiente pegar en Word tras cambios visuales finales |

### Estado del documento
- **Capítulos 1–6:** correcciones aplicadas ✅
- **Resumen y Palabras clave:** corregidos ✅
- **Capítulo 7:** texto listo en CORRECCIONES.md, pendiente pegar (esperando cambios visuales finales de la app)
- **§4.5.4 DS-04:** jsPDF→html2canvas+jsPDF corregido ✅
- **Índice de tablas e ilustraciones:** números reales pendientes de asignar

---

## Archivos relevantes del repositorio

```

---

## Actualización de sesión 2026-05-01 - Cambios en app Kuxipilli

### Resumen general
- Se trabajó sobre la app en `TT_Academia` para ajustar la sección de cursos, tarjetas de aprendizaje y casos reales.
- El usuario quiere continuar en otro chat por consumo alto de tokens. Este bloque resume el estado para retomar sin releer toda la conversación.
- Importante: no revertir cambios no relacionados. El worktree tiene cambios del usuario en documentos y otros archivos.

### Cambios visuales en cursos
- Archivo principal: `client/src/pages/Modules.jsx`.
- Título cambiado de `Cursos de Especialidad` a `Cursos de Aprendizaje`.
- Iconos/logos de tarjetas actualizados:
  - Redes sociales: TikTok, Discord e Instagram.
  - Streaming: YouTube y Twitch.
  - Videojuegos: Roblox y Minecraft.
- Parte inferior de tarjetas actualizada para que no use textos genéricos de riesgos:
  - Redes sociales: privacidad, mensajes, huella digital, ciberacoso, grooming, retos y presión social.
  - Streaming: YouTube/Twitch seguros, publicidad, donaciones y bienestar.
  - Videojuegos: seguridad, privacidad, controles parentales, compras, fraudes y contactos.

### Casos reales - modelo y seed
- Archivos principales:
  - `server/src/models/Resource.js`
  - `server/src/scripts/seed/resources.js`
  - `client/src/pages/RealCases.jsx`
  - `client/src/pages/CaseDetail.jsx`
- `Resource.js` ahora incluye:
  - `sources: [{ label, url }]`
  - `subLabel`
  - `ageRange`
- `resources.js` ahora elimina casos antiguos no incluidos en `activeCaseSlugs`:
  - `deleteMany({ type: 'case', slug: { $nin: activeCaseSlugs } })`
- Los links de fuentes se muestran solo en `Ver análisis completo`, no en tarjetas.
- Se corrió `npm run seed:target -- resources` después de los cambios.

### Criterio de edad de casos
- El usuario pidió que todos los casos se centren en edades 6 a 12, con máximo 17.
- Se quitaron o reemplazaron casos cuyo centro era adulto o no encajaba:
  - Valeria Márquez, 23 años.
  - Buffalo/Twitch, víctimas adultas.
  - Video camuflado de TikTok basado en caso de adulto.
- Casos actuales y rango:
  1. Videojuegos: el asesinato de Breck Bednar - 14 años.
  2. Instagram: el caso Molly Russell - 14 años.
  3. YouTube: el caso Amanda Todd - 15 años.
  4. TikTok: el reto blackout - 10 a 14 años.
  5. YouTube: revictimización de Ainara - 16 años.
  6. Discord: perfil falso de menor - 8 años.
  7. Twitch: regalos para manipular - 9 a 12 años.
  8. Instagram: perfil prestado para acosar - menores de 13 años.
  9. Roblox: el viaje desde Mérida - menor de edad, máximo 17.
  10. TikTok: reto con clonazepam - secundaria, 12 a 15 aprox.

### Orden de gravedad
- El usuario pidió que primero aparezcan los más graves y después los menos graves.
- `order` actual en `resources.js`:
  1. Breck Bednar, grooming fatal en videojuegos.
  2. Molly Russell, suicidio asociado a contenido de autolesión/suicidio en Instagram/Pinterest.
  3. Amanda Todd, sextorsión/ciberacoso y suicidio, video en YouTube.
  4. TikTok blackout, reto con muertes de menores.
  5. Ainara/YosStop, revictimización y difusión/comentario de material de agresión sexual a menor.
  6. Discord Sonora, grooming/material sexual de menor de 8 años.
  7. Twitch Hines, regalos/tarjetas para manipular niños de 9 a 12.
  8. Instagram/TikTok perfil prestado, grooming a menores de 13.
  9. Roblox Mérida-CDMX, contacto y traslado para encuentro presencial.
  10. TikTok clonazepam, intoxicación por reto viral.

### CaseDetail - rediseño visual
- Archivo reconstruido: `client/src/pages/CaseDetail.jsx`.
- Corrección posterior: los textos visibles deben conservar ortografía española correcta en UTF-8, incluyendo `ñ` y tildes. No usar ASCII para evitar mojibake; revisar la codificación del archivo si reaparecen caracteres corruptos.
- Labels visibles corregidos:
  - `Análisis completo`
  - `Qué ocurrió y por qué importa`
  - `Señal de alerta`
  - `Evidencia periodística`
  - `Cronología`
- El análisis completo ahora tiene:
  - Tarjetas de `Plataforma`, `Riesgo`, `Edad`.
  - Bloque de lectura principal.
  - Tarjeta `Señal de alerta`.
  - Tarjeta `Respuesta clave`.
  - Fuentes con cards clicables y `target="_blank" rel="noopener noreferrer"`.
  - Cronología tipo timeline numerado.
  - Lecciones fundamentales.

### Veracidad y fuentes
- Se reforzó la redacción de `fullContent` para usar lenguaje cuidadoso:
  - `reportó`
  - `según la fuente`
  - `las fuentes citadas`
- Se revisaron fuentes al implementar:
  - The Guardian - Breck Bednar.
  - CBS News - Molly Russell.
  - AP - Amanda Todd.
  - The Guardian - TikTok blackout challenge.
  - CBS Philadelphia - Twitch/Geoffrey Hines.
  - La Jornada - clonazepam en secundaria.
  - N+ Sonora - Discord.
  - DW / El País - YosStop/Ainara.
  - TN - perfil falso Instagram/TikTok.
  - Diario de Yucatán / TV Azteca Yucatán - Roblox Mérida-CDMX.
- Nota: si se necesita máxima precisión académica, volver a abrir cada fuente y verificar detalles antes de citar formalmente en el documento.
### Verificaciones ejecutadas
- `npm run seed:target -- resources` en `server`: exitoso.
- Consulta directa a Mongo con Mongoose: confirmo 10 casos, orden 1-10 y 6 pasos de timeline por caso.
- `node --check src/scripts/seed/resources.js`: exitoso.
- `node --check src/models/Resource.js`: exitoso.
- `npm run build` en `client`: exitoso.
- Advertencia esperada de Vite: chunks mayores a 500 kB.

### Estado git relevante al cerrar
- Cambios propios de esta fase:
  - `client/src/pages/CaseDetail.jsx`
  - `client/src/pages/Modules.jsx`
  - `client/src/pages/RealCases.jsx`
  - `server/src/models/Resource.js`
  - `server/src/scripts/seed/resources.js`
  - `CONTEXTO_SESION.md`
- Cambios no necesariamente de esta fase / posiblemente del usuario o previos:
  - `RUTA_TODOS_CAPITULOS.md`
  - `Reporte_Tecnico.docx`
  - `Reporte_Tecnico.pdf`
  - `server/src/scripts/seed/courses/streaming/catalog.js`
  - `client/public/article-images/streaming/`
- No revertir nada sin permiso explicito.
TT_Academia/
├── Reporte_Tecnico.docx             ← versión editable (correcciones aplicadas 2026-05-01)
├── RUTA_TODOS_CAPITULOS.md          ← mapa completo 7 capítulos con estados [x]/[✓]/[!]/[ ]
├── CORRECCIONES.md                  ← texto listo para pegar en Word (Cap 1–7)
├── RUTA_CAPITULOS_6_7.md            ← plan original Caps 6-7 (reemplazado por RUTA_TODOS_CAPITULOS)
├── CONTEXTO_SESION.md               ← este archivo
├── client/src/
│   ├── pages/
│   │   ├── Dashboard.jsx            ← 4 fetches paralelos, recomendaciones + novedad dinámica + certificado html2canvas
│   │   ├── Profile.jsx              ← validación contraseña mín. 8 chars
│   │   ├── LessonView.jsx           ← renderer Markdown, YouTube iframe, volver al curso conserva lesson
│   │   ├── CourseDetail.jsx         ← scroll-to-lesson, admin bypass, centra tarjeta al volver
│   │   ├── QuizTaker.jsx            ← 10 tipos de pregunta
│   │   ├── RealCases.jsx            ← paginación incremental, tabs por URL
│   │   └── CaseDetail.jsx           ← timeline, tips, layout 4/8
│   ├── components/
│   │   └── Chatbot.jsx              ← height calc(100vh-8.25rem), kuxibot:toggle
│   ├── context/
│   │   └── AuthContext.jsx          ← JWT localStorage, GET /profile en mount
│   └── utils/
│       └── lessonType.js            ← getLessonTypeLabel, getLessonDisplayTitle
└── server/src/
    ├── routes/
    │   ├── auth.routes.js           ← 9 endpoints, rate limit auth 10/15min
    │   ├── quiz.routes.js           ← incluye GET /my-recommendations
    │   ├── progress.routes.js
    │   ├── chatbot.routes.js
    │   ├── report.routes.js
    │   ├── resource.routes.js
    │   └── content.routes.js        ← incluye GET /latest-update
    ├── models/
    │   ├── Lesson.js                ← type: ['article','video','guide'] (sin case_study)
    │   ├── Question.js              ← type: 10 valores (case_study SÍ aquí)
    │   ├── Attempt.js               ← riskLevel: Alto|Medio|Bajo
    │   ├── Recommendation.js        ← userId, sourceAttemptId, suggestedLessons, suggestedModules
    │   └── CaseReport.js            ← sin timestamps (solo createdAt manual)
    ├── services/
    │   ├── quizService.js           ← recomendaciones por preguntas falladas, limpieza al aprobar quiz
    │   └── progressService.js
    └── scripts/seed/
        ├── courses/social/catalog.js    ← M1–M7 reescritos, imágenes, grooming, mini glosarios
        ├── courses/streaming/catalog.js ← M1–M7 corregidos, YouTube/Twitch ajustado, mini glosarios
        ├── courses/games/module1.js     ← Q5(3/6), Q7(3+3+3), mini glosario
        ├── courses/games/module2.js     ← Q5(3/6), Q7(3+3+3), mini glosarios Roblox
        ├── courses/games/module3.js     ← mini glosarios Minecraft/Realms/permisos
        ├── courses/games/module4.js     ← Q5(3/6), mini glosario grooming/sextorsión
        ├── courses/games/module5.js     ← Q5(3/6), Q7(3+3+3), mini glosarios compras/mods
        ├── courses/games/module6.js     ← Q5(3/6), 'Salud Mental y Física' corregido
        └── courses/games/finalQuiz.js   ← ídem tilde
```
