
const { saveUser } = require('../../database/functions');
const { addNewUserToSpreadsheet } = require('../../google/functions');
const { Composer } = require('telegraf');
const bot = require('../../botConnection');
const { sendCurrentGreeting, isGreetingReady } = require('../greeting-message/functions')

const composer = new Composer();

composer.on('chat_join_request', async (ctx) => {
  const update = ctx.update.chat_join_request;
  const { id, username, first_name, last_name, is_bot } = update.from

  if(is_bot) {
    console.log('Bot has been detected');
    return 1;
  }

  await saveUser({
    id,
    username,
    first_name,
    last_name
  });
  if(!isGreetingReady()) {
    console.log('Nothing to send as greeting. Please set a new greeting message.');
    return 1;
  }
  await ctx.approveChatJoinRequest(id);
  await addNewUserToSpreadsheet({id, first_name, last_name, username });
  result = await sendCurrentGreeting(ctx);
  if(result) {
    console.log(`Probably we have a new not greeted user:\nuser_id: ${id}\nusername: ${username}\nfirst_name: ${first_name} `);
  }
});

module.exports = composer;