const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');
const Lesson = require('./src/models/Lesson');

dotenv.config();

const check = async () => {
    await connectDB();
    const course = await Course.findOne({ title: { $regex: 'Streaming', $options: 'i' } }).populate({
        path: 'modules',
        populate: { path: 'lessonOrder' }
    });

    if (!course) {
        console.log("Course not found");
        process.exit();
    }

    for (const mod of course.modules) {
        console.log(`\nModule: ${mod.title}`);
        mod.lessonOrder.forEach((l, i) => {
            console.log(`  Lesson ${i + 1}: ${l.title} (${l.type})`);
            console.log(`    Content: ${l.content ? l.content.substring(0, 50) + '...' : 'EMPTY'}`);
        });
    }

    process.exit();
};

check();
