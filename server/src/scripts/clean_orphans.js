const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Lesson = require('../models/Lesson');
const Module = require('../models/Module');
const Course = require('../models/Course');

dotenv.config();

const cleanOrphans = async () => {
    try {
        await connectDB();
        console.log('Starting cleanup...');

        // 1. Get all valid Module IDs
        const modules = await Module.find({}, '_id');
        const validModuleIds = modules.map(m => m._id.toString());
        console.log(`Found ${validModuleIds.length} valid modules.`);

        // 2. Get all Lessons
        const lessons = await Lesson.find({});
        console.log(`Found ${lessons.length} total lessons.`);

        let deletedCount = 0;
        for (const lesson of lessons) {
            if (!validModuleIds.includes(lesson.moduleId.toString())) {
                await Lesson.deleteOne({ _id: lesson._id });
                deletedCount++;
            }
        }

        console.log(`Deleted ${deletedCount} orphaned lessons.`);

        // 3. Recount
        const newCount = await Lesson.countDocuments();
        console.log(`New Lesson count: ${newCount}`);

        process.exit();
    } catch (error) {
        console.error('Error cleaning DB:', error);
        process.exit(1);
    }
};

cleanOrphans();
