module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

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

};

