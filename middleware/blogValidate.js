const { body } = require('express-validator');

/**
 * Expected Types:
 * 
 * Title: string (min: 1, max: 255)
 * Author: string (min: 1, max: 255)
 * Content: array (min: 1)
 *      each array item is string (min: 1, max: 500)
 * Tags: array (min: 1)
 *      each array item is string (min: 1, max: 500)
 *          It is highly likely that no tag will ever be 500 characters in length
 */
const blogValidate = [
    body(['title', 'author'])
        .isString()
        .isLength({ min: 1, max: 255 })
        .withMessage('Value must not be empty.'),

    body('id')
        .optional()
        .isNumeric()
        .withMessage('ID must be a number.'),

    body(['content', 'tags'])
        .optional()
        .isArray()
        .withMessage('Content must be in array format.'),

    body(['content.*', 'tags.*'])
        .optional()
        .isObject()
        .withMessage('Array contents must be an object.'),
    
    body(['content.*.*', 'tags.*.*'])
        .isString()
        .isLength({ min: 1, max: 500 })
        .withMessage('Content or tags must be a string.')
];

module.exports = blogValidate;