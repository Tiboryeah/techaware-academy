const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course',
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz'
        },
        lessonOrder: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
        }],
    },
    {
        timestamps: true,
    }
);

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
