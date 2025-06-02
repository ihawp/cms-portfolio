const blogUpdateController = (req, res) => {

    res.status(200).json({ success: true, data: {}, message: 'Blog post updated successfully!' });

}

module.exports = blogUpdateController;