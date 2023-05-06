const { DataTypes } = require('sequelize');
const db = require('../connection');

module.exports = db.define('Message', {
  message: {
    type: DataTypes.TEXT
  }
},
{
  timestamps: true,
  updatedAt: false
});
