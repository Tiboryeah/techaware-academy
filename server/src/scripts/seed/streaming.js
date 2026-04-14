module.exports = async function seedModule(context) {
    const { getOrCreateCourse, getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models } = context;
    const { Module, Quiz } = models;

        // --- COURSE 3: PLATAFORMAS DE STREAMING ---
        const courseStreaming = await getOrCreateCourse({
            title: 'Plataformas de Streaming: YouTube y Twitch',
            description: 'Curso práctico para revisar contenido, transmisiones en vivo y riesgos comunes en YouTube y Twitch.',
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
};

