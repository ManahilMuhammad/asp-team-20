"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here if needed
    }
  }

  User.init(
    {

      // Profile Display Elements 
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 255], // Minimum length of 3 characters
        },
      },
      motto: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        validate: {
          len: [3, 255], // Minimum length of 3 characters
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "default",
        validate: {
          len: [3, 255], // Minimum length of 3 characters
        },
      },

      // Credentials
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Prevent duplicate entries
        validate: {
          isEmail: true, // Validate email format
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // Private details
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'rather not say',
        validate: {
          isIn: {
            args: [['male', 'female', 'rather not say']],
            msg: "Gender must be 'male', 'female', or 'rather not say'",
          },
        },
      },
      age: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
          isInt: true,
          min: 12,      // users at least the age of 13 ?
        },
      },
      goal: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 255], // Minimum length of 3 characters
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
