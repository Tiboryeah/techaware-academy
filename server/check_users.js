const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    role: String
}));

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({}, 'email role');
        console.log('USERS IN DB:', JSON.stringify(users, null, 2));
        process.exit(0);
    } catch (err) {
        console.error('ERROR:', err.message);
        process.exit(1);
    }
};

checkUsers();
