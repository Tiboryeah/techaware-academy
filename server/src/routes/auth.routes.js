const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const router = express.Router();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
    const { name, password } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate a 6-digit random code instead of a long token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await User.create({
            name,
            email,
            passHash: password,
            verificationToken,
        });

        if (user) {
            const message = `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e0e0e0; border-radius: 20px; background-color: #fafafb;">
                    <h2 style="color: #4f46e5; text-align: center;">¡Bienvenido a Kuxipilli!</h2>
                    <p>Hola <strong>${name}</strong>,</p>
                    <p>Gracias por registrarte. Para activar tu cuenta de guardián y comenzar tu capacitación en seguridad digital, por favor introduce el siguiente código de verificación:</p>
                    <div style="background-color: #eef2ff; border: 1px dashed #6366f1; padding: 20px; border-radius: 10px; text-align: center; margin: 25px 0;">
                        <span style="font-family: monospace; font-size: 36px; font-weight: bold; letter-spacing: 5px; color: #1e1b4b;">${verificationToken}</span>
                    </div>
                    <p style="font-size: 12px; color: #6b7280; text-align: center;">Si no has solicitado este registro, puedes ignorar este correo.</p>
                </div>
            `;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Código de Activación - Kuxipilli',
                    message
                });
                console.log(`[SMTP] Verification Code sent to ${email}: ${verificationToken}`);
            } catch (err) {
                console.error("Error sending verification email:", err);
            }

            res.status(201).json({
                _id: user._id,
                email: user.email,
                message: 'Por favor, revisa tu correo para verificar tu cuenta con el código.'
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Verify user email via POST code
// @route   POST /api/auth/verify
// @access  Public
router.post('/verify', async (req, res) => {
    const { code } = req.body;
    const email = req.body.email?.trim().toLowerCase();
    try {
        const user = await User.findOne({ email, verificationToken: code });

        if (!user) {
            return res.status(400).json({ message: 'Código de verificación inválido o incorrecto.' });
        }

        user.isVerified = true;
        user.verificationToken = undefined; // Clear the token
        await user.save();

        res.json({ message: 'Cuenta verificada exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Resend verification code
// @route   POST /api/auth/resend-verification
// @access  Public
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

        const message = `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e0e0e0; border-radius: 20px; background-color: #fafafb;">
                <h2 style="color: #4f46e5; text-align: center;">Tu Nuevo Código Kuxipilli</h2>
                <p>Hola <strong>${user.name}</strong>,</p>
                <p>Has solicitado un nuevo código de verificación. Por favor, introdúcelo en la pantalla de registro para activar tu cuenta de guardián:</p>
                <div style="background-color: #eef2ff; border: 1px dashed #6366f1; padding: 20px; border-radius: 10px; text-align: center; margin: 25px 0;">
                    <span style="font-family: monospace; font-size: 36px; font-weight: bold; letter-spacing: 5px; color: #1e1b4b;">${verificationToken}</span>
                </div>
            </div>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Nuevo Código de Activación - Kuxipilli',
                message
            });
            console.log(`[SMTP] Resent Verification Code to ${email}: ${verificationToken}`);
            res.status(200).json({ message: 'Se ha enviado un nuevo código a tu correo.' });
        } catch (err) {
            console.error("Error resending verification email:", err);
            res.status(500).json({ message: 'Fallo al enviar el correo. Por favor intenta más tarde.' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    const { password } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // DS-01 Rule: Check if account is verified
            if (!user.isVerified) {
                return res.status(401).json({ message: 'Por favor verifique su correo electrónico antes de iniciar sesión.' });
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (To be implemented with middleware)
const { protect } = require('../middleware/authMiddleware');

// ... (existing code)

// @desc    Update User Password
// @route   PUT /api/auth/update-password
// @access  Private
router.put('/update-password', protect, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (user && (await user.matchPassword(currentPassword))) {
            user.passHash = newPassword;
            await user.save();
            res.json({ message: 'Contraseña actualizada correctamente' });
        } else {
            res.status(401).json({ message: 'La contraseña actual es incorrecta' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const multer = require('multer');
const path = require('path');

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
};

const sharp = require('sharp');

// @desc    Update User Profile (Name & Avatar)
// @route   PUT /api/auth/update-profile
// @access  Private
// Use memory storage for Buffer processing
const memoryUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.put('/update-profile', protect, memoryUpload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;

            if (req.file) {
                // Resize and compress to stay under Atlas limits (~50KB)
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
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            role: user.role,
            isVerified: user.isVerified,
            avatar: user.avatar,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const sendEmail = require('../utils/sendEmail');

// @desc    Forgot Password - Sends VERIFICATION CODE
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', async (req, res) => {
    const email = req.body.email?.trim().toLowerCase();

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No se encontró un usuario con ese correo electrónico' });
        }

        // Generate a 6-digit random code
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash code and set to resetPasswordToken field
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetCode)
            .digest('hex');

        // Set expire (10 minutes)
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // Send Email
        const message = `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e0e0e0; border-radius: 20px; background-color: #fafafb;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #4f46e5; font-size: 28px; margin: 0;">Código de Verificación</h2>
                    <p style="color: #6b7280; font-size: 16px;">Kuxipilli</p>
                </div>
                
                <div style="background-color: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <p style="font-size: 16px; line-height: 1.6; color: #374151;">Hola <strong>${user.name}</strong>,</p>
                    <p style="font-size: 16px; line-height: 1.6; color: #374151;">Usa el siguiente código para restablecer tu contraseña. Este código expirará en 10 minutos.</p>
                    
                    <div style="background-color: #eef2ff; border: 1px dashed #6366f1; padding: 20px; border-radius: 10px; text-align: center; margin: 25px 0;">
                        <span style="font-family: monospace; font-size: 36px; font-weight: bold; letter-spacing: 5px; color: #1e1b4b;">${resetCode}</span>
                    </div>

                    <p style="font-size: 14px; color: #6b7280; text-align: center;">Introduce este número en la pantalla de recuperación.</p>
                </div>

                <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #d1d5db;">
                    &copy; 2026 Kuxipilli Security Team
                </div>
            </div>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Tu Código de Recuperación - Kuxipilli',
                message
            });

            console.log(`RESET CODE SENT to ${email}: ${resetCode}`);

            res.status(200).json({
                success: true,
                data: 'Código enviado.'
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

// @desc    Reset Password with Code
// @route   POST /api/auth/reset-with-code
// @access  Public
router.post('/reset-with-code', async (req, res) => {
    const { code, newPassword } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    try {
        // Hash the code to compare with DB
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(code)
            .digest('hex');

        const user = await User.findOne({
            email,
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Código inválido o expirado' });
        }

        // Set new password
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

// @desc    Reset Password
// @route   PUT /api/auth/reset-password/:resettoken
// @access  Public
router.put('/reset-password/:resettoken', async (req, res) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Set new password
        user.passHash = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            data: 'Password reset success',
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
