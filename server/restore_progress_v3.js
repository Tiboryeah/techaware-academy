const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Progress = require('./src/models/Progress');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');
const Lesson = require('./src/models/Lesson');
const connectDB = require('./src/config/db');

dotenv.config();

const restoreAllProgressV3 = async () => {
    try {
        await connectDB();
        console.log('--- Restaurando Todo el Progreso (Versión V3 - Con Lecciones) ---');

        const courses = await Course.find({});
        const videoCourse = courses.find(c => c.title.includes('Videojuegos'));
        const socialCourse = courses.find(c => c.title.includes('Redes Sociales'));
        const streamingCourse = courses.find(c => c.title.includes('Streaming'));

        const progressRecords = await Progress.find({});
        console.log(`Procesando ${progressRecords.length} registros...`);

        for (let progress of progressRecords) {
            const currentCourse = await Course.findById(progress.courseId);
            let targetCourse = currentCourse;

            if (!currentCourse) {
                const cIdStr = progress.courseId.toString();
                if (cIdStr === '692aab3ac38a4cc817b37e3b') targetCourse = videoCourse;
                else if (cIdStr.startsWith('6959')) targetCourse = socialCourse;
                else targetCourse = videoCourse;
            }

            if (targetCourse) {
                progress.courseId = targetCourse._id;

                // 1. Sync Modules
                const validModules = await Module.find({ _id: { $in: progress.completedModules } });
                const newModules = await Module.find({ courseId: targetCourse._id }).sort({ createdAt: 1 });

                if (progress.isCourseCompleted) {
                    progress.completedModules = newModules.map(m => m._id);
                } else if (validModules.length < progress.completedModules.length) {
                    const count = Math.max(progress.completedModules.length, validModules.length);
                    progress.completedModules = newModules.slice(0, count).map(m => m._id);
                }

                // 2. Sync Lessons (CRITICAL)
                // If lessons are orphaned, they won't count in summary. 
                // We map based on the count of completed lessons relative to the new course structure.
                const validLessons = await Lesson.find({ _id: { $in: progress.completedLessons } });
                if (validLessons.length < progress.completedLessons.length || progress.isCourseCompleted) {
                    const newLessons = await Lesson.find({ courseId: targetCourse._id }).sort({ createdAt: 1 });

                    if (progress.isCourseCompleted) {
                        progress.completedLessons = newLessons.map(l => l._id);
                    } else if (progress.completedLessons.length > 0) {
                        const count = Math.min(progress.completedLessons.length, newLessons.length);
                        progress.completedLessons = newLessons.slice(0, count).map(l => l._id);
                    }
                }

                await progress.save();
            }
        }

        // 3. Clean duplicates (Keep one per user/course)
        console.log('--- Limpiando duplicados ---');
        const all = await Progress.find({}).sort({ updatedAt: -1 });
        const seen = new Set();
        for (let p of all) {
            const key = `${p.userId}-${p.courseId}`;
            if (seen.has(key)) {
                console.log(`  [!] Borrando duplicado para usuario ${p.userId}`);
                await Progress.deleteOne({ _id: p._id });
            } else {
                seen.add(key);
            }
        }

        console.log('--- Sincronización V3 Finalizada ---');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

restoreAllProgressV3();
