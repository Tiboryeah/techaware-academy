module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

        // --- MODULE 2. Roblox: seguridad y control parental — 30 min ---
        const mod2 = await getOrCreateModule(courseGames._id, {
            title: 'Módulo 2: Roblox: seguridad y control parental',
            description: 'Configuración técnica y supervisión remota de alta precisión.',
            duration: '28 min'
        });
        await Quiz.deleteMany({ refId: mod2._id, scope: 'module' });

        const l2_1 = await getOrCreateLesson(mod2._id, courseGames._id, {
            title: 'Artículo 1: Vincular cuenta del padre/tutor y cuenta del menor',
            content: `# Vinculación de Cuentas en Roblox: El Primer Paso para la Supervisión

> **Perspectiva Estratégica**: En Roblox, supervisar no significa simplemente conocer la contraseña o usar la cuenta del menor. El modelo oficial se basa en poseer una cuenta adulta propia y enlazarla para administrar la experiencia de forma remota y segura desde otro dispositivo.

## ¿Qué significa “vincular” una cuenta en Roblox?

A diferencia de un control de acceso tradicional, la supervisión parental en esta plataforma no requiere que el adulto inicie sesión directamente en la cuenta del menor. Roblox indica que el tutor debe contar con su propia cuenta con privilegios parentales. Una vez realizado el enlace, es posible administrar todos los controles parentales desde el propio dispositivo del adulto (vía Roblox.com o la app móvil), facilitando un monitoreo constante sin interrumpir la actividad del usuario.

---

## ¿Qué es una cuenta con privilegios parentales?

Roblox define la cuenta con privilegios parentales como un perfil de adulto que permite aprobar acciones específicas del menor y administrar configuraciones críticas de seguridad. Para activar estas funciones, la plataforma solicita:

1. **Fecha de nacimiento del adulto**: Confirmando que la persona tiene 18 años o más.
2. **Verificación de identidad**: Mediante una identificación oficial o una tarjeta de crédito válida.
3. **Rol de tutor**: En la mayoría de las regiones, estos privilegios se habilitan para responsables de menores de 13 años que completen la verificación correspondiente.

---

> **Definición Clave**: Cuenta parental en Roblox: Perfil del adulto con privilegios verificados que permite la aprobación de acciones y la administración centralizada de los controles de seguridad del menor vinculado.

## ¿Por qué el adulto necesita su propia cuenta?

Roblox promueve el uso de cuentas separadas por tres motivos técnicos fundamentales:

*   **Autonomía de Supervisión**: Permite controlar la experiencia infantil desde el dispositivo personal del adulto, sin necesidad de usar la cuenta del hijo directamente.
*   **Seguridad de la Información**: Evita compartir credenciales. Cualquiera con acceso directo a una cuenta parental podría modificar ajustes sensibles; por ello, Roblox recomienda mantener perfiles aislados.
*   **Colaboración Familiar**: La plataforma permite que múltiples adultos enlacen su propia cuenta con la misma cuenta infantil, eliminando la necesidad de compartir una sola contraseña entre tutores.

---

## ¿Cómo se enlaza la cuenta del adulto con la del menor?

Existen dos rutas principales para establecer este vínculo técnico:

**Ruta A: Solicitud por Correo Electrónico**
El adulto recibe una notificación solicitando permiso para revisar o aprobar cambios. Al aceptar, puede crear una cuenta nueva o usar una existente (siempre que el correo coincida). Tras verificar la edad, el enlace se activa automáticamente.

**Ruta B: Desde la Cuenta del Menor**
Dentro de la aplicación del menor, se accede a *Settings > Parental Controls* y se selecciona la opción *Add parent*. Esto inicia el proceso de verificación del adulto y, tras la autorización mutua, el panel parental queda habilitado para el tutor.

---

## Paso a paso simplificado

1. **Creación de Perfil**: El adulto debe contar con una cuenta propia de Roblox.
2. **Verificación de Edades**: Realizar el proceso de validación mediante identificación oficial o tarjeta de crédito.
3. **Aceptación del Vínculo**: Confirmar el enlace desde el correo electrónico o la configuración parental de la cuenta infantil.
4. **Administración Activa**: Una vez vinculadas, el adulto ya puede modificar controles de tiempo, contenido, gasto y privacidad de forma remota.

---

> **Beneficios Técnicos de la Vinculación**:
> * Administrar controles de seguridad desde su propio dispositivo personal.
> * Acceso a métricas de tiempo diario de uso y conexiones en tiempo real.
> * Preparar y blindar el acceso a contenido, privacidad y límites de gasto automáticos.

---

## Errores comunes que conviene evitar

*   **Dependencia de la Contraseña**: Pensar que conocer la clave del menor es suficiente. El modelo de Roblox exige una cuenta parental enlazada para una gestión completa.
*   **Omitir la Verificación de Identidad**: Este es un paso obligatorio para obtener los privilegios de administración. Sin él, el panel parental no estará activo.
*   **Compartir la Cuenta Parental**: Roblox advierte que compartir el acceso del adulto puede comprometer la integridad de las configuraciones de seguridad del menor.

---

> **Síntesis del Módulo**: La vinculación de cuentas no es un detalle técnico opcional; es el punto de partida para una supervisión real. Sin este enlace, el adulto no puede gestionar los controles de seguridad que la plataforma pone a disposición de las familias. Antes de revisar chat o compras, asegúrese de que el vínculo sea correcto.

## Checklist Final para Familias

*   Tengo una cuenta propia de Roblox independiente.
*   He completado la verificación de mi edad ante la plataforma.
*   He aceptado o iniciado el vínculo con la cuenta del menor correctamente.
*   Tengo acceso visible al panel de "Parental Controls" desde mi dispositivo.
*   Estoy listo para configurar las restricciones avanzadas de seguridad.

---

## Microactividad de Refuerzo
Actualice mentalmente el estado de su cuenta: ¿Ya cuenta con el perfil parental verificado y vinculado? Si falta alguno de estos pasos, es recomendable completarlos antes de proceder a la configuración de chat y límites de gasto mensual.`,
            type: 'article',
            duration: 12,
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
            videoUrl: 'https://www.youtube.com/watch?v=placeholder3',
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

Para establecer una cultura de seguridad efectiva, se recomienda seguir un orden lógico de configuración: primero el contenido, luego la comunicación y, finalmente, la gestión de tiempo y gasto. Roblox organiza estos controles dentro de un panel parental centralizado que permite ajustar la madurez de las experiencias, filtrar el chat, limitar el acceso a servidores privados y fijar topes mensuales de consumo.

---

## 1. Madurez de contenido: El filtro de experiencias

Roblox utiliza un sistema de etiquetas de contenido para que los tutores determinen el nivel de madurez adecuado para el menor. Desde el panel parental, es posible ajustar un selector de madurez que bloquea automáticamente cualquier experiencia que supere el rango permitido.

*   **Niveles de Madurez**: Las categorías oficiales incluyen niveles como *Minimal* (violencia leve ocasional), *Mild* (violencia leve repetida), *Moderate* (violencia moderada o sangre ligera) y *Restricted* (contenido intenso para cuentas verificadas).
*   **Comportamiento de Búsqueda**: Las experiencias restringidas pueden aparecer en resultados de búsqueda, pero la cuenta infantil no podrá ingresar a ellas, lo que previene el acceso accidental pero puede generar dudas en el usuario si no conoce el límite.
*   **Bloqueo Individual**: Es posible bloquear experiencias específicas de forma manual, incluso si su clasificación oficial es baja, si el tutor considera que la temática no es apropiada para su familia.

---

## 2. Privacidad y chat: Ejes de comunicación segura

La interacción social es el núcleo de Roblox, por lo que la gestión del chat es una de las tareas más críticas del tutor. La plataforma emplea un sistema de chat filtrado que bloquea automáticamente contenido inapropiado y el intercambio de datos personales.

> **Reglas de Consentimiento**:
> * Menores de 5 a 9 años: Requieren consentimiento parental explícito para activar el *Experience Chat*.
> * Menores de 13 años: Requieren consentimiento parental para habilitar el *Direct Chat* (mensajes directos).
> * Verificación de Edad: Actualmente, no es posible habilitar ciertas funciones de chat avanzado sin completar previamente la comprobación de identidad del adulto.

---

## 3. Privacidad extendida: Parties, servidores privados y conexiones

La seguridad se extiende más allá del chat textual. El panel parental permite configurar el acceso a grupos (*Parties*) y servidores privados (*Private Servers*), limitando estas invitaciones únicamente a "Conexiones" (amigos mutuos) o desactivándolas por completo.

Asimismo, la sección de conexiones permite al tutor revisar la lista de usuarios vinculados a la cuenta del menor. Desde este panel, es posible bloquear a cualquier usuario; una vez bloqueado, esa persona no podrá chatear con el menor ni volver a intentar una conexión sin autorización parental.

---

## 4. Tiempo en pantalla: Gestión de hábitos digitales

El control de tiempo en Roblox va más allá de un simple límite horario; proporciona contexto sobre el uso:

*   **Límites Diarios**: Al alcanzar el tope fijado, la plataforma cierra la sesión y muestra un aviso informativo.
*   **Métricas de Uso**: El panel parental muestra un promedio de uso de los últimos 7 días y un listado de las 20 experiencias más utilizadas de la semana.
*   **Perspectiva Pedagógica**: Estas métricas permiten a la familia distinguir entre un uso saludable y patrones de juego excesivos o repetitivos.

---

## 5. Gestión del gasto: Prevención de transacciones imprevistas

Roblox permite fijar un límite mensual de gasto que se reinicia al finalizar el mes calendario. Este tope cubre la compra de moneda virtual (Robux) y suscripciones dentro de las experiencias.

> **Consideraciones Importantes sobre el Gasto**:
> * **Tarjetas de Regalo**: El límite mensual no suele afectar el canje de tarjetas de regalo físicas.
> * **Dispositivos de Consola**: En algunos dispositivos, el límite de Roblox puede no ser efectivo al 100%, por lo que se recomienda configurar restricciones de pago también en la tienda de la consola (Xbox, PlayStation).

---

## Jerarquía de Revisión Recomendada

1. **Madurez de Contenido**: Definir qué puede jugar.
2. **Chat y Comunicación**: Definir con quién puede hablar.
3. **Privacidad Extendida**: Controlar quién puede unirse a sus sesiones.
4. **Tiempo en Pantalla**: Establecer rutinas predecibles.
5. **Límite Mensual de Gasto**: Prevenir compras impulsivas.

---

> **Síntesis del Módulo**: La seguridad en Roblox no es un "candado" único, sino una combinación de capas de protección. Al entender esta lógica, la familia deja de ver los controles parentales como una restricción y empieza a verlos como una herramienta de acompañamiento precisa.

## Checklist de Configuración Avanzada

*   He ajustado el nivel de madurez de contenido (Minimal/Mild/Moderate).
*   He configurado las restricciones de Experience Chat y Direct Chat.
*   He revisado la lista de conexiones actuales del menor.
*   He establecido un límite diario de tiempo razonable.
*   He fijado un tope de gasto mensual y activado las notificaciones de compra.

---

## Microactividad de Refuerzo
Identifique el ajuste que considera más prioritario para su situación familiar hoy: ¿Es la comunicación con desconocidos o el control del tiempo de juego? Comience por ajustar esa capa técnica antes de pasar a las demás.`,
            type: 'article',
            duration: 12,
            platforms: ['Roblox'],
            riskAreas: ['Privacidad Avanzada', 'Gasto Controlado'],
            teaches: ['madurez de contenido', 'experience chat', 'direct chat', 'party', 'private servers', 'conexiones', 'tiempo de pantalla', 'límite mensual de gasto', 'bloquear', 'reportar']
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
            videoUrl: 'https://www.youtube.com/watch?v=placeholder4',
            duration: 2,
            platforms: ['Roblox'],
            riskAreas: ['Privacidad Avanzada', 'Gasto Controlado'],
            teaches: ['bloquear', 'reportar', 'conexiones', 'experience chat', 'direct chat']
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
                        { key: 'Tiempo de pantalla', value: 'Permite limitar cuánto tiempo diario usa Roblox' },
                        { key: 'Límite mensual de gasto', value: 'Define cuánto puede gastar el menor en un mes' },
                        { key: 'Conexiones', value: 'Permite revisar o actuar sobre personas vinculadas a la cuenta del menor' }
                    ],
                    correctAnswer: {
                        'Madurez de contenido': 'Ayuda a decidir qué experiencias puede abrir',
                        'Chat de experiencia': 'Controla parte de la comunicación dentro de experiencias',
                        'Tiempo de pantalla': 'Permite limitar cuánto tiempo diario usa Roblox',
                        'Límite mensual de gasto': 'Define cuánto puede gastar el menor en un mes',
                        'Conexiones': 'Permite revisar o actuar sobre personas vinculadas a la cuenta del menor'
                    }
                },
                explanation: 'Tip: La madurez filtra contenidos, el chat la comunicación, el tiempo el uso diario, el gasto la billetera y las conexiones los vínculos.',
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
                    { text: 'Tiempo en pantalla', isCorrect: true },
                    { text: 'Límite mensual de gasto', isCorrect: true },
                    { text: 'Servidores privados o Party', isCorrect: true },
                    { text: 'Conexiones del menor', isCorrect: true },
                    { text: 'Color del avatar', isCorrect: false },
                    { text: 'Marca del dispositivo', isCorrect: false }
                ],
                explanation: 'Tip: Los 6 pilares de seguridad en Roblox son: Contenido, Chat, Tiempo, Gasto, Privacidad de servidor y Amigos.',
                points: 15,
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
                        'Revisar promedio semanal de uso',
                        'Bloquear un usuario',
                        'Ajustar madurez de contenido',
                        'Reportar una experiencia',
                        'Ver conexiones del menor',
                        'Limitar Party o servidores privados',
                        'Fijar screen time diario'
                    ],
                    categories: ['Prevención', 'Supervisión', 'Respuesta'],
                    correctAnswer: {
                        'Prevención': [
                            'Poner límite mensual de gasto',
                            'Ajustar madurez de contenido',
                            'Limitar Party o servidores privados',
                            'Fijar screen time diario'
                        ],
                        'Supervisión': [
                            'Revisar promedio semanal de uso',
                            'Ver conexiones del menor'
                        ],
                        'Respuesta': [
                            'Bloquear un usuario',
                            'Reportar una experiencia'
                        ]
                    }
                },
                explanation: 'Tip: Prevención es antes de jugar. Supervisión es durante el proceso. Respuesta es tras un incidente.',
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

