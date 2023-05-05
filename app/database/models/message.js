const { DataTypes } = require('sequelize');
const db = require('../connections/db.connection');

module.exports = db.define('Message', {
  title: {
    type: DataTypes.STRING
  },
  message: {
    type: DataTypes.TEXT
  }
},
{
  timestamps: true,
  updatedAt: false
});
