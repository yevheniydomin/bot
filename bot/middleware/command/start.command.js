const { bot } = require("../../connections/token.connection");
const {
  saveUser,
  addAdmin,
} = require("../../common/sequelize/db.add.sequelize");
const { checkIfAdmin } = require("../../common/sequelize/db.get.sequelize");
const manageGreetingMessage = require("../admin/scenes/manageGreetingMessage");
const {
  Scenes: { Stage },
} = require("telegraf");

module.exports = bot.start(async (ctx) => {
  try {
    const { first_name, last_name, username, id } = ctx.chat;

    await addAdmin(process.env.BOT_INITIAL_ADMIN_ID);

    const isAdmin = await checkIfAdmin(id.toString());
    if (isAdmin) {
      await ctx.reply("Hi, Admin!");
      bot.command('admin', Stage.enter("manageGreetingMessage"));
    }

    if (!isAdmin) {
      const result = await saveUser({ first_name, last_name, username, id });
      if (result) {
        console.log("Add user to a GS and send a greeating and subscribe");
      }
    }
  } catch (err) {
    console.error("Error on start command\n", err);
  }
});
