const nodemailer = require('nodemailer');

const sendWithResend = async (options) => {
    const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;

    if (!from) {
        throw new Error('EMAIL_FROM or EMAIL_USER is required to send email with Resend.');
    }

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
            from: `Kuxipilli <${from}>`,
            to: [options.email],
            subject: options.subject,
            html: options.message,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Resend error ${response.status}: ${errorText}`);
    }
};

const sendWithSmtp = async (options) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('EMAIL_USER and EMAIL_PASS are required to send email via SMTP.');
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
    });

    const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
    const mailOptions = {
        from: `Kuxipilli <${from}>`,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    await transporter.sendMail(mailOptions);
};

const sendEmail = async (options) => {
    if (process.env.USE_MOCK_EMAIL === 'true') {
        console.log("------------------------------------------");
        console.log("[MOCK EMAIL] To:", options.email);
        console.log("[MOCK EMAIL] Subject:", options.subject);
        console.log("[MOCK EMAIL] Message:", options.message);
        console.log("------------------------------------------");
        return;
    }

    if (process.env.RESEND_API_KEY) {
        await sendWithResend(options);
        return;
    }

    await sendWithSmtp(options);
};

module.exports = sendEmail;
