const pool = require('./pool');

// #######################################################################
// SELECT

const selectUserIdByUsernameOrEmail = async (username, email) => {
    const [response] = await pool.execute(`
        SELECT id 
        FROM accounts 
        WHERE username = ? 
        OR email = ?`, 
        [username, email]
    );
    return response;
}

const selectUserLoginInfoByEmail = async (username) => {
    const [response] = await pool.execute(`
        SELECT id, password_hash
        FROM accounts
        WHERE email = ?`,
        [username]
    );
    return response;
}

const selectAuthById = async (id) => {
    const [response] = await pool.execute(`
        SELECT auth_token_hash 
        FROM accounts 
        WHERE id = ?`,
        [id]);
    return response;
}

const selectFrontendUserById = async (id) => {
    const [response] = await pool.execute(`
        SELECT username, email, 
        email_verified, pfp_url, 
        date_created 
        FROM accounts 
        WHERE id = ?`, 
        [id]
    );
    return response;
}

// #######################################################################
// UPDATE

const updateAuthToken = async (authTokenHash, userId) => {
    const [response] = await pool.execute(`
        UPDATE accounts 
        SET auth_token_hash = ?, 
        auth_token_created_at = CURRENT_TIMESTAMP(6) 
        WHERE id = ?`,
        [authTokenHash, userId]
    );
    return response;
}

const updateUserAuthById = async (connection, newAuthToken, id) => {
    await connection.execute(`
        UPDATE accounts 
        SET auth_token_hash = ? 
        WHERE id = ?`, [newAuthToken, id]);
}

const updateUserEmailVerifiedById = async (connection, newEmailVerifiedLevel, id) => {
    await connection.execute(`
        UPDATE accounts 
        SET email_verified = ?, 
        email_verified_at = CURRENT_TIMESTAMP(6) 
        WHERE id = ?`, [newEmailVerifiedLevel, id]);
}

// #######################################################################
// INSERT

const insertUser = async (username, email, passwordHash, authTokenHash) => {
    const [response] = await pool.execute(`
        INSERT INTO accounts (
            username, 
            email, 
            password_hash, 
            auth_token_hash, 
            auth_token_created_at
        ) 
        VALUES (
            ?, ?, ?, ?, 
            CURRENT_TIMESTAMP(6)
        )`, 
        [username, email, passwordHash, authTokenHash]
    );
    return response;
}

// #######################################################################
// DELETE

const deleteUser = async (userId) => {
    const [response] = await pool.execute(
        'DELETE FROM accounts WHERE id = ?',
        [userId]
    );
    return response;
}

module.exports = {
    selectUserIdByUsernameOrEmail,
    selectUserLoginInfoByEmail,
    selectAuthById,
    selectFrontendUserById,

    updateAuthToken,
    updateUserAuthById,
    updateUserEmailVerifiedById,

    insertUser,

    deleteUser,
}