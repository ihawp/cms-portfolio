function createJSONFieldParser(fieldsToParse = []) {
  return function parseJSONFields(req, res, next) {
    for (const field of fieldsToParse) {
      if (req.body[field]) {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (error) {
          return res.status(400).json({
            success: false,
            error: `Failed to parse JSON for field "${field}".`,
            code: 'JSON_PARSE_ERROR',
          });
        }
      }
    }
    next();
  };
}

module.exports = createJSONFieldParser;
