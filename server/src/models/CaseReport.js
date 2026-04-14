const mongoose = require('mongoose');

const CaseReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messageType: {
        type: String,
        enum: ['Reporte de caso', 'Solicitud de orientación', 'Sugerencia', 'Otro'],
        default: 'Reporte de caso',
    },
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
        enum: ['Ciberacoso', 'Grooming', 'Fraudes', 'Privacidad', 'Otro'],
        default: 'Otro',
    },
    platform: {
        type: String,
        default: '',
    },
    ageRange: {
        type: String,
        default: '',
    },
    incidentDate: {
        type: String,
        default: '',
    },
    contactContext: {
        type: String,
        default: '',
    },
    actionsTaken: {
        type: String,
        default: '',
    },
    evidenceAvailable: {
        type: Boolean,
        default: false,
    },
    evidenceDescription: {
        type: String,
        default: '',
    },
    preferredReply: {
        type: String,
        enum: ['Correo electrónico', 'Respuesta dentro de la plataforma', 'Sin preferencia'],
        default: 'Correo electrónico',
    },
    status: {
        type: String,
        enum: ['pendiente', 'revisado'],
        default: 'pendiente',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('CaseReport', CaseReportSchema);
