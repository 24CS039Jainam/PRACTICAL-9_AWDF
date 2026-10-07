module.exports = function validateTask(req, res, next) {
  const { title } = req.body;

  if (req.method === "POST" && (!title || typeof title !== "string" || !title.trim())) {
    return res.status(400).json({
      error: "Validation failed",
      details: { title: "Title is required" }
    });
  }

  if (req.body.priority && !["low", "medium", "high"].includes(req.body.priority)) {
    return res.status(400).json({
      error: "Validation failed",
      details: { priority: "Use low, medium, or high" }
    });
  }

  next();
};