# RUTA DE CONTENIDO COMPLETA — Todos los Capítulos
## Reporte Técnico TT 2026-A097 | Kuxipilli
### "Aplicación Web para Padres y/o Tutores: Concientización y Prevención de Riesgos Digitales en Niños de entre 6 y 12 años"

> **Convención:** `[x]` = redactado y correcto | `[✓]` = corregido y aplicado en Word | `[!]` = redactado pero necesita corrección/actualización | `[ ]` = pendiente de redactar
> Última revisión: 2026-05-01

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

**Estado:** `[✓]` — corregido y aplicado (lenguaje formal, Kuxibot nombrado, componentes precisos, tiempo verbal corregido)

---

## CAPÍTULO 1: PROBLEMÁTICA

### 1.1 Justificación
**Contenido:** impacto del uso no controlado de internet en salud mental, reducción de relaciones sociales, exposición a contenido sin filtros, urgencia de solución para padres. Cita HealthyChildren.org, UNICEF, Gaptain.
**Estado:** `[✓]` — corregido y aplicado (errores gramaticales, anglicismos, lenguaje informal eliminados)

### 1.2 Propuesta de solución
**Contenido:** plataforma web con examen diagnóstico, 3 cursos acreditables, recomendaciones personalizadas, Kuxibot, casos prácticos, dashboard.
**Estado:** `[✓]` — corregido y aplicado (reescrito en tono formal, componentes precisos del sistema real)

### 1.3 Objetivos

#### 1.3.1 Objetivo general
> Desarrollar una aplicación web educativa e interactiva para madres, padres y tutores de niños de entre 6 y 12 años, que integre examen diagnóstico, tres cursos acreditables, recomendaciones personalizadas, Kuxibot con IA generativa, panel de seguimiento y casos prácticos, para fortalecer la alfabetización digital parental.
**Estado:** `[✓]` — corregido y aplicado (tiempo verbal, componentes completos, sin lenguaje informal)

#### 1.3.2 Objetivos específicos (7 en total)
1. Diseñar e implementar la estructura de cursos y contenido educativo
2. Proveer orientación sobre estrategias de control parental
3. Implementar un sistema de evaluación y acreditación (≥80% → constancia PDF)
4. Desarrollar un sistema de recomendaciones de repaso personalizado
5. Integrar el asistente conversacional Kuxibot (Gemini → Groq → estático)
6. Incorporar una sección de casos prácticos y guías
7. Implementar un panel de seguimiento del progreso
**Estado:** `[✓]` — corregido y aplicado (lenguaje formal, preciso, sin coloquialismos)

### 1.4 Estado del Arte
**Contenido:** herramientas analizadas en Tabla 1 (sin cambios). Párrafos narrativos corregidos.
**Estado:** `[✓]` — corregido y aplicado ("chances"→probabilidad, "peques"→hijos, "tiro por la culata" eliminado, "hueco enorme"→brecha significativa)

### 1.5 Delimitación del Proyecto
**Estado:** `[✓]` — corregido y aplicado ("puede joder"→lenguaje formal, "nuestra app"→el sistema, tres ámbitos bien etiquetados, enfoque educativo/preventivo aclarado)
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
**Estado:** `[✓]` — corregido y aplicado (lenguaje informal eliminado, "se la pasan" → redacción formal)

### 2.2 Los Riesgos Asociados al Uso de Redes Sociales
**Estado:** `[✓]` — corregido y aplicado ("presa fácil"→vulnerable, "teens"→adolescentes, "ideación suicida" en lugar de "ideas suicidas")

### 2.3 Estrategias de Protección y Uso Responsable de Internet
**Estado:** `[✓]` — corregido y aplicado (Kuxibot nombrado correctamente, "meterse de lleno"→involucrarse activamente)

### 2.4 El Rol de los Padres en la Protección Digital
**Estado:** `[✓]` — corregido y aplicado ("blindar"→protección, segunda persona eliminada)

### 2.5 El Efecto de los Videojuegos en la Educación y el Rendimiento Académico
**Estado:** `[✓]` — corregido y aplicado ("cómo les va en la escuela"→rendimiento académico, "les pasa factura"→impacta negativamente)

### 2.6 Videojuegos y el Desarrollo de Habilidades Cognitivas
**Estado:** `[✓]` — corregido y aplicado ("geniales para aprender"→contribuyen al desarrollo cognitivo)

### 2.7 Desigualdades en el Acceso a Herramientas de Protección Digital
**Estado:** `[✓]` — corregido y aplicado ("chances"→acceso, "familias humildes"→nivel socioeconómico)

### 2.8 El Papel de la Educación Formal en la Seguridad Digital
**Estado:** `[✓]` — corregido y aplicado (tono formal, "varios países ya lo están haciendo realidad"→han comenzado a implementar)

### 2.9 La Evolución de las Normativas sobre la Protección Digital Infantil
**Estado:** `[✓]` — corregido y aplicado (ajuste menor "se han vuelto"→"se han hecho")

### 2.10 Grooming: Riesgo Digital en Línea
**Estado:** `[✓]` — corregido y aplicado ("sonsacar"→obtener, "deja secuelas"→genera consecuencias)

### 2.11 Aplicación Web
**Estado:** `[✓]` — corregido y aplicado (segunda persona eliminada, "gadget"→dispositivo)

### 2.12 Aplicación Web Interactiva
**Estado:** `[✓]` — corregido y aplicado ("mover y usar"→interactuar y utilizar)

### 2.13 Lenguajes de Programación para el Desarrollo Web
**Estado:** `[✓]` — corregido y aplicado (**error factual eliminado: Python/Flask/Django no se usan en el proyecto**)

### 2.14 Bases de Datos
**Estado:** `[x]` — sin cambios necesarios

#### 2.14.1 Justificación de la Elección (MongoDB)
**Estado:** `[✓]` — corregido y aplicado (**"React/Vue.js"→React**, **"colección Articles"→lessons**)

### 2.15 Herramientas de Desarrollo
**Estado:** `[✓]` — corregido y aplicado (**error factual eliminado: Heroku→Netlify/Render**)

### 2.16 Seguridad en la Aplicación Web
**Estado:** `[✓]` — corregido y aplicado (JWT, Bcrypt, HTTPS, Helmet, CORS, rate limiting documentados con precisión)

### 2.17 Diseño Responsivo
**Estado:** `[✓]` — corregido y aplicado (**error factual eliminado: Bootstrap→Tailwind CSS v4**)

### 2.18 Experiencia de Usuario (UX) y Diseño de Interfaz (UI)
**Estado:** `[✓]` — corregido y aplicado (encabezados informales eliminados, registro formal)

### 2.19 Riesgos en plataformas de streaming (YouTube y Twitch)
**Estado:** `[✓]` — corregido y aplicado (puntuación de la lista corregida)

### 2.20 Alfabetización Digital Parental
**Estado:** `[✓]` — corregido y aplicado ("Este proyecto quiere sumarse"→contribuye, "gadgets"→dispositivos)

### 2.21 Marco Normativo sobre la Protección Digital Infantil en México
**Estado:** `[x]` — sin cambios necesarios

### 2.22 Glosario de Términos Técnicos (Tabla 2)
**Estado:** `[✓]` — corregido y aplicado (5 entradas nuevas agregadas: Tailwind CSS, Vite, Mongoose, Bcrypt, html2canvas)

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
10 Sprints en total: 5 de TT1 (análisis/diseño) + 5 de TT2 (implementación/pruebas/despliegue).
Herramientas: GitHub, PlantUML, Mermaidchart
**Estado:** `[✓]` — corregido y aplicado (TT2 sprints agregados, Sprint 6–10 documentados con lo implementado realmente)

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
Nombres y prioridades sin cambio. Descripciones reescritas en tono formal y tercera persona.
**Estado:** `[✓]` — corregido y aplicado (RF1–RF12: segunda persona eliminada, "súper útil"→formal, 80% mencionado en RF9, código 6 dígitos en RF10)

### 3.4 Requerimientos No Funcionales (RNF) — Tabla 6
Nombres y categorías sin cambio. Definición introductoria y descripciones reescritas.
**Estado:** `[✓]` — corregido y aplicado ("superintuitiva en un santiamén"→formal, RNF3 <2s precisado, RNF7 JWT/OAuth→solo JWT)

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
Nombres sin cambio. Párrafo introductorio y descripciones RN-03 a RN-10 reescritos.
**Estado:** `[✓]` — corregido y aplicado (RN-04 "tocar"→formal, RN-05 "al 100%"→principios LGPDPPSO, RN-06 "se apaga sola"→expira automáticamente, RN-07 "a prueba de balas"/"meollo"→lenguaje técnico formal, RN-09 segunda persona eliminada, RN-10 "brilla"→accesible y funcional)

#### 3.6.2 Observaciones generales
**Estado:** `[x]` — sin cambios necesarios

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

### 3.7.1 Clasificación de riesgos
**Estado:** `[✓]` — corregido y aplicado (emojis 🟥🟧🟩 → texto formal con negritas)

### 3.8 Análisis de Factibilidad
- **Técnica:** Alta — pila MERN madura, SDK Gemini disponible, herramientas gratuitas
- **Operativa:** Alta — no requiere conocimientos técnicos del usuario final
- **Económica:** Alta — open source, costo total estimado $37,800–$38,300 MXN
**Estado:** `[✓]` — corregido y aplicado (Nodemailer solo → Resend API primario + Nodemailer fallback)

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

**Estado:** `[✓]` — corregido y aplicado (jsPDF → jsPDF + html2canvas en Tabla 10, Tabla 11 y Tabla 15)

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
**Estado:** `[x]` — sin cambios en objetivos

#### 4.9.2 Criterios de aceptación
**Estado:** `[x]`

#### 4.9.3 Plan de pruebas por módulo — Tabla 17 y Tabla 18
**Estado:** `[✓]` — corregido y aplicado (Mocha/JMeter/OWASP ZAP/React Testing Library eliminados → Jest+Supertest+Postman; notificación admin → Resend API no "servidor SMTP")

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
**Estado:** `[✓]` — corregido y aplicado (tiempo futuro → pasado: "se implementarán"→"fueron implementados con React 19")

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
**Estado:** `[✓]` — corregido y aplicado (sobrecarga servidor: escalado horizontal → rate limiting + arquitectura stateless)

### 5.7 Valor Tecnológico y Madurez del Proyecto
- TT1: Nivel 2 COBIT (Gestionado) ✓ alcanzado
- TT2: Nivel 3 (Establecido) ✓ alcanzado
**Estado:** `[✓]` — corregido y aplicado (tiempo futuro → pasado: TT2 ya concluyó, Nivel 3 alcanzado)

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
Método: depreciación lineal, vida útil 36 meses. Mensual: $833.33 MXN. Total 10 meses: $8,333.33 MXN.
**Estado:** `[✓]` — verificar que la fórmula sea visible en Word (no campo vacío ni imagen)

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
- GET /api/content/latest-update → novedad más reciente entre `Lesson(article|guide)` y `Resource(case|guide)`; devuelve `{ label, title, description, href, createdAt }`
**Estado:** `[✓]` — corregido y aplicado (endpoint latest-update documentado)

#### 6.2.4 Motor de evaluación (`quiz.routes.js` + `quizService.js`)
- GET /api/quiz/:id → preguntas mezcladas (shuffleArray en backend, DA06)
- GET /api/quiz/my-recommendations → última recomendación pendiente persistida
- GET /api/quiz/recommendations/:attemptId → áreas/plataformas a repasar (pantalla inmediata)
- POST /api/quiz/:id/submit → recomendaciones calculadas desde preguntas falladas concretas; `scope:'course'` no genera recomendaciones ni `questionDetails`; al aprobar el mismo quiz se eliminan recomendaciones previas
- Guía de aprendizaje: lecciones por `moduleId`, no por `courseId`; sin fallback con lecciones no relacionadas
**Estado:** `[✓]` — corregido y aplicado (recommendations desde preguntas falladas, limpieza al aprobar)

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
- Cubre RF2 y RF12 (no RF10/RF11 como estaba escrito)
**Estado:** `[✓]` — corregido y aplicado (RF10/RF11 → RF2/RF12)

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
- `seed.js` / `seed-target.js`, comandos npm por curso
- Idempotente con `getOrCreate`, correcciones de calidad de exámenes (multiple_selection, categorize, match_columns), mini glosarios para padres, imágenes en artículos Redes Sociales
**Estado:** `[✓]` — corregido y aplicado (párrafo de calidad de contenido agregado)

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
- 4 peticiones paralelas: progreso, cursos, recomendaciones, latest-update
- Medidor SVG, tarjeta novedad, tarjeta recomendadas, insignias, certificado html2canvas+jsPDF
**Estado:** `[✓]` — corregido y aplicado (4 fetches, tarjeta novedad, certificado html2canvas+jsPDF)

#### 6.3.4 Visor de cursos y lecciones
- CourseDetail: scroll-to-lesson con requestAnimationFrame + scrollIntoView(behavior:'auto')
- LessonView: renderer Markdown, iframe YouTube, marcado automático
**Estado:** `[✓]` — corregido y aplicado (scroll behavior:'smooth'→'auto', requestAnimationFrame documentado)

#### 6.3.5 Sistema de evaluación (QuizTaker)
- 10 tipos de pregunta, modo revisión, guía de aprendizaje por pregunta fallada
- Cubre RF3, RF4 y RF9 (no RF6/RF7/RF8 como estaba escrito)
**Estado:** `[✓]` — corregido y aplicado (RF6/RF7/RF8 → RF3/RF4/RF9)

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

**Estado:** `[✓]` — corregido y aplicado (DA12 y DA13 agregados a la tabla)

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

**Estado:** `[✓]` — corregido y aplicado (sección completa redactada y pegada en Word)

---

## CAPÍTULO 7: PRUEBAS
> **PENDIENTE:** texto redactado en CORRECCIONES.md listo para pegar. Esperando cambios visuales finales antes de aplicar §7.6 y §7.8.

### 7.1 Estrategia de pruebas
- Enfoque mixto: automatizadas (Jest 30 + Supertest 7 + MongoMemoryServer 11) para lógica crítica del backend; manuales para flujos UI y experiencia de usuario
- BD en memoria descartable por suite; sin efectos secundarios sobre Atlas
- 3 suites automatizadas (auth, quiz, chatbot) + pruebas manuales por módulo
**Estado:** `[ ]` — texto listo en CORRECCIONES.md, pendiente pegar en Word

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
- Certificado PDF: ~1–2 s (html2canvas+jsPDF; antes <200ms con jsPDF puro)
- Avatar con Sharp: <200ms vs ~1.5s sin compresión
**Estado:** `[ ]` — texto listo en CORRECCIONES.md, pendiente pegar en Word

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

**Estado:** `[ ]` — texto completo listo en CORRECCIONES.md (B01–B13), pendiente pegar en Word tras cambios visuales finales

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
