const { updatePortfolioPost } = require('../../utils/portfolioQueries');

const portfolioUpdateController = async (req, res) => {

    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, error: '', code: '' });
    }

    try {
        const response = await updatePortfolioPost(req.body, id);
        console.log(response);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: 'Failed to update portfolio post.', code: 'UPDATE_FAILED' });
    }

    res.status(200).json({ success: true, data: {}, message: 'Portfolio item updated successfully!' });

}

module.exports = portfolioUpdateController;