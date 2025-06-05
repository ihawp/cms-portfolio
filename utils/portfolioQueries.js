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

const insertPortfolioPost = async () => {
    await pool.execute(`
        INSERT INTO portfolio
        ()
        VALUES (?, ?, ?)
        `,
        []
    );
}

// #######################################################################
// UPDATE

const updatePortfolioPost = async (portfolioPostId) => {
    await pool.execute(`
        UPDATE accounts SET () WHERE id = ?
        `,
        [portfolioPostId]
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