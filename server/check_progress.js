const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Progress = require('./src/models/Progress');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');

dotenv.config();

const check = async () => {
    await connectDB();
    const user = await User.findOne(); // Assumes single user dev env
    const course = await Course.findOne({ title: { $regex: 'Videojuegos', $options: 'i' } });

    if (!course) {
        console.log("Course not found");
        process.exit();
    }

    const progress = await Progress.findOne({ userId: user._id, courseId: course._id });
    const module1 = await Module.findOne({ courseId: course._id, title: { $regex: 'Chat', $options: 'i' } });

    console.log(`Course: ${course.title}`);
    console.log(`Module 1: ${module1.title} (${module1._id})`);

    if (progress) {
        console.log("Progress found:");
        console.log("Completed Modules:", progress.completedModules);
        console.log("Completed Lessons:", progress.completedLessons);

        const isMod1Done = progress.completedModules.map(String).includes(String(module1._id));
        console.log(`Is Module 1 marked as completed? ${isMod1Done}`);
    } else {
        console.log("No progress record found for this course.");
    }

    process.exit();
};

check();
