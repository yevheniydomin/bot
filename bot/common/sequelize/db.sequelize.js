require("dotenv").config();
const db = require("../../connections/db.connection");
const User = require("../../models/user");
const Message = require('../../models/message')

const saveUser = async function (args) {
  let { first_name, last_name, username, id } = args;

  try {
    let currentUser = await getUserByUserTelegramId(id);
    console.log("Got user from db: \n", JSON.stringify(currentUser));
    // Create a new user if not exists
    if (!currentUser) {
      const newUser = await User.create({
        first_name,
        last_name,
        username,
        user_id: id,
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
      const newUser = User.update(
        {
          first_name,
          last_name,
          username,
        },
        {
          where: {
            user_id: id,
          },
        }
      );
      //return an updated user obj
      return ({ currentUser } = {
        first_name,
        last_name,
        username,
        user_id: id,
      });
    }
  } catch (err) {
    console.log("Error on adding a new user to db\n", err);
  }
}

const addAdmin = async function (user_id) {
  try {
    const user = await User.findOrCreate({
      where: {
        user_id,
      },
      defaults: {
        first_name: "Admin",
      },
    });
    await User.update({ is_admin: true }, { where: { user_id } });
    return user;
  } catch (err) {
    console.error("Error on adding a new admin \n", err);
    return null;
  }
}

const createMessage = async function (args) {
  try {
    const { title, message } = args;
    Message.create({
      title,
      message,
    });
  } catch(err) {
    console.log('Error on adding a message to db\n', err);
  }
}

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

const getGreetingMessage = async function () {
  try {
    const message = await Message.findOne({
    order: [['createdAt', 'DESC']],
  })
  return message.message;
  } catch(err) {
    console.log('Error on getting message from DB\n', err);
  }
}

module.exports = {
  saveUser,
  addAdmin,
  createMessage,
  getUserByUserTelegramId,
  checkIfAdmin,
  getGreetingMessage
};

