"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add new columns to the Users table
    await queryInterface.addColumn("Users", "age", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 12, // Add a default value so existing rows are populated
      validate: {
        isInt: true,
        min: 12,
      },
    });
    await queryInterface.addColumn("Users", "goal", {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        len: [3, 255],
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove columns if rolling back
    await queryInterface.removeColumn("Users", "age");
    await queryInterface.removeColumn("Users", "goal");
  },
};
