
const db  = require('../../connections/db.connection');
const User = require('../../models/user');
const { getUserByUserTelegramId } = require('./db.get.sequelize');

const saveUser = async function (args) {
  let { 
    first_name, 
    last_name,
    username,
    id,
  } = args;

  try {
    await db.sync();

    let currentUser = await getUserByUserTelegramId(id);
    console.log('Got user from db: \n', JSON.stringify(currentUser));
    // Create a new user if not exists
    if(!currentUser) {
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
    doNeedUpdateUser = currentUser.first_name !== first_name ||
    currentUser.last_name !== last_name ||
    currentUser.username !== username;

    // updating user db if needed
    if(doNeedUpdateUser) {
      const newUser = User.update({
        first_name, 
        last_name,
        username,
        },
        {
        where: {
          user_id: id,
        }
      });
      
    //returning an updated user obj
    return { currentUser } = { first_name, last_name, username, user_id: id };
    }
  } catch (err) {
    console.log('Error on adding a new user to db\n', err);
  }
}

module.exports = saveUser;
