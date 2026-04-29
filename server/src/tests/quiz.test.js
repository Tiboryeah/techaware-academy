// 1. Mock the protect middleware before importing anything else
jest.mock('../middleware/authMiddleware', () => ({
    protect: (req, res, next) => {
        const mongoose = require('mongoose');
        if (!global.__TEST_USER_ID__) {
            global.__TEST_USER_ID__ = new mongoose.Types.ObjectId();
        }
        req.user = { _id: global.__TEST_USER_ID__, role: 'Parent' };
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
const Recommendation = require('../models/Recommendation');
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

describe('Precise recommendations', () => {
    it('Should recommend diagnostic lessons from the wrong question, not a generic platform match', async () => {
        const quiz = await Quiz.create({
            title: 'Diagnostic Precise Review',
            scope: 'diagnostic',
        });

        const q1 = await Question.create({
            quizId: quiz._id,
            text: 'Como proteger la privacidad en Roblox?',
            riskArea: 'Privacidad',
            platform: 'Roblox',
            explanation: 'Repasa privacidad en Roblox.',
            options: [{ text: 'Correct', isCorrect: true }, { text: 'Wrong', isCorrect: false }],
        });
        const q2 = await Question.create({
            quizId: quiz._id,
            text: 'Como detectar grooming?',
            riskArea: 'Grooming',
            platform: 'Roblox',
            options: [{ text: 'Correct', isCorrect: true }, { text: 'Wrong', isCorrect: false }],
        });

        await Lesson.create({
            moduleId: new mongoose.Types.ObjectId(),
            courseId: new mongoose.Types.ObjectId(),
            title: 'Roblox general',
            platforms: ['Roblox'],
            teaches: ['avatar'],
        });
        await Lesson.create({
            moduleId: new mongoose.Types.ObjectId(),
            courseId: new mongoose.Types.ObjectId(),
            title: 'Privacidad en Roblox',
            riskAreas: ['Privacidad'],
            platforms: ['Roblox'],
            teaches: ['privacidad', 'Roblox'],
        });

        quiz.questions = [q1._id, q2._id];
        await quiz.save();

        const submitRes = await request(app)
            .post(`/api/quiz/${quiz._id}/submit`)
            .send({
                answers: {
                    [q1._id]: q1.options[1]._id,
                    [q2._id]: q2.options[0]._id,
                },
            });

        const recRes = await request(app)
            .get(`/api/quiz/recommendations/${submitRes.body.attemptId}`);

        expect(recRes.statusCode).toEqual(200);
        expect(recRes.body.recommendedLessons).toHaveLength(1);
        expect(recRes.body.recommendedLessons[0].title).toEqual('Privacidad en Roblox');
    });

    it('Should persist dashboard recommendations from wrong module questions only', async () => {
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
            title: 'Module Persisted Review',
            scope: 'module',
            refId: moduleRecord._id,
        });

        const question = await Question.create({
            quizId: quiz._id,
            text: 'Relaciona cuenta y servidor con su definicion.',
            type: 'fill_blanks',
            explanation: 'Repasa cuenta y servidor.',
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
            title: 'Grooming en videojuegos',
            type: 'article',
            teaches: ['grooming'],
        });
        const expectedLesson = await Lesson.create({
            moduleId: moduleRecord._id,
            courseId: course._id,
            title: 'Cuenta y servidor',
            type: 'article',
            teaches: ['cuenta', 'servidor'],
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
                },
            });

        expect(res.statusCode).toEqual(201);

        const recommendation = await Recommendation.findOne().populate('suggestedLessons', 'title _id');

        expect(recommendation).toBeTruthy();
        expect(recommendation.suggestedLessons).toHaveLength(1);
        expect(recommendation.suggestedLessons[0]._id.toString()).toEqual(expectedLesson._id.toString());
    });

    it('Should clear pending dashboard recommendations when the same quiz is passed later', async () => {
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
            title: 'Module Clear Review',
            scope: 'module',
            refId: moduleRecord._id,
        });

        const question = await Question.create({
            quizId: quiz._id,
            text: 'Relaciona cuenta y servidor con su definicion.',
            type: 'fill_blanks',
            explanation: 'Repasa cuenta y servidor.',
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
            title: 'Cuenta y servidor',
            type: 'article',
            teaches: ['cuenta', 'servidor'],
        });

        quiz.questions = [question._id];
        await quiz.save();

        await request(app)
            .post(`/api/quiz/${quiz._id}/submit`)
            .send({
                answers: {
                    [question._id]: {
                        blank1: 'perfil',
                        blank2: 'internet',
                    },
                },
            });

        expect(await Recommendation.countDocuments()).toEqual(1);

        const passRes = await request(app)
            .post(`/api/quiz/${quiz._id}/submit`)
            .send({
                answers: {
                    [question._id]: {
                        blank1: 'cuenta',
                        blank2: 'servidor',
                    },
                },
            });

        expect(passRes.statusCode).toEqual(201);
        expect(passRes.body.passed).toEqual(true);
        expect(await Recommendation.countDocuments()).toEqual(0);
    });
});

afterEach(async () => {
    await Promise.all([
        Course.deleteMany({}),
        Module.deleteMany({}),
        Quiz.deleteMany({}),
        Question.deleteMany({}),
        Lesson.deleteMany({}),
        Recommendation.deleteMany({}),
        require('../models/Attempt').deleteMany({}),
    ]);
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

    it('Should not fill resolved question guidance with unrelated module lessons', async () => {
        const course = await Course.create({
            title: 'Curso de Redes',
            description: 'Curso de prueba',
            category: 'Redes Sociales',
        });
        const moduleRecord = await Module.create({
            courseId: course._id,
            title: 'Algoritmos y atención',
        });
        const quiz = await Quiz.create({
            title: 'Module Exact Guided Review',
            scope: 'module',
            refId: moduleRecord._id,
        });

        const question = await Question.create({
            quizId: quiz._id,
            text: 'Ordena cómo una plataforma refuerza el hábito de volver.',
            type: 'order_sequence',
            explanation: 'Repasa interacción, recompensa rápida y atención.',
            metadata: {
                correctAnswer: [
                    'Recibe contenido atractivo.',
                    'La plataforma detecta el interés.',
                    'Aparece más contenido similar.',
                ],
            },
        });

        await Lesson.create({
            moduleId: moduleRecord._id,
            courseId: course._id,
            title: 'Qué son TikTok, Discord e Instagram',
            type: 'article',
            teaches: ['tiktok', 'discord', 'instagram'],
        });
        await Lesson.create({
            moduleId: moduleRecord._id,
            courseId: course._id,
            title: 'Por qué estas plataformas atraen tanto',
            type: 'article',
            teaches: ['identidad digital', 'comunidad'],
        });
        await Lesson.create({
            moduleId: moduleRecord._id,
            courseId: course._id,
            title: 'Cómo el algoritmo, los likes y la interacción mantienen la atención',
            type: 'video',
            teaches: ['interacción', 'atención', 'recompensa rápida'],
        });

        quiz.questions = [question._id];
        await quiz.save();

        const res = await request(app)
            .post(`/api/quiz/${quiz._id}/submit`)
            .send({
                answers: {
                    [question._id]: [
                        'La plataforma detecta el interés.',
                        'Recibe contenido atractivo.',
                        'Aparece más contenido similar.',
                    ],
                },
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.questionDetails[0].guidedLessons).toHaveLength(1);
        expect(res.body.questionDetails[0].guidedLessons[0].title).toEqual(
            'Cómo el algoritmo, los likes y la interacción mantienen la atención'
        );
    });

    it('Should keep module resolved guidance inside the current module only', async () => {
        const course = await Course.create({
            title: 'Curso de Redes',
            description: 'Curso de prueba',
            category: 'Redes Sociales',
        });
        const moduleOne = await Module.create({
            courseId: course._id,
            title: 'Entender redes sociales',
        });
        const moduleTwo = await Module.create({
            courseId: course._id,
            title: 'Privacidad y datos',
        });
        const quiz = await Quiz.create({
            title: 'Module Current Only Review',
            scope: 'module',
            refId: moduleOne._id,
        });

        const question = await Question.create({
            quizId: quiz._id,
            text: 'Relaciona cada plataforma con su dinámica principal.',
            type: 'match_columns',
            explanation: 'TikTok depende del algoritmo para mostrar contenido. Discord gira en torno a conversación en servidores. Instagram mezcla imagen personal, publicaciones y mensajería.',
            metadata: {
                correctAnswer: {
                    TikTok: ['algoritmo'],
                    Discord: ['servidores'],
                    Instagram: ['imagen personal'],
                },
            },
        });

        await Lesson.create({
            moduleId: moduleOne._id,
            courseId: course._id,
            title: 'Qué son TikTok, Discord e Instagram y cómo funcionan',
            type: 'article',
            teaches: ['algoritmo', 'servidores', 'imagen personal', 'mensajería'],
        });
        await Lesson.create({
            moduleId: moduleTwo._id,
            courseId: course._id,
            title: 'Huella digital: lo que se publica hoy puede traer consecuencias mañana',
            type: 'article',
            teaches: ['publicaciones', 'mensajería', 'instagram'],
        });

        quiz.questions = [question._id];
        await quiz.save();

        const res = await request(app)
            .post(`/api/quiz/${quiz._id}/submit`)
            .send({
                answers: {
                    [question._id]: {
                        TikTok: ['servidores'],
                        Discord: ['imagen personal'],
                        Instagram: ['algoritmo'],
                    },
                },
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.questionDetails[0].guidedLessons).toHaveLength(1);
        expect(res.body.questionDetails[0].guidedLessons[0].title).toEqual(
            'Qué son TikTok, Discord e Instagram y cómo funcionan'
        );
    });
});
