const pool = require('../utils/pool');

// #######################################################################
// SELECT

const selectBlogPostById = async (postId) => {
    const [response] = await pool.execute(
        ``,
        []
    );
    return response;
}

// #######################################################################
// INSERT

const insertBlogPost = async () => {
    const [response] = await pool.execute(
        ``,
        []
    );
    return response;
}

module.exports = {
    selectBlogPostById,

    insertBlogPost,
}