const { updateBlogPostById, selectBlogPostFilesById } = require('../../utils/blogQueries');
const fs = require('node:fs').promises;

const blogUpdateController = async (req, res) => {

    const { id } = req.body;

    const fileLocations = [];

    // for when files are not updated
    // but a SINGLE IMAGE is a part of the
    // images column (from another update or the original post)
    // it will just not work, so this checks for that case
    // and handles it.

    if (typeof req.body?.files === 'string') {
        req.body.files = [req.body.files];
    } else if (typeof req.body?.files !== 'object') {
        req.body.files = [];
    }

    if (req.files.length > 0) {

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

        req.files.forEach(item => {
            fileLocations.push(item.filename);
        });

        req.body.files = fileLocations || [];

    }

    if (!id) {
        return res.status(400).json({ success: false, error: '', code: '' });
    }

    try {
        await updateBlogPostById(req.body, id);
    } catch (error) {
        return res.status(400).json({ success: false, error: 'Failed to update blog post.', code: 'UPDATE_FAILED' });
    }

    req.body.id = id;

    res.status(200).json({ success: true, data: req.body, message: 'Blog post updated successfully!' });

}

module.exports = blogUpdateController;