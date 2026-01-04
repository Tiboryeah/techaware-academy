const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Module = require('./src/models/Module'); // Register Module schema
const Course = require('./src/models/Course');

dotenv.config();

const check = async () => {
    await connectDB();
    const course = await Course.findOne({ title: { $regex: 'Redes Sociales', $options: 'i' } }).populate('modules');

    if (!course) {
        console.log("Course 'Redes Sociales' NOT found in DB.");
    } else {
        console.log(`Course Found: ${course.title}`);
        console.log(`Modules count: ${course.modules.length}`);

        // Check all modules
        course.modules.forEach((mod, index) => {
            console.log(`\nModule ${index + 1}: ${mod.title}`);
            if (mod.lessonOrder) {
                mod.lessonOrder.forEach(l => {
                    console.log(`  - [${l.type}] ${l.title}`);
                });
            }
            if (mod.quizId) console.log(`  Quiz: Matches ID ${mod.quizId}`);
        });
    }
    process.exit();
};

check();
