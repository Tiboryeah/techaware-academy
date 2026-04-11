const express = require('express');

const router = express.Router();

const Progress = require('../models/Progress');
const { protect } = require('../middleware/authMiddleware');
const {
    findNextLearningStep,
    getOverallProgressSummary,
} = require('../services/progressService');

// @desc    Get next item to resume learning
// @route   GET /api/progress/next-step
// @access  Private
router.get('/next-step', protect, async (req, res) => {
    try {
        console.log(`User ${req.user._id} requesting /next-step`);

        const nextItem = await findNextLearningStep(req.user._id);
        res.json(nextItem);
    } catch (error) {
        console.error('Error finding next item:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Mark lesson as complete
// @route   POST /api/progress/lesson/:lessonId/complete
// @access  Private
router.post('/lesson/:lessonId/complete', protect, async (req, res) => {
    const { lessonId } = req.params;
    const { courseId } = req.body;

    try {
        const progress = await Progress.findOneAndUpdate(
            { userId: req.user._id, courseId },
            {
                $setOnInsert: {
                    userId: req.user._id,
                    courseId,
                    completedModules: [],
                },
                $addToSet: { completedLessons: lessonId },
            },
            { new: true, upsert: true }
        );

        res.json({ message: 'Lesson marked as complete', progress });
    } catch (error) {
        console.error('Error marking lesson complete:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get progress for a course
// @route   GET /api/progress/course/:courseId
// @access  Private
router.get('/course/:courseId', protect, async (req, res) => {
    try {
        const progress = await Progress.findOne({
            userId: req.user._id,
            courseId: req.params.courseId,
        });

        if (!progress) {
            return res.json({
                completedLessons: [],
                completedModules: [],
                isCourseCompleted: false,
            });
        }

        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get overall progress summary
// @route   GET /api/progress/summary/all
// @access  Private
router.get('/summary/all', protect, async (req, res) => {
    try {
        const summary = await getOverallProgressSummary(req.user);
        res.json(summary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
