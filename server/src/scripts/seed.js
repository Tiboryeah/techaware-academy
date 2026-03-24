const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

dotenv.config();

const importData = async () => {
    try {
        await connectDB();
        console.log('Synchronizing Data (Clean State)...');

        // --- 1. SAFE USER SYNC ---
        let adminUser = await User.findOne({ email: 'admin@example.com' });
        if (!adminUser) {
            adminUser = await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                passHash: '123456',
                role: 'Admin',
                isVerified: true
            });
            console.log('(+) Admin User Created');
        }

        // --- HELPER FUNCTIONS ---
        const getOrCreateCourse = async (data) => {
            let course = await Course.findOne({ title: data.title });
            if (!course) {
                course = await Course.create(data);
                console.log(`(+) Course Created: ${data.title}`);
            } else {
                Object.assign(course, data);
                await course.save();
                console.log(`(.) Course Updated: ${data.title}`);
            }
            return course;
        };

        const getOrCreateModule = async (courseId, data) => {
            let module = await Module.findOne({ title: data.title, courseId });
            if (!module) {
                module = await Module.create({ ...data, courseId });
                console.log(`  (+) Module Created: ${data.title}`);
            } else {
                Object.assign(module, data);
                await module.save();
                console.log(`  (.) Module Synced: ${data.title}`);
            }
            return module;
        };

        const getOrCreateLesson = async (moduleId, courseId, data) => {
            let lesson = await Lesson.findOne({ title: data.title, moduleId });
            if (!lesson) {
                lesson = await Lesson.create({ ...data, moduleId, courseId });
                console.log(`    (+) Lesson Created: ${data.title}`);
            } else {
                Object.assign(lesson, data);
                await lesson.save();
            }
            return lesson;
        };

        const getOrCreateQuiz = async (data, questionsData) => {
            let quiz = await Quiz.findOne({ title: data.title, refId: data.refId });
            if (!quiz) {
                quiz = await Quiz.create(data);
                console.log(`    (+) Quiz Created: ${data.title}`);
            } else {
                Object.assign(quiz, data);
                await quiz.save();
            }

            // Always refresh questions to ensure content is latest
            await Question.deleteMany({ quizId: quiz._id });
            quiz.questions = [];
            for (const qData of questionsData) {
                const q = await Question.create({
                    quizId: quiz._id,
                    text: qData.text,
                    type: qData.type || 'single_choice',
                    options: qData.options,
                    platform: qData.platform,
                    metadata: qData.metadata || {},
                    riskArea: qData.riskArea,
                    explanation: qData.explanation
                });
                quiz.questions.push(q._id);
            }
            await quiz.save();
            return quiz;
        };

        // --- COURSE 1: VIDEOJUEGOS ---
        const courseGames = await getOrCreateCourse({
            title: 'Videojuegos en Línea: Roblox y Minecraft',
            description: 'Dominio total de la seguridad, economía y bienestar digital en los mundos virtuales de tus hijos.',
            category: 'Videojuegos',
            platforms: ['Roblox', 'Minecraft'],
            riskAreas: ['Seguridad de Cuenta', 'Privacidad Avanzada', 'Gasto Controlado', 'Salud Mental y Física'],
            status: 'published',
            duration: '3 horas'
        });

        // WIPE OLD MODULES AND QUIZZES FOR THIS COURSE TO ENSURE CLEAN REPLACEMENT
        await Module.deleteMany({ courseId: courseGames._id });
        await Quiz.deleteMany({ refId: courseGames._id, scope: 'course' });
        console.log('  (-) Old modules and Course Quiz for Course 1 wiped for clean expansion.');

        // --- MODULE 1. Fundamentos de videojuegos en línea — 30 min ---
        const mod1 = await getOrCreateModule(courseGames._id, {
            title: 'Módulo 1: Fundamentos de videojuegos en línea',
            description: 'Entendiendo el panorama general de los mundos digitales.',
            duration: '30 min'
        });
        await Quiz.deleteMany({ refId: mod1._id, scope: 'module' });

        const l1_1 = await getOrCreateLesson(mod1._id, courseGames._id, {
            title: 'Artículo 1: ¿Qué son los videojuegos en línea y cómo funcionan?',
            content: `# ¿Qué son los videojuegos en línea?

> **Nota fundamental:** Un videojuego en línea no es únicamente una actividad lúdica; es un ecosistema que integra comunicación, gestión de identidad, transacciones económicas y protocolos de seguridad.

Los videojuegos en línea son plataformas digitales que requieren una conexión activa a internet para facilitar la interacción entre usuarios en tiempo real. A diferencia de las experiencias desconectadas (offline), estas plataformas se caracterizan por su naturaleza social y su constante evolución mediante actualizaciones y contenido generado por la comunidad.

La organización **UNICEF** destaca que estos entornos pueden ser catalizadores de habilidades críticas como la resiliencia digital y el pensamiento creativo, siempre que exista un marco de supervisión adecuado por parte de los tutores.

## Diversidad en el ecosistema digital

Es común que se agrupen todos los títulos bajo una misma etiqueta, pero existen matices según el tipo de interacción. Por ejemplo, entre los servicios más utilizados hoy en día encontramos:

*   **Plataformas de creación (Ejemplo: Roblox)**: Más que un juego único, funciona como un motor donde coexisten millones de experiencias distintas desarrolladas por otros usuarios. Su fuerte es la socialización y la economía interna.
*   **Mundos de construcción y supervivencia (Ejemplo: Minecraft)**: Fomenta la resolución de problemas en entornos tridimensionales. Puede utilizarse tanto en solitario como en servidores compartidos con otros jugadores.

## Componentes técnicos esenciales

Para comprender el funcionamiento de estas plataformas, es necesario distinguir cinco pilares básicos:

1. **Dispositivo de ejecución**: El hardware (consola, ordenador o móvil) donde se procesa la información visual del juego.
2. **Identidad digital (Cuenta)**: Es la representación del usuario. Permite gestionar el progreso, las listas de contactos y los niveles de restricción.
3. **Infraestructura de red (Internet)**: El canal que permite el flujo de datos entre el jugador y el resto del mundo.
4. **Arquitectura de Servidor**: El sistema centralizado que sincroniza las acciones de todos los participantes para que ocurran simultáneamente.
5. **Protocolos de moderación**: Herramientas integradas para filtrar contenido, bloquear comunicaciones no deseadas y reportar incidentes.

## El rol del acompañamiento familiar

Entender esta estructura permite a los padres transformar la percepción de los videojuegos de una "caja negra" a un entorno gestionable. La **ESRB** (Entertainment Software Rating Board) recomienda prestar especial atención a las etiquetas de "Interacción de Usuarios" y "Compras integradas" como indicadores primarios de riesgo.

---

## Evaluación de seguridad previa

Antes de autorizar el acceso a una nueva plataforma, se recomienda validar los siguientes puntos:

1. Grado de interacción social (¿Permite comunicación abierta o restringida?).
2. Naturaleza del sistema de comunicación (¿Texto, voz o ambos?).
3. Requisitos de registro y protección de datos personales.
4. Presencia de sistemas de monetización o microtransacciones.
5. Disponibilidad y robustez de los controles parentales.

> **Perspectiva Estratégica**: El objetivo de este análisis no es fomentar la restricción por temor, sino proporcionar el contexto técnico necesario para un acompañamiento informado. La seguridad digital comienza con la comprensión de la tecnología que utilizan nuestros hijos.

---

> **Actividad de Reflexión**: Analice la plataforma que utiliza su hijo actualmente. ¿Identifica con claridad cómo se gestiona la comunicación con otros usuarios y si existen mecanismos de gasto real?`,
            type: 'article', duration: 5
        });

        const l1_2 = await getOrCreateLesson(mod1._id, courseGames._id, {
            title: 'Video 1: Recorrido visual: qué es Roblox y qué es Minecraft',
            content: 'Observa las diferencias visuales y mecánicas entre estas dos plataformas masivas.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder1', duration: 6
        });

        const l1_3 = await getOrCreateLesson(mod1._id, courseGames._id, {
            title: 'Artículo 2: Diferencias clave entre Roblox y Minecraft para una familia',
            content: `# Roblox vs Minecraft: Diferencias clave para una familia

> **Perspectiva Inicial**: Roblox y Minecraft no pertenecen a la misma categoría técnica. Mientras uno funciona como una red de experiencias sociales, el otro es un entorno creativo cuya seguridad depende de la edición y la configuración de la cuenta familiar.

A menudo se agrupan en las conversaciones cotidianas, pero su supervisión requiere estrategias radicalmente distintas. A continuación, desglosamos los cuatro ejes de diferenciación que todo tutor debe conocer.

---

## 1. Naturaleza del entorno: Plataforma vs Sandbox

**Roblox** se define oficialmente como una plataforma inmersiva de creación. Esto significa que la experiencia del menor cambia constantemente de un entorno a otro, ya que el contenido es generado por millones de usuarios. La supervisión aquí debe ser dinámica, revisando qué "experiencias" específicas está consumiendo el usuario.

**Minecraft**, por el contrario, es un juego "sandbox" (mundo abierto). Su estructura gira en torno a la construcción y la supervivencia en un mundo con reglas persistentes. Aquí, la seguridad depende más del modo de juego (Creativo o Supervivencia) y de si el menor juega solo o en red.

---

## 2. El factor de interacción social

La comunicación es el corazón del ecosistema de **Roblox**. La plataforma integra chat de texto y voz de forma predeterminada en la mayoría de sus experiencias. La gestión de la "madurez del contenido" y los filtros de chat son herramientas críticas que deben configurarse desde el primer día.

En **Minecraft**, la interacción es opcional. Un menor puede pasar cientos de horas jugando en solitario sin contacto externo. Sin embargo, si se habilita el multijugador o se accede a "Realms", la supervisión se traslada a los permisos de la cuenta Microsoft/Xbox, fuera del propio software del juego.

---

## 3. Gestión del control parental

> **Roblox**: Los controles están integrados directamente en el sitio web o la aplicación. Se enlazan las cuentas del adulto y el menor para gestionar límites de gasto, tiempo y privacidad de forma centralizada.
>
> **Minecraft**: Depende casi exclusivamente del "Grupo Familiar de Microsoft". La habilitación del multijugador o la posibilidad de añadir amigos se decide desde el panel de seguridad de Xbox, no dentro del menú del juego.

---

## 4. Economía y compras integradas

*   **Roblox**: Utiliza una moneda virtual única (Robux). Las compras suelen ser frecuentes y pequeñas, destinadas a funciones estéticas o ventajas dentro de experiencias específicas.
*   **Minecraft**: El modelo es más tradicional, centrado en el juego base. Las compras se concentran en el "Marketplace" (para la versión Bedrock) o suscripciones a servidores privados (Realms), facilitando una supervisión del gasto más predecible.

---

## Síntesis Pedagógica: ¿Qué revisar primero?

Para facilitar la toma de decisiones, se recomienda seguir esta jerarquía de supervisión según el caso:

1. **Si utiliza Roblox**: Validar primero la cuenta enlazada del adulto, los filtros de chat y el límite de gasto mensual.
2. **Si utiliza Minecraft**: Verificar la edición del juego (Java o Bedrock), los permisos de multijugador en la cuenta Microsoft y si el menor está accediendo a servidores públicos.

> **Conclusión**: No existe una plataforma "más segura" que otra, sino entornos que requieren un nivel de participación distinto por parte de la familia. Evitar el error de aplicar una misma configuración para ambos es el primer paso hacia una cultura digital responsable.

---

## Actividad de 1 minuto
Reflexione sobre el uso actual que sus hijos hacen de la tecnología: ¿Sus esfuerzos de supervisión se centran hoy en la cuenta familiar (Minecraft) o en el monitoreo constante de la interacción en vivo (Roblox)?`,
            type: 'article', duration: 5
        });

        const l1_4 = await getOrCreateLesson(mod1._id, courseGames._id, {
            title: 'Video 2: Qué debe revisar un padre antes de dejar jugar',
            content: 'Checklist visual de configuración inicial y señales de alerta.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder2', duration: 6
        });

        mod1.lessonOrder = [l1_1._id, l1_2._id, l1_3._id, l1_4._id];
        await mod1.save();

        const q1 = await getOrCreateQuiz({
            title: 'Examen del Módulo 1: Fundamentos de videojuegos en línea',
            description: 'Demuestra tu dominio sobre los conceptos básicos antes de avanzar.',
            scope: 'module',
            refId: mod1._id,
            scopeModel: 'Module',
            minPassing: 80
        }, [
            {
                text: 'Instrucción: Selecciona la definición correcta para cada concepto básico.',
                type: 'drag_drop',
                metadata: {
                    pairs: [
                        { key: 'Cuenta', value: 'Perfil que guarda progreso, permisos y configuraciones' },
                        { key: 'Servidor', value: 'Espacio o sistema que coordina la partida y conecta a los jugadores' },
                        { key: 'Chat', value: 'Función que permite comunicarse con otras personas dentro del juego' },
                        { key: 'Compra dentro del juego', value: 'Pago digital por moneda virtual, objetos o mejoras' },
                        { key: 'Multijugador', value: 'Función que permite jugar con otras personas' }
                    ],
                    correctAnswer: {
                        'Cuenta': 'Perfil que guarda progreso, permisos y configuraciones',
                        'Servidor': 'Espacio o sistema que coordina la partida y conecta a los jugadores',
                        'Chat': 'Función que permite comunicarse con otras personas dentro del juego',
                        'Compra dentro del juego': 'Pago digital por moneda virtual, objetos o mejoras',
                        'Multijugador': 'Función que permite jugar con otras personas'
                    }
                },
                explanation: 'Tip: La Cuenta es tu identidad digital, mientras que el Servidor es el anfitrión que une a todos los jugadores.',
                points: 12
            },
            {
                text: 'Completa las frases con la palabra correcta.',
                type: 'fill_blanks',
                metadata: {
                    sentence: 'Un videojuego en línea necesita conexión a [blank1] para permitir funciones conectadas. La [blank2] guarda progreso, amigos y configuraciones del jugador. El [blank3] ayuda a coordinar la partida y conectar a varios usuarios. Algunos juegos incluyen [blank4] dentro del juego. Cuando un juego permite interacción con personas que no conoces, pueden aparecer riesgos con [blank5].',
                    bank: ['internet', 'cuenta', 'servidor', 'compras', 'desconocidos'],
                    correctAnswer: {
                        blank1: 'internet',
                        blank2: 'cuenta',
                        blank3: 'servidor',
                        blank4: 'compras',
                        blank5: 'desconocidos'
                    }
                },
                explanation: 'Tip: Internet es el medio de transporte; la cuenta es quien viaja; el servidor el destino y los desconocidos el riesgo social.',
                points: 12
            },
            {
                text: 'Instrucción: Clasifica cada característica según la plataforma (Roblox o Minecraft) que mejor la describa.',
                type: 'match_columns',
                metadata: {
                    left: ['Roblox', 'Minecraft'],
                    right: [
                        'Plataforma con múltiples experiencias creadas dentro del ecosistema',
                        'Juego sandbox con modos como Creativo y Supervivencia',
                        'Puede cambiar mucho según la experiencia específica',
                        'Puede jugarse en solitario o en línea',
                        'Suele requerir revisar experiencia, interacción social y gasto',
                        'Suele requerir revisar edición, multijugador y tipo de mundo'
                    ],
                    correctAnswer: {
                        'Roblox': [
                            'Plataforma con múltiples experiencias creadas dentro del ecosistema',
                            'Puede cambiar mucho según la experiencia específica',
                            'Suele requerir revisar experiencia, interacción social y gasto'
                        ],
                        'Minecraft': [
                            'Juego sandbox con modos como Creativo y Supervivencia',
                            'Puede jugarse en solitario o en línea',
                            'Suele requerir revisar edición, multijugador y tipo de mundo'
                        ]
                    }
                },
                explanation: 'Tip: Recuerda: Roblox es un MOTOR con muchos juegos; Minecraft es un JUEGO con muchos modos.',
                points: 12
            },
            {
                text: 'Ordena de forma básica cómo funciona un videojuego en línea (inicio a fin).',
                type: 'order_sequence',
                metadata: {
                    items: [
                        'Enciendo mi dispositivo local (consola, PC o móvil).',
                        'Inicio sesión con mi cuenta personal de usuario.',
                        'Mi información viaja de forma segura por Internet.',
                        'El servidor central del juego recibe mis datos.',
                        'Mi personaje aparece junto a otros jugadores en línea.'
                    ],
                    correctAnswer: [
                        'Enciendo mi dispositivo local (consola, PC o móvil).',
                        'Inicio sesión con mi cuenta personal de usuario.',
                        'Mi información viaja de forma segura por Internet.',
                        'El servidor central del juego recibe mis datos.',
                        'Mi personaje aparece junto a otros jugadores en línea.'
                    ]
                },
                explanation: 'Tip: El caminito es: Dispositivo -> Identidad (Cuenta) -> Viaje (Internet) -> Destino (Servidor).',
                points: 8
            },
            {
                text: 'Selecciona todas las opciones que una familia debería revisar antes de permitir el uso de un videojuego en línea.',
                type: 'multiple_selection',
                options: [
                    { text: 'Si permite chat de texto o voz', isCorrect: true },
                    { text: 'Si tiene compras dentro del juego', isCorrect: true },
                    { text: 'Si necesita crear cuenta', isCorrect: true },
                    { text: 'Si se puede jugar con otras personas', isCorrect: true },
                    { text: 'Si tiene controles parentales', isCorrect: true },
                    { text: 'Si permite interacción con desconocidos', isCorrect: true },
                    { text: 'Si el color principal del juego le gusta al menor', isCorrect: false },
                    { text: 'Si el avatar se puede cambiar de ropa', isCorrect: false }
                ],
                explanation: 'Tip: Enfócate en la comunicación, el gasto y la privacidad. La estética no es un factor de seguridad.',
                points: 10
            },
            {
                text: 'Completa correctamente cada idea comparativa.',
                type: 'drop_down',
                metadata: {
                    sentence: 'Roblox se entiende mejor como una [blank1] con muchas experiencias. Minecraft es un juego [blank2]. En Roblox es clave revisar la [blank3] específica. En Minecraft es clave revisar el tipo de [blank4].',
                    options: {
                        blank1: ['plataforma', 'sandbox', 'consola'],
                        blank2: ['plataforma', 'sandbox', 'social'],
                        blank3: ['experiencia', 'versión', 'moneda'],
                        blank4: ['mundo', 'chat', 'gasto']
                    },
                    correctAnswer: {
                        blank1: 'plataforma',
                        blank2: 'sandbox',
                        blank3: 'experiencia',
                        blank4: 'mundo'
                    }
                },
                explanation: 'Tip: Minecraft es mundo libre (Sandbox) y Roblox es base de datos de juegos (Plataforma).',
                points: 10
            },
            {
                text: 'Instrucción: Asigna cada elemento a la categoría correcta (Roblox, Minecraft o Ambos).',
                type: 'categorize',
                metadata: {
                    items: ['Robux', 'Minecoins', 'Experiencias dentro de la plataforma', 'Modos Creativo y Supervivencia', 'Juego en línea', 'Riesgos por interacción social', 'Compras digitales', 'Puede jugarse con otras personas'],
                    categories: ['Roblox', 'Minecraft', 'Ambos'],
                    correctAnswer: {
                        'Roblox': ['Robux', 'Experiencias dentro de la plataforma'],
                        'Minecraft': ['Minecoins', 'Modos Creativo y Supervivencia'],
                        'Ambos': ['Juego en línea', 'Riesgos por interacción social', 'Compras digitales', 'Puede jugarse with otras personas']
                    }
                },
                explanation: 'Tip: Casi todos los riesgos sociales y económicos (compras, desconocidos) aplican a AMBOS.',
                points: 15
            },
            {
                text: 'Caso: Una madre cree que Roblox y Minecraft son iguales y solo quiere revisar el tiempo. ¿Qué le falta considerar?',
                type: 'case_study',
                options: [
                    { text: 'Auditar la presencia de chats, compras integradas, riesgos de interacción con desconocidos y las diferencias de diseño entre plataforma y juego.', isCorrect: true },
                    { text: 'Establecer controles de tiempo de pantalla de forma exclusiva para evitar el sedentarismo y asegurar que el menor no use excesivamente la aplicación.', isCorrect: false },
                    { text: 'Confirmar que los gráficos sean apropiados para su edad y que la clasificación en las tiendas de aplicaciones sea la correcta para menores.', isCorrect: false },
                    { text: 'Supervisar las sesiones de juego de forma ocasional y realizar preguntas generales al menor sobre sus experiencias dentro de cada título.', isCorrect: false }
                ],
                explanation: 'El tiempo es importante, pero no suficiente. También conviene revisar interacción social, compras, cuenta, controles parentales y diferencias entre plataformas.',
                points: 15
            }
        ]);
        mod1.quizId = q1._id;
        await mod1.save();

        // --- MODULE 2. Roblox: seguridad y control parental — 30 min ---
        const mod2 = await getOrCreateModule(courseGames._id, {
            title: 'Módulo 2: Roblox: seguridad y control parental',
            description: 'Configuración técnica y supervisión remota de alta precisión.',
            duration: '30 min'
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
            type: 'article', duration: 5
        });

        const l2_2 = await getOrCreateLesson(mod2._id, courseGames._id, {
            title: 'Video 1: Configuración paso a paso de controles parentales en Roblox',
            content: 'Guía visual para activar las restricciones de seguridad.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder3', duration: 6
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
            type: 'article', duration: 5
        });

        const l2_4 = await getOrCreateLesson(mod2._id, courseGames._id, {
            title: 'Video 2: Cómo bloquear y reportar jugadores o experiencias',
            content: 'Aprende a actuar ante comportamientos inapropiados.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder4', duration: 6
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

        // --- MODULE 3. Minecraft: cuentas familiares, multijugador y Realms — 30 min ---
        const mod3 = await getOrCreateModule(courseGames._id, {
            title: 'Módulo 3: Minecraft: cuentas familiares, multijugador y Realms',
            description: 'Navegando de forma segura en mundos compartidos y privados.',
            duration: '30 min'
        });
        await Quiz.deleteMany({ refId: mod3._id, scope: 'module' });

        const l3_1 = await getOrCreateLesson(mod3._id, courseGames._id, {
            title: 'Artículo 1: Java vs Bedrock, servidores, Realms y niveles de riesgo',
            content: `# Tipos de Minecraft\n\nNo todas las versiones de Minecraft son iguales. Los servidores públicos tienen riesgos distintos a los mundos privados.`,
            type: 'article', duration: 5
        });

        const l3_2 = await getOrCreateLesson(mod3._id, courseGames._id, {
            title: 'Video 1: Cómo configurar Microsoft Family Safety para Minecraft',
            content: 'Uso de la aplicación de seguridad de Microsoft.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder5', duration: 6
        });

        const l3_3 = await getOrCreateLesson(mod3._id, courseGames._id, {
            title: 'Artículo 2: Permisos de privacidad, amigos, chat y multijugador',
            content: `# Privacidad en Xbox\n\nMinecraft utiliza el sistema de Xbox para la gestión de amigos y chat.`,
            type: 'article', duration: 5
        });

        const l3_4 = await getOrCreateLesson(mod3._id, courseGames._id, {
            title: 'Video 2: Cómo revisar seguridad en Realms y juego en línea',
            content: 'Gestión de servidores privados y entornos seguros.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder6', duration: 6
        });

        mod3.lessonOrder = [l3_1._id, l3_2._id, l3_3._id, l3_4._id];
        await mod3.save();

        const q3 = await getOrCreateQuiz({
            title: 'Mini examen: Seguridad Minecraft',
            description: 'Valida tus conocimientos sobre la protección en Minecraft.',
            scope: 'module',
            refId: mod3._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Cuál es la forma más segura de jugar multijugador en Minecraft?', options: [{ text: 'En un Realm privado con amigos conocidos.', isCorrect: true }, { text: 'En un servidor público masivo.', isCorrect: false }, { text: 'Sin conexión.', isCorrect: false }] }
        ]);
        mod3.quizId = q3._id;
        await mod3.save();

        // --- MODULE 4. Interacción social y señales de alerta — 29–30 min ---
        const mod4 = await getOrCreateModule(courseGames._id, {
            title: 'Módulo 4: Interacción social y señales de alerta',
            description: 'Identificación de riesgos en la comunicación con otros.',
            duration: '30 min'
        });
        await Quiz.deleteMany({ refId: mod4._id, scope: 'module' });

        const l4_1 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Artículo 1: Ciberacoso, grooming y datos personales: señales básicas',
            content: `# Riesgos Sociales\n\nAprende a identificar las tácticas que usan los acosadores y cómo proteger los datos privados.`,
            type: 'article', duration: 5
        });

        const l4_2 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Video 1: Casos comunes de riesgo en chat y partidas',
            content: 'Ejemplos reales de interacciones problemáticas.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder7', duration: 5
        });

        const l4_3 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Artículo 2: Qué hacer si ya hubo una interacción de riesgo',
            content: `# Protocolo de Actuación\n\nPasos a seguir si tu hijo ha estado en contacto con un perfil sospechoso.`,
            type: 'article', duration: 5
        });

        const l4_4 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Video 2: Cómo conservar evidencia y cuándo reportar',
            content: 'Guía sobre capturas de pantalla y denuncias legales.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder8', duration: 6
        });

        mod4.lessonOrder = [l4_1._id, l4_2._id, l4_3._id, l4_4._id];
        await mod4.save();

        const q4 = await getOrCreateQuiz({
            title: 'Mini examen: Riesgos Sociales',
            description: 'Valida tu capacidad de respuesta ante riesgos sociales.',
            scope: 'module',
            refId: mod4._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Qué debes hacer si detectas una interacción de riesgo?', options: [{ text: 'Conservar evidencia (capturas) y reportar.', isCorrect: true }, { text: 'Borrar todo y no decir nada.', isCorrect: false }] }
        ]);
        mod4.quizId = q4._id;
        await mod4.save();

        // --- MODULE 5. Compras digitales, estafas y descargas — 30 min ---
        const mod5 = await getOrCreateModule(courseGames._id, {
            title: 'Módulo 5: Compras digitales, estafas y descargas',
            description: 'Gestión económica y prevención de malware.',
            duration: '30 min'
        });
        await Quiz.deleteMany({ refId: mod5._id, scope: 'module' });

        const l5_1 = await getOrCreateLesson(mod5._id, courseGames._id, {
            title: 'Artículo 1: Robux, Minecoins y microtransacciones: cómo funcionan',
            content: `# Economía del Juego\n\nEntiende el valor real de las monedas virtuales y cómo se compran.`,
            type: 'article', duration: 5
        });

        const l5_2 = await getOrCreateLesson(mod5._id, courseGames._id, {
            title: 'Video 1: Cómo detectar phishing, “Robux gratis” y enlaces falsos',
            content: 'Evita que roben la cuenta de tu hijo con promesas falsas.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder9', duration: 6
        });

        const l5_3 = await getOrCreateLesson(mod5._id, courseGames._id, {
            title: 'Artículo 2: Mods, add-ons y Marketplace: qué es oficial y qué no',
            content: `# Descargas Seguras\n\nDiferencia entre contenido verificado y archivos que pueden dañar tu dispositivo.`,
            type: 'article', duration: 5
        });

        const l5_4 = await getOrCreateLesson(mod5._id, courseGames._id, {
            title: 'Video 2: Checklist antes de comprar o descargar algo',
            content: 'Pasos de seguridad antes de cualquier transacción o instalación.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder10', duration: 6
        });

        mod5.lessonOrder = [l5_1._id, l5_2._id, l5_3._id, l5_4._id];
        await mod5.save();

        const q5 = await getOrCreateQuiz({
            title: 'Mini examen: Economía y Descargas',
            description: 'Protege tu bolsillo y tus dispositivos.',
            scope: 'module',
            refId: mod5._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Existen los generadores de Robux gratis?', options: [{ text: 'No, son estafas para robar datos o infectar equipos.', isCorrect: true }, { text: 'Sí, pero son difíciles de encontrar.', isCorrect: false }] }
        ]);
        mod5.quizId = q5._id;
        await mod5.save();

        // --- MODULE 6. Bienestar digital y acompañamiento parental — 30 min ---
        const mod6 = await getOrCreateModule(courseGames._id, {
            title: 'Módulo 6: Bienestar digital y acompañamiento parental',
            description: 'Salud mental y relación familiar en el juego.',
            duration: '30 min'
        });
        await Quiz.deleteMany({ refId: mod6._id, scope: 'module' });

        const l6_1 = await getOrCreateLesson(mod6._id, courseGames._id, {
            title: 'Artículo 1: Tiempo de juego, sueño, escuela y señales de uso problemático',
            content: `# Equilibrio Digital\n\nAprende a balancear el tiempo de juego con las responsabilidades diarias y el descanso.`,
            type: 'article', duration: 5
        });

        const l6_2 = await getOrCreateLesson(mod6._id, courseGames._id, {
            title: 'Video 1: Cómo poner reglas claras sin pelear con el menor',
            content: 'Estrategias de comunicación para límites saludables.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder11', duration: 6
        });

        const l6_3 = await getOrCreateLesson(mod6._id, courseGames._id, {
            title: 'Artículo 2: Cómo acompañar, conversar y jugar junto al hijo',
            content: `# Juego Compartido\n\nLa mejor seguridad es el acompañamiento. Involúcrate en sus mundos digitales.`,
            type: 'article', duration: 5
        });

        const l6_4 = await getOrCreateLesson(mod6._id, courseGames._id, {
            title: 'Video 2: Cómo crear un acuerdo familiar de juego',
            content: 'Crea un contrato de convivencia digital en familia.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder12', duration: 6
        });

        mod6.lessonOrder = [l6_1._id, l6_2._id, l6_3._id, l6_4._id];
        await mod6.save();

        const q6 = await getOrCreateQuiz({
            title: 'Mini examen: Bienestar',
            description: 'Fomenta un ambiente saludable en el hogar.',
            scope: 'module',
            refId: mod6._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Cuál es la mejor forma de proteger a un menor en línea?', options: [{ text: 'El acompañamiento y la comunicación constante.', isCorrect: true }, { text: 'Prohibirle jugar.', isCorrect: false }] }
        ]);
        mod6.quizId = q6._id;
        await mod6.save();

        // --- FINAL EXAM: COURSE 1 ---
        const finalQuizQuestions = [
            { text: 'Un jugador desconocido contacta a tu hijo por chat y le dice que ha ganado 5000 Robux, pero que para reclamarlos debe enviarle el archivo ".HAR" de su navegador o un enlace que le acaba de enviar. Esto es:', options: [{ text: 'Un ataque de "Session Hijacking" para robar la cuenta sin contraseña y evadir el 2FA.', isCorrect: true }, { text: 'Una promoción oficial de Roblox para usuarios frecuentes.', isCorrect: false }, { text: 'Un error del sistema que le permite ganar dinero gratis.', isCorrect: false }, { text: 'Un método seguro de transferencia de Robux.', isCorrect: false }] },
            { text: '¿Qué combinación de ajustes garantiza el entorno más seguro en Minecraft para un niño de 8 años?', options: [{ text: 'Uso exclusivo de Minecraft Realms con Whitelist activa y cuenta de Microsoft vinculada a Xbox Family App con chat restringido.', isCorrect: true }, { text: 'Jugar en servidores públicos verificados con el volumen del chat al 50%.', isCorrect: false }, { text: 'Usar la versión móvil del juego porque tiene menos virus.', isCorrect: false }, { text: 'Dejar que el niño cree su propio servidor en su PC personal.', isCorrect: false }] },
            { text: '¿Cuál es la diferencia crítica entre el "PIN de Cuenta" y la "Contraseña" en Roblox?', options: [{ text: 'La contraseña permite entrar al juego, pero el PIN es necesario para cambiar cualquier ajuste de privacidad o seguridad.', isCorrect: true }, { text: 'No hay diferencia, son el mismo número.', isCorrect: false }, { text: 'El PIN solo sirve para comprar Robux y la contraseña para todo lo demás.', isCorrect: false }, { text: 'El PIN se envía por correo cada vez que el niño juega.', isCorrect: false }] },
            { text: 'Has detectado que tu hijo ha gastado 200 euros en "skins" en un mes. Según la ley de protección al consumidor y las políticas de las tiendas, ¿por qué es difícil recuperar ese dinero?', options: [{ text: 'Porque gran parte del contenido digital se considera "consumido" inmediatamente tras la compra y las plataformas exigen PIN de compra para evitar devoluciones.', isCorrect: true }, { text: 'Porque el dinero virtual no es real ante la ley.', isCorrect: false }, { text: 'Porque los bancos prohíben cancelar pagos de videojuegos.', isCorrect: false }, { text: 'Porque el niño aceptó los términos y condiciones al nacer.', isCorrect: false }] },
            { text: '¿Qué síntoma físico indica que un niño necesita intervención inmediata en su ergonomía de juego?', options: [{ text: 'Dolor recurrente en las muñecas (túnel carpiano), hombros encorvados y parpadeo excesivo por fatiga visual.', isCorrect: true }, { text: 'Aprender a escribir más rápido en el teclado.', isCorrect: false }, { text: 'Tener las manos calientes después de jugar.', isCorrect: false }, { text: 'Querer una pantalla más pequeña.', isCorrect: false }] }
        ];
        const finalQuiz = await getOrCreateQuiz({
            title: 'Examen Final: Experto en Videojuegos (Curso 1)',
            description: 'Prueba final de certificación para padres expertos en seguridad de videojuegos.',
            scope: 'course',
            refId: courseGames._id,
            scopeModel: 'Course'
        }, finalQuizQuestions);
        courseGames.finalQuizId = finalQuiz._id;
        await courseGames.save();

        console.log('Course 1 Fully Expanded & Quizzes Refined!');


        // --- COURSE 2: REDES SOCIALES ---
        const courseSocial = await getOrCreateCourse({
            title: 'Redes Sociales: TikTok, Discord e Instagram',
            description: 'Guía profesional para proteger la privacidad y el bienestar emocional de los adolescentes en redes sociales.',
            category: 'Redes Sociales',
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Privacidad Avanzada', 'Algoritmos y Challenges', 'Predadores Online', 'Salud Mental'],
            status: 'published',
        });

        // WIPE OLD MODULES AND QUIZZES FOR COURSE 2
        await Module.deleteMany({ courseId: courseSocial._id });
        await Quiz.deleteMany({ refId: courseSocial._id, scope: 'course' });
        console.log('  (-) Old modules and Course Quiz for Course 2 wiped for clean expansion.');

        // --- MODULE 1: TikTok - Algoritmos y Control Familiar ---
        const modS1 = await getOrCreateModule(courseSocial._id, {
            title: 'TikTok: Algoritmos y Control Familiar',
            description: 'Dominando la Sincronización Familiar y el contenido del Feed.'
        });
        await Quiz.deleteMany({ refId: modS1._id, scope: 'module' });

        const ls1_1 = await getOrCreateLesson(modS1._id, courseSocial._id, {
            title: 'Sincronización Familiar (Family Pairing)',
            content: `# Control Total desde tu Dispositivo\n\nTikTok ha expandido "Family Pairing" para ofrecer más de 15 funciones de seguridad controladas por el padre.\n\n## Funciones Clave\n*   **Gestión de Tiempo**: Establece límites diarios y "periodos de descanso" (ej. de 10 PM a 7 AM).\n*   **Modo Restringido**: Filtra contenido que puede no ser apropiado, limitando lo que el algoritmo muestra en el feed "Para Ti".\n*   **Privacidad de Cuenta**: Puedes decidir si la cuenta de tu hijo es privada, quién puede comentar sus videos y quién puede enviarle mensajes directos.`,
            type: 'article', duration: 7
        });

        const ls1_2 = await getOrCreateLesson(modS1._id, courseSocial._id, {
            title: 'Entendiendo el Algoritmo y los "Challenges"',
            content: `# El Poder del Feed "Para Ti"\n\nEl algoritmo de TikTok es altamente adictivo y puede exponer a los jóvenes a retos (challenges) peligrosos.\n\n## Riesgos del Algoritmo\n*   **Cámaras de Eco**: Si un niño interactúa con contenido de dietas o tristeza, el algoritmo le mostrará cada vez más de lo mismo.\n*   **Retos Virales**: Educa a tu hijo sobre la diferencia entre un reto divertido y uno que pone en riesgo su integridad física.\n\n## Herramienta "Refrescar Feed"\nEnseña a tu hijo que si su feed se vuelve "tóxico", puede usar la opción "Refrescar" en los ajustes para reiniciar el algoritmo.`,
            type: 'article', duration: 8
        });

        const ls1_v = await getOrCreateLesson(modS1._id, courseSocial._id, {
            title: 'Video: Guía de TikTok para padres',
            content: 'Cómo activar el emparejamiento familiar paso a paso.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=dlt-JfyZqgE', duration: 4
        });

        modS1.lessonOrder = [ls1_1._id, ls1_2._id, ls1_v._id];
        await modS1.save();

        const qs1 = await getOrCreateQuiz({
            title: 'Examen Módulo 1: Seguridad TikTok',
            description: 'Demuestra que sabes configurar la sincronización familiar y gestionar el feed del algoritmo.',
            scope: 'module',
            refId: modS1._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Qué capacidad otorga el "Modo Restringido" de TikTok a un padre bajo la Sincronización Familiar?', options: [{ text: 'Oculta automáticamente videos que el sistema de IA ha marcado como no aptos para menores basándose en etiquetas y denuncias.', isCorrect: true }, { text: 'Permite leer los mensajes directos del hijo desde el móvil del padre.', isCorrect: false }, { text: 'Borra la cuenta del hijo si este sigue a más de 100 personas.', isCorrect: false }, { text: 'Convierte todos los videos en contenido educativo obligatoriamente.', isCorrect: false }] },
            { text: '¿Qué ocurre con la función de "Mensajes Directos" (DMs) para usuarios de entre 13 y 15 años?', options: [{ text: 'Están desactivados por defecto y solo el padre puede decidir si habilitarlos para "Amigos".', isCorrect: true }, { text: 'Funcionan igual que para un adulto.', isCorrect: false }, { text: 'Solo se pueden enviar emojis, no texto.', isCorrect: false }, { text: 'Se activan automáticamente tras 1 mes de uso de la cuenta.', isCorrect: false }] },
            { text: '¿Por qué es importante el ajuste de "Sugerir tu cuenta a otros"?', options: [{ text: 'Porque desactivarlo evita que el perfil del menor aparezca recomendado a extraños o amigos de amigos.', isCorrect: true }, { text: 'Porque ayuda a que el menor se convierta en influencer más rápido.', isCorrect: false }, { text: 'Porque permite ganar más visualizaciones en los videos.', isCorrect: false }, { text: 'No tiene impacto real en la privacidad.', isCorrect: false }] }
        ]);
        modS1.quizId = qs1._id;
        await modS1.save();

        // --- MODULE 2: Instagram - Privacidad y Cuentas de Adolescentes ---
        const modS2 = await getOrCreateModule(courseSocial._id, {
            title: 'Instagram: Privacidad y Presión Social',
            description: 'Gestionando las nuevas "Cuentas para Adolescentes" y la salud mental.'
        });
        await Quiz.deleteMany({ refId: modS2._id, scope: 'module' });

        const ls2_1 = await getOrCreateLesson(modS2._id, courseSocial._id, {
            title: 'Novedad: Instagram Teen Accounts',
            content: `# El nuevo estándar de protección (2024/25)\n\nInstagram ha lanzado las "Teen Accounts" que aplican protecciones automáticas para menores de 18 años.\n\n## Protecciones por defecto\n*   **Cuentas Privadas**: Los menores de 16 tienen cuenta privada por defecto. Solo pueden ser seguidos por personas que ellos aprueben.\n*   **Restricciones de Mensajería**: Solo pueden recibir mensajes de personas que ya siguen.\n*   **Modo Sueño**: Notificaciones silenciadas de 10 PM a 7 AM.\n\n**Nota**: Los menores de 16 necesitan permiso explicito del padre (vía supervisión) para relajar estos ajustes.`,
            type: 'article', duration: 7
        });

        const ls2_2 = await getOrCreateLesson(modS2._id, courseSocial._id, {
            title: 'Presión Social, Filtros y Salud Mental',
            content: `# El impacto de la imagen perfecta\n\nInstagram es la red social con mayor impacto en la autoestima debido al uso constante de filtros de belleza.\n\n## Qué vigilar como padre\n*   **Dismorfia del Selfie**: Niños que no se gustan a sí mismos sin filtros de IA.\n*   **Lista de "Mejores Amigos"**: Úsala para fomentar que tu hijo comparta contenido solo con su círculo íntimo y real.\n*   **Hidden Words**: Ayuda a tu hijo a configurar la lista de "Palabras Ocultas" para bloquear automáticamente comentarios con insultos o palabras que le hagan daño.`,
            type: 'article', duration: 8
        });

        const ls2_v = await getOrCreateLesson(modS2._id, courseSocial._id, {
            title: 'Video: Supervisión en Instagram',
            content: 'Guía oficial del Centro de Familia de Meta.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=q_-RjZ_7KD4', duration: 2
        });

        modS2.lessonOrder = [ls2_1._id, ls2_2._id, ls2_v._id];
        await modS2.save();

        const qs2 = await getOrCreateQuiz({
            title: 'Examen Módulo 2: Privacidad Instagram',
            description: 'Pon a prueba tu conocimiento sobre las nuevas Teen Accounts y filtros de palabras ocultas.',
            scope: 'module',
            refId: modS2._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Qué sucede si un menor de 16 años intenta cambiar su cuenta de Privada a Pública en las nuevas "Teen Accounts"?', options: [{ text: 'El sistema bloquea el cambio a menos que el padre apruebe la solicitud a través de la Supervisión.', isCorrect: true }, { text: 'La cuenta se borra automáticamente por seguridad.', isCorrect: false }, { text: 'El cambio se realiza pero Instagram deja de mostrar sus fotos.', isCorrect: false }, { text: 'No se puede intentar el cambio bajo ninguna circunstancia.', isCorrect: false }] },
            { text: '¿Cuál es la diferencia entre "Bloquear" y "Restringir" a un usuario en Instagram?', options: [{ text: 'Restringir permite que el usuario comente pero solo él puede ver su propio comentario, sin que el menor lo sepa.', isCorrect: true }, { text: 'Bloquear es temporal y Restringir es permanente.', isCorrect: false }, { text: 'Restringir permite ver las fotos del otro pero no darle a "Me gusta".', isCorrect: false }, { text: 'No existe la función de Restringir en cuentas de menores.', isCorrect: false }] },
            { text: '¿Qué función cumple el "Modo Sueño" (Sleep Mode) activo por defecto para adolescentes?', options: [{ text: 'Silencia todas las notificaciones y envía respuestas automáticas a los DMs de 10 PM a 7 AM.', isCorrect: true }, { text: 'Hace que la pantalla se ponga negra para que el niño no pueda usar el móvil.', isCorrect: false }, { text: 'Pone música relajante cuando el niño lleva 2 horas jugando.', isCorrect: false }, { text: 'Envía un reporte al padre de cuánto durmió el niño.', isCorrect: false }] }
        ]);
        modS2.quizId = qs2._id;
        await modS2.save();

        // --- MODULE 3: Discord - Servidores y Seguridad en el Chat ---
        const modS3 = await getOrCreateModule(courseSocial._id, {
            title: 'Discord: Servidores y Mensajería Segura',
            description: 'Configurando el "Family Center" y protegiendo los DMs.'
        });
        await Quiz.deleteMany({ refId: modS3._id, scope: 'module' });

        const ls3_1 = await getOrCreateLesson(modS3._id, courseSocial._id, {
            title: 'Centro de Familia de Discord',
            content: `# Transparencia sin Invasión\n\nDiscord permite a los padres ver la actividad de sus hijos sin leer sus mensajes privados, respetando su privacidad pero manteniendo el control.\n\n## Lo que puedes ver\n*   **Servidores Activos**: En qué comunidades participa tu hijo.\n*   **Contactos Recientes**: Con quién ha chateado en la última semana.\n*   **Reportes**: Recibirás una notificación si tu hijo reporta a alguien por mal comportamiento.`,
            type: 'article', duration: 6
        });

        const ls3_2 = await getOrCreateLesson(modS3._id, courseSocial._id, {
            title: 'Filtros de Contenido y Seguridad Técnica',
            content: `# "Mantenme Seguro" (Keep Me Safe)\n\nDiscord tiene un potente motor de IA para filtrar contenido visual en los mensajes directos.\n\n## Ajustes Recomendados\n1.  **Filtro de Imágenes Explícitas**: Activa "Mantenme Seguro" para que Discord escanee y bloquee imágenes inapropiadas en DMs.\n2.  **Privacidad de Servidor**: Desactiva la opción de "Recibir mensajes de miembros del servidor" para que solo sus amigos agregados puedan hablarle por privado.\n3.  **2FA (Doble Factor)**: Vital en Discord debido al alto robo de cuentas mediante enlaces de "regalo de Nitro" falsos.`,
            type: 'article', duration: 7
        });

        modS3.lessonOrder = [ls3_1._id, ls3_2._id];
        await modS3.save();

        const qs3 = await getOrCreateQuiz({
            title: 'Examen Módulo 3: Seguridad Discord',
            description: 'Demuestra que sabes proteger la cuenta con 2FA y configurar el Centro de Familia.',
            scope: 'module',
            refId: modS3._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Qué medida técnica es IRRENUNCIABLE en Discord para evitar el robo de la cuenta de tu hijo?', options: [{ text: 'Activar la Autenticación de Dos Factores (2FA).', isCorrect: true }, { text: 'No usar foto de perfil.', isCorrect: false }, { text: 'Cambiar el nombre de usuario cada semana.', isCorrect: false }, { text: 'Usar Discord solo en el navegador y no en la app.', isCorrect: false }] },
            { text: '¿Qué ocurre si permites "Mensajes Directos de miembros del servidor" en una cuenta adolescente?', options: [{ text: 'Cualquier persona en el mismo servidor puede enviarle mensajes privados, lo que aumenta el riesgo de groomers.', isCorrect: true }, { text: 'Solo los administradores del servidor pueden hablarle.', isCorrect: false }, { text: 'El niño recibe una moneda gratis por cada mensaje recibido.', isCorrect: false }, { text: 'Discord encripta esos mensajes para que nadie los lea.', isCorrect: false }] },
            { text: 'Has recibido un reporte en el Family Center de un "Nuevo Contacto" con el que tu hijo chateó. ¿Cuál es el límite del sistema de Discord aquí?', options: [{ text: 'Puedes ver el nombre y avatar del contacto, pero NO puedes leer el contenido de la conversación por privacidad profesional.', isCorrect: true }, { text: 'Puedes leer los últimos 5 mensajes de esa charla.', isCorrect: false }, { text: 'El sistema te permite borrar el contacto remotamente del móvil de tu hijo.', isCorrect: false }, { text: 'Ves la dirección IP del contacto con el que habló tu hijo.', isCorrect: false }] }
        ]);
        modS3.quizId = qs3._id;
        await modS3.save();

        // --- MODULE 4: Huella Digital y Peligros Graves ---
        const modS4 = await getOrCreateModule(courseSocial._id, {
            title: 'Huella Digital, Grooming y Acoso',
            description: 'Identificación de riesgos graves y prevención a largo plazo.'
        });
        await Quiz.deleteMany({ refId: modS4._id, scope: 'module' });

        const ls4_1 = await getOrCreateLesson(modS4._id, courseSocial._id, {
            title: 'La Huella Digital: Lo que subes se queda',
            content: `# Nada es temporal\n\nAunque redes como Snapchat o las "Stories" de Instagram parezcan temporales, nada en internet lo es.\n\n## Conceptos Clave\n*   **Capturas de Pantalla**: Cualquier persona puede guardar lo que tu hijo sube.\n*   **Impacto Futuro**: Explica a tu hijo que las universidades y empresas hoy revisan la huella digital. Un video inadecuado hoy puede cerrar puertas dentro de 10 años.`,
            type: 'article', duration: 6
        });

        const ls4_2 = await getOrCreateLesson(modS4._id, courseSocial._id, {
            title: 'Identificando el Grooming y Ciberbullying',
            content: `# Señales de Peligro\n\n## Grooming (Acoso sexual por adultos)\nUn adulto intentando ganarse la confianza del menor mediante regalos, atención excesiva o pidiendo fotos "en confianza".\n\n## Ciberbullying\nAcoso sistemático entre iguales. Enseña a tu hijo la **Regla de las 3 B**: **B**loquear al acosador, **B**ajar evidencias (capturas) y **B**uscar ayuda de un adulto inmediatamente.`,
            type: 'article', duration: 8
        });

        modS4.lessonOrder = [ls4_1._id, ls4_2._id];
        await modS4.save();

        const qs4 = await getOrCreateQuiz({
            title: 'Examen Módulo 4: Riesgos Graves',
            description: 'Pon a prueba tu instinto para detectar grooming y gestionar el ciberacoso de forma legal.',
            scope: 'module',
            refId: modS4._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Por qué se dice que el "Grooming" es un proceso y no un evento aislado?', options: [{ text: 'Porque el predador primero establece confianza y una relación emocional ficticia antes de pedir algo inadecuado.', isCorrect: true }, { text: 'Porque requiere que el niño instale 4 aplicaciones diferentes.', isCorrect: false }, { text: 'Porque solo ocurre en días de luna llena.', isCorrect: false }, { text: 'Porque el predador siempre empieza pidiendo dinero.', isCorrect: false }] },
            { text: '¿Qué implicación legal real tiene la "Huella Digital" en el futuro de un menor según las prácticas de reclutamiento actuales?', options: [{ text: 'Universidades y empresas revisan el rastro digital pasado para evaluar el carácter y la ética del candidato.', isCorrect: true }, { text: 'Ninguna, las leyes prohíben revisar fotos de hace más de 2 años.', isCorrect: false }, { text: 'Solo afecta si el menor quiere ser presidente del país.', isCorrect: false }, { text: 'Internet se borra cada 5 años automáticamente.', isCorrect: false }] },
            { text: 'Ante un ataque de "Ciberbullying" sistemático, ¿qué error común deben evitar los padres a toda costa?', options: [{ text: 'Borrar los mensajes e hilos de insultos sin tomar capturas de pantalla o evidencias primero.', isCorrect: true }, { text: 'Hablar con la escuela sobre el tema.', isCorrect: false }, { text: 'Cambiar la privacidad de la cuenta a "Cerrada".', isCorrect: false }, { text: 'Mostrar apoyo incondicional al hijo.', isCorrect: false }] }
        ]);
        modS4.quizId = qs4._id;
        await modS4.save();

        // --- FINAL EXAM: COURSE 2 ---
        const finalSocialQuestions = [
            { text: '¿Cuál es la configuración más robusta para proteger a un menor de 14 años en Instagram según las leyes de seguridad de 2024?', options: [{ text: 'Habilitar Cuenta de Adolescente (Privada por defecto), activar Supervisión parental y bloquear DMs de no seguidos.', isCorrect: true }, { text: 'Dejar la cuenta pública para que el niño pueda ser verificado más rápido.', isCorrect: false }, { text: 'No hacer nada, Instagram ya se encarga de todo automáticamente sin intervención del padre.', isCorrect: false }, { text: 'Darle una cuenta de adulto pero que use un nombre falso.', isCorrect: false }] },
            { text: 'En TikTok, el "Family Pairing" permite gestionar el "Modo Restringido". ¿Qué limitación técnica tiene este sistema que los padres deben conocer?', options: [{ text: 'No es perfecto; no puede filtrar el 100% del contenido inapropiado, por lo que la educación del menor sigue siendo vital.', isCorrect: true }, { text: 'Hace que la cuenta del hijo sea invisible para todo el mundo.', isCorrect: false }, { text: 'Permite al padre borrar videos que el hijo ya ha posteado.', isCorrect: false }, { text: 'Desactiva la cámara del teléfono del niño por completo.', isCorrect: false }] },
            { text: '¿Qué señal de comportamiento sugiere que un menor está siendo víctima de "Grooming" en Discord?', options: [{ text: 'El menor se vuelve reservado sobre con quién habla, recibe regalos digitales (Nitro) de desconocidos y se muestra ansioso.', isCorrect: true }, { text: 'El menor quiere comprar un micrófono mejor para hablar con sus amigos.', isCorrect: false }, { text: 'El menor deja de usar Discord porque dice que es muy difícil.', isCorrect: false }, { text: 'El menor empieza a usar muchos emojis en sus conversaciones.', isCorrect: false }] },
            { text: 'Has encontrado una foto de tu hijo circulando en un grupo de acosadores. Según el protocolo de "Huella Digital", ¿por qué borrarla de la red original suele ser insuficiente?', options: [{ text: 'Porque la foto ya pudo ser capturada o descargada por terceros, multiplicando el riesgo de forma incontrolable.', isCorrect: true }, { text: 'Porque Internet tiene un respaldo de seguridad que dura 100 años.', isCorrect: false }, { text: 'Porque la policía prohíbe borrar evidencias digitales.', isCorrect: false }, { text: 'Porque la foto se guarda automáticamente en la cuenta bancaria del padre.', isCorrect: false }] },
            { text: '¿Qué ventaja real ofrece el "Family Center" de Discord sobre otros sistemas de control parental invasivos?', options: [{ text: 'Mantiene un equilibrio entre la privacidad del menor (no leyes los chats) y la visibilidad del padre (sabes con quién habla).', isCorrect: true }, { text: 'Permite silenciar al niño si grita mucho mientras juega.', isCorrect: false }, { text: 'Gratis a cambio de ver anuncios publicitarios.', isCorrect: false }, { text: 'Permite ver la ubicación GPS exacta del niño en el mapa.', isCorrect: false }] }
        ];
        const finalSocialQuiz = await getOrCreateQuiz({
            title: 'Examen Final: Experto en Redes Sociales (Curso 2)',
            description: 'Evaluación de maestría para la protección de adolescentes en entornos sociales digitales.',
            scope: 'course',
            refId: courseSocial._id,
            scopeModel: 'Course'
        }, finalSocialQuestions);
        courseSocial.finalQuizId = finalSocialQuiz._id;
        await courseSocial.save();

        console.log('Course 2 Fully Expanded & Quizzes Refined!');


        // --- COURSE 3: PLATAFORMAS DE STREAMING ---
        const courseStreaming = await getOrCreateCourse({
            title: 'Plataformas de Streaming: YouTube y Twitch',
            description: 'Guía profesional para gestionar el consumo de video en vivo y pregrabado, evitando riesgos financieros y emocionales.',
            category: 'Streaming',
            platforms: ['YouTube', 'Twitch'],
            riskAreas: ['Moderación de Contenido', 'Donaciones y Estafas', 'Relaciones Parasociales', 'Privacidad en Vivo'],
            status: 'published',
        });

        // WIPE OLD MODULES AND QUIZZES FOR COURSE 3
        await Module.deleteMany({ courseId: courseStreaming._id });
        await Quiz.deleteMany({ refId: courseStreaming._id, scope: 'course' });
        console.log('  (-) Old modules and Course Quiz for Course 3 wiped for clean expansion.');

        // --- MODULE 1: YouTube - Cuentas Supervisadas y Filtros ---
        const modSt1 = await getOrCreateModule(courseStreaming._id, {
            title: 'YouTube: Cuentas Supervisadas y Filtros',
            description: 'Configurando el ecosistema de Google para un acceso seguro.'
        });
        await Quiz.deleteMany({ refId: modSt1._id, scope: 'module' });

        const lst1_1 = await getOrCreateLesson(modSt1._id, courseStreaming._id, {
            title: 'Cuentas Supervisadas vs YouTube Kids',
            content: `# ¿Qué elegir para cada edad?\n\nYouTube ofrece dos caminos principales para proteger a los menores.\n\n## 1. YouTube Kids (4-12 años)\nUna aplicación separada con filtros estrictos y contenido curado por máquinas y humanos. Ideal para la primera infancia.\n\n## 2. Experiencia Supervisada (9-17 años)\nPermite al menor entrar en la aplicación principal de YouTube pero con límites:\n*   **Explorar**: Contenido para mayores de 9 años.\n*   **Explorar más**: Para mayores de 13 años.\n*   **YouTube Completo**: Casi todo el contenido, excepto lo marcado como "Solo Adultos".\n\n**Nota**: Las cuentas supervisadas desactivan automáticamente los comentarios, la creación de canales y las compras.`,
            type: 'article', duration: 7
        });

        const lst1_2 = await getOrCreateLesson(modSt1._id, courseStreaming._id, {
            title: 'Google Family Link: El Panel de Control',
            content: `# Gestión Centralizada\n\nFamily Link es la herramienta indispensable para cualquier padre con hijos en el ecosistema Android o YouTube.\n\n## Lo que puedes hacer\n*   **Historial de Búsqueda**: Ver qué ha buscado tu hijo y pausar el historial para que el algoritmo no se vuelva repetitivo.\n*   **Bloqueo de Canales**: Si detectas un canal que no te gusta, puedes bloquearlo para que nunca más aparezca en sus recomendaciones.\n*   **Límites de Tiempo**: Establecer "horas de dormir" donde la aplicación se bloquea automáticamente.`,
            type: 'article', duration: 6
        });

        const lst1_v = await getOrCreateLesson(modSt1._id, courseStreaming._id, {
            title: 'Video: Configuración de Cuentas Google',
            content: 'Guía visual para crear y supervisar cuentas de YouTube.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=tuoHAYJdetw', duration: 8
        });

        modSt1.lessonOrder = [lst1_1._id, lst1_2._id, lst1_v._id];
        await modSt1.save();

        const qst1 = await getOrCreateQuiz({
            title: 'Examen Módulo 1: Seguridad YouTube',
            description: 'Domina las diferencias entre YouTube Kids y cuentas supervisadas en Family Link.',
            scope: 'module',
            refId: modSt1._id,
            scopeModel: 'Module'
        }, [
            { text: 'En una "Cuenta Supervisada" bajo el ajuste "Explorar" (para niños de 9+), ¿qué tipo de contenido se excluye críticamente?', options: [{ text: 'Videos con lenguaje soez, violencia gráfica y contenido para adultos, además de transmisiones en vivo.', isCorrect: true }, { text: 'Videos de dibujos animados clásicos.', isCorrect: false }, { text: 'Contenido subido por canales oficiales de noticias.', isCorrect: false }, { text: 'Videos que duren más de 10 minutos.', isCorrect: false }] },
            { text: '¿Qué ventaja técnica ofrece Family Link sobre el "Modo Restringido" tradicional del navegador?', options: [{ text: 'Permite bloquear canales ESPECÍFICOS que el padre considere inapropiados aunque pasen los filtros de YouTube.', isCorrect: true }, { text: 'Hace que YouTube Premium sea gratis.', isCorrect: false }, { text: 'Permite descargar videos al ordenador del padre sin conexión.', isCorrect: false }, { text: 'Traduce automáticamente los videos de otros idiomas.', isCorrect: false }] },
            { text: '¿Qué ocurre con los anuncios en YouTube Kids comparado con el YouTube normal bajo supervisión?', options: [{ text: 'En YouTube Kids no hay anuncios personalizados y se revisan estrictamente para ser aptos para niños.', isCorrect: true }, { text: 'No hay anuncios de ningún tipo en ninguna de las dos versiones.', isCorrect: false }, { text: 'Los anuncios son los mismos para todos los usuarios.', isCorrect: false }, { text: 'En YouTube Kids solo se anuncian videojuegos.', isCorrect: false }] }
        ]);
        modSt1.quizId = qst1._id;
        await modSt1.save();

        // --- MODULE 2: Twitch - Moderación y Dinero en Vivo ---
        const modSt2 = await getOrCreateModule(courseStreaming._id, {
            title: 'Twitch: Moderación y Dinero en Vivo',
            description: 'Gestionando la impredecibilidad de los directos y el gasto digital.'
        });
        await Quiz.deleteMany({ refId: modSt2._id, scope: 'module' });

        const lst2_1 = await getOrCreateLesson(modSt2._id, courseStreaming._id, {
            title: 'AutoMod y Privacidad en el Chat de Twitch',
            content: `# El Caos del Chat en Vivo\n\nA diferencia de YouTube, Twitch es puro "aire". El chat puede ser muy tóxico si no se configura.\n\n## Herramientas de Defensa\n*   **AutoMod**: Configúralo en el nivel máximo para filtrar insultos, lenguaje sexual y hostilidad automáticamente.\n*   **Bloqueo de "Whispers"**: Evita que extraños envíen mensajes privados a tu hijo. Activa "Bloquear susurros de desconocidos".\n*   **Ocultar Chat**: Enseña a tu hijo que no es obligatorio leer el chat. Disfrutar del contenido con el chat oculto es la opción más segura.`,
            type: 'article', duration: 7
        });

        const lst2_2 = await getOrCreateLesson(modSt2._id, courseStreaming._id, {
            title: 'Donaciones, "Bits" y Estafas Financieras',
            content: `# El Riesgo Económico en Twitch\n\nTwitch tiene su propia moneda (Bits), pero también permite donaciones directas vía PayPal o tarjetas.\n\n## Peligros comunes\n*   **Donaciones por Retos**: Los streamers o el chat pueden incitar al menor a hacer cosas peligrosas a cambio de dinero.\n*   **Compras Accidentales**: Si tu tarjeta está vinculada a Amazon Prime (que incluye Twitch Prime), es muy fácil gastar dinero real con un solo clic.\n\n## Recomendación\nNunca dejes métodos de pago guardados en el navegador o la aplicación que usa tu hijo. Elimínalos tras cada compra pactada.`,
            type: 'article', duration: 8
        });

        const lst2_v = await getOrCreateLesson(modSt2._id, courseStreaming._id, {
            title: 'Video: Seguridad en Twitch',
            content: 'Guía para padres sobre seguridad en Twitch.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=8_Dusqb8KD8', duration: 5
        });

        modSt2.lessonOrder = [lst2_1._id, lst2_2._id, lst2_v._id];
        await modSt2.save();

        const qst2 = await getOrCreateQuiz({
            title: 'Examen Módulo 2: Seguridad Twitch',
            description: 'Evalúa tu conocimiento sobre moderación de chat en vivo y seguridad en donaciones.',
            scope: 'module',
            refId: modSt2._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Por qué Twitch es considerado una plataforma de mayor riesgo inmediato que YouTube para un menor de 13 años?', options: [{ text: 'Porque las transmisiones en vivo son impredecibles y el chat interactúa en tiempo real sin filtro humano previo sistemático.', isCorrect: true }, { text: 'Porque requiere pagar para ver cualquier video.', isCorrect: false }, { text: 'Porque solo tiene contenido para adultos de 18+.', isCorrect: false }, { text: 'Porque no tiene aplicación para móviles.', isCorrect: false }] },
            { text: '¿Qué medida de privacidad extrema evitaría que un acosador contacte a tu hijo por chat privado en Twitch?', options: [{ text: 'Activar "Block Whispers from Strangers" en los ajustes de Seguridad y Privacidad.', isCorrect: true }, { text: 'Cambiar el color del nombre en el chat.', isCorrect: false }, { text: 'Bajar la calidad del video a 480p.', isCorrect: false }, { text: 'No poner una foto de perfil.', isCorrect: false }] },
            { text: '¿Cuál es el peligro de las donaciones por "Retos" incitadas por streamers o la audiencia?', options: [{ text: 'El menor puede realizar actos físicos peligrosos o humillantes solo para complacer al creador a cambio de una donación.', isCorrect: true }, { text: 'Que el streamer se olvide de decir el nombre del niño.', isCorrect: false }, { text: 'Que el banco cobre una comisión alta por la moneda extranjera.', isCorrect: false }, { text: 'Que el Internet se vuelva lento.', isCorrect: false }] }
        ]);
        modSt2.quizId = qst2._id;
        await modSt2.save();

        // --- MODULE 3: Relaciones Parasociales y Salud Digital ---
        const modSt3 = await getOrCreateModule(courseStreaming._id, {
            title: 'Relaciones Parasociales y Salud Mental',
            description: 'Entendiendo el vínculo emocional con los creadores de contenido.'
        });
        await Quiz.deleteMany({ refId: modSt3._id, scope: 'module' });

        const lst3_1 = await getOrCreateLesson(modSt3._id, courseStreaming._id, {
            title: '¿Qué es una Relación Parasocial?',
            content: `# "Mi amigo el Streamer"\n\nUna relación parasocial es un vínculo emocional de una sola vía. El espectador siente que el creador es un amigo íntimo, aunque el creador no sepa quién es el espectador.\n\n## Por qué es un riesgo\n*   **Gasto Excesivo**: Los niños donan dinero solo para que el creador diga su nombre (validación emocional).\n*   **Aislamiento**: Prefieren "estar" con su streamer que con amigos reales.\n*   **Manipulación**: El joven es más propenso a creer todo lo que dice el creador, incluso si son opiniones peligrosas o publicidad encubierta.`,
            type: 'article', duration: 7
        });

        const lst3_2 = await getOrCreateLesson(modSt3._id, courseStreaming._id, {
            title: 'Señales de Alerta y Conversacción con el hijo',
            content: `# Cómo intervenir\n\nNo prohíbas, educa. Habla con tu hijo sobre sus creadores favoritos.\n\n## Preguntas Detectora\n*   "¿Qué es lo que más te gusta de su contenido?"\n*   "¿Sabes que lo que muestra es un personaje y no su vida 100% real?"\n*   "¿Sientes que debes donar dinero para que te haga caso?"\n\nEstablece límites de tiempo claros para evitar que el streaming sustituya a la vida social física.`,
            type: 'article', duration: 6
        });

        modSt3.lessonOrder = [lst3_1._id, lst3_2._id];
        await modSt3.save();

        const qst3 = await getOrCreateQuiz({
            title: 'Examen Módulo 3: Salud Digital',
            description: 'Demuestra que comprendes el fenómeno parasocial y sabes cómo intervenir positivamente.',
            scope: 'module',
            refId: modSt3._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Cómo afecta una Relación Parasocial intensa a la toma de decisiones financieras de un adolescente?', options: [{ text: 'Se siente moralmente obligado a apoyar económicamente al creador para "seguir siendo su amigo" y mantener su validación.', isCorrect: true }, { text: 'Hace que el niño empiece a ahorrar más dinero en su cuenta bancaria.', isCorrect: false }, { text: 'No tiene impacto, los niños son conscientes de que es solo entretenimiento.', isCorrect: false }, { text: 'El niño aprende a invertir en bolsa siguiendo consejos del streamer.', isCorrect: false }] },
            { text: '¿Cuál es una señal de alerta de que la admiración hacia un YouTuber se ha vuelto una dependencia emocional negativa?', options: [{ text: 'Si el niño se siente deprimido o ansioso cuando el creador no sube contenido o no le responde en el chat.', isCorrect: true }, { text: 'Si el niño quiere comprarse una camiseta con el logo del canal.', isCorrect: false }, { text: 'Si el niño aprende inglés viendo videos de creadores extranjeros.', isCorrect: false }, { text: 'Si el niño imita algunos chistes o bromas del creador.', isCorrect: false }] },
            { text: 'Desde el punto de vista del bienestar, ¿cuál es la mejor estrategia para "romper" un vínculo parasocial tóxico?', options: [{ text: 'Fomentar actividades sociales físicas reales que ofrezcan validación y pertenencia sin intermediación de una pantalla.', isCorrect: true }, { text: 'Quitarle el Internet al niño por un año entero.', isCorrect: false }, { text: 'Que el padre empiece a donar también dinero al mismo streamer.', isCorrect: false }, { text: 'Obligar al niño a grabar sus propios videos.', isCorrect: false }] }
        ]);
        modSt3.quizId = qst3._id;
        await modSt3.save();

        // --- FINAL EXAM: COURSE 3 ---
        const finalStreamingQuestions = [
            { text: 'Deseas configurar YouTube para un niño de 12 años que ya no quiere usar YouTube Kids. ¿Cuál es la ruta técnica correcta?', options: [{ text: 'Crear una Cuenta Supervisada en la app de YouTube y seleccionar el nivel de contenido "Explorar más".', isCorrect: true }, { text: 'Simplemente activar el Modo Restringido en el navegador Chrome.', isCorrect: false }, { text: 'Prestarle la cuenta de adulto del padre pero con el historial borrado.', isCorrect: false }, { text: 'Usar la versión web de YouTube sin iniciar sesión.', isCorrect: false }] },
            { text: '¿Cuál es el riesgo legal y financiero de que un menor use la tarjeta de crédito del padre para donar en un stream en vivo?', options: [{ text: 'Las donaciones suelen ser irrevocables una vez procesadas, y son una vía común para que el menor busque validación emocional.', isCorrect: true }, { text: 'El banco cancelará la cuenta del padre automáticamente.', isCorrect: false }, { text: 'El streamer está obligado a devolver el dinero si el padre lo pide por chat.', isCorrect: false }, { text: 'No hay riesgo, Twitch tiene un seguro de reembolso para padres.', isCorrect: false }] },
            { text: 'En Twitch, un usuario se vuelve agresivo con tu hijo en el chat pero no le insulta directamente. ¿Qué herramienta de moderación es más efectiva aquí?', options: [{ text: 'Configurar el AutoMod de Twitch en su nivel más alto de hostilidad y filtrar palabras clave personalizadas.', isCorrect: true }, { text: 'Desinstalar la aplicación del ordenador.', isCorrect: false }, { text: 'Reportar al streamer por no haber baneado al usuario.', isCorrect: false }, { text: 'Pedirle al niño que no use el chat nunca más.', isCorrect: false }] },
            { text: '¿Cómo puede un padre mitigar el impacto de una Relación Parasocial tóxica en un menor?', options: [{ text: 'Explicando la naturaleza comercial del streaming y fomentando que el menor sea creador de contenido físico, no solo consumidor.', isCorrect: true }, { text: 'Donando él mismo para que el streamer salude a toda la familia.', isCorrect: false }, { text: 'Prohibiendo ver a ese streamer específico de forma tajante.', isCorrect: false }, { text: 'Cambiando la contraseña del Wi-Fi cada noche.', isCorrect: false }] },
            { text: '¿Qué funcionalidad de Family Link es la más poderosa para evitar el consumo compulsivo de YouTube de madrugada?', options: [{ text: 'El "Tiempo de Descanso" programado que bloquea la aplicación totalmente en el horario elegido.', isCorrect: true }, { text: 'El bloqueo de la cámara del móvil.', isCorrect: false }, { text: 'La posibilidad de ver la ubicación del móvil.', isCorrect: false }, { text: 'Borrar el historial de videos vistos cada hora.', isCorrect: false }] }
        ];
        const finalStreamingQuiz = await getOrCreateQuiz({
            title: 'Examen Final: Experto en Streaming (Curso 3)',
            description: 'Certificación final para la gestión segura de plataformas de contenido en vivo.',
            scope: 'course',
            refId: courseStreaming._id,
            scopeModel: 'Course'
        }, finalStreamingQuestions);
        courseStreaming.finalQuizId = finalStreamingQuiz._id;
        await courseStreaming.save();

        await courseStreaming.save();

        console.log('Course 3 Fully Expanded & Quizzes Refined!');

        // --- DIAGNOSTIC QUIZ (CU03) ---
        console.log('  (+) Creating Diagnostic Quiz...');
        await Quiz.deleteMany({ scope: 'diagnostic' });

        const diagnosticQuiz = await getOrCreateQuiz({
            title: 'Examen Diagnóstico de Vulnerabilidad Digital',
            description: 'Este examen evaluará tus conocimientos en las tres áreas clave: Videojuegos, Redes Sociales y Streaming. Al finalizar, sabrás exactamente qué áreas necesitas reforzar para proteger a tu familia.',
            scope: 'diagnostic',
            refId: null,
            scopeModel: 'Course' // Dummy for diagnostic
        }, [
            // Gaming Section
            {
                text: '¿Sabes qué es un archivo ".HAR" y por qué un extraño podría pedírselo a tu hijo en Roblox?', platform: 'Roblox', options: [
                    { text: 'Es un archivo de registro que contiene el token de sesión; si lo roban, pueden entrar a la cuenta sin contraseña ni 2FA.', isCorrect: true },
                    { text: 'Es un archivo cosmético para obtener ropa gratis.', isCorrect: false },
                    { text: 'Es un archivo necesario para mejorar la velocidad del juego.', isCorrect: false }
                ]
            },
            {
                text: '¿Qué es Minecraft Realms y qué ventaja de seguridad ofrece sobre los servidores públicos?', platform: 'Minecraft', options: [
                    { text: 'Es un servidor privado de Microsoft donde solo pueden entrar invitados específicos, evitando el contacto con desconocidos.', isCorrect: true },
                    { text: 'Es una versión gratuita de Minecraft con más anuncios.', isCorrect: false },
                    { text: 'Es un modo de juego donde no se puede morir.', isCorrect: false }
                ]
            },
            // Social Media Section
            {
                text: 'En TikTok, ¿cuál es la función de la "Sincronización Familiar" (Family Pairing)?', platform: 'TikTok', options: [
                    { text: 'Permite al padre gestionar el tiempo de pantalla, el modo restringido y la privacidad de DMs desde su propio móvil.', isCorrect: true },
                    { text: 'Hace que los videos del hijo se vuelvan virales automáticamente.', isCorrect: false },
                    { text: 'Permite al padre ver todos los videos que el hijo ha dado "like".', isCorrect: false }
                ]
            },
            {
                text: '¿Cuál es la principal protección de las nuevas "Cuentas para Adolescentes" de Instagram?', platform: 'Instagram', options: [
                    { text: 'Las cuentas son privadas por defecto y requieren aprobación parental para cambiar ajustes de seguridad críticos.', isCorrect: true },
                    { text: 'Instagram regala seguidores reales a los menores para evitar que sigan a extraños.', isCorrect: false },
                    { text: 'La cámara del móvil se bloquea automáticamente si el niño no sonríe.', isCorrect: false }
                ]
            },
            // Streaming Section
            {
                text: '¿Qué diferencia a "YouTube Kids" de una "Experiencia Supervisada" en YouTube?', platform: 'YouTube', options: [
                    { text: 'YouTube Kids es una app filtrada para niños pequeños; la supervisada permite usar la app principal con límites de edad.', isCorrect: true },
                    { text: 'YouTube Kids es de pago y la supervisada es gratuita.', isCorrect: false },
                    { text: 'No hay diferencia, son dos nombres para lo mismo.', isCorrect: false }
                ]
            },
            {
                text: '¿Qué es una "Relación Parasocial" en plataformas como Twitch?', platform: 'Twitch', options: [
                    { text: 'Es cuando el espectador desarrolla un vínculo emocional de "amistad" irreal con el creador, lo que puede llevar a donaciones impulsivas.', isCorrect: true },
                    { text: 'Es una relación entre dos streamers que viven en el mismo país.', isCorrect: false },
                    { text: 'Es un tipo de membresía prémium para ver streams sin anuncios.', isCorrect: false }
                ]
            }
        ]);

        console.log('--- ALL DATA IMPORTED SUCCESSFULLY ---');
        process.exit();
    } catch (error) {
        console.error('SEED ERROR:', error);
        process.exit(1);
    }
};

importData();
