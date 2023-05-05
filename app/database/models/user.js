const { DataTypes } = require('sequelize');
const db = require('../connection');

module.exports = db.define('user', {
  user_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING
  },
  last_name: {
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING,
    alowNull: false
  },
},
{
  timestamps: true,
  updatedAt: false
});
