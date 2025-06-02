const { body } = require('express-validator');

const magicValidate = [
  body('key')
    .notEmpty()
    .isLength({ min: 64, max: 64 })
    .withMessage('Key must not be empty.'),

  body('id')
    .isInt()
    .withMessage('ID must be an integer.'),
];

module.exports = magicValidate;