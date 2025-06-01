const { insertUser } = require("../utils/authQueries");
const bcrypt = require('bcryptjs');
const crypto = require('node:crypto');
const { sendEmailTemplate } = require('../utils/sendEmail');
const { generateMagicTokenEmailTemplate } = require('../utils/emailTemplates');

const registerController = async (req, res) => {

    const { username, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const authToken = crypto.randomBytes(32);

    const authTokenHash = bcrypt.hash(authToken, 10);

    const insertId = {
        the_id: undefined,
    }

    try {
        const response = await insertUser(username, email, passwordHash, authTokenHash);
        
        console.log(response);

        if (response?.insertId) {
            console.log('wow');
        }
    
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Database error.', code: 'DATABASE_ERROR' });
    }

    // User account could be deleted if this fails
    try {
        const emailTemplate = generateMagicTokenEmailTemplate();
        await sendEmailTemplate(emailTemplate);
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Email error.', code: 'EMAIL_ERROR' });
    }

    res.status(200).json({ success: true, message: 'Registration was successful.' });

}

module.exports = registerController;