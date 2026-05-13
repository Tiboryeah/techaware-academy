module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

        // --- MODULE 2. Roblox: seguridad y control parental — 30 min ---
        const mod2 = await getOrCreateModule(courseGames._id, {
            title: 'Módulo 2: Roblox: seguridad y control parental',
            description: 'Configuración técnica y supervisión remota de alta precisión.',
            duration: '18 min'
        });
        await Quiz.deleteMany({ refId: mod2._id, scope: 'module' });

        const l2_1 = await getOrCreateLesson(mod2._id, courseGames._id, {
            title: 'Artículo 1: Vincular cuenta del padre/tutor y cuenta del menor',
            content: `# Vinculación de Cuentas en Roblox: El Primer Paso para la Supervisión

> **Perspectiva Estratégica**: En Roblox, supervisar no significa simplemente conocer la contraseña o usar la cuenta del menor. El modelo oficial se basa en poseer una cuenta adulta propia y enlazarla para administrar la experiencia de forma remota y segura desde otro dispositivo.

## ¿Qué significa “vincular” una cuenta en Roblox?

A diferencia de un control de acceso tradicional, la supervisión parental en esta plataforma no requiere que el adulto inicie sesión directamente en la cuenta del menor. El tutor usa su propia cuenta con privilegios parentales y, una vez realizado el enlace, puede administrar controles desde su dispositivo, vía Roblox.com o la app móvil, sin interrumpir la actividad del menor.

---

## ¿Qué es una cuenta con privilegios parentales?

La cuenta con privilegios parentales funciona como un perfil de adulto que permite aprobar acciones específicas del menor y administrar configuraciones críticas de seguridad. Para entender qué aporta este vínculo, conviene separar requisito, función y riesgo:

![Requisitos y beneficios de una cuenta con privilegios parentales en Roblox: cuenta propia del adulto, fecha de nacimiento, verificación de identidad y vínculo con la cuenta infantil.](/article-images/videojuegos/M2A1.png)

---

## Mini glosario para padres

**Cuenta parental**: cuenta del adulto que sirve para administrar controles y permisos de la cuenta del menor.

**Privilegios parentales**: permisos especiales que Roblox da al adulto verificado para aprobar acciones y cambiar configuraciones de seguridad.

**Verificación de identidad**: proceso para comprobar que el adulto realmente es mayor de edad y puede administrar la cuenta del menor.

**Add parent**: opción de Roblox para agregar o vincular al padre, madre o tutor a la cuenta infantil.

**Parental Controls**: sección donde se configuran límites, permisos, privacidad, tiempo y gasto.

## ¿Por qué el adulto necesita su propia cuenta?

La cuenta propia del adulto evita depender de la contraseña del menor y permite administrar controles desde un perfil separado. Esto ayuda a mantener la supervisión organizada, especialmente cuando más de un tutor participa en el acompañamiento.

---

## ¿Cómo se enlaza la cuenta del adulto con la del menor?

Existen dos rutas principales para establecer este vínculo técnico:

| Ruta de vinculación | Dónde inicia | Qué confirma | Cuándo conviene usarla |
| --- | --- | --- | --- |
| **Correo electrónico** | Desde la invitación o solicitud que recibe el adulto. | Que el adulto acepta administrar la cuenta y completa verificación. | Cuando Roblox envía una solicitud de aprobación al tutor. |
| **Add parent** | Desde Settings > Parental Controls en la cuenta del menor. | Que la cuenta infantil queda conectada al adulto verificado. | Cuando la familia está configurando la supervisión desde cero. |

---

## Paso a paso simplificado

| Paso | Qué debe ocurrir |
| --- | --- |
| **Crear perfil adulto** | El tutor usa una cuenta propia de Roblox, no la contraseña del menor. |
| **Verificar edad** | Completa el proceso de validación que habilita privilegios parentales. |
| **Aceptar el vínculo** | Confirma el enlace desde correo o desde Parental Controls. |
| **Administrar activamente** | Ajusta controles de tiempo, contenido, gasto y privacidad desde su dispositivo. |

---

![Beneficios técnicos de la vinculación: administrar controles desde el dispositivo del adulto, acceder a métricas de uso y conexiones, y preparar acceso a contenido, privacidad y límites de gasto.](/article-images/videojuegos/M2A1.1.png)

---

## Errores comunes que conviene evitar

*   **Dependencia de la Contraseña**: Pensar que conocer la clave del menor es suficiente. El modelo de Roblox exige una cuenta parental enlazada para una gestión completa.
*   **Omitir la Verificación de Identidad**: Este es un paso obligatorio para obtener los privilegios de administración. Sin él, el panel parental no estará activo.
*   **Compartir la Cuenta Parental**: compartir el acceso del adulto puede comprometer la integridad de las configuraciones de seguridad del menor.

---

> **Síntesis del Módulo**: La vinculación de cuentas no es un detalle técnico opcional; es el punto de partida para una supervisión real. Sin este enlace, el adulto no puede gestionar los controles de seguridad que la plataforma pone a disposición de las familias. Antes de revisar chat o compras, asegúrese de que el vínculo sea correcto.

## Checklist Final para Familias

La familia puede avanzar si ya tiene cuenta adulta independiente, verificación completada, vínculo aceptado con la cuenta del menor y acceso visible al panel de **Parental Controls**.

---

## Microactividad de Refuerzo
Actualice mentalmente el estado de su cuenta: ¿Ya cuenta con el perfil parental verificado y vinculado? Si falta alguno de estos pasos, es recomendable completarlos antes de proceder a la configuración de chat y límites de gasto mensual.`,
            type: 'article',
            duration: 5,
            platforms: ['Roblox'],
            riskAreas: ['Seguridad de Cuenta'],
            teaches: ['cuenta adulta enlazada', 'cuenta parental', 'privilegios parentales', 'verificación de identidad', 'verificación de edad', 'add parent', 'parental controls']
        });

        const l2_2 = await getOrCreateLesson(mod2._id, courseGames._id, {
            title: 'Video 1: Configuración paso a paso de controles parentales en Roblox',
            content: `# Configuración paso a paso de controles parentales en Roblox

Este video acompaña la activación de la cuenta adulta enlazada y muestra dónde tocar para dejar configuradas las capas básicas de seguridad en Roblox.

## Qué conviene observar
* Cómo se conecta la cuenta del adulto con la del menor.
* En qué parte del panel se ajustan edad, chat, tiempo y gasto.
* Qué errores comunes conviene evitar al configurar el entorno.`,
            type: 'video',
            videoUrl: 'https://www.youtube.com/watch?v=1qKy5EBKfRI',
            duration: 2,
            platforms: ['Roblox'],
            riskAreas: ['Seguridad de Cuenta'],
            teaches: ['cuenta adulta enlazada', 'parental controls', 'verificación de edad', 'tiempo de pantalla', 'límite mensual de gasto']
        });

        const l2_3 = await getOrCreateLesson(mod2._id, courseGames._id, {
            title: 'Artículo 2: Privacidad, chat, madurez de contenido, tiempo y gasto',
            content: `# Gestión Avanzada de Privacidad, Contenido y Consumo en Roblox

> **Perspectiva Estratégica**: Supervisar en Roblox no es una acción binaria de "permitir" o "bloquear". El éxito de la seguridad parental reside en la combinación precisa de capas: qué contenido se consume, con quién se habla, cuánto tiempo se dedica y qué recursos económicos se utilizan.

## ¿Qué conviene configurar primero?

Para establecer una cultura de seguridad efectiva, conviene seguir un orden lógico de configuración: primero el contenido, luego la comunicación y, finalmente, la gestión de tiempo y gasto. El panel parental centraliza controles para ajustar la madurez de las experiencias, filtrar el chat, limitar el acceso a servidores privados y fijar topes mensuales de consumo.

![Mini glosario para padres sobre controles de Roblox: madurez de contenido, Experience Chat, Direct Chat, Parties, Private Servers y conexiones.](/article-images/videojuegos/M2A2.png)

---

## 1. Madurez de contenido: El filtro de experiencias

Roblox utiliza un sistema de etiquetas de contenido para que los tutores determinen el nivel de madurez adecuado para el menor. Desde el panel parental, es posible ajustar un selector de madurez que bloquea automáticamente cualquier experiencia que supere el rango permitido.

*   **Niveles de Madurez**: Las categorías oficiales incluyen niveles como *Minimal* (violencia leve ocasional), *Mild* (violencia leve repetida), *Moderate* (violencia moderada o sangre ligera) y *Restricted* (contenido intenso para cuentas verificadas).
*   **Comportamiento de Búsqueda**: Las experiencias restringidas pueden aparecer en resultados de búsqueda, pero la cuenta infantil no podrá ingresar a ellas, lo que previene el acceso accidental pero puede generar dudas en el usuario si no conoce el límite.
*   **Bloqueo Individual**: Es posible bloquear experiencias específicas de forma manual, incluso si su clasificación oficial es baja, si el tutor considera que la temática no es apropiada para su familia.

| Capa de control | Qué permite ajustar | Qué debería revisar la familia |
| --- | --- | --- |
| **Madurez de contenido** | Nivel de experiencias disponibles para la cuenta infantil. | Si el nivel elegido coincide con edad, sensibilidad y reglas familiares. |
| **Experiencias bloqueadas** | Bloqueo manual de experiencias concretas. | Si algún juego específico resulta problemático aunque tenga etiqueta baja. |
| **Comunicación** | Experience Chat, Direct Chat, Party Chat y Voice Chat cuando esté disponible. | Si el menor necesita verificación de edad, consentimiento parental o restricciones adicionales. |
| **Servidores privados y Parties** | Invitaciones, sesiones privadas y reuniones de juego. | Si solo pueden participar conexiones conocidas o si está desactivado. |
| **Tiempo y gasto** | Límites diarios, métricas de uso y tope mensual. | Si el uso y las compras se mantienen dentro de acuerdos familiares. |

---

## 2. Privacidad y chat: Ejes de comunicación segura

La interacción social es el núcleo de Roblox, por lo que la gestión del chat es una de las tareas más críticas del tutor. La plataforma emplea un sistema de chat filtrado que bloquea automáticamente contenido inapropiado y el intercambio de datos personales.

![Reglas de consentimiento en Roblox: menores de 5 a 9 años requieren consentimiento parental para Experience Chat, menores de 13 años para Direct Chat y algunas funciones avanzadas requieren verificación de edad.](/article-images/videojuegos/M2A2.1.png)

---

## 3. Chat de voz en Roblox: qué cambia para una familia

El chat de voz agrega una capa distinta a la supervisión porque la comunicación ya no queda solo en texto. En experiencias compatibles, los usuarios elegibles pueden conectarse a voz desde el icono de audífonos o desde los ajustes dentro de la experiencia. No todas las experiencias tienen voz y la función puede variar por región, edad y configuración de la cuenta.

Roblox exige verificación de edad para acceder a funciones de comunicación como **Experience Chat**, **Voice Chat** y **Party Chat**. Para usar Voice Chat, el usuario debe ser elegible, tener al menos 13 años y completar la verificación de edad correspondiente. Además, el chat de voz no está activado por defecto.

| Elemento | Qué significa para la familia | Qué revisar |
| --- | --- | --- |
| **Age check** | La cuenta debe completar verificación de edad para habilitar funciones de comunicación. | Que la edad registrada sea correcta y que el adulto entienda qué función se habilita. |
| **Voice Chat** | Permite hablar por micrófono dentro de experiencias compatibles. | Si está activado, en qué experiencias se usa y con quién puede hablar. |
| **Icono de audífonos** | Permite conectarse o desconectarse de la voz dentro de la experiencia. | Que el menor sepa desconectarse si algo incomoda. |
| **Silenciar usuarios** | En experiencias con voz, se puede silenciar a otras personas. | Enseñar a mutear, bloquear y reportar sin entrar en discusión. |
| **Moderación de voz** | La voz puede procesarse para seguridad y moderación. | Explicar que lo hablado también debe seguir reglas de respeto y seguridad. |

La voz puede hacer que una interacción se sienta más cercana, rápida e intensa que el chat escrito. Por eso, una familia debe tratarla como una función de comunicación avanzada, no como un simple accesorio del juego.

> **Regla práctica**: Si el menor todavía no puede explicar qué haría ante insultos, presión, preguntas personales o una conversación incómoda, conviene mantener la voz desactivada o muy supervisada.

---

## 4. Privacidad extendida: Parties, servidores privados y conexiones

La seguridad se extiende más allá del chat textual. El panel parental permite configurar el acceso a grupos (*Parties*) y servidores privados (*Private Servers*), limitando estas invitaciones únicamente a "Conexiones" (amigos mutuos) o desactivándolas por completo.

Asimismo, la sección de conexiones permite al tutor revisar la lista de usuarios vinculados a la cuenta del menor. Desde este panel, es posible bloquear a cualquier usuario; una vez bloqueado, esa persona no podrá chatear con el menor ni volver a intentar una conexión sin autorización parental.

---

## 5. Tiempo en pantalla: Gestión de hábitos digitales

El control de tiempo en Roblox va más allá de un simple límite horario; proporciona contexto sobre el uso:

*   **Límites Diarios**: Al alcanzar el tope fijado, la plataforma cierra la sesión y muestra un aviso informativo.
*   **Métricas de Uso**: El panel parental muestra un promedio de uso de los últimos 7 días y un listado de las 20 experiencias más utilizadas de la semana.
*   **Perspectiva Pedagógica**: Estas métricas permiten a la familia distinguir entre un uso saludable y patrones de juego excesivos o repetitivos.

---

## 6. Gestión del gasto: Prevención de transacciones imprevistas

Roblox permite fijar un límite mensual de gasto que se reinicia al finalizar el mes calendario. Este tope cubre la compra de moneda virtual (Robux) y suscripciones dentro de las experiencias.

> **Consideraciones Importantes sobre el Gasto**:
> * **Tarjetas de Regalo**: El límite mensual no suele afectar el canje de tarjetas de regalo físicas.
> * **Dispositivos de Consola**: En algunos dispositivos, el límite de Roblox puede no ser suficiente por sí solo, así que conviene configurar restricciones de pago también en la tienda de la consola (Xbox, PlayStation).

---

## Jerarquía de Revisión Recomendada

| Prioridad | Configuración | Motivo |
| --- | --- | --- |
| **1** | Madurez de contenido. | Evita que el menor entre a experiencias fuera del rango familiar permitido. |
| **2** | Chat, voz y comunicación. | Reduce contacto no deseado, presión de desconocidos y conversaciones difíciles de supervisar. |
| **3** | Parties, servidores privados y conexiones. | Limita invitaciones y sesiones a personas conocidas o aprobadas. |
| **4** | Tiempo de pantalla. | Ayuda a observar hábitos y evitar desplazamiento de sueño, escuela o convivencia. |
| **5** | Gasto mensual. | Previene compras impulsivas con Robux o suscripciones dentro de experiencias. |

---

> **Síntesis del Módulo**: La seguridad en Roblox no es un "candado" único, sino una combinación de capas de protección. Al entender esta lógica, la familia deja de ver los controles parentales como una restricción y empieza a verlos como una herramienta de acompañamiento precisa.

## Checklist de Configuración Avanzada

*   He ajustado el nivel de madurez de contenido (Minimal/Mild/Moderate).
*   He configurado las restricciones de Experience Chat, Direct Chat, Party Chat y Voice Chat si aplica.
*   He revisado la lista de conexiones actuales del menor.
*   He establecido un límite diario de tiempo razonable.
*   He fijado un tope de gasto mensual y activado las notificaciones de compra.

---

## Microactividad de Refuerzo
Identifique el ajuste que considera más prioritario para su situación familiar hoy: ¿Es la comunicación con desconocidos o el control del tiempo de juego? Comience por ajustar esa capa técnica antes de pasar a las demás.`,
            type: 'article',
            duration: 9,
            platforms: ['Roblox'],
            riskAreas: ['Privacidad Avanzada', 'Gasto Controlado'],
            teaches: ['madurez de contenido', 'experience chat', 'direct chat', 'party chat', 'voice chat', 'chat de voz', 'private servers', 'conexiones', 'tiempo de pantalla', 'límite mensual de gasto', 'bloquear', 'reportar']
        });

        const l2_4 = await getOrCreateLesson(mod2._id, courseGames._id, {
            title: 'Video 2: Cómo bloquear y reportar jugadores o experiencias',
            content: `# Cómo bloquear y reportar jugadores o experiencias

Este video muestra la respuesta práctica que una familia puede aplicar cuando aparece una experiencia inapropiada, una conexión problemática o una conducta que debe denunciarse.

## Qué conviene observar
* Dónde se bloquea una cuenta o experiencia.
* Cómo se documenta el problema antes de reportarlo.
* En qué casos bloquear y reportar deben hacerse de inmediato.`,
            type: 'video',
            videoUrl: 'https://www.youtube.com/watch?v=gNJ6TZO7N8U',
            duration: 2,
            platforms: ['Roblox'],
            riskAreas: ['Privacidad Avanzada', 'Gasto Controlado'],
            teaches: ['bloquear', 'reportar', 'conexiones', 'experience chat', 'direct chat', 'voice chat', 'chat de voz']
        });

        mod2.lessonOrder = [l2_1._id, l2_2._id, l2_3._id, l2_4._id];
        await mod2.save();

        const q2 = await getOrCreateQuiz({
            title: 'Examen del Módulo 2: Roblox: seguridad y control parental',
            description: 'Configuración técnica y supervisión remota de alta precisión.',
            scope: 'module',
            refId: mod2._id,
            scopeModel: 'Module',
            minPassing: 80
        }, [
            {
                text: 'Instrucción: Arrastra cada función al ajuste de Roblox que corresponde.',
                type: 'drag_drop',
                metadata: {
                    pairs: [
                        { key: 'Madurez de contenido', value: 'Ayuda a decidir qué experiencias puede abrir' },
                        { key: 'Chat de experiencia', value: 'Controla parte de la comunicación dentro de experiencias' },
                        { key: 'Chat de voz', value: 'Permite hablar por micrófono en experiencias compatibles si la cuenta es elegible' },
                        { key: 'Tiempo de pantalla', value: 'Permite limitar cuánto tiempo diario usa Roblox' },
                        { key: 'Límite mensual de gasto', value: 'Define cuánto puede gastar el menor en un mes' },
                        { key: 'Conexiones', value: 'Permite revisar o actuar sobre personas vinculadas a la cuenta del menor' }
                    ],
                    correctAnswer: {
                        'Madurez de contenido': 'Ayuda a decidir qué experiencias puede abrir',
                        'Chat de experiencia': 'Controla parte de la comunicación dentro de experiencias',
                        'Chat de voz': 'Permite hablar por micrófono en experiencias compatibles si la cuenta es elegible',
                        'Tiempo de pantalla': 'Permite limitar cuánto tiempo diario usa Roblox',
                        'Límite mensual de gasto': 'Define cuánto puede gastar el menor en un mes',
                        'Conexiones': 'Permite revisar o actuar sobre personas vinculadas a la cuenta del menor'
                    }
                },
                explanation: 'Tip: La madurez filtra contenidos; el chat y la voz controlan comunicación; el tiempo limita uso diario; el gasto cuida la billetera; las conexiones muestran vínculos.',
                points: 15,
                platform: 'Roblox'
            },
            {
                text: 'Completa las frases con la palabra correcta.',
                type: 'fill_blanks',
                metadata: {
                    sentence: 'Para administrar controles parentales, la cuenta del adulto debe estar [blank1] con la del menor. Roblox pide verificar la [blank2] del adulto para activar privilegios parentales. La madurez de [blank3] ayuda a definir qué experiencias puede abrir el menor. El límite mensual de [blank4] ayuda a prevenir compras impulsivas. Si un usuario o experiencia viola reglas, la acción correcta es [blank5].',
                    bank: ['enlazada', 'edad', 'contenido', 'gasto', 'reportar'],
                    correctAnswer: {
                        blank1: 'enlazada',
                        blank2: 'edad',
                        blank3: 'contenido',
                        blank4: 'gasto',
                        blank5: 'reportar'
                    }
                },
                explanation: 'Tip: Sin cuenta enlazada y edad verificada no hay control real. Reportar es la herramienta oficial ante abusos.',
                points: 10,
                platform: 'Roblox'
            },
            {
                text: 'Instrucción: Relaciona cada ajuste con el problema principal que ayuda a reducir.',
                type: 'match_columns',
                metadata: {
                    left: ['Madurez de contenido', 'Chat directo / experiencia', 'Servidores privados / Party', 'Tiempo de pantalla', 'Límite mensual de gasto', 'Bloquear / Reportar'],
                    right: [
                        'Exposición a experiencias no adecuadas',
                        'Comunicación no supervisada',
                        'Invitaciones o interacción no deseada en espacios más cerrados',
                        'Uso excesivo diario',
                        'Compras frecuentes o acumuladas',
                        'Conducta abusiva o incumplimiento de reglas'
                    ],
                    correctAnswer: {
                        'Madurez de contenido': 'Exposición a experiencias no adecuadas',
                        'Chat directo / experiencia': 'Comunicación no supervisada',
                        'Servidores privados / Party': 'Invitaciones o interacción no deseada en espacios más cerrados',
                        'Tiempo de pantalla': 'Uso excesivo diario',
                        'Límite mensual de gasto': 'Compras frecuentes o acumuladas',
                        'Bloquear / Reportar': 'Conducta abusiva o incumplimiento de reglas'
                    }
                },
                explanation: 'Tip: Cada ajuste en Roblox tiene un "por qué": desde la seguridad social hasta la económica y de salud.',
                points: 15,
                platform: 'Roblox'
            },
            {
                text: 'Ordena los pasos para preparar correctamente la supervisión parental en Roblox.',
                type: 'order_sequence',
                metadata: {
                    items: [
                        'Crear o usar una cuenta propia del adulto',
                        'Verificar la edad del adulto',
                        'Enlazar la cuenta del adulto con la del menor',
                        'Ajustar contenido, chat, tiempo y gasto',
                        'Revisar conexiones o reportes si aparece un problema'
                    ],
                    correctAnswer: [
                        'Crear o usar una cuenta propia del adulto',
                        'Verificar la edad del adulto',
                        'Enlazar la cuenta del adulto con la del menor',
                        'Ajustar contenido, chat, tiempo y gasto',
                        'Revisar conexiones o reportes si aparece un problema'
                    ]
                },
                explanation: 'Tip: Primero estableces tu identidad como tutor, luego el vínculo técnico y finalmente los límites operativos.',
                points: 10,
                platform: 'Roblox'
            },
            {
                text: 'Selecciona todas las opciones que un padre o tutor debería revisar al configurar Roblox.',
                type: 'multiple_selection',
                options: [
                    { text: 'Madurez de contenido', isCorrect: true },
                    { text: 'Experience chat o comunicación', isCorrect: true },
                    { text: 'Voice Chat si la cuenta es elegible y la experiencia lo permite', isCorrect: true },
                    { text: 'Límite mensual de gasto', isCorrect: true },
                    { text: 'Color del avatar del menor', isCorrect: false },
                    { text: 'Marca del dispositivo donde se juega', isCorrect: false },
                    { text: 'Nombre del primer juego que abrió el menor', isCorrect: false }
                ],
                explanation: 'Tip: Lo más crítico al configurar Roblox es revisar contenido, comunicación por texto o voz y límite de gasto. El avatar, el dispositivo y el historial no son controles de seguridad.',
                points: 15,
                platform: 'Roblox'
            },
            {
                text: 'Caso: Un menor de 13 años pide activar Voice Chat en Roblox porque sus amigos dicen que así es más divertido. ¿Cuál respuesta se alinea mejor con el módulo?',
                type: 'case_study',
                options: [
                    { text: 'Activarlo de inmediato porque el chat de voz es más seguro que el texto.', isCorrect: false },
                    { text: 'Revisar edad, elegibilidad, controles de comunicación y madurez del menor antes de permitir una función de voz.', isCorrect: true },
                    { text: 'Permitirlo solo si promete no hablar con desconocidos, sin revisar configuración.', isCorrect: false },
                    { text: 'Ignorar el tema porque la voz no forma parte de los controles parentales.', isCorrect: false }
                ],
                explanation: 'Voice Chat es una función de comunicación avanzada. Requiere elegibilidad, verificación de edad y una revisión familiar de riesgos, controles y madurez.',
                points: 10,
                platform: 'Roblox'
            },
            {
                text: 'Completa correctamente cada idea aplicada.',
                type: 'drop_down',
                metadata: {
                    sentence: 'Si el menor puede ver una experiencia, pero no abrirla por restricción, eso suele depender del control de [blank1]. Si el adulto quiere limitar compras del mes, debe usar [blank2]. Si aparece un usuario acosando o molestando, una acción válida es [blank3]. Si el menor alcanzó el uso permitido del día, el control implicado es [blank4].',
                    options: {
                        blank1: ['madurez de contenido', 'screen time', 'connections'],
                        blank2: ['monthly spending limit', 'experience chat', 'parental pin'],
                        blank3: ['bloquear o reportar', 'cambiar avatar', 'reiniciar router'],
                        blank4: ['screen time', 'monthly spending limit', 'party settings']
                    },
                    correctAnswer: {
                        blank1: 'madurez de contenido',
                        blank2: 'monthly spending limit',
                        blank3: 'bloquear o reportar',
                        blank4: 'screen time'
                    }
                },
                explanation: 'Tip: La visibilidad vs acceso depende de la madurez. El gasto del Monthly limit. La agresión del reporte. El uso del Screen time.',
                points: 10,
                platform: 'Roblox'
            },
            {
                text: 'Instrucción: Arrastra cada acción a la categoría correcta.',
                type: 'categorize',
                metadata: {
                    items: [
                        'Poner límite mensual de gasto',
                        'Ajustar madurez de contenido',
                        'Fijar screen time diario',
                        'Revisar promedio semanal de uso',
                        'Ver conexiones del menor',
                        'Revisar listado de experiencias más usadas',
                        'Bloquear un usuario',
                        'Reportar una experiencia',
                        'Ajustar privacidad de Party tras un incidente'
                    ],
                    categories: ['Prevención', 'Supervisión', 'Respuesta'],
                    correctAnswer: {
                        'Prevención': [
                            'Poner límite mensual de gasto',
                            'Ajustar madurez de contenido',
                            'Fijar screen time diario'
                        ],
                        'Supervisión': [
                            'Revisar promedio semanal de uso',
                            'Ver conexiones del menor',
                            'Revisar listado de experiencias más usadas'
                        ],
                        'Respuesta': [
                            'Bloquear un usuario',
                            'Reportar una experiencia',
                            'Ajustar privacidad de Party tras un incidente'
                        ]
                    }
                },
                explanation: 'Tip: Prevención es configurar antes. Supervisión es revisar durante. Respuesta es actuar tras un problema.',
                points: 10,
                platform: 'Roblox'
            },
            {
                text: 'Caso: Un padre ya vinculó su cuenta con la de su hija. Nota que ella pasa muchas horas en Roblox, recibe invitaciones de otros usuarios y ha intentado comprar cosas varias veces en el mismo mes. ¿Cuál es la mejor respuesta integradora?',
                type: 'case_study',
                options: [
                    { text: 'Activar screen time, revisar Party o servidores privados, revisar conexiones y fijar un límite mensual de gasto para un control equilibrado.', isCorrect: true },
                    { text: 'Asegurar que el avatar tenga una apariencia más infantil para reducir el riesgo de contacto con usuarios malintencionados en el ecosistema.', isCorrect: false },
                    { text: 'Proceder a la eliminación inmediata de la cuenta del menor para evitar cualquier riesgo futuro sin realizar configuraciones previas.', isCorrect: false },
                    { text: 'Mantener un monitoreo pasivo y esperar a que ocurra un incidente real de seguridad antes de activar los controles de tiempo o gasto.', isCorrect: false }
                ],
                explanation: 'Tip: La opción ganadora combina tiempo, privacidad social y gasto sin recurrir a la prohibición total inmediata.',
                points: 15,
                platform: 'Roblox'
            }
        ]);
        mod2.quizId = q2._id;
        await mod2.save();

};

