const { body } = require('express-validator');

const loginValidate = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  body('email')
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),
];

module.exports = loginValidate;
