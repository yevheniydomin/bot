require('dotenv').config();
const User = require('./models/user');

const saveUser = async function (args) {
  const {
    first_name, last_name, username, id
  } = args;

  try {
    let currentUser = await getUserByUserTelegramId(id);
    // Create a new user if not exists
    if (!currentUser) {
      const newUser = await User.create({
        first_name,
        last_name,
        username,
        user_id: id
      });
      return newUser;
    }
    // If a user exists - to check if db data actual
    let doNeedUpdateUser = 0;
    doNeedUpdateUser =
      currentUser.first_name !== first_name ||
      currentUser.last_name !== last_name ||
      currentUser.username !== username;

    // updating user in db if needed
    if (doNeedUpdateUser) {
      // return an updated user obj
      return ({ currentUser } = {
        first_name,
        last_name,
        username,
        user_id: id
      });
    }
  } catch (err) {
    return err;
  }
  return 0;
};

const addAdmin = async function (user_id) {
  try {
    const user = await User.findOrCreate({
      where: {
        user_id
      },
      defaults: {
        first_name: 'Admin'
      }
    });
    await User.update({ is_admin: true }, { where: { user_id } });
    return user;
  } catch (err) {
    return err;
  }
};

const createMessage = async function (args) {
  try {
    const { title, message } = args;
    return await Message.create({
      title,
      message
    });
  } catch (err) {
    return err;
  }
};

const getUserByUserTelegramId = async function (user_id) {
  try {
    return await User.findOne({
      where: {
        user_id
      }
    });
  } catch (err) {
    return err;
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
    return err;
  }
};

const getGreetingMessage = async function () {
  try {
    const message = await Message.findOne({
      order: [['createdAt', 'DESC']]
    });
    return message.message;
  } catch (err) {
    return err;
  }
};

module.exports = {
  saveUser,
  addAdmin,
  createMessage,
  getUserByUserTelegramId,
  checkIfAdmin,
  getGreetingMessage
};
