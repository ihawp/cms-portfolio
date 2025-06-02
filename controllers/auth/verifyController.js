const { selectFrontendUserById } = require('../../utils/authQueries');

const verifyController = async (req, res) => {

    const { id } = req.user;

    console.log('here');

    try {
        const response = await selectFrontendUserById(id);
        req.user.info = response[0];
    } catch (error) {
        return res.status(500).json({ data: { verified: true }, error: 'Error when fetching user frontend data.' })
    }

    res.status(200).json({ data: { verified: true, user: req.user.info }, error: null });

}

module.exports = verifyController;