const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const User = require('../models/User');
const authRoutes = require('../routes/auth.routes');

let mongoServer;
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Auth Endpoints', () => {
    it('Should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Por favor, revisa tu correo para verificar tu cuenta.');

        const user = await User.findOne({ email: 'test@example.com' });
        expect(user).toBeTruthy();
        expect(user.isVerified).toBe(false);
    });

    it('Should not login if not verified', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toContain('verifique su correo');
    });

    it('Should verify user with token', async () => {
        const user = await User.findOne({ email: 'test@example.com' });
        const token = user.verificationToken;

        const res = await request(app).get(`/api/auth/verify/${token}`);

        expect(res.statusCode).toEqual(200);
        const updatedUser = await User.findById(user._id);
        expect(updatedUser.isVerified).toBe(true);
    });
});
