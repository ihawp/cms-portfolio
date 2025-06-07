const express = require('express');

const portfolioRouter = express.Router();

/* Controllers */
const portfolioSelectController = require('../controllers/portfolio/portfolioSelectController');
const portfolioInsertController = require('../controllers/portfolio/portfolioInsertController');
const portfolioUpdateController = require('../controllers/portfolio/portfolioUpdateController');
const portfolioDeleteController = require('../controllers/portfolio/portfolioDeleteController');

/* Middleware */
const verifyJWT = require('../middleware/verifyJWT');
const portfolioValidate = require('../middleware/portfolioValidate');
const validate = require('../middleware/validate');
const upload = require('../middleware/useMulter');
const parseJSONFields = require('../middleware/parseJSONFields');
const verifyAndMoveUploads = require('../middleware/verifyUploadedFiles');

/**
 * @route GET /portfolio
 * @description Select portfolio items by (filter)
 * @controller portfolioSelectController
 */
portfolioRouter.get('/', 
    portfolioSelectController
); 

// Wrote portfolioValidate for portfolio insertion queries, but I assume I will UPDATE posts by submitting all content anyway, so the validator will obviously carry.
// There could be added validation for 'has the post actually changed?' but that would be frontend specific, and not worthwhile to run on the server (checking against database and all)
/**
 * @route POST /portfolio
 * @description INSERT a new portfolio item to the DB.
 * @middleware verifyJWT, portfolioValidate, validate
 * @controller portfolioInsertController
 */
portfolioRouter.post('/', 
    verifyJWT,
    upload.array('files', 5),
    verifyAndMoveUploads,
    parseJSONFields,
    portfolioValidate, 
    validate, 
    portfolioInsertController
);

/**
 * @route PUT /portfolio/:id
 * @description Update a portfolio post by the provided ID.
 * @middleware verifyJWT, portfolioValidate, validate
 * @controller portfolioUpdateController
 */
portfolioRouter.put('/:id', 
    verifyJWT, 
    portfolioValidate, 
    validate, 
    portfolioUpdateController
);

/**
 * @route DELETE /portfolio/:id
 * @description Delete a portfolio post by the provided ID.
 * @middleware verifyJWT
 * @controller portfolioDeleteController
 */
portfolioRouter.delete('/:id', 
    verifyJWT, 
    portfolioDeleteController
);

module.exports = portfolioRouter;