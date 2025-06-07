const { deletePortfolioPostById } = require('../../utils/portfolioQueries');

const portfolioDeleteController = async (req, res) => {

    const { id } = req.query;
    
    // Should also delete any affiliated media from the appropriate directory.

    try {
        await deletePortfolioPostById(id);
    } catch (error) {
        return res.status(400).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
    }

    res.status(200).json({ success: true, data: {}, message: 'Portfolio item deleted successfully!' });

}

module.exports = portfolioDeleteController;