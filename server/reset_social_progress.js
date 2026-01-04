const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Progress = require('./src/models/Progress');
const Course = require('./src/models/Course');

dotenv.config();

const reset = async () => {
    await connectDB();
    const user = await User.findOne();
    const course = await Course.findOne({ title: { $regex: 'Redes Sociales', $options: 'i' } });

    if (!course) {
        console.log("Course not found");
        process.exit();
    }

    // Reset progress
    const result = await Progress.findOneAndDelete({ userId: user._id, courseId: course._id });
    if (result) {
        console.log(`Progress reset for course: ${course.title} (Was: ${Math.round((result.completedLessons.length / 10) * 100)}% complete approx)`);
    } else {
        console.log(`No progress found to reset for: ${course.title}`);
    }

    process.exit();
};

reset();
