const express = require('express');

/* Create the router. */
const authRouter = express.Router();

/* Require Controllers. */
const registerController = require('../controllers/registerController');

/* Require Middleware. */
const registerValidate = require('../middleware/registerValidate');
const validate = require('../middleware/validate');
const checkAccountExistsByUsername = require('../middleware/checkAccountExistsByUsername');

/**
 * @route POST register
 * @description Allow a new user to register an account.
 * @middleware registerValidate, validate, checkAccountExistsByUsername
 * @controller registerController
 */
authRouter.post('/register', 
    registerValidate,
    validate,
    checkAccountExistsByUsername,
    registerController
);

// authRouter.post('/login', loginController);

module.exports = authRouter;