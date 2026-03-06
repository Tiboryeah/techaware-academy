const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Progress = require('./src/models/Progress');
const Module = require('./src/models/Module');
const connectDB = require('./src/config/db');

dotenv.config();

const checkProgress = async () => {
    try {
        await connectDB();
        console.log('--- Comprobando Integridad de Progreso ---');

        const allProgress = await Progress.find({}).limit(5);
        for (let record of allProgress) {
            console.log(`\nUsuario: ${record.userId}`);
            console.log(`Curso: ${record.courseId}`);
            console.log(`Terminado: ${record.isCourseCompleted}`);
            console.log(`IDs en Progreso: ${record.completedModules.length}`);

            const existingInDB = await Module.find({ _id: { $in: record.completedModules } });
            console.log(`Encontrados en DB: ${existingInDB.length}`);

            if (record.completedModules.length > 0 && existingInDB.length === 0) {
                console.warn('  ⚠️ PROGRESO HUÉRFANO (Los módulos ya no existen en DB)');
            }
        }
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkProgress();
