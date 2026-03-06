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
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
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
});
