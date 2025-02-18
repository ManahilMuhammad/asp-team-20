/* Check that the project is properly setup before initialising */
const assert = require('assert');
const fs = require('fs');
assert(fs.existsSync('./config/config.json'), "Config file does not exist, refer to the project documentation under the server directory.");

/* Initialise the project dependancies */
const express = require("express");
const cors = require("cors");
const db = require("./models");

// Import the routes for recipes
const recipeRoutes = require("./routes/recipeRoutes");
// Import routes for fitness metrics.
const fitnessMetricRoutes = require("./routes/fitnessMetricRoutes");

const app = express();

// Middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// User routes
app.use("/api/users", require("./routes/user.routes"));

// Recipe routes
app.use("/api/recipes", recipeRoutes);
// Fitness Metric API routes.
app.use("/api/fitness-metrics", fitnessMetricRoutes);

// Sync Database
db.sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error syncing database:", err));

const { PORT } = require('./config/config');
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
