const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./src/models/User');
const Quiz = require('./src/models/Quiz');
const Attempt = require('./src/models/Attempt');

async function testApiLogic() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const user = await User.findOne({ email: 'admin@example.com' });
        const userId = user._id;

        console.log('Testing diagnostic fetch for user:', userId);

        const diagnosticQuizzes = await Quiz.find({ scope: 'diagnostic' }).select('_id');
        const diagIds = diagnosticQuizzes.map(q => q._id);
        console.log('Diag IDs found in DB:', diagIds);

        const latestDiagnostic = await Attempt.findOne({
            userId: userId,
            quizId: { $in: diagIds }
        }).sort({ createdAt: -1 });

        console.log('Direct find result:', !!latestDiagnostic);
        if (latestDiagnostic) console.log('Direct find score:', latestDiagnostic.score);

        // Fallback check
        const allUserAttempts = await Attempt.find({ userId }).populate('quizId').sort({ createdAt: -1 });
        console.log('Total user attempts populated:', allUserAttempts.length);
        const fbResult = allUserAttempts.find(a => a.quizId && a.quizId.scope === 'diagnostic');
        console.log('Fallback find result:', !!fbResult);
        if (fbResult) console.log('Fallback find score:', fbResult.score);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

testApiLogic();
