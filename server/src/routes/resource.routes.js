const express = require('express');

const Resource = require('../models/Resource');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, async (req, res) => {
    try {
        const filter = { isPublished: true };

        if (req.query.type) {
            filter.type = req.query.type;
        }

        const page  = Math.max(1, parseInt(req.query.page)  || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 9));
        const skip  = (page - 1) * limit;

        const [data, total] = await Promise.all([
            Resource.find(filter).sort({ order: 1, createdAt: 1 }).skip(skip).limit(limit),
            Resource.countDocuments(filter),
        ]);

        res.json({
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            hasNextPage: skip + data.length < total,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:slug', protect, async (req, res) => {
    try {
        const resource = await Resource.findOne({
            slug: req.params.slug,
            isPublished: true,
        });

        if (!resource) {
            return res.status(404).json({ message: 'Recurso no encontrado.' });
        }

        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
