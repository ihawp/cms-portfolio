const { deletePortfolioPostById, selectPortfolioPostFilesById } = require('../../utils/portfolioQueries');
const validator = require('validator');
const fs = require('node:fs').promises;

const portfolioDeleteController = async (req, res) => {

    const { id } = req.params;

    if (!validator.isNumeric(id)) {
        return res.status(400).json({ success: false, error: '', code: '' });
    }

    try {
        const response = await selectPortfolioPostFilesById(id);

        if (response[0] && response[0].images) {

            const parseResponse = JSON.parse(response[0].images);

            console.log(response);
            console.log('parseResponse', parseResponse);

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
        await deletePortfolioPostById(id);
    } catch (error) {
        return res.status(400).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
    }

    res.status(200).json({ success: true, data: {}, message: 'Portfolio item deleted successfully!' });

}

module.exports = portfolioDeleteController;