# Actualizaciones sugeridas para `Reporte_Tecnico`

Este archivo reúne las secciones del reporte técnico que conviene actualizar para alinearlas con el estado real de la aplicación Kuxipilli.

La idea es que puedas usarlo como base de copia y pega dentro del documento principal.

---

## 1. Resumen

### Texto sugerido

Este proyecto consiste en una aplicación web educativa e interactiva dirigida a madres, padres y tutores, orientada a la concientización y prevención de riesgos digitales en niñas y niños de entre 6 y 12 años. La plataforma integra autenticación de usuarios, verificación por correo, recuperación de acceso, examen diagnóstico, módulos acreditables de aprendizaje, chatbot educativo, recursos de apoyo, casos reales y un sistema de seguimiento de progreso.

La solución fue implementada con una arquitectura MERN, utilizando React y Vite en el frontend, Express y Node.js en el backend, MongoDB Atlas como base de datos y servicios de terceros para correo transaccional e inteligencia artificial. El sistema busca fortalecer la alfabetización digital parental mediante rutas de revisión, contenidos temáticos y herramientas prácticas de acompañamiento.

---

## 2. Sección 3.2.2 Requerimientos del Sistema

### Texto sugerido

El sistema permite el registro y autenticación de usuarios mediante correo electrónico y contraseña, así como la verificación de cuenta y recuperación de acceso mediante código enviado por correo. Una vez autenticado, el usuario puede realizar un examen diagnóstico, consultar cursos y módulos, presentar evaluaciones, visualizar su avance y acceder a acreditaciones digitales.

Adicionalmente, la plataforma incorpora un chatbot educativo orientado a temas de seguridad digital, una biblioteca de recursos con guías y casos reales persistidos en base de datos, y un módulo de reporte de incidentes. Estas funciones permiten que el usuario no solo consuma contenido formativo, sino que también interactúe con recursos de acompañamiento y prevención.

---

## 3. Sección 3.3 Requerimientos Funcionales

### Texto sugerido

Los requerimientos funcionales del sistema comprenden la gestión de cuentas de usuario, el acceso a contenidos educativos estructurados por cursos y módulos, la aplicación de evaluaciones diagnósticas y acreditables, el seguimiento del progreso, la generación de recomendaciones de repaso, la interacción con un chatbot temático y la consulta de recursos complementarios como guías parentales y casos reales.

Asimismo, el sistema permite el envío de reportes por parte de los usuarios cuando desean documentar un caso relacionado con riesgos digitales, lo cual amplía el alcance de la plataforma más allá del aprendizaje teórico.

---

## 4. Sección 3.6.3 Modelo de protección de datos personales

### Texto sugerido

La plataforma fue diseñada para ser utilizada por madres, padres y tutores, por lo que el tratamiento principal de datos personales recae en información del adulto responsable. Los datos que el sistema puede almacenar incluyen nombre, correo electrónico, contraseña protegida mediante hash, progreso académico, resultados de evaluaciones, acreditaciones, conversaciones del chatbot y reportes enviados por el usuario.

El sistema no está orientado a que niñas, niños o adolescentes registren cuentas propias ni a recolectar de forma sistemática datos personales de menores. No obstante, dado que algunos reportes o conversaciones podrían incluir información contextual sobre situaciones de riesgo digital, se establece como principio de uso evitar la inclusión innecesaria de datos sensibles o identificables de menores.

La protección de datos se apoya en autenticación de usuarios, control de acceso a rutas protegidas, almacenamiento seguro de credenciales, uso de servicios de infraestructura en la nube y tratamiento responsable de la información conforme al marco normativo citado en este documento, particularmente en materia de protección de datos personales.

---

## 5. Sección 4.2.2 Diagrama de Componentes y Despliegue del Sistema

### Texto sugerido

La solución se despliega bajo una arquitectura desacoplada de cliente y servidor. El frontend fue construido como una Single Page Application con React y Vite, y se publica en Netlify. El backend fue desarrollado con Node.js y Express, y se despliega en Render como servicio web. La persistencia se administra en MongoDB Atlas.

El sistema también integra servicios externos específicos: Resend para el envío de correos transaccionales de verificación y recuperación de cuenta, Google Gemini para el asistente conversacional educativo y YouTube para la integración de contenido audiovisual cuando aplica. La resolución y administración del dominio se apoya en Cloudflare. Esta arquitectura favorece escalabilidad, mantenimiento modular y separación clara entre interfaz, lógica de negocio y persistencia.

---

## 6. Sección 4.8.4 Catálogo de colecciones

### Ajuste sugerido

Agregar una fila nueva a la tabla de colecciones:

`Resource | Almacena recursos de apoyo publicados por la plataforma, incluyendo guías parentales y casos reales, con campos de clasificación, contenido, etiquetas, audiencias y orden de visualización.`

---

## 7. Sección 4.8.5 Esquemas por colección (JSON Schema-like)

### Texto sugerido

### Colección: Resource

**Propósito:**  
Almacenar recursos educativos complementarios al contenido principal de cursos y módulos, tales como guías parentales, ejemplos reales y materiales de consulta.

**Campos principales:**  
- `type`: tipo de recurso, por ejemplo `guide` o `case`  
- `title`: título del recurso  
- `slug`: identificador legible para consulta por URL  
- `description`: resumen breve  
- `content` o `fullContent`: cuerpo del recurso  
- `category`: categoría temática  
- `tags`: palabras clave  
- `audience`: público objetivo  
- `isPublished`: indicador de publicación  
- `order`: orden de despliegue en la interfaz  

**Relación lógica:**  
Esta colección no depende de un curso específico, pero forma parte del ecosistema educativo de la plataforma y se consulta desde la interfaz mediante endpoints de recursos.

---

## 8. Sección 4.9.4 Estrategia de ejecución

### Texto sugerido

La estrategia de ejecución de pruebas se basa en validaciones funcionales por flujo crítico del sistema: registro, verificación de cuenta, recuperación de acceso, autenticación, carga de cursos, navegación por módulos, realización de examen diagnóstico, presentación de quizzes, visualización de resultados, consulta del chatbot y acceso a recursos de apoyo.

También se realizaron pruebas sobre integraciones externas, incluyendo correo transaccional, persistencia en MongoDB Atlas e interacción con el chatbot. A nivel técnico, se llevaron a cabo ajustes de robustez mediante refactorización de rutas críticas como progreso y quizzes, con el objetivo de reducir acoplamiento y facilitar mantenimiento.

---

## 9. Sección 4.10 Métricas de Evaluación e Impacto del Sistema

### Texto sugerido

Las métricas de evaluación del sistema deben interpretarse como indicadores de seguimiento del proyecto y no exclusivamente como resultados estadísticos cerrados. Se consideran tres grupos: métricas técnicas, métricas funcionales y métricas de impacto educativo.

En métricas técnicas se consideran disponibilidad del sistema, integridad de despliegue, respuesta de servicios principales y estabilidad de autenticación, progreso, quizzes y chatbot. En métricas funcionales se contemplan finalización de módulos, uso del diagnóstico, consultas al chatbot, consumo de recursos y generación de acreditaciones. En métricas de impacto educativo se proponen indicadores como mejora en comprensión de riesgos digitales, percepción de utilidad del contenido y fortalecimiento del acompañamiento parental.

---

## 10. Sección 4.11.3 Ejemplos de pantallas (wireframes)

### Orden recomendado para actualizar capturas y wireframes

1. Pantalla de registro  
2. Pantalla de inicio de sesión  
3. Pantalla de verificación de cuenta  
4. Pantalla de recuperación de acceso  
5. Pantalla de inicio  
6. Pantalla de detalle de curso  
7. Pantalla de lección  
8. Pantalla de examen diagnóstico  
9. Pantalla de quiz por módulo  
10. Pantalla de resultados personalizados  
11. Panel de progreso y acreditaciones  
12. Interfaz del chatbot educativo  
13. Pantalla de casos reales y recursos  
14. Pantalla de política de privacidad  
15. Pantalla de términos del servicio  

---

## 11. Sección 5.8.1 Categorización de costos

### Texto sugerido

En la operación del sistema se contemplan servicios gratuitos o de bajo costo para despliegue, persistencia, correo y dominio. El frontend puede desplegarse en Netlify, el backend en Render y la base de datos en MongoDB Atlas. Para correo transaccional se utiliza un proveedor externo orientado a entornos web, y para dominio y DNS se contempla la administración mediante Cloudflare.

La estructura de costos operativos puede variar según el nivel de uso y escalamiento, pero en su fase académica el sistema se apoya principalmente en planes gratuitos o de entrada, lo que mantiene su viabilidad económica.

---

## 12. Sección 5.9.3 Costos Operativos

### Texto sugerido

Los costos operativos del proyecto se concentran en la infraestructura de despliegue, la base de datos, el servicio de correo transaccional, la administración del dominio y el mantenimiento técnico. Debido a que la solución fue concebida dentro de un contexto académico, gran parte del ciclo de desarrollo y pruebas se apoyó en planes gratuitos o de bajo costo.

Este enfoque permitió mantener la viabilidad del proyecto sin comprometer la funcionalidad principal de la plataforma, al mismo tiempo que dejó abierta la posibilidad de escalamiento futuro en caso de mayor demanda o adopción institucional.

---

## 13. Sección recomendada para Política y Privacidad dentro del documento

Si el reporte ya incluye una parte sobre protección de datos personales, conviene alinear la redacción con estas ideas:

- la plataforma está dirigida a adultos responsables, no a menores como usuarios principales;  
- se almacenan datos de cuenta, progreso, resultados, conversaciones del chatbot y reportes;  
- se recomienda evitar compartir datos sensibles de menores;  
- se utilizan servicios externos para correo, IA y recursos audiovisuales;  
- no se promete seguridad absoluta, sino medidas razonables de protección y control de acceso.

---

## 14. Nota final de consistencia

No hace falta agregar al reporte funcionalidades que la app no implementa actualmente, como favoritos, biblioteca personalizada o un panel administrativo visual.  
Conviene que el documento describa con precisión el sistema real, ya que eso lo vuelve más defendible técnica y académicamente.
