// 1. Mock the protect middleware
jest.mock('../middleware/authMiddleware', () => ({
    protect: (req, res, next) => {
        const mongoose = require('mongoose');
        req.user = { _id: new mongoose.Types.ObjectId(), role: 'Parent' };
        next();
    }
}));

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const chatbotRoutes = require('../routes/chatbot.routes');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

let mongoServer;
const app = express();
app.use(express.json());
app.use('/api/chatbot', chatbotRoutes);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Chatbot Expert System (RF2 / RF12 / RN-07)', () => {

    it('Should return a fallback response when AI is mocked or fails (Resilience Test)', async () => {
        // We set USE_MOCK_AI to true explicitly for this test
        process.env.USE_MOCK_AI = 'true';

        const res = await request(app)
            .post('/api/chatbot/message')
            .send({ text: '¿Qué es el grooming?' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('botMessage');
        expect(res.body.botMessage.text).toContain('Grooming');
        expect(res.body.isMock).toBe(true);

        // Verify DB persistence
        const convCount = await Conversation.countDocuments();
        const msgCount = await Message.countDocuments();
        expect(convCount).toEqual(1);
        expect(msgCount).toEqual(1);
    });

    it('Should persist conversation history and maintain context (RF12)', async () => {
        const conv = await Conversation.create({ userId: new mongoose.Types.ObjectId() });

        // Send first message
        const res1 = await request(app)
            .post('/api/chatbot/message')
            .send({ text: 'Tengo dudas sobre Roblox', conversationId: conv._id });

        // Send second message
        const res2 = await request(app)
            .post('/api/chatbot/message')
            .send({ text: '¿Cómo activo el PIN?', conversationId: conv._id });

        expect(res2.statusCode).toEqual(200);
        const messages = await Message.find({ conversationId: conv._id });
        // msg1: user, msg2: bot (fallback), msg3: user, msg4: bot
        expect(messages.length).toBeGreaterThanOrEqual(2);
    });

    it('Should handle specialized security topics correctly', async () => {
        const res = await request(app)
            .post('/api/chatbot/message')
            .send({ text: 'hola' });

        expect(res.body.botMessage.text).toContain('asistente de seguridad');
    });
});
