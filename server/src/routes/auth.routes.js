const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const rateLimit = require('express-rate-limit');

const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// 10 attempts per 15 min per IP — brute force protection for login and verify
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    handler: (req, res) => {
        res.status(429).json({
            message: 'Demasiados intentos. Espera 15 minutos antes de intentarlo de nuevo.',
        });
    },
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const buildVerificationEmail = ({ name, verificationToken, isResend = false }) => `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e5e7eb; border-radius: 20px; background-color: #fafafb;">
        <h2 style="color: #4f46e5; text-align: center; margin-top: 0;">
            ${isResend ? 'Tu nuevo código de verificación' : 'Bienvenido a Kuxipilli'}
        </h2>
        <p>Hola <strong>${name}</strong>,</p>
        <p>
            ${isResend
                ? 'Solicitaste un nuevo código para verificar tu cuenta.'
                : 'Gracias por registrarte. Para activar tu cuenta y comenzar tu formación en seguridad digital, introduce el siguiente código de verificación:'}
        </p>
        <div style="background-color: #eef2ff; border: 1px dashed #6366f1; padding: 20px; border-radius: 10px; text-align: center; margin: 25px 0;">
            <span style="font-family: monospace; font-size: 36px; font-weight: bold; letter-spacing: 5px; color: #1e1b4b;">${verificationToken}</span>
        </div>
        <p style="font-size: 12px; color: #6b7280; text-align: center;">
            Si no solicitaste esta acción, puedes ignorar este correo.
        </p>
    </div>
`;

const buildResetCodeEmail = ({ name, resetCode }) => `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e5e7eb; border-radius: 20px; background-color: #fafafb;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #4f46e5; font-size: 28px; margin: 0;">Código de recuperación</h2>
            <p style="color: #6b7280; font-size: 16px;">Kuxipilli</p>
        </div>

        <div style="background-color: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);">
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">Hola <strong>${name}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                Usa el siguiente código para restablecer tu contraseña. Este código expirará en 10 minutos.
            </p>

            <div style="background-color: #eef2ff; border: 1px dashed #6366f1; padding: 20px; border-radius: 10px; text-align: center; margin: 25px 0;">
                <span style="font-family: monospace; font-size: 36px; font-weight: bold; letter-spacing: 5px; color: #1e1b4b;">${resetCode}</span>
            </div>

            <p style="font-size: 14px; color: #6b7280; text-align: center;">
                Introduce este número en la pantalla de recuperación.
            </p>
        </div>

        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #9ca3af;">
            &copy; 2026 Kuxipilli
        </div>
    </div>
`;

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }

    cb('Solo se permiten imágenes.');
};

const memoryUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post('/register', async (req, res) => {
    const { name, password } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres.' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'Ya existe una cuenta con ese correo.' });
        }

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await User.create({
            name,
            email,
            passHash: password,
            verificationToken,
        });

        if (!user) {
            return res.status(400).json({ message: 'No fue posible crear la cuenta.' });
        }

        const message = buildVerificationEmail({ name, verificationToken });

        try {
            await sendEmail({
                email: user.email,
                subject: 'Código de activación - Kuxipilli',
                message,
            });
            console.log(`[SMTP] Verification code sent to ${email}: ${verificationToken}`);
        } catch (err) {
            console.error('Error sending verification email:', err);
        }

        res.status(201).json({
            _id: user._id,
            email: user.email,
            message: 'Revisa tu correo para verificar tu cuenta con el código enviado.',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/verify', authLimiter, async (req, res) => {
    const { code } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    try {
        const user = await User.findOne({ email, verificationToken: code });

        if (!user) {
            return res.status(400).json({ message: 'El código de verificación es inválido o incorrecto.' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.json({ message: 'Cuenta verificada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/resend-verification', async (req, res) => {
    const email = req.body.email?.trim().toLowerCase();

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Esta cuenta ya está verificada.' });
        }

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationToken = verificationToken;
        await user.save();

        const message = buildVerificationEmail({
            name: user.name,
            verificationToken,
            isResend: true,
        });

        try {
            await sendEmail({
                email: user.email,
                subject: 'Nuevo código de activación - Kuxipilli',
                message,
            });
            console.log(`[SMTP] Resent verification code to ${email}: ${verificationToken}`);
            res.status(200).json({ message: 'Se ha enviado un nuevo código a tu correo.' });
        } catch (err) {
            console.error('Error resending verification email:', err);
            res.status(500).json({ message: 'No fue posible enviar el correo. Intenta de nuevo más tarde.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', authLimiter, async (req, res) => {
    const { password } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            if (!user.isVerified) {
                return res.status(401).json({ message: 'Verifica tu correo electrónico antes de iniciar sesión.' });
            }

            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                isVerified: user.isVerified,
                token: generateToken(user._id),
            });
        }

        res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/update-password', protect, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (user && (await user.matchPassword(currentPassword))) {
            user.passHash = newPassword;
            await user.save();
            return res.json({ message: 'Contraseña actualizada correctamente.' });
        }

        res.status(401).json({ message: 'La contraseña actual es incorrecta.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/update-profile', protect, memoryUpload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        user.name = req.body.name || user.name;

        if (req.file) {
            const compressedBuffer = await sharp(req.file.buffer)
                .resize(200, 200, { fit: 'cover' })
                .jpeg({ quality: 70 })
                .toBuffer();

            const base64Avatar = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;
            user.avatar = base64Avatar;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            role: updatedUser.role,
            isVerified: updatedUser.isVerified,
            token: generateToken(updatedUser._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        avatar: user.avatar,
    });
});

router.post('/forgot-password', authLimiter, async (req, res) => {
    const email = req.body.email?.trim().toLowerCase();

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No se encontró una cuenta con ese correo electrónico.' });
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

        user.resetPasswordToken = crypto.createHash('sha256').update(resetCode).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        const message = buildResetCodeEmail({
            name: user.name,
            resetCode,
        });

        try {
            await sendEmail({
                email: user.email,
                subject: 'Tu código de recuperación - Kuxipilli',
                message,
            });

            console.log(`RESET CODE SENT to ${email}: ${resetCode}`);

            res.status(200).json({
                success: true,
                data: 'Código enviado.',
            });
        } catch (emailError) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return res.status(500).json({ message: 'El correo falló al enviarse. Intenta de nuevo.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/reset-with-code', authLimiter, async (req, res) => {
    const { code, newPassword } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    try {
        const resetPasswordToken = crypto.createHash('sha256').update(code).digest('hex');

        const user = await User.findOne({
            email,
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'El código es inválido o ya expiró.' });
        }

        user.passHash = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            data: 'Contraseña actualizada correctamente.',
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/reset-password/:resettoken', async (req, res) => {
    try {
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'El enlace de recuperación es inválido o ya expiró.' });
        }

        user.passHash = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            data: 'Contraseña restablecida correctamente.',
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
