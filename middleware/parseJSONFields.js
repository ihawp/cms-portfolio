function parseJSONFields(req, res, next) {
  const fieldsToParse = ['timeline', 'toolsUsed', 'skillsApplied', 'keyTasks', 'challenges', 'takeaways'];
  fieldsToParse.forEach(field => {
    try {
      req.body[field] = JSON.parse(req.body[field]);
    } catch {
      // Ignore parsing errors here, validator will catch it later
    }
  });
  next();
}

module.exports = parseJSONFields;