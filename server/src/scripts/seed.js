const dotenv = require('dotenv');
const connectDB = require('../config/db');
const {
    syncAdminUser,
    getOrCreateCourse,
    getOrCreateModule,
    getOrCreateLesson,
    getOrCreateQuiz,
    models,
} = require('./seed/helpers');
const seedGamesCourse = require('./seed/games');
const seedSocialCourse = require('./seed/social');
const seedStreamingCourse = require('./seed/streaming');
const seedDiagnosticQuiz = require('./seed/diagnostic');

dotenv.config();

const context = {
    getOrCreateCourse,
    getOrCreateModule,
    getOrCreateLesson,
    getOrCreateQuiz,
    models,
};

const importData = async () => {
    try {
        await connectDB();
        console.log('Synchronizing Data (Clean State)...');

        await syncAdminUser();
        await seedGamesCourse(context);
        await seedSocialCourse(context);
        await seedStreamingCourse(context);
        await seedDiagnosticQuiz(context);

        console.log('--- ALL DATA IMPORTED SUCCESSFULLY ---');
        process.exit();
    } catch (error) {
        console.error('SEED ERROR:', error);
        process.exit(1);
    }
};

importData();
