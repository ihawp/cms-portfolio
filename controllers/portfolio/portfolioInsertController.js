const { insertPortfolioPost } = require('../../utils/portfolioQueries');

// Insert a new portfolio post to the DB.

const portfolioInsertController = async (req, res) => {

    // Attach eventual images array here (or maybe it will be attached earlier in middleware)
    req.body.files = req.files;

    // create json array of the file locations after movement, make middleware that does this movement/verification.
    // assign that for database upload

    const fileLocations = [];

    req.files.forEach(item => {
        fileLocations.push(item.filename);
    });

    req.body.files = fileLocations || [];
    
    try {
        // Pass req.body to avoid making redundant const variable for each form item
        
        // const response = 
        // get response and return the post insert id + the data
        await insertPortfolioPost(req.body);

    } catch (error) {
        return res.status(400).json({ success: false, error: 'Database error when uploading portfolio post.', code: 'DATABASE_ERROR' });
    }

    res.status(200).json({ success: true, data: {}, message: 'Portfolio item inserted successfully!' });

}

module.exports = portfolioInsertController;