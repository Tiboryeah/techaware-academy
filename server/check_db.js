const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Attempt = require('./src/models/Attempt');
const Quiz = require('./src/models/Quiz');
const User = require('./src/models/User');

dotenv.config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const diagnosticQuizzes = await Quiz.find({ scope: 'diagnostic' });
        console.log('Diagnostic Quizzes:', diagnosticQuizzes.map(q => ({ id: q._id, title: q.title })));

        const diagIds = diagnosticQuizzes.map(q => q._id);
        const attempts = await Attempt.find({ quizId: { $in: diagIds } }).populate('userId');

        console.log(`Found ${attempts.length} diagnostic attempts:`);
        attempts.forEach(a => {
            console.log(`- User: ${a.userId?.email} | Score: ${a.score} | Date: ${a.createdAt}`);
        });

        const users = await User.find({});
        console.log('All Users in DB:', users.map(u => ({ id: u._id, email: u.email })));

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

check();
