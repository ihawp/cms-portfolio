const { pool, adminPool } = require('../utils/pool');

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

const selectBlogPostFilesById = async (id) => {
    const [response] = await pool.execute(`
        SELECT files
        FROM blog
        WHERE id = ?
        `,
        [id]
    );
    return response;
}

// #######################################################################
// UPDATE

const updateBlogPostById = async (d, postId) => {
    const [response] = await adminPool.execute(`
        UPDATE blog SET
            title = ?,
            author = ?,
            content = ?,
            tags = ?,
            files = ?
        WHERE id = ?
        `, [
            d.title,
            d.author,
            JSON.stringify(d.content),
            JSON.stringify(d.tags),
            JSON.stringify(d.files),
            postId
        ]);
    return response;
}

// #######################################################################
// INSERT

const insertBlogPost = async (d) => {
    const [response] = await adminPool.execute(
        `INSERT INTO blog (title, author, content, tags, files)
        VALUES (?, ?, ?, ?, ?)`,
        [
            d.title,
            d.author,
            JSON.stringify(d.content),
            JSON.stringify(d.tags),
            JSON.stringify(d.files)
        ]
    );
    return response;
}

// #######################################################################
// DELETE

const deleteBlogPostById = async (postId) => {
    await adminPool.execute(
        'DELETE FROM blog WHERE id = ?',
        [postId]
    );
}

module.exports = {
    selectBlogPostById,
    selectBlogPosts,
    selectBlogPostFilesById,

    updateBlogPostById,

    insertBlogPost,

    deleteBlogPostById,
}