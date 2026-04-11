const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    if (process.env.USE_MOCK_EMAIL === 'true') {
        console.log("------------------------------------------");
        console.log("[MOCK EMAIL] To:", options.email);
        console.log("[MOCK EMAIL] Subject:", options.subject);
        console.log("[MOCK EMAIL] Message:", options.message);
        console.log("------------------------------------------");
        return;
    }

    // Fail fast in production if SMTP is unreachable instead of hanging auth flows.
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

    const mailOptions = {
        from: `Kuxipilli <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.message // Using HTML for better formatting
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
