module.exports = async function seedModule(context) {
    const { getOrCreateCourse, getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models } = context;
    const { Module, Quiz } = models;

        // --- COURSE 2: REDES SOCIALES ---
        const courseSocial = await getOrCreateCourse({
            title: 'Redes Sociales: TikTok, Discord e Instagram',
            description: 'Curso práctico para entender mejor la privacidad, los retos virales y la convivencia en redes sociales.',
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
};

