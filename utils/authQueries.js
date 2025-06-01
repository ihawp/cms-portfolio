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

const selectUserLoginInfoByUsername = async (username) => {
    const [response] = await pool.execute(`
        SELECT id, password_hash
        FROM accounts
        WHERE username = ?`,
        [username]
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
    selectUserLoginInfoByUsername,

    updateAuthToken,

    insertUser,

    deleteUser,
}