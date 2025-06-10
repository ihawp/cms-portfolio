const { insertPortfolioPost } = require('../../utils/portfolioQueries');

// Insert a new portfolio post to the DB.

const portfolioInsertController = async (req, res) => {

    // create json array of the file locations after movement, make middleware that does this movement/verification.
    // assign that for database upload

    const fileLocations = [];

    req.files.forEach(item => {
        fileLocations.push(item.filename);
    });

    req.body.files = req.body.images = fileLocations || [];
    
    try {
        // Pass req.body to avoid making redundant const variable for each form item
        
        const response = await insertPortfolioPost(req.body);

        if (!response.insertId) {
            return res.status(500).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
        }

        req.body.id = response.insertId;
        req.body.date_created = new Date().toISOString();

    } catch (error) {
        return res.status(400).json({ success: false, error: 'Database error when uploading portfolio post.', code: 'DATABASE_ERROR' });
    }

    res.status(200).json({ success: true, data: req.body, message: 'Portfolio item inserted successfully!' });

}

module.exports = portfolioInsertController;