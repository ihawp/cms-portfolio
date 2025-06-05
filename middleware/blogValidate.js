const { body } = require('express-validator');

/*

    Intake a blog post form.

    Structure of form:

        Title

        Featured Image

        Content: Use [*] to target items within the array
                    so that those items may be checked for
                    proper type (string)

        Tags
  
        

*/

const blogValidate = [
    body('title')
        .isString()
        .withMessage('Title must not be empty.'),
    body('content')
        .isArray()
        .isLength({ min: 1 })
        .withMessage('Content must be in array format'),
    body('content[*]')
        .isString()
        .withMessage(''),
];

module.exports = blogValidate;