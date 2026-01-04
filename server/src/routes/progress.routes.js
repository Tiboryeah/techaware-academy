const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Course = require('../models/Course');
const Attempt = require('../models/Attempt');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get next item to resume learning
// @route   GET /api/progress/next-step
// @access  Private
router.get('/next-step', protect, async (req, res) => {
    try {
        console.log(`User ${req.user._id} requesting /next-step`);

        // Fetch all courses with hierarchy
        const courses = await Course.find({ status: 'published' }).sort({ createdAt: 1 }).populate({
            path: 'modules',
            populate: {
                path: 'lessonOrder'
            }
        });

        // Fetch user progress
        const progressList = await Progress.find({ userId: req.user._id });

        // Helper to check if item is completed (Robust comparison)
        const isLessonCompleted = (lessonId) => {
            if (!lessonId) return false;
            return progressList.some(p => p.completedLessons && p.completedLessons.some(id => String(id) === String(lessonId)));
        };

        const isModuleCompleted = (moduleId) => {
            if (!moduleId) return false;
            return progressList.some(p => p.completedModules && p.completedModules.some(id => String(id) === String(moduleId)));
        };

        let nextItem = null;

        // Iterate through hierarchy to find first incomplete item
        for (const course of courses) {
            console.log(`Checking Course: ${course.title}`);
            for (const module of course.modules) {
                // 1. Check Lessons
                if (module.lessonOrder && module.lessonOrder.length > 0) {
                    for (const lesson of module.lessonOrder) {
                        const completed = isLessonCompleted(lesson._id);
                        if (!completed) {
                            console.log(`    FOUND NEXT: Lesson - ${lesson.title}`);
                            return res.json({
                                type: 'lesson',
                                id: lesson._id,
                                courseId: course._id,
                                title: lesson.title
                            });
                        }
                    }
                }

                // 2. Check Module Quiz
                const modCompleted = isModuleCompleted(module._id);

                if (!modCompleted) {
                    if (module.quizId) {
                        console.log(`    FOUND NEXT: Quiz - ${module.title}`);
                        return res.json({
                            type: 'quiz',
                            id: module.quizId,
                            courseId: course._id,
                            title: `Examen: ${module.title}`
                        });
                    }
                }
            }
        }

        // If nothing found, user completed everything
        console.log(`Nothing found. All Complete.`);
        res.json({ type: 'complete' });

    } catch (error) {
        console.error("Error finding next item:", error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Mark lesson as complete
// @route   POST /api/progress/lesson/:lessonId/complete
// @access  Private
router.post('/lesson/:lessonId/complete', protect, async (req, res) => {
    const { lessonId } = req.params;
    const { courseId, moduleId } = req.body;

    try {
        // Use findOneAndUpdate with upsert to handle creation and update atomically
        const progress = await Progress.findOneAndUpdate(
            { userId: req.user._id, courseId },
            {
                $setOnInsert: { userId: req.user._id, courseId, completedModules: [] },
                $addToSet: { completedLessons: lessonId }
            },
            { new: true, upsert: true }
        );

        res.json({ message: 'Lesson marked as complete', progress });
    } catch (error) {
        console.error("Error marking lesson complete:", error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get progress for a course
// @desc    Get progress for a course
// @route   GET /api/progress/course/:courseId
// @access  Private
router.get('/course/:courseId', protect, async (req, res) => {
    try {
        const progress = await Progress.findOne({ userId: req.user._id, courseId: req.params.courseId });

        if (!progress) {
            return res.json({
                completedLessons: [],
                completedModules: [],
                isCourseCompleted: false
            });
        }

        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ... (existing routes)

// @desc    Get overall progress summary
// @route   GET /api/progress/summary/all
// @access  Private
router.get('/summary/all', protect, async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch published courses first for filtering
        const publishedCoursesDocs = await Course.find({ status: 'published' }).select('_id');
        const publishedCourseIdsList = publishedCoursesDocs.map(c => c._id);
        const publishedCourseIdsSet = new Set(publishedCourseIdsList.map(id => id.toString()));

        const progresses = await Progress.find({ userId });

        let completedModulesCount = 0;
        let completedCoursesCount = 0;
        let completedLessonsCount = 0;
        let completedCourseIds = [];
        let completedModuleIds = [];



        // CRITICAL FIX: Fetch all valid LESSON IDs for published courses
        // This ensures we don't count lessons that were deleted/orphaned but still exist in user history
        const validLessonDocs = await Lesson.find({ courseId: { $in: publishedCourseIdsList } }).select('_id');
        const validLessonIdsSet = new Set(validLessonDocs.map(l => l._id.toString()));

        progresses.forEach(p => {
            // Only count progress if the COURSE is still published
            if (p.courseId && publishedCourseIdsSet.has(p.courseId.toString())) {
                completedModulesCount += p.completedModules.length;

                // Only count lessons that are VALID and PUBLISHED
                // Filter out any "ghost" lessons from previous database seeds
                const validCompletedLessons = p.completedLessons.filter(lId => validLessonIdsSet.has(lId.toString()));
                completedLessonsCount += validCompletedLessons.length;

                completedModuleIds.push(...p.completedModules);

                if (p.isCourseCompleted) {
                    completedCoursesCount++;
                    completedCourseIds.push(p.courseId);
                }
            }
        });

        // Get total counts for percentage calculations, filtered by PUBLISHED courses only
        const [totalLessons, totalCourses, totalModules] = await Promise.all([
            Lesson.countDocuments({ courseId: { $in: publishedCourseIdsList } }),
            Course.countDocuments({ status: 'published' }),
            Module.countDocuments({ courseId: { $in: publishedCourseIdsList } })
        ]);



        // Fetch latest diagnostic assessment (BULLETPROOF SEARCH)
        const mongoose = require('mongoose');
        const fs = require('fs');

        const uId = new mongoose.Types.ObjectId(userId);

        // 1. Get all potential diagnostic quiz IDs (Scope OR Title)
        const diagnosticQuizzes = await Quiz.find({
            $or: [
                { scope: 'diagnostic' },
                { title: /diagnóstico/i }
            ]
        }).select('_id');
        const diagIds = diagnosticQuizzes.map(q => q._id);

        // ALWAYS FETCH THE HIGHEST SCORE ATTEMPT
        let bestDiagnostic = await Attempt.findOne({
            userId: uId,
            quizId: { $in: diagIds }
        }).sort({ score: -1, createdAt: -1 });

        // 2. FAIL-SAFE: If still null, search all user attempts and check scope/title
        if (!bestDiagnostic) {
            const allUserAttempts = await Attempt.find({ userId: uId }).populate('quizId').sort({ score: -1 });
            bestDiagnostic = allUserAttempts.find(a =>
                a.quizId && (a.quizId.scope === 'diagnostic' || a.quizId.title?.toLowerCase().includes('diagnóstico'))
            );
        }

        const attemptsCount = await Attempt.countDocuments({ userId: uId });
        const debugInfo = {
            timestamp: new Date().toISOString(),
            userId: uId.toString(),
            userEmail: req.user?.email,
            diagQuizzesFound: diagIds.length,
            diagIds: diagIds.map(id => id.toString()),
            hasDiag: !!bestDiagnostic,
            bestScore: bestDiagnostic?.score,
            attemptsCount,
            recentActivityCount: 0 // Will update after fetch
        };

        // 3. FETCH RECENT ACTIVITY (Last 5 attempts)
        const recentAttempts = await Attempt.find({ userId: uId })
            .populate({
                path: 'quizId',
                select: 'title scope module'
            })
            .sort({ createdAt: -1 })
            .limit(5);

        debugInfo.recentActivityCount = recentAttempts.length;

        // Write to log for agent to read
        try {
            fs.appendFileSync('c:/Users/USER/.gemini/antigravity/scratch/sistema_reporte/server/api_debug.log', JSON.stringify(debugInfo) + '\n');
        } catch (e) { }

        const recentActivity = recentAttempts.map(a => ({
            id: a._id,
            type: a.quizId?.scope === 'diagnostic' ? 'DIAGNOSTIC' : 'QUIZ',
            title: a.quizId?.title || 'Evaluación',
            score: a.score,
            date: a.createdAt,
            passed: a.passed
        }));

        res.json({
            completedModules: completedModulesCount,
            completedCourses: completedCoursesCount,
            completedLessons: completedLessonsCount,
            totalLessons,
            totalCourses,
            totalModules,
            completedCourseIds,
            completedModuleIds,
            recentActivity,
            diagnostic: bestDiagnostic ? {
                score: bestDiagnostic.score,
                riskLevel: bestDiagnostic.riskLevel,
                date: bestDiagnostic.createdAt
            } : null,
            _debug: debugInfo
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
