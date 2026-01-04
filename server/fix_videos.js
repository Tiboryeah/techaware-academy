const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Course = require('./src/models/Course');
const Module = require('./src/models/Module');
const Lesson = require('./src/models/Lesson');

dotenv.config();

const fix = async () => {
    await connectDB();
    const course = await Course.findOne({ title: { $regex: 'Redes Sociales', $options: 'i' } }).populate({
        path: 'modules',
        populate: { path: 'lessonOrder' }
    });

    if (!course) {
        console.log("Course not found");
        process.exit();
    }

    // MAP of Module Title Keyword -> Correct Video URL + Title
    const fixes = {
        'Ciberacoso': {
            videoUrl: 'https://www.youtube.com/watch?v=IpgKJy_psi8', // User provided
            title: 'Video: Ciberacoso (Prevención)',
            type: 'video'
        },
        'Contenido Inapropiado': {
            videoUrl: 'https://www.youtube.com/watch?v=t-x73w1N1os', // User provided (cleaned)
            title: 'Video: Navegando Seguro en Internet',
            type: 'video'
        },
        'Bienestar Digital': {
            videoUrl: 'https://www.youtube.com/watch?v=jQKrZDridqc', // User provided
            title: 'Video: Reflexión sobre el uso del móvil',
            type: 'video'
        },
        'TikTok': {
            videoUrl: 'https://www.youtube.com/watch?v=rHDTJQKW2y8', // User provided
            title: 'Video: Privacidad en Redes Sociales',
            type: 'video'
        }
    };

    for (const mod of course.modules) {
        let fixData = null;
        for (const key in fixes) {
            if (mod.title.includes(key)) fixData = fixes[key];
        }

        if (fixData) {
            console.log(`Fixing Module: ${mod.title}`);
            // Find the video lesson in this module
            let videoLesson = mod.lessonOrder.find(l => l.type === 'video');

            if (videoLesson) {
                console.log(`  Found existing video lesson: ${videoLesson.title} (${videoLesson.videoUrl})`);
                // Update it
                await Lesson.findByIdAndUpdate(videoLesson._id, {
                    title: fixData.title,
                    videoUrl: fixData.videoUrl,
                    content: 'Video educativo verificado.'
                });
                console.log(`  -> UPDATED to: ${fixData.videoUrl}`);
            } else {
                console.log(`  No video lesson found. Creating one.`);
                const newLesson = await Lesson.create({
                    courseId: course._id,
                    title: fixData.title,
                    type: 'video',
                    videoUrl: fixData.videoUrl,
                    content: 'Video educativo verificado.',
                    duration: 5
                });
                mod.lessonOrder.splice(1, 0, newLesson._id); // Insert at index 1
                await mod.save();
                console.log(`  -> CREATED: ${fixData.videoUrl}`);
            }
        }
    }

    console.log("All videos fixed.");
    process.exit();
};

fix();
