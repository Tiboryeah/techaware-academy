#!/usr/bin/env node
'use strict';

// Activa isCourseCompleted=true en todos los cursos para un usuario por email.
// Uso: node activate-badges.js [email]
// Default: admin@example.com

const dotenv = require('dotenv');
dotenv.config();

const connectDB  = require('../config/db');
const User       = require('../models/User');
const Course     = require('../models/Course');
const Progress   = require('../models/Progress');

const TARGET_EMAIL = process.argv[2] || 'admin@example.com';

async function run() {
    await connectDB();

    const user = await User.findOne({ email: TARGET_EMAIL });
    if (!user) {
        console.error(`✗ No se encontró el usuario: ${TARGET_EMAIL}`);
        process.exit(1);
    }
    console.log(`✓ Usuario encontrado: ${user.name} (${user.email})`);

    const courses = await Course.find({ status: 'published' });
    console.log(`✓ Cursos publicados: ${courses.length}`);

    for (const course of courses) {
        await Progress.findOneAndUpdate(
            { userId: user._id, courseId: course._id },
            { $set: { isCourseCompleted: true } },
            { upsert: true, new: true }
        );
        console.log(`  ✓ Badge activado: ${course.title}`);
    }

    console.log('\n✅ Todas las badges activadas para', TARGET_EMAIL);
    process.exit(0);
}

run().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
