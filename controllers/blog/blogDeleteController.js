const { deleteBlogPostById } = require("../../utils/blogQueries");
const validator = require('validator');

// Delete a blog post by id.

const blogDeleteController = async (req, res) => {

    const { id } = req.body;

    if (!validator.isNumeric(id)) {
        return res.status(400).json({ success: false, error: '', code: '' });
    }

    try {
        await deleteBlogPostById(id);
    } catch (error) {
        return res.status(400).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
    }

    res.status(200).json({ success: true, data: {}, message: 'Blog post deleted successfully!' });

}

module.exports = blogDeleteController;