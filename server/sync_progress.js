const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Progress = require('./src/models/Progress');
const Module = require('./src/models/Module');
const Course = require('./src/models/Course');
const connectDB = require('./src/config/db');

dotenv.config();

const syncProgress = async () => {
    try {
        await connectDB();
        console.log('--- Iniciando Sincronización de Progreso ---');

        const allProgress = await Progress.find({});
        console.log(`Encontrados ${allProgress.length} registros de progreso.`);

        for (let progress of allProgress) {
            console.log(`Procesando progreso del usuario: ${progress.userId}`);

            // 1. Verificar si el curso existe
            const course = await Course.findById(progress.courseId);
            if (!course) {
                console.log(`  [!] Curso ${progress.courseId} no encontrado. Intentando buscar por título equivalente...`);
                // Aquí podríamos intentar buscar por título si supiéramos cuál es, 
                // pero si el ID del curso no cambió, esto no hace falta.
                continue;
            }

            // 2. Mapear módulos completados (que ahora tienen IDs nuevos)
            // Como no sabemos los nombres de los módulos antiguos, 
            // la mejor apuesta es ver si hay otros usuarios con el mismo curso
            // O simplemente dar por hecho que si completó el curso, completó todos los módulos actuales.

            if (progress.isCourseCompleted) {
                console.log(`  (.) El curso estaba marcado como completado. Sincronizando módulos actuales...`);
                const currentModules = await Module.find({ courseId: course._id });
                progress.completedModules = currentModules.map(m => m._id);
            } else {
                // Si no terminó el curso, es difícil saber qué módulos eran sin los IDs viejos.
                // Podríamos intentar cruzar con los Intentos (Attempts) que tengan nota aprobatoria 
                // e intentar identificar el módulo por el título del Quiz del intento.
                const Attempt = require('./src/models/Attempt');
                const Quiz = require('./src/models/Quiz');
                const attempts = await Attempt.find({ userId: progress.userId, passed: true });

                for (let attempt of attempts) {
                    const quiz = await Quiz.findById(attempt.quizId);
                    if (quiz && quiz.scope === 'module') {
                        // El quiz del intento es de un módulo.
                        if (!progress.completedModules.includes(quiz.refId)) {
                            progress.completedModules.push(quiz.refId);
                            console.log(`  (+) Restaurado progreso de módulo desde intento: ${quiz.title}`);
                        }
                    }
                }
            }

            await progress.save();
        }

        console.log('--- Sincronización de Progreso Finalizada ---');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

syncProgress();
