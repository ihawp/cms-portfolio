const express = require('express');

const apiRouter = express.Router();

const portfolioRouter = require('./routers/portfolioRouter');
const blogRouter = require('./routers/blogRouter');

/**
 * @route USE /portfolio
 * @description
 */
apiRouter.use('/portfolio', portfolioRouter);

/**
 * @route USE /blog
 * @description
 */
apiRouter.use('/blog', blogRouter);

module.exports = apiRouter;