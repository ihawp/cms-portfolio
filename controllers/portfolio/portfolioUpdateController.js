const { updatePortfolioPost } = require('../../utils/portfolioQueries');

const portfolioUpdateController = async (req, res) => {

    try {
        await updatePortfolioPost(req.body);
    } catch (error) {
        return res.status(400).json({ success: false, error: '', code: '' });
    }

    res.status(200).json({ success: true, data: {}, message: 'Portfolio item updated successfully!' });

}

module.exports = portfolioUpdateController;