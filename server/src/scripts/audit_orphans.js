const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Quiz = require('../models/Quiz');

dotenv.config({ path: '.env' });

const audit = async () => {
    try {
        await connectDB();
        console.log('\n========== AUDITORÍA DE DATOS HUÉRFANOS ==========\n');

        // Cursos publicados
        const publishedCourses = await Course.find({ status: 'published' }).select('_id title');
        const publishedCourseIds = publishedCourses.map(c => c._id);
        console.log(`✅ Cursos publicados: ${publishedCourses.length}`);
        publishedCourses.forEach(c => console.log(`   - ${c.title}`));

        // Módulos válidos (de cursos publicados)
        const validModules = await Module.find({ courseId: { $in: publishedCourseIds } }).select('_id lessonOrder');
        const validModuleIds = validModules.map(m => m._id);
        const referencedLessonIds = new Set(
            validModules.flatMap(m => (m.lessonOrder || []).map(id => id.toString()))
        );

        // Módulos totales vs huérfanos
        const totalModules = await Module.countDocuments();
        const orphanModules = totalModules - validModules.length;
        console.log(`\n📦 Módulos totales en BD:     ${totalModules}`);
        console.log(`   Módulos válidos:            ${validModules.length}`);
        console.log(`   Módulos HUÉRFANOS a borrar: ${orphanModules}`);

        // Lecciones totales vs referenciadas vs huérfanas
        const totalLessons = await Lesson.countDocuments();
        const orphanLessons = await Lesson.countDocuments({ moduleId: { $nin: validModuleIds } });
        console.log(`\n📖 Lecciones totales en BD:     ${totalLessons}`);
        console.log(`   Lecciones referenciadas:     ${referencedLessonIds.size}`);
        console.log(`   Lecciones HUÉRFANAS a borrar: ${orphanLessons}`);

        // Quizzes huérfanos
        const totalQuizzes = await Quiz.countDocuments();
        const orphanQuizzes = await Quiz.countDocuments({
            $or: [
                { scope: 'course', refId: { $nin: publishedCourseIds } },
                { scope: 'module', refId: { $nin: validModuleIds } }
            ]
        });
        console.log(`\n📝 Quizzes totales en BD:     ${totalQuizzes}`);
        console.log(`   Quizzes HUÉRFANOS a borrar: ${orphanQuizzes}`);

        console.log('\n==================================================');
        console.log('⚠️  Este script solo audita. No borró nada.');
        console.log('==================================================\n');

        process.exit(0);
    } catch (error) {
        console.error('Error durante auditoría:', error);
        process.exit(1);
    }
};

audit();
