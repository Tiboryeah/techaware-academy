const express = require('express');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const router = express.Router();

// @desc    Get all courses
// @route   GET /api/content/courses
// @access  Public
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find({ status: 'published' });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get single course with modules
// @route   GET /api/content/courses/:id
// @access  Public
router.get('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            // Fetch modules for this course
            const modules = await Module.find({ courseId: course._id }).populate('lessonOrder');

            // Fetch quizzes for this course and its modules
            const Quiz = require('../models/Quiz');
            const moduleIds = modules.map(m => m._id);
            const quizzes = await Quiz.find({
                $or: [
                    { refId: course._id, scope: 'course' },
                    { refId: { $in: moduleIds }, scope: 'module' }
                ]
            });

            // Map quizzes to modules
            const modulesWithQuizzes = modules.map(m => {
                const quiz = quizzes.find(q => q.refId.toString() === m._id.toString() && q.scope === 'module');
                return { ...m.toObject(), quizId: quiz ? quiz._id : null };
            });

            // Find course quiz
            const courseQuiz = quizzes.find(q => q.refId.toString() === course._id.toString() && q.scope === 'course');

            res.json({
                ...course.toObject(),
                modules: modulesWithQuizzes,
                quizId: courseQuiz ? courseQuiz._id : null
            });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get single lesson
// @route   GET /api/content/lessons/:id
// @access  Public
router.get('/lessons/:id', async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (lesson) {
            res.json(lesson);
        } else {
            res.status(404).json({ message: 'Lesson not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
