const { insertUser } = require("../../utils/authQueries");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendEmailTemplate } = require('../../utils/sendEmail');
const { generateMagicTokenEmailTemplate } = require('../../utils/emailTemplates');

const registerController = async (req, res) => {

    const { username, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const authTokenBuffer = await crypto.randomBytes(32);
    const authToken = authTokenBuffer.toString('hex');

    const authTokenHash = await bcrypt.hash(authToken, 10);

    const insertId = {
        id: undefined,
    }

    try {
        const response = await insertUser(username, email, passwordHash, authTokenHash);
        insertId.id = response.insertId;
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
    }

    // User account could be deleted if this fails
    // I think it would be ideal to use a listener for emails
    try {
        const emailTemplate = generateMagicTokenEmailTemplate(email, insertId.id, authToken);
        await sendEmailTemplate(emailTemplate);
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Email error.', code: 'EMAIL_ERROR' });
    }

    res.status(200).json({ success: true, message: 'Registration was successful.' });

}

module.exports = registerController;