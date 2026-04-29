const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const connectDB = require('../config/db');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Module = require('../models/Module');
const Course = require('../models/Course');

dotenv.config({ path: '.env' });

const BACKUP_DIR = path.join(__dirname, '..', '..', 'backups');

const backup = async () => {
    try {
        await connectDB();

        // Create backup directory with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(BACKUP_DIR, `backup_${timestamp}`);
        fs.mkdirSync(backupPath, { recursive: true });

        console.log(`\n📦 Iniciando backup en: ${backupPath}\n`);

        // Backup Lessons
        const lessons = await Lesson.find({}).lean();
        fs.writeFileSync(
            path.join(backupPath, 'lessons.json'),
            JSON.stringify(lessons, null, 2)
        );
        console.log(`✅ lessons.json     → ${lessons.length} documentos`);

        // Backup Quizzes
        const quizzes = await Quiz.find({}).lean();
        fs.writeFileSync(
            path.join(backupPath, 'quizzes.json'),
            JSON.stringify(quizzes, null, 2)
        );
        console.log(`✅ quizzes.json     → ${quizzes.length} documentos`);

        // Backup Questions
        const questions = await Question.find({}).lean();
        fs.writeFileSync(
            path.join(backupPath, 'questions.json'),
            JSON.stringify(questions, null, 2)
        );
        console.log(`✅ questions.json   → ${questions.length} documentos`);

        // Backup Modules (just in case)
        const modules = await Module.find({}).lean();
        fs.writeFileSync(
            path.join(backupPath, 'modules.json'),
            JSON.stringify(modules, null, 2)
        );
        console.log(`✅ modules.json     → ${modules.length} documentos`);

        // Backup Courses (just in case)
        const courses = await Course.find({}).lean();
        fs.writeFileSync(
            path.join(backupPath, 'courses.json'),
            JSON.stringify(courses, null, 2)
        );
        console.log(`✅ courses.json     → ${courses.length} documentos`);

        // Write summary
        const summary = {
            timestamp,
            backupPath,
            counts: {
                lessons: lessons.length,
                quizzes: quizzes.length,
                questions: questions.length,
                modules: modules.length,
                courses: courses.length,
            }
        };
        fs.writeFileSync(
            path.join(backupPath, 'summary.json'),
            JSON.stringify(summary, null, 2)
        );

        console.log(`\n🎉 Backup completo. Carpeta: backups/backup_${timestamp}`);
        console.log('   Puedes proceder con la limpieza de huérfanos.\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error durante backup:', error);
        process.exit(1);
    }
};

backup();
