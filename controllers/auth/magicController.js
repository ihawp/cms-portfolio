const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { selectAuthById, updateUserAuthById, updateUserEmailVerifiedById } = require('../../utils/authQueries');
const { jwtOptions1h, jwtOptions1w } = require('../../utils/jwtOptions');
const { cookieOptions1h, cookieOptions1w } = require('../../utils/cookieOptions');

const magicController = async (req, res) => {

    const { id, key } = req.body;

    const authToken = {
        token: null,
    }

    try {
        const getAuthToken = await selectAuthById(id);
        authToken.token = getAuthToken[0]?.auth_token_hash;
    } catch (error) {
        return res.status(500).json({ data: null, error: 'Failed to retrieve authentication token from the database.' });
    }

    const compareToken = await bcrypt.compare(key, authToken.token);

    if (!compareToken) {
        return res.status(400).json({ data: null, error: 'Failure.' });
    }
    
    console.log(id, key);


    // Remove the old authentication token (1 time use)
    try {
        await updateUserAuthById('', id);
    } catch (error) {
        return res.status(500).json({ data: null, error: 'Failure updating authentication token. Please try clicking the link again.' });
    }

    // Update the users email_verified status to 1 (verified)
    try {
        await updateUserEmailVerifiedById(1, id);
    } catch (error) {
        return res.status(500).json({ data: null, error: 'Failure updating email verification level. Please try again later.' })
    }

    // Create JWT tokens
    const createJWT = jwt.sign({ id }, process.env.JWT_SECRET, jwtOptions1h);
    const createLongLastingJWT = jwt.sign({ id }, process.env.LONG_JWT_SECRET, jwtOptions1w);

    console.log(createJWT);

    res.cookie('jwt', createJWT, cookieOptions1h);
    res.cookie('long-jwt', createLongLastingJWT, cookieOptions1w);

    res.status(200).json({ data: { authenticated: true }, error: null });

}

module.exports = magicController;