const db  = require('../connections/db.connection');
const { DataTypes } = require('sequelize');


module.exports = db.define('user', {
  user_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    alowNull: false,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  is_subscribed: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
},
{
  timestamps: true,
  updatedAt: false
}
);
