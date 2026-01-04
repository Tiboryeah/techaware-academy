
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

dotenv.config({ path: '.env' });

console.log('Mongo URI:', process.env.MONGO_URI ? 'Defined' : 'Undefined');

const cleanupOrphans = async () => {
    try {
        await connectDB();
        console.log('--- AGGRESSIVE CLEANUP OF ORPHANED CONTENT ---');

        // 1. Get IDs of PUBLISHED courses
        const publishedCourses = await Course.find({ status: 'published' });
        const publishedCourseIds = publishedCourses.map(c => c._id);
        console.log(`Published Courses found: ${publishedCourses.length}`);

        if (publishedCourses.length === 0) {
            console.log('Warning: No published courses found. Aborting cleanup.');
            process.exit(1);
        }

        // 2. Identify Valid Modules (Modules belonging to published courses)
        const validModules = await Module.find({ courseId: { $in: publishedCourseIds } });
        const validModuleIds = validModules.map(m => m._id);
        console.log(`Valid Modules belonging to published courses: ${validModules.length}`);

        // 3. Delete Orphaned Modules (Modules NOT in published courses)
        const deleteModulesResult = await Module.deleteMany({ _id: { $nin: validModuleIds } });
        console.log(`Deleted Orphaned Modules: ${deleteModulesResult.deletedCount}`);

        // 4. Delete Orphaned Lessons
        // Lessons must strictly belong to the valid module IDs we found.
        // We ignore courseID on the lesson and trust the module-lesson relationship hierarchy.
        // OR we can trust the courseID if it's consistent. Let's filter by moduleID for safety.

        const deleteLessonsResult = await Lesson.deleteMany({ moduleId: { $nin: validModuleIds } });
        console.log(`Deleted Orphaned Lessons: ${deleteLessonsResult.deletedCount}`);

        // 5. Delete Quizzes NOT linked to valid Courses/Modules
        const deleteQuizzesResult = await Quiz.deleteMany({
            $or: [
                { scope: 'course', refId: { $nin: publishedCourseIds } },
                { scope: 'module', refId: { $nin: validModuleIds } }
            ]
        });
        console.log(`Deleted Orphaned Quizzes: ${deleteQuizzesResult.deletedCount}`);

        console.log('--- CLEANUP COMPLETE ---');
        process.exit();
    } catch (error) {
        console.error('Error during cleanup:', error);
        process.exit(1);
    }
};

cleanupOrphans();
