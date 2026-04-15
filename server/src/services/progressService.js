const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Progress = require('../models/Progress');
const Module = require('../models/Module');
const Course = require('../models/Course');
const Quiz = require('../models/Quiz');
const Attempt = require('../models/Attempt');
const { getRecentActivity } = require('./activityLogService');

const DEBUG_LOG_PATH = path.join(__dirname, '..', '..', 'api_debug.log');

const toIdString = (value) => String(value);

const buildPublishedLearningGraph = async () => {
    const courses = await Course.find({ status: 'published' })
        .sort({ createdAt: 1 })
        .populate({
            path: 'modules',
            populate: {
                path: 'lessonOrder',
            },
        });

    const publishedCourseIds = courses.map((course) => course._id);
    const publishedCourseIdsSet = new Set(publishedCourseIds.map(toIdString));

    const publishedModules = await Module.find({ courseId: { $in: publishedCourseIds } })
        .select('_id courseId lessonOrder');
    const publishedModuleIdsSet = new Set(publishedModules.map((module) => toIdString(module._id)));

    const validLessonIdsSet = new Set(
        publishedModules.flatMap((module) => (module.lessonOrder || []).map((lessonId) => toIdString(lessonId)))
    );

    return {
        courses,
        publishedModules,
        publishedCourseIds,
        publishedCourseIdsSet,
        publishedModuleIdsSet,
        validLessonIdsSet,
    };
};

const buildProgressLookup = (progressList) => {
    const completedLessons = new Set();
    const completedModules = new Set();

    progressList.forEach((progress) => {
        (progress.completedLessons || []).forEach((lessonId) => completedLessons.add(toIdString(lessonId)));
        (progress.completedModules || []).forEach((moduleId) => completedModules.add(toIdString(moduleId)));
    });

    return {
        isLessonCompleted: (lessonId) => (lessonId ? completedLessons.has(toIdString(lessonId)) : false),
        isModuleCompleted: (moduleId) => (moduleId ? completedModules.has(toIdString(moduleId)) : false),
    };
};

const findNextLearningStep = async (userId) => {
    const { courses } = await buildPublishedLearningGraph();
    const progressList = await Progress.find({ userId });
    const { isLessonCompleted, isModuleCompleted } = buildProgressLookup(progressList);

    for (const course of courses) {
        for (const module of course.modules) {
            for (const lesson of module.lessonOrder || []) {
                if (!isLessonCompleted(lesson._id)) {
                    return {
                        type: 'lesson',
                        id: lesson._id,
                        courseId: course._id,
                        title: lesson.title,
                    };
                }
            }

            if (!isModuleCompleted(module._id) && module.quizId) {
                return {
                    type: 'quiz',
                    id: module.quizId,
                    courseId: course._id,
                    title: `Examen: ${module.title}`,
                };
            }
        }
    }

    return { type: 'complete' };
};

const summarizeProgress = (progresses, graph) => {
    let completedModulesCount = 0;
    let completedCoursesCount = 0;
    let completedLessonsCount = 0;
    const completedCourseIds = [];
    const completedModuleIds = [];

    progresses.forEach((progress) => {
        if (!progress.courseId || !graph.publishedCourseIdsSet.has(toIdString(progress.courseId))) {
            return;
        }

        const validCompletedModules = (progress.completedModules || []).filter((moduleId) =>
            graph.publishedModuleIdsSet.has(toIdString(moduleId))
        );
        completedModulesCount += validCompletedModules.length;
        completedModuleIds.push(...validCompletedModules);

        const validCompletedLessons = (progress.completedLessons || []).filter((lessonId) =>
            graph.validLessonIdsSet.has(toIdString(lessonId))
        );
        completedLessonsCount += validCompletedLessons.length;

        if (progress.isCourseCompleted) {
            completedCoursesCount += 1;
            completedCourseIds.push(progress.courseId);
        }
    });

    return {
        completedModules: completedModulesCount,
        completedCourses: completedCoursesCount,
        completedLessons: completedLessonsCount,
        totalLessons: graph.validLessonIdsSet.size,
        totalCourses: graph.publishedCourseIds.length,
        totalModules: graph.publishedModules.length,
        completedCourseIds,
        completedModuleIds,
    };
};

const findBestDiagnosticAttempt = async (userId) => {
    const diagnosticQuizzes = await Quiz.find({
        $or: [{ scope: 'diagnostic' }, { title: /diagn[oó]stico/i }],
    }).select('_id');

    const diagnosticQuizIds = diagnosticQuizzes.map((quiz) => quiz._id);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    let bestDiagnostic = await Attempt.findOne({
        userId: userObjectId,
        quizId: { $in: diagnosticQuizIds },
    }).sort({ score: -1, createdAt: -1 });

    if (!bestDiagnostic) {
        const allUserAttempts = await Attempt.find({ userId: userObjectId })
            .populate('quizId')
            .sort({ score: -1, createdAt: -1 });

        bestDiagnostic = allUserAttempts.find(
            (attempt) =>
                attempt.quizId &&
                (attempt.quizId.scope === 'diagnostic' || /diagn[oó]stico/i.test(attempt.quizId.title || ''))
        );
    }

    return {
        bestDiagnostic,
        diagnosticQuizIds,
        userObjectId,
    };
};

const buildRecentActivity = async (userObjectId) => {
    const activityEntries = await getRecentActivity(userObjectId, 5);

    if (activityEntries.length > 0) {
        return activityEntries.map((entry) => ({
            id: entry._id,
            kind: entry.kind,
            title: entry.title || 'Actividad reciente',
            subtitle: entry.subtitle || '',
            score: entry.score,
            date: entry.occurredAt || entry.createdAt,
            passed: entry.passed,
        }));
    }

    const recentAttempts = await Attempt.find({ userId: userObjectId })
        .populate({
            path: 'quizId',
            select: 'title scope',
        })
        .sort({ createdAt: -1 })
        .limit(5);

    return recentAttempts.map((attempt) => ({
        id: attempt._id,
        kind: attempt.quizId?.scope === 'diagnostic' ? 'diagnostic_attempt' : 'quiz_attempt',
        title:
            attempt.quizId?.scope === 'diagnostic'
                ? 'Diagnóstico completado'
                : attempt.quizId?.title || 'Evaluación',
        subtitle:
            attempt.quizId?.scope === 'diagnostic'
                ? 'Evaluación inicial'
                : attempt.quizId?.scope === 'course'
                    ? 'Examen final del curso'
                    : 'Evaluación de módulo',
        score: attempt.score,
        date: attempt.createdAt,
        passed: attempt.passed,
    }));
};

const writeDebugLog = (debugInfo) => {
    if (process.env.NODE_ENV === 'production') return;
    try {
        fs.appendFileSync(DEBUG_LOG_PATH, `${JSON.stringify(debugInfo)}\n`);
    } catch (error) {
        console.error('Could not write progress debug log:', error.message);
    }
};

const getOverallProgressSummary = async (user) => {
    const graph = await buildPublishedLearningGraph();
    const progresses = await Progress.find({ userId: user._id });
    const summary = summarizeProgress(progresses, graph);
    const { bestDiagnostic, diagnosticQuizIds, userObjectId } = await findBestDiagnosticAttempt(user._id);
    const recentActivity = await buildRecentActivity(userObjectId);
    const attemptsCount = await Attempt.countDocuments({ userId: userObjectId });

    const debugInfo = {
        timestamp: new Date().toISOString(),
        userId: userObjectId.toString(),
        userEmail: user?.email,
        diagQuizzesFound: diagnosticQuizIds.length,
        diagIds: diagnosticQuizIds.map((id) => id.toString()),
        hasDiag: !!bestDiagnostic,
        bestScore: bestDiagnostic?.score,
        attemptsCount,
        recentActivityCount: recentActivity.length,
    };

    writeDebugLog(debugInfo);

    return {
        ...summary,
        recentActivity,
        diagnostic: bestDiagnostic
            ? {
                score: bestDiagnostic.score,
                riskLevel: bestDiagnostic.riskLevel,
                date: bestDiagnostic.createdAt,
            }
            : null,
        _debug: debugInfo,
    };
};

module.exports = {
    findNextLearningStep,
    getOverallProgressSummary,
};
