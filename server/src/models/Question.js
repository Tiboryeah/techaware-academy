const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
    {
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz',
        },
        text: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['single_choice', 'multiple_choice'],
            default: 'single_choice',
        },
        options: [{
            text: String,
            isCorrect: Boolean,
        }],
        platform: {
            type: String,
        },
        riskArea: {
            type: String,
        },
        explanation: {
            type: String, // Feedback for the answer
        },
    },
    {
        timestamps: true,
    }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
