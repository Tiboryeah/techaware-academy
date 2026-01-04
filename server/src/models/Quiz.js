const mongoose = require('mongoose');

const quizSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        scope: {
            type: String,
            enum: ['diagnostic', 'course', 'module'],
            required: true,
        },
        refId: {
            type: mongoose.Schema.Types.ObjectId,
            // Can reference Course or Module depending on scope, or null for diagnostic
            refPath: 'scopeModel',
        },
        scopeModel: {
            type: String,
            enum: ['Course', 'Module'],
        },
        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
        }],
        minPassing: {
            type: Number,
            default: 70, // Percentage
        },
    },
    {
        timestamps: true,
    }
);

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
