const mongoose = require('mongoose');

const progressSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course',
        },
        completedModules: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Module'
        }],
        completedLessons: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson'
        }],
        isCourseCompleted: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
