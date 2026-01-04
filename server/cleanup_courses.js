const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');
const Lesson = require('./src/models/Lesson');
const Quiz = require('./src/models/Quiz');
const Question = require('./src/models/Question');

dotenv.config();
connectDB();

const cleanOldData = async () => {
    try {
        console.log('Cleaning up old course structures for a clean re-seed...');

        const titlesToDelete = [
            'Chat Seguro y Privacidad',
            'Compras Seguras y Estafas',
            'Tiempo Saludable de Juego',
            'Ciberacoso y Privacidad',
            'Contenido Inapropiado',
            'Bienestar Digital',
            'TikTok y Seguridad',
            'Roblox: Seguridad y Chat',
            'Minecraft: Servidores y Ética',
            'Instagram: Privacidad y Filtros',
            'Discord: Servidores y Seguridad',
            'Ciberacoso y Bienestar',
            'Moderación de Contenido',
            'Fraudes y Donaciones Falsas',
            'Tiempo en Pantalla',
            'Moderación en YouTube',
            'Twitch y Riesgos de Chat'
        ];

        // Delete Modules and cascade to lessons/quizzes
        const modules = await Module.find({ title: { $in: titlesToDelete } });
        for (const mod of modules) {
            console.log(`Deleting module: ${mod.title}`);
            await Lesson.deleteMany({ moduleId: mod._id });
            if (mod.quizId) {
                await Question.deleteMany({ quizId: mod.quizId });
                await Quiz.deleteOne({ _id: mod.quizId });
            }
            await Module.deleteOne({ _id: mod._id });
        }

        console.log('Cleanup complete.');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

cleanOldData();
