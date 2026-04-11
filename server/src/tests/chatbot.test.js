// Mock the protect middleware before loading routes
jest.mock('../middleware/authMiddleware', () => ({
    protect: (req, res, next) => {
        const mongoose = require('mongoose');
        req.user = { _id: new mongoose.Types.ObjectId(), role: 'Parent' };
        next();
    },
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
        process.env.USE_MOCK_AI = 'true';

        const response = await request(app)
            .post('/api/chatbot/message')
            .send({ text: '¿Qué es el grooming?' });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('botMessage');
        expect(response.body.botMessage.text.toLowerCase()).toContain('grooming');
        expect(response.body.isMock).toBe(true);

        const conversationCount = await Conversation.countDocuments();
        const messageCount = await Message.countDocuments();

        expect(conversationCount).toEqual(1);
        expect(messageCount).toEqual(1);
    });

    it('Should persist conversation history and maintain context (RF12)', async () => {
        process.env.USE_MOCK_AI = 'true';

        const conversation = await Conversation.create({ userId: new mongoose.Types.ObjectId() });

        await request(app)
            .post('/api/chatbot/message')
            .send({ text: 'Tengo dudas sobre Roblox', conversationId: conversation._id });

        const response = await request(app)
            .post('/api/chatbot/message')
            .send({ text: '¿Cómo activo el PIN?', conversationId: conversation._id });

        expect(response.statusCode).toEqual(200);

        const messages = await Message.find({ conversationId: conversation._id });
        expect(messages.length).toBeGreaterThanOrEqual(2);
    });

    it('Should handle specialized security topics correctly', async () => {
        process.env.USE_MOCK_AI = 'true';

        const response = await request(app)
            .post('/api/chatbot/message')
            .send({ text: 'hola' });

        expect(response.statusCode).toEqual(200);
        expect(response.body.botMessage.text.toLowerCase()).toContain('seguridad digital');
    });
});
