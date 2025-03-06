'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const { NODE_ENV } = require('../config/config');
const basename = path.basename(__filename);
const db = {};

require('dotenv').config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres',
  dialectModule: require('pg'),
  logging: NODE_ENV === 'test',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Table models - hard coded to work with esbuild
db.User = require('./models/user')(sequelize, Sequelize);
db.UserBadges = require('./models/userBadges')(sequelize, Sequelize);
db.Recipe = require('./models/recipe')(sequelize, Sequelize);
db.FitnessMetric = require('./models/fitnessMetric')(sequelize, Sequelize);

// Associate databases
db.User.associate(db);
db.UserBadges.associate(db);
db.Recipe.associate(db);
db.FitnessMetric.associate(db);

module.exports = db;
