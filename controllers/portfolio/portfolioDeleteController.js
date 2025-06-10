const { deletePortfolioPostById } = require('../../utils/portfolioQueries');
const validator = require('validator');

const portfolioDeleteController = async (req, res) => {

    const { id } = req.params;

    if (!validator.isNumeric(id)) {
        return res.status(400).json({ success: false, error: '', code: '' });
    }

    // Should also delete any affiliated media from the appropriate directory.

    try {
        await deletePortfolioPostById(id);
    } catch (error) {
        return res.status(400).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
    }

    res.status(200).json({ success: true, data: {}, message: 'Portfolio item deleted successfully!' });

}

module.exports = portfolioDeleteController;