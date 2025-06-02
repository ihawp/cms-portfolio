const { selectUserLoginInfoByEmail, updateAuthToken } = require('../../utils/authQueries');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { generateMagicTokenEmailTemplate } = require('../../utils/emailTemplates');
const { sendEmailTemplate } = require('../../utils/sendEmail');

const loginController = async (req, res) => {

    const { email, password } = req.body;

    const userInfo = {};

    const authTokenBuffer = crypto.randomBytes(32);
    const authToken = authTokenBuffer.toString('hex');
    const authTokenHash = await bcrypt.hash(authToken, 10);

    try {
        const response = await selectUserLoginInfoByEmail(email);

        if (!response[0]) {
            return res.status(400).json({ success: false, error: 'Account does not exist.', code: 'ACCOUNT_NOT_EXIST' });
        }

        userInfo.id = response[0].id;

        const comparison = await bcrypt.compare(password, response[0].password_hash);
            
        if (!comparison) {
            return res.status(400).json({ success: false, error: 'Incorrect credentials.', code: 'CREDENTIALS' })
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR'})
    }

    try {
        const emailTemplate = generateMagicTokenEmailTemplate(email, userInfo.id, authToken);
        await sendEmailTemplate(emailTemplate);
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Verification email failed.', code: 'VERIFY_EMAIL' });
    }

    try {
        await updateAuthToken(authTokenHash, userInfo.id);
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Update auth_token failed', code: 'AUTH_UPDATE_FAIL' });
    }

    res.status(200).json({ success: true, data: {}, message: 'Login was successful!' });

}

module.exports = loginController;