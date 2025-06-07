const { body } = require('express-validator');

const registerValidate = [
  body('email')
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 1 })
    .withMessage('Password must be at least 1 characters'),

  body('username')
    .notEmpty()
    .isLength({ min: 5, max: 16})
    .withMessage('Name is required')
    .trim()
    .escape(),
];

module.exports = registerValidate;
