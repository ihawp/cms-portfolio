const { updatePortfolioPost, selectPortfolioPostFilesById } = require('../../utils/portfolioQueries');
const fs = require('node:fs').promises;

const portfolioUpdateController = async (req, res) => {

    const { id } = req.body;

    console.log(req.body);

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

        // delete the old files.
        // Or maybe build media library thing where I can delete images?
        // And then eventually maybe update images for blog or portfolio from the
        // media library

        try {
            const response = await selectPortfolioPostFilesById(id);

            if (response[0] && response[0].images) {
                const parseResponse = JSON.parse(response[0].images);

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

        req.body.files = req.body.images = fileLocations || [];

    }

    if (!id) {
        return res.status(400).json({ success: false, error: '', code: '' });
    }

    try {
        await updatePortfolioPost(req.body, id);
    } catch (error) {
        return res.status(400).json({ success: false, error: 'Failed to update portfolio post.', code: 'UPDATE_FAILED' });
    }

    req.body.id = id;

    res.status(200).json({ success: true, data: req.body, message: 'Portfolio item updated successfully!' });

}

module.exports = portfolioUpdateController;