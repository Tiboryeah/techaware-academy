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

        let weightedScore = 0;
        let totalPossiblePoints = 0;
        let correctCount = 0;
        const totalQuestions = quiz.questions.length;

        // Analytical Counters (US08 / RF4)
        const errorsByArea = new Map();
        const errorsByPlatform = new Map();
        const questionDetails = [];

        // Calculate score and analyze errors
        quiz.questions.forEach(question => {
            const getCorrectAnswer = () => {
                if (question.type === 'single_choice' || question.type === 'case_study' || question.type === 'multiple_selection') {
                    const correctOptions = question.options.filter(o => o.isCorrect).map(o => o.text);
                    return question.type === 'multiple_selection' ? correctOptions : (correctOptions[0] || "N/A");
                }
                return question.metadata?.correctAnswer || "Consultar guía";
            };
            const userSelection = answers[question._id.toString()];
            let isCorrect = false;
            const questionPoints = question.points || 10;
            totalPossiblePoints += questionPoints;

            if (!userSelection) {
                isCorrect = false;
            } else if (question.type === 'single_choice' || question.type === 'case_study' || !question.type) {
                const correctOption = question.options.find(opt => opt.isCorrect);
                if (correctOption && userSelection.toString() === correctOption._id.toString()) {
                    isCorrect = true;
                }
            } else if (question.type === 'multiple_selection') {
                const correctOptions = question.options.filter(opt => opt.isCorrect).map(opt => opt._id.toString());
                if (Array.isArray(userSelection)) {
                    const userSelections = userSelection.map(s => s.toString());
                    isCorrect = userSelections.length === correctOptions.length &&
                                userSelections.every(s => correctOptions.includes(s));
                }
            } else {
                const correctAnswer = question.metadata?.correctAnswer;
                if (correctAnswer && userSelection) {
                    if (question.type === 'order_sequence') {
                        // Array Comparison (Order matters)
                        isCorrect = Array.isArray(userSelection) && 
                                    Array.isArray(correctAnswer) &&
                                    userSelection.length === correctAnswer.length &&
                                    userSelection.every((val, index) => val === correctAnswer[index]);
                    } else if (question.type === 'match_columns' || question.type === 'categorize') {
                        // Object of Arrays (Order does NOT matter within categories)
                        const userKeys = Object.keys(userSelection);
                        const correctKeys = Object.keys(correctAnswer);
                        
                        if (userKeys.length === correctKeys.length) {
                            isCorrect = correctKeys.every(key => {
                                const userArray = userSelection[key] || [];
                                const correctArray = correctAnswer[key] || [];
                                if (userArray.length !== correctArray.length) return false;
                                return correctArray.every(item => userArray.includes(item));
                            });
                        }
                    } else if (typeof correctAnswer === 'object') {
                        // Simple Object Comparison (e.g., drag_drop, fill_blanks, drop_down)
                        const userKeys = Object.keys(userSelection);
                        const correctKeys = Object.keys(correctAnswer);
                        if (userKeys.length === correctKeys.length) {
                            isCorrect = correctKeys.every(key => userSelection[key] === correctAnswer[key]);
                        }
                    } else {
                        // String/Primitives
                        isCorrect = userSelection === correctAnswer;
                    }
                }
            }

            if (isCorrect) {
                weightedScore += questionPoints;
                correctCount++;
            } else {
                if (question.riskArea) {
                    const currentAreaCount = errorsByArea.get(question.riskArea) || 0;
                    errorsByArea.set(question.riskArea, currentAreaCount + 1);
                }
                if (question.platform) {
                    const currentPlatformCount = errorsByPlatform.get(question.platform) || 0;
                    errorsByPlatform.set(question.platform, currentPlatformCount + 1);
                }
            }

            // Format userAnswer for display (Convert IDs to Text if necessary)
            let displayAnswer = userSelection;
            if (question.type === 'single_choice' || question.type === 'case_study' || !question.type) {
                const selectedOption = question.options.find(opt => opt._id.toString() === userSelection.toString());
                displayAnswer = selectedOption ? selectedOption.text : userSelection;
            } else if (question.type === 'multiple_selection') {
                if (Array.isArray(userSelection)) {
                    displayAnswer = question.options
                        .filter(opt => userSelection.some(s => s.toString() === opt._id.toString()))
                        .map(opt => opt.text);
                }
            }

            questionDetails.push({
                questionId: question._id,
                text: question.text,
                type: question.type,
                isCorrect,
                userAnswer: displayAnswer,
                correctAnswer: getCorrectAnswer(),
                explanation: question.explanation || "Revisa los artículos de este módulo para reforzar este concepto."
            });
        });

        score = totalPossiblePoints > 0 ? Math.round((weightedScore / totalPossiblePoints) * 100) : 0;
        const passed = score >= (quiz.minPassing || 80);

        // Save analytic attempt
        const attempt = await Attempt.create({
            userId,
            quizId,
            answers,
            score,
            passed,
            riskLevel: score < 50 ? 'Alto' : score < 80 ? 'Medio' : 'Bajo',
            errorsByArea,
            errorsByPlatform
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

                    // RF9: Award official digital accreditation
                    const Accreditation = require('../models/Accreditation');
                    try {
                        await Accreditation.create({
                            userId,
                            courseId
                        });
                    } catch (err) {
                        // Ignore if unique index fails (already accredited)
                    }
                }

                await progress.save();
            }
        }

        res.status(201).json({
            attemptId: attempt._id,
            score,
            passed,
            correctCount,
            badgeEarned,
            riskLevel: attempt.riskLevel,
            questionDetails
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get recommendations for an attempt (Expert System - RF4)
// @route   GET /api/quiz/recommendations/:attemptId
// @access  Private
router.get('/recommendations/:attemptId', protect, async (req, res) => {
    try {
        const attempt = await Attempt.findById(req.params.attemptId);
        if (!attempt) return res.status(404).json({ message: 'Attempt not found' });

        const Lesson = require('../models/Lesson');

        // Logic to find lessons/modules related to error areas
        const areas = Array.from(attempt.errorsByArea.get ? attempt.errorsByArea.keys() : Object.keys(attempt.errorsByArea || {}));
        const platforms = Array.from(attempt.errorsByPlatform.get ? attempt.errorsByPlatform.keys() : Object.keys(attempt.errorsByPlatform || {}));

        // Find relevant lessons
        let recommendedLessons = [];
        if (areas.length > 0 || platforms.length > 0) {
            recommendedLessons = await Lesson.find({
                $or: [
                    { riskAreas: { $in: areas } },
                    { platforms: { $in: platforms } }
                ]
            }).limit(4).select('title _id riskAreas platforms');
        }

        const logic = {
            areasToReview: areas,
            platformsToReview: platforms,
            recommendedLessons,
            message: attempt.score < 80
                ? "Basado en tus resultados, te recomendamos priorizar el estudio de las lecciones mencionadas para fortalecer tu nivel de protección."
                : "¡Excelente! Has demostrado gran dominio, pero siempre puedes repasar estos puntos clave para mantener tu estatus de Leyenda."
        };

        res.json(logic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
