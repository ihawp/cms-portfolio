const express = require('express');

const blogRouter = express.Router();

/* Controllers */
const blogSelectController = require('../controllers/blog/blogSelectController');
const blogInsertController = require('../controllers/blog/blogInsertController');
const blogUpdateController = require('../controllers/blog/blogUpdateController');
const blogDeleteController = require('../controllers/blog/blogDeleteController');

/* Middleware */
const verifyJWT = require('../middleware/verifyJWT');
const blogValidate = require('../middleware/blogValidate');
const validate = require('../middleware/validate');
const upload = require('../middleware/useMulter');
const verifyAndMoveUploads = require('../middleware/verifyUploadedFiles');
const createJSONFieldParser = require('../middleware/createJSONFieldParser');

/**
 * @route GET /blog
 * @description Select blog posts by (filters)
 * @controller blogSelectController
 */
blogRouter.get('/', 
    blogSelectController
);

/**
 * @route POST /blog
 * @description Insert a new blog post.
 * @middleware verifyJWT
 * @controller blogInsertController
 */
blogRouter.post('/',
    verifyJWT,
    upload.array('files', 5),
    verifyAndMoveUploads,
    createJSONFieldParser(['content', 'tags']),
    blogValidate,
    validate,
    blogInsertController
);

/**
 * @route PUT /blog/
 * @description
 * @middleware verifyJWT
 * @controller blogUpdateController
 */
blogRouter.put('/',
    verifyJWT,
    upload.array('files', 5),
    verifyAndMoveUploads,
    createJSONFieldParser(['content', 'tags']),
    blogValidate,
    validate,
    blogUpdateController
);

/**
 * @route DELETE /blog/:id
 * @description Delete a blog post by it's ID.
 * @middleware verifyJWT
 * @controller blogDeleteController
 */
blogRouter.delete('/:id',
    verifyJWT,
    blogDeleteController
);

module.exports = blogRouter;