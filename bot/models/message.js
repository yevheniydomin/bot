const db  = require('../connections/db.connection');
const { DataTypes } = require('sequelize');


module.exports = db.define('Message', {
  id: {
    type: DataTypes.NUMBER,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.TEXT,
  },
  previous_version: {
    type: DataTypes.TEXT
  }
},
{
  timestamps: true,
  updatedAt: true,
}
);
