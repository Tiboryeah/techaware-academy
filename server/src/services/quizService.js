const Quiz = require('../models/Quiz');
require('../models/Question');
const Attempt = require('../models/Attempt');
const Module = require('../models/Module');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
const Accreditation = require('../models/Accreditation');
const Lesson = require('../models/Lesson');
const { createActivityLog } = require('./activityLogService');
const shuffleArray = require('../utils/shuffle');

const OPTION_BASED_TYPES = new Set([
    'single_choice',
    'multiple_choice',
    'multiple_selection',
    'case_study',
]);

const SINGLE_SELECTION_TYPES = new Set([
    'single_choice',
    'multiple_choice',
    'case_study',
]);

const DEFAULT_EXPLANATION = 'Revisa los artículos de este módulo para reforzar este concepto.';
const DEFAULT_CORRECT_ANSWER = 'Consultar guía';
const LESSON_TYPE_PRIORITY = {
    guide: 4,
    article: 3,
    case_study: 2,
    video: 1,
};
const COMMON_GUIDANCE_WORDS = new Set([
    'ante',
    'aqui',
    'bien',
    'cada',
    'chat',
    'como',
    'con',
    'correcta',
    'curso',
    'debe',
    'deben',
    'del',
    'dentro',
    'desde',
    'donde',
    'este',
    'esta',
    'estas',
    'estos',
    'explicacion',
    'familia',
    'forma',
    'funcion',
    'guia',
    'juego',
    'linea',
    'mejor',
    'menor',
    'modulo',
    'para',
    'parte',
    'porque',
    'pregunta',
    'reactivo',
    'revisar',
    'respuesta',
    'riesgo',
    'seguridad',
    'sobre',
    'solo',
    'tiene',
    'tip',
    'todas',
    'tutor',
    'una',
    'unos',
]);

const getQuizPayload = async (filter) => {
    const quiz = await Quiz.findOne(filter).populate('questions');

    if (!quiz) {
        return null;
    }

    const quizObject = quiz.toObject();
    quizObject.questions = (quizObject.questions || []).map((question) => ({
        ...question,
        options: shuffleArray(question.options || []),
    }));

    return quizObject;
};

const getDiagnosticQuizPayload = async () => getQuizPayload({ scope: 'diagnostic' });

const getQuizPayloadById = async (quizId) => getQuizPayload({ _id: quizId });

const arraysMatchExactly = (left = [], right = []) =>
    Array.isArray(left) &&
    Array.isArray(right) &&
    left.length === right.length &&
    left.every((value, index) => value === right[index]);

const unorderedArraysMatch = (left = [], right = []) =>
    Array.isArray(left) &&
    Array.isArray(right) &&
    left.length === right.length &&
    right.every((value) => left.includes(value));

const plainObjectsMatch = (left = {}, right = {}) => {
    const leftKeys = Object.keys(left || {});
    const rightKeys = Object.keys(right || {});

    return leftKeys.length === rightKeys.length &&
        rightKeys.every((key) => left[key] === right[key]);
};

const getCorrectAnswer = (question) => {
    if (OPTION_BASED_TYPES.has(question.type || 'single_choice')) {
        const correctOptions = (question.options || [])
            .filter((option) => option.isCorrect)
            .map((option) => option.text);

        if (question.type === 'multiple_selection') {
            return correctOptions;
        }

        return correctOptions[0] || 'N/A';
    }

    return question.metadata?.correctAnswer || DEFAULT_CORRECT_ANSWER;
};

const isAnswerCorrect = (question, userSelection) => {
    if (userSelection === undefined || userSelection === null || userSelection === '') {
        return false;
    }

    const questionType = question.type || 'single_choice';

    if (SINGLE_SELECTION_TYPES.has(questionType)) {
        const correctOption = (question.options || []).find((option) => option.isCorrect);
        return !!correctOption && userSelection.toString() === correctOption._id.toString();
    }

    if (questionType === 'multiple_selection') {
        const correctOptions = (question.options || [])
            .filter((option) => option.isCorrect)
            .map((option) => option._id.toString());

        if (!Array.isArray(userSelection)) {
            return false;
        }

        const normalizedSelection = userSelection.map((selection) => selection.toString());
        return unorderedArraysMatch(normalizedSelection, correctOptions);
    }

    const correctAnswer = question.metadata?.correctAnswer;

    if (!correctAnswer) {
        return false;
    }

    if (questionType === 'order_sequence') {
        return arraysMatchExactly(userSelection, correctAnswer);
    }

    if (questionType === 'match_columns' || questionType === 'categorize') {
        const userKeys = Object.keys(userSelection || {});
        const correctKeys = Object.keys(correctAnswer || {});

        return userKeys.length === correctKeys.length &&
            correctKeys.every((key) => unorderedArraysMatch(userSelection[key] || [], correctAnswer[key] || []));
    }

    if (Array.isArray(correctAnswer)) {
        return arraysMatchExactly(userSelection, correctAnswer);
    }

    if (typeof correctAnswer === 'object') {
        return plainObjectsMatch(userSelection, correctAnswer);
    }

    return userSelection === correctAnswer;
};

const formatUserAnswer = (question, userSelection) => {
    if (userSelection === undefined || userSelection === null) {
        return userSelection;
    }

    const questionType = question.type || 'single_choice';

    if (SINGLE_SELECTION_TYPES.has(questionType)) {
        const selectedOption = (question.options || []).find(
            (option) => option._id.toString() === userSelection.toString()
        );

        return selectedOption ? selectedOption.text : userSelection;
    }

    if (questionType === 'multiple_selection' && Array.isArray(userSelection)) {
        return (question.options || [])
            .filter((option) => userSelection.some((selection) => selection.toString() === option._id.toString()))
            .map((option) => option.text);
    }

    return userSelection;
};

const flattenForKeywordSearch = (value) => {
    if (Array.isArray(value)) {
        return value.map(flattenForKeywordSearch).join(' ');
    }

    if (value && typeof value === 'object') {
        return Object.entries(value)
            .map(([key, nestedValue]) => `${key} ${flattenForKeywordSearch(nestedValue)}`)
            .join(' ');
    }

    return value ? value.toString() : '';
};

const normalizeForKeywordSearch = (value) =>
    flattenForKeywordSearch(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

const extractKeywords = (...values) =>
    [...new Set(
        values
            .map((value) => normalizeForKeywordSearch(value))
            .join(' ')
            .split(/[^a-z0-9]+/)
            .filter((token) => token.length >= 4 && !COMMON_GUIDANCE_WORDS.has(token))
    )];

const rankGuidedLessonsForDetail = ({ detail, lessons = [], moduleId = null }) => {
    const normalizedDetailHaystack = normalizeForKeywordSearch([
        detail.text,
        detail.explanation,
        detail.correctAnswer,
        detail.userAnswer,
        detail.riskArea,
        detail.platform,
    ]);
    const detailKeywords = extractKeywords(
        detail.text,
        detail.explanation,
        detail.correctAnswer,
        detail.userAnswer,
        detail.riskArea,
        detail.platform
    );

    return lessons
        .map((lesson) => {
            let score = 0;
            const lessonKeywords = extractKeywords(
                lesson.title,
                lesson.teaches,
                lesson.riskAreas,
                lesson.platforms
            );
            const lessonPhrases = (lesson.teaches || [])
                .map((entry) => normalizeForKeywordSearch(entry))
                .filter(Boolean);
            const exactPhraseMatches = lessonPhrases.filter((phrase) => normalizedDetailHaystack.includes(phrase)).length;
            const keywordMatches = detailKeywords.filter((keyword) => lessonKeywords.includes(keyword)).length;

            if (moduleId && lesson.moduleId && lesson.moduleId.toString() === moduleId.toString()) {
                score += 30;
            }

            if (detail.riskArea && (lesson.riskAreas || []).includes(detail.riskArea)) {
                score += 14;
            }

            if (detail.platform && (lesson.platforms || []).includes(detail.platform)) {
                score += 12;
            }

            score += exactPhraseMatches * 10;
            score += keywordMatches * 4;

            if (score > 0) {
                score += LESSON_TYPE_PRIORITY[lesson.type] || 0;
            }

            return {
                lesson,
                score,
                exactPhraseMatches,
                keywordMatches,
            };
        })
        .filter((entry) => entry.score > 0)
        .sort((left, right) => {
            if (right.score !== left.score) {
                return right.score - left.score;
            }

            if (right.exactPhraseMatches !== left.exactPhraseMatches) {
                return right.exactPhraseMatches - left.exactPhraseMatches;
            }

            if (right.keywordMatches !== left.keywordMatches) {
                return right.keywordMatches - left.keywordMatches;
            }

            return (right.lesson.duration || 0) - (left.lesson.duration || 0);
        });
};

const evaluateQuizSubmission = (quiz, answers = {}) => {
    let weightedScore = 0;
    let totalPossiblePoints = 0;
    let correctCount = 0;

    const errorsByArea = new Map();
    const errorsByPlatform = new Map();
    const questionDetails = [];

    (quiz.questions || []).forEach((question) => {
        const userSelection = answers[question._id.toString()];
        const questionPoints = question.points || 10;
        const isCorrect = isAnswerCorrect(question, userSelection);

        totalPossiblePoints += questionPoints;

        if (isCorrect) {
            weightedScore += questionPoints;
            correctCount += 1;
        } else {
            if (question.riskArea) {
                errorsByArea.set(question.riskArea, (errorsByArea.get(question.riskArea) || 0) + 1);
            }

            if (question.platform) {
                errorsByPlatform.set(question.platform, (errorsByPlatform.get(question.platform) || 0) + 1);
            }
        }

        questionDetails.push({
            questionId: question._id,
            text: question.text,
            type: question.type,
            isCorrect,
            userAnswer: formatUserAnswer(question, userSelection),
            correctAnswer: getCorrectAnswer(question),
            explanation: question.explanation || DEFAULT_EXPLANATION,
            riskArea: question.riskArea || null,
            platform: question.platform || null,
        });
    });

    const score = totalPossiblePoints > 0
        ? Math.round((weightedScore / totalPossiblePoints) * 100)
        : 0;
    const passed = score >= (quiz.minPassing || 80);
    const riskLevel = score < 50 ? 'Alto' : score < 80 ? 'Medio' : 'Bajo';

    return {
        score,
        passed,
        correctCount,
        riskLevel,
        errorsByArea,
        errorsByPlatform,
        questionDetails,
    };
};

const saveAttempt = async ({ userId, quizId, answers, evaluation }) =>
    Attempt.create({
        userId,
        quizId,
        answers,
        score: evaluation.score,
        passed: evaluation.passed,
        riskLevel: evaluation.riskLevel,
        errorsByArea: evaluation.errorsByArea,
        errorsByPlatform: evaluation.errorsByPlatform,
    });

const buildGuidedLessonsForQuestionDetails = async ({
    questionDetails = [],
    courseId = null,
    moduleId = null,
}) => {
    const areas = [...new Set(questionDetails.map((detail) => detail.riskArea).filter(Boolean))];
    const platforms = [...new Set(questionDetails.map((detail) => detail.platform).filter(Boolean))];

    if (!courseId && !moduleId && areas.length === 0 && platforms.length === 0) {
        return questionDetails.map((detail) => ({ ...detail, guidedLessons: [] }));
    }

    const lessonQuery = {};

    if (courseId) {
        lessonQuery.courseId = courseId;
    } else if (moduleId) {
        lessonQuery.moduleId = moduleId;
    } else {
        lessonQuery.$or = [
            ...(areas.length > 0 ? [{ riskAreas: { $in: areas } }] : []),
            ...(platforms.length > 0 ? [{ platforms: { $in: platforms } }] : []),
        ];
    }

    const lessons = await Lesson.find(lessonQuery)
        .select('title _id duration riskAreas platforms teaches type moduleId')
        .lean();

    return questionDetails.map((detail) => {
        const rankedLessons = rankGuidedLessonsForDetail({
            detail,
            lessons,
            moduleId,
        });
        const fallbackLessons = lessons
            .filter((lesson) => !moduleId || lesson.moduleId?.toString() === moduleId.toString())
            .sort((left, right) =>
                (LESSON_TYPE_PRIORITY[right.type] || 0) - (LESSON_TYPE_PRIORITY[left.type] || 0)
            )
            .map((lesson) => ({ lesson }));

        return {
            ...detail,
            guidedLessons: (rankedLessons.length > 0 ? rankedLessons : fallbackLessons)
                .slice(0, 3)
                .map(({ lesson }) => ({
                    _id: lesson._id,
                    title: lesson.title,
                    duration: lesson.duration,
                })),
        };
    });
};

const resolveQuizContext = async (quiz) => {
    let courseId = null;
    let moduleId = null;

    if (quiz.scope === 'module') {
        moduleId = quiz.refId;
        const moduleDocument = await Module.findById(moduleId);
        if (moduleDocument) {
            courseId = moduleDocument.courseId;
        }
    } else if (quiz.scope === 'course') {
        courseId = quiz.refId;
    }

    return {
        courseId,
        moduleId,
    };
};

const updateProgressForApprovedQuiz = async ({ userId, quiz, occurredAt }) => {
    const { courseId, moduleId } = await resolveQuizContext(quiz);

    if (!courseId) {
        return { updated: false };
    }

    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
        progress = await Progress.create({
            userId,
            courseId,
            completedModules: [],
            completedLessons: [],
        });
    }

    let updated = false;

    if (quiz.scope === 'module' && moduleId) {
        const alreadyCompleted = progress.completedModules.some(
            (completedModuleId) => completedModuleId.toString() === moduleId.toString()
        );

        if (!alreadyCompleted) {
            progress.completedModules.push(moduleId);
            updated = true;
        }
    } else if (quiz.scope === 'course') {
        const alreadyCompleted = progress.isCourseCompleted;
        progress.isCourseCompleted = true;
        updated = !alreadyCompleted;

        try {
            await Accreditation.create({ userId, courseId });
        } catch (error) {
            // Ignore duplicate accreditation attempts.
        }
    }

    await progress.save();

    if (quiz.scope === 'module' && moduleId && updated) {
        const [moduleDocument, courseDocument] = await Promise.all([
            Module.findById(moduleId).select('title'),
            Course.findById(courseId).select('title'),
        ]);

        await createActivityLog({
            userId,
            kind: 'module_accredited',
            uniqueKey: `module:${userId}:${moduleId}`,
            title: moduleDocument?.title || 'Módulo acreditado',
            subtitle: courseDocument?.title || 'Acreditación de módulo',
            courseId,
            moduleId,
            occurredAt,
            passed: true,
        });
    }

    if (quiz.scope === 'course' && updated) {
        const courseDocument = await Course.findById(courseId).select('title');

        await createActivityLog({
            userId,
            kind: 'course_completed',
            uniqueKey: `course:${userId}:${courseId}`,
            title: courseDocument?.title || 'Curso completado',
            subtitle: 'Acreditación final del curso',
            courseId,
            quizId: quiz._id,
            occurredAt,
            passed: true,
        });
    }

    return { updated };
};

const submitQuizAttempt = async ({ quizId, userId, answers = {} }) => {
    const quiz = await Quiz.findById(quizId).populate('questions');

    if (!quiz) {
        return null;
    }

    const evaluation = evaluateQuizSubmission(quiz, answers);
    const quizContext = await resolveQuizContext(quiz);
    const isAccreditationQuiz = quiz.scope === 'course';
    const questionDetails = isAccreditationQuiz
        ? []
        : await buildGuidedLessonsForQuestionDetails({
            questionDetails: evaluation.questionDetails,
            courseId: quizContext.courseId,
            moduleId: quizContext.moduleId,
        });

    const attempt = await saveAttempt({
        userId,
        quizId,
        answers,
        evaluation,
    });

    await createActivityLog({
        userId,
        kind: quiz.scope === 'diagnostic' ? 'diagnostic_attempt' : 'quiz_attempt',
        title: quiz.scope === 'diagnostic' ? 'Diagnóstico completado' : quiz.title || 'Evaluación presentada',
        subtitle:
            quiz.scope === 'diagnostic'
                ? 'Evaluación inicial'
                : quiz.scope === 'course'
                    ? 'Examen final del curso'
                    : 'Evaluación de módulo',
        courseId: quizContext.courseId || undefined,
        moduleId: quizContext.moduleId || undefined,
        quizId: quiz._id,
        attemptId: attempt._id,
        score: evaluation.score,
        passed: evaluation.passed,
        occurredAt: attempt.createdAt,
    });

    let badgeEarned = false;
    if (evaluation.passed) {
        const progressUpdate = await updateProgressForApprovedQuiz({
            userId,
            quiz,
            occurredAt: attempt.createdAt,
        });
        badgeEarned = progressUpdate.updated;
    }

    return {
        attemptId: attempt._id,
        score: evaluation.score,
        passed: evaluation.passed,
        correctCount: evaluation.correctCount,
        badgeEarned,
        riskLevel: evaluation.riskLevel,
        questionDetails,
    };
};

const mapKeysToArray = (value) =>
    Array.from(value?.get ? value.keys() : Object.keys(value || {}));

const getAttemptRecommendations = async (attemptId) => {
    const attempt = await Attempt.findById(attemptId);

    if (!attempt) {
        return null;
    }

    const areas = mapKeysToArray(attempt.errorsByArea);
    const platforms = mapKeysToArray(attempt.errorsByPlatform);

    let recommendedLessons = [];
    if (areas.length > 0 || platforms.length > 0) {
        recommendedLessons = await Lesson.find({
            $or: [
                { riskAreas: { $in: areas } },
                { platforms: { $in: platforms } },
            ],
        })
            .limit(4)
            .select('title _id riskAreas platforms');
    }

    return {
        areasToReview: areas,
        platformsToReview: platforms,
        recommendedLessons,
        message: attempt.score < 80
            ? 'Basado en tus resultados, te recomendamos priorizar el estudio de las lecciones mencionadas para fortalecer tu nivel de protección.'
            : 'Excelente trabajo. Has demostrado gran dominio, pero siempre puedes repasar estos puntos clave para mantener ese nivel.',
    };
};

module.exports = {
    getDiagnosticQuizPayload,
    getQuizPayloadById,
    submitQuizAttempt,
    getAttemptRecommendations,
};
