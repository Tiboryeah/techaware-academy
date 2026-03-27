const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');
const Lesson = require('./src/models/Lesson');
const Quiz = require('./src/models/Quiz');

dotenv.config();

async function deleteClone(id) {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0.tgbudpw.mongodb.net/sistema_reporte?appName=Cluster0');
        console.log(`--- deleting course clone ${id} ---`);
        
        await Course.findByIdAndDelete(id);
        await Module.deleteMany({ courseId: id });
        await Lesson.deleteMany({ courseId: id });
        await Quiz.deleteMany({ refId: id, scope: 'course' });
        
        console.log('--- deleted clone and associated data ---');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

deleteClone('69c1c6b1cf853abd471d4d28');
