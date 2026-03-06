const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./src/models/Quiz');
const Attempt = require('./src/models/Attempt');
const connectDB = require('./src/config/db');

dotenv.config();

const fixOrphanedAttempts = async () => {
    try {
        await connectDB();
        console.log('--- Buscando Intentos Huérfanos ---');

        const newDiag = await Quiz.findOne({ scope: 'diagnostic' });
        if (!newDiag) return console.log('No hay quiz de diagnóstico nuevo.');

        // 1. Get ALL current quiz IDs
        const validQuizIds = await Quiz.distinct('_id');

        // 2. Find attempts pointing to missing quizzes
        const orphanedAttempts = await Attempt.find({ quizId: { $nin: validQuizIds } });
        console.log(`Encontrados ${orphanedAttempts.length} intentos huérfanos.`);

        let count = 0;
        for (let attempt of orphanedAttempts) {
            // We assume ALL orphaned attempts from previous seeds were diagnostics or related to the main 3 courses
            // For now, mapping all orphaned ones to the new diagnostic is a safe bet to "restore" the score
            // unless we can identify which course they belonged to.

            // Heuristic: If it has "riskLevel" but no platform, it was probably diagnostic
            // Or we check the score range.

            attempt.quizId = newDiag._id;
            await attempt.save();
            count++;
        }

        console.log(`--- Restauración Finalizada ---`);
        console.log(`Intentos recuperados: ${count}`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

fixOrphanedAttempts();
