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

    const activityPayload = {
        ...payload,
        occurredAt: payload.occurredAt || new Date(),
    };

    if (!activityPayload.uniqueKey) {
        delete activityPayload.uniqueKey;
    }

    return ActivityLog.create(activityPayload);
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
