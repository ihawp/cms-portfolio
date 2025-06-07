function parseJSONFields(req, res, next) {
  const fieldsToParse = ['timeline', 'toolsUsed', 'skillsApplied', 'keyTasks', 'challenges', 'takeaways'];

  fieldsToParse.forEach(field => {
    if (req.body[field]) {
      try {
        req.body[field] = JSON.parse(req.body[field]);
      } catch (error) {
        console.warn(`Failed to parse ${field}:`, req.body[field]);
      }
    }
  });

  next();
}

module.exports = parseJSONFields;