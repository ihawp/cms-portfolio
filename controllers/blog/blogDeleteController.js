const { deleteBlogPostById, selectBlogPostFilesById } = require("../../utils/blogQueries");
const validator = require('validator');
const fs = require('node:fs').promises;

// Delete a blog post by id.

const blogDeleteController = async (req, res) => {

    const { id } = req.params;

    if (!validator.isNumeric(id)) {
        return res.status(400).json({ success: false, error: '', code: '' });
    }

    // Get file names from DB and delete them.

    try {
        const response = await selectBlogPostFilesById(id);

        if (response[0] && response[0].files) {
            const parseResponse = JSON.parse(response[0].files);

            for (const file of parseResponse) {
                try {
                    await fs.unlink(`verified_uploads/${file}`);
                } catch (error) {
                    // fallthrough
                }
            }

        }
    } catch (error) {
        return res.status(400).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
    }

    try {
        await deleteBlogPostById(id);
    } catch (error) {
        return res.status(400).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
    }

    res.status(200).json({ success: true, data: {}, message: 'Blog post deleted successfully!' });

}

module.exports = blogDeleteController;