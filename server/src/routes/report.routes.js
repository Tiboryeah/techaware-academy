const express = require('express');
const router = express.Router();
const CaseReport = require('../models/CaseReport');
const { protect } = require('../middleware/authMiddleware');
const nodemailer = require('nodemailer');

// @desc    Submit a case report
// @route   POST /api/reports/submit
// @access  Private
router.post('/submit', protect, async (req, res) => {
    try {
        const { title, description, category } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Por favor, completa los campos requeridos.' });
        }

        const newReport = new CaseReport({
            userId: req.user._id,
            title,
            description,
            category: category || 'Otro'
        });

        await newReport.save();

        // Send email notification
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: `📢 NUEVO REPORTE: ${title}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #4f46e5;">Nuevo Caso Recibido</h2>
                        <p><strong>De:</strong> ${req.user.name} (${req.user.email})</p>
                        <p><strong>Categoría:</strong> ${category || 'Otro'}</p>
                        <p><strong>Título:</strong> ${title}</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                        <p><strong>Descripción:</strong></p>
                        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                            ${description.replace(/\n/g, '<br>')}
                        </div>
                        <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">
                            Este es un mensaje automático del Sistema de Reportes TechAwareKids.
                        </p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log(`[EMAIL SENT] Notification for new report: ${title}`);
        } catch (emailError) {
            console.error("Error sending email notification:", emailError);
        }

        res.status(201).json({
            message: 'Información enviada con éxito. ¡Gracias por colaborar!',
            report: newReport
        });
    } catch (error) {
        console.error("Error submitting report:", error);
        res.status(500).json({ message: 'Error interno al enviar la información.' });
    }
});

module.exports = router;
