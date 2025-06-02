const portfolioDeleteController = (req, res) => {

    res.status(200).json({ success: true, data: {}, message: 'Portfolio item deleted successfully!' });

}

module.exports = portfolioDeleteController;