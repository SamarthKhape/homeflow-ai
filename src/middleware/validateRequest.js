function validateBody(validator) {
  return (req, res, next) => {
    const result = validator(req.body || {});
    if (result.length) {
      return res.status(400).json({
        success: false,
        error: { message: 'Validation failed', details: result }
      });
    }
    next();
  };
}

function requireId(req, res, next) {
  if (!req.params.id || req.params.id.trim() === '') {
    return res.status(400).json({
      success: false,
      error: { message: 'A record ID is required' }
    });
  }
  next();
}

module.exports = { validateBody, requireId };
