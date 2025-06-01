const { selectUserIdByUsernameOrEmail } = require('../utils/authQueries');

const checkAccountExistsByUsername = async (req, res, next) => {

    const { username, email } = req.body;

    try {
        const response = await selectUserIdByUsernameOrEmail(username, email);

        if (response.length > 0) {
            return res.status(400).json({ success: false, error: "Account with submitted username already exists.", code: "ACCOUNT_EXISTS" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
    }

    next();

}

module.exports = checkAccountExistsByUsername;