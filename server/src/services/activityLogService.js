const ActivityLog = require('../models/ActivityLog');

const createActivityLog = async (payload) => {
    if (!payload?.userId || !payload?.kind || !payload?.title) {
        return null;
    }

    if (payload.uniqueKey) {
        const existingEntry = await ActivityLog.findOne({
            userId: payload.userId,
            uniqueKey: payload.uniqueKey,
        });

        if (existingEntry) {
            return existingEntry;
        }
    }

    return ActivityLog.create({
        ...payload,
        occurredAt: payload.occurredAt || new Date(),
    });
};

const getRecentActivity = async (userId, limit = 5) =>
    ActivityLog.find({ userId })
        .sort({ occurredAt: -1, createdAt: -1 })
        .limit(limit)
        .lean();

module.exports = {
    createActivityLog,
    getRecentActivity,
};
