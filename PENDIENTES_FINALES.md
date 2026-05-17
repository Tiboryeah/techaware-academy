# PENDIENTES FINALES VERIFICADOS — Reporte Técnico Kuxipilli
## Revisión con lectura directa del Reporte_Tecnico.docx

> Última actualización: 2026-05-15
> Convención: `[ ]` pendiente | `[x]` aplicado en Word

---

## ESTADO GENERAL

- Capítulos 1–5: ✅ Correctos y verificados
- Capítulo 6: ✅ Completo con todas las correcciones y funciones nuevas aplicadas
- Capítulo 7: ✅ COMPLETO — escrito y aplicado en sesión 2026-05-15

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
- [x] **C6-3** — §6.2.9 Seed: nota WPM agregada ✅
- [x] **C6-4** — §6.3.1 Tabla rutas SPA: /casos-y-guias y /casos/:id → Público ✅
- [x] **C6-5** — §6.3.2 validación email Register + cooldown VerifyAccount ✅
- [x] **C6-6** — §6.3.3 Dashboard: badges con imágenes personalizadas ✅
- [x] **C6-7** — §6.3.4 LessonView: H1 skip + título módulo en sidebar ✅
- [x] **C6-8** — §6.3.4 CourseDetail: copa_acreditada.png badge ✅
- [x] **C6-9** — §6.3.7 RealCases: íconos SVG, semánticos, videos animados, fechas, acceso público ✅
- [x] **C6-10** — §6.4 DA table: DA12–DA15 agregadas, intro actualizada a quince ✅

---

### CAPÍTULO 7 ✅ COMPLETO
- [x] **C7-1** §7.1 Estrategia de pruebas ✅
- [x] **C7-2** §7.2 + subsecciones 7.2.1/7.2.2/7.2.3 + tabla resumen ✅
- [x] **C7-3** §7.3 con 4 subsecciones + tabla scripts ✅
- [x] **C7-4** §7.4 con 3 subsecciones + 3 tablas de vectores ✅
- [x] **C7-5** §7.5 con 3 subsecciones + 3 tablas de métricas ✅
- [x] **C7-6** §7.6 con 3 subsecciones ✅
- [x] **C7-7** §7.7 con 2 subsecciones + tabla resultados 15/15 ✅
- [x] **C7-8** §7.8 tabla B01–B13 + cierre del capítulo ✅

### ANTES DEL CAPÍTULO 7 — 2 erratas que aún faltan
- [x] **E-A** — §4.3: 'e Flujo' → 'de Flujo' corregido ✅ (índice se actualiza al final automáticamente)
- [x] **E-B** — §5.6 Tabla 26: 'Escalado horizontal' → rate limiting + stateless ✅
  - §7.1 Estrategia de pruebas
  - §7.2 Pruebas automatizadas (auth 3 casos, quiz 9 casos, chatbot 3 casos)
  - §7.3 Pruebas manuales (Postman + BD)
  - §7.4 Pruebas de seguridad
  - §7.5 Pruebas de rendimiento
  - §7.6 Pruebas de usabilidad (B08, B10)
  - §7.7 Tabla resultados (15/15 pasaron)
  - §7.8 Tabla bugs B01–B13

---

### BIBLIOGRAFÍA Y GLOSARIO ✅ COMPLETO
- [x] 57 referencias originales — correspondencia 1:1 con cuerpo ✅
- [x] [11] Wikipedia → Hinduja & Patchin (Cyberbullying Research Center) — pendiente aplicar
- [x] Tabla 2 Glosario: 5 citas faltantes agregadas [58]-[62] ✅
- [x] Tabla 2 Glosario: 5 términos nuevos agregados (SPA, React, Node.js, MongoDB, Sharp) [63]-[67] ✅
- [x] Bibliografía extendida a 67 referencias — 67 en cuerpo / 67 en bibliografía ✅

### PENDIENTES FINALES
- [ ] **M1** — Reemplazar todas las "Tabla X" con números reales consecutivos
- [ ] **M2** — Reemplazar "Il. X" en §4.3 con números reales; asignar números a Il. 8b, DFD P3, DFD P5 y las 24 ilustraciones nuevas de §6.3.9
- [ ] **M3** — Actualizar índices (F9 en Word al finalizar)
- [x] **F1** — §6.3.9 Pantallas del sistema implementado: texto completo redactado (7 subsecciones, 24 ilustraciones) ✅ 2026-05-17
- [x] **F2a** — Anexo A: Manual de usuario — 6 figuras propias (modo oscuro) + referencias cruzadas a §6.3.9 ✅ 2026-05-17
- [x] **F2b** — Anexo B: Manual de instalación / despliegue local y producción ✅ 2026-05-17
- [x] **F3** — [11] Wikipedia → Hinduja & Patchin aplicado en §2.2 y bibliografía ✅ 2026-05-17

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
