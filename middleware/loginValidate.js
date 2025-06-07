const { body } = require('express-validator');

const loginValidate = [
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password must be at least 1 characters'),

  body('email')
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),
];

module.exports = loginValidate;
