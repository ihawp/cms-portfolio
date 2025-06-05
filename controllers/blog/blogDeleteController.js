const { selectBlogPostById } = require("../../utils/blogQueries");

const blogDeleteController = async (req, res) => {

    const { id, role } = req.user;
    const { postId } = req.query;

    console.log(id, postId);

    const blogPost = {
        the_post: undefined,
    };

    try {
        const response = await selectBlogPostById(postId);
    
        if (response.length === 0) {
            return res.status(400).json({ success: false, error: 'No result found.', code: 'NO_RESULT' });
        }

        blogPost.the_post = response[0];
    
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
    }

    res.status(200).json({ success: true, data: { thePost: blogPost.the_post }, message: 'Blog post deleted successfully!' });

}

module.exports = blogDeleteController;