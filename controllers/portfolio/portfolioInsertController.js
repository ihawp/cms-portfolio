const { insertPortfolioPost } = require('../../utils/portfolioQueries');

// Insert a new portfolio post to the DB.

const portfolioInsertController = async (req, res) => {

    // Attach eventual images array here (or maybe it will be attached earlier in middleware)
    console.log(req.files);
    
    try {
        // Pass req.body to avoid making redundant const variable for each form item
        await insertPortfolioPost(req.body);
    } catch (error) {
        return res.status(400).json({ success: false, error: 'Database error when uploading portfolio post.', code: 'DATABASE_ERROR' });
    }

    res.status(200).json({ success: true, data: {}, message: 'Portfolio item inserted successfully!' });

}

module.exports = portfolioInsertController;