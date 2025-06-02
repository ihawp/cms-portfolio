const blogInsertController = (req, res) => {

    res.status(200).json({ success: true, data: {}, message: 'Blog post inserted successfully!' });

}

module.exports = blogInsertController;