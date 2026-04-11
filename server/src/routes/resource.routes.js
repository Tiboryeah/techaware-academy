const express = require('express');

const Resource = require('../models/Resource');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const filter = { isPublished: true };

        if (req.query.type) {
            filter.type = req.query.type;
        }

        const resources = await Resource.find(filter).sort({ order: 1, createdAt: 1 });
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:slug', async (req, res) => {
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
