const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/user.routes"));

// Sync Database
db.sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error syncing database:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
