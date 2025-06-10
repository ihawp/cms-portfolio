const { selectBlogPosts } = require('../../utils/blogQueries');

const blogSelectController = async (req, res) => {
    // for now this is set to SELECT *
    try {
        const response = await selectBlogPosts();
        return res.status(200).json({ success: true, data: { response }, message: 'Blog posts retrieved successfully.' });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Database error', code: 'DATABASE_ERROR' });
    }
}

module.exports = blogSelectController;