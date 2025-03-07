const { Recipes, User } = require("../models/index");

/**
 * Create a new recipe.
 * Expects: req.body to contain title, ingredients and instructions.
 * The authenticated user's id is in req.user.id.
 */
const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    // Verify the user exists (assumes req.user is set by auth middleware)
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the recipe associated with the user
    const recipe = await Recipes.create({
      userId: req.user.id,
      title,
      ingredients,
      instructions,
    });

    return res.status(201).json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    // Check if error is a validation error from Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((err) => err.message),
      });
    }
    return res.status(500).json({ message: "Server error while creating recipe" });
  }
};

/**
 * Get all recipes.
 */
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["name"],
      },
    });
    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ message: "Server error while retrieving recipes" });
  }
};

/**
 * Get a single recipe by its ID.
 */
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipes.findByPk(req.params.id, {
      include: {
        model: User,
        as: "user",
        attributes: ["name"],
      },
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return res.status(500).json({ message: "Server error while retrieving the recipe" });
  }
};

/**
 * Update a recipe.
 * Only the user who created the recipe is allowed to update it.
 */
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findByPk(req.params.id);

    // Check if recipe exists and if the current user is the owner
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (recipe.userId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to update this recipe" });
    }

    // Update the recipe with provided fields
    await recipe.update(req.body);
    return res.status(200).json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((err) => err.message),
      });
    }
    return res.status(500).json({ message: "Server error while updating recipe" });
  }
};

/**
 * Delete a recipe.
 * Only the user who created the recipe is allowed to delete it.
 */
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findByPk(req.params.id);

    // Check if recipe exists and if the current user is the owner
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (recipe.userId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this recipe" });
    }

    // Delete the recipe
    await recipe.destroy();
    return res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return res.status(500).json({ message: "Server error while deleting recipe" });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
