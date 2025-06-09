const { selectFrontendUserById } = require('../../utils/authQueries');

const verifyController = async (req, res) => {

    const { id } = req.user;

    try {
        const response = await selectFrontendUserById(id);

        if (response.length === 0) {
            return res.status(500).json({ success: false, data: { verified: false }, error: 'User does not exist', code: 'ACCOUNT_DOESNT_EXIST' })
        }

        req.user.info = response[0];
    } catch (error) {
        return res.status(500).json({ success: false, data: { verified: false }, error: 'Error when fetching user frontend data.' })
    }

    res.status(200).json({ success: true, data: { verified: true, user: req.user.info }, message: 'The user was verified successfully.' });

}

module.exports = verifyController;