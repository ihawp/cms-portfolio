const { body } = require('express-validator');

// Validate a portfolio form submission from CMS.

/**
 * Expected Types:
 * 
 * Title: string (max: 255)
 * Intro: string (max: 255)
 * Role: string (max: 255)
 * Timeline: array (contents must be string (min: 1, max: 255))
 * toolsUsed: array (contents must be string (min: 1, max: 255))
 * skillsApplied: array (contents must be string (min: 1, max: 255))
 * keyTasks: array (contents must be string (min: 1, max: 255))
 * challenges: array
 *     each array item is object that has `challenge` and `solve`
 * takeaways: array
 * solutionSummary: string (max: 1000)
 * githubURL: string (max: 1000)
 * projectSite: string (max: 1000)
 * 
 * Some images (maybe videos) are possible, but those will be dealt with seperately in middleware.
 * I will assume storing this will be best done as array of strings, where the strings are the names of the image files, and their location is public/portfolio/images.!?
 */

const portfolioValidate = [
    body([
        'title', 
        'intro', 
        'role'
    ])
        .trim()
        .isString()
        .isLength({ max: 255 })
        .withMessage('Should be a string with a maximum length of 255 characters.'),

    body('id')
        .optional()
        .isNumeric()
        .withMessage('ID must be a number.'),

    body([
        'timeline',
        'toolsUsed',
        'skillsApplied',
        'keyTasks',
        'challenges',
        'takeaways'
    ])
        .optional()
        .isArray()
        .withMessage('Must be an array'),

    body([
        'challenges.*',
        'timeline.*',
        'skillsApplied.*', 
        'keyTasks.*',
        'takeaways.*'
    ])
        .optional()
        .custom(value => {
            if (typeof value !== 'object' || Array.isArray(value) || value === null) {
                throw new Error('Each item must be a non-null object');
            }
            return true;
        }),

    body([
        'toolsUsed.*', 
    ])
        .optional() // Optional call not required because .* is empty if not filled!
        .isString()
        .isLength({ min: 1, max: 255 })
        .withMessage('Array items must be of string format.'),

    body(['solutionSummary', 'githubURL', 'projectSite'])
        .optional()
        .isString()
        .isLength({ max: 1000 })
        .withMessage('Solution Summary must not be longer than 1000 characters.'),

    body(['id'])
        .optional()
        .isNumeric()
        .withMessage('Send an numeric ID next time.')

];

module.exports = portfolioValidate;