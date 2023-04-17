
const db  = require('../../connections/db.connection');
const User = require('../../models/user');


const saveUser = async function (args) {
  const { 
    first_name, 
    last_name,
    username,
    id,
  } = args;

  try {
    await db.sync({force:true});

    User.create({ 
      first_name, 
      last_name,
      username,
      id,
    });
    return User;
  } catch (err) {
    console.log('Error on adding a new user to db\n', err);
  }
}

module.exports = saveUser;
