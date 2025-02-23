/* Initialise the project dependancies */
const express = require("express");
const cors = require("cors");
const path = require('path');
const db = require("./models/index");
const { NODE_ENV, PORT } = require('./config/config');

// Import the routes for recipes
const recipeRoutes = require("./routes/recipeRoutes");
// Import routes for fitness metrics.
const fitnessMetricRoutes = require("./routes/fitnessMetricRoutes");

const app = express();

if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client')));

  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

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

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
