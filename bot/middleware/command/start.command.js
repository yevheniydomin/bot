const { bot } = require('../../connections/token.connection');
const saveUser = require('../../common/sequelize/db.add.sequelize');

module.exports = bot.start(async (ctx) => {
  try {
    const {
      first_name,
      last_name,
      username,
      id,
    } = ctx.chat;
    
    const result = await saveUser({first_name, last_name, username, userId: id});
    console.log(result);
  } catch (err) {
    console.error('Error on start command\n', err);
  }

  
});