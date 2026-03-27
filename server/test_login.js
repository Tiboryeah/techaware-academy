const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    passHash: String,
    isVerified: Boolean
}));

const testLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: 'admin@example.com' });
        if (!user) {
            console.log('USER NOT FOUND');
            return;
        }
        const isMatch = await bcrypt.compare('123456', user.passHash);
        console.log('Admin Verified?', user.isVerified);
        console.log('Password "123456" Matches?', isMatch);
        process.exit(0);
    } catch (err) {
        console.error('ERROR:', err.message);
        process.exit(1);
    }
};

testLogin();
