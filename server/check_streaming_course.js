const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');

dotenv.config();

const check = async () => {
    await connectDB();
    const course = await Course.findOne({ title: { $regex: 'Streaming', $options: 'i' } }).populate('modules');

    if (!course) {
        console.log("Course 'Streaming' NOT found in DB.");
    } else {
        console.log(`Course Found: ${course.title}`);
        console.log(`Modules count: ${course.modules.length}`);
        // Check all modules
        for (const mod of course.modules) {
            console.log(`\nModule: ${mod.title}`);
            console.log(`  Lessons count: ${mod.lessonOrder ? mod.lessonOrder.length : 0}`);
            if (mod.quizId) console.log(`  Quiz ID: ${mod.quizId}`);
        }
    }
    process.exit();
};

check();
