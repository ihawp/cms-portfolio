const { selectBlogPostById } = require("../../utils/blogQueries");

// Delete a blog post by id.

const blogDeleteController = async (req, res) => {

    res.status(200).json({ success: true, data: { thePost: blogPost.the_post }, message: 'Blog post deleted successfully!' });

}

module.exports = blogDeleteController;