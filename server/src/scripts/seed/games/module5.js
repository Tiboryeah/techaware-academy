module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

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

};

