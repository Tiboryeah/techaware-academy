const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const ActivityLog = require('./src/models/ActivityLog');

dotenv.config();

const fixActivityLogIndex = async () => {
    await connectDB();

    const collection = ActivityLog.collection;

    await ActivityLog.updateMany(
        { uniqueKey: null },
        { $unset: { uniqueKey: '' } }
    );

    const indexes = await collection.indexes();
    const hasLegacyIndex = indexes.some((index) => index.name === 'userId_1_uniqueKey_1');

    if (hasLegacyIndex) {
        await collection.dropIndex('userId_1_uniqueKey_1');
    }

    await ActivityLog.syncIndexes();

    const refreshedIndexes = await collection.indexes();
    console.log(JSON.stringify(refreshedIndexes, null, 2));
    process.exit(0);
};

fixActivityLogIndex().catch((error) => {
    console.error(error);
    process.exit(1);
});
