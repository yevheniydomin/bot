require('dotenv').config();
const bot = require('./botConnection');
const db = require('./database/connection');
const { saveNewGreetingMessage, applyEntitiesToPlainText } = require('./modules/greeting-message/functions');
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
  const greeting = await dbFunc.getGreetingMessage();
  //const rawTextMEssage = await applyEntitiesToPlainText(greeting.message, caption_entities);
  //console.log('MESSAGE AFTER PARSER: \n', rawTextMEssage);
  // console.log(buffer);

  try{
    await ctx.sendPhoto('AgACAgIAAxkBAAIEPGRaq7lumpSmVkD5CResAAHskIL7HgACrsgxGyu3yEoL7ef6SvUCfgEAAwIAA3MAAy8E', {chat_id: 181703780, caption: greeting.message, parse_mode: 'MarkdownV2' });
  } catch(err){
    console.log(err);
  }
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
