const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Progress = require('./src/models/Progress');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');
const Quiz = require('./src/models/Quiz');
const Attempt = require('./src/models/Attempt');
const connectDB = require('./src/config/db');

dotenv.config();

const restoreProgress = async () => {
    try {
        await connectDB();
        console.log('--- Restaurando Progreso de Usuarios ---');

        // 1. Obtener los nuevos cursos
        const courses = await Course.find({});
        const videoCourse = courses.find(c => c.title.includes('Videojuegos'));
        const socialCourse = courses.find(c => c.title.includes('Redes Sociales'));
        const streamingCourse = courses.find(c => c.title.includes('Streaming'));

        const progressRecords = await Progress.find({});
        console.log(`Encontrados ${progressRecords.length} registros de progreso para migrar.`);

        for (let progress of progressRecords) {
            let targetCourse = null;

            // Intentar identificar el curso original
            // Mapper manual basado en la estructura previa conocida o frecuencia
            // Si el ID viejo es 692aab3ac38a4cc817b37e3b, sabemos que es Videojuegos
            if (progress.courseId.toString() === '692aab3ac38a4cc817b37e3b') {
                targetCourse = videoCourse;
            } else if (socialCourse && progress.courseId.toString().startsWith('6959')) {
                // Heurística para redes sociales o streaming basado en IDs secuenciales de la siembra previa
                targetCourse = socialCourse;
            } else {
                // Default al primero si no sabemos
                targetCourse = videoCourse;
            }

            if (targetCourse) {
                console.log(`(+) Migrando progreso de usuario ${progress.userId} al curso: ${targetCourse.title}`);

                const oldModulesCount = progress.completedModules.length;
                const oldIsCompleted = progress.isCourseCompleted;

                // Actualizar IDs
                progress.courseId = targetCourse._id;

                if (oldIsCompleted) {
                    // Si ya lo terminó, le marcamos todos los módulos nuevos como completados
                    const modules = await Module.find({ courseId: targetCourse._id });
                    progress.completedModules = modules.map(m => m._id);
                    progress.isCourseCompleted = true;
                } else {
                    // Si no lo terminó, intentamos ver si podemos rescatar módulos por Intentos
                    // O simplemente mapear los primeros N módulos del nuevo curso (menos preciso pero mejor que nada)
                    const modules = await Module.find({ courseId: targetCourse._id }).sort({ createdAt: 1 });
                    progress.completedModules = modules.slice(0, oldModulesCount).map(m => m._id);
                }

                await progress.save();
                console.log(`  [OK] Progreso restaurado (${progress.completedModules.length} módulos).`);
            }
        }

        console.log('--- Restauración Finalizada ---');
        process.exit(0);
    } catch (error) {
        console.error('CRITICAL ERROR:', error);
        process.exit(1);
    }
};

restoreProgress();
