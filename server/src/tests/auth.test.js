const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

jest.mock('../utils/sendEmail', () => jest.fn().mockResolvedValue(true));

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
        expect(res.body).toHaveProperty('message', 'Revisa tu correo para verificar tu cuenta con el código enviado.');

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
        expect(res.body.message).toContain('Verifica tu correo electrónico');
    });

    it('Should verify user with code', async () => {
        const user = await User.findOne({ email: 'test@example.com' });
        const code = user.verificationToken;

        const res = await request(app)
            .post('/api/auth/verify')
            .send({ email: 'test@example.com', code });

        expect(res.statusCode).toEqual(200);
        const updatedUser = await User.findById(user._id);
        expect(updatedUser.isVerified).toBe(true);
    });

    it('Should verify account after password reset with code and allow login', async () => {
        const resetCode = '123456';
        const resetPasswordToken = crypto.createHash('sha256').update(resetCode).digest('hex');

        await User.create({
            name: 'Reset User',
            email: 'reset@example.com',
            passHash: 'oldpassword123',
            isVerified: false,
            verificationToken: '654321',
            resetPasswordToken,
            resetPasswordExpire: Date.now() + 10 * 60 * 1000,
        });

        const resetRes = await request(app)
            .post('/api/auth/reset-with-code')
            .send({
                email: 'reset@example.com',
                code: resetCode,
                newPassword: 'newpassword123',
            });

        expect(resetRes.statusCode).toEqual(200);

        const updatedUser = await User.findOne({ email: 'reset@example.com' });
        expect(updatedUser.isVerified).toBe(true);
        expect(updatedUser.verificationToken).toBeUndefined();

        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'reset@example.com',
                password: 'newpassword123',
            });

        expect(loginRes.statusCode).toEqual(200);
        expect(loginRes.body).toHaveProperty('token');
    });
});
