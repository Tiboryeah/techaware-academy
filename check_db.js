const mongoose = require('mongoose');
const Attempt = require('./server/src/models/Attempt');
const Quiz = require('./server/src/models/Quiz');
const User = require('./server/src/models/User');

const check = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/sistema_reporte');
        console.log('Connected to DB');

        const user = await User.findOne({ email: 'admin@test.com' }); // Assuming this is the test user
        if (!user) {
            console.log('User not found');
            return;
        }

        const diagnosticQuiz = await Quiz.findOne({ scope: 'diagnostic' });
        console.log('Diagnostic Quiz ID:', diagnosticQuiz?._id);

        const attempts = await Attempt.find({ userId: user._id }).populate('quizId');
        console.log(`Found ${attempts.length} total attempts for user ${user.email}`);

        attempts.forEach(a => {
            console.log(`- Quiz: ${a.quizId?.title} (Scope: ${a.quizId?.scope}) | Score: ${a.score} | Date: ${a.createdAt}`);
        });

        const diagnosticAttempt = await Attempt.findOne({ userId: user._id, quizId: diagnosticQuiz?._id }).sort({ createdAt: -1 });
        console.log('Latest Diagnostic Attempt Score:', diagnosticAttempt?.score);

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

check();
