
const { saveUser } = require('../../database/functions');
const { addNewUserToSpreadsheet } = require('../../google/functions');
const { Composer } = require('telegraf');
const bot = require('../../botConnection');
const dbFunc = require('../../database/functions');
const { sendGreeingMessage } = require('../greeting-message/functions')

const composer = new Composer();

composer.on('chat_join_request', async (ctx) => {
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
  sendGreeingMessage(ctx);
});

module.exports = composer;