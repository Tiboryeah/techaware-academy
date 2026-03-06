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

    // 1. Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // 2. Define email options
    const mailOptions = {
        from: `Kuxipilli <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.message // Using HTML for better formatting
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
