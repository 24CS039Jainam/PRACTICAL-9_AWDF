require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/auth");
const taskRoutes = require("./src/routes/tasks");
const cacheRoutes = require("./src/routes/cache");
const logger = require("./src/middleware/logger");
const { notFound, errorHandler } = require("./src/middleware/errors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    project: "AWDF Practical 9",
    student: "Jainam Khetani",
    rollNo: "24CS039",
    status: "running",
    cacheEnabled: process.env.CACHE_ENABLED !== "false"
  });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/debug/cache", cacheRoutes);

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing. Create a .env file from .env.example.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Jainam Khetani (24CS039) API running on http://localhost:${PORT}`);
      console.log(`Caching: ${process.env.CACHE_ENABLED !== "false" ? "ON" : "OFF"}`);
      console.log(`Cache TTL: ${process.env.CACHE_TTL || 60}s`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();