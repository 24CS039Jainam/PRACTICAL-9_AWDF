const express = require("express");
const authenticate = require("../middleware/auth");
const taskCache = require("../cache/cache");

const router = express.Router();

router.get("/stats", authenticate, (req, res) => {
  res.json({
    student: "Jainam Khetani",
    rollNo: "24CS039",
    cache: taskCache.stats()
  });
});

router.delete("/reset", authenticate, (req, res) => {
  taskCache.cache.flushAll();
  res.json({ message: "Cache cleared", cache: taskCache.stats() });
});

module.exports = router;