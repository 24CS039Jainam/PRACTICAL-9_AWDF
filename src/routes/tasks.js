const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const authenticate = require("../middleware/auth");
const validateTask = require("../middleware/validateTask");
const taskCache = require("../cache/cache");

const router = express.Router();

router.use(authenticate);

router.get("/", async (req, res, next) => {
  try {
    const key = `all_tasks:${req.user.id}`;
    const cached = taskCache.read(key);

    if (cached !== undefined) {
      return res.json({
        source: "cache",
        cache: "HIT",
        tasks: cached
      });
    }

    const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 }).lean();
    taskCache.write(key, tasks);

    res.json({
      source: "mongodb",
      cache: "MISS",
      tasks
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const key = `task:${req.user.id}:${req.params.id}`;
    const cached = taskCache.read(key);

    if (cached !== undefined) {
      return res.json({ source: "cache", cache: "HIT", task: cached });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user.id
    }).lean();

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    taskCache.write(key, task);
    res.json({ source: "mongodb", cache: "MISS", task });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateTask, async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description || "",
      completed: req.body.completed ?? false,
      priority: req.body.priority || "medium",
      owner: req.user.id
    });

    taskCache.clearTaskCaches();
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateTask, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      {
        ...(req.body.title !== undefined && { title: req.body.title }),
        ...(req.body.description !== undefined && { description: req.body.description }),
        ...(req.body.completed !== undefined && { completed: req.body.completed }),
        ...(req.body.priority !== undefined && { priority: req.body.priority })
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    taskCache.clearTaskCaches();
    res.json({ message: "Task updated", task });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    taskCache.clearTaskCaches();
    res.json({ message: "Task deleted", deletedId: req.params.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;