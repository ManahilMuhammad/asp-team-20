"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SavedRecipes extends Model {
    static associate(models) {
      SavedRecipes.belongsTo(models.Users, { foreignKey: "userId", onDelete: "CASCADE" });
      SavedRecipes.belongsTo(models.Recipes, { foreignKey: "recipeId", onDelete: "CASCADE" });
    }
  }

  SavedRecipes.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Recipes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "SavedRecipes",
      tableName: "SavedRecipes",
      timestamps: true,
    }
  );

  return SavedRecipes;
};
