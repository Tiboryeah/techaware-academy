const mongoose = require('mongoose');

const attemptSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Quiz',
        },
        answers: {
            type: mongoose.Schema.Types.Mixed,
        },
        score: {
            type: Number,
            required: true,
        },
        passed: {
            type: Boolean,
            default: false,
        },
        riskLevel: {
            type: String, // 'Low', 'Medium', 'High' - mostly for diagnostic
        },
        errorsByArea: {
            type: Map,
            of: Number,
        },
        errorsByPlatform: {
            type: Map,
            of: Number,
        },
    },
    {
        timestamps: true,
    }
);

attemptSchema.index({ userId: 1, quizId: 1 });

const Attempt = mongoose.model('Attempt', attemptSchema);

module.exports = Attempt;
