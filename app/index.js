require('dotenv').config();
const bot = require('./botConnection');
const db = require('./database/connection');
const { saveNewPicForGreetMessage } = require('./modules/greeting-message/functions');
const dbFunc  = require('./database/functions');


db.sync();
const joinRequestsHandler = require('./modules/join-requests/joinRequest');
bot.use(joinRequestsHandler);
bot.on('message', async (ctx) => {
  const message = ctx.update.message.caption;
  //saveNewPicForGreetMessage(ctx);
  isMessageExistsInDB = await dbFunc.checkIfGreetingExists();
  if(!isMessageExistsInDB) {
    dbFunc.createMessage(message);
  } else {
    dbFunc.updateGreetingMessage(message);
  }
  console.log(isMessageExistsInDB);
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
