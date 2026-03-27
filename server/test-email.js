require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
    console.log("Using user:", process.env.EMAIL_USER);
    console.log("Using pass:", process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log("SMTP connection verified successfully");
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Test Email",
            text: "This is a test email."
        };
        
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (e) {
        console.error("Error with SMTP:", e);
    }
}

testEmail();
