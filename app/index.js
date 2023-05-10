require('dotenv').config();
const bot = require('./botConnection');
const db = require('./database/connection');
const { saveNewGreetingMessage, sendCurrentGreeting } = require('./modules/greeting-message/functions');
const dbFunc  = require('./database/functions');
const fs = require('node:fs');


db.sync();
const joinRequestsHandler = require('./modules/join-requests/joinRequest');
bot.use(joinRequestsHandler);
bot.on('message', async (ctx) => {
  await saveNewGreetingMessage(ctx);
  //const caption_entities = await require('../data/greeting-message/markdownEntities.json');
  //const buffer = fs.readFileSync('../data/greeting-message/test.txt');
  //const message = buffer.toString('utf8');
  await sendCurrentGreeting(ctx);
  //const rawTextMEssage = await applyEntitiesToPlainText(greeting.message, caption_entities);
  //console.log('MESSAGE AFTER PARSER: \n', rawTextMEssage);
  // console.log(buffer);

  
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
