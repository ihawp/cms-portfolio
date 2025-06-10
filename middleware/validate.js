const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ success: false, error: 'validate() failed.', code: 'AUTHENTICATION_ERROR' });
};

module.exports = validate;