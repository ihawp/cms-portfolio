const { body } = require('express-validator');

const registerValidate = () => [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  body('username')
    .notEmpty()
    .isLength({ min: 5, max: 16 })
    .withMessage('Name is required')
    .trim()
    .escape(),
];

module.exports = registerValidate;
