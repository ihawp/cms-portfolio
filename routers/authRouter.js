const express = require('express');

/* Create the router. */
const authRouter = express.Router();

/* Require Controllers. */
const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');
const magicController = require('../controllers/auth/magicController');
const verifyController = require('../controllers/auth/verifyController');
const logoutController = require('../controllers/auth/logoutController');

/* Require Middleware. */
const registerValidate = require('../middleware/registerValidate');
const loginValidate = require('../middleware/loginValidate');
const magicValidate = require('../middleware/magicValidate');
const validate = require('../middleware/validate');
const checkAccountExistsByUsername = require('../middleware/checkAccountExistsByUsername');
const verifyJWT = require('../middleware/verifyJWT');
const rateLimiterMiddleware = require('../middleware/rateLimiter');

/**
 * @route POST /register
 * @description Allow a new user to register an account.
 * @middleware rateLimiterMiddleware, registerValidate, validate, checkAccountExistsByUsername
 * @controller registerController
 */
authRouter.post('/register', 
    rateLimiterMiddleware,
    registerValidate,
    validate,
    checkAccountExistsByUsername,
    registerController
);

/**
 * @route POST /login
 * @description Allow a user to login with their account credentials.
 * @middleware rateLimiterMiddleware, loginValidate, validate
 * @controller loginController
 */
authRouter.post('/login',
    rateLimiterMiddleware,
    loginValidate,
    validate,
    loginController
);

/**
 * @route POST /magic
 * @description Authenticate a users magic email verification link.
 * @middleware magicValidate, validate
 * @controller magicController
 */
authRouter.get('/magic',
    magicValidate,
    validate,
    magicController
);

/**
 * @route GET /verify
 * @description Verify the users current session, regenerate it, or determine it expired/never existed. 
 * @middleware verifyJWT
 * @controller verifyController
 */
authRouter.get('/verify', 
    verifyJWT,
    verifyController
);

/**
 * @route GET /logout
 * @description Log the user out of the application by clearing their cookies
 * @middleware verifyJWT
 * @controller logoutController
 */
authRouter.get('/logout', 
    verifyJWT,
    logoutController
);

module.exports = authRouter;