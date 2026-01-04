const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');
const Lesson = require('./src/models/Lesson');
const Progress = require('./src/models/Progress');
const User = require('./src/models/User');
const Quiz = require('./src/models/Quiz');

dotenv.config();

const run = async () => {
    await connectDB();

    try {
        const user = await User.findOne();
        if (!user) {
            console.log("No user found");
            process.exit();
        }
        console.log(`Testing for User: ${user._id}`);

        const courses = await Course.find({ status: 'published' }).sort({ createdAt: 1 }).populate({
            path: 'modules',
            populate: {
                path: 'lessonOrder'
            }
        });

        const progressList = await Progress.find({ userId: user._id });
        console.log(`Found ${progressList.length} progress records`);

        // Helper to check if item is completed (Robust comparison)
        const isLessonCompleted = (lessonId) => {
            if (!lessonId) return false;
            return progressList.some(p => p.completedLessons && p.completedLessons.some(id => String(id) === String(lessonId)));
        };

        const isModuleCompleted = (moduleId) => {
            if (!moduleId) return false;
            return progressList.some(p => p.completedModules && p.completedModules.some(id => String(id) === String(moduleId)));
        };

        let found = false;
        // Iterate through hierarchy to find first incomplete item
        for (const course of courses) {
            console.log(`Checking Course: ${course.title}`);
            if (!course.modules) {
                console.log("  No modules found for course");
                continue;
            }
            for (const module of course.modules) {
                console.log(`  Checking Module: ${module.title} (ID: ${module._id})`);

                // 1. Check Lessons
                if (module.lessonOrder && module.lessonOrder.length > 0) {
                    for (const lesson of module.lessonOrder) {
                        const completed = isLessonCompleted(lesson._id);
                        if (!completed) {
                            console.log(`    FOUND NEXT: Lesson - ${lesson.title}`);
                            found = true;
                            // return; // Don't return, assuming loop structure
                            break;
                        }
                    }
                }
                if (found) break;

                // 2. Check Module Quiz
                // Use safe property access
                const modId = module._id;
                const modCompleted = isModuleCompleted(modId);
                console.log(`    Module Completed? ${modCompleted}`);

                if (!modCompleted) {
                    if (module.quizId) {
                        console.log(`    FOUND NEXT: Quiz for ${module.title}`);
                        found = true;
                        break;
                    } else {
                        console.log(`    Module incomplete but NO QUIZ ID found.`);
                    }
                }
            }
            if (found) break;
        }

        if (!found) {
            console.log("Nothing found. All Complete.");
        }

    } catch (error) {
        console.error("CRASHED:", error);
    }
    process.exit();
};

run();
