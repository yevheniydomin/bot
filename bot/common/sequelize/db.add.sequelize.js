require("dotenv").config();
const db = require("../../connections/db.connection");
const User = require("../../models/user");
const { getUserByUserTelegramId, checkIfAdmin } = require("./db.get.sequelize");

const saveUser = async function (args) {
  let { first_name, last_name, username, id } = args;

  try {
    await db.sync({ force: true });

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

    // updating user db if needed
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

      //returning an updated user obj
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
};

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
};

module.exports = {
  saveUser,
  addAdmin,
};
