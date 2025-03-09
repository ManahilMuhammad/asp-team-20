/* Initialise the project dependancies */
const express = require("express");
const cors = require("cors");
const path = require('path');
const db = require("./models/index");
const { NODE_ENV, PORT } = require('./config/config');

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
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Recipes routes
const recipesRoutes = require("./routes/recipeRoutes");
app.use("/api/recipes", recipesRoutes);

// Fitness Metric API routes.
const fitnessMetricRoutes = require("./routes/fitnessMetricRoutes");
app.use("/api/fitness-metrics", fitnessMetricRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Sync Database
db.sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error syncing database:", err));

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
