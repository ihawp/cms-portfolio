const express = require('express');

const blogRouter = express.Router();

/* Controllers */
const blogSelectController = require('../controllers/blog/blogSelectController');
const blogInsertController = require('../controllers/blog/blogInsertController');
const blogUpdateController = require('../controllers/blog/blogUpdateController');
const blogDeleteController = require('../controllers/blog/blogDeleteController');

/* Middleware */
const verifyJWT = require('../middleware/verifyJWT');

/**
 * @route GET /blog
 * @description Select blog posts by (filters)
 * @controller blogSelectController
 */
blogRouter.get('/', blogSelectController);

/**
 * @route
 * @description Insert a new blog post.
 * @middleware verifyJWT
 * @controller blogInsertController
 */
blogRouter.post('/', verifyJWT, blogInsertController);

/**
 * @route
 * @description
 * @middleware verifyJWT
 * @controller blogUpdateController
 */
blogRouter.put('/:id', verifyJWT, blogUpdateController);

/**
 * @route DELETE /blog/:id
 * @description Delete a blog post by it's ID.
 * @middleware verifyJWT
 * @controller blogDeleteController
 */
blogRouter.delete('/:id', verifyJWT, blogDeleteController);

module.exports = blogRouter;