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

// #######################################################################
// DELETE

const deleteBlogPostById = async (postId) => {
    await pool.execute(
        'DELETE FROM blog WHERE id = ?',
        [postId]
    );
}

module.exports = {
    selectBlogPostById,

    insertBlogPost,

    deleteBlogPostById,
}