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

/* use * for now */
const selectPortfolioPosts = async () => {
    const [response] = await pool.execute(`
        SELECT *
        FROM portfolio
        LIMIT 25
        `,
        []
    );
    return response;
}

// #######################################################################
// INSERT

/**
 * Insert a portfolio post to the database.
 * 
 * @param {Object} d - Data; Shortened name for simplicity.
 */
const insertPortfolioPost = async (d) => {

    console.log(d);

    console.log(        [
            d.title, d.intro, d.role, 
            JSON.stringify(d.timeline), 
            JSON.stringify(d.toolsUsed), 
            JSON.stringify(d.skillsApplied), 
            JSON.stringify(d.keyTasks), 
            JSON.stringify(d.challenges), 
            JSON.stringify(d.takeaways), 
            d.solutionSummary, 
            d.githubURL, d.projectSite, 
            JSON.stringify(d.files)
        ])

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
            d.title, d.intro, d.role, 
            JSON.stringify(d.timeline), 
            JSON.stringify(d.toolsUsed), 
            JSON.stringify(d.skillsApplied), 
            JSON.stringify(d.keyTasks), 
            JSON.stringify(d.challenges), 
            JSON.stringify(d.takeaways), 
            d.solutionSummary, 
            d.githubURL, d.projectSite, 
            JSON.stringify(d.files)
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
    const [response] = await pool.execute(`
            UPDATE portfolio SET
                title = ?,
                intro = ?,
                role = ?,
                timeline = ?,
                toolsUsed = ?,
                skillsApplied = ?,
                keyTasks = ?,
                challenges = ?,
                takeaways = ?,
                solutionSummary = ?,
                githubURL = ?,
                projectSite = ?,
                images = ?
            WHERE id = ?
        `,
        [
            d.title, d.intro, d.role, 
            JSON.stringify(d.timeline), 
            JSON.stringify(d.toolsUsed), 
            JSON.stringify(d.skillsApplied), 
            JSON.stringify(d.keyTasks), 
            JSON.stringify(d.challenges), 
            JSON.stringify(d.takeaways), 
            d.solutionSummary, 
            d.githubURL, d.projectSite, 
            JSON.stringify(d.files),
            portfolioPostId
        ]
    );
    console.log(response); 
    return response;
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
    selectPortfolioPostsByAmount,
    selectPortfolioPosts,

    insertPortfolioPost,

    updatePortfolioPost,

    deletePortfolioPostById,
}