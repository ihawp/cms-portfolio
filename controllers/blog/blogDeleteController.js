const blogDeleteController = (req, res) => {

    res.status(200).json({ success: true, data: {}, message: 'Blog post deleted successfully!' });

}

module.exports = blogDeleteController;