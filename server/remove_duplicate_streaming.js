const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');
const Lesson = require('./src/models/Lesson');
const Quiz = require('./src/models/Quiz');
const Question = require('./src/models/Question');

dotenv.config();
connectDB();

const removeDuplicate = async () => {
    try {
        console.log('Searching for duplicate Course 3...');

        // Course 3 titles we've used
        const titles = [
            "Plataformas de Streaming: YouTube y Twitch",
            "Streaming: YouTube y Twitch"
        ];

        const courses = await Course.find({ title: { $in: titles } });

        if (courses.length > 1) {
            console.log(`Found ${courses.length} versions of Course 3.`);
            // We'll keep the one that matches our latest preferred title or the one that's "newer"
            // To be safe, let's delete BOTH and follow with a clean seed using ONE title.

            for (const course of courses) {
                console.log(`Deleting Course ID: ${course._id} Title: "${course.title}"`);

                // Find all modules for this course
                const modules = await Module.find({ courseId: course._id });
                for (const mod of modules) {
                    await Lesson.deleteMany({ moduleId: mod._id });
                    if (mod.quizId) {
                        await Question.deleteMany({ quizId: mod.quizId });
                        await Quiz.deleteOne({ _id: mod.quizId });
                    }
                    await Module.deleteOne({ _id: mod._id });
                }

                await Course.deleteOne({ _id: course._id });
            }
            console.log('Duplicates removed.');
        } else {
            console.log('No duplicates found by title scan.');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

removeDuplicate();
