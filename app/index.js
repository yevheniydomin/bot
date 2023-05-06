require('dotenv').config();
const bot = require('./botConnection');
const db = require('./database/connection');
const { saveNewPicForGreetMessage, saveNewMessageText } = require('./modules/greeting-message/functions');
const dbFunc  = require('./database/functions');


db.sync();
const joinRequestsHandler = require('./modules/join-requests/joinRequest');
bot.use(joinRequestsHandler);
bot.on('message', async (ctx) => {
  saveNewPicForGreetMessage(ctx);
  saveNewMessageText(ctx);
  
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
