require('dotenv').config();

module.exports = {
  development: {
    database: 'dev',
    password: null,
    dialect: "sqlite",
    storage: "../data/dev.db"
  },
  test: {
    username: 'root',
    password: null,
    database: 'test',
    dialect: "sqlite",
    storage: "../data/test.db"
  },
  production: {
    username: process.env.SQLITE_USERNAME,
    password: process.env.SQLITE_PASSWORD,
    database: process.env.SQLITE_DATABASE,
    dialect: "sqlite",
    storage: "../../data/production.db",
    port: 5432
  }
}
