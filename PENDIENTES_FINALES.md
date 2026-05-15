# PENDIENTES FINALES VERIFICADOS — Reporte Técnico Kuxipilli
## Revisión con lectura directa del Reporte_Tecnico.docx

> Última actualización: 2026-05-15
> Convención: `[ ]` pendiente | `[x]` aplicado en Word

---

## ESTADO GENERAL

- Capítulos 1–5: ✅ Correcciones previas aplicadas correctamente
- Capítulo 6: ✅ Base correcta, PERO con 6 errores nuevos (mayo 2026) confirmados en docx
- Capítulo 7: 🔴 NO existe en el documento — texto completo ya redactado en sesión anterior

---

## ERRORES CONFIRMADOS LEYENDO EL DOCX REAL

### 🔴 CRÍTICO — En el documento HOY mismo

| # | Sección | Error confirmado | Corrección |
|---|---|---|---|
| ~~E1~~ | ~~§6.3.1 Tabla de rutas SPA~~ | ~~`RealCases /casos-y-guias` → Protegido~~ | ✅ Aplicado |
| ~~E1~~ | ~~§6.3.1 Tabla de rutas SPA~~ | ~~`CaseDetail /casos/:id` → Protegido~~ | ✅ Aplicado |
| ~~E2~~ | ~~§6.2.8 Endpoints resources~~ | ~~GET /api/resources → Protegido~~ | ✅ Aplicado |
| ~~E2~~ | ~~§6.2.8 Endpoints resources~~ | ~~GET /api/resources/:slug → Protegido~~ | ✅ Aplicado |
| ~~E3~~ | ~~§6.2.5 Progress routes~~ | ~~RF8 incorrecto en progress~~ | ✅ Aplicado |
| ~~E4~~ | ~~§4.8.5 m) resources~~ | ~~Schema sin videoUrl ni caseDate~~ | ✅ Aplicado |
| ~~E5~~ | ~~§4.8.5 b) courses~~ | ~~Duración '6 horas'~~ | ✅ Aplicado |

---

## PENDIENTES POR SECCIÓN — En orden del documento

### PÁGINAS PRELIMINARES
- [ ] **P1** — Índice de tablas: asignar números reales a todas las "Tabla X"
- [ ] **P2** — Índice de ilustraciones: agregar Il. 8b; asignar número a DFD Nivel 2 P3 y P5

---

### CAPÍTULO 3
- [x] **C3-1** — §3.3 RF8 "Acceso a Casos Prácticos": nota de acceso público sin login ✅

---

### CAPÍTULO 4
- [x] **C4-1a** — §4.8.1 Diagrama de clases: PlantUML actualizado con videoUrl, caseDate y correcciones ✅
- [x] **C4-1b** — §4.8.4 Catálogo de colecciones: descripción de resources actualizada ✅
- [x] **C4-1c** — §4.8.5 m) resources: sources, videoUrl y caseDate agregados ✅
- [x] **C4-2** — §4.8.5 b) courses: duración corregida ✅
- [x] **C4-3** — §4.4 CU06: actor y descripción actualizados con acceso público ✅

---

### CAPÍTULO 6
- [x] **C6-0** — §4.5.3 DS-03: RF8 incorrecto eliminado ✅
- [x] **C6-1** — §6.2.5 Progress routes: RF8 incorrecto eliminado, queda solo RF7 ✅
- [x] **C6-2** — §6.2.8 Resources routes: Protegido → Público en ambos GET ✅
- [ ] **C6-3** — §6.2.9 Seed: agregar nota sobre cálculo real de duraciones (WPM 150 + bonus imagen 0.5 min)
- [x] **C6-4** — §6.3.1 Tabla rutas SPA: /casos-y-guias y /casos/:id → Público ✅
- [ ] **C6-5** — §6.3.2 Auth UI: agregar validación email en Register + cooldown 30 s en VerifyAccount
- [ ] **C6-6** — §6.3.3 Dashboard: actualizar párrafo de badges (imágenes personalizadas, no íconos Lucide)
- [ ] **C6-7** — §6.3.4 LessonView: agregar fix de H1 duplicado + título de módulo en sidebar
- [ ] **C6-8** — §6.3.4 CourseDetail: agregar nota sobre `copa_acreditada.png` en badge de acreditación
- [ ] **C6-9** — §6.3.7 RealCases: renovación completa (íconos plataforma SVG, íconos categoría semánticos, videos animados, fechas de caso, acceso público)
- [ ] **C6-10** — §6.4 DA table: agregar DA15 (acceso público a casos/guías) y DA16 (duraciones por WPM)

---

### CAPÍTULO 7 — Completo faltante
- [ ] **C7** — Pegar capítulo 7 completo (texto ya redactado en sesión 2026-05-14)
  - §7.1 Estrategia de pruebas
  - §7.2 Pruebas automatizadas (auth 3 casos, quiz 9 casos, chatbot 3 casos)
  - §7.3 Pruebas manuales (Postman + BD)
  - §7.4 Pruebas de seguridad
  - §7.5 Pruebas de rendimiento
  - §7.6 Pruebas de usabilidad (B08, B10)
  - §7.7 Tabla resultados (15/15 pasaron)
  - §7.8 Tabla bugs B01–B13

---

### PENDIENTES MENORES (presentación final)
- [ ] **M1** — Reemplazar todas las "Tabla X" con números reales consecutivos
- [ ] **M2** — Reemplazar "Il. X" en §4.3 con números reales
- [ ] **M3** — Actualizar índice de ilustraciones con Il. 8b

---

## ORDEN DE TRABAJO RECOMENDADO

1. C4-1a → C4-1b → C4-1c → C4-2 → C4-3 (Capítulo 4 — diseño/esquemas)
2. C3-1 (RF8 nota pública)
3. C6-1 → C6-2 → C6-3 → C6-4 (errores confirmados en Ch. 6)
4. C6-5 → C6-6 → C6-7 → C6-8 → C6-9 → C6-10 (funciones nuevas mayo 2026)
5. C7 (Capítulo 7 completo)
6. P1 → P2 → M1 → M2 → M3 (índices y numeración)

---

## NOTAS TÉCNICAS

- `Bootstrap` aparece 1x en el docx como COMPARACIÓN ("A diferencia de Bootstrap, Tailwind...") — correcto, no es error.
- `Gemini 2.0` aparece 1x como nota histórica ("fue deprecado durante el desarrollo") — correcto, no es error.
- `case_study` aparece en `Question.type` (10 tipos de pregunta) — correcto, el tipo fue eliminado solo de `Lesson.type`.
- `jsPDF` aparece junto a `html2canvas` en todas las menciones — correcto.
- `preferredReply` en CaseReport sigue en esquema con `default: 'Correo electrónico'` — aceptable (compatibilidad hacia atrás).
