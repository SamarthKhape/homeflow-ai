function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: { message: `Route not found: ${req.method} ${req.originalUrl}` }
  });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  const status = Number.isInteger(err.status) ? err.status : 500;
  const message = status >= 500 && process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : (err.message || 'Internal server error');

  if (status >= 500) console.error(err);
  return res.status(status).json({
    success: false,
    error: {
      message,
      ...(err.details ? { details: err.details } : {})
    }
  });
}

module.exports = { notFoundHandler, errorHandler };
