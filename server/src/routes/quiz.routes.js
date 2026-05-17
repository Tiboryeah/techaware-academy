const express = require('express');

const { protect } = require('../middleware/authMiddleware');
const {
    getDiagnosticQuizPayload,
    getQuizPayloadById,
    submitQuizAttempt,
    getAttemptRecommendations,
    getLatestRecommendation,
} = require('../services/quizService');

const router = express.Router();

// Debe ir antes de /:id para que Express no lo interprete como un ID
router.get('/diagnostic', protect, async (req, res) => {
    try {
        const quiz = await getDiagnosticQuizPayload();
        if (!quiz) return res.status(404).json({ message: 'Diagnóstico no encontrado' });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Recomendaciones inmediatas al terminar un intento (pantalla de resultados)
router.get('/recommendations/:attemptId', protect, async (req, res) => {
    try {
        const recommendations = await getAttemptRecommendations(req.params.attemptId);
        if (!recommendations) return res.status(404).json({ message: 'Intento no encontrado' });
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Última recomendación persistida del usuario (card del dashboard)
// Debe ir antes de /:id
router.get('/my-recommendations', protect, async (req, res) => {
    try {
        const rec = await getLatestRecommendation(req.user._id);
        res.json(rec || null);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', protect, async (req, res) => {
    try {
        const quiz = await getQuizPayloadById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz no encontrado' });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:id/submit', protect, async (req, res) => {
    try {
        const result = await submitQuizAttempt({
            quizId: req.params.id,
            userId: req.user._id,
            answers: req.body?.answers || {},
        });
        if (!result) return res.status(404).json({ message: 'Quiz no encontrado' });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
