module.exports = async function seedDiagnosticQuiz(context) {
    const { getOrCreateQuiz, models } = context;
    const { Quiz } = models;

    console.log('  (+) Creating Diagnostic Quiz...');
    await Quiz.deleteMany({ scope: 'diagnostic' });

    const diagnosticQuestions = [
        {
            text: 'Instrucción: Relaciona cada concepto básico de videojuegos en línea con su significado correcto.',
            type: 'drag_drop',
            platform: 'Roblox',
            riskArea: 'Seguridad de Cuenta',
            metadata: {
                pairs: [
                    { key: 'Cuenta', value: 'Perfil que guarda progreso, permisos y configuraciones' },
                    { key: 'Servidor', value: 'Espacio o sistema que conecta a varios jugadores en una partida' },
                    { key: 'Chat', value: 'Función para hablar por texto o voz dentro del juego' },
                    { key: 'Compra dentro del juego', value: 'Pago digital por moneda virtual, objetos o mejoras' },
                    { key: 'Multijugador', value: 'Función que permite jugar con otras personas' },
                ],
                correctAnswer: {
                    Cuenta: 'Perfil que guarda progreso, permisos y configuraciones',
                    Servidor: 'Espacio o sistema que conecta a varios jugadores en una partida',
                    Chat: 'Función para hablar por texto o voz dentro del juego',
                    'Compra dentro del juego': 'Pago digital por moneda virtual, objetos o mejoras',
                    Multijugador: 'Función que permite jugar con otras personas',
                },
            },
            explanation: 'Antes de entrar a configuraciones o riesgos concretos, una familia necesita entender este vocabulario base para interpretar mejor lo que el menor hace dentro del juego.',
            points: 10,
        },
        {
            text: 'Selecciona todo lo que conviene revisar antes de dejar que un menor entre a una partida o servidor en línea.',
            type: 'multiple_selection',
            platform: 'Minecraft',
            riskArea: 'Privacidad Avanzada',
            options: [
                { text: 'Si el juego permite chat con otras personas', isCorrect: true },
                { text: 'Si puede entrar a espacios con desconocidos', isCorrect: true },
                { text: 'Si existen compras o moneda virtual', isCorrect: true },
                { text: 'Si la cuenta del menor tiene permisos familiares activos', isCorrect: true },
                { text: 'El color favorito del avatar', isCorrect: false },
                { text: 'Si el mundo o servidor es privado o abierto', isCorrect: true },
            ],
            explanation: 'La revisión inicial no es solo técnica: también debe cubrir interacción social, compras, cuenta y el tipo de entorno al que el menor se conecta.',
            points: 10,
        },
        {
            text: 'Caso: tu hijo dice que necesita Robux porque “todos los demás ya tienen ese objeto” y promete que será solo una vez. ¿Cuál es la respuesta más segura y educativa?',
            type: 'case_study',
            platform: 'Roblox',
            riskArea: 'Gasto Controlado',
            options: [
                { text: 'Comprar de inmediato para que no se sienta excluido del grupo.', isCorrect: false },
                { text: 'Explicar que Robux equivale a dinero real, revisar límites o métodos de pago y decidir con calma si esa compra tiene sentido.', isCorrect: true },
                { text: 'Prestarle la tarjeta para que aprenda a administrarse solo.', isCorrect: false },
                { text: 'Decirle que en internet todo es gratis si sabe buscar bien.', isCorrect: false },
            ],
            explanation: 'La idea clave no es solo decir que no, sino hacer visible que la moneda virtual sigue siendo dinero real y que la presión social no debería decidir una compra.',
            points: 10,
        },
        {
            text: 'Instrucción: Relaciona cada red social con lo que más la caracteriza.',
            type: 'match_columns',
            platform: 'TikTok',
            riskArea: 'Uso digital',
            metadata: {
                left: ['TikTok', 'Discord', 'Instagram'],
                right: [
                    'Videos cortos y recomendaciones constantes',
                    'Feed personalizado que cambia según la interacción',
                    'Servidores, canales y conversación en comunidad',
                    'Mensajes y grupos donde la interacción es central',
                    'Perfil, historias y seguidores',
                    'Imagen personal, comparación social y reacciones',
                ],
                correctAnswer: {
                    TikTok: [
                        'Videos cortos y recomendaciones constantes',
                        'Feed personalizado que cambia según la interacción',
                    ],
                    Discord: [
                        'Servidores, canales y conversación en comunidad',
                        'Mensajes y grupos donde la interacción es central',
                    ],
                    Instagram: [
                        'Perfil, historias y seguidores',
                        'Imagen personal, comparación social y reacciones',
                    ],
                },
            },
            explanation: 'TikTok, Discord e Instagram no funcionan igual, y una parte importante del acompañamiento parental es entender qué tipo de experiencia domina en cada una.',
            points: 10,
        },
        {
            text: 'Completa la idea sobre privacidad y huella digital.',
            type: 'fill_blanks',
            platform: 'Instagram',
            riskArea: 'Privacidad',
            metadata: {
                sentence: 'Aunque una cuenta sea [blank1], la huella digital no desaparece. El [blank2], los [blank3], los mensajes y la [blank4] también pueden revelar información del menor. Por eso conviene pensar antes de [blank5].',
                bank: ['privada', 'perfil', 'seguidores', 'ubicación', 'publicar'],
                correctAnswer: {
                    blank1: 'privada',
                    blank2: 'perfil',
                    blank3: 'seguidores',
                    blank4: 'ubicación',
                    blank5: 'publicar',
                },
            },
            explanation: 'La privacidad no depende solo de poner una cuenta en modo privado. También importa qué deja visible el perfil, con quién se conecta el menor y qué rastro queda de su actividad.',
            points: 10,
        },
        {
            text: 'Selecciona todas las señales que deberían hacer que un menor salga de una conversación y pida ayuda a un adulto.',
            type: 'multiple_selection',
            platform: 'Discord',
            riskArea: 'Manipulación',
            options: [
                { text: 'Le piden guardar secretos sobre la conversación', isCorrect: true },
                { text: 'Insisten en pasar la charla a otra app más privada', isCorrect: true },
                { text: 'Le piden fotos, datos personales o “pruebas de confianza”', isCorrect: true },
                { text: 'Una persona desconocida se muestra demasiado cercana muy rápido', isCorrect: true },
                { text: 'Alguien saluda de forma amable en un servidor público', isCorrect: false },
                { text: 'Le ofrecen apoyo emocional para luego pedir que no le diga a nadie', isCorrect: true },
            ],
            explanation: 'El grooming y la manipulación rara vez empiezan con una amenaza clara. Suelen mezclarse con secretos, cercanía rápida y presión para mover la conversación a espacios más privados.',
            points: 10,
        },
        {
            text: 'Completa la frase sobre controles parentales en streaming.',
            type: 'drop_down',
            platform: 'YouTube',
            riskArea: 'Control parental',
            metadata: {
                sentence: 'Para niños pequeños, [blank1] ofrece una experiencia más limitada. En YouTube, una cuenta [blank2] permite usar la app principal con filtros según edad. En Twitch, el mayor riesgo suele estar en la [blank3] con otras personas. Ningún control sustituye la [blank4] adulta.',
                options: {
                    blank1: ['YouTube Kids', 'Bits', 'Discord'],
                    blank2: ['supervisada', 'viral', 'anónima'],
                    blank3: ['interacción en vivo', 'descarga automática', 'tarjeta de regalo'],
                    blank4: ['presencia', 'popularidad', 'suscripción'],
                },
                correctAnswer: {
                    blank1: 'YouTube Kids',
                    blank2: 'supervisada',
                    blank3: 'interacción en vivo',
                    blank4: 'presencia',
                },
            },
            explanation: 'Las herramientas ayudan, pero el criterio adulto sigue siendo necesario para revisar contenido, mensajes, directos y hábitos de uso.',
            points: 10,
        },
        {
            text: 'Instrucción: Clasifica cada herramienta o ajuste según el ecosistema al que pertenece.',
            type: 'categorize',
            riskArea: 'Control parental',
            metadata: {
                items: [
                    'Cuenta adulta enlazada de Roblox',
                    'Microsoft Family Safety',
                    'Family Pairing',
                    'Teen Accounts',
                    'Family Center',
                    'YouTube Kids',
                    'Experiencia supervisada de YouTube',
                ],
                categories: ['Videojuegos', 'Redes Sociales', 'Streaming'],
                correctAnswer: {
                    Videojuegos: [
                        'Cuenta adulta enlazada de Roblox',
                        'Microsoft Family Safety',
                    ],
                    'Redes Sociales': [
                        'Family Pairing',
                        'Teen Accounts',
                        'Family Center',
                    ],
                    Streaming: [
                        'YouTube Kids',
                        'Experiencia supervisada de YouTube',
                    ],
                },
            },
            explanation: 'Parte de la protección digital consiste en reconocer qué herramienta corresponde a cada entorno, para no aplicar controles equivocados o asumir que todas las apps se supervisan igual.',
            points: 10,
        },
        {
            text: 'Ordena la respuesta más sensata frente a un reto viral, rumor o contenido dudoso que impacta al menor.',
            type: 'order_sequence',
            platform: 'TikTok',
            riskArea: 'Desinformación',
            metadata: {
                items: [
                    'Hacer una pausa antes de reaccionar',
                    'Preguntarse quién publicó el contenido',
                    'Pensar si busca asustar, vender o presionar',
                    'No compartirlo de inmediato',
                    'Hablar con un adulto o revisar una fuente confiable',
                ],
                correctAnswer: [
                    'Hacer una pausa antes de reaccionar',
                    'Preguntarse quién publicó el contenido',
                    'Pensar si busca asustar, vender o presionar',
                    'No compartirlo de inmediato',
                    'Hablar con un adulto o revisar una fuente confiable',
                ],
            },
            explanation: 'La clave no es memorizar noticias falsas, sino aprender una secuencia de pausa, verificación e intención antes de creer o compartir.',
            points: 10,
        },
        {
            text: 'Caso: una creadora que tu hija sigue en Instagram recomienda un producto “que usa siempre” y el contenido incluye una etiqueta como "Paid partnership". ¿Qué lectura es la más adecuada?',
            type: 'case_study',
            platform: 'Instagram',
            riskArea: 'Publicidad',
            options: [
                { text: 'Si la creadora parece cercana, entonces no puede haber interés comercial.', isCorrect: false },
                { text: 'La etiqueta indica que hay una relación con una marca, así que conviene leer esa recomendación como contenido influido comercialmente.', isCorrect: true },
                { text: 'La etiqueta solo sirve para decorar la publicación y no cambia nada.', isCorrect: false },
                { text: 'Toda publicación con un producto visible es automáticamente falsa.', isCorrect: false },
            ],
            explanation: 'La meta no es desconfiar de todo, sino enseñar a distinguir cuándo una recomendación también está empujando una venta o una marca.',
            points: 10,
        },
        {
            text: 'Selecciona todas las señales que indican que el uso de plataformas está empezando a desplazar el bienestar del menor.',
            type: 'multiple_selection',
            platform: 'YouTube',
            riskArea: 'Tiempo de pantalla',
            options: [
                { text: 'Pierde sueño por seguir conectado', isCorrect: true },
                { text: 'Se irrita mucho cuando le piden parar', isCorrect: true },
                { text: 'Habla casi solo de streamers, cuentas o contenidos digitales', isCorrect: true },
                { text: 'Baja su interés por escuela, ejercicio o convivencia', isCorrect: true },
                { text: 'Ve un video educativo de vez en cuando', isCorrect: false },
                { text: 'Acepta con calma una rutina clara y predecible', isCorrect: false },
            ],
            explanation: 'El problema no siempre es solo el tiempo. Lo importante es observar si la plataforma empieza a quitar espacio a sueño, ánimo, escuela, ejercicio o convivencia.',
            points: 10,
        },
        {
            text: 'Caso: un niño quiere mandar Bits en Twitch para que el streamer lo note y dice que “solo son monedas de la app”. ¿Cuál es la respuesta más protectora?',
            type: 'case_study',
            platform: 'Twitch',
            riskArea: 'Monetización y publicidad',
            options: [
                { text: 'Permitirlo porque no es una compra real, solo una reacción dentro del chat.', isCorrect: false },
                { text: 'Explicar que Bits y regalos digitales equivalen a dinero real, revisar si hay métodos de pago guardados y ofrecer formas de participar sin gastar.', isCorrect: true },
                { text: 'Comprar una cantidad grande para que aprenda más rápido cómo funciona la plataforma.', isCorrect: false },
                { text: 'Decirle que gastar por atención del creador siempre vale la pena si se emociona mucho.', isCorrect: false },
            ],
            explanation: 'En streaming, gastar puede sentirse como apoyo o participación, pero detrás de Bits, gifts o suscripciones sigue habiendo dinero real y posibles compras impulsivas.',
            points: 10,
        },
    ];

    await getOrCreateQuiz({
        title: 'Examen Diagnóstico de Vulnerabilidad Digital',
        description: 'Evalúa conceptos básicos de Videojuegos, Redes Sociales y Streaming para detectar en qué áreas necesita más apoyo una familia antes de avanzar en los cursos.',
        scope: 'diagnostic',
        refId: null,
        scopeModel: 'Course',
        minPassing: 80,
    }, diagnosticQuestions);
};
