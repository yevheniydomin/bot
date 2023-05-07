require('dotenv').config();
const bot = require('./botConnection');
const db = require('./database/connection');
const { saveNewPicForGreetMessage, saveNewMessageText } = require('./modules/greeting-message/functions');
const dbFunc  = require('./database/functions');
const fs = require('node:fs');


db.sync();
const joinRequestsHandler = require('./modules/join-requests/joinRequest');
bot.use(joinRequestsHandler);
bot.on('message', async (ctx) => {
  //saveNewPicForGreetMessage(ctx);
  const greeting = await dbFunc.getGreetingMessage();
  const caption_entities = require('../data/greeting-message/markdownEntities.json');
  // saveNewMessageText(ctx);
  //const pathToMarkdownEntities = '../data/greeting-message/markdownEntities.json';
  // const pathToPhoto = '../data/greeting-message/image.png'
  // fs.writeFileSync(pathToMarkdownEntities, JSON.stringify(ctx.update.message.caption_entities));
  //const entities = require(pathToMarkdownEntities);
  //const message = await dbFunc.getGreetingMessage();
  // console.log(ctx.update.message.photo);
  console.log(greeting);
  try{
    await ctx.sendPhoto(greeting.file_id, {chat_id: 181703780, caption: greeting.message, caption_entities});
  } catch(err){
    console.log(err);
  }
  
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
