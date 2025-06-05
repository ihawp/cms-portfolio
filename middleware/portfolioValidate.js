const { body } = require('express-validator');

// Validate a portfolio form submission from CMS.

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