const express = require('express');

const portfolioRouter = express.Router();

/* Controllers */
const portfolioSelectController = require('../controllers/portfolio/portfolioSelectController');
const portfolioInsertController = require('../controllers/portfolio/portfolioInsertController');
const portfolioUpdateController = require('../controllers/portfolio/portfolioUpdateController');
const portfolioDeleteController = require('../controllers/portfolio/portfolioDeleteController');

/* Middleware */
const verifyJWT = require('../middleware/verifyJWT');

/**
 * @route GET /portfolio
 * @description Select portfolio items by (filter)
 * @controller portfolioSelectController
 */
portfolioRouter.get('/', portfolioSelectController); 

portfolioRouter.post('/', verifyJWT, portfolioInsertController);

portfolioRouter.put('/:id', verifyJWT, portfolioUpdateController);

portfolioRouter.delete('/:id', verifyJWT, portfolioDeleteController);

module.exports = portfolioRouter;