const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Lesson = require('../models/Lesson');
const Module = require('../models/Module');
const Progress = require('../models/Progress');

dotenv.config();

const cleanOrphans = async () => {
    try {
        await connectDB();
        console.log('Starting DEEP cleanup...');

        // 1. Get all valid IDs
        const lessons = await Lesson.find({}, '_id');
        const validLessonIds = lessons.map(l => l._id.toString());
        console.log(`Found ${validLessonIds.length} valid lessons.`);

        // 2. Clean Progress
        const progresses = await Progress.find({});
        console.log(`Checking ${progresses.length} progress records...`);

        for (const p of progresses) {
            let changed = false;
            // Filter completedLessons
            const originalLen = p.completedLessons.length;
            p.completedLessons = p.completedLessons.filter(lId => validLessonIds.includes(lId.toString()));

            if (p.completedLessons.length !== originalLen) {
                console.log(`User ${p.userId}: Refined completed lessons from ${originalLen} to ${p.completedLessons.length}`);
                changed = true;
            }

            if (changed) {
                await p.save();
            }
        }

        console.log('Progress cleanup complete.');

        process.exit();
    } catch (error) {
        console.error('Error cleaning DB:', error);
        process.exit(1);
    }
};

cleanOrphans();
