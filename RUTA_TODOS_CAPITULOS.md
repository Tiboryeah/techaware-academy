# RUTA DE CONTENIDO COMPLETA — Todos los Capítulos
## Reporte Técnico TT 2026-A097 | Kuxipilli
### "Aplicación Web para Padres y/o Tutores: Concientización y Prevención de Riesgos Digitales en Niños de entre 6 y 12 años"

> **Convención:** `[x]` = redactado y correcto | `[!]` = redactado pero necesita corrección/actualización | `[ ]` = pendiente de redactar
> Última revisión: 2026-04-30

---

## PÁGINAS PRELIMINARES

- [x] Portada: TT 2026-A097, autores (Martínez López Gerardo Esteban / Núñez Martínez Miguel Ángel), directora Patricia Escamilla Miranda
- [x] Carta responsiva (CATT, fecha 10 de diciembre de 2026)
- [x] Resumen (arquitectura MERN, módulos acreditables, chatbot, sistema de progreso)
- [x] Palabras clave (9 términos)
- [x] Agradecimientos
- [x] Índice general
- [ ] Índice de tablas (números reales pendientes — ver pendientes menores)
- [ ] Índice de ilustraciones (Il. 8b y DFDs sin número asignado)
- [x] Advertencia institucional

---

## INTRODUCCIÓN (antes del Capítulo 1)

**Contenido actual:**
- Contexto del problema: internet y videojuegos en la vida de niños y adolescentes
- Cita UNICEF: tiempo extendido en pantallas daña desarrollo social/emocional
- Plataformas abordadas: Roblox, Minecraft, TikTok, Discord, Instagram, YouTube, Twitch
- Propuesta: aplicación web con chatbot, módulos y examen diagnóstico
- Objetivo declarado: fortalecer alfabetización digital parental

**Estado:** `[x]` — no requiere cambios

---

## CAPÍTULO 1: PROBLEMÁTICA

### 1.1 Justificación
**Contenido:** impacto del uso no controlado de internet en salud mental, reducción de relaciones sociales, exposición a contenido sin filtros, urgencia de solución para padres. Cita HealthyChildren.org, UNICEF, Gaptain.
**Estado:** `[x]`

### 1.2 Propuesta de solución
**Contenido:** plataforma web interactiva con chatbot, test diagnóstico, casos reales, seguimiento de progreso.
**Estado:** `[x]`

### 1.3 Objetivos

#### 1.3.1 Objetivo general
> Construir una app web interactiva y educativa para padres/tutores, desarrollada con metodología ágil, con módulos acreditables que enseñen, evalúen y certifiquen competencias sobre prevención de riesgos digitales (ciberacoso, grooming), rutas de estudio personalizadas y herramientas de control parental.
**Estado:** `[x]`

#### 1.3.2 Objetivos específicos (7 en total)
1. Armar estructura de cursos y contenido (módulos con videos, textos y guías)
2. Dar estrategias de control parental personalizadas
3. Poner en marcha evaluaciones y certificados (aprobación → "completado")
4. Crear rutas de repaso a medida (feedback por áreas falladas)
5. Lanzar chatbot educativo Kuxibot (IA generativa)
6. Agregar casos reales y testimonios
7. Añadir monitoreo de progreso (dashboard con gráficos)
**Estado:** `[x]`

### 1.4 Estado del Arte
**Contenido:** herramientas analizadas y comparadas en Tabla 1:
| Herramienta | Tipo | Limitación principal |
|---|---|---|
| Norton Family | Control parental | Sin educación para padres |
| Qustodio | Control parental | Costo elevado, versión gratuita limitada |
| Google Family Link | Control parental | No evalúa riesgos |
| Canopy | Filtrado IA | Sin módulos educativos |
| Bark | Supervisión + alertas | No ofrece módulos educativos |
| Educatolerancia | Educativa | No monitorea ni bloquea |
| Common Sense Media | Educativa | No es interactiva ni personalizada |
| StopBullying.gov | Guía educativa | Solo contenido, no es plataforma |

Brecha identificada: soluciones diseñadas para EE.UU./Europa, sin adaptación cultural para Latinoamérica.
**Estado:** `[x]`

### 1.5 Delimitación del Proyecto
**Contenido:** tres ámbitos de exposición digital:
1. Videojuegos en línea: Roblox y Minecraft
2. Redes Sociales: TikTok, Discord, Instagram
3. Plataformas de Streaming: YouTube y Twitch

Alcance funcional: 3 cursos acreditables, 1 por ámbito, con módulos temáticos, examen diagnóstico, rutas de repaso y chatbot.
Riesgos cubiertos: ciberacoso, privacidad, grooming, contenido no apto, compras impulsivas, límites de tiempo, estafas.
Stack delimitado: MERN con MongoDB NoSQL.
**Estado:** `[x]`

---

## CAPÍTULO 2: MARCO TEÓRICO

### 2.1 El Impacto de Internet y los Videojuegos en el Desarrollo Infantil
**Estado:** `[x]` — Cita UNICEF, HealthyChildren.org

### 2.2 Los Riesgos Asociados al Uso de Redes Sociales
**Estado:** `[x]`

### 2.3 Estrategias de Protección y Uso Responsable de Internet
**Estado:** `[x]`

### 2.4 El Rol de los Padres en la Protección Digital
**Estado:** `[x]`

### 2.5 El Efecto de los Videojuegos en la Educación y el Rendimiento Académico
**Estado:** `[x]`

### 2.6 Videojuegos y el Desarrollo de Habilidades Cognitivas
**Estado:** `[x]`

### 2.7 Desigualdades en el Acceso a Herramientas de Protección Digital
**Estado:** `[x]`

### 2.8 El Papel de la Educación Formal en la Seguridad Digital
**Estado:** `[x]`

### 2.9 La Evolución de las Normativas sobre la Protección Digital Infantil
**Estado:** `[x]`

### 2.10 Grooming: Riesgo Digital en Línea
**Estado:** `[x]`

### 2.11 Aplicación Web
**Estado:** `[x]` — Cita W3C, MDN

### 2.12 Aplicación Web Interactiva
**Estado:** `[x]`

### 2.13 Lenguajes de Programación para el Desarrollo Web
**Estado:** `[x]` — HTML5, CSS3, JavaScript

### 2.14 Bases de Datos
**Estado:** `[x]`

#### 2.14.1 Justificación de la Elección (MongoDB)
**Estado:** `[x]` — documento flexible, escalabilidad, sin esquema rígido

### 2.15 Herramientas de Desarrollo
**Estado:** `[x]` — VS Code, GitHub, Postman, Figma

### 2.16 Seguridad en la Aplicación Web
**Estado:** `[x]` — JWT, Bcrypt, HTTPS, Helmet, CORS

### 2.17 Diseño Responsivo
**Estado:** `[x]` — Tailwind CSS, breakpoints sm/md/lg

### 2.18 Experiencia de Usuario (UX) y Diseño de Interfaz (UI)
**Estado:** `[x]` — ISO 9241-210, principios user-centered

### 2.19 Riesgos en plataformas de streaming (YouTube y Twitch)
**Estado:** `[x]` — contenido inapropiado, estafas, monetización engañosa. Cita estudio Springer 2024.

### 2.20 Alfabetización Digital Parental
**Estado:** `[x]` — UNESCO DigComp 2.2, UNICEF Digital Parenting 2023

### 2.21 Marco Normativo sobre la Protección Digital Infantil en México
**Estado:** `[x]` — LGDNNA, Estrategia Nacional de Ciberseguridad 2017, SEP-PIAD, LGPDPPSO

### 2.22 Glosario de Términos Técnicos (Tabla 2)
Términos definidos: API REST, Autenticación, Base de datos NoSQL, Chatbot, Ciberacoso, CORS, Diagnóstico digital, Grooming, HTML, JWT, MongoDB, Node.js, React, SPA, Streaming, Tailwind CSS, Vite.
**Estado:** `[x]` — corrección ya aplicada: "WT" → "JWT" (C1)

---

## CAPÍTULO 3: ANÁLISIS DE SISTEMA

### 3.1 Metodología

#### 3.1.1 Justificación de metodología
**Contenido:** Scrum elegido por: flexibilidad ante requisitos variables, entrega progresiva, comunicación continua, tamaño del equipo (2 devs + 1 directora), gestión iterativa de riesgo, división manejable del sistema complejo.
**Estado:** `[x]`

#### 3.1.2 Justificación y Organización del Equipo
- Product Owner: Patricia Escamilla Miranda
- Scrum Master: Martínez López Gerardo Esteban
- Development Team: Núñez Martínez Miguel Ángel
**Estado:** `[x]`

#### 3.1.3 Estructura de Sprints y Entregables
5 Sprints de TT1:
- Sprint 1: Análisis inicial y levantamiento de requerimientos
- Sprint 2: Diseño de arquitectura y modelado del sistema
- Sprint 3: Estandarización técnica y documentación
- Sprint 4: Diseño UI/UX y estructura visual
- Sprint 5: Integración final y preparación TT1

Herramientas: GitHub, Microsoft 365 Copilot, PlantUML, Mermaidchart
**Estado:** `[x]` — corrección ya aplicada: numeración duplicada 3.1.1/3.1.2 (M1)

#### 3.1.4 Conclusión metodológica
**Estado:** `[x]`

### 3.2 Requerimientos de Usuario y del Sistema

#### 3.2.1 Requerimientos de Usuario (RU) — Tabla 3
| ID | Nombre | Descripción |
|---|---|---|
| RU1 | Registro y acceso seguro | Crear cuenta y guardar progreso |
| RU2 | Comprender riesgos digitales | Info clara por plataforma |
| RU3 | Orientación inmediata | Chatbot con recomendaciones |
| RU4 | Evaluar conocimiento | Examen diagnóstico y por módulo |
| RU5 | Recibir rutas de repaso | Áreas a reforzar según desempeño |
| RU6 | Aprender mediante módulos | Cursos estructurados |
| RU7 | Consultar casos prácticos | Ejemplos y guías |
| RU8 | Visualizar avance | Dashboard con porcentaje y acreditaciones |
**Estado:** `[x]`

#### 3.2.2 Requerimientos del Sistema (RS) — Tabla 4
| ID | Descripción |
|---|---|
| RS1 | Autenticación con JWT |
| RS2 | Gestión de cursos y módulos |
| RS3 | Motor de calificación |
| RS4 | Generador automático de rutas de repaso |
| RS5 | Módulo de IA Generativa (cascada: Gemini 2.5 Flash → Groq llama-3.3-70b → 16 reglas estáticas) |
| RS6 | Registro de progreso |
| RS7 | Integración MongoDB |
| RS8 | API REST segura |
| RS9 | Microservicio de notificaciones por Email |
**Estado:** `[x]`

### 3.3 Requerimientos Funcionales (RF) — Tabla 5
| ID | Nombre | Prioridad |
|---|---|---|
| RF1 | Registro y Autenticación de Padres | Alta |
| RF2 | Chatbot Interactivo de Consulta | Alta |
| RF3 | Examen de Diagnóstico y de Módulo | Alta |
| RF4 | Retroalimentación Personalizada y Ruta de Repaso | Alta |
| RF5 | Visualización de Módulos Educativos | Alta |
| RF6 | Visualización de Guías de Control Parental | Media |
| RF7 | Base de Datos de Usuarios y Evaluaciones | Alta |
| RF8 | Acceso a Casos Prácticos | Media |
| RF9 | Gestión de Acreditación de Cursos (≥80% → certificado PDF) | Alta |
| RF10 | Verificación de Identidad (código 6 dígitos) | Alta |
| RF11 | Reporte de Casos de Riesgo | Media |
| RF12 | Interacción Contextual Experta (historial conversación) | Alta |
**Estado:** `[x]`

### 3.4 Requerimientos No Funcionales (RNF) — Tabla 6
| ID | Nombre | Categoría |
|---|---|---|
| RNF1 | Diseño Responsivo | Usabilidad |
| RNF2 | Interfaz Intuitiva (UX/UI) | Usabilidad |
| RNF3 | Tiempo de respuesta chatbot (tiempo real) | Rendimiento |
| RNF4 | Seguridad HTTPS | Seguridad |
| RNF5 | Disponibilidad 99% uptime | Disponibilidad |
| RNF6 | Escalabilidad de Base de Datos | Mantenimiento |
| RNF7 | Autenticación Segura (JWT/OAuth) | Seguridad |
**Estado:** `[x]`

### 3.5 Requerimientos Técnicos (RT) — Tabla 7
| ID | Descripción |
|---|---|
| RT1 | Arquitectura MERN |
| RT2 | SPA (Single Page Application) |
| RT3 | Base de datos NoSQL (MongoDB) |
| RT4 | Servidor Node.js escalable |
| RT5 | Seguridad HTTPS (TLS/SSL) |
| RT6 | Autenticación JWT + Bcrypt |
| RT7 | Compatibilidad multiplataforma (Chrome, Firefox, Android) |
| RT8 | Tiempo de respuesta chatbot < 2 s |
| RT9 | Integración con MongoDB Atlas (cadena de conexión segura + env vars) |
**Estado:** `[x]` — corrección ya aplicada: "Render/Railway" → "Render" (RT10 →ahora no existe RT10 en la tabla, ya eliminado)

### 3.6 Reglas de Negocio — Tabla 8

#### 3.6.1 Tabla de Reglas de Negocio
| ID | Regla | Descripción |
|---|---|---|
| RN-01 | Registro único por correo | Email válido y exclusivo, sin cuentas repetidas |
| RN-02 | Validación de correo | Código 6 dígitos enviado al correo para activar cuenta |
| RN-03 | Progresión educativa controlada | Completar todos los módulos antes del examen final |
| RN-04 | Restricción de roles administrativos | Solo admins modifican cursos/módulos/recursos |
| RN-05 | Privacidad de datos personales | Cumplimiento LGPDPPSO |
| RN-06 | Autenticación y sesión segura | JWT con expiración automática |
| RN-07 | Chatbot Kuxibot | System Instruction estricta: solo ciberseguridad, alfabetización digital y tips parentales |
| RN-08 | Módulos acreditables independientes | Cada curso: examen inicial + módulos + acreditación final |
| RN-09 | Registro de progreso | % completado, última conexión, notas de exámenes |
| RN-10 | Acceso multiplataforma | ISO 9241-210, interfaz responsive |
| RN-11 | Cumplimiento normativo | COBIT 2019 para gobernanza TI |
**Estado:** `[x]`

#### 3.6.2 Observaciones generales
**Estado:** `[x]`

#### 3.6.3 Modelo de protección de datos personales
**Contenido:** datos gestionados (cuenta, uso educativo, interacción chatbot), principios LGPDPPSO, controles en frontend/backend/BD. Anonimización PII en prompts de chatbot (no se envían emails ni nombres reales a Gemini/Groq).
**Estado:** `[x]`

### 3.7 Análisis de Riesgos y Estrategias de Mitigación — Tabla 9
12 riesgos documentados (R01–R12):
- **Crítico:** retrasos backend, integración frontend-backend, falta de tiempo, dependencia APIs terceros (Gemini/Gmail)
- **Moderado:** latencia MongoDB Atlas, errores JWT, inconsistencias BD, saturación chatbot, coordinación repositorio, validación con usuarios, sesgo IA
- **Bajo:** compatibilidad navegadores/móviles

#### 3.7.1 Clasificación de riesgos (🟥🟧🟩)
**Estado:** `[x]`

#### 3.7.2 Estrategias generales de mitigación
**Estado:** `[x]`

### 3.8 Análisis de Factibilidad
- **Técnica:** Alta — pila MERN madura, SDK Gemini disponible, herramientas gratuitas
- **Operativa:** Alta — no requiere conocimientos técnicos del usuario final
- **Económica:** Alta — open source, costo total estimado $37,800–$38,300 MXN
**Estado:** `[x]`

---

## CAPÍTULO 4: DISEÑO DEL SISTEMA

### 4.1 Arquitectura inicial del sistema
**Contenido:** arquitectura 3 capas (presentación, lógica de negocio, datos), primera propuesta de diseño antes del desarrollo real.
**Estado:** `[x]`

### 4.2 Diseño Detallado de la Arquitectura del Sistema

#### 4.2.1 Diagrama de Lógica de Tres Capas (Il. 3)
**Contenido:** PlantUML con tres componentes: Frontend (React+Vite+Tailwind, desplegado en Netlify), Backend (Node+Express, desplegado en Render), Base de Datos (MongoDB Atlas). Comunicación vía HTTPS/REST.
**Estado:** `[x]`

#### 4.2.2 Diagrama de Componentes y Despliegue del Sistema (Il. 4)
**Contenido:** despliegue en la nube, flujos de comunicación entre Netlify ↔ Render ↔ Atlas ↔ Gemini/Groq ↔ Resend.
**Estado:** `[x]`

### 4.3 Diseño de diagramas de flujos de datos
**Contenido:** DFD Nivel 0, Nivel 1, Nivel 2 (procesos P2–P8):
- Il. 5 — DFD Nivel 0
- Il. 6 — DFD Nivel 1
- Il. 7 — DFD Nivel 2 P2 (Evaluación/Quiz)
- Il. X — DFD Nivel 2 P3 (Progreso)
- Il. X — DFD Nivel 2 P5 (Chatbot IA)
**Estado:** `[x]` — pendiente asignar números a Il. X

### 4.4 Casos de Uso del Sistema — Tabla 12

**Actores:**
- Padre/Tutor (actor principal)
- Administrador (actor secundario)

**Casos de uso del Padre/Tutor (CU01–CU12):**
| ID | Nombre | RF asociados |
|---|---|---|
| CU01 | Autenticación en la Plataforma | RF1, RF7 |
| CU02 | Consulta en el Chatbot | RF2 |
| CU03 | Realizar Examen Diagnóstico | RF3, RF7 |
| CU04 | Obtener Resultados y Recomendaciones | RF4, RF7 |
| CU05 | Consultar Cursos y Módulos (3 cursos, lecciones: artículo/guía/video) | RF5 |
| CU06 | Consultar Guías y Casos Prácticos | RF6, RF8 |
| CU07 | Acreditar Cursos y Módulos (≥80% → badge + certificado PDF) | RF3, RF4, RF5, RF9 |
| CU08 | Reportar Incidente | RF11 |
| CU09 | Verificar Cuenta (código 6 dígitos) | RF10 |
| CU10 | Consulta Experta (IA) | RF12 |
| CU11 | Recuperar Acceso (código 6 dígitos) | RF10 |
| CU12 | Gestionar Perfil (avatar, nombre, contraseña) | RF1, RF7 |

**Casos de uso del Administrador (CUA01–CUA05):**
| ID | Nombre |
|---|---|
| CUA01 | Cargar Contenido Inicial (Seed via CLI/Atlas) |
| CUA02 | Mantener Cursos y Módulos (Atlas/Compass) |
| CUA03 | Mantener Lecciones |
| CUA04 | Mantener Quizzes y Preguntas |
| CUA05 | Consultar Métricas Generales |

**Ilustraciones:** Il. 8a (CU Padre/Tutor), Il. 8b (CU Administrador)
**Estado:** `[x]`

### 4.4.1 Matriz de trazabilidad de requerimientos — Tabla 13
**Contenido:** RF1–RF12 mapeados a CU, US e ilustraciones. Cobertura total.
**Estado:** `[x]` — correcciones ya aplicadas: RF13→RF2+RF12 (C7), RF9(progreso)+RF10(cert)→RF7+RF9 (C7), RF3+RF14→RF1 (C7)

### 4.5 Diagramas de Secuencia

#### 4.5.1 DS-01: Autenticación de Usuarios (CU01) — Il. 9
Flujo: registro con código 6 dígitos → verificación → login JWT 30 días → recovery con código
**Estado:** `[x]`

#### 4.5.2 DS-02: Consulta en el Chatbot (CU02) — Il. 10
Flujo: mensaje usuario → anonimización PII → Gemini 2.5 Flash → (fallo) → Groq → (fallo) → estático → persistencia
**Estado:** `[x]`

#### 4.5.3 DS-03: Consultar Contenido Educativo (CU05/CU06) — Il. 11
Flujo: listado cursos → módulos → lecciones → marca automática al abrir
**Estado:** `[x]`

#### 4.5.4 DS-04: Acreditación de Módulos y Curso — Il. 12
Flujo: quiz → submit → calificación → riskLevel → recommendations → (≥80%) → Accreditation → badge + PDF
**Estado:** `[x]`

#### 4.5.5 DS-05: Gestión de Reportes de Incidentes (CU08/RF11) — Il. nueva
Flujo: formulario → rate limit 3/hora + cooldown 10min → persistencia case_reports → notificación HTML al admin
**Estado:** `[x]`

#### 4.5.6 DS-06: Orquestación de Inteligencia Artificial (RF12/US15) — Il. nueva
Flujo: detallado de la cadena Gemini → Groq → estático, con historial 10 mensajes y System Instruction
**Estado:** `[x]`

### 4.6 Creación de las funcionalidades (backlog)

#### 4.6.1 Backlog inicial — Tabla 14
18 Historias de Usuario (US01–US18):

| US | Descripción resumida | Criterio de aceptación clave |
|---|---|---|
| US01 | Registro e inicio de sesión | JWT, email único, bcrypt |
| US02 | Ver cursos disponibles (3) | Títulos, descripción, plataformas |
| US03 | Curso Videojuegos (Roblox+Minecraft) | 6 módulos + exámenes |
| US04 | Curso Redes Sociales (TikTok+Discord+Instagram) | 7 módulos + exámenes |
| US05 | Curso Streaming (YouTube+Twitch) | 7 módulos + exámenes |
| US06 | Diagnóstico inicial | Evalúa por plataforma, recomienda curso |
| US07 | Exámenes por módulo | Quiz por módulo con preguntas de riskArea y platform |
| US08 | Recomendación automática por errores | Lista de lecciones por riskArea + platform fallados |
| US09 | Acreditación al finalizar curso | ≥80% → acreditado + fecha + resultado |
| US10 | Ver progreso general | % avance, cursos completados, recomendaciones |
| US11 | Chatbot educativo | Responde por contexto, ofrece consejos y lecciones |
| US12 | Lecciones educativas cortas | HTML seguro, clasificadas por platform y riskArea |
| US13 | Verificación de cuenta | Código 6 dígitos vía email |
| US14 | Enviar reporte de incidente | Formulario → case_reports → notificación admin |
| US15 | Consultas avanzadas a IA | Gemini 2.5 Flash/Groq, persistencia conversations, RN-07 |
| US16 | Gestionar datos (admin) | Rol Admin en MongoDB Atlas |
| US17 | Métricas generales (admin) | Intentos y acreditaciones disponibles |
| US18 | Notificaciones internas | Visible al iniciar sesión, fecha de creación |

**Estado:** `[x]` — correcciones ya aplicadas: "US01–US15" → "US01–US18" (M2), US15 "Gemini 2.0"→"Gemini 2.5 Flash" (C), US13 "token vía SMTP"→"código 6 dígitos" (C)

### 4.7 Pila Tecnológica Elegida — Tabla 15

| Componente | Tecnología | Versión |
|---|---|---|
| Frontend | React.js | 19.2 |
| Bundler | Vite | 7.2 |
| Enrutamiento | React Router DOM | v7 |
| Estilos | Tailwind CSS | v4.1 |
| Animaciones | Framer Motion | — |
| Gráficas | Chart.js + react-chartjs-2 | — |
| PDF certificados | jsPDF + html2canvas | — |
| HTTP client | Axios | — |
| Iconos | Lucide React | — |
| Backend | Node.js + Express.js | Express 5.1 |
| ODM | Mongoose | 9 |
| BD | MongoDB Atlas | — |
| Seguridad | JWT + Bcrypt.js + Helmet.js + CORS + Rate Limit | — |
| Imágenes | Multer + Sharp (200×200 JPEG 70%) | — |
| IA Chatbot | Google Generative AI SDK + Groq SDK | Gemini 2.5 Flash / llama-3.3-70b |
| Email | Resend API (primario) + Nodemailer/SMTP Gmail (fallback) | — |
| Despliegue | Netlify (frontend) + Render (backend) | — |
| Dev tools | VS Code, Postman, MongoDB Compass, Jest+Supertest | — |

**Estado:** `[!]` — **ACTUALIZAR**: el documento menciona "jsPDF" para certificados; debe decir "jsPDF + html2canvas" (DA13). Correcciones ya aplicadas: "Render o Railway" → "Render" (C), "400×400" → "200×200 70%" Sharp (C).

### 4.8 Diseño de la Base de Datos

#### 4.8.1 Diseño de diagramas de clase (Il. diagrama de clases)
**Estado:** `[x]` — correcciones ya aplicadas: case_study eliminado de Lesson.type, minPassing=80, riskLevel en español, CaseReport sin updatedAt, Recommendation con relaciones reales.

#### 4.8.2 Definición de la Estructura de Base de Datos (MongoDB Schema)
**Estado:** `[x]`

#### 4.8.3 Lineamientos de modelado
**Contenido:** embedding vs referencing, desnormalización de courseId en Lesson, índices únicos.
**Estado:** `[x]`

#### 4.8.4 Catálogo de colecciones
15 colecciones documentadas: users, courses, modules, lessons, quizzes, questions, attempts, accreditations, progress, activitylogs, conversations, messages, recommendations, casereports, resources.
**Estado:** `[x]` — corrección ya aplicada: description de recommendations actualizada.

#### 4.8.5 Esquemas por colección (JSON Schema-like)
**Estado:** `[x]` — correcciones ya aplicadas:
- lessons.type: eliminado case_study → `['article','video','guide']`
- attempts.riskLevel: `'Alto'|'Medio'|'Bajo'` (en español)
- users: avatar 200×200 70%, lessons.type sin case_study
- Pipe sobrante `|` al final de type eliminado
- recommendations: updatedAt agregado
- resources: fullContent + lessons raíz + color agregados
- attempts: ejemplos PRIVACIDAD/ROBLOX → Privacidad/Roblox

#### 4.8.6 Relaciones lógicas (referencias)
**Estado:** `[x]`

#### 4.8.7 Reglas de validación y negocio (en BD)
**Estado:** `[x]`

### 4.9 Plan de Pruebas del Sistema

#### 4.9.1 Objetivos del plan de pruebas
**Estado:** `[x]`

#### 4.9.2 Criterios de aceptación
**Estado:** `[x]`

#### 4.9.3 Plan de pruebas por módulo
**Estado:** `[x]`

#### 4.9.4 Estrategia de ejecución
**Estado:** `[x]`

#### 4.9.5 Métricas de calidad
**Estado:** `[x]`

### 4.10 Métricas de Evaluación e Impacto del Sistema

#### 4.10.1 Métricas técnicas — Tabla de métricas técnicas
**Estado:** `[x]`

#### 4.10.2 Métricas funcionales
**Estado:** `[x]`

#### 4.10.3 Métricas de impacto educativo — Tabla 21
**Estado:** `[x]`

#### 4.10.4 Interpretación y propósito de las métricas
**Estado:** `[x]`

### 4.11 Prototipos Visuales y Wireframes de la Aplicación

#### 4.11.1 Herramientas utilizadas (Figma, Canva)
**Estado:** `[x]`

#### 4.11.2 Estructura general de la interfaz
**Estado:** `[x]` — corrección ya aplicada: "mensajes sugeridos" eliminado del chatbot.

#### 4.11.3 Ejemplos de pantallas (wireframes)
**Estado:** `[x]`

#### 4.11.4 Principios de diseño aplicados
**Estado:** `[x]`

#### 4.11.5 Conclusión de diseño visual
**Estado:** `[x]`

---

## CAPÍTULO 5: GOBIERNO DE TECNOLOGÍAS DE LA INFORMACIÓN Y CASO DE NEGOCIO

### 5.1 Gobierno de Tecnologías de la Información (IT Governance)
**Contenido:** COBIT 2019 + ISO/IEC 38500 adaptados a entorno académico. Equilibrar creación de valor, optimización de recursos y gestión de riesgos.
**Estado:** `[x]`

### 5.2 Objetivos del Gobierno de TI — Tabla 22
5 objetivos: alineación estratégica, entrega de valor, gestión de riesgos, optimización de recursos, monitoreo del desempeño.
**Estado:** `[x]`

### 5.3 Estructura de Gobierno y Roles — Tabla 23
- Product Owner (Directora TT): valida alineación educativa
- Scrum Master/Coordinador técnico: cumplimiento estándares, sprints
- Equipo de desarrollo: implementación + documentación
- Usuarios finales: retroalimentación
- Stakeholders externos: adopción institucional
**Estado:** `[x]`

### 5.4 Marco Normativo y Estándares Internacionales — Tabla 24
| Estándar | Aplicación |
|---|---|
| COBIT 2019 | Marco principal de gestión TI |
| ISO/IEC 38500:2015 | Principios de responsabilidad y gobernanza |
| ISO/IEC 27001:2022 | Controles de seguridad y protección de datos |
| LGPDPPSO (2017) | Ley mexicana de protección de datos |
**Estado:** `[x]`

### 5.5 Caso de Negocio (Business Case)

#### 5.5.1 Justificación Social y Tecnológica
**Estado:** `[x]` — Estrategia Nacional de Ciberseguridad

#### 5.5.2 Beneficios Esperados — Tabla 25
Educativo, Social, Tecnológico, Institucional.
**Estado:** `[x]`

#### 5.5.3 Indicadores de Éxito
- 70% padres completan al menos 1 módulo
- 20% mejora en diagnóstico final
- 90% disponibilidad del sistema
- 80% satisfacción en encuestas usabilidad
**Estado:** `[x]`

### 5.6 Gestión de Riesgos y Continuidad — Tabla 26
4 riesgos de gobierno: falla seguridad/pérdida datos, sobrecarga servidor, falta adopción, obsolescencia tecnológica.
**Estado:** `[x]`

### 5.7 Valor Tecnológico y Madurez del Proyecto
- TT1: Nivel 2 COBIT (Gestionado)
- TT2 meta: Nivel 3 (Establecido)
**Estado:** `[x]`

### 5.8 Análisis de Costos y Recursos

#### 5.8.1 Categorización de costos — Tabla 27
| Concepto | Costo MXN |
|---|---|
| Hosting/Servidor (Netlify/Render) | $0–$300/mes |
| MongoDB Atlas | $0–$200/mes |
| Laptops ×2 ($15,000 c/u) | $30,000 |
| Recursos gráficos e ilustraciones | $5,000 |
| Mantenimiento | $800 |
| Energía eléctrica (10 meses) | $2,000 |
| **Total estimado** | **$37,800–$38,300** |

**Estado:** `[x]`

#### 5.8.2 Costos intangibles
250 h de desarrollo, 15% tiempo en documentación/QA, mantenimiento anual 10% del costo total.
**Estado:** `[x]`

#### 5.8.3 Viabilidad económica
**Estado:** `[x]` — alta viabilidad, open source, planes educativos gratuitos, colaboración institucional posible.

### 5.9 Estado Financiero del Proyecto

#### 5.9.1 Inversión Inicial — Tabla 28
$35,000 MXN (laptops + recursos gráficos + licencias $0).
**Estado:** `[x]`

#### 5.9.2 Depreciación del equipo de cómputo
Método: depreciación lineal, vida útil 36 meses.
**Estado:** `[x]`

#### 5.9.3 Costos Operativos
**Estado:** `[x]`

#### 5.9.4 Costos Indirectos
**Estado:** `[x]`

#### 5.9.5 Estado Financiero Consolidado
**Estado:** `[x]`

#### 5.9.6 Interpretación del Estado Financiero
**Estado:** `[x]`

---

## CAPÍTULO 6: IMPLEMENTACIÓN DEL SISTEMA

### 6.1 Configuración del entorno de desarrollo

#### 6.1.1 Herramientas de desarrollo
VS Code, Node.js 20, MongoDB Compass, Postman, GitHub.
**Estado:** `[x]`

#### 6.1.2 Estructura del repositorio
Monorepo `/client` + `/server`, `.env`, `.gitignore`.
**Estado:** `[x]`

#### 6.1.3 Variables de entorno
MONGO_URI, JWT_SECRET, GEMINI_API_KEY, GROQ_API_KEY, EMAIL_USER, EMAIL_PASS, RESEND_API_KEY, ALLOWED_ORIGINS, NODE_ENV.
**Estado:** `[x]`

#### 6.1.4 Comandos de arranque
`npm run dev` (server con --watch), `npm run dev` (Vite client).
**Estado:** `[x]`

#### 6.1.5 Despliegue
Netlify (frontend SPA) + Render (backend API) + MongoDB Atlas.
**Estado:** `[x]`

---

### 6.2 Implementación del backend

#### 6.2.1 Servidor Express y middleware de seguridad
- Express 5.1, CORS whitelist desde .env
- Helmet, rate limiting: 100 req/15min producción / 1000 req/min desarrollo (DA11)
- Middleware de error global
**Estado:** `[x]`

#### 6.2.2 Módulo de autenticación (`auth.routes.js`)
- POST /register → código 6 dígitos → Resend API (DA02)
- POST /verify → { email, code } → isVerified=true
- POST /resend-verification
- POST /login → bcrypt + JWT 30 días
- POST /forgot-password → SHA-256, expira 10 min
- POST /reset-with-code
- PUT /update-profile → Multer memoryStorage + Sharp JPEG 200×200 70% → Base64 (DA04, DA05)
- GET /profile, PUT /update-password (mínimo 8 chars)
**Estado:** `[x]`

#### 6.2.3 Módulo de contenido educativo (`content.routes.js`)
- GET /api/content/courses → con virtual `modules`
- GET /api/content/courses/:id → módulos + lecciones populadas
- GET /api/content/lessons/:id
- GET /api/content/stats → conteo cursos/lecciones/casos
- **[!] AGREGAR:** GET /api/content/latest-update → novedad más reciente entre `Lesson(article|guide)` y `Resource(case|guide)`; devuelve `{ label, title, description, href, createdAt }`
**Estado:** `[!]` — falta documentar endpoint latest-update

#### 6.2.4 Motor de evaluación (`quiz.routes.js` + `quizService.js`)
- GET /api/quiz/:id → preguntas mezcladas (shuffleArray en backend, DA06)
- GET /api/quiz/my-recommendations → última recomendación pendiente persistida
- GET /api/quiz/recommendations/:attemptId → áreas/plataformas a repasar (pantalla inmediata)
- POST /api/quiz/:id/submit → motor de calificación
  - 10 tipos de pregunta con lógica diferenciada
  - Score: round((weighted/total)×100)
  - riskLevel: Alto (<50%), Medio (50–79%), Bajo (≥80%)
  - errorsByArea y errorsByPlatform como mapas dinámicos
  - **[!] ACTUALIZAR:** recomendaciones calculadas desde preguntas falladas concretas (no desde módulo completo); `saveRecommendation()` recibe `questionDetails`; plataformas solas no cuentan como coincidencia suficiente; al aprobar el mismo quiz se eliminan recomendaciones previas de ese quiz; `scope:'course'` no genera recomendaciones ni `questionDetails`.
- Guía de aprendizaje: lecciones por `moduleId`, no por `courseId`; sin fallback con lecciones no relacionadas.
**Estado:** `[!]` — actualizar descripción de recommendations y guía de aprendizaje

#### 6.2.5 Sistema de progreso (`progress.routes.js` + `progressService.js`)
- POST /api/progress/lesson/:lessonId/complete → `$addToSet` idempotente + upsert
- GET /api/progress/course/:courseId
- GET /api/progress/summary/all → resumen global + actividad reciente + diagnóstico
- GET /api/progress/next-step → siguiente lección o quiz pendiente
- Índice único {userId, courseId} en Progress
- ActivityLog: idempotencia por uniqueKey con índice parcial (DA10)
**Estado:** `[x]`

#### 6.2.6 Chatbot Kuxibot (`chatbot.routes.js`)
- Cadena de fallback: Gemini 2.5 Flash (4 modelos en cascada) → Groq llama-3.3-70b → 16 reglas estáticas
- System Instruction, anonimización PII (emails → [EMAIL], teléfonos → [TLF])
- Historial de 10 mensajes por conversación
- Mock mode con USE_MOCK_AI=true (pruebas)
**Estado:** `[x]`

#### 6.2.7 Módulo de reportes de incidentes (`report.routes.js`)
- POST /api/reports/submit → rate limit 3/hora + cooldown 10min en BD
- Modelo CaseReport con 4 tipos de mensaje
- Notificación HTML al administrador por email
**Estado:** `[x]`

#### 6.2.8 Módulo de recursos editoriales (`resource.routes.js`)
- GET /api/resources → paginación default 9, filtro por type (guide|case)
- GET /api/resources/:slug → detalle con timeline[], details, tips[], steps[]
**Estado:** `[x]`

#### 6.2.9 Sistema de seed de contenido
- `seed.js` (completo) / `seed-target.js` (por objetivo con aliases)
- Comandos npm: seed, seed:games, seed:social, seed:streaming, seed:diagnostic, seed:content
- Proceso idempotente con `getOrCreate` por campo natural
- `getOrCreateQuiz`: elimina y recrea preguntas en cada sync
- **[!] AGREGAR:** correcciones de calidad aplicadas en sesiones 2026-04-28 a 2026-04-30:
  - `multiple_selection`: máximo 3–4 respuestas correctas de 5–6 opciones
  - `categorize`: balance 3+3+3 o 2+3+2 por categoría
  - `match_columns`: ítems con elementos nombrados exclusivos de cada plataforma (sin ambigüedad)
  - Mini glosarios para padres en artículos clave de los 3 cursos
  - Corrección conceptual Streaming M1: YouTube = videos predominantemente para ver cuando se quiera (también tiene directos); Twitch = directos predominantemente (también guarda grabaciones)
  - Términos eliminados: VOD, clips, a demanda, bajo demanda
  - Imágenes en artículos de Redes Sociales (M1A1–M7A2): alojadas en `client/public/article-images/redes-sociales/`, servidas desde Netlify CDN; MongoDB almacena solo la referencia en el markdown
**Estado:** `[!]` — agregar párrafo de calidad de contenido

---

### 6.3 Implementación del frontend

#### 6.3.1 Arquitectura de la SPA
- Vite + React 19.2, React Router DOM v7
- Contextos globales: AuthContext
- ProtectedRoute, Layout compartido
- Rutas en español: /cursos, /panel, /perfil, /diagnostico, etc. (DA09)
**Estado:** `[x]`

#### 6.3.2 Flujo de autenticación (UI)
Register → VerifyAccount (código 6 dígitos) → Login; ForgotPassword → ResetPassword.
**Estado:** `[x]`

#### 6.3.3 Panel personal (Dashboard)
- Saludo personalizado, tarjetas de resumen, feed de actividad reciente
- Medidor SVG animado (Índice de Protección Digital)
  - Fórmula: DiagBonus(20%) + Lecciones(20%) + Módulos(60%)
  - DiagBonus binario: +20 si diagnóstico ≥80%, +0 si no
- Tarjeta "Mis Logros Digitales": badges de cursos completados + botón descarga certificado
- Tarjeta "Lecciones Recomendadas": consume `/api/quiz/my-recommendations`
- **[!] ACTUALIZAR — tarjeta "Novedad":** consume `/api/content/latest-update`, muestra artículo/guía/caso más reciente clickeable
- **[!] ACTUALIZAR — certificado PDF:** generado client-side con `html2canvas + jsPDF` (no solo jsPDF):
  1. Se construye div HTML oculto con el diseño del certificado en CSS puro
  2. Logo pre-procesado en canvas circular (`ctx.arc()` + `ctx.clip()`)
  3. `html2canvas` captura el div a escala 2×
  4. `jsPDF` inserta imagen PNG y descarga (~1–2 s, no <200 ms)
- **[!] ACTUALIZAR:** 4 peticiones paralelas al cargar (progreso, cursos, recomendaciones, novedad)
**Estado:** `[!]` — certificado, novedad y fetches paralelos necesitan actualizarse

#### 6.3.4 Visor de cursos y lecciones
- CourseDetail: plan de estudios, progreso por módulo, botón examen final
- LessonView: renderer Markdown (react-markdown), iframe YouTube embebido, marcado automático al abrir
- **[!] AGREGAR — scroll-to-lesson al volver:** LessonView envía `state={{ scrollToLessonId: lesson._id }}`; CourseDetail espera fin de carga y usa `requestAnimationFrame` + `scrollIntoView({ behavior:'auto', block:'center' })`
- Admin bypass: administrador puede navegar sin restricciones de progreso
**Estado:** `[!]` — agregar scroll-to-lesson

#### 6.3.5 Sistema de evaluación (QuizTaker)
- 10 tipos de pregunta renderizados: single_choice, multiple_choice, multiple_selection, case_study, drag_drop, fill_blanks, match_columns, order_sequence, categorize, drop_down
- Modo revisión: respuestas correctas/incorrectas con justificación
- Guía de aprendizaje: lecciones recomendadas por pregunta fallada
**Estado:** `[x]`

#### 6.3.6 Chatbot Kuxibot (interfaz)
- Widget flotante, burbujas de chat
- Typing indicator animado
- Altura limitada al viewport con `max-h-[calc(100vh-...)]` (fix B08)
- Aviso de precisión del chatbot
**Estado:** `[x]`

#### 6.3.7 Casos y guías (`RealCases`, `CaseDetail`)
- Tabs por URL param (?seccion=guias|casos)
- Paginación incremental (load more)
- CaseDetail: timeline de hechos, tips de prevención, layout columna 4/8
**Estado:** `[x]`

#### 6.3.8 Perfil de usuario
- Editar nombre, avatar (touch crop: drag + pinch en móvil)
- Canvas 600px → FormData → Sharp JPEG 200×200 → Base64
- Cambio de contraseña (mínimo 8 caracteres, toggles de visibilidad)
**Estado:** `[x]` — corrección ya aplicada: validación contraseña `< 6` → `< 8` (C3)

---

### 6.4 Decisiones de arquitectura y cambios respecto al diseño original — Tabla X

| # | Decisión / Cambio | Motivación técnica | Commit |
|---|---|---|---|
| DA01 | Verificación por código 6 dígitos en lugar de enlace | Clientes de correo bloquean hipervínculos; código más robusto y familiar | 70e02b9 |
| DA02 | Resend API como proveedor primario de email | SMTP Gmail timeouts >5s en Render | 190491b |
| DA03 | Cadena Gemini 2.5 Flash → Groq llama-3.3-70b → 16 reglas estáticas | Gemini 2.0 deprecado; rate limits agresivos en plan gratuito | 31395bd |
| DA04 | Avatar como Base64 en MongoDB | Render destruye /uploads/ en redespliegue | 4da73b2 |
| DA05 | Sharp compresión 200×200 70% antes de guardar | Sin compresión imagen ~2MB supera límite 16MB/documento MongoDB | 4da73b2 |
| DA06 | shuffleArray en backend conservando IDs originales | Shuffle en frontend generaba IDs nuevos → evaluaciones incorrectas | 449177d |
| DA07 | minPassing = 80% por defecto | Criterios de acreditación académica (RF9) | — |
| DA08 | 6 módulos Videojuegos, 7 módulos Redes Sociales y Streaming | Redes sociales y streaming requieren mayor profundidad temática | seed refactors |
| DA09 | Rutas SPA en español | Coherencia con público hispanohablante objetivo | ae2ebcd |
| DA10 | ActivityLog idempotente por uniqueKey + índice parcial | Previene duplicados por reintentos de red o doble petición | fix_activitylog_index |
| DA11 | Rate limit diferenciado dev/prod | Rate limit estricto en dev bloqueaba flujos de prueba manuales | index.js |
| **DA12** | **Imágenes de artículos en Netlify estático (`client/public/`)** | **Render destruye archivos (DA04); MongoDB no diseñado para binarios (16MB/doc); imágenes atadas al seed = contenido estático del código** | **5355948** |
| **DA13** | **Certificado PDF via html2canvas + jsPDF en lugar de jsPDF puro** | **jsPDF puro no soporta unicode, produce texto con espaciado irregular y no permite CSS real; html2canvas captura HTML/CSS con fidelidad total** | **5355948** |

**Estado:** `[!]` — agregar DA12 y DA13 al documento

---

### 6.5 Scripts de mantenimiento y migración de base de datos

| Script | Propósito | Cuándo se usó |
|---|---|---|
| `seed.js` / `seed-target.js` | Poblar BD con contenido curricular | Cada ciclo de re-seed |
| `backup_db.js` | Snapshot antes de re-seed | Previo a cambios destructivos |
| `cleanup_courses.js` | Eliminar estructura antigua de módulos separados | Refactorización |
| `remove_duplicate_streaming.js` | Eliminar curso Streaming duplicado | Bug de idempotencia en seed |
| `delete_clone.js` | Eliminar clon de curso por ID | Variante de anterior |
| `fix_attempts.js` | Reasignar intentos huérfanos al quiz diagnóstico nuevo | Tras re-seed que cambia IDs |
| `fix_activitylog_index.js` | Eliminar índice unique legacy, recrear índice parcial | Bug duplicados ActivityLog |
| `fix_videos.js` | Corregir videoUrl erróneas en Redes Sociales | Error en datos del seed |
| `migrate_users.js` | Actualizar campos de usuarios existentes | Cambio de schema en User |
| `restore_progress.js` (v1–v3) | Reconstruir Progress tras cambio de IDs por re-seed | Pérdida de progreso |
| `sync_progress.js` | Sincronizar progreso calculando desde cero | Verificación de integridad |
| `audit_orphans.js` / `clean_orphans.js` | Detectar y eliminar documentos huérfanos | Mantenimiento periódico |
| `clean_progress.js` | Limpiar registros de progreso inconsistentes | Tras migraciones complejas |

**Estado:** `[ ]` — sección pendiente de redactar en el Word

---

## CAPÍTULO 7: PRUEBAS
> **TODO: Capítulo completo pendiente de redactar.**

### 7.1 Estrategia de pruebas
- Enfoque mixto: automatizadas (Jest 30 + Supertest 7 + MongoMemoryServer 11) para lógica crítica del backend; manuales para flujos UI y experiencia de usuario
- BD en memoria descartable por suite; sin efectos secundarios sobre Atlas
- 3 suites automatizadas (auth, quiz, chatbot) + pruebas manuales por módulo
**Estado:** `[ ]`

### 7.2 Pruebas unitarias e integración (automatizadas)

#### 7.2.1 Suite: Autenticación (`auth.test.js`)
- Caso 1: POST /register devuelve 201, isVerified=false
- Caso 2: POST /login sin verificar → 401
- Caso 3: Verificación → isVerified=true
- ⚠️ **Nota crítica:** test escrito con verificación por enlace (GET /:token); en producción se usa POST /verify con código en body → pendiente actualizar test
**Estado:** `[ ]`

#### 7.2.2 Suite: Motor de evaluación (`quiz.test.js`) — 9 tests pasando
- Caso 1: errorsByArea y errorsByPlatform calculados desde pregunta fallada exacta
- Caso 2: scope='course' → questionDetails vacío
- Caso 3: lecciones guiadas diagnóstico por riskArea+platform de la pregunta fallada
- Caso 4: lecciones guiadas por módulo (campo teaches), sin relleno no relacionado
- Caso 5: persistencia de recomendaciones del dashboard desde preguntas falladas
- Caso 6: limpieza de recomendaciones al aprobar el mismo quiz posteriormente
- Caso 7: guía de aprendizaje sin lecciones de módulo ajeno
- Caso 8: no rellenar guía con lecciones no relacionadas
- Caso 9: (extra de suite)
**Estado:** `[ ]`

#### 7.2.3 Suite: Chatbot (`chatbot.test.js`)
- Caso 1: USE_MOCK_AI=true → fallback estático para "grooming"; persiste Conversation + Message
- Caso 2: 2 mensajes misma conversación → ≥2 registros en messages
- Caso 3: "hola" → respuesta contiene "seguridad digital"
**Estado:** `[ ]`

### 7.3 Pruebas manuales de integración (Postman + BD)
- Flujo completo: registro → verificación → login → ruta protegida
- Flujo recovery: correo → código → reset → login nueva contraseña
- Reporte con token: `test-auth-report.js`
- Email SMTP: `test-email.js`; Resend: `test-sendEmail.js`
- Lógica diagnóstico: `test_api_logic.js`, `test_recent_activity.js`
- Login bcrypt: `test_login.js`
- Conexión Atlas: `test_db.js`, `check_db.js`
- Health check: `health_check.js`
- Integridad: `check_lesson_count.js`, `check_integrity.js`, `check_progress_integrity.js`, `check_social_course.js`, `check_streaming_course.js`
**Estado:** `[ ]`

### 7.4 Pruebas de seguridad
- Validación de inputs en todos los endpoints (campos requeridos, longitudes, formatos)
- JWT obligatorio en rutas protegidas → 401 sin token
- Rate limiting → 429 en producción
- CORS: origen no listado → error
- Enumeración de usuarios: email duplicado → mensaje genérico
- passHash nunca expuesto en respuestas JSON
- Anonimización chatbot: emails → [EMAIL], teléfonos → [TLF]
**Estado:** `[ ]`

### 7.5 Pruebas de rendimiento
- Chatbot: Gemini 2.5 Flash <1.5s, Groq ~0.8s, estático <50ms
- Cursos con populate: <400ms (Atlas)
- **[!] ACTUALIZAR — certificado PDF:** ~1–2 s (html2canvas captura DOM → jsPDF; antes era <200ms con jsPDF puro). El incremento es aceptable para operación puntual de descarga.
- Avatar con Sharp: <200ms vs ~1.5s sin compresión
**Estado:** `[ ]`

### 7.6 Pruebas de usabilidad
- Dispositivos: escritorio (Chrome, Firefox), móvil (iOS Safari, Android Chrome)
- Responsive: Tailwind breakpoints sm/md/lg en DevTools
- Bug B08: chatbot desbordaba pantalla 13" → `max-h-[calc(100vh-...)]` (commit 83288fe)
- Bug B10: touch crop avatar no respondía en iOS → pointer events (commit 31395bd)
- Navegación con teclado: orden de tabulación lógico en formularios
**Estado:** `[ ]`

### 7.7 Resultados de las pruebas automatizadas
- Tabla: suite / # casos / pasados / fallidos / notas
- Evidencia: captura `jest --coverage` o `npm test`
- Métricas de cobertura por módulo
- Nota: `auth.test.js` refleja flujo de enlace antiguo → pendiente actualizar
**Estado:** `[ ]`

### 7.8 Incidencias documentadas y resolución — Tabla de bugs

| ID | Descripción | Módulo | Causa raíz | Solución | Commit |
|---|---|---|---|---|---|
| B01 | SMTP Gmail timeout >10s | Email | Red restrictiva en producción | timeout 5s; migrar a Resend | 6ebbafe, 190491b |
| B02 | Avatar perdido en redespliegue | Perfil | Render borra /uploads/ en cada deploy | Base64 en MongoDB | 4da73b2 |
| B03 | Respuestas quiz inválidas | Evaluación | Shuffle regeneraba IDs de opciones | Shuffle solo en presentación | 449177d |
| B04 | Duplicado curso Streaming | Seed | Seed no era idempotente | remove_duplicate_streaming.js | — |
| B05 | Progreso perdido tras re-seed | Progreso | IDs de módulos cambian en cada seed | restore_progress v1/v2/v3 | — |
| B06 | Error 11000 en ActivityLog | BD | Índice único sin filtro parcial | fix_activitylog_index.js | — |
| B07 | Pantalla blanca ForgotPassword | Frontend | Crash modelo Gemini deprecado | try/catch granular + modelo actualizado | 1e50a6a |
| B08 | Chatbot desbordaba laptop 13" | UI | Altura fija sin límite viewport | max-h calculado con CSS custom | 83288fe |
| B09 | fill_blanks fallaba con mayúsculas | Evaluación | Comparación case-sensitive | toLowerCase() + trim() en quizService | — |
| B10 | Imágenes Base64 rotas en frontend | UI | Prefijo data: faltante | avatarUrl.js normaliza prefijo | 22204fd |
| B11 | Rutas SPA mostraban 404 en Netlify | Despliegue | Netlify no redirigía a index.html | _redirects + netlify.toml | db6b970 |
| B12 | Intentos huérfanos tras re-seed | BD | quizIds obsoletos en attempts | fix_attempts.js reasigna al nuevo diag | — |
| **B13** | **Certificado PDF con caracteres corruptos y texto desalineado** | **Frontend** | **jsPDF no soporta unicode ni CSS; coordenadas absolutas generaban huecos** | **html2canvas + jsPDF; diseño en HTML/CSS** | **5355948** |

**Estado:** `[ ]` — tabla existe en Word pero requiere agregar B13

---

## BIBLIOGRAFÍA (57 referencias documentadas)
Referencias [1]–[57] correctamente citadas en el documento.
**Estado:** `[x]`

---

## PENDIENTES GENERALES DEL DOCUMENTO

### 🔴 Críticos (antes de entregar)
| # | Qué falta | Dónde |
|---|---|---|
| 1 | Redactar Capítulo 7 completo (§7.1–§7.8) | Nuevo capítulo |
| 2 | Redactar §6.5 Scripts de mantenimiento | §6.5 |
| 3 | Actualizar §6.3.3 Dashboard: certificado html2canvas, tarjeta novedad, 4 fetches | §6.3.3 |
| 4 | Actualizar §6.3.4 Visor: scroll-to-lesson al volver al curso | §6.3.4 |
| 5 | Agregar GET /api/content/latest-update en §6.2.3 | §6.2.3 |
| 6 | Actualizar §6.2.4 recommendations: desde preguntas falladas, limpieza al aprobar | §6.2.4 |
| 7 | Agregar DA12 e DA13 en tabla §6.4 | §6.4 |
| 8 | Agregar párrafo correcciones de calidad en §6.2.9 (exámenes, glosarios, imágenes) | §6.2.9 |
| 9 | Actualizar §7.5: tiempo PDF ~1–2s (html2canvas) | §7.5 |
| 10 | Agregar B13 en tabla §7.8 | §7.8 |
| 11 | Actualizar pila tecnológica §4.7: "jsPDF" → "jsPDF + html2canvas" | §4.7 |

### 🟡 Pendientes menores (presentación)
| # | Qué falta | Dónde |
|---|---|---|
| m1 | Asignar números reales a "Tabla X" y "Figura X" en todo el documento | Todo el doc |
| m2 | Asignar número a Il. DFD Nivel 2 P3 y P5 (actualmente "Il. X") | §4.3 |
| m3 | Actualizar índice de figuras con Il. 8b | Índice ilustraciones |

---

## ÁRBOL DE ARCHIVOS RELEVANTES

```
TT_Academia/
├── Reporte_Tecnico.docx             ← versión editable
├── Reporte_Tecnico.pdf              ← versión para revisión
├── RUTA_TODOS_CAPITULOS.md          ← este archivo (reemplaza RUTA_CAPITULOS_6_7.md)
├── CONTEXTO_SESION.md               ← historial de cambios de código
├── client/src/
│   ├── pages/
│   │   ├── Dashboard.jsx            ← 4 fetches, recomendaciones, novedad, certificado html2canvas
│   │   ├── Profile.jsx              ← validación contraseña mín. 8 chars
│   │   ├── LessonView.jsx           ← renderer MD, YouTube iframe, scroll-to-lesson
│   │   ├── CourseDetail.jsx         ← scroll-to-lesson, admin bypass
│   │   ├── QuizTaker.jsx            ← 10 tipos de pregunta
│   │   ├── RealCases.jsx            ← paginación incremental, tabs por URL
│   │   └── CaseDetail.jsx           ← timeline, tips, layout 4/8
│   ├── components/
│   ├── context/AuthContext.jsx
│   ├── services/api.js
│   └── utils/avatarUrl.js
├── client/public/
│   ├── logo_v2.png
│   └── article-images/redes-sociales/  ← M1A1–M7A2 (28 imágenes)
├── server/src/
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── content.routes.js        ← incluye /api/content/latest-update
│   │   ├── quiz.routes.js           ← incluye /api/quiz/my-recommendations
│   │   ├── progress.routes.js
│   │   ├── chatbot.routes.js
│   │   ├── report.routes.js
│   │   └── resource.routes.js
│   ├── services/
│   │   ├── quizService.js           ← recommendations desde preguntas falladas
│   │   └── progressService.js
│   ├── models/                      ← 15 colecciones
│   └── scripts/seed/
│       ├── courses/games/           ← module1-6.js, finalQuiz.js
│       ├── courses/social/          ← catalog.js (con imágenes e idioma corregido)
│       └── courses/streaming/       ← catalog.js (YouTube vs Twitch corregido)
└── server/src/tests/
    ├── auth.test.js
    ├── quiz.test.js                 ← 9 tests pasando
    └── chatbot.test.js
```

---

*Archivo generado: 2026-04-30 | Basado en lectura completa del Reporte_Tecnico.docx (388,487 caracteres, 3,964 líneas) y análisis del código fuente*
