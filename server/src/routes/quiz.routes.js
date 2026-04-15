const express = require('express');

const { protect } = require('../middleware/authMiddleware');
const {
    getDiagnosticQuizPayload,
    getQuizPayloadById,
    submitQuizAttempt,
    getAttemptRecommendations,
} = require('../services/quizService');

const router = express.Router();

// @desc    Get diagnostic quiz
// @route   GET /api/quiz/diagnostic
// @access  Public (or Private)
router.get('/diagnostic', protect, async (req, res) => {
    try {
        const quiz = await getDiagnosticQuizPayload();

        if (!quiz) {
            return res.status(404).json({ message: 'Diagnostic quiz not found' });
        }

        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get quiz by ID
// @route   GET /api/quiz/:id
// @access  Public
router.get('/:id', protect, async (req, res) => {
    try {
        const quiz = await getQuizPayloadById(req.params.id);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Submit quiz attempt
// @route   POST /api/quiz/:id/submit
// @access  Private
router.post('/:id/submit', protect, async (req, res) => {
    try {
        const result = await submitQuizAttempt({
            quizId: req.params.id,
            userId: req.user._id,
            answers: req.body?.answers || {},
        });

        if (!result) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get recommendations for an attempt (Expert System - RF4)
// @route   GET /api/quiz/recommendations/:attemptId
// @access  Private
router.get('/recommendations/:attemptId', protect, async (req, res) => {
    try {
        const recommendations = await getAttemptRecommendations(req.params.attemptId);

        if (!recommendations) {
            return res.status(404).json({ message: 'Attempt not found' });
        }

        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
