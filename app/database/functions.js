require('dotenv').config();
const User = require('./models/user');
const Message = require('./models/message');

const saveUser = async function (args) {
  const { first_name, last_name, username, id } = args;

  try {
    let currentUser = await getUserByUserTelegramId(id);
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
      // return an updated user obj
      return ({ currentUser } = {
        first_name,
        last_name,
        username,
        user_id: id,
      });
    }
  } catch (err) {
    return err;
  }
  return 0;
};

// const addAdmin = async function (user_id) {
//   try {
//     const user = await User.findOrCreate({
//       where: {
//         user_id
//       },
//       defaults: {
//         first_name: 'Admin'
//       }
//     });
//     await User.update({ is_admin: true }, { where: { user_id } });
//     return user;
//   } catch (err) {
//     return err;
//   }
// };

// const createMessage = async function ({ message, file_id }) {
//   try {
//     return await Message.create({
//       message,
//       file_id,
//     });
//   } catch (err) {
//     console.log('Error on creating a new greeting in db');
//   }
// };

const getUserByUserTelegramId = async function (user_id) {
  try {
    return await User.findOne({
      where: {
        user_id,
      },
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
     return await Message.findOne({
      where: { id: 1 },
    });
  } catch (err) {
    return err;
  }
};

const checkIfGreetingExists = async function () {
  return await Message.findOne();
};

const updateGreetingMessage = async function ({ message, file_id}) {
  try {
    if(await Message.findOne()){
      return await Message.update({ message, file_id }, { where: { id: 1 } });
    } else {
      return await Message.create({
        message,
        file_id,
      });
    }
  } catch (err) {
    console.log('Error on updating greeting in db', err);
  }
  return 0;
};

module.exports = {
  saveUser,
  getUserByUserTelegramId,
  checkIfAdmin,
  getGreetingMessage,
  checkIfGreetingExists,
  updateGreetingMessage,
};
