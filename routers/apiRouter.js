const express = require('express');

const apiRouter = express.Router();

const portfolioRouter = require('./portfolioRouter');
const blogRouter = require('./blogRouter');

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