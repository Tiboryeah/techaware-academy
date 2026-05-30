const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { protect, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Question = require('../models/Question');
const Resource = require('../models/Resource');
const CaseReport = require('../models/CaseReport');
const Progress = require('../models/Progress');
const Conversation = require('../models/Conversation');
const Attempt = require('../models/Attempt');
const sendEmail = require('../utils/sendEmail');

// All routes require auth + admin role
router.use(protect, admin);

/* ─────────────────────────────────────────────
   STATS — Dashboard KPIs
───────────────────────────────────────────── */
router.get('/stats', async (req, res) => {
    try {
        const [
            totalUsers,
            verifiedUsers,
            pendingReports,
            totalLessons,
            totalCourses,
            totalQuestions,
            totalCases,
            totalResources,
            totalConversations,
            completedLessonsAgg,
            recentUsers,
        ] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ isVerified: true }),
            CaseReport.countDocuments({ status: 'pendiente' }),
            Lesson.countDocuments(),
            Course.countDocuments(),
            Question.countDocuments(),
            Resource.countDocuments({ type: 'case' }),
            Resource.countDocuments({ type: { $ne: 'case' } }),
            Conversation.countDocuments(),
            Progress.aggregate([
                { $group: { _id: null, total: { $sum: { $size: '$completedLessons' } } } },
            ]),
            User.countDocuments({
                createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
            }),
        ]);

        const completedLessonsTotal = completedLessonsAgg[0]?.total ?? 0;

        res.json({
            users: {
                total: totalUsers,
                verified: verifiedUsers,
                unverified: totalUsers - verifiedUsers,
                recentWeek: recentUsers,
            },
            reports: { pending: pendingReports },
            content: {
                courses: totalCourses,
                lessons: totalLessons,
                questions: totalQuestions,
                cases: totalCases,
                resources: totalResources,
            },
            activity: {
                completedLessons: completedLessonsTotal,
                chatbotConversations: totalConversations,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener estadísticas' });
    }
});

/* ─────────────────────────────────────────────
   USERS
───────────────────────────────────────────── */
router.get('/users', async (req, res) => {
    try {
        const { page = 1, limit = 20, search = '', status = '', role = '' } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }
        if (status === 'verified') query.isVerified = true;
        if (status === 'unverified') query.isVerified = false;
        if (role) query.role = role;

        const [users, total] = await Promise.all([
            User.find(query)
                .select('-passHash -verificationToken -resetPasswordToken -resetPasswordExpire')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(Number(limit)),
            User.countDocuments(query),
        ]);

        // Enrich with progress stats
        const userIds = users.map((u) => u._id);
        const progressList = await Progress.find({ userId: { $in: userIds } });
        const progressMap = {};
        for (const p of progressList) {
            progressMap[p.userId.toString()] = (p.completedLessons || []).length;
        }

        const enriched = users.map((u) => ({
            ...u.toObject(),
            completedLessons: progressMap[u._id.toString()] ?? 0,
        }));

        res.json({ users: enriched, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

router.patch('/users/:id', async (req, res) => {
    try {
        const { role, isVerified } = req.body;
        const user = await User.findById(req.params.id).select('-passHash');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (role !== undefined) user.role = role;
        if (isVerified !== undefined) user.isVerified = isVerified;
        await user.save();

        res.json({ message: 'Usuario actualizado', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({ message: 'No puedes eliminar tu propia cuenta' });
        }
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
});

router.post('/users/:id/resend-verification', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        if (user.isVerified) return res.status(400).json({ message: 'El usuario ya está verificado' });

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationToken = code;
        await user.save();

        await sendEmail({
            email: user.email,
            subject: 'Kuxipilli — Código de verificación (reenvío)',
            message: `<p>Tu código de verificación es: <strong>${code}</strong></p><p>Expira en 10 minutos.</p>`,
        });

        res.json({ message: 'Correo de verificación reenviado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al reenviar verificación' });
    }
});

/* ─────────────────────────────────────────────
   REPORTS
───────────────────────────────────────────── */
router.get('/reports', async (req, res) => {
    try {
        const { page = 1, limit = 20, status = '', category = '', messageType = '' } = req.query;
        const query = {};
        if (status) query.status = status;
        if (category) query.category = category;
        if (messageType) query.messageType = messageType;

        const [reports, total] = await Promise.all([
            CaseReport.find(query)
                .populate('userId', 'name email')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(Number(limit)),
            CaseReport.countDocuments(query),
        ]);

        res.json({ reports, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener reportes' });
    }
});

router.patch('/reports/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const report = await CaseReport.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('userId', 'name email');
        if (!report) return res.status(404).json({ message: 'Reporte no encontrado' });
        res.json({ message: 'Reporte actualizado', report });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar reporte' });
    }
});

router.delete('/reports/:id', async (req, res) => {
    try {
        await CaseReport.findByIdAndDelete(req.params.id);
        res.json({ message: 'Reporte eliminado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar reporte' });
    }
});

/* ─────────────────────────────────────────────
   COURSES & MODULES
───────────────────────────────────────────── */
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find().sort({ order: 1, title: 1 });
        const enriched = await Promise.all(
            courses.map(async (course) => {
                const modules = await Module.find({ courseId: course._id }).sort({ order: 1 });
                const lessonCount = await Lesson.countDocuments({
                    moduleId: { $in: modules.map((m) => m._id) },
                });
                const enrolledCount = await Progress.countDocuments({ courseId: course._id });
                return { ...course.toObject(), modules, lessonCount, enrolledCount };
            })
        );
        res.json(enriched);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener cursos' });
    }
});

router.patch('/courses/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );
        if (!course) return res.status(404).json({ message: 'Curso no encontrado' });
        res.json({ message: 'Curso actualizado', course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar curso' });
    }
});

/* ─────────────────────────────────────────────
   LESSONS
───────────────────────────────────────────── */
router.get('/lessons', async (req, res) => {
    try {
        const { courseId, moduleId, type, page = 1, limit = 30, search = '' } = req.query;
        const query = {};
        if (moduleId) query.moduleId = moduleId;
        if (type) query.type = type;
        if (search) query.title = { $regex: search, $options: 'i' };

        // Filter by courseId via module
        if (courseId) {
            const modules = await Module.find({ courseId });
            query.moduleId = { $in: modules.map((m) => m._id) };
        }

        const [lessons, total] = await Promise.all([
            Lesson.find(query)
                .sort({ moduleId: 1, order: 1 })
                .skip((page - 1) * limit)
                .limit(Number(limit))
                .populate('moduleId', 'title courseId'),
            Lesson.countDocuments(query),
        ]);

        res.json({ lessons, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener lecciones' });
    }
});

router.get('/lessons/:id', async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id).populate('moduleId', 'title courseId');
        if (!lesson) return res.status(404).json({ message: 'Lección no encontrada' });
        res.json(lesson);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener lección' });
    }
});

router.patch('/lessons/:id', async (req, res) => {
    try {
        const allowed = ['title', 'content', 'type', 'order', 'videoUrl', 'duration'];
        const updates = {};
        for (const key of allowed) {
            if (req.body[key] !== undefined) updates[key] = req.body[key];
        }
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!lesson) return res.status(404).json({ message: 'Lección no encontrada' });
        res.json({ message: 'Lección actualizada', lesson });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar lección' });
    }
});

/* ─────────────────────────────────────────────
   QUESTIONS
───────────────────────────────────────────── */
router.get('/questions', async (req, res) => {
    try {
        const { quizId, riskArea, platform, type, page = 1, limit = 30, search = '' } = req.query;
        const query = {};
        if (quizId) query.quizId = quizId;
        if (riskArea) query.riskArea = riskArea;
        if (platform) query.platform = platform;
        if (type) query.type = type;
        if (search) query.prompt = { $regex: search, $options: 'i' };

        const [questions, total] = await Promise.all([
            Question.find(query)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(Number(limit)),
            Question.countDocuments(query),
        ]);

        // Enrich with fail rate
        const qIds = questions.map((q) => q._id.toString());
        const attempts = await Attempt.find({ 'answers.questionId': { $in: qIds } });

        const failMap = {};
        for (const attempt of attempts) {
            for (const ans of attempt.answers || []) {
                const id = ans.questionId?.toString();
                if (!failMap[id]) failMap[id] = { total: 0, wrong: 0 };
                failMap[id].total += 1;
                if (!ans.isCorrect) failMap[id].wrong += 1;
            }
        }

        const enriched = questions.map((q) => {
            const stats = failMap[q._id.toString()];
            const failRate = stats ? Math.round((stats.wrong / stats.total) * 100) : null;
            return { ...q.toObject(), failRate, attempts: stats?.total ?? 0 };
        });

        res.json({ questions: enriched, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener preguntas' });
    }
});

router.post('/questions', async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json({ message: 'Pregunta creada', question });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

router.patch('/questions/:id', async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!question) return res.status(404).json({ message: 'Pregunta no encontrada' });
        res.json({ message: 'Pregunta actualizada', question });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

router.delete('/questions/:id', async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: 'Pregunta eliminada' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar pregunta' });
    }
});

/* ─────────────────────────────────────────────
   CASES (Resources type=case)
───────────────────────────────────────────── */
router.get('/cases', async (req, res) => {
    try {
        const { page = 1, limit = 20, search = '', platform = '' } = req.query;
        const query = { type: 'case' };
        if (search) query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { summary: { $regex: search, $options: 'i' } },
        ];
        if (platform) query.platform = platform;

        const [cases, total] = await Promise.all([
            Resource.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
            Resource.countDocuments(query),
        ]);
        res.json({ cases, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener casos' });
    }
});

router.post('/cases', async (req, res) => {
    try {
        const resource = new Resource({ ...req.body, type: 'case' });
        await resource.save();
        res.status(201).json({ message: 'Caso creado', resource });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/cases/:id', async (req, res) => {
    try {
        const resource = await Resource.findOneAndUpdate(
            { _id: req.params.id, type: 'case' },
            req.body,
            { new: true, runValidators: true }
        );
        if (!resource) return res.status(404).json({ message: 'Caso no encontrado' });
        res.json({ message: 'Caso actualizado', resource });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/cases/:id', async (req, res) => {
    try {
        await Resource.findOneAndDelete({ _id: req.params.id, type: 'case' });
        res.json({ message: 'Caso eliminado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar caso' });
    }
});

/* ─────────────────────────────────────────────
   EDITORIAL RESOURCES
───────────────────────────────────────────── */
router.get('/resources', async (req, res) => {
    try {
        const { page = 1, limit = 20, search = '', type = '' } = req.query;
        const query = { type: { $ne: 'case' } };
        if (type) query.type = type;
        if (search) query.title = { $regex: search, $options: 'i' };

        const [resources, total] = await Promise.all([
            Resource.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
            Resource.countDocuments(query),
        ]);
        res.json({ resources, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener recursos' });
    }
});

router.post('/resources', async (req, res) => {
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).json({ message: 'Recurso creado', resource });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/resources/:id', async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!resource) return res.status(404).json({ message: 'Recurso no encontrado' });
        res.json({ message: 'Recurso actualizado', resource });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/resources/:id', async (req, res) => {
    try {
        await Resource.findByIdAndDelete(req.params.id);
        res.json({ message: 'Recurso eliminado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar recurso' });
    }
});

module.exports = router;
