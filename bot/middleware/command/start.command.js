const { bot } = require("../../connections/token.connection");
const dbSequelize  = require("../../common/sequelize/db.sequelize");
const google = require("../../common/google/index");
const {
  Scenes: { Stage },
} = require("telegraf");

module.exports = bot.start(async (ctx) => {
  try {
    const { first_name, last_name, username, id } = ctx.chat;
    await dbSequelize.addAdmin(process.env.BOT_INITIAL_ADMIN_ID);

    const isAdmin = await dbSequelize.checkIfAdmin(id);
    if(isAdmin) {
      const buttons = await dbSequelize.adminView(ctx);
      await ctx.reply("Welcome admin!", buttons);
      bot.on("callback_query", Stage.enter("AdminPanel"));
    }

    if(!isAdmin) {
      if(!await google.isUserInSpreadsheet(id)){
        await google.addNewUserToSpreadsheet({
          first_name,
          last_name,
          username,
          id,
        });
      };

      const result = await dbSequelize.saveUser({
        first_name,
        last_name,
        username,
        id,
      });



    }
  } catch (err) {
    console.error("Error on start command\n", err);
  }
});
