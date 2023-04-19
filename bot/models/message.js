const db  = require('../connections/db.connection');
const { DataTypes } = require('sequelize');


module.exports = db.define('message', {
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
  who_did_last_update: {
    type: DataTypes.STRING
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
