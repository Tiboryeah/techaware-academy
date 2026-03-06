const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Progress = require('./src/models/Progress');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');
const connectDB = require('./src/config/db');

dotenv.config();

const restoreAllProgress = async () => {
    try {
        await connectDB();
        console.log('--- Restaurando Todo el Progreso (Versión Mejorada) ---');

        const courses = await Course.find({});
        const videoCourse = courses.find(c => c.title.includes('Videojuegos'));
        const socialCourse = courses.find(c => c.title.includes('Redes Sociales'));
        const streamingCourse = courses.find(c => c.title.includes('Streaming'));

        const progressRecords = await Progress.find({});
        console.log(`Procesando ${progressRecords.length} registros...`);

        for (let progress of progressRecords) {
            // Mapping Course: If orphaned, map by guessing or leave as is if already correct
            const currentCourse = await Course.findById(progress.courseId);
            let targetCourse = currentCourse;

            if (!currentCourse) {
                // Heurística de IDs fallidos (Legacy IDs que detectamos)
                const cIdStr = progress.courseId.toString();
                if (cIdStr === '692aab3ac38a4cc817b37e3b') targetCourse = videoCourse;
                else if (cIdStr.startsWith('6959')) targetCourse = socialCourse; // Heurística aproximada
                else targetCourse = videoCourse; // Default
            }

            if (targetCourse) {
                progress.courseId = targetCourse._id;

                // Sync Modules: If the modules in the array are orphaned, we MUST replace them
                const validModules = await Module.find({ _id: { $in: progress.completedModules } });

                if (validModules.length < progress.completedModules.length || progress.isCourseCompleted) {
                    console.log(`(+) Sincronizando módulos para usuario ${progress.userId} en curso ${targetCourse.title}`);
                    const newModules = await Module.find({ courseId: targetCourse._id }).sort({ createdAt: 1 });

                    if (progress.isCourseCompleted) {
                        // All modules
                        progress.completedModules = newModules.map(m => m._id);
                    } else if (validModules.length === 0 && progress.completedModules.length > 0) {
                        // Had some progress but all orphaned: maps to first N modules
                        const count = Math.min(progress.completedModules.length, newModules.length);
                        progress.completedModules = newModules.slice(0, count).map(m => m._id);
                    }
                }

                await progress.save();
            }
        }

        console.log('--- Sincronización Finalizada ---');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

restoreAllProgress();
