const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Message = require('./src/models/Message');

dotenv.config();

const checkHistory = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected');
    const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
    console.log(JSON.stringify(messages, null, 2));
    await mongoose.disconnect();
};

checkHistory();
