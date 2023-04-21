const db = require("../connections/db.connection");
const { DataTypes } = require("sequelize");

module.exports = db.define(
  "bot",
  {
    enabled: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    updatedAt: true,
  }
);
