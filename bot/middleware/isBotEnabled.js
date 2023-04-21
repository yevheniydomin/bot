const isBotEnabled = function (ctx, next) {
  if(isBotEnabled || isAdmin) {
    return next();
  }
  ctx.reply('Sorry, the bot is currently not avaliable for users.');
}

module.exports = isBotEnabled;