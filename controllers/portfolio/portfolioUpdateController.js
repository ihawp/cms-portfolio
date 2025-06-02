const portfolioUpdateController = (req, res) => {

    res.status(200).json({ success: true, data: {}, message: 'Portfolio item updated successfully!' });

}

module.exports = portfolioUpdateController;