const { body } = require('express-validator');

const blogValidate = [
    body(['title', 'author'])
        .isString()
        .isLength({ min: 1, max: 255 })
        .withMessage('Value must not be empty.'),
    body('content')
        .isArray()
        .isLength({ min: 1 })
        .withMessage('Content must be in array format.'),
    body(['content[*]', 'tags[*]'])
        .isString()
        .withMessage('Array contents must be in string format.'),
];

module.exports = blogValidate;