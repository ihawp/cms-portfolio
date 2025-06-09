function parseJSONFields(req, res, next) {
  const fieldsToParse = ['timeline', 'toolsUsed', 'skillsApplied', 'keyTasks', 'challenges', 'takeaways'];

  fieldsToParse.forEach(field => {
    if (req.body[field]) {
      try {
        req.body[field] = JSON.parse(req.body[field]);
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to parse JSON.', code: 'JSON_PARSE_ERROR' });
      }
    }
  });

  next();
}

module.exports = parseJSONFields;