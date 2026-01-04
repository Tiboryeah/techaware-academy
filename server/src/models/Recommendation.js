const mongoose = require('mongoose');

const recommendationSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        sourceAttemptId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Attempt',
        },
        suggestedModules: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Module',
        }],
        suggestedLessons: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
        }],
        reason: {
            type: String, // e.g., "Weakness in Social Media Privacy"
        },
    },
    {
        timestamps: true,
    }
);

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
