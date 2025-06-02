const portfolioInsertController = (req, res) => {

    res.status(200).json({ success: true, data: {}, message: 'Portfolio item inserted successfully!' });

}

module.exports = portfolioInsertController;