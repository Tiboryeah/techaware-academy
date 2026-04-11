const Quiz = require('../models/Quiz');
const Attempt = require('../models/Attempt');
const Module = require('../models/Module');
const Progress = require('../models/Progress');
const Accreditation = require('../models/Accreditation');
const Lesson = require('../models/Lesson');
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

const updateProgressForApprovedQuiz = async ({ userId, quiz }) => {
    const { courseId, moduleId } = await resolveQuizContext(quiz);

    if (!courseId) {
        return false;
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

    if (quiz.scope === 'module' && moduleId) {
        const alreadyCompleted = progress.completedModules.some(
            (completedModuleId) => completedModuleId.toString() === moduleId.toString()
        );

        if (!alreadyCompleted) {
            progress.completedModules.push(moduleId);
        }
    } else if (quiz.scope === 'course') {
        progress.isCourseCompleted = true;

        try {
            await Accreditation.create({ userId, courseId });
        } catch (error) {
            // Ignore duplicate accreditation attempts.
        }
    }

    await progress.save();
    return true;
};

const submitQuizAttempt = async ({ quizId, userId, answers = {} }) => {
    const quiz = await Quiz.findById(quizId).populate('questions');

    if (!quiz) {
        return null;
    }

    const evaluation = evaluateQuizSubmission(quiz, answers);
    const attempt = await saveAttempt({
        userId,
        quizId,
        answers,
        evaluation,
    });

    let badgeEarned = false;
    if (evaluation.passed) {
        badgeEarned = await updateProgressForApprovedQuiz({ userId, quiz });
    }

    return {
        attemptId: attempt._id,
        score: evaluation.score,
        passed: evaluation.passed,
        correctCount: evaluation.correctCount,
        badgeEarned,
        riskLevel: evaluation.riskLevel,
        questionDetails: evaluation.questionDetails,
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
