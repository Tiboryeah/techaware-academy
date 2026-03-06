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
        enum: ['Ciberacoso', 'Grooming', 'Fraude', 'Otro'],
        default: 'Otro'
    },
    status: {
        type: String,
        enum: ['pendiente', 'revisado'],
        default: 'pendiente'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CaseReport', CaseReportSchema);
