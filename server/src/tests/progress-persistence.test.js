const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
const { assertCanResetCourseContent } = require('../scripts/seed/helpers');

let mongoServer;

const createCourseWithProgress = async () => {
    const userId = new mongoose.Types.ObjectId();
    global.__TEST_USER_ID__ = userId;

    const course = await Course.create({
        title: 'Curso persistente',
        description: 'Curso de prueba',
        category: 'Videojuegos',
        status: 'published',
    });
    const moduleRecord = await Module.create({
        courseId: course._id,
        title: 'Modulo persistente',
        lessonOrder: [],
    });
    const lesson = await Lesson.create({
        courseId: course._id,
        moduleId: moduleRecord._id,
        title: 'Leccion persistente',
        type: 'article',
    });
    moduleRecord.lessonOrder = [lesson._id];
    await moduleRecord.save();

    await Progress.create({
        userId,
        courseId: course._id,
        completedLessons: [lesson._id],
        completedModules: [moduleRecord._id],
        isCourseCompleted: false,
    });

    return { course, moduleRecord, lesson };
};

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
    await Promise.all([
        Course.deleteMany({}),
        Module.deleteMany({}),
        Lesson.deleteMany({}),
        Progress.deleteMany({}),
    ]);
    delete process.env.ALLOW_PROGRESS_RESET;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('progress persistence safeguards', () => {
    it('blocks destructive seed resets when a course has user progress', async () => {
        const { course } = await createCourseWithProgress();

        await expect(assertCanResetCourseContent(course._id, course.title))
            .rejects
            .toThrow('progreso');
    });

    it('allows destructive seed resets only with explicit override', async () => {
        const { course } = await createCourseWithProgress();
        process.env.ALLOW_PROGRESS_RESET = 'true';

        await expect(assertCanResetCourseContent(course._id, course.title))
            .resolves
            .toBeUndefined();
    });

});
