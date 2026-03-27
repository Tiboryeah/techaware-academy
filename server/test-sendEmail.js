require('dotenv').config();
const sendEmail = require('./src/utils/sendEmail');

async function run() {
    try {
        await sendEmail({
            email: process.env.EMAIL_USER,
            subject: 'Test subject',
            message: '<p>Hello this is test</p>'
        });
        console.log("sendEmail completed successfully");
    } catch (err) {
        console.error("sendEmail failed:", err);
    }
}

run();
