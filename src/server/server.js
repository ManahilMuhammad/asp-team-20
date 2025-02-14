const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models");
const recipeRoutes = require("./routes/recipeRoutes");

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

// Sync Database
db.sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error syncing database:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
