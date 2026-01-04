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
            type: Map,
            of: [String], // questionId -> array of selected option IDs or indices
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

const Attempt = mongoose.model('Attempt', attemptSchema);

module.exports = Attempt;
