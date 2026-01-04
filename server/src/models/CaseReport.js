const mongoose = require('mongoose');

const CaseReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Ciberacoso', 'Fraudes', 'Grooming', 'Privacidad', 'Otro'],
        default: 'Otro'
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'published'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CaseReport', CaseReportSchema);
