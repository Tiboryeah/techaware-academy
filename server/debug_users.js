const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./src/models/User');
const Progress = require('./src/models/Progress');
const Attempt = require('./src/models/Attempt');
const Quiz = require('./src/models/Quiz');

async function debug() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('--- DB DEBUG ---');

        const users = await User.find({});
        console.log('Total Users:', users.length);

        for (const u of users) {
            console.log(`User: ${u.name} (${u.email}) | ID: ${u._id}`);

            const diagQuizzes = await Quiz.find({ scope: 'diagnostic' }).select('_id');
            const diagIds = diagQuizzes.map(q => q._id);

            const latestDiag = await Attempt.findOne({
                userId: u._id,
                quizId: { $in: diagIds }
            }).sort({ createdAt: -1 });

            if (latestDiag) {
                console.log(`  -> Diagnostic Found: Score ${latestDiag.score} | Date: ${latestDiag.createdAt}`);
            } else {
                // Fallback check
                const allUserAttempts = await Attempt.find({ userId: u._id }).populate('quizId');
                const fb = allUserAttempts.find(a => a.quizId && a.quizId.scope === 'diagnostic');
                if (fb) {
                    console.log(`  -> Diagnostic Found (Fallback): Score ${fb.score} | Attempt ID: ${fb._id}`);
                } else {
                    console.log('  -> NO DIAGNOSTIC FOUND');
                }
            }

            const progress = await Progress.find({ userId: u._id });
            console.log(`  -> Progress Records: ${progress.length}`);
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

debug();
