const logoutController = (req, res) => {

    res.clearCookie('jwt', { path: '/' });

    res.clearCookie('long-jwt', { path: '/' });

    res.status(200).json({ success: true, data: { loggedOut: true }, message: 'Logged out successfully!' });

}

module.exports = logoutController;