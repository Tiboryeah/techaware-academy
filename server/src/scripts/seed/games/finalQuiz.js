module.exports = async function seedGamesFinalQuiz(context) {
    const { getOrCreateQuiz, courseGames } = context;

    const finalQuizQuestions = [
        {
            text: 'Instruccion: Arrastra cada concepto al control o entorno que mejor lo resuelve.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Cuenta adulta enlazada', value: 'Permite administrar controles parentales de Roblox sin compartir la cuenta del menor' },
                    { key: 'Microsoft Family / Xbox Privacy', value: 'Controla multijugador, amistades y chat en Minecraft' },
                    { key: 'Marketplace de Bedrock', value: 'Es la ruta oficial mas clara para obtener contenido en Minecraft' },
                    { key: 'Guardar evidencia', value: 'Debe hacerse antes de borrar mensajes o bloquear en un incidente' },
                    { key: 'Family Media Plan', value: 'Sirve para acordar horarios, espacios y reglas de juego en casa' }
                ],
                correctAnswer: {
                    'Cuenta adulta enlazada': 'Permite administrar controles parentales de Roblox sin compartir la cuenta del menor',
                    'Microsoft Family / Xbox Privacy': 'Controla multijugador, amistades y chat en Minecraft',
                    'Marketplace de Bedrock': 'Es la ruta oficial mas clara para obtener contenido en Minecraft',
                    'Guardar evidencia': 'Debe hacerse antes de borrar mensajes o bloquear en un incidente',
                    'Family Media Plan': 'Sirve para acordar horarios, espacios y reglas de juego en casa'
                }
            },
            explanation: 'Este reactivo junta la logica central del curso: cada plataforma y cada riesgo se protege con una capa distinta.',
            riskArea: 'Seguridad de Cuenta'
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'Roblox se supervisa mejor desde una cuenta adulta [blank1] con la del menor. En Minecraft Bedrock, entrar a un Realm seguro depende de la cuenta de [blank2] y de permisos de [blank3]. Si alguien pide mover la conversacion fuera del juego y ademas exige [blank4], ya existe una senal de riesgo. Antes de autorizar una compra o descarga, conviene confirmar que la fuente sea [blank5].',
                bank: ['enlazada', 'Microsoft', 'multijugador', 'secretos', 'oficial'],
                correctAnswer: {
                    blank1: 'enlazada',
                    blank2: 'Microsoft',
                    blank3: 'multijugador',
                    blank4: 'secretos',
                    blank5: 'oficial'
                }
            },
            explanation: 'La supervision efectiva combina cuenta correcta, permisos activos, lectura de senales sociales y validacion de la fuente.',
            riskArea: 'Privacidad Avanzada'
        },
        {
            text: 'Relaciona cada accion con el frente de supervision principal al que pertenece.',
            type: 'match_columns',
            metadata: {
                left: ['Roblox', 'Minecraft', 'Respuesta ante incidente', 'Bienestar familiar'],
                right: [
                    'Ajustar madurez de contenido',
                    'Fijar limite mensual de gasto',
                    'Revisar "Join Multiplayer Games"',
                    'Validar si juega en Realms o servidores publicos',
                    'Guardar capturas antes de borrar',
                    'Bloquear y reportar dentro de la plataforma',
                    'Sacar pantallas del dormitorio',
                    'Acordar horarios y reglas visibles'
                ],
                correctAnswer: {
                    'Roblox': [
                        'Ajustar madurez de contenido',
                        'Fijar limite mensual de gasto'
                    ],
                    'Minecraft': [
                        'Revisar "Join Multiplayer Games"',
                        'Validar si juega en Realms o servidores publicos'
                    ],
                    'Respuesta ante incidente': [
                        'Guardar capturas antes de borrar',
                        'Bloquear y reportar dentro de la plataforma'
                    ],
                    'Bienestar familiar': [
                        'Sacar pantallas del dormitorio',
                        'Acordar horarios y reglas visibles'
                    ]
                }
            },
            explanation: 'La clave no es memorizar herramientas sueltas, sino saber en que capa de proteccion actua cada una.',
            riskArea: 'Privacidad Avanzada'
        },
        {
            text: 'Ordena la ruta de decision mas segura antes de permitir una nueva actividad en linea.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Identificar si se trata de Roblox o Minecraft y que quiere hacer el menor',
                    'Revisar si hay chat, multijugador, compra o descarga implicada',
                    'Confirmar que la cuenta y los permisos familiares esten bien configurados',
                    'Verificar si la fuente es oficial o si hay senales de riesgo',
                    'Autorizar, acompanar o bloquear segun lo encontrado'
                ],
                correctAnswer: [
                    'Identificar si se trata de Roblox o Minecraft y que quiere hacer el menor',
                    'Revisar si hay chat, multijugador, compra o descarga implicada',
                    'Confirmar que la cuenta y los permisos familiares esten bien configurados',
                    'Verificar si la fuente es oficial o si hay senales de riesgo',
                    'Autorizar, acompanar o bloquear segun lo encontrado'
                ]
            },
            explanation: 'Primero se entiende la situacion, luego se revisan capas tecnicas y de riesgo, y al final se decide.',
            riskArea: 'Seguridad de Cuenta'
        },
        {
            text: 'Selecciona todas las senales que justifican intervencion inmediata de un adulto.',
            type: 'multiple_selection',
            options: [
                { text: 'Una pagina promete "Robux gratis" si el menor inicia sesion', isCorrect: true },
                { text: 'Un jugador pide pasar a otra app y guardar el chat en secreto', isCorrect: true },
                { text: 'El menor juega en un Realm privado con amistades conocidas', isCorrect: false },
                { text: 'Un mod de Java viene de una pagina desconocida e instala un programa externo', isCorrect: true },
                { text: 'El menor duerme bien y mantiene su rutina habitual', isCorrect: false },
                { text: 'Alguien pide foto, escuela o direccion', isCorrect: true },
                { text: 'Las compras se hacen por el flujo oficial con supervision familiar', isCorrect: false },
                { text: 'El juego ya esta afectando sueno, escuela o ejercicio', isCorrect: true }
            ],
            explanation: 'Aqui se mezclan estafa, grooming, privacidad y bienestar. Si varias alertas aparecen juntas, la revision no debe esperar.',
            riskArea: 'Privacidad Avanzada'
        },
        {
            text: 'Completa correctamente cada frase.',
            type: 'drop_down',
            metadata: {
                sentence: 'En Roblox, el filtro que decide que experiencias puede abrir el menor es la [blank1]. En Minecraft, un entorno mas controlado para jugar con amistades es un [blank2]. Si un caso ya ocurrio, antes de responder con enojo conviene guardar [blank3]. Cuando el juego empieza a desplazar sueno, escuela y actividad fisica, hablamos de uso [blank4].',
                options: {
                    blank1: ['madurez de contenido', 'lista de amistades', 'Family Media Plan'],
                    blank2: ['Realm privado', 'servidor publico', 'mod de Java'],
                    blank3: ['evidencia', 'contrasena', 'gift card'],
                    blank4: ['problematico', 'premium', 'recreativo']
                },
                correctAnswer: {
                    blank1: 'madurez de contenido',
                    blank2: 'Realm privado',
                    blank3: 'evidencia',
                    blank4: 'problematico'
                }
            },
            explanation: 'Este reactivo conecta control parental, configuracion de entorno, respuesta ante incidentes y bienestar digital.',
            riskArea: 'Salud Mental y Fisica'
        },
        {
            text: 'Instruccion: Arrastra cada elemento a la categoria correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Compra de Minecoins por canal oficial',
                    '"No le digas a tus papas"',
                    'Pedir que te ensene como funciona su juego',
                    'Enlace que pide contrasena para recibir Robux',
                    'Marketplace de Minecraft Bedrock',
                    'Revisar promedio semanal de uso y conversar',
                    'Archivo externo poco claro para instalar un mod',
                    'Jugar junto al menor una partida'
                ],
                categories: ['Ruta oficial', 'Senal de riesgo', 'Acompanamiento saludable'],
                correctAnswer: {
                    'Ruta oficial': [
                        'Compra de Minecoins por canal oficial',
                        'Marketplace de Minecraft Bedrock'
                    ],
                    'Senal de riesgo': [
                        '"No le digas a tus papas"',
                        'Enlace que pide contrasena para recibir Robux',
                        'Archivo externo poco claro para instalar un mod'
                    ],
                    'Acompanamiento saludable': [
                        'Pedir que te ensene como funciona su juego',
                        'Revisar promedio semanal de uso y conversar',
                        'Jugar junto al menor una partida'
                    ]
                }
            },
            explanation: 'El curso insiste en esta distincion: oficial no es lo mismo que seguro por costumbre, y acompanar no es lo mismo que vigilar.',
            riskArea: 'Gasto Controlado'
        },
        {
            text: 'Caso integrador: Tu hijo de 10 anos juega Roblox. Un usuario le manda invitaciones frecuentes, le ofrece regalos si pasa a otra app, ya intento comprar varias cosas este mes y ahora te pregunta si puede abrir un enlace para reclamar una recompensa. Cual es la mejor respuesta?',
            type: 'case_study',
            options: [
                { text: 'Permitir el enlace para comprobar si la recompensa es real y solo intervenir si falla.', isCorrect: false },
                { text: 'Bloquear el chat por completo para siempre, pero sin hablar con el menor de lo ocurrido.', isCorrect: false },
                { text: 'Escucharlo, explicarle que el enlace y la salida a otra app son senales de riesgo, no compartir datos ni credenciales, revisar chat/Party/conexiones, mantener el limite de gasto y bloquear o reportar si corresponde.', isCorrect: true },
                { text: 'Decirle que los regalos digitales son normales en Roblox y que tenga mas cuidado la proxima vez.', isCorrect: false }
            ],
            explanation: 'La mejor respuesta integra seguridad social, control de gasto y acompanamiento. No basta con prohibir o confiar: hay que leer la situacion y actuar en varias capas.',
            platform: 'Roblox',
            riskArea: 'Gasto Controlado'
        },
        {
            text: 'Caso integrador: Tu hija juega Minecraft Bedrock en tablet. Quiere entrar a un servidor que vio en redes, ultimamente se duerme tarde por jugar, amanece cansada y se enoja mucho cuando le pides apagar la pantalla. Cual es la mejor respuesta?',
            type: 'case_study',
            options: [
                { text: 'Dejarla entrar al servidor porque Minecraft es mas seguro que Roblox y el problema real es solo el horario.', isCorrect: false },
                { text: 'Quitarle el juego sin explicacion y esperar a que se le pase el enojo.', isCorrect: false },
                { text: 'Revisar la cuenta Microsoft y permisos de multijugador, priorizar entornos mas controlados como Realms o amistades conocidas, mover el juego a un horario mas sano, dejar pantallas fuera del dormitorio y acordar reglas con seguimiento.', isCorrect: true },
                { text: 'Permitir el servidor mientras sus calificaciones no bajen mas y ya despues revisar los permisos.', isCorrect: false }
            ],
            explanation: 'La respuesta correcta une dos planos: configuracion segura del entorno y bienestar digital. El problema no es solo a donde entra, sino como ese juego ya esta afectando su rutina.',
            platform: 'Minecraft',
            riskArea: 'Salud Mental y Fisica'
        }
    ];

    const finalQuiz = await getOrCreateQuiz({
        title: 'Examen Final Integrador: Roblox y Minecraft',
        description: 'Evaluacion final del curso con 9 reactivos mixtos, nivel desafiante y duracion estimada de 15 minutos.',
        scope: 'course',
        refId: courseGames._id,
        scopeModel: 'Course',
        minPassing: 80
    }, finalQuizQuestions);

    courseGames.finalQuizId = finalQuiz._id;
    await courseGames.save();

    console.log('Course 1 final quiz upgraded.');
};
