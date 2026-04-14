module.exports = async function seedGamesFinalQuiz(context) {
    const { getOrCreateQuiz, courseGames } = context;

    const finalQuizQuestions = [
        // Modulo 1: Fundamentos
        {
            text: 'Modulo 1. Arrastra cada concepto basico a la definicion correcta.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Cuenta', value: 'Perfil que guarda progreso, permisos y configuraciones' },
                    { key: 'Servidor', value: 'Sistema o espacio que coordina la partida y conecta a los jugadores' },
                    { key: 'Chat', value: 'Funcion que permite comunicarse dentro del juego' },
                    { key: 'Compra dentro del juego', value: 'Pago digital por moneda virtual, objetos o mejoras' },
                    { key: 'Multijugador', value: 'Funcion que permite jugar con otras personas' }
                ],
                correctAnswer: {
                    'Cuenta': 'Perfil que guarda progreso, permisos y configuraciones',
                    'Servidor': 'Sistema o espacio que coordina la partida y conecta a los jugadores',
                    'Chat': 'Funcion que permite comunicarse dentro del juego',
                    'Compra dentro del juego': 'Pago digital por moneda virtual, objetos o mejoras',
                    'Multijugador': 'Funcion que permite jugar con otras personas'
                }
            },
            explanation: 'Este reactivo sale del vocabulario base del modulo 1: cuenta, servidor, chat, compra dentro del juego y multijugador.',
            riskArea: 'Seguridad de Cuenta',
            points: 10
        },
        {
            text: 'Modulo 1. Relaciona cada caracteristica con Roblox o Minecraft.',
            type: 'match_columns',
            metadata: {
                left: ['Roblox', 'Minecraft'],
                right: [
                    'Plataforma con muchas experiencias distintas',
                    'Juego sandbox con mundos y modos como Creativo o Supervivencia',
                    'Conviene revisar la experiencia especifica',
                    'Conviene revisar la edicion, el mundo y el multijugador',
                    'Usa Robux dentro de su ecosistema',
                    'En Bedrock usa Minecoins y Marketplace'
                ],
                correctAnswer: {
                    'Roblox': [
                        'Plataforma con muchas experiencias distintas',
                        'Conviene revisar la experiencia especifica',
                        'Usa Robux dentro de su ecosistema'
                    ],
                    'Minecraft': [
                        'Juego sandbox con mundos y modos como Creativo o Supervivencia',
                        'Conviene revisar la edicion, el mundo y el multijugador',
                        'En Bedrock usa Minecoins y Marketplace'
                    ]
                }
            },
            explanation: 'Este reactivo resume la diferencia central entre plataforma y sandbox explicada en el modulo 1.',
            points: 10
        },

        // Modulo 2: Roblox
        {
            text: 'Modulo 2. Completa las frases sobre supervision parental en Roblox.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'Para supervisar Roblox de forma correcta, la cuenta del adulto debe estar [blank1] con la del menor. La plataforma pide verificar la [blank2] del adulto para activar privilegios parentales. La [blank3] de contenido ayuda a decidir que experiencias puede abrir el menor. El [blank4] mensual de gasto ayuda a controlar compras impulsivas.',
                bank: ['enlazada', 'edad', 'madurez', 'limite'],
                correctAnswer: {
                    blank1: 'enlazada',
                    blank2: 'edad',
                    blank3: 'madurez',
                    blank4: 'limite'
                }
            },
            explanation: 'Este reactivo se basa en cuenta adulta enlazada, verificacion de edad, madurez de contenido y limite mensual de gasto.',
            platform: 'Roblox',
            riskArea: 'Seguridad de Cuenta',
            points: 10
        },
        {
            text: 'Modulo 2. Clasifica cada ajuste de Roblox segun su funcion principal.',
            type: 'categorize',
            metadata: {
                items: [
                    'Cuenta adulta enlazada',
                    'Madurez de contenido',
                    'Experience Chat',
                    'Direct Chat',
                    'Conexiones',
                    'Tiempo de pantalla',
                    'Limite mensual de gasto',
                    'Bloquear y reportar'
                ],
                categories: ['Cuenta parental', 'Contenido y comunicacion', 'Supervision y consumo'],
                correctAnswer: {
                    'Cuenta parental': ['Cuenta adulta enlazada'],
                    'Contenido y comunicacion': ['Madurez de contenido', 'Experience Chat', 'Direct Chat', 'Conexiones'],
                    'Supervision y consumo': ['Tiempo de pantalla', 'Limite mensual de gasto', 'Bloquear y reportar']
                }
            },
            explanation: 'El modulo 2 explica que Roblox se protege por capas: cuenta parental, contenido/comunicacion y supervision de uso o gasto.',
            platform: 'Roblox',
            riskArea: 'Privacidad Avanzada',
            points: 10
        },

        // Modulo 3: Minecraft
        {
            text: 'Modulo 3. Completa correctamente cada idea sobre Minecraft.',
            type: 'drop_down',
            metadata: {
                sentence: 'La edicion [blank1] es la mas comun en consolas, moviles y Windows con cross-play. Un [blank2] es un mundo privado en la nube por invitacion. Para permitir juego social, conviene revisar permisos como [blank3] y Can join Realms desde Microsoft Family o Xbox Privacy. La app movil usada para revisar estos permisos es [blank4].',
                options: {
                    blank1: ['Bedrock Edition', 'Java Edition', 'Marketplace Edition'],
                    blank2: ['Realm', 'mod de Java', 'servidor abierto'],
                    blank3: ['Join Multiplayer Games', 'Experience Chat', 'Monthly Spending Limit'],
                    blank4: ['Xbox Family Settings', 'Roblox Studio', 'Minecraft Launcher']
                },
                correctAnswer: {
                    blank1: 'Bedrock Edition',
                    blank2: 'Realm',
                    blank3: 'Join Multiplayer Games',
                    blank4: 'Xbox Family Settings'
                }
            },
            explanation: 'Este reactivo sale del modulo 3: Bedrock, Realm, Join Multiplayer Games y Xbox Family Settings.',
            platform: 'Minecraft',
            riskArea: 'Seguridad de Cuenta',
            points: 10
        },
        {
            text: 'Modulo 3. Caso: una hija usa Minecraft Bedrock, tiene suscripcion a Realms, pero no puede entrar a partidas con amistades ni usar funciones sociales. Cual es la revision mas completa?',
            type: 'case_study',
            options: [
                { text: 'Comprar una version mas cara del juego para desbloquear Realms Stories.', isCorrect: false },
                { text: 'Revisar si la cuenta infantil esta dentro de Microsoft Family Group, validar Join Multiplayer Games, Can join Realms y los permisos sociales de voz o texto.', isCorrect: true },
                { text: 'Cambiarse a Java Edition porque ahi todo funciona sin permisos familiares.', isCorrect: false },
                { text: 'Esperar a que el error se resuelva solo porque Realms siempre tarda en activarse.', isCorrect: false }
            ],
            explanation: 'El modulo 3 ensena que en Minecraft muchas funciones sociales dependen de Microsoft Family, Xbox Privacy y permisos granulares.',
            platform: 'Minecraft',
            riskArea: 'Privacidad Avanzada',
            points: 10
        },

        // Modulo 4: Interaccion social y alertas
        {
            text: 'Modulo 4. Selecciona todas las senales que justifican revision inmediata por parte de un adulto.',
            type: 'multiple_selection',
            options: [
                { text: 'Alguien pide guardar secretos sobre la conversacion', isCorrect: true },
                { text: 'Un jugador pide foto, escuela o direccion', isCorrect: true },
                { text: 'Hay burlas o humillacion repetida en chat o voz', isCorrect: true },
                { text: 'Insisten en mover la conversacion a otra app', isCorrect: true },
                { text: 'El menor quiere probar un mapa nuevo con amistades conocidas', isCorrect: false },
                { text: 'Un jugador amenaza con publicar algo si no obedecen', isCorrect: true },
                { text: 'El avatar cambio de color', isCorrect: false },
                { text: 'El menor termino una partida muy rapido', isCorrect: false }
            ],
            explanation: 'Este reactivo retoma las senales del modulo 4: grooming, ciberacoso, secretos, datos personales, amenazas y paso a otra app.',
            riskArea: 'Privacidad Avanzada',
            points: 10
        },
        {
            text: 'Modulo 4. Ordena la secuencia mas protectora cuando ya ocurrio una interaccion de riesgo.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Escuchar al menor sin culpar',
                    'Entender que paso con preguntas abiertas',
                    'Guardar evidencia antes de borrar',
                    'Bloquear o reportar dentro de la plataforma',
                    'Escalar a escuela o autoridades si existe peligro real'
                ],
                correctAnswer: [
                    'Escuchar al menor sin culpar',
                    'Entender que paso con preguntas abiertas',
                    'Guardar evidencia antes de borrar',
                    'Bloquear o reportar dentro de la plataforma',
                    'Escalar a escuela o autoridades si existe peligro real'
                ]
            },
            explanation: 'La ruta correcta del modulo 4 es escuchar, entender, guardar evidencia, actuar en la plataforma y escalar si hace falta.',
            riskArea: 'Privacidad Avanzada',
            points: 10
        },

        // Modulo 5: Compras, estafas y descargas
        {
            text: 'Modulo 5. Relaciona cada termino con la opcion que mejor lo describe.',
            type: 'match_columns',
            metadata: {
                left: ['Robux', 'Minecoins', 'Marketplace', 'Mod de Java', 'Phishing'],
                right: [
                    'Moneda oficial de Roblox para contenido virtual',
                    'Moneda digital de Minecraft Bedrock',
                    'Ruta oficial mas clara para contenido en Bedrock',
                    'Modificacion de terceros sin soporte oficial de Minecraft',
                    'Engano que busca robar cuentas, contrasenas o datos'
                ],
                correctAnswer: {
                    'Robux': ['Moneda oficial de Roblox para contenido virtual'],
                    'Minecoins': ['Moneda digital de Minecraft Bedrock'],
                    'Marketplace': ['Ruta oficial mas clara para contenido en Bedrock'],
                    'Mod de Java': ['Modificacion de terceros sin soporte oficial de Minecraft'],
                    'Phishing': ['Engano que busca robar cuentas, contrasenas o datos']
                }
            },
            explanation: 'Este reactivo sale del modulo 5: monedas virtuales, Marketplace, mod de Java y phishing.',
            riskArea: 'Gasto Controlado',
            points: 10
        },
        {
            text: 'Modulo 5. Caso: un hijo encuentra una pagina que ofrece Robux gratis y ademas un mod de Java que pide descargar un programa externo. Cual es la mejor respuesta?',
            type: 'case_study',
            options: [
                { text: 'Probar primero con la pagina de Robux y solo evitar el mod de Java.', isCorrect: false },
                { text: 'No iniciar sesion, no descargar nada, explicar que son senales de phishing o de descarga no oficial, y volver solo a canales oficiales como Marketplace o compras autorizadas.', isCorrect: true },
                { text: 'Aceptar si la pagina se ve popular o tiene muchos colores llamativos.', isCorrect: false },
                { text: 'Cerrar todo sin explicacion para que el menor no pregunte mas.', isCorrect: false }
            ],
            explanation: 'El modulo 5 insiste en no dar credenciales, no instalar software raro y distinguir entre ruta oficial y promesa de estafa.',
            riskArea: 'Gasto Controlado',
            points: 10
        },

        // Modulo 6: Bienestar y acompanamiento
        {
            text: 'Modulo 6. Completa las frases sobre bienestar digital y acompanamiento parental.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'Si el juego empieza a desplazar [blank1], escuela o ejercicio, ya hay una senal de uso problematico. Una herramienta recomendada para acordar horarios y reglas es el [blank2]. Acompanar mejor incluye hacer [blank3] abiertas y, de vez en cuando, compartir una sesion de [blank4].',
                bank: ['sueno', 'Family Media Plan', 'preguntas', 'juego compartido'],
                correctAnswer: {
                    blank1: 'sueno',
                    blank2: 'Family Media Plan',
                    blank3: 'preguntas',
                    blank4: 'juego compartido'
                }
            },
            explanation: 'Este reactivo sale del modulo 6: sueno, Family Media Plan, preguntas abiertas y juego compartido.',
            riskArea: 'Salud Mental y Fisica',
            points: 10
        },
        {
            text: 'Modulo 6. Caso: un hijo juega cada noche, duerme menos, discute al apagar y ya no quiere ir a otras actividades. Cual es la respuesta mas acorde con el modulo?',
            type: 'case_study',
            options: [
                { text: 'Quitarle el juego sin explicacion y esperar a que se adapte.', isCorrect: false },
                { text: 'Ignorarlo mientras no haya una falta grave en la escuela.', isCorrect: false },
                { text: 'Hablar con el menor, revisar como el juego esta afectando sueno y rutina, acordar reglas visibles con Family Media Plan y dar seguimiento con acompanamiento parental.', isCorrect: true },
                { text: 'Permitir que juegue de madrugada si promete acabar tareas despues.', isCorrect: false }
            ],
            explanation: 'El modulo 6 propone observar desplazamientos reales, conversar, acordar reglas y acompanar, no solo castigar.',
            riskArea: 'Salud Mental y Fisica',
            points: 10
        }
    ];

    const finalQuiz = await getOrCreateQuiz({
        title: 'Examen Final Integrador: Roblox y Minecraft',
        description: 'Evaluacion final del curso con 12 reactivos mixtos y cobertura equilibrada de los 6 modulos. Duracion estimada: 15 a 18 minutos.',
        scope: 'course',
        refId: courseGames._id,
        scopeModel: 'Course',
        minPassing: 80
    }, finalQuizQuestions);

    courseGames.finalQuizId = finalQuiz._id;
    await courseGames.save();

    console.log('Course 1 final quiz upgraded.');
};
