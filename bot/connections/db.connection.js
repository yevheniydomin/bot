require('dotenv').config();
const Sequelize  = require ('sequelize');


const db = new Sequelize(
  process.env.DATABASE_DATABASE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
    storage: process.env.DATABASE_STORAGE,
  }
);

module.exports = db;