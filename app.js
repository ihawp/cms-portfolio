const express = require('express');
const cors = require('cors');
const compression = require('compression');
const corsOptions = require('../utils/corsOptions');

const app = express();

/* Compress Response */
const compressionOptions = {}; // Move to own file when used.
app.use(compression());

/* Enable CORS */
app.use(cors(corsOptions));

/* Routers */
const authRouter = require('../routers/authRouter');
const portfolioRouter = require('../routes/portfolioRouter');
const blogRouter = require('../routes/blogRouter');

/**
 * @route USE /auth
 * @description User authentication. Login, register user accounts. Create and verify user sessions.
 */
app.use('/auth', authRouter);

/**
 * @route USE /portfolio
 * @description
 */
app.use('/portfolio', portfolioRouter);

/**
 * @route USE /blog
 * @description
 */
app.use('/blog', blogRouter);

module.exports = app;