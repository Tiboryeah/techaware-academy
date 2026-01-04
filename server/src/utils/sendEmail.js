const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Create a transporter
    // For development, we can use a service like Gmail or a testing service like Ethereal
    // Ideally, these come from env vars
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or 'hotmail', 'sendgrid', etc.
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // 2. Define email options
    const mailOptions = {
        from: `TechAware Kids <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.message // Using HTML for better formatting
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
