
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./server/src/config/db');
const Lesson = require('./server/src/models/Lesson');
const Course = require('./server/src/models/Course');
const Module = require('./server/src/models/Module');

dotenv.config({ path: './server/.env' });

const checkLessons = async () => {
    try {
        await connectDB();

        const totalLessons = await Lesson.countDocuments();
        console.log(`Total Lesson documents in DB: ${totalLessons}`);

        const publishedCourses = await Course.find({ status: 'published' });
        console.log(`Published Courses: ${publishedCourses.length}`);

        let validLessonsCount = 0;
        for (const course of publishedCourses) {
            const modules = await Module.find({ courseId: course._id });
            for (const module of modules) {
                const lessons = await Lesson.find({ moduleId: module._id });
                validLessonsCount += lessons.length;
            }
        }
        console.log(`Valid Lessons belonging to published courses: ${validLessonsCount}`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkLessons();
