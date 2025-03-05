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
      
      // A short description for the recipe, basic details on the recipe to promote it
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: "Description must be between 3 and 255 characters long",
          },
        },
      },
      
      // A short introduction for the recipe, only when the recipe is properly viewed and not in previews
      introduction: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [3, 5000],
            msg: "Introduction must be between 3 and 5000 characters long",
          },
        },
      },
      
      // Recipe image.
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [10, 255],
            msg: "Recipe image must be a valid URL no longer then 255 characters",
          },
        },
      },
      
      // Recipe tags are stored as a json string - required input.
      tags: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
        validate: {
          isValidJSON(value) {
            if (typeof value !== "object") {
              throw new Error("Tags must be a valid JSON array");
            }
          },
        },
      },
      
      // Ingredients are stored as a json string - required input.
      ingredients: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Ingredients cannot be empty",
          },
          isValidJSON(value) {
            if (typeof value !== "object") {
              throw new Error("Ingredients must be a valid JSON array");
            }
          },
        },
      },
      
      // Cooking instructions are stored as a json string - required input
      instructions: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Instructions cannot be empty",
          },
          isValidJSON(value) {
            if (typeof value !== "object") {
              throw new Error("Instructions must be a valid JSON array");
            }
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
