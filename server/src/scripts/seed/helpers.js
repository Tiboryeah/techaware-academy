const User = require('../../models/User');
const Course = require('../../models/Course');
const Module = require('../../models/Module');
const Lesson = require('../../models/Lesson');
const Quiz = require('../../models/Quiz');
const Question = require('../../models/Question');

const syncAdminUser = async () => {
    let adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
        adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            passHash: '123456',
            role: 'Admin',
            isVerified: true,
        });
        console.log('(+) Admin User Created');
    }

    return adminUser;
};

const getOrCreateCourse = async (data) => {
    let course = await Course.findOne({ title: data.title });
    if (!course) {
        course = await Course.create(data);
        console.log(`(+) Course Created: ${data.title}`);
    } else {
        Object.assign(course, data);
        await course.save();
        console.log(`(.) Course Updated: ${data.title}`);
    }
    return course;
};

const getOrCreateModule = async (courseId, data) => {
    let module = await Module.findOne({ title: data.title, courseId });
    if (!module) {
        module = await Module.create({ ...data, courseId });
        console.log(`  (+) Module Created: ${data.title}`);
    } else {
        Object.assign(module, data);
        await module.save();
        console.log(`  (.) Module Synced: ${data.title}`);
    }
    return module;
};

const getOrCreateLesson = async (moduleId, courseId, data) => {
    let lesson = await Lesson.findOne({ title: data.title, moduleId });
    if (!lesson) {
        lesson = await Lesson.create({ ...data, moduleId, courseId });
        console.log(`    (+) Lesson Created: ${data.title}`);
    } else {
        Object.assign(lesson, data);
        await lesson.save();
    }
    return lesson;
};

const getOrCreateQuiz = async (data, questionsData) => {
    let quiz = await Quiz.findOne({ title: data.title, refId: data.refId });
    if (!quiz) {
        quiz = await Quiz.create(data);
        console.log(`    (+) Quiz Created: ${data.title}`);
    } else {
        Object.assign(quiz, data);
        await quiz.save();
    }

    await Question.deleteMany({ quizId: quiz._id });
    quiz.questions = [];

    for (const qData of questionsData) {
        const q = await Question.create({
            quizId: quiz._id,
            text: qData.text,
            type: qData.type || 'single_choice',
            options: qData.options,
            platform: qData.platform,
            metadata: qData.metadata || {},
            riskArea: qData.riskArea,
            explanation: qData.explanation,
        });
        quiz.questions.push(q._id);
    }

    await quiz.save();
    return quiz;
};

module.exports = {
    syncAdminUser,
    getOrCreateCourse,
    getOrCreateModule,
    getOrCreateLesson,
    getOrCreateQuiz,
    models: {
        Course,
        Module,
        Lesson,
        Quiz,
        Question,
    },
};
