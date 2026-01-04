const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');
const Lesson = require('./src/models/Lesson');
const Progress = require('./src/models/Progress');
const User = require('./src/models/User');

dotenv.config();

const test = async () => {
    await connectDB();

    // Simulate the logic in progress.routes.js
    try {
        const courses = await Course.find({ status: 'published' }).sort({ createdAt: 1 }).populate({
            path: 'modules',
            populate: {
                path: 'lessonOrder'
            }
        });

        console.log(`Found ${courses.length} courses`);
        if (courses.length > 0) {
            console.log('Course 1 Modules:', courses[0].modules);
            if (courses[0].modules && courses[0].modules.length > 0) {
                console.log('Module 1 Lessons:', courses[0].modules[0].lessonOrder);
            }
        }

    } catch (err) {
        console.error(err);
    }
    process.exit();
};

test();
