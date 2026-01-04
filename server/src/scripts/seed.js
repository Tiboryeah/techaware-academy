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
                passwordHash: '123456',
                role: 'admin',
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
                    type: 'single_choice',
                    options: qData.options,
                    platform: qData.platform
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
        });

        // WIPE OLD MODULES AND QUIZZES FOR THIS COURSE TO ENSURE CLEAN REPLACEMENT
        await Module.deleteMany({ courseId: courseGames._id });
        await Quiz.deleteMany({ refId: courseGames._id, scope: 'course' });
        console.log('  (-) Old modules and Course Quiz for Course 1 wiped for clean expansion.');

        // --- MODULE 1: Roblox: Seguridad y Control Parental ---
        const mod1 = await getOrCreateModule(courseGames._id, {
            title: 'Roblox: Seguridad y Control Parental',
            description: 'Configuración técnica y supervisión remota de alta precisión.'
        });
        await Quiz.deleteMany({ refId: mod1._id, scope: 'module' });

        const l1_1 = await getOrCreateLesson(mod1._id, courseGames._id, {
            title: 'Sincronización Familiar (Remote Management)',
            content: `# Gestión Parental Remota\n\nRoblox permite ahora gestionar la seguridad desde tu propio dispositivo, vinculando tu cuenta con la de tu hijo.\n\n## Pasos Críticos para Padres\n1.  **Vínculo QR**: En tu sección de "Controles Parentales", añade un hijo y escanea su código.\n2.  **Visibilidad en Tiempo Real**: Podrás monitorear su lista de amigos y el tiempo de juego diario sin acceder a su móvil.\n3.  **Restricciones Remotas**: Si decides que es hora de dormir, puedes bloquear el acceso o cambiar los permisos de chat instantáneamente.`,
            type: 'article', duration: 7
        });

        const l1_2 = await getOrCreateLesson(mod1._id, courseGames._id, {
            title: 'Privacidad, Chat y Clasificación de Contenido',
            content: `# Filtros y Clasificaciones\n\nEntiende cómo Roblox protege a los menores según su edad y el tipo de juego.\n\n## Restricciones Automáticas (<13 años)\n*   **Mensajes Directos**: Bloqueados por defecto fuera de las experiencias.\n*   **Filtros de Chat**: Censura automática de datos personales (teléfonos, direcciones) y lenguaje inapropiado.\n\n## Etiquetas de Madurez\n*   **Mínimo / Leve (9+)**: Recomendado para niños pequeños.\n*   **Moderado (13+)**: Puede contener violencia más realista o sangre ligera.\n*   **Restringido (17+)**: Requiere verificación de identidad oficial (DNI/Pasaporte).`,
            type: 'article', duration: 8
        });

        const l1_3 = await getOrCreateLesson(mod1._id, courseGames._id, {
            title: 'Cómo Reportar Experiencias y Jugadores',
            content: `# Actuando ante la Toxicidad\n\nNo basta con configurar la cuenta; hay que saber denunciar.\n\n## Herramientas de Reporte\n*   **Menú Esc (Escape)**: Dentro de cualquier juego, selecciona la pestaña "Reportar".\n*   **Captura de Evidencias**: Roblox guarda logs de chat, pero tomar una captura ayuda si el acoso es visual (griefing).\n*   **Bloqueo**: Enseña a tu hijo que bloquear es la primera línea de defensa. Una vez bloqueado, el usuario no podrá ver su perfil ni sus juegos.`,
            type: 'article', duration: 6
        });

        const l1_v = await getOrCreateLesson(mod1._id, courseGames._id, {
            title: 'Video: Guía Maestra de Configuración Roblox',
            content: 'Tutorial paso a paso de los nuevos menús de 2025.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=4-V7vXkHkf0', duration: 5
        });

        mod1.lessonOrder = [l1_1._id, l1_2._id, l1_3._id, l1_v._id];
        await mod1.save();

        const q1 = await getOrCreateQuiz({
            title: 'Examen Módulo 1: Seguridad Roblox',
            description: 'Demuestra tu dominio técnico sobre los controles de Roblox y la sincronización familiar.',
            scope: 'module',
            refId: mod1._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Qué sucede si un menor de 13 años intenta enviar su número de teléfono o dirección física en el chat de Roblox?', options: [{ text: 'El sistema filtra el mensaje automáticamente reemplazándolo con hashtags (####).', isCorrect: true }, { text: 'El mensaje se envía pero llega con una advertencia roja.', isCorrect: false }, { text: 'El mensaje solo lo puede ver el padre si tiene vinculada la cuenta.', isCorrect: false }, { text: 'Roblox bloquea la cuenta del niño permanentemente.', isCorrect: false }] },
            { text: '¿Cuál es la función principal del "PIN de Cuenta" en la configuración de seguridad?', options: [{ text: 'Bloquear el acceso a la configuración para evitar que el niño revierta los ajustes parentales.', isCorrect: true }, { text: 'Es la contraseña necesaria para entrar a jugar cualquier experiencia.', isCorrect: false }, { text: 'Sirve para retirar dinero real de la cuenta de Robux.', isCorrect: false }, { text: 'Permite chatear con usuarios de otros países.', isCorrect: false }] },
            { text: 'Si activas el "Límite de Madurez" en un nivel "Leve (9+)", ¿qué ocurre con los juegos etiquetados como "Moderados (13+)"?', options: [{ text: 'Aparecen bloqueados y el niño no puede entrar a ellos.', isCorrect: true }, { text: 'Se pueden jugar pero sin sonido.', isCorrect: false }, { text: 'El niño puede entrar si un amigo de 13 años lo invita.', isCorrect: false }, { text: 'Roblox pide la tarjeta de crédito del padre cada vez que entra.', isCorrect: false }] },
            { text: '¿Cómo se completa técnicamente el proceso de "Sincronización Familiar" según las actualizaciones de finales de 2024?', options: [{ text: 'Escaneando un código QR desde el dispositivo del padre directamente en la cuenta del hijo.', isCorrect: true }, { text: 'Enviando un correo electrónico a soporte técnico de Roblox.', isCorrect: false }, { text: 'Compartiendo la misma contraseña entre padre e hijo.', isCorrect: false }, { text: 'Instalando una aplicación externa de control parental.', isCorrect: false }] }
        ]);
        mod1.quizId = q1._id;
        await mod1.save();

        // --- MODULE 2: Minecraft: Servidores y Reporte de Jugadores ---
        const mod2 = await getOrCreateModule(courseGames._id, {
            title: 'Minecraft: Servidores y Reporte de Jugadores',
            description: 'Navegando de forma segura en mundos compartidos y privados.'
        });
        await Quiz.deleteMany({ refId: mod2._id, scope: 'module' });

        const l2_1 = await getOrCreateLesson(mod2._id, courseGames._id, {
            title: 'Minecraft Realms: El Entorno más Seguro',
            content: `# Diferenciando los tipos de Multijugador\n\n## Minecraft Realms\nSon servidores privados gestionados por Microsoft. Solo pueden entrar personas invitadas por el dueño por su nombre de usuario (Gamertag). Es ideal para niños pequeños.\n\n## Servidores Públicos (Third Party)\nServidores masivos con reglas propias. Si tu hijo los usa, asegúrate de que estén filtrados en la "Lista Oficial" de servidores verificados por Mojang.`,
            type: 'article', duration: 6
        });

        const l2_2 = await getOrCreateLesson(mod2._id, courseGames._id, {
            title: 'Microsoft Family Safety y Reportes Humanos',
            content: `# Supervisión en Microsoft\n\nMinecraft depende de tu cuenta de Microsoft/Xbox. Usa la Xbox Family App para:\n\n*   **Multiplayer**: Activar o desactivar la capacidad de unirse a mundos online.\n*   **Reportes de Chat**: Minecraft ahora permite denunciar mensajes de chat específicos. Estos son revisados por moderadores humanos que pueden banear al usuario de todo el ecosistema de Minecraft.\n*   **Whitelisting**: En servidores privados, asegúrate de tener una "lista blanca" para que nadie no deseado pueda entrar.`,
            type: 'article', duration: 7
        });

        const l2_3 = await getOrCreateLesson(mod2._id, courseGames._id, {
            title: 'Peligros de los "Mods" no oficiales y Malware',
            content: `# Especial Cuidado con las Modificaciones\n\nLos niños suelen querer "Mods" para cambiar el juego. Esto es un riesgo técnico alto.\n\n## Riesgos comunes\n*   **Malware**: Archivos .exe o .jar infectados descargados de sitios web desconocidos.\n*   **Robo de Cuentas**: Mods que "roban" el token de sesión.\n\n## Recomendación\nUsa solo fuentes confiables como **CurseForge** o el **Marketplace oficial** (Bedrock) y nunca descargues mods de enlaces que un desconocido envíe por chat o Discord.`,
            type: 'article', duration: 8
        });

        const l2_v = await getOrCreateLesson(mod2._id, courseGames._id, {
            title: 'Video: Configuración de Familia Microsoft',
            content: 'Cómo usar la Xbox Family App para proteger Minecraft.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=6NB8NAFwis4', duration: 4
        });

        mod2.lessonOrder = [l2_1._id, l2_2._id, l2_3._id, l2_v._id];
        await mod2.save();

        const q2 = await getOrCreateQuiz({
            title: 'Examen Módulo 2: Seguridad Minecraft',
            description: 'Prueba tus conocimientos sobre Realms, seguridad de mods y reportes en Bedrock/Java.',
            scope: 'module',
            refId: mod2._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Cuál es la diferencia fundamental de seguridad entre un "Realm" y un "Servidor Público" masivo?', options: [{ text: 'En los Realms solo entran usuarios invitados manualmente por el dueño de la cuenta.', isCorrect: true }, { text: 'Los Realms son gratuitos y los servidores públicos siempre son de pago.', isCorrect: false }, { text: 'Los servidores públicos no tienen chat y los Realms sí.', isCorrect: false }, { text: 'No hay ninguna diferencia técnica real.', isCorrect: false }] },
            { text: 'En el nuevo sistema de seguridad de Microsoft/Xbox, ¿qué acción permite el "Player Reporting"?', options: [{ text: 'Seleccionar mensajes específicos del chat como evidencia para que moderadores humanos los revisen.', isCorrect: true }, { text: 'Borrar automáticamente la cuenta del otro jugador sin revisión.', isCorrect: false }, { text: 'Ver la ubicación física (GPS) del otro jugador.', isCorrect: false }, { text: 'Expulsar a un jugador solo si tienes el nivel de experiencia más alto.', isCorrect: false }] },
            { text: '¿Por qué descargar "Mods" de enlaces enviados por extraños en Discord es un riesgo crítico?', options: [{ text: 'Pueden contener "Session Stealers" que roban el token de acceso a la cuenta de Minecraft sin necesidad de contraseña.', isCorrect: true }, { text: 'Porque ocupan mucho espacio en el disco duro.', isCorrect: false }, { text: 'Porque hacen que el juego sea más aburrido.', isCorrect: false }, { text: 'Porque Microsoft cobrará una multa por cada mod descargado.', isCorrect: false }] },
            { text: '¿Qué ajuste en la Xbox Family App es vital para evitar que tu hijo hable con extraños en mundos multijugador?', options: [{ text: 'Desactivar "Communication with others" o limitarlo a "Friends only".', isCorrect: true }, { text: 'Bajar el volumen del juego a cero.', isCorrect: false }, { text: 'Cambiar el nombre del personaje (Gamertag).', isCorrect: false }, { text: 'Bloquear la descarga de actualizaciones del juego.', isCorrect: false }] }
        ]);
        mod2.quizId = q2._id;
        await mod2.save();

        // --- MODULE 3: Economía Digital y Estafas ---
        const mod3 = await getOrCreateModule(courseGames._id, {
            title: 'Economy Digital: Compras y Estafas',
            description: 'Gestión de Robux, transacciones y prevención de fraudes.'
        });
        await Quiz.deleteMany({ refId: mod3._id, scope: 'module' });

        const l3_1 = await getOrCreateLesson(mod3._id, courseGames._id, {
            title: 'La Psicología del "Gasto Hormiga" en juegos',
            content: `# Entendiendo el Micro-gasto\n\nJuegos como Roblox y Minecraft usan monedas virtuales (Robux y Minecoins) para distanciar emocionalmente al usuario del dinero real.\n\n## Qué hacer\n*   **PIN de Compra**: Nunca dejes tu tarjeta vinculada sin contraseña. Configura siempre una solicitud de clave para cada compra.\n*   **Presupuesto mensual**: Pacta con tu hijo una cantidad fija y no la excedas. Enséñale que una vez agotada, no habrá más hasta el mes siguiente.`,
            type: 'article', duration: 6
        });

        const l3_2 = await getOrCreateLesson(mod3._id, courseGames._id, {
            title: 'Identificando sitios de "Robux Gratis" (Phishing)',
            content: `# Anatomía de una Estafa\n\nLos estafadores crean sitios que se parecen a Roblox para robar la contraseña.\n\n## Señales de Alerta\n1.  **Promesa de "Generadores"**: No existen sistemas para fabricar Robux gratis.\n2.  **Solicitud de Contraseña**: Ningún sorteo oficial te pedirá jamás tu contraseña.\n3.  **Encuestas infinitas**: Solo buscan recolectar datos personales o instalar malware.`,
            type: 'article', duration: 7
        });

        mod3.lessonOrder = [l3_1._id, l3_2._id];
        await mod3.save();

        const q3 = await getOrCreateQuiz({
            title: 'Examen Módulo 3: Economía Digital',
            description: 'Pon a prueba tu capacidad para identificar estafas de Robux gratis y gestionar el gasto impulsivo.',
            scope: 'module',
            refId: mod3._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Qué técnica de diseño utilizan los juegos para fomentar el gasto impulsivo en menores?', options: [{ text: 'El distanciamiento emocional mediante monedas virtuales que ocultan el valor real del dinero.', isCorrect: true }, { text: 'Haciendo que los botones de compra sean invisibles.', isCorrect: false }, { text: 'Enviando facturas físicas a los niños por correo.', isCorrect: false }, { text: 'Regalando dinero real al principio para crear hábito.', isCorrect: false }] },
            { text: 'Has detectado que tu hijo entró a un sitio web de "Robux Gratis" y puso su usuario. ¿Cuál es la primera acción de seguridad recomendada?', options: [{ text: 'Cambiar la contraseña inmediatamente y activar la Verificación en Dos Pasos (2FA) si no estaba activa.', isCorrect: true }, { text: 'Llamar a la policía para que cierren esa página web.', isCorrect: false }, { text: 'Borrar el juego del teléfono para siempre.', isCorrect: false }, { text: 'Comprar Robux reales para compensar la posible pérdida.', isCorrect: false }] },
            { text: '¿Por qué la Verificación en Dos Pasos (2FA) es vital incluso si tu hijo usa una contraseña "segura"?', options: [{ text: 'Porque protege la cuenta incluso si la contraseña es robada mediante phishing o malware.', isCorrect: true }, { text: 'Porque hace que las compras de Robux sean un 10% más baratas.', isCorrect: false }, { text: 'Porque permite jugar a más de 30 FPS.', isCorrect: false }, { text: 'Porque es un requisito legal en todos los países.', isCorrect: false }] }
        ]);
        mod3.quizId = q3._id;
        await mod3.save();

        // --- MODULE 4: Bienestar Digital y Tiempo Saludable ---
        const mod4 = await getOrCreateModule(courseGames._id, {
            title: 'Bienestar Digital y Tiempo Saludable',
            description: 'Identificación de adicciones y salud física del jugador.'
        });
        await Quiz.deleteMany({ refId: mod4._id, scope: 'module' });

        const l4_1 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Señales de Alerta de Adicción Digital',
            content: `# ¿Cuándo deja de ser un hobby?\n\nObserva estos cambios de comportamiento en tu hijo:\n\n*   **Irritabilidad**: Cambios de humor agresivos cuando se le pide que deje de jugar.\n*   **Abandono de Intereses**: Deja de lado deportes, amigos reales o estudios.\n*   **Alteración del Sueño**: Juega a escondidas por la noche.\n*   **Uso como Evasión**: Juega compulsivamente cuando tiene problemas emocionales o escolares.`,
            type: 'article', duration: 6
        });

        const l4_2 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Higiene Postural y Fatiga Visual',
            content: `# El Cuerpo del Gamer\n\nPasar horas en la misma posición afecta al desarrollo físico.\n\n## Consejos de Oro\n*   **La Regla 20-20-20**: Cada 20 minutos, mirar algo a 20 pies (6 metros) de distancia durante 20 segundos para relajar la vista.\n*   **Ergonomía**: La pantalla debe estar a la altura de los ojos. Evita que jueguen en el suelo o en posiciones encorvadas por tiempo prolongado.\n*   **Luz Ambiental**: Nunca permitas que jueguen a oscuras; la fatiga visual aumenta drásticamente.`,
            type: 'article', duration: 7
        });

        mod4.lessonOrder = [l4_1._id, l4_2._id];
        await mod4.save();

        const q4 = await getOrCreateQuiz({
            title: 'Examen Módulo 4: Tiempo y Salud',
            description: 'Evalúa si sabes identificar señales de fatiga visual y patrones de dependencia digital.',
            scope: 'module',
            refId: mod4._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Cuál es el indicador más significativo de que un niño está pasando de un uso recreativo a uno problemático/adicto?', options: [{ text: 'El abandono de actividades que antes disfrutaba (deportes, amigos) y la irritabilidad extrema si no puede jugar.', isCorrect: true }, { text: 'Jugar más de un juego diferente en la misma tarde.', isCorrect: false }, { text: 'Aprender términos técnicos sobre hardware de PC.', isCorrect: false }, { text: 'Ver videos de otros jugadores en YouTube.', isCorrect: false }] },
            { text: 'La regla visual "20-20-20" tiene como objetivo principal prevenir:', options: [{ text: 'La fatiga visual y el síndrome del ojo seco causado por el parpadeo reducido ante pantallas.', isCorrect: true }, { text: 'Que el niño se quede dormido durante el día.', isCorrect: false }, { text: 'Que la batería de la tablet se descargue demasiado rápido.', isCorrect: false }, { text: 'El mareo causado por juegos de realidad virtual.', isCorrect: false }] },
            { text: '¿Qué factor ambiental empeora drásticamente la salud visual de un niño mientras juega?', options: [{ text: 'Jugar en una habitación completamente a oscuras con el brillo de la pantalla al máximo.', isCorrect: true }, { text: 'Jugar con la ventana abierta para que entre aire.', isCorrect: false }, { text: 'Usar auriculares de buena calidad.', isCorrect: false }, { text: 'Tener una silla con respaldo ergonómico.', isCorrect: false }] }
        ]);
        mod4.quizId = q4._id;
        await mod4.save();

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
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
