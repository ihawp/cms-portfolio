const { query } = require('express-validator');

const magicValidate = [
  query('key')
    .notEmpty()
    .withMessage('Key must not be empty.')
    .isLength({ min: 64, max: 64 })
    .withMessage('Key must be exactly 64 characters long.'),

  query('id')
    .isInt()
    .withMessage('ID must be an integer.')
];

module.exports = magicValidate;