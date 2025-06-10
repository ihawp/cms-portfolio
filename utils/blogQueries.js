const pool = require('../utils/pool');

// #######################################################################
// SELECT

const selectBlogPostById = async (postId) => {
    const [response] = await pool.execute(`
        SELECT * FROM blog 
        WHERE id = ?
        `,
        [postId]
    );
    return response;
}

const selectBlogPosts = async () => {
    const [response] = await pool.execute(`
        SELECT * FROM blog
        LIMIT 25    
        `,
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
    selectBlogPosts,

    insertBlogPost,

    deleteBlogPostById,
}