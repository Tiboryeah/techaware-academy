module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

        // --- MODULE 6. Bienestar digital y acompañamiento parental — 30 min ---
        const mod6 = await getOrCreateModule(courseGames._id, {
            title: 'Módulo 6: Bienestar digital y acompañamiento parental',
            description: 'Salud mental y relación familiar en el juego.',
            duration: '30 min'
        });
        await Quiz.deleteMany({ refId: mod6._id, scope: 'module' });

        const l6_1 = await getOrCreateLesson(mod6._id, courseGames._id, {
            title: 'Artículo 1: Tiempo de juego, sueño, escuela y señales de uso problemático',
            content: `# Equilibrio Digital\n\nAprende a balancear el tiempo de juego con las responsabilidades diarias y el descanso.`,
            type: 'article', duration: 5
        });

        const l6_2 = await getOrCreateLesson(mod6._id, courseGames._id, {
            title: 'Video 1: Cómo poner reglas claras sin pelear con el menor',
            content: 'Estrategias de comunicación para límites saludables.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder11', duration: 6
        });

        const l6_3 = await getOrCreateLesson(mod6._id, courseGames._id, {
            title: 'Artículo 2: Cómo acompañar, conversar y jugar junto al hijo',
            content: `# Juego Compartido\n\nLa mejor seguridad es el acompañamiento. Involúcrate en sus mundos digitales.`,
            type: 'article', duration: 5
        });

        const l6_4 = await getOrCreateLesson(mod6._id, courseGames._id, {
            title: 'Video 2: Cómo crear un acuerdo familiar de juego',
            content: 'Crea un contrato de convivencia digital en familia.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder12', duration: 6
        });

        mod6.lessonOrder = [l6_1._id, l6_2._id, l6_3._id, l6_4._id];
        await mod6.save();

        const q6 = await getOrCreateQuiz({
            title: 'Mini examen: Bienestar',
            description: 'Fomenta un ambiente saludable en el hogar.',
            scope: 'module',
            refId: mod6._id,
            scopeModel: 'Module'
        }, [
            { text: '¿Cuál es la mejor forma de proteger a un menor en línea?', options: [{ text: 'El acompañamiento y la comunicación constante.', isCorrect: true }, { text: 'Prohibirle jugar.', isCorrect: false }] }
        ]);
        mod6.quizId = q6._id;
        await mod6.save();

};

