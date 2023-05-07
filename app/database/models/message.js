const { DataTypes } = require('sequelize');
const db = require('../connection');

module.exports = db.define('Message', {
  message: {
    type: DataTypes.TEXT
  },
  file_id: {
    type: DataTypes.STRING(500)
  },
},
{
  timestamps: true,
  updatedAt: false
});
