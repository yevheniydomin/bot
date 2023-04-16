const { bot } = require('../../connections/token.connection');

module.exports = bot.start(async (ctx) => {
  await console.log(ctx.chat.id);
  ctx.reply(`Message ${JSON.stringify(ctx.chat)}`);
});