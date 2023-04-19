const db = require("../../connections/db.connection");
const User = require("../../models/user");

const getUserByUserTelegramId = async function (user_id) {
  try {
    return await User.findOne({
      where: {
        user_id,
      },
    });
  } catch (err) {
    console.error("Error oh requesting a user from DB\n", err);
  }
};

const checkIfAdmin = async function (user_id) {
  try {
    const user = await User.findOne({ where: { user_id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user.is_admin;
  } catch (err) {
    console.log("Error on getting admin by id from db\n", err);
  }
};

module.exports = {
  getUserByUserTelegramId,
  checkIfAdmin,
};
