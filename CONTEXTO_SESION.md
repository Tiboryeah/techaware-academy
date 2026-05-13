# Contexto de Sesión — Reporte Técnico Kuxipilli
## TT 2026-A097 | ESCOM · IPN

> Última actualización: 2026-05-12 (rev. 18)
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

## Cambios al CÓDIGO realizados en sesión 2026-05-12

### 7. Verificación y corrección de links rotos en casos reales

**Script usado:** verificación HEAD HTTP contra todos los links de fuentes del seed.

**Resultados:**
| Link | Estado | Acción |
|---|---|---|
| BBC News — Breck Bednar (`feeds.bbci.co.uk/...`) | ❌ 404 | Corregido a `www.bbc.com/news/uk-england-essex-30205716` |
| El País — Ainara/YosStop | ❌ 404 | Eliminado del seed y de Atlas (sin alternativa disponible) |
| Todos los demás (13 links) | ✅ 200 | Sin cambios |

**Archivos modificados:**
- `server/src/scripts/seed/resources.js` — BBC URL corregida, El País eliminado
- MongoDB Atlas — mismos cambios aplicados directamente con `findOneAndUpdate`

---

### 6. Fechas reales de casos en tarjetas y detalle

**Archivos modificados:** `server/src/models/Resource.js`, `client/src/pages/RealCases.jsx`, `client/src/pages/CaseDetail.jsx`

**Campo nuevo en modelo:** `caseDate: String` — fecha del evento en lenguaje natural (ej. "Febrero 2014").

**Fechas asignadas (derivadas de URLs de fuentes):**
| Caso | Fecha |
|---|---|
| Videojuegos: el asesinato de Breck Bednar | Febrero 2014 |
| Instagram: el caso Molly Russell | Noviembre 2017 |
| YouTube: el caso Amanda Todd | Octubre 2012 |
| YouTube: revictimización de Ainara | Junio 2021 |
| TikTok: reto con clonazepam | Enero 2023 |
| Instagram: perfil prestado para acosar | Agosto 2020 |
| TikTok: el reto blackout | 2021 – 2022 |
| Roblox: el viaje desde Mérida | Diciembre 2025 |
| Discord: perfil falso de menor | 2024 |
| Twitch: regalos para manipular | 2021 |

**Dónde aparece la fecha:**
- Tarjeta del listado (`RealCases.jsx`) → badge junto a edad y plataforma
- Detalle del caso (`CaseDetail.jsx`) → cuarta FactCard en la fila de datos del análisis completo (grid 2×4 en lugar de 1×3)

---

### 5. CaseDetail — sección de video animado por caso

**Archivos modificados:** `server/src/models/Resource.js`, `client/src/pages/CaseDetail.jsx`

**Campo nuevo en modelo:** `videoUrl: String`

**Comportamiento:** la sección de video aparece condicionalmente solo si el caso tiene `videoUrl`. Se coloca entre "Lectura del caso" y las tarjetas "Señal de alerta / Respuesta clave". Diseño: barra índigo con label "CASO ANIMADO" + iframe `aspect-video`.

**Videos asignados en Atlas (directamente con `findOneAndUpdate`):**
| Caso | URL |
|---|---|
| Breck Bednar | `https://www.youtube.com/watch?v=OfRVAQatCMo` |
| Molly Russell | `https://www.youtube.com/watch?v=SiIOV-FxVqg` |
| Amanda Todd | `https://www.youtube.com/watch?v=Zc3a3rLhIrA` |
| TikTok Blackout | `https://www.youtube.com/watch?v=CIT7B4soyMo` |
| Ainara | `https://www.youtube.com/watch?v=FaDC25FPJy4` |
| Discord perfil falso | `https://www.youtube.com/watch?v=dG9FZLR60Kk` |
| Twitch regalos | `https://www.youtube.com/watch?v=2cHsh_N5rDs` |
| Instagram perfil prestado | `https://www.youtube.com/watch?v=ISips_xurb0` |
| Roblox Mérida | `https://www.youtube.com/watch?v=KsbPsDgACHc` |
| TikTok clonazepam | `https://www.youtube.com/watch?v=1jTxumftBIs` |

---

### 4. RealCases — íconos por plataforma con colores oficiales y caseIcons con significado

**Archivos modificados:** `client/src/pages/RealCases.jsx`, `client/src/pages/CaseDetail.jsx`

**Íconos de categoría (significado del desenlace):**
| Categoría | Ícono | Significado |
|---|---|---|
| Grooming fatal | `Skull` | Caso terminó en muerte |
| Suicidio | `HeartCrack` | Pérdida emocional / suicidio |
| Ciberacoso | `UserX` | Persona atacada/excluida |
| Grooming / Explotación digital | `EyeOff` | El menor no ve el peligro |
| Retos virales / Violencia / Fraudes | `AlertTriangle` | Peligro físico o económico |

**Color del ícono según plataforma (`platformIconStyles`):**
TikTok → gris suave (no agresivo en modo claro) | YouTube → rojo | Twitch → morado | Minecraft → verde | Roblox → azul | Instagram → rosa | Discord → índigo

**Íconos de plataforma en badge:** reemplazados por `PlatformIcon` del componente `PlatformIcons.jsx` (SVG oficiales). Fallback: `Gamepad2` cian para plataformas sin ícono específico.

---

### 3. Rutas públicas — Casos y guías sin login

**Archivos modificados:** `client/src/App.jsx`, `client/src/components/Layout.jsx`, `server/src/routes/resource.routes.js`

- `/casos-y-guias`, `/casos/:id` movidas fuera del `<ProtectedRoute>` en App.jsx
- `protected: true → false` para "Casos y guías" en `NAV_LINKS` de Layout.jsx
- `protect` middleware eliminado de `GET /api/resources` y `GET /api/resources/:slug`

---

### 2. Mejoras visuales en LessonView — título duplicado y contexto de módulo en sidebar

**Archivos modificados:** `client/src/pages/LessonView.jsx`

#### Problema 1 resuelto: H1 del markdown duplicaba el título del header

El campo `content` de cada lección comienza con `# Título del artículo`, que se renderizaba como un H1 gigante dentro del cuerpo, repitiendo el título que ya aparecía en el header superior de la página.

**Solución:** en `renderLessonContent`, se añadió un flag `firstH1Skipped` que omite el primer `# ` heading del contenido markdown al iterar las líneas. El dato en MongoDB no se toca.

```js
let firstH1Skipped = false;
// dentro del loop:
if (!firstH1Skipped && line.startsWith('# ')) {
    firstH1Skipped = true;
    continue;
}
```

#### Problema 2 resuelto: sidebar sin contexto de módulo

El panel lateral ("Contenido") mostraba la lista de lecciones del módulo y la barra de progreso, pero el usuario no sabía en qué módulo estaba navegando.

**Solución:** se añadieron dos estados nuevos:
- `moduleNumber` (número 1-based del módulo dentro del curso)
- `moduleTitle` (nombre del módulo sin el prefijo "Módulo N:")

Poblados en el `useEffect` al resolver `currentModule`:
```js
const idx = courseData.modules.findIndex(m => m._id === lessonData.moduleId);
setModuleNumber(idx + 1);
setModuleTitle(rawTitle.replace(/^Módulo\s+\d+:\s*/i, ''));
```

El regex elimina "Módulo N: " de los títulos de videojuegos (que ya lo incluyen), mientras que los cursos de Redes Sociales y Streaming muestran su título directamente sin transformación.

Resultado visual en el sidebar, arriba de la barra de progreso:
```
CONTENIDO
MÓDULO 2              ← label índigo uppercase
Roblox: seguridad y control parental   ← título limpio, 2 líneas máx
[barra de progreso]
```

---

### 1. Cálculo y ajuste de duraciones por lección, módulo y curso (los 3 cursos)

**Motivación:** Las duraciones eran genéricas (artículos = 12 min todos, guías = 2 min, módulos = 28 min) y no reflejaban el contenido real de cada lección.

**Metodología aplicada:**
- Se creó el script utilitario `server/src/scripts/calculate-durations.js`
- Fórmula: `max(mínimo, round(palabras / 150 + imágenes × 0.5))`
  - WPM: 150 (conservador, padres no técnicos leyendo contenido educativo)
  - Bonus imagen: +0.5 min por imagen
  - Mínimo artículo: 4 min | Mínimo guía: 3 min
- Duración de módulo = suma de todas sus lecciones
- Duración de curso = suma de todos sus módulos
- Videos: mantienen `duration: 2` (placeholder, actualizar manualmente con duración real de YouTube)

**Archivos modificados:**
- `server/src/scripts/calculate-durations.js` — script de análisis (nuevo)
- `server/src/scripts/seed/courses/games/index.js`
- `server/src/scripts/seed/courses/games/module1.js` a `module6.js`
- `server/src/scripts/seed/courses/social/catalog.js`
- `server/src/scripts/seed/courses/streaming/catalog.js`

**Duraciones resultantes por curso:**

| Curso | Duración anterior | Duración nueva |
|---|---|---|
| Videojuegos (Roblox + Minecraft) | '3 horas' | '1 hora 58 min' |
| Redes Sociales (TikTok, Discord e Instagram) | '3 horas' | '1 hora 51 min' |
| Streaming (YouTube y Twitch) | '3 horas' | '1 hora 49 min' |
| **Total 3 cursos** | ~9 horas | **5 horas 38 min** |

**Duraciones por módulo — Videojuegos:**
| Módulo | Antes | Después |
|---|---|---|
| M1: Fundamentos de videojuegos en línea | '40 min' | '15 min' |
| M2: Roblox: seguridad y control parental | '28 min' | '18 min' |
| M3: Minecraft: cuentas familiares, multijugador y Realms | '28 min' | '14 min' |
| M4: Interacción social y señales de alerta | '28 min' | '28 min' (sin cambio) |
| M5: Compras digitales, estafas y descargas | '28 min' | '22 min' |
| M6: Bienestar digital y acompañamiento parental | '28 min' | '21 min' |

**Duraciones por módulo — Redes Sociales:**
| Módulo | Antes | Después |
|---|---|---|
| M1: Entender las redes sociales | '26 min' | '17 min' |
| M2: Privacidad, datos personales y huella digital | '26 min' | '15 min' |
| M3: Ciberacoso, presión social y daño emocional | '26 min' | '15 min' |
| M4: Contacto con desconocidos, grooming y manipulación | '26 min' | '16 min' |
| M5: Contenido inapropiado, retos virales y desinformación | '26 min' | '15 min' |
| M6: Compras, publicidad e influencia de creadores | '26 min' | '16 min' |
| M7: Bienestar digital, control parental y acompañamiento | '24 min' | '17 min' |

**Duraciones por módulo — Streaming:**
| Módulo | Antes | Después |
|---|---|---|
| M1: Introducción al streaming y consumo infantil | '26 min' | '14 min' |
| M2: Tipos de contenido y su impacto en los niños | '26 min' | '15 min' |
| M3: Riesgos en plataformas de streaming | '26 min' | '16 min' |
| M4: Monetización, publicidad y engaños | '26 min' | '18 min' |
| M5: Tiempo de pantalla y uso problemático | '26 min' | '14 min' |
| M6: Control parental y acompañamiento | '26 min' | '17 min' |
| M7: Uso positivo y educación digital | '24 min' | '15 min' |

**Cambio técnico en social/catalog.js:**
- La duración de módulo pasó de una expresión ternaria `idx < 6 ? '26 min' : '24 min'` a un array de valores individuales:
  `['17 min', '15 min', '15 min', '16 min', '15 min', '16 min', '17 min'][idx]`

**Seeds ejecutados exitosamente:**
- `npm run seed:games` ✅
- `npm run seed:social` ✅
- `npm run seed:streaming` ✅

### 2. Pendiente para el Reporte Técnico — cambios por documentar

Los siguientes campos del reporte deben actualizarse una vez que los videos también tengan duración real:

| Sección | Qué ajustar |
|---|---|
| §4.8.5 e) modules | Campo `duration` → ahora refleja suma real de lecciones del módulo (en lugar de estimado fijo) |
| §4.8.5 b) courses | Campo `duration` → nuevo rango real (~1h49m a 1h58m por curso, no '3 horas') |
| §4.8 (intro) o §6.2.9 | Agregar nota sobre metodología de cálculo de duración: WPM 150 + bonus imagen 0.5 min |
| §6.1 (descripción del contenido) | Si hay tabla o mención de duración de cursos, actualizar a '1 hora 49-58 min' por curso |

**Nota:** los videos siguen con `duration: 2` (placeholder). Cuando se actualicen con la duración real de YouTube, los totales de módulos y cursos subirán ligeramente. Se recomienda ejecutar nuevamente `calculate-durations.js` después de actualizar videos y repetir el ajuste.

### 3. CourseDetail — reemplazo de copa en badge "Curso Acreditado"

**Archivo modificado:** `client/src/pages/CourseDetail.jsx`

El badge de acreditación de curso que aparece en el hero de la página de detalle tenía un ícono `Trophy` de Lucide dentro de un cuadro amarillo. Se reemplazó por la imagen personalizada `client/public/images/copa_acreditada.png`.

**Estado final del badge:**
- Layout horizontal original restaurado (fondo `bg-yellow-500/10`, borde `border-yellow-500/20`, `rounded-3xl`)
- Imagen `copa_acreditada.png` con `w-28 h-28 -my-6` para que desborde levemente el card verticalmente sin agrandar el contenedor
- Contenedor con `overflow-visible` para permitir el desborde
- `drop-shadow` ámbar en la imagen para dar profundidad

**Iteraciones descartadas:** se probaron dos rediseños (tarjeta vertical con rayos y gradiente dorado, tarjeta horizontal con glow radial) pero el usuario prefirió restaurar el diseño original y solo cambiar el ícono.

---

### 4. Dashboard — badges de logros con imágenes personalizadas

**Archivos modificados:** `client/src/pages/Dashboard.jsx`

La sección "Mis Logros Digitales" usaba íconos de Lucide (`Gamepad2`, `Users`, `Tv`) dentro de cuadros con gradiente de color. Se reemplazaron por imágenes personalizadas con dos variantes según el estado del curso:

| Categoría | Completado | Pendiente |
|---|---|---|
| Videojuegos | `/images/badge_videojuegos.png` | `/images/badgegris_videojuegos.png` |
| Redes Sociales | `/images/badge_redes_sociales.png` | `/images/badgegris_redes.png` |
| Streaming | `/images/badge_streaming.png` | `/images/badgegris_streaming.png` |

**Cambios técnicos:**
- El array `badges` ahora incluye `imageColor` e `imageGray` en lugar de `icon`
- El render usa `<img src={badge.isCompleted ? badge.imageColor : badge.imageGray} className="w-16 h-16 object-contain" />`
- Se eliminaron los imports `Gamepad2`, `Users`, `Tv` y `React` (ya no usados)
- Se eliminó el div contenedor con gradiente de color alrededor del ícono

---

### 5. Script utilitario: activate-badges.js

**Archivo creado:** `server/src/scripts/activate-badges.js`

Script para activar/desactivar badges de prueba sin tocar la lógica de negocio:

```bash
# Activar todos los cursos como completados para un usuario
node src/scripts/activate-badges.js [email]
# Default: admin@example.com

# Para desactivar (inline):
node -e "...updateMany({ userId }, { \$set: { isCourseCompleted: false } })..."
```

Útil para probar el aspecto visual de las badges en cualquier cuenta sin necesidad de completar los cursos realmente.

---

### 6. LessonView — íconos de sidebar (revertido)

Se probó reemplazar los íconos `Play` y `FileText` del sidebar de lecciones con las imágenes `/images/video.png` y `/images/articulo.png`. El usuario prefirió revertir al diseño original con los íconos de Lucide.

**Estado actual:** `Play` y `FileText` de Lucide — sin cambios respecto al diseño original.

---

### 8. Contáctanos — eliminación del campo "Preferencia de respuesta"

**Contexto:** Se analizó implementar una bandeja de mensajes dentro de la plataforma (Opción A) para dar seguimiento a reportes cuando el usuario elegía "Respuesta dentro de la plataforma". Se evaluó el impacto en el reporte técnico (≈3 h reporte + ≈8 h código, todos cambios aditivos). Se decidió no implementar por ahora y simplificar: el campo se elimina del formulario y la respuesta siempre se da por correo electrónico.

**Archivos modificados:**

`client/src/pages/ContactPage.jsx`:
- Eliminado array `preferredReplyOptions`
- Eliminado campo `preferredReply` del estado inicial en `getInitialForm`
- Eliminado el bloque `<select>` de "Preferencia de respuesta" del formulario (estaba en grid 2 columnas junto al botón de evidencia)
- Botón "¿Cuentan con evidencia?" ajustado: ya no está dentro de un `grid md:grid-cols-2`, ahora es un bloque independiente con `w-full md:w-auto`
- Toast actualizado: `'Caso enviado. Nos pondremos en contacto por correo electrónico.'`
- Mensaje de éxito fallback actualizado al mismo texto

`server/src/routes/report.routes.js`:
- Mensaje 201 actualizado: `'Caso enviado. En breve lo analizaremos y nos pondremos en contacto por correo electrónico.'`

**Lo que NO se modificó:**
- `server/src/models/CaseReport.js` — el campo `preferredReply` sigue en el esquema con `default: 'Correo electrónico'` para mantener compatibilidad con documentos ya guardados en Atlas. Los nuevos envíos usarán el default automáticamente sin que el usuario lo seleccione.

**Plan documentado (no implementado):**
- Se agregó al final de `RUTA_TODOS_CAPITULOS.md` la sección **"PLAN: Opción A — Bandeja de mensajes dentro de la plataforma"** con todos los cambios de código y reporte necesarios para implementarla en el futuro si se decide retomar.

---

### 9. Home.jsx — aumento de tamaño de fuente en el landing (vista sin login)

Ajuste conservador: todos los textos de cuerpo subieron un paso de Tailwind. No se tocaron títulos principales, badges decorativos, citas de fuentes ni textos de botones.

| Elemento | Antes | Después |
|---|---|---|
| Hero subtítulo "Protege a tu hijo/a" | `text-lg sm:text-2xl` | `text-xl sm:text-2xl md:text-3xl` |
| Hero descripción de la plataforma | `text-base` | `text-lg` |
| Descripción sección "Los riesgos son reales" | `text-sm` | `text-base` |
| Cuerpos de las 3 tarjetas de riesgo | `text-sm` | `text-base` |
| Descripción sección "Cómo funciona" | `text-sm` | `text-base` |
| Textos de los 3 pasos | `text-sm` | `text-base` |
| Descripción sección "3 rutas de aprendizaje" | `text-sm` | `text-base` |
| Tópicos de cada programa | `text-sm` | `text-base` |
| Intro sección "¿Por qué Kuxipilli?" | `text-base` | `text-lg` |
| Descripciones Kuxi / Pilli | `text-sm` | `text-base` |
| Cita en bloque lateral | `text-sm` | `text-base` |
| CTA final descripción | `text-base` | `text-lg` |

---

### 10. Register.jsx — validación de formato de correo electrónico

**Archivo modificado:** `client/src/pages/Register.jsx`

**Regex aplicada:** `/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/`

Valida que el correo tenga: usuario + `@` + dominio + `.` + TLD de al menos 2 letras.

- `fulanito@correo.com` ✅ | `fulanito@hotmail.mx` ✅
- `fulanito@correo` ❌ (sin TLD) | `fulanitocorreo.com` ❌ (sin @)

**Comportamiento visual:**
- El borde del campo cambia a **rojo** si el formato es inválido, **verde** si es válido — en tiempo real mientras escribe
- Aparece texto de feedback debajo del campo (mismo estilo que la validación de contraseña)
- `isFormValid` requiere `emailIsValid === true` para habilitar el botón
- `handleSubmit` también valida antes de llamar a la API como segunda barrera

---

### 11. VerifyAccount.jsx — cooldown de 30 segundos al cargar la página

**Archivo modificado:** `client/src/pages/VerifyAccount.jsx`

**Antes:** el botón "Obtener nuevo código" aparecía habilitado inmediatamente al llegar a la página.

**Después:**
- Al montar el componente, `resendStatus` inicia en `'cooldown'` y `cooldown` en `30`
- Un `useEffect` arranca el intervalo automáticamente y cuenta regresiva: "Reenviar disponible en 30s" → 29s → ... → 0 → botón habilitado
- Al hacer clic y reenviar exitosamente, el cooldown vuelve a iniciar desde 30s (lógica ya existía)
- Se agregó `useEffect` al import de React

---

### 12. Corrección de commits incompletos — build de Netlify roto

Durante la sesión se detectó que varios archivos habían quedado sin subir a GitHub en commits anteriores, lo que causó un fallo de build en Netlify:

**Error:** `Could not resolve "../components/PlatformIcons" from "src/pages/RealCases.jsx"`

**Causa raíz:** al hacer commits por sesión, se seleccionaron solo los archivos de esa sesión y se omitieron archivos de sesiones anteriores que estaban en estado `untracked` o `modified`.

**Commits correctivos aplicados (2026-05-12):**

| Commit | Archivos | Descripción |
|---|---|---|
| `da3240f` | App.jsx, Layout.jsx, RealCases.jsx, CaseDetail.jsx, resource.routes.js | Rutas públicas de casos y guías sin login |
| `8bbf3f8` | 40 archivos en `client/public/images/` y `client/public/article-images/videojuegos/` y `lesson-banners/` | Imágenes de badges, trofeo, artículos videojuegos, banners |
| `c7b937b` | PlatformIcons.jsx, CourseDetail.jsx, Dashboard.jsx, LessonView.jsx, lessonBanner.js, Resource.js, seeds (games/social/streaming), resources.js | Componente faltante que rompía el build + cambios pendientes de sesiones anteriores |

**Estado del repositorio tras los commits:** limpio. Solo quedan sin subir scripts de utilidad local (`activate-badges.js`, `calculate-durations.js`, `setup-local-windows.ps1`, `start-local-windows.*`) que no afectan el build ni la app.

**Lección:** al stagear archivos para commit, revisar siempre `git status --short` completo para no dejar archivos `??` (untracked) o ` M` (modified) que dependencias del frontend importen directamente.

---

## Archivos relevantes del repositorio

```

---

## Actualización de sesión 2026-05-11 - Curso Videojuegos, tablas e imágenes

### Arranque local
- Se levantó la aplicación en local desde `TT_Academia`.
- Frontend activo en `http://127.0.0.1:5173/`.
- Backend activo en `http://127.0.0.1:5000/`.
- Verificaciones:
  - Frontend respondió `200 OK`.
  - Backend respondió `API is running...`.
  - Backend conectó correctamente con MongoDB Atlas.
- Logs locales usados:
  - `server.local.out.log`
  - `server.local.err.log`
  - `client.local.out.log`
  - `client.local.err.log`

### Videojuegos - reemplazo puntual por imágenes
- Archivo principal:
  - `server/src/scripts/seed/courses/games/module1.js`
- En **M1A1** (`Artículo 1: ¿Qué son los videojuegos en línea y cómo funcionan?`):
  - Se reemplazó la lista bajo `## Cómo funciona un juego en línea` por:
    - `/article-images/videojuegos/M1A1.png`
- En **M1G1** (`Guía visual: Cuenta, servidor, chat, compras y multijugador`):
  - Se reemplazó la lista bajo `## Ruta visual de un juego en línea` por:
    - `/article-images/videojuegos/M1G1.png`
- Verificaciones:
  - `M1A1.png` respondió `200 OK` en Vite.
  - `M1G1.png` respondió `200 OK` en Vite.
  - `node --check server/src/scripts/seed/courses/games/module1.js` exitoso.
  - `npm run seed:games` ejecutado después de cada bloque.

### Videojuegos - imágenes faltantes reemplazadas por tablas
- Problema detectado:
  - `module3.js` tenía referencias antiguas a `/uploads/...`.
  - `client/public/uploads` no existe.
  - Las únicas imágenes reales del curso Videojuegos disponibles son:
    - `client/public/article-images/videojuegos/M1A1.png`
    - `client/public/article-images/videojuegos/M1G1.png`
- Archivo corregido:
  - `server/src/scripts/seed/courses/games/module3.js`
- Se reemplazaron 7 imágenes rotas por tablas Markdown:
  - Diferencias entre Minecraft Java y Bedrock.
  - Formas de juego en línea.
  - Funcionamiento de Realms.
  - Semáforo de riesgo en Minecraft.
  - Capas de permisos.
  - Diagnóstico para jugar con amigos.
  - Jugar vs comunicarse.
- Verificación:
  - En seeds activos de Videojuegos ya no quedan rutas `/uploads/...`.
  - La búsqueda amplia todavía encuentra `/uploads` en `server/backups` y documentos históricos, pero no afectan la app.

### Videojuegos - refuerzo tabular completo del curso
- Objetivo del usuario:
  - Que el curso de Videojuegos tenga estructura similar a Redes Sociales y Streaming.
  - Cada artículo/guía debe tener al menos dos tablas o bloques visuales equivalentes.
  - No eliminar información existente, porque de ahí salen los exámenes.
  - Solo agregar o reestructurar contenido complementario.
  - Mantener información verídica y basada en fuentes confiables.
- Archivos editados:
  - `server/src/scripts/seed/courses/games/module1.js`
  - `server/src/scripts/seed/courses/games/module2.js`
  - `server/src/scripts/seed/courses/games/module3.js`
  - `server/src/scripts/seed/courses/games/module4.js`
  - `server/src/scripts/seed/courses/games/module5.js`
  - `server/src/scripts/seed/courses/games/module6.js`

### Tablas agregadas por módulo
- **Módulo 1**
  - Conceptos base: cuenta, servidor, chat, compra dentro del juego, multijugador.
  - Revisión antes de autorizar un juego.
  - Ruta visual después de la imagen `M1G1.png`.
  - Comparación Roblox vs Minecraft.
  - Economía/compras: Robux vs Minecoins.
- **Módulo 2**
  - Requisitos para cuenta parental de Roblox.
  - Rutas de vinculación: correo electrónico y `Add parent`.
  - Capas de control: madurez de contenido, comunicación, servidores privados, tiempo y gasto.
  - Jerarquía de configuración recomendada.
- **Módulo 3**
  - Tablas sustitutas de las imágenes faltantes:
    - Java vs Bedrock.
    - Formas de juego.
    - Realms.
    - Semáforo de riesgo.
    - Capas de permisos.
    - Diagnóstico de multijugador.
    - Jugar vs comunicarse.
- **Módulo 4**
  - Riesgos: ciberacoso, grooming y exposición de datos.
  - Señales observables y respuesta familiar inicial.
  - Primer momento de respuesta: escuchar, calmar, entender, documentar y actuar.
  - Semáforo de decisión.
  - Tabla `Sí / No` ante interacciones de riesgo.
- **Módulo 5**
  - Comparación Robux vs Minecoins.
  - Situaciones de compra, riesgo y medida preventiva.
  - Oficial/no oficial: Marketplace, add-ons, mods de Java, descargas de terceros.
  - Preguntas antes de descargar o comprar.
- **Módulo 6**
  - Horas de sueño recomendadas por edad.
  - Bloques de bienestar: sueño, escuela, actividad física, familia, otros intereses.
  - Preguntas abiertas para acompañamiento.
  - Control distante vs acompañamiento activo.

### Fuentes usadas para cuidar veracidad
- Roblox Support - Parental Controls Overview:
  - https://en.help.roblox.com/hc/en-us/articles/30428310121620-Parental-Controls-Overview
- Roblox Support - Safety Features: Chat, Privacy & Filtering:
  - https://en.help.roblox.com/hc/en-us/articles/203313120-Safety-Features-Chat-Privacy-Filtering
- Minecraft Parents' Guide:
  - https://www.minecraft.net/en-us/article/parents--guide-minecraft
- Minecraft - Parental Controls:
  - https://www.minecraft.net/en-us/article/parental-controls
- Xbox Family Hub:
  - https://www.xbox.com/en-US/family-hub

### Validaciones ejecutadas
- `node --check` en:
  - `server/src/scripts/seed/courses/games/module1.js`
  - `server/src/scripts/seed/courses/games/module2.js`
  - `server/src/scripts/seed/courses/games/module3.js`
  - `server/src/scripts/seed/courses/games/module4.js`
  - `server/src/scripts/seed/courses/games/module5.js`
  - `server/src/scripts/seed/courses/games/module6.js`
- Búsqueda final de imágenes en seeds activos:
  - Solo quedan:
    - `/article-images/videojuegos/M1A1.png`
    - `/article-images/videojuegos/M1G1.png`
- Conteo final por lección textual:
  - Todos los artículos y la guía de Videojuegos tienen al menos 2 tablas.
  - Módulo 3 Artículo 1 tiene 4 tablas.
  - Módulo 3 Artículo 2 tiene 3 tablas.
  - Módulo 4 Artículo 2 tiene 3 tablas.
- `npm run seed:games` ejecutado correctamente después de los cambios.

### Estado importante
- No se eliminaron listas ni definiciones existentes que alimentan exámenes.
- Se agregó contenido complementario en forma de tablas para mejorar lectura y permitir conversión posterior a imágenes.
- El curso Videojuegos quedó sincronizado en MongoDB Atlas.

### Ajuste de calidad posterior - evitar repetición visual
- El usuario detectó que algunas tablas repetían de forma demasiado directa información que ya aparecía como lista o imagen.
- Criterio actualizado:
  - No agregar tablas solo para cumplir cantidad.
  - Si una lista, imagen o bloque visual ya comunica la información, no duplicarla inmediatamente debajo.
  - Las tablas deben aportar una dimensión distinta: comparación, decisión familiar, señal de riesgo, respuesta recomendada o contraste entre plataformas.
  - Priorizar calidad editorial y lectura profesional sobre número mecánico de tablas.
- Correcciones aplicadas:
  - `server/src/scripts/seed/courses/games/module1.js`
    - En M1A1 se eliminó la tabla que repetía los 5 conceptos base ya listados.
    - En M1G1 se eliminó la tabla que repetía la ruta visual ya mostrada en `M1G1.png`.
  - Se mantuvieron tablas que sí agregan valor:
    - revisión antes de autorizar un juego;
    - comparación Roblox vs Minecraft;
    - economía/compras;
    - riesgo, respuesta, decisión o supervisión en módulos posteriores.
- Validaciones:
  - `node --check server/src/scripts/seed/courses/games/module1.js` exitoso.
  - `npm run seed:games` ejecutado correctamente tras la limpieza.

### Ajuste editorial adicional - claridad en todos los artículos de Videojuegos
- El usuario señaló que **M1A2** (`Artículo 2: Diferencias clave entre Roblox y Minecraft para una familia`) seguía repetitivo:
  - Se explicaba "Roblox plataforma / Minecraft sandbox" en párrafos.
  - Luego la tabla volvía a comunicar la misma idea.
- Criterio aplicado desde este punto:
  - Cuando una tabla es la pieza principal, el texto previo debe introducir la lectura, no repetirla.
  - Cuando una lista ya es necesaria y clara, no se agrega tabla equivalente debajo.
  - Cuando una tabla se mantiene, debe aportar comparación, decisión, riesgo o acción; no parafrasear.
- Limpiezas aplicadas:
  - `server/src/scripts/seed/courses/games/module1.js`
    - En M1A2 se redujeron los párrafos de `Plataforma vs sandbox` a una introducción breve antes de la tabla.
    - En `Qué cambia para la supervisión` se eliminaron listas separadas de Roblox/Minecraft y se dejó una síntesis clara.
    - En `Economía y compras` se cambió la lista redundante por una frase introductoria antes de la tabla.
  - `server/src/scripts/seed/courses/games/module2.js`
    - Se eliminó la lista redundante de requisitos de cuenta parental antes de la tabla.
    - Se quitaron los párrafos duplicados de Ruta A/Ruta B porque la tabla ya explica las rutas de vinculación.
  - `server/src/scripts/seed/courses/games/module4.js`
    - Se eliminaron los subtítulos repetidos Amarillo/Naranja/Rojo después de la tabla de semáforo.
    - Se eliminó la tabla `Sí/No` porque repetía la lista inmediata de acciones.
  - `server/src/scripts/seed/courses/games/module5.js`
    - Se compactó la sección Bedrock vs Java para no repetirla como lista y tabla.
    - Se eliminó la sección "Una forma simple de explicárselo..." porque duplicaba la tabla de oficial/no oficial.
    - Se redujo la lista previa a la tabla de preguntas antes de descargar/comprar.
  - `server/src/scripts/seed/courses/games/module6.js`
    - Se eliminó la lista de bloques de bienestar porque la tabla ya desarrolla esos bloques.
    - Se eliminó la lista de preguntas abiertas antes de la tabla.
    - Se eliminaron las listas de supervisión distante/acompañamiento activo porque la tabla ya expresa ese contraste.
- Validaciones:
  - `node --check` exitoso en `module1.js` a `module6.js`.
  - Conteo final aproximado en seeds activos:
    - `module1.js`: 4 tablas, 2 imágenes.
    - `module2.js`: 4 tablas.
    - `module3.js`: 7 tablas.
    - `module4.js`: 4 tablas.
    - `module5.js`: 4 tablas.
    - `module6.js`: 4 tablas.
  - `npm run seed:games` ejecutado correctamente.
- Estado:
  - El curso sigue conservando la información base de exámenes.
  - Se redujo repetición visual/textual en los artículos.
  - Las tablas restantes deben revisarse como contenido editorial, no como requisito mecánico.

### Videojuegos M1A2 - reemplazo de tablas por imágenes
- Archivo editado:
  - `server/src/scripts/seed/courses/games/module1.js`
- Lección:
  - **M1A2**: `Artículo 2: Diferencias clave entre Roblox y Minecraft para una familia`.
- Cambios:
  - Se reemplazó la tabla de `## 1. Plataforma vs sandbox` por:
    - `/article-images/videojuegos/M1A2.png`
  - Se reemplazó la tabla de `## 3. Economía y compras` por:
    - `/article-images/videojuegos/M1A2.1.png`
  - Se conservaron las frases introductorias para dar contexto.
  - Se conservaron las preguntas finales porque refuerzan el criterio evaluable del artículo.
- Verificaciones:
  - `client/public/article-images/videojuegos/M1A2.png` existe.
  - `client/public/article-images/videojuegos/M1A2.1.png` existe.
  - Ambas imágenes respondieron `200 OK` desde Vite.
  - `node --check server/src/scripts/seed/courses/games/module1.js` exitoso.
  - `npm run seed:games` ejecutado correctamente.

### Corrección M1A2 - imagen de glosario reubicada
- Problema detectado por el usuario:
  - `M1A2.png` no era una comparación "Plataforma vs sandbox"; era una imagen de **Mini glosario para padres**.
  - Se veía incorrecta bajo el encabezado `## 1. Plataforma vs sandbox`.
- Corrección aplicada:
  - `M1A2.png` se movió al inicio del artículo, bajo `## Términos clave antes de comparar`.
  - Se eliminaron las definiciones en texto de Sandbox, Experiencia de Roblox, Realm, Bedrock Edition y Java Edition porque ya vienen dentro de la imagen.
  - La sección `## 1. Plataforma vs sandbox` quedó como comparación textual real:
    - Roblox = plataforma con experiencias creadas por usuarios.
    - Minecraft = juego sandbox donde importan edición, mundo, Realm o servidor público.
  - `M1A2.1.png` se mantuvo en `## 3. Economía y compras`, porque sí corresponde a esa sección.
- Validaciones:
  - `node --check server/src/scripts/seed/courses/games/module1.js` exitoso.
  - `npm run seed:games` ejecutado correctamente.

### Videojuegos M2A1 - reemplazo de bloques por imágenes
- Archivo editado:
  - `server/src/scripts/seed/courses/games/module2.js`
- Lección:
  - **M2A1**: `Artículo 1: Vincular cuenta del padre/tutor y cuenta del menor`.
- Cambios:
  - En `## ¿Qué es una cuenta con privilegios parentales?` se reemplazó la tabla de requisitos/función/riesgo por:
    - `/article-images/videojuegos/M2A1.png`
  - En `## ¿Por qué el adulto necesita su propia cuenta?` se compactó el texto para evitar repetir la imagen.
  - Se reemplazó el bloque `Beneficios Técnicos de la Vinculación` por:
    - `/article-images/videojuegos/M2A1.1.png`
- Verificaciones:
  - `client/public/article-images/videojuegos/M2A1.png` existe.
  - `client/public/article-images/videojuegos/M2A1.1.png` existe.
  - Ambas imágenes respondieron `200 OK` desde Vite.
  - `node --check server/src/scripts/seed/courses/games/module2.js` exitoso.
  - `npm run seed:games` ejecutado correctamente.

### Videojuegos M2A2 - reemplazo de glosario y reglas de consentimiento por imágenes
- Archivo editado:
  - `server/src/scripts/seed/courses/games/module2.js`
- Lección:
  - **M2A2**: `Artículo 2: Privacidad, chat, madurez de contenido, tiempo y gasto`.
- Cambios:
  - En `## Mini glosario para padres` se reemplazaron las definiciones de:
    - Madurez de contenido.
    - Experience Chat.
    - Direct Chat.
    - Parties.
    - Private Servers.
    - Conexiones.
  - Imagen usada:
    - `/article-images/videojuegos/M2A2.png`
  - En `## 2. Privacidad y chat: Ejes de comunicación segura` se reemplazó el bloque de `Reglas de Consentimiento` por:
    - `/article-images/videojuegos/M2A2.1.png`
  - Se conservó el texto contextual de la sección para que la imagen no aparezca aislada.
- Verificaciones:
  - `client/public/article-images/videojuegos/M2A2.png` existe.
  - `client/public/article-images/videojuegos/M2A2.1.png` existe.
  - Ambas imágenes respondieron `200 OK` desde Vite.
  - `node --check server/src/scripts/seed/courses/games/module2.js` exitoso.
  - `npm run seed:games` ejecutado correctamente.

### Videojuegos M3A1 - reemplazo de glosario y semáforo por imágenes
- Archivo editado:
  - `server/src/scripts/seed/courses/games/module3.js`
- Lección:
  - **M3A1**: `Artículo 1: Java vs Bedrock, servidores, Realms y niveles de riesgo`.
- Cambios:
  - En `## Mini glosario para padres` se reemplazaron las definiciones de:
    - Java Edition.
    - Bedrock Edition.
    - Cross-play.
    - Marketplace.
    - Servidor público.
  - Imagen usada:
    - `/article-images/videojuegos/M3A1.png`
  - En `## Semáforo de Riesgo en Minecraft` se reemplazó la tabla de nivel/entorno/señal/acción por:
    - `/article-images/videojuegos/M3A1.1.png`
  - Se eliminó la lista redundante de Riesgo Bajo/Moderado/Alto que repetía el contenido del semáforo.
  - Se conservó la `Regla de Oro` porque funciona como cierre práctico.
- Verificaciones:
  - `client/public/article-images/videojuegos/M3A1.png` existe.
  - `client/public/article-images/videojuegos/M3A1.1.png` existe.
  - Ambas imágenes respondieron `200 OK` desde Vite.
  - `node --check server/src/scripts/seed/courses/games/module3.js` exitoso.
  - `npm run seed:games` ejecutado correctamente.

### Videojuegos M3A2 - reemplazo de diagnóstico y checklist por imágenes
- Archivo editado:
  - `server/src/scripts/seed/courses/games/module3.js`
- Lección:
  - **M3A2**: `Artículo 2: Permisos de privacidad, amigos, chat y multijugador`.
- Cambios:
  - En `## ¿Por qué mi hijo no puede jugar con amigos?` se reemplazó la tabla de diagnóstico por:
    - `/article-images/videojuegos/M3A2.png`
  - En `## Checklist de Revisión Prioritaria` se reemplazó la lista numerada por:
    - `/article-images/videojuegos/M3A2.1.png`
  - Se conservó el texto contextual antes de cada imagen y la nota final `Recuerda`.
- Verificaciones:
  - `client/public/article-images/videojuegos/M3A2.png` existe.
  - `client/public/article-images/videojuegos/M3A2.1.png` existe.
  - Ambas imágenes respondieron `200 OK` desde Vite.
  - `node --check server/src/scripts/seed/courses/games/module3.js` exitoso.
  - `npm run seed:games` ejecutado correctamente.

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

### Actualización posterior: UptimeRobot, dominio y subida a GitHub
- Se corrigió el falso incidente de UptimeRobot por `HTTP 429 - Too Many Requests`.
- Causa: el monitor pegaba a una ruta normal del backend y podía consumir el rate limit global.
- Archivo modificado: `server/src/index.js`.
- Cambios aplicados:
  - `app.set('trust proxy', 1)` para Render.
  - Endpoint liviano `GET /health`.
  - Endpoint alterno `GET /api/health`.
  - Exclusión de `/health` y `/api/health` del rate limiter.
  - Fallback de CORS actualizado con `https://kuxipilli.com` y `https://www.kuxipilli.com`.
- Configuración recomendada:
  - Monitor de backend/API en UptimeRobot: `https://techaware-academy.onrender.com/health`.
  - Monitor opcional de frontend público: `https://kuxipilli.com/`.
  - No usar `https://kuxipilli.com/` como monitor principal para mantener o comprobar el backend.
- Se actualizó `client/.env.example` para documentar que `VITE_API_URL` apunta al backend de Render.

### Subidas a GitHub
- Rama: `main`.
- Remoto: `origin https://github.com/Tiboryeah/techaware-academy`.
- Commits subidos:
  - `46240f0 Fix health checks and Spanish case text`
    - Corrección de `/health`, rate limit, CORS y `client/.env.example`.
    - Corrección de ortografía española en casos reales (`ñ`, tildes y mojibake).
    - Corrección de `RealCases.jsx`, `CaseDetail.jsx` y `server/src/scripts/seed/resources.js`.
    - `npm run seed:target -- resources` ejecutado después de corregir los textos.
  - `2bdcb76 Add streaming article assets and report updates`
    - Subidas las 26 imágenes de `client/public/article-images/streaming/`.
    - Incluye cambios en `RUTA_TODOS_CAPITULOS.md`, `Reporte_Tecnico.docx`, `Reporte_Tecnico.pdf`, `Modules.jsx`, `Resource.js` y `server/src/scripts/seed/courses/streaming/catalog.js`.
- Estado al cerrar: `git status --short` quedó limpio antes de esta actualización de contexto.
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

### Actualización sesión 2026-05-11 — Curso Videojuegos, M4A1
- Archivo modificado: `server/src/scripts/seed/courses/games/module4.js`.
- Solicitud atendida: revisar el bloque de M4A1 donde decía `Tres conceptos que conviene distinguir`, porque la explicación posterior se sentía engorrosa.
- Cambio editorial aplicado:
  - Se compactó la explicación inicial en una tabla comparativa clara: `Ciberacoso`, `Grooming / online enticement` y `Datos personales`.
  - Se conservan las fuentes ya usadas en el contenido: StopBullying.gov, NCMEC, UNICEF y HealthyChildren.
  - Se mantiene contenido evaluable: ciberacoso, grooming, online enticement, sextorsión, identidad falsa, huella digital, datos personales, secretos, contacto externo, fotos y señales de alerta.
  - Se sustituyó la secuencia larga de definición + ejemplos + tabla + otra definición + glosario por una ruta más limpia: comparación, mini glosario y escalamiento del riesgo.
  - Se redujo la repetición en la sección `Ciberacoso y grooming no son lo mismo, pero pueden mezclarse`, dejándola como criterio de respuesta familiar y urgencia.
- Validación técnica:
  - `node --check server/src/scripts/seed/courses/games/module4.js` ejecutado correctamente.
  - `npm run seed:games` ejecutado correctamente desde `server`; MongoDB quedó sincronizado con el M4A1 actualizado.

### Ajuste posterior M4A1 — Datos personales
- Archivo modificado: `server/src/scripts/seed/courses/games/module4.js`.
- Se reemplazó la lista larga de `Datos personales: lo que nunca debería compartirse` por una tabla compacta de 3 categorías:
  - `Identidad`.
  - `Contacto y acceso`.
  - `Ubicación y rutina`.
- Motivo:
  - La lista de 9 elementos era pesada visualmente y rompía el estilo del artículo.
  - La tabla conserva la información evaluable, pero la presenta con mejor jerarquía editorial.
- Validación:
  - `node --check server/src/scripts/seed/courses/games/module4.js` ejecutado correctamente.
  - `npm run seed:games` ejecutado correctamente; MongoDB quedó sincronizado con este ajuste.

### Actualización sesión 2026-05-12 — Revisión, arranque local y curso Videojuegos

#### Arranque local de la aplicación
- Se retomó el proyecto desde `c:\Users\USER\.gemini\antigravity\scratch\TT_Academia`.
- Se revisaron `CONTEXTO_SESION.md` y `README_EJECUTAR_LOCAL.md` para levantar la app sin perder el hilo.
- Backend levantado en `http://localhost:5000`.
  - `GET /api/health` respondió correctamente.
  - El servidor conectó con MongoDB Atlas usando `server/.env`.
  - Importante: `server/.env` contiene secretos reales; no compartir ni commitear.
- Frontend Vite levantado en `http://localhost:5173`.
  - Se corrigió un arranque inicial con argumento incorrecto y se dejó corriendo con `vite --host 127.0.0.1`.
- Logs locales usados:
  - `server.local.out.log`
  - `server.local.err.log`
  - `client.local.out.log`
  - `client.local.err.log`

#### Revisión de los cursos
- El proyecto conserva 3 cursos principales: Redes Sociales, Streaming y Videojuegos.
- En esta sesión la edición directa se concentró en el curso `Videojuegos`, porque ahí estaban los reportes visuales y las solicitudes de reemplazo por imágenes.
- No se revirtió ni se reescribió contenido de Redes Sociales ni Streaming durante esta parte; esos cursos quedan como estaban antes de esta sesión.
- Se revisó que el problema principal en Videojuegos era de presentación: mucha información correcta estaba usando listas numeradas renderizadas como tarjetas grandes, provocando exceso de espacio vertical y sensación de repetición.

#### Limpieza editorial aplicada en Videojuegos
- Archivos editados:
  - `server/src/scripts/seed/courses/games/module1.js`
  - `server/src/scripts/seed/courses/games/module2.js`
  - `server/src/scripts/seed/courses/games/module3.js`
  - `server/src/scripts/seed/courses/games/module4.js`
  - `server/src/scripts/seed/courses/games/module5.js`
  - `server/src/scripts/seed/courses/games/module6.js`
- Criterio aplicado:
  - No quitar información valiosa.
  - Reducir repeticiones.
  - Cambiar listas largas por tablas compactas, síntesis y bloques más claros.
  - Mantener la información evaluable para quizzes y comprensión del curso.
- Ajustes por módulos:
  - M1: se compactaron definiciones repetidas entre artículo y guía visual.
  - M2: se redujeron definiciones duplicadas sobre cuenta parental, controles y jerarquías.
  - M3: se compactaron permisos, señales y capas de conversación.
  - M4: se reorganizaron señales, respuesta familiar, prevención y conceptos de riesgo.
  - M5: se compactaron microtransacciones, Robux/Minecoins, mods, add-ons y Marketplace.
  - M6: se compactaron criterios de uso saludable, sueño, acompañamiento y conversación familiar.
- Revisión de repetición:
  - Se buscó contenido duplicado en el curso.
  - Lo repetido que quedó corresponde principalmente a metadatos, opciones de quiz o conceptos que deben reaparecer por evaluación; no se detectaron duplicados fuertes de bloques explicativos después de la limpieza.

#### Reemplazos por imágenes en Videojuegos
- Todas las imágenes están en `client/public/article-images/videojuegos/`.
- M4A1, artículo 1 del módulo 4:
  - `M4A1.png` reemplaza `Lo primero: mantener la calma y escuchar`.
  - `M4A1.1.png` reemplaza `Cortar la interacción sin escalar el conflicto`.
  - Se verificó que estas imágenes quedaron solo en el artículo 1 y no en el artículo 2.
- M4A2, artículo 2 del módulo 4:
  - `M4A2.png` reemplaza `Lo primero: mantener la calma y escuchar`.
  - `M4A2.1.png` reemplaza `Cortar la interacción sin escalar el conflicto`.
  - `M4A2.2.png` reemplaza `Caja de conceptos clave`.
- M5A1, artículo 1 del módulo 5:
  - `M5A1.png` reemplaza `¿Qué son las microtransacciones?`.
  - `M5A1.1.png` reemplaza `¿Qué es Robux?`.
  - `M5A1.2.png` reemplaza `¿Qué son Minecoins?`.
- M5A2, artículo 2 del módulo 5:
  - `M5A2.png` reemplaza `¿Qué es un add-on?`.
  - `M5A2.1.png` reemplaza `¿Por qué importa tanto la fuente de descarga?`.
  - `M5A2.2.png` reemplaza `Caja de conceptos clave`.
- M6A1, artículo 1 del módulo 6:
  - `M6A1.png` reemplaza `No todo se resume a “cuántas horas juega”`.
  - `M6A1.1.png` reemplaza `Jugar de noche cambia más cosas de las que parece`.
  - `M6A1.2.png` reemplaza `Checklist rápido: ¿uso saludable o uso problemático?`.
- M6A2, artículo 2 del módulo 6:
  - `M6A2.png` reemplaza `Acompañar empieza por interesarse de verdad`.
  - `M6A2.1.png` reemplaza `Del control al acompañamiento`.

#### Validación técnica realizada
- `node --check` ejecutado correctamente para los módulos modificados de Videojuegos.
- `npm run seed:games` ejecutado correctamente varias veces desde `server`; MongoDB quedó sincronizado con los cambios.
- `npm run build` ejecutado correctamente desde `client`.
  - Queda la advertencia normal de Vite sobre chunks mayores a 500 kB; no bloquea el build.
- Se consultó MongoDB para verificar que las imágenes quedaron en los artículos correctos:
  - M4A1 en módulo 4 artículo 1.
  - M4A2 en módulo 4 artículo 2.
  - M5A1 en módulo 5 artículo 1.
  - M5A2 en módulo 5 artículo 2.
  - M6A1 en módulo 6 artículo 1.
  - M6A2 en módulo 6 artículo 2.
- Se hicieron checks HTTP contra Vite y las rutas de imágenes respondieron `200`.

#### Estado para continuar en otro chat
- La app quedó levantada localmente:
  - Frontend: `http://localhost:5173`
  - Backend: `http://localhost:5000`
- Estado de trabajo observado:
  - Hay cambios en `CONTEXTO_SESION.md`.
  - Hay cambios en `server/src/scripts/seed/courses/games/module1.js` a `module6.js`.
  - La carpeta `client/public/article-images/videojuegos/` aparece como nueva/no trackeada en Git.
  - También aparecen archivos locales auxiliares/no trackeados como `README_EJECUTAR_LOCAL.md`, `setup-local-windows.ps1`, `start-local-windows.bat` y `start-local-windows.ps1`.
- Recomendación para el siguiente chat:
  - Si se pide una revisión profunda de los 3 cursos completos, empezar comparando `server/src/scripts/seed/courses/social/catalog.js`, `server/src/scripts/seed/courses/streaming/catalog.js` y `server/src/scripts/seed/courses/games/`.
  - Si se pide continuar con imágenes, verificar primero el artículo exacto en MongoDB o en el seed antes de insertar assets, para no repetir el error de poner imágenes en el artículo equivocado.

---

## Cambios al CÓDIGO realizados en sesión 2026-05-13

### 1. Encabezados duplicados antes de imágenes — limpieza en los 3 cursos
- Se revisaron los artículos con imágenes en:
  - `server/src/scripts/seed/courses/games/module1.js` a `module6.js`
  - `server/src/scripts/seed/courses/social/catalog.js`
  - `server/src/scripts/seed/courses/streaming/catalog.js`
- Se eliminaron encabezados Markdown duplicados que aparecían inmediatamente antes de imágenes, por ejemplo un título de sección repetido encima de una imagen que ya contenía ese mismo encabezado visual.
- Criterio usado:
  - Solo quitar encabezados cuando la imagen ya hacía evidente el título o cuando el encabezado generaba repetición visual.
  - No quitar información conceptual ni explicaciones.
- Validación:
  - `node --check` sobre archivos modificados.
  - `npm run seed:content` ejecutado para sincronizar cambios en MongoDB Atlas.

### 2. Curso Videojuegos — reducción de fuentes repetidas y actualización Roblox Voice Chat
- Archivos editados:
  - `server/src/scripts/seed/courses/games/module2.js`
  - `server/src/scripts/seed/courses/games/module4.js`
  - `server/src/scripts/seed/courses/games/finalQuiz.js`
- Se redujo la repetición editorial de menciones a fuentes oficiales en el curso de videojuegos, especialmente en secciones donde se citaban plataformas u organismos demasiadas veces de forma seguida.
- Se agregó contenido nuevo sobre **Roblox Voice Chat**:
  - Ubicación principal: módulo 2, artículo 2 `Privacidad, chat, madurez de contenido, tiempo y gasto`.
  - Sección nueva: `Chat de voz en Roblox: qué cambia para una familia`.
  - Explica:
    - Qué es Voice Chat.
    - Requisitos de elegibilidad y verificación de edad.
    - Uso del icono de audífonos.
    - Que no está activado por defecto.
    - Riesgos de comunicación por voz.
    - Importancia de silenciar, bloquear, reportar y revisar madurez del menor.
  - Se actualizó la tabla de comunicación para incluir `Experience Chat`, `Direct Chat`, `Party Chat` y `Voice Chat`.
  - Se añadieron referencias en checklist y `teaches`.
- Módulo 4:
  - Se añadió una sección sobre qué cambia cuando la interacción de riesgo ocurre por voz.
  - Se agregó guía para documentar incidentes de voz aunque no haya mensajes escritos.
  - Se añadió un reactivo de quiz sobre incidente por Voice Chat.
- Examen final:
  - Se añadió `Voice Chat` a reactivos de módulo 2.
  - Se actualizó clasificación de controles de Roblox.
- Validación:
  - `node --check` en `module2.js`, `module4.js` y `finalQuiz.js`.
  - `npm run seed:games`.
  - Consulta en MongoDB confirmó contenido con `Voice Chat` en lecciones actuales del curso.

### 3. Curso Redes Sociales — herramientas oficiales actualizadas
- Archivo editado:
  - `server/src/scripts/seed/courses/social/catalog.js`
- Módulo 7, artículo 1:
  - Se amplió `Teen Accounts` de Instagram con protecciones por defecto sobre privacidad, mensajes, contenido sensible, tiempo y permisos parentales.
  - Se amplió TikTok `Family Pairing`:
    - `Daily screen time`
    - `Restricted Mode`
    - filtros de palabras
    - mensajes/comentarios
  - Se amplió Discord `Family Center`:
    - actividad general reciente
    - nuevos amigos
    - usuarios con quienes el adolescente envió mensajes o llamadas
    - minutos de voz o video
    - servidores nuevos y activos
    - aclaración de que no revela contenido de mensajes privados.
- Quiz de módulo 7:
  - Actualizadas definiciones de `Teen Accounts` y `Family Center`.
  - Actualizados reactivos `fill_blanks` y `match_columns` para reflejar actividad, servidores y llamadas sin leer mensajes.
- Validación:
  - `node --check server/src/scripts/seed/courses/social/catalog.js`.
  - `npm run seed:social`.

### 4. Curso Streaming — limpieza editorial y comparación de opciones
- Archivo editado:
  - `server/src/scripts/seed/courses/streaming/catalog.js`
- Se redujo la repetición de menciones explícitas a `AAP`, `HealthyChildren`, `UNICEF`, `FTC` y fuentes similares cuando aparecían de forma muy seguida.
- Criterio:
  - Mantener la información.
  - Conservar menciones puntuales donde aportan precisión oficial.
  - Reescribir el resto como guía directa para padres.
- Se añadió en módulo 6, artículo 1 una tabla nueva:
  - `Comparación rápida de opciones`
  - Compara:
    - `YouTube Kids`
    - `Experiencia supervisada de YouTube`
    - `Twitch`
  - Incluye para quién conviene, qué permite y límite importante.
- Validación:
  - `node --check server/src/scripts/seed/courses/streaming/catalog.js`.
  - `npm run seed:streaming`.
  - Consulta en MongoDB confirmó la tabla en `Artículo 1: Controles parentales en YouTube y Twitch (configuración y uso)`.

### 5. Banners genéricos por curso para encabezado de artículos
- Se creó la estructura:
  - `client/public/lesson-banners/videojuegos/`
  - `client/public/lesson-banners/redes-sociales/`
  - `client/public/lesson-banners/streaming/`
- Imágenes agregadas por el usuario:
  - `client/public/lesson-banners/videojuegos/videojuegos.png`
  - `client/public/lesson-banners/redes-sociales/redes.png`
  - `client/public/lesson-banners/streaming/streaming.png`
- Dimensiones detectadas:
  - `2172 x 724 px`
  - proporción aproximada `3:1`
- Archivos editados:
  - `client/src/utils/lessonBanner.js`
  - `client/src/pages/LessonView.jsx`
- `lessonBanner.js`:
  - Se añadió mapeo de banners por curso según plataformas:
    - Roblox/Minecraft → `/lesson-banners/videojuegos/videojuegos.png`
    - TikTok/Discord/Instagram → `/lesson-banners/redes-sociales/redes.png`
    - YouTube/Twitch → `/lesson-banners/streaming/streaming.png`
  - Se mantiene fallback de gradientes/emoji cuando no haya banner real.
- `LessonView.jsx`:
  - Cuando hay `theme.image`, se muestra el banner real en lugar de solo gradiente.
  - Se eliminan emoji y círculos decorativos cuando existe banner real.
  - Se agregó overlay oscuro suave para legibilidad del texto inferior izquierdo.
  - Se ajustó el contenedor a `aspect-[3/1]` para que las imágenes se vean completas, sin deformación y sin recortar logos.
- Nota de diseño:
  - Si en el futuro se regeneran banners, la proporción recomendada para el diseño actual quedó como `3:1` para respetar las imágenes existentes.
  - Si se quisiera volver al banner más bajo original, habría que generar imágenes más panorámicas, por ejemplo `2560 x 416 px`, y usar recorte controlado.
- Validación:
  - `npm run build` en `client` pasó correctamente.
  - Persiste solo la advertencia normal de Vite por chunks grandes; no bloquea.

### 6. Verificación local y semillas ejecutadas
- Frontend local verificado:
  - `http://localhost:5173` respondió `200`.
- Backend local verificado:
  - `http://localhost:5000/api/content/stats` respondió `200`.
- Seeds ejecutados durante esta sesión:
  - `npm run seed:content`
  - `npm run seed:games`
  - `npm run seed:social`
  - `npm run seed:streaming`
- Builds/checks ejecutados:
  - `node --check` en archivos de seeds modificados.
  - `npm run build` en `client`.

### 7. Estado para continuar
- Los tres cursos tienen banners genéricos por curso en encabezados de artículos.
- Los banners actuales NO son por artículo; son por curso.
- El curso de videojuegos ya incluye `Roblox Voice Chat`.
- Redes Sociales ya incluye actualización de `Teen Accounts`, `Family Pairing` y `Family Center`.
- Streaming ya tiene estilo editorial más limpio y comparación YouTube Kids / experiencia supervisada / Twitch.
- Si el siguiente paso es ajustar banners:
  - Revisar visualmente `LessonView`.
  - Las imágenes actuales son `3:1`; mantener esa proporción evita recorte/deformación.
  - Si se desea reducir altura del encabezado, conviene regenerar banners a una proporción más panorámica y dejar zona segura inferior izquierda para texto.

