const express = require("express");
const router = express.Router();

// Import the recipe controller
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  searchRecipeByTitle,
  getSavedRecipes,
  handleSavedRecipes,
} = require("../controllers/recipeController");

// Import an authentication middleware
const { protect } = require("../middleware/auth.middelware");

// Route to create a new recipe (requires authentication)
router.post("/", protect, createRecipe);

// Route to get all recipes (publicly accessible)
router.get("/", getRecipes);

// Route to get a recipe by its ID (publicly accessible)
router.get("/recipe/:id", getRecipeById);

// Route to update a recipe (requires authentication)
router.put("/recipe/:id", protect, updateRecipe);

// Route to delete a recipe (requires authentication)
router.delete("/recipe/:id", protect, deleteRecipe);

// Route to search for recipes
router.get("/search/:title", searchRecipeByTitle);

// Route to retrieve all saved recipes by the user
router.get("/saved", protect, getSavedRecipes);

// Route to save a new recipe as favorite
router.post("/handlesaved", protect, handleSavedRecipes);

module.exports = router;
