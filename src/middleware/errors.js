function notFound(req, res) {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl
  });
}

function errorHandler(err, req, res, next) {
  console.error(err.stack || err);

  if (err.name === "ValidationError") {
    const details = {};
    for (const [field, issue] of Object.entries(err.errors)) {
      details[field] = issue.message;
    }
    return res.status(400).json({
      error: "Database validation failed",
      details
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: "A record with that value already exists" });
  }

  res.status(500).json({ error: "Internal server error" });
}

module.exports = { notFound, errorHandler };