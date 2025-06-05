const { insertPortfolioPost } = require('../../utils/portfolioQueries');

// Insert a new portfolio post to the DB.

const portfolioInsertController = async (req, res) => {

    // Assume we have properly validated these items and now they are available
    // via req.body.

    // Deal with image uploads here... or in seperate middleware.

    const {
        title,
        intro,
        role,
        timeline,
        toolsUsed,
        skillsApplied,
        keyTasks,
        challenges,
        takeaways
    } = req.body;

    try {
        await insertPortfolioPost();
    } catch (error) {
        return res.status(400).json({ success: false, error: 'Database error when uploading portfolio post.', code: 'DATABASE_ERROR' });
    }

    console.log({
        title, intro, role,
        timeline, toolsUsed, skillsApplied,
        keyTasks, challenges, takeaways
    });

    res.status(200).json({ success: true, data: {}, message: 'Portfolio item inserted successfully!' });

}

module.exports = portfolioInsertController;