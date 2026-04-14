const express = require('express');

const CaseReport = require('../models/CaseReport');
const { protect } = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

router.post('/submit', protect, async (req, res) => {
    try {
        const {
            messageType,
            title,
            description,
            category,
            platform,
            ageRange,
            incidentDate,
            contactContext,
            actionsTaken,
            evidenceAvailable,
            evidenceDescription,
            preferredReply,
        } = req.body;

        const normalizedMessageType = messageType || 'Reporte de caso';
        const isCaseReport = normalizedMessageType === 'Reporte de caso';

        if (!title || !description) {
            return res.status(400).json({ message: 'Por favor, completa los campos requeridos.' });
        }

        if (isCaseReport && (!platform || !actionsTaken)) {
            return res.status(400).json({
                message: 'Para reportar un caso, indica la plataforma y las acciones que ya realizaron.',
            });
        }

        const newReport = new CaseReport({
            userId: req.user._id,
            messageType: normalizedMessageType,
            title,
            description,
            category: category || 'Otro',
            platform: platform || '',
            ageRange: ageRange || '',
            incidentDate: incidentDate || '',
            contactContext: contactContext || '',
            actionsTaken: actionsTaken || '',
            evidenceAvailable: Boolean(evidenceAvailable),
            evidenceDescription: evidenceDescription || '',
            preferredReply: preferredReply || 'Correo electrónico',
        });

        await newReport.save();

        try {
            const detailRows = [
                ['Tipo de mensaje', normalizedMessageType],
                ['Categoría', category || 'Otro'],
                ['Plataforma o espacio', platform || 'No indicado'],
                ['Edad aproximada', ageRange || 'No indicada'],
                ['Fecha o periodo', incidentDate || 'No indicado'],
                ['Dónde ocurrió', contactContext || 'No indicado'],
                ['Acciones ya realizadas', actionsTaken || 'No indicadas'],
                ['¿Hay evidencia?', Boolean(evidenceAvailable) ? 'Sí' : 'No'],
                ['Detalle de evidencia', evidenceDescription || 'No indicado'],
                ['Preferencia de respuesta', preferredReply || 'Correo electrónico'],
            ]
                .map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`)
                .join('');

            const message = `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 24px; color: #1f2937;">
                    <h2 style="color: #4f46e5; margin-top: 0;">Nuevo mensaje recibido</h2>
                    <p><strong>De:</strong> ${req.user.name} (${req.user.email})</p>
                    <p><strong>Título:</strong> ${title}</p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                    ${detailRows}
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                    <p><strong>Descripción:</strong></p>
                    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                        ${description.replace(/\n/g, '<br>')}
                    </div>
                    <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">
                        Este es un mensaje automático del sistema de contacto de Kuxipilli.
                    </p>
                </div>
            `;

            await sendEmail({
                email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
                subject: `${normalizedMessageType}: ${title}`,
                message,
            });
            console.log(`[Notification] Report submitted: ${title}`);
        } catch (emailError) {
            console.error('Error sending report email notification:', emailError);
        }

        res.status(201).json({
            message: 'Información enviada con éxito. Gracias por compartir este contexto.',
            report: newReport,
        });
    } catch (error) {
        console.error('Error submitting report:', error);
        res.status(500).json({ message: 'Ocurrió un error interno al enviar la información.' });
    }
});

module.exports = router;
