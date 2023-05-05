const { DataTypes } = require('sequelize');
const db = require('../connections/db.connection');

module.exports = db.define(
  'bot',
  {
    enabled: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    updatedAt: true
  }
);
