const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema(
    {
        moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Module',
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course',
        },
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['article', 'video', 'guide', 'case_study'],
            default: 'article',
        },
        content: {
            type: String, // Markdown or HTML content
            default: '',
        },
        videoUrl: {
            type: String,
        },
        resources: [{
            title: String,
            url: String,
        }],
        platforms: [{
            type: String,
        }],
        riskAreas: [{
            type: String,
        }],
    },
    {
        timestamps: true,
    }
);

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
