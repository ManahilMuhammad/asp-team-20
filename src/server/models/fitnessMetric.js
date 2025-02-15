"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FitnessMetric extends Model {
    static associate(models) {
      // A FitnessMetric belongs to a User
      FitnessMetric.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  FitnessMetric.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
        },
      },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
      },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: { msg: "Weight must be a valid number" },
                min: { args: [0], msg: "Weight must be a positive value" },
        },
      },
        workoutType: {
            type: DataTypes.STRING,
            allowNull: true,
      },
        duration: {
            type: DataTypes.INTEGER,      // Duration in minutes
            allowNull: true,
            validate: {
                isInt: { msg: "Duration must be an integer" },
                min: { args: [0], msg: "Duration must be non-negative" },
        },
      },
        bodyFatPercentage: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                isFloat: { msg: "Body fat percentage must be a valid number" },
                min: { args: [0], msg: "Body fat percentage must be non-negative" },
                max: { args: [100], msg: "Body fat percentage cannot exceed 100" },
        },
      },
        caloriesBurned: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                isFloat: { msg: "Calories burned must be a valid number" },
                min: { args: [0], msg: "Calories burned cannot be negative" },
            },
          },
        },
    {
        sequelize,
        modelName: "FitnessMetric",
        tableName: "FitnessMetrics",
    }
  );
  return FitnessMetric;
};
