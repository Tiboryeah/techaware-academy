const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const testConn = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('SUCCESS: Connection established.');
        process.exit(0);
    } catch (err) {
        console.error('FAILURE: Could not connect.', err.message);
        process.exit(1);
    }
};

testConn();
