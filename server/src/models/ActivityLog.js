const mongoose = require('mongoose');

const activityLogSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        kind: {
            type: String,
            enum: [
                'lesson_completed',
                'quiz_attempt',
                'diagnostic_attempt',
                'module_accredited',
                'course_completed',
            ],
            required: true,
        },
        uniqueKey: {
            type: String,
            index: true,
        },
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            default: '',
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
        moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Module',
        },
        lessonId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
        },
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz',
        },
        attemptId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Attempt',
        },
        score: {
            type: Number,
        },
        passed: {
            type: Boolean,
            default: false,
        },
        occurredAt: {
            type: Date,
            default: Date.now,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

activityLogSchema.index({ userId: 1, occurredAt: -1 });
activityLogSchema.index(
    { userId: 1, uniqueKey: 1 },
    {
        unique: true,
        partialFilterExpression: {
            uniqueKey: { $exists: true, $type: 'string' },
        },
    }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
