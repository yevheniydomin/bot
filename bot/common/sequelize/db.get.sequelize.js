const db  = require('../../connections/db.connection');
const User = require('../../models/user');

const getUserByUserTelegramId = async function (user_id ) {
  try {
    return await User.findOne({
      where: {
        user_id
      } 
    });
  } catch (err) {
    console.error('Error oh requesting a user from DB\n', err);
  }
}

module.exports = {
  getUserByUserTelegramId,
}