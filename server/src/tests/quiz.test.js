// 1. Mock the protect middleware before importing anything else
jest.mock('../middleware/authMiddleware', () => ({
    protect: (req, res, next) => {
        const mongoose = require('mongoose');
        req.user = { _id: new mongoose.Types.ObjectId(), role: 'Parent' };
        next();
    },
    admin: (req, res, next) => next()
}));

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const quizRoutes = require('../routes/quiz.routes');
const jwt = require('jsonwebtoken');

let mongoServer;
const app = express();
app.use(express.json());
app.use('/api/quiz', quizRoutes);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Quiz Analysis Engine (US08)', () => {
    it('Should calculate errors by area and platform', async () => {
        // 1. Create a quiz
        const quiz = await Quiz.create({
            title: 'Test Quiz',
            scope: 'diagnostic'
        });

        // 2. Create questions with metadata
        const q1 = await Question.create({
            quizId: quiz._id,
            text: 'Q1',
            riskArea: 'Privacidad',
            platform: 'TikTok',
            options: [{ text: 'Correct', isCorrect: true }, { text: 'Wrong', isCorrect: false }]
        });

        const q2 = await Question.create({
            quizId: quiz._id,
            text: 'Q2',
            riskArea: 'Grooming',
            platform: 'Roblox',
            options: [{ text: 'Correct', isCorrect: true }, { text: 'Wrong', isCorrect: false }]
        });

        quiz.questions = [q1._id, q2._id];
        await quiz.save();

        // 3. Submit wrong answers
        const res = await request(app)
            .post(`/api/quiz/${quiz._id}/submit`)
            .send({
                answers: {
                    [q1._id]: q1.options[1]._id, // Wrong
                    [q2._id]: q2.options[1]._id  // Wrong
                }
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.score).toEqual(0);
        expect(res.body.riskLevel).toEqual('Alto');

        // Check DB record for analytical data
        const Attempt = require('../models/Attempt');
        const attempt = await Attempt.findOne();

        console.log('--- TEST DEBUG ---');
        console.log('Quiz Questions:', quiz.questions);
        console.log('Submitted Answers:', res.request._data.answers);
        console.log('Attempt ErrorsByArea:', attempt.errorsByArea);
        console.log('Attempt ErrorsByPlatform:', attempt.errorsByPlatform);
        console.log('------------------');

        expect(attempt.errorsByArea.get('Privacidad')).toEqual(1);
        expect(attempt.errorsByArea.get('Grooming')).toEqual(1);
        expect(attempt.errorsByPlatform.get('TikTok')).toEqual(1);
        expect(attempt.errorsByPlatform.get('Roblox')).toEqual(1);
    });

    it('Should hide per-question details for accreditation course quizzes', async () => {
        const quiz = await Quiz.create({
            title: 'Final Course Quiz',
            scope: 'course'
        });

        const question = await Question.create({
            quizId: quiz._id,
            text: 'Q1',
            riskArea: 'Privacidad',
            platform: 'Minecraft',
            options: [{ text: 'Correct', isCorrect: true }, { text: 'Wrong', isCorrect: false }]
        });

        quiz.questions = [question._id];
        await quiz.save();

        const res = await request(app)
            .post(`/api/quiz/${quiz._id}/submit`)
            .send({
                answers: {
                    [question._id]: question.options[0]._id,
                }
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.score).toEqual(100);
        expect(res.body.correctCount).toEqual(1);
        expect(res.body.questionDetails).toEqual([]);
    });

    it('Should attach guided lessons to per-question review details for non-course quizzes', async () => {
        const quiz = await Quiz.create({
            title: 'Diagnostic Guided Review',
            scope: 'diagnostic'
        });

        const question = await Question.create({
            quizId: quiz._id,
            text: 'Q guided',
            riskArea: 'Privacidad',
            platform: 'Roblox',
            explanation: 'Repasa privacidad y control parental.',
            options: [{ text: 'Correct', isCorrect: true }, { text: 'Wrong', isCorrect: false }]
        });

        await Lesson.create({
            moduleId: new mongoose.Types.ObjectId(),
            courseId: new mongoose.Types.ObjectId(),
            title: 'Privacidad en Roblox',
            riskAreas: ['Privacidad'],
            platforms: ['Roblox'],
        });

        quiz.questions = [question._id];
        await quiz.save();

        const res = await request(app)
            .post(`/api/quiz/${quiz._id}/submit`)
            .send({
                answers: {
                    [question._id]: question.options[1]._id,
                }
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.questionDetails).toHaveLength(1);
        expect(res.body.questionDetails[0].riskArea).toEqual('Privacidad');
        expect(res.body.questionDetails[0].platform).toEqual('Roblox');
        expect(res.body.questionDetails[0].guidedLessons).toHaveLength(1);
        expect(res.body.questionDetails[0].guidedLessons[0].title).toEqual('Privacidad en Roblox');
    });

    it('Should link module quiz review guidance to lessons from the same module using taught concepts', async () => {
        const course = await Course.create({
            title: 'Curso de Juegos',
            description: 'Curso de prueba',
            category: 'Videojuegos',
        });
        const moduleRecord = await Module.create({
            courseId: course._id,
            title: 'Fundamentos',
        });
        const quiz = await Quiz.create({
            title: 'Module Guided Review',
            scope: 'module',
            refId: moduleRecord._id,
        });

        const question = await Question.create({
            quizId: quiz._id,
            text: 'Relaciona Cuenta y Servidor con su definición correcta.',
            type: 'fill_blanks',
            explanation: 'Repasa cuenta, servidor y chat.',
            metadata: {
                correctAnswer: {
                    blank1: 'cuenta',
                    blank2: 'servidor',
                },
            },
        });

        await Lesson.create({
            moduleId: moduleRecord._id,
            courseId: course._id,
            title: 'Guía visual: cuenta, servidor y chat',
            type: 'guide',
            teaches: ['cuenta', 'servidor', 'chat'],
        });

        await Lesson.create({
            moduleId: new mongoose.Types.ObjectId(),
            courseId: course._id,
            title: 'Otro módulo no relacionado',
            type: 'article',
            teaches: ['grooming'],
        });

        quiz.questions = [question._id];
        await quiz.save();

        const res = await request(app)
            .post(`/api/quiz/${quiz._id}/submit`)
            .send({
                answers: {
                    [question._id]: {
                        blank1: 'perfil',
                        blank2: 'internet',
                    },
                }
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.questionDetails).toHaveLength(1);
        expect(res.body.questionDetails[0].guidedLessons).toHaveLength(1);
        expect(res.body.questionDetails[0].guidedLessons[0].title).toEqual('Guía visual: cuenta, servidor y chat');
    });
});
