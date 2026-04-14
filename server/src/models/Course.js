const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true, // e.g., 'videojuegos', 'redes sociales', 'streaming'
        },
        platforms: [{
            type: String, // e.g., 'TikTok', 'Roblox'
        }],
        riskAreas: [{
            type: String, // e.g., 'ciberacoso', 'grooming'
        }],
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft',
        },
        duration: {
            type: String, // e.g. '3 horas'
        },
        finalQuizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz',
        },
    },

    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

courseSchema.virtual('modules', {
    ref: 'Module',
    localField: '_id',
    foreignField: 'courseId'
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
