const mongoose = require('mongoose');

const timelineItemSchema = mongoose.Schema(
    {
        time: { type: String, required: true },
        event: { type: String, required: true },
    },
    { _id: false }
);

const guideDetailsSchema = mongoose.Schema(
    {
        fullContent: { type: String, default: '' },
        setupPath: { type: String, default: '' },
        expertTip: { type: String, default: '' },
        riskAnalysis: { type: String, default: '' },
        officialLink: { type: String, default: '' },
    },
    { _id: false }
);

const resourceSchema = mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['case', 'guide'],
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        summary: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        fullContent: {
            type: String,
            default: '',
        },
        lessons: {
            type: String,
            default: '',
        },
        category: {
            type: String,
            default: '',
        },
        platform: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default: 'indigo',
        },
        riskLevel: {
            type: String,
            default: '',
        },
        tips: {
            type: [String],
            default: [],
        },
        steps: {
            type: [String],
            default: [],
        },
        timeline: {
            type: [timelineItemSchema],
            default: [],
        },
        details: {
            type: guideDetailsSchema,
            default: () => ({}),
        },
        order: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
            index: true,
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
