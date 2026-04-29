const express = require('express');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// @desc    Get public platform stats (no auth required)
// @route   GET /api/content/stats
// @access  Public
router.get('/stats', async (req, res) => {
    try {
        const Resource = require('../models/Resource');

        // Count lessons the same way the progress summary does:
        // only lessons referenced in modules of published courses
        const publishedCourses = await Course.find({ status: 'published' }).select('_id');
        const publishedCourseIds = publishedCourses.map((c) => c._id);
        const publishedModules = await Module.find({ courseId: { $in: publishedCourseIds } }).select('lessonOrder');
        const uniqueLessonIds = new Set(
            publishedModules.flatMap((m) => (m.lessonOrder || []).map((id) => id.toString()))
        );

        const [courses, cases] = await Promise.all([
            Course.countDocuments({ status: 'published' }),
            Resource.countDocuments({ type: 'case', isPublished: true })
        ]);

        res.json({ courses, lessons: uniqueLessonIds.size, cases });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get latest educational update for dashboard news card
// @route   GET /api/content/latest-update
// @access  Private
router.get('/latest-update', protect, async (req, res) => {
    try {
        const Resource = require('../models/Resource');

        const [latestLesson, latestResource] = await Promise.all([
            Lesson.findOne({ type: { $in: ['article', 'guide'] } })
                .sort({ updatedAt: -1, createdAt: -1 })
                .select('title type duration updatedAt createdAt')
                .lean(),
            Resource.findOne({ type: { $in: ['case', 'guide'] }, isPublished: true })
                .sort({ updatedAt: -1, createdAt: -1 })
                .select('title type summary description slug updatedAt createdAt')
                .lean(),
        ]);

        const candidates = [];

        if (latestLesson) {
            const lessonKind = latestLesson.type === 'guide' ? 'Nueva guía' : 'Nuevo artículo';
            candidates.push({
                kind: 'lesson',
                label: lessonKind,
                title: latestLesson.title,
                description: latestLesson.type === 'guide'
                    ? 'Agregamos una guía de aprendizaje para reforzar una habilidad práctica.'
                    : 'Agregamos un artículo nuevo para ampliar el contenido formativo.',
                href: `/lecciones/${latestLesson._id}`,
                createdAt: latestLesson.createdAt,
                updatedAt: latestLesson.updatedAt,
            });
        }

        if (latestResource) {
            const isCase = latestResource.type === 'case';
            candidates.push({
                kind: latestResource.type,
                label: isCase ? 'Nuevo caso real' : 'Nueva guía práctica',
                title: latestResource.title,
                description: latestResource.summary || latestResource.description || (
                    isCase
                        ? 'Agregamos un caso real para analizar señales de alerta y respuestas familiares.'
                        : 'Agregamos una guía práctica para acompañar mejor la seguridad digital.'
                ),
                href: isCase ? `/casos/${latestResource.slug}` : '/casos-y-guias?seccion=guias',
                createdAt: latestResource.createdAt,
                updatedAt: latestResource.updatedAt,
            });
        }

        const latest = candidates
            .sort((left, right) =>
                new Date(right.updatedAt || right.createdAt) - new Date(left.updatedAt || left.createdAt)
            )[0] || null;

        res.json(latest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all courses
// @route   GET /api/content/courses
// @access  Public
router.get('/courses', protect, async (req, res) => {
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
router.get('/courses/:id', protect, async (req, res) => {
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
router.get('/lessons/:id', protect, async (req, res) => {
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
