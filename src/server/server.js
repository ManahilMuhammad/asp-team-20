const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models");
// Import the routes for recipes
const recipeRoutes = require("./routes/recipeRoutes");
// Import routes for fitness metrics.
const fitnessMetricRoutes = require("./routes/fitnessMetricRoutes");

dotenv.config();
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
