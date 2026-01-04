const express = require('express');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Attempt = require('../models/Attempt');
const { protect } = require('../middleware/authMiddleware');
const shuffleArray = require('../utils/shuffle');
const router = express.Router();

// @desc    Get diagnostic quiz
// @route   GET /api/quiz/diagnostic
// @access  Public (or Private)
router.get('/diagnostic', async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ scope: 'diagnostic' }).populate('questions');
        if (quiz) {
            const quizObj = quiz.toObject();
            if (quizObj.questions) {
                quizObj.questions = quizObj.questions.map(q => ({
                    ...q,
                    options: shuffleArray(q.options)
                }));
            }
            res.json(quizObj);
        } else {
            res.status(404).json({ message: 'Diagnostic quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get quiz by ID
// @route   GET /api/quiz/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions');
        if (quiz) {
            const quizObj = quiz.toObject();
            if (quizObj.questions) {
                quizObj.questions = quizObj.questions.map(q => ({
                    ...q,
                    options: shuffleArray(q.options)
                }));
            }
            res.json(quizObj);
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Submit quiz attempt
// @route   POST /api/quiz/:id/submit
// @access  Private
router.post('/:id/submit', protect, async (req, res) => {
    const { answers } = req.body;
    const quizId = req.params.id;
    const userId = req.user._id;

    try {
        const quiz = await Quiz.findById(quizId).populate('questions');
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        let score = 0;
        let correctCount = 0;
        const totalQuestions = quiz.questions.length;

        // Calculate score
        quiz.questions.forEach(question => {
            const userAnswerIndex = answers[question._id];
            const correctOptionIndex = question.options.findIndex(opt => opt.isCorrect);

            if (userAnswerIndex === correctOptionIndex) {
                correctCount++;
            }
        });

        score = Math.round((correctCount / totalQuestions) * 100);
        const passed = score >= 80; // US09: 80% passing score

        // Save attempt
        const attempt = await Attempt.create({
            userId,
            quizId,
            answers,
            score,
            passed,
            riskLevel: score < 50 ? 'High' : score < 80 ? 'Medium' : 'Low',
        });

        // Update Progress if passed
        let badgeEarned = false;
        if (passed) {
            badgeEarned = true;

            // Find related course ID. 
            // If scope is module, we need to find the course for that module.
            // If scope is course, refId is the course.
            let courseId = null;
            let moduleId = null;

            if (quiz.scope === 'module') {
                moduleId = quiz.refId;
                // We need to find the course for this module. 
                // Assuming we can pass courseId in body or look it up. 
                // For now, let's assume we can look it up if we had the Module model imported.
                // Or simpler: The frontend sends courseId, or we look it up.
                // Let's try to look it up if we import Module.
                const Module = require('../models/Module');
                const moduleDoc = await Module.findById(moduleId);
                if (moduleDoc) courseId = moduleDoc.courseId;
            } else if (quiz.scope === 'course') {
                courseId = quiz.refId;
            }

            if (courseId) {
                const Progress = require('../models/Progress');
                let progress = await Progress.findOne({ userId, courseId });

                if (!progress) {
                    progress = await Progress.create({
                        userId,
                        courseId,
                        completedModules: [],
                        completedLessons: []
                    });
                }

                if (quiz.scope === 'module' && moduleId) {
                    const alreadyCompleted = progress.completedModules.some(
                        id => id.toString() === moduleId.toString()
                    );
                    if (!alreadyCompleted) {
                        progress.completedModules.push(moduleId);
                    }
                } else if (quiz.scope === 'course') {
                    progress.isCourseCompleted = true;
                }

                await progress.save();
            }
        }

        res.status(201).json({
            attemptId: attempt._id,
            score,
            passed,
            badgeEarned,
            riskLevel: attempt.riskLevel,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
