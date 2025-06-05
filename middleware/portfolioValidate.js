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
 */

const portfolioValidate = [
    body([
        'title', 
        'intro', 
        'role'
    ])
        .isString()
        .isLength({ max: 255 })
        .withMessage('Should be a string with a maximum length of 255 characters.'),

    body([
        'timeline', 
        'toolsUsed', 
        'skillsApplied', 
        'keyTasks', 
        'challenges',
        'takeaways'
    ])
        .isArray()
        .withMessage('Must be an array'),

    body('toolsUsed')
        .isLength({ max: 10 })
        .withMessage('10 Tools used maximum'),

    body([
        'timeline.*', 
        'toolsUsed.*', 
        'skillsApplied.*', 
        'keyTasks.*',
        'takeaways.*'
    ])
        .isString()
        .isLength({ min: 1, max: 255 })
        .withMessage('Array items must be of string format.'),

    body(['solutionSummary', 'githubURL', 'projectSite'])
        .isString()
        .isLength({ max: 1000 })
        .withMessage('Solution Summary must not be longer than 1000 characters.'),

    body([
        'challenges.*.challenge',
        'challenges.*.solve'
    ])
        .isString()
        .withMessage('Challenges content must be a string.')

];

module.exports = portfolioValidate;