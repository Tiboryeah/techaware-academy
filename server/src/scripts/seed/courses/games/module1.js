module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

    const mod1 = await getOrCreateModule(courseGames._id, {
        title: 'Módulo 1: Fundamentos de videojuegos en línea',
        description: 'Entendiendo el panorama general de los mundos digitales.',
        duration: '40 min'
    });
    await Quiz.deleteMany({ refId: mod1._id, scope: 'module' });

    const l1_1 = await getOrCreateLesson(mod1._id, courseGames._id, {
        title: 'Artículo 1: ¿Qué son los videojuegos en línea y cómo funcionan?',
        content: `# ¿Qué son los videojuegos en línea?

> **Nota fundamental:** Un videojuego en línea no es solamente "un juego en internet". También es un entorno con identidad digital, comunicación, gasto y reglas de seguridad.

Los videojuegos en línea son plataformas o juegos que usan internet para conectar al menor con contenido, servidores y, muchas veces, con otras personas. Esa conexión puede servir para jugar cooperativamente, competir, chatear, comprar contenido o compartir mundos.

## Los 5 conceptos base del módulo

Antes de avanzar, una familia necesita entender con claridad cinco conceptos que sí aparecerán en la evaluación:

1. **Cuenta**: perfil que guarda progreso, permisos, amistades y configuraciones.
2. **Servidor**: espacio o sistema que coordina la partida y conecta a varios jugadores.
3. **Chat**: función de texto o voz para comunicarse dentro del juego.
4. **Compra dentro del juego**: pago digital por moneda virtual, objetos, mejoras o acceso.
5. **Multijugador**: función que permite jugar con otras personas.

> **Idea clave:** Si la familia entiende estos cinco conceptos, deja de ver el juego como una "caja negra" y puede supervisarlo con más lógica.

## Cómo funciona un juego en línea

Una forma simple de verlo es esta:

1. el menor entra desde un **dispositivo**,
2. inicia sesión con su **cuenta**,
3. la información viaja por **internet**,
4. un **servidor** coordina la partida,
5. aparecen funciones como **multijugador**, **chat** y, en algunos casos, **compras dentro del juego**.

## Qué conviene revisar antes de autorizar un juego

Antes de permitir el acceso a una nueva plataforma, conviene revisar:

1. si permite hablar con otras personas,
2. si el chat es de texto, voz o ambos,
3. si requiere cuenta propia,
4. si incluye compras o moneda virtual,
5. si tiene controles parentales,
6. si el menor podría interactuar con desconocidos.

## Dos ejemplos que este curso compara

* **Roblox** funciona como una plataforma con muchas experiencias creadas por usuarios.
* **Minecraft** funciona como un juego sandbox donde la seguridad cambia según la edición, el mundo y el tipo de multijugador.

> **Actividad breve:** Piensa en el juego que usa tu hijo o hija. ¿Ya sabes si lo más importante que debes revisar ahí es la cuenta, el chat, el multijugador o las compras?`,
        type: 'article',
        duration: 12,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Seguridad de Cuenta', 'Privacidad Avanzada', 'Gasto Controlado'],
        teaches: ['internet', 'cuenta', 'servidor', 'chat', 'multijugador', 'compra dentro del juego', 'compras', 'desconocidos', 'controles parentales']
    });

    const l1_2 = await getOrCreateLesson(mod1._id, courseGames._id, {
        title: 'Guía visual: Cuenta, servidor, chat, compras y multijugador',
        content: `# Guía visual del módulo 1

Esta guía existe para que los conceptos del examen salgan exactamente de algo que ya viste en el módulo.

## Mapa rápido de conceptos

| Concepto | Qué significa en palabras simples | Qué debería revisar la familia |
| --- | --- | --- |
| **Cuenta** | Perfil que guarda progreso, permisos y configuraciones del jugador. | Quién la creó, qué datos guarda y si está vinculada al adulto. |
| **Servidor** | Sistema o espacio que conecta a varios jugadores en una misma partida. | Si es privado, con amistades conocidas o abierto a desconocidos. |
| **Chat** | Herramienta para hablar por texto o voz dentro del juego. | Si está activado, filtrado o limitado por edad. |
| **Compra dentro del juego** | Pago digital por moneda virtual, objetos, mejoras o acceso. | Si usa dinero real, si hay límite de gasto y si el menor pide permiso. |
| **Multijugador** | Función que permite jugar con otras personas. | Con quién juega el menor y qué tan abierto está ese entorno. |

## Ruta visual de un juego en línea

1. **Dispositivo**
2. **Cuenta**
3. **Internet**
4. **Servidor**
5. **Multijugador y chat**
6. **Compras**

## Regla práctica

Si una familia entiende estos cinco conceptos, ya tiene el vocabulario básico para interpretar el resto del curso y responder el examen con lógica.`,
        type: 'guide',
        duration: 12,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Seguridad de Cuenta', 'Privacidad Avanzada', 'Gasto Controlado'],
        teaches: ['cuenta', 'servidor', 'chat', 'compra dentro del juego', 'multijugador', 'internet']
    });

    const l1_3 = await getOrCreateLesson(mod1._id, courseGames._id, {
        title: 'Video 1: Recorrido visual: qué es Roblox y qué es Minecraft',
        content: `# Recorrido visual: qué es Roblox y qué es Minecraft

Este video muestra cómo se ven y cómo se sienten Roblox y Minecraft cuando un menor entra por primera vez, para que la familia distinga mejor qué está supervisando.

## Qué conviene observar
* Cómo cambia la experiencia entre una plataforma con muchas experiencias y un juego sandbox.
* Qué señales visuales muestran si el menor está entrando a mundos, servidores o experiencias concretas.
* Qué preguntas conviene hacer antes de dejar jugar.`,
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=placeholder1',
        duration: 2,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Seguridad de Cuenta', 'Privacidad Avanzada', 'Gasto Controlado'],
        teaches: ['roblox', 'minecraft', 'plataforma', 'sandbox', 'experiencia', 'mundo']
    });

    const l1_4 = await getOrCreateLesson(mod1._id, courseGames._id, {
        title: 'Artículo 2: Diferencias clave entre Roblox y Minecraft para una familia',
        content: `# Roblox vs Minecraft: diferencias clave para una familia

> **Perspectiva inicial:** Roblox y Minecraft no se supervisan igual. Uno funciona más como plataforma de experiencias sociales y el otro como juego sandbox cuya seguridad depende de la edición y del entorno de juego.

## 1. Plataforma vs sandbox

**Roblox** se parece más a una plataforma con muchas experiencias distintas dentro del mismo ecosistema.

**Minecraft** se parece más a un juego sandbox en el que la familia debe revisar el tipo de mundo, la edición y el multijugador.

## 2. Qué cambia para la supervisión

En **Roblox** conviene revisar:

1. la experiencia específica,
2. el chat,
3. la interacción social,
4. el gasto dentro del juego.

En **Minecraft** conviene revisar:

1. la edición del juego,
2. si juega solo, en Realm o en servidor público,
3. los permisos familiares de Microsoft/Xbox,
4. el tipo de mundo o entorno compartido.

## 3. Economía y compras

* **Roblox** usa **Robux**.
* **Minecraft Bedrock** usa **Minecoins** y el **Marketplace**.

## 4. Qué pregunta una familia antes de dejar jugar

* Si usa **Roblox**: ¿qué experiencia abrió, con quién habla y si puede gastar?
* Si usa **Minecraft**: ¿qué edición usa, qué permisos tiene y en qué mundo está jugando?

> **Conclusión:** No existe una plataforma "idéntica" a la otra. Cada una pide una lógica de revisión distinta, y por eso el examen compara ambas.`,
        type: 'article',
        duration: 12,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Seguridad de Cuenta', 'Privacidad Avanzada', 'Gasto Controlado'],
        teaches: ['roblox', 'minecraft', 'plataforma', 'sandbox', 'experiencia', 'mundo', 'creativo', 'supervivencia', 'robux', 'minecoins']
    });

    const l1_5 = await getOrCreateLesson(mod1._id, courseGames._id, {
        title: 'Video 2: Qué debe revisar un padre antes de dejar jugar',
        content: `# Qué debe revisar un padre antes de dejar jugar

Este video convierte el módulo en una lista visual de revisión inicial para que la familia identifique cuenta, chat, multijugador, compras y señales tempranas de riesgo.

## Qué conviene observar
* Si el juego exige cuenta propia o permite jugar con otras personas.
* Dónde aparecen el chat, las compras y los controles parentales.
* Qué indicadores muestran si puede haber contacto con desconocidos.`,
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=placeholder2',
        duration: 2,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Seguridad de Cuenta', 'Privacidad Avanzada', 'Gasto Controlado'],
        teaches: ['cuenta', 'chat', 'multijugador', 'compras', 'controles parentales', 'desconocidos']
    });

    mod1.lessonOrder = [l1_1._id, l1_2._id, l1_3._id, l1_4._id, l1_5._id];
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
            explanation: 'Tip: La cuenta es la identidad digital y el servidor es el sistema que coordina la partida.',
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
            explanation: 'Tip: Internet conecta, la cuenta identifica, el servidor coordina y los desconocidos aumentan el riesgo social.',
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
            explanation: 'Tip: Roblox es una plataforma con muchas experiencias; Minecraft es un sandbox cuyo riesgo depende del entorno.',
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
            explanation: 'Tip: El recorrido básico es dispositivo, cuenta, internet, servidor y multijugador.',
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
            explanation: 'Tip: Antes de autorizar conviene revisar comunicación, gasto, cuenta, multijugador y controles parentales.',
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
            explanation: 'Tip: Roblox exige revisar experiencia específica; Minecraft, el tipo de mundo y entorno.',
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
                    'Ambos': ['Juego en línea', 'Riesgos por interacción social', 'Compras digitales', 'Puede jugarse con otras personas']
                }
            },
            explanation: 'Tip: Ambos pueden tener interacción social y compras, aunque cada plataforma lo organiza de forma distinta.',
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
            explanation: 'El tiempo importa, pero no basta. También hay que revisar interacción social, compras, cuenta, controles parentales y diferencias entre Roblox y Minecraft.',
            points: 15
        }
    ]);
    mod1.quizId = q1._id;
    await mod1.save();
};
