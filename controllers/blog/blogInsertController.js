const { insertBlogPost } = require('../../utils/blogQueries');

const blogInsertController = async (req, res) => {

    try {
        await insertBlogPost();
    } catch (error) {
        return res.status(400).json({ success: false, error: '', code: '' });
    }

    res.status(200).json({ success: true, data: {}, message: 'Blog post inserted successfully!' });

}

module.exports = blogInsertController;