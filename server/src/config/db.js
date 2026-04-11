const mongoose = require('mongoose');

let memoryServer;

const connectDB = async () => {
    const uri = process.env.MONGO_URI?.trim();
    const useInMemoryDb = process.env.USE_IN_MEMORY_DB === 'true';

    try {
        if (uri && !uri.includes('your_mongodb_atlas_uri')) {
            const conn = await mongoose.connect(uri);
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return;
        }

        if (!useInMemoryDb) {
            throw new Error(
                'MONGO_URI no está configurada correctamente. Agrega tu URI real de MongoDB Atlas en server/.env.'
            );
        }

        const { MongoMemoryServer } = require('mongodb-memory-server');
        memoryServer = await MongoMemoryServer.create();
        const memUri = memoryServer.getUri();
        const conn = await mongoose.connect(memUri);
        console.warn('Using MongoMemoryServer because USE_IN_MEMORY_DB=true');
        console.log(`MongoDB (in-memory) connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database connection failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
