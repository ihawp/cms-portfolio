const { selectPortfolioPosts } = require('../../utils/portfolioQueries');

const portfolioSelectController = async (req, res) => {

    try {
        const response = await selectPortfolioPosts();

        console.log(response);
        if (response.length > 0) {
            return res.status(200).json({ success: true, data: { response }, message: 'Data selected successfully!' });
        }
        return res.status()
    } catch (error) {
        return res.status(400).json({ success: false, error: '', code: '' });
    }

    res.status(200).json({ success: true, data: {}, message: 'Portfolio items selected successfully! (output portfolio item data in JSON)' });

}

module.exports = portfolioSelectController;