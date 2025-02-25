"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  // Define the Recipe model by extending Sequelize's Model class
  class Recipe extends Model {
    /**
     * Associate models.
     * This method is automatically called by the models/index.js file.
     */
    static associate(models) {
      // Each Recipe belongs to one User.
      // The foreign key "userId" in the Recipes table references the Users table.
      Recipe.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }

  // Initialize the Recipe model with its fields and validations.
  Recipe.init(
    {
      // Foreign key to reference the user who created the recipe
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // Recipe title must be at least 3 characters long.
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: "Title must be between 3 and 255 characters long",
          },
        },
      },
      // Ingredients are stored as text; they cannot be empty.
      ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Ingredients cannot be empty",
          },
        },
      },
      // Cooking instructions are stored as text; they cannot be empty.
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Instructions cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Recipe",
      tableName: "Recipes",
    }
  );

  return Recipe;
};
