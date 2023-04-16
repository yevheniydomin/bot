module.exports = {
  development: {
    database: 'dev',
    dialect: "sqlite",
    storage: "../data/dev.db"
  },
  test: {
    database: 'test',
    dialect: "sqlite",
    storage: "../data/test.db"
  },
  production: {
    username: process.env.SQLITE_USERNAME,
    password: process.env.SQLITE_PASSWORD,
    database: process.env.SQLITE_DATABASE,
    dialect: "sqlite",
    storage: "../data/production.db"
  }
}
