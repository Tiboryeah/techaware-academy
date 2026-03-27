const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./src/models/Course');

dotenv.config();

async function listCourses() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0.tgbudpw.mongodb.net/sistema_reporte?appName=Cluster0');
        const courses = await Course.find();
        console.log('--- Current Courses ---');
        courses.forEach((c, i) => {
            console.log(`${i + 1}. ID: ${c._id} | Title: ${c.title} | Category: ${c.category}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

listCourses();
