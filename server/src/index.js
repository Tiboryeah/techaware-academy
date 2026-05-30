const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/db');

const rateLimit = require('express-rate-limit');

// Load env vars
dotenv.config();

// Connect to database
connectDB();
const app = express();
app.set('trust proxy', 1);

const healthCheckHandler = (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'techaware-academy-api',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
};

// Security Middleware (RNF4 / RT6)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    skip: (req) => req.path === '/health' || req.path === '/api/health',
    message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo en 15 minutos.'
});

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : ['https://kuxipilli.com', 'https://www.kuxipilli.com', 'http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
}));
app.use(express.json());

app.get('/health', healthCheckHandler);
app.get('/api/health', healthCheckHandler);

if (process.env.NODE_ENV === 'production') {
    app.use(limiter);
} else {
    // Límite relajado en desarrollo para no interrumpir las pruebas locales
    app.use(rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 1000,
        message: 'Rate limit relaxed for development.'
    }));
}
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Allow images to be loaded

// Serve Static Files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/content', require('./routes/content.routes'));
app.use('/api/quiz', require('./routes/quiz.routes'));
app.use('/api/progress', require('./routes/progress.routes'));
app.use('/api/chatbot', require('./routes/chatbot.routes'));
app.use('/api/reports', require('./routes/report.routes'));
app.use('/api/resources', require('./routes/resource.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
