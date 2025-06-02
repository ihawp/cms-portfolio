const express = require('express');
const cors = require('cors');
const compression = require('compression');
const corsOptions = require('./utils/corsOptions');
const cookieParser = require('cookie-parser');

const app = express();

/* Compress Response */
const compressionOptions = {}; // Move to own file when used.
app.use(compression());

/* Cookie Parser */
app.use(cookieParser(process.env.COOKIE_SECRET));

/* Enable CORS */
app.use(cors(corsOptions));

/* Parse JSON Bodies */
app.use(express.json());

/* Routers */
const authRouter = require('./routers/authRouter');
const portfolioRouter = require('./routers/portfolioRouter');
const blogRouter = require('./routers/blogRouter');

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