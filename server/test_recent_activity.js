const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const Attempt = mongoose.models.Attempt || require('./src/models/Attempt');
        const Quiz = mongoose.models.Quiz || require('./src/models/Quiz');

        const userId = '695993c93cb2af054489eea1';
        const uId = new mongoose.Types.ObjectId(userId);

        const recentAttempts = await Attempt.find({ userId: uId })
            .populate({
                path: 'quizId',
                select: 'title scope module'
            })
            .sort({ createdAt: -1 })
            .limit(5);

        console.log('Recent Attempts Count:', recentAttempts.length);
        console.log('Recent Attempts Data:', JSON.stringify(recentAttempts, null, 2));

        process.exit();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();
