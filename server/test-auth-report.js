require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./src/models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

async function test() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    let user = await User.findOne({});
    if (!user) {
        user = await User.create({ name: 'Force Test', email: 'forcetest@gmail.com', passHash: '123', isVerified: true });
    }
    const token = generateToken(user._id);

    console.log("Submitting report with token...");
    const reportRes = await fetch("http://localhost:5000/api/reports/submit", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: "Real Server Error Test", category: "Otro", description: "Testing the real send." })
    });

    const reportData = await reportRes.json();
    console.log("Report status:", reportRes.status);
    console.log("Report data:", reportData);

    mongoose.disconnect();
}

test();
