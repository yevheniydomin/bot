const db  = require('../connections/db.connection');
const { DataTypes } = require('sequelize');


module.exports = db.define('Message', {
  title: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.TEXT,
  },
},
{
  timestamps: true,
  updatedAt: false
}
);
