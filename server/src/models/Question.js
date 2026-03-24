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
            enum: [
                'single_choice', 
                'multiple_choice', 
                'multiple_selection',
                'drag_drop', 
                'fill_blanks', 
                'match_columns', 
                'order_sequence', 
                'categorize', 
                'case_study',
                'drop_down'
            ],
            default: 'single_choice',
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
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
        points: {
            type: Number,
            default: 10,
        },
    },
    {
        timestamps: true,
    }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
