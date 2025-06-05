const blogSelectController = (req, res) => {

    res.status(200).json({ success: true, data: {}, message: 'Blog post selected successfully! (return some json blog post data)' });

}

module.exports = blogSelectController;