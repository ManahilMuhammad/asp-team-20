const { Recipes, User, SavedRecipes } = require("../models/index");
const { Op } = require("sequelize")

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

    // @Brightiya Why the include user section ? Is it to only allow searching for recipes owned by the user
    // It currently throws errors when querying the DB
    // Issue is only present when querying from the frontend (src/pages/Recipes/View/main.tsx) using the fetch-api hook

    /* 
      Error fetching recipe: EagerLoadingError [SequelizeEagerLoadingError]: User is not associated to Recipe!
        at Recipe._getIncludedAssociation (asp-team-20\src\server\node_modules\sequelize\lib\model.js:565:13)
        at Recipe._validateIncludedElement (asp-team-20\src\server\node_modules\sequelize\lib\model.js:502:53)
        at asp-team-20\src\server\node_modules\sequelize\lib\model.js:421:37
        at Array.map (<anonymous>)
        at Recipe._validateIncludedElements (asp-team-20\src\server\node_modules\sequelize\lib\model.js:417:39)
    */

    // const recipe = await Recipe.findByPk(req.params.id, {
    //   include: {
    //     model: User,
    //     as: "user",
    //     attributes: ["id", "name", "email"],
    //   },
    // });

    const recipe = await Recipes.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    return res.status(500).json({ message: "Server error while retrieving the recipe" });
  }
};

/**
 * Return an array of saved recipes by a user
 */
const getSavedRecipes = async (req, res) => {
  // const { page = 1 } = req.body;
  const userId = req.user.id;

  // Used for paging
  // const limit = 50;
  // const offset = (page - 1) * limit;

  try {
    const savedRecipeIds = await SavedRecipes.findAll({
      where: { userId },
      attributes: ["recipeId"], // only the recipeIds from the table
    });
    
    // Clean up the array for the next query
    const recipeIds = savedRecipeIds.map((item) => item.recipeId); 

    if (recipeIds.length === 0) {
      return res.status(200).json([]); // Not an error, just no recipes therefore no point in continuing
    }

    const recipes = await Recipes.findAll({
      where: {
        id: recipeIds, // Find recipes matching the saved recipe IDs
      },
      attributes: ["id", "title", "tags", "image"],
      limit: 100,
      // offset, // used for paging
    });

    if (!recipes) {
      return res.status(404).json({ message: "No saved recipes" });
    }

    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching saved recipes:", error.message);
    return res.status(500).json({ message: "Server error while searching for recipes" });
  }
};

const handleSavedRecipes = async (req, res) => {
  const userId = req.user.id;
  const { recipeId, action } = req.body;

  try {
    switch (action) {
      case 'save': {
        const saveResult = await SavedRecipes.create({ userId, recipeId });
        if (saveResult) {
          return res.status(200).json({ message: 'Recipe Saved' });
        }
        return res.status(400).json({ message: 'Recipe could not be saved' });
      }

      case 'remove': {
        const deleteResult = await SavedRecipes.destroy({
          where: { userId, recipeId }
        });
        console.log(deleteResult);
        if (deleteResult) {
          return res.status(200).json({ message: 'Recipe Removed' });
        }
        return res.status(400).json({ message: 'Recipe could not removed, it probably doesn\'t exist' });
      }

      default:
        return res.status(400).json({ message: 'Invalid action' });
    }
  } catch (error) {
    console.error('Error in handleSavedRecipes:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


/**
 * Return an array of recipes based on a text search
 */
const searchRecipeByTitle = async (req, res) => {
  const { title = "" } = req.params;

  // Too short queries won't be accepted, avoids overloading
  if (title.length < 3) return res.status(200).json([]);

  try {
    const recipes = await Recipes.findAll({
      where: {
        // % means looking without beingg  case sensitive
        title: {
          [Op.iLike]: `%${title}%`,
        },
      },
      attributes: {
        exclude: [
          'userId', 
          'ingredients', 
          'instructions', 
          'introduction', 
          'description', 
          'createdAt', 
          'updatedAt'
        ],
      },
      limit: 50,
    });

    if (!recipes) {
      return res.status(404).json({ message: "No found recipes" });
    }

    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error searching for recipe:", error);
    return res.status(500).json({ message: "Server error while searching for recipes" });
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
  searchRecipeByTitle,
  updateRecipe,
  deleteRecipe,
  getSavedRecipes,
  handleSavedRecipes,
};
