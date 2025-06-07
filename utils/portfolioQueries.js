const pool = require('./pool');

// #######################################################################
// SELECT

const selectPortfolioPostById = async (portfolioPostId) => {
    const [response] = await pool.execute(`
        SELECT 
        FROM portfolio
        WHERE id = ?
        `, 
        [portfolioPostId]
    );
    return response;
}

const selectPortfolioPostsByAmount = async (amountOfPosts) => {
    const [resonse] = await pool.execute(`
        SELECT 
        `,
        []
    )
}

// #######################################################################
// INSERT

/**
 * Insert a portfolio post to the database.
 * 
 * @param {Object} d - Data; Shortened name for simplicity.
 */
const insertPortfolioPost = async (d) => {

    await pool.execute(`
        INSERT INTO portfolio
        (title, intro, role,
        timeline, toolsUsed,
        skillsApplied, keyTasks,
        challenges, takeaways,
        solutionSummary, githubURL,
        projectSite, images)
        VALUES (?, ?, ?, ?, ?, ?, ?, 
                ?, ?, ?, ?, ?, ?)
        `,
        [
            d.title, d.intro, d.role, d.timeline, 
            d.toolsUsed, d.skillsApplied, 
            d.keyTasks, d.challenges, 
            d.takeaways, d.solutionSummary, 
            d.githubURL, d.projectSite, d.files
        ]
    );
}

// #######################################################################
// UPDATE

/**
 * Update a portfolio post by it's Id number.
 * 
 * @param {Object} d - Data; simplified name.
 * @param {Number} portfolioPostId - The post Id in question.
 * 
 * Will not be used in a transactional manor.
 */
const updatePortfolioPost = async (d, portfolioPostId) => {
    await pool.execute(`
        UPDATE portfolio SET (
        title, intro, role,
        timeline, toolsUsed,
        skillsApplied, keyTasks,
        challenges, takeaways,
        solutionSummary, githubURL,
        projectSite, images) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 
                ?, ?, ?, ?, ?, ?)
        WHERE id = ?
        `,
        [
            d.title, d.intro, d.role, d.timeline, 
            d.toolsUsed, d.skillsApplied, 
            d.keyTasks, d.challenges, 
            d.takeaways, d.solutionSummary, 
            d.githubURL, d.projectSite, d.images,
            portfolioPostId
        ]
    )
}

// #######################################################################
// DELETE

const deletePortfolioPostById = async (portfolioPostId) => {
    await pool.execute(`
        DELETE FROM portfolio
        WHERE id = ?
        `,
        [portfolioPostId]
    );
}

module.exports = {
    selectPortfolioPostById,

    insertPortfolioPost,

    updatePortfolioPost,

    deletePortfolioPostById,
}