const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Course = require('./src/models/Course');

dotenv.config();
connectDB();

const listAll = async () => {
    try {
        const courses = await Course.find();
        console.log('--- ALL COURSES ---');
        courses.forEach(c => {
            console.log(`ID: ${c._id} | Title: "${c.title}"`);
        });
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listAll();
