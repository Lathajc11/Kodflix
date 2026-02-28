const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true, // Allow cookies to be sent
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Export app for serverless deployment
module.exports = app;
