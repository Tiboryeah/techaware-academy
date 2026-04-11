module.exports = async function seedModule(context) {
    const { getOrCreateQuiz, models } = context;
    const { Quiz } = models;

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

};

