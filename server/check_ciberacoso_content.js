const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');
const Lesson = require('./src/models/Lesson');

dotenv.config();

const check = async () => {
    await connectDB();
    const course = await Course.findOne({ title: { $regex: 'Redes Sociales', $options: 'i' } }).populate({
        path: 'modules',
        populate: { path: 'lessonOrder' }
    });

    if (!course) {
        console.log("Course not found");
        process.exit();
    }

    const mod1 = course.modules.find(m => m.title.includes('Ciberacoso'));
    if (!mod1) {
        console.log("Module 1 not found");
    } else {
        console.log(`Module: ${mod1.title}`);
        console.log(`Lessons count: ${mod1.lessonOrder.length}`);
        mod1.lessonOrder.forEach((l, i) => {
            console.log(`\nLesson ${i + 1}: ${l.title}`);
            console.log(`Type: ${l.type}`);
            console.log(`Content Preview: ${l.content ? l.content.substring(0, 100) + '...' : 'NO CONTENT'}`);
        });
    }

    process.exit();
};

check();
