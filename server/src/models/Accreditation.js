const mongoose = require('mongoose');

const accreditationSchema = mongoose.Schema(
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
        approved: {
            type: Boolean,
            default: true,
        },
        awardedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Ensure a user gets only one accreditation per course
accreditationSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Accreditation = mongoose.model('Accreditation', accreditationSchema);

module.exports = Accreditation;
