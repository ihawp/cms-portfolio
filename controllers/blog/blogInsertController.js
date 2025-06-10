const { insertBlogPost } = require('../../utils/blogQueries');

const blogInsertController = async (req, res) => {

    const fileLocations = [];

    req.files.forEach(item => {
        fileLocations.push(item.filename);
    });

    req.body.files = fileLocations || [];

    try {
        const response = await insertBlogPost(req.body);

        if (!response.insertId) {
            return res.status(500).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
        }

        req.body.id = response.insertId;
        req.body.date_created = new Date().toISOString();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: '', code: '' });
    }

    res.status(200).json({ success: true, data: req.body, message: 'Blog post inserted successfully!' });

}

module.exports = blogInsertController;