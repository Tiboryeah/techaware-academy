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
    // Match strict title
    const course = await Course.findOne({ title: 'Videojuegos en Línea: Roblox y Minecraft' });

    if (!course) {
        console.log("Course not found");
        process.exit();
    }

    // Reset progress
    await Progress.findOneAndDelete({ userId: user._id, courseId: course._id });
    console.log(`Progress reset for course: ${course.title}`);

    process.exit();
};

reset();
