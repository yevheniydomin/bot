require('dotenv').config();
const { Telegraf } = require('telegraf');


const bot = new Telegraf(process.env.BOT_TOKEN);
const db = require('./database/connection');
const { saveUser } = require('./database/functions');
const { addNewUserToSpreadsheet } = require('./google/functions');

db.sync();

bot.on('chat_join_request', async (ctx) => {
  console.log(ctx.update.chat_join_request);
  const update = ctx.update.chat_join_request;
  const { id, username, first_name, last_name, is_bot } = update.from

  if(is_bot) {
    console.log('Bot has been detected');
    return;
  }
  await saveUser({
    id,
    username,
    first_name,
    last_name
  });
  await ctx.approveChatJoinRequest(id);
  await addNewUserToSpreadsheet({id, first_name, last_name, username });
  await bot.telegram.sendMessage(id, 'Hello!');
});

bot.launch();


process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
