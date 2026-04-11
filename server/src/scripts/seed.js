const dotenv = require('dotenv');
const connectDB = require('../config/db');
const {
    syncAdminUser,
    getOrCreateCourse,
    getOrCreateModule,
    getOrCreateLesson,
    getOrCreateQuiz,
    getOrCreateResource,
    models,
} = require('./seed/helpers');
const seedGamesCourse = require('./seed/games');
const seedSocialCourse = require('./seed/social');
const seedStreamingCourse = require('./seed/streaming');
const seedDiagnosticQuiz = require('./seed/diagnostic');
const seedResources = require('./seed/resources');

dotenv.config();

const context = {
    getOrCreateCourse,
    getOrCreateModule,
    getOrCreateLesson,
    getOrCreateQuiz,
    getOrCreateResource,
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
        await seedResources(context);

        console.log('--- ALL DATA IMPORTED SUCCESSFULLY ---');
        process.exit();
    } catch (error) {
        console.error('SEED ERROR:', error);
        process.exit(1);
    }
};

importData();
