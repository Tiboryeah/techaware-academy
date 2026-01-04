const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Attempt = require('./src/models/Attempt');
const Quiz = require('./src/models/Quiz');

dotenv.config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const diagnosticQuizzes = await Quiz.find({ scope: 'diagnostic' });
        const diagIds = diagnosticQuizzes.map(q => q._id.toString());
        console.log('Diagnostic Quiz IDs in DB:', diagIds);

        const attempts = await Attempt.find({}).select('quizId userId score');
        console.log(`Checking ${attempts.length} total attempts in DB:`);
        attempts.forEach(a => {
            const isDiag = diagIds.includes(a.quizId.toString());
            console.log(`- Attempt ID: ${a._id} | QuizID: ${a.quizId} | IsDiag: ${isDiag} | Score: ${a.score} | UserID: ${a.userId}`);
        });

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

check();
