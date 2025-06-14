const validator = require('validator');
const jwt = require('jsonwebtoken');

const asyncVerifyJWT = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

const verifyJWT = async (req, res, next) => {
  const shortToken = req.signedCookies['jwt'] || '';
  const longToken = req.signedCookies['long-jwt'] || '';

  // Try verifying short token first
  if (shortToken && validator.isJWT(shortToken)) {
    try {
      const verified = await asyncVerifyJWT(shortToken, process.env.JWT_SECRET);
      req.user = verified;
      return next();
    } catch (err) {
      // Fall through to try long token
    }
  }

  // If short token is invalid or not present, try long token
  if (!longToken || !validator.isJWT(longToken)) {
    return res.status(403).json({
      data: { loggedIn: false },
      error: 'No valid authentication token present.',
    });
  }

  try {
    const checkHash = await asyncVerifyJWT(longToken, process.env.LONG_JWT_SECRET);

    // check the refresh password against the password stored in JWT
    // if good update the refresh_token_hash by creating new hash
    // and then create new refresh JWT cookie including the original term
    // before hashing

    // checkHash = {}
      // Get 'password' from checkHash
    // Get stored refresh_token_hash
    // Use password_verify() on refresh_token_hash and 'password'
    // IF GOOD
    // Create new refresh token (32 random bytes)
      // Hash it
      // Store the refresh token hash in the database (refresh_token_hash)
    // Create new longJWT that includes refresh token
    // Use res.cookie() to set the new longJWT as refresh

    // This will allow only one session by an unauthenticated user
      // They would have to get a new long term token from the real account 
      // owner to continue using the account once the access token expires

    console.log(checkHash);

    req.user = checkHash;
    return next();
  } catch (err) {
    return res.status(403).json({
      data: { loggedIn: false },
      error: 'Authentication token is invalid. Please log in again.',
    });
  }
};

module.exports = verifyJWT;