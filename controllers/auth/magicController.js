const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { adminPool } = require('../../utils/pool');

const { selectAuthById, updateUserAuthById, updateUserEmailVerifiedById } = require('../../utils/authQueries');
const { jwtOptions1h, jwtOptions1w } = require('../../utils/jwtOptions');
const { cookieOptions1h, cookieOptions1w } = require('../../utils/cookieOptions');

const magicController = async (req, res) => {

    const { id, key } = req.query;

    const authToken = {
        token: null,
    }

    // Get the current auth_token_hash from the DB 
    try {
        const getAuthToken = await selectAuthById(id);
        authToken.token = getAuthToken[0]?.auth_token_hash;
    } catch (error) {
        return res.status(500).json({ data: null, error: 'Failed to retrieve authentication token from the database.' });
    }

    if (!authToken.token) {
        return res.status(400).json({ success: false, error: 'Token expired.', code: 'TOKEN_EXPIRED'});
    }

    // Do comparison between auth_token_hash from DB and submitted `key`.
    const compareToken = await bcrypt.compare(key, authToken.token);

    if (!compareToken) {
        return res.status(400).json({ data: null, error: 'Failure.' });
    }
    
    // Use ACID principles (create a transaction).
    const connection = await adminPool.getConnection();

    try {
        await connection.beginTransaction();

        await updateUserAuthById(connection, '', id);

        await updateUserEmailVerifiedById(connection, 1, id);

        await connection.commit();

    } catch (error) {
        await connection.rollback();
        return res.status(400).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
    }

    // Create JWT tokens.
    const createJWT = jwt.sign({ id }, process.env.JWT_SECRET, jwtOptions1h);
    const createLongLastingJWT = jwt.sign({ id }, process.env.LONG_JWT_SECRET, jwtOptions1w);

    res.cookie('jwt', createJWT, cookieOptions1h);
    res.cookie('long-jwt', createLongLastingJWT, cookieOptions1w);

    res.redirect(process.env.SERVER_URL + 'admin/ihawp/');

}

module.exports = magicController;