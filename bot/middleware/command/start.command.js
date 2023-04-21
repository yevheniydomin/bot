const { bot } = require("../../connections/token.connection");
const {
  saveUser,
  addAdmin,
  createMessage,
  checkIfAdmin
} = require("../../common/sequelize/db.sequelize");
const manageGreetingMessage = require("../admin/scenes/AdminPanel");
const adminView = require("../../common/views/admin.panel.view");
const {
  Scenes: { Stage },
} = require("telegraf");

module.exports = bot.start(async (ctx) => {
  try {
    const { first_name, last_name, username, id } = ctx.chat;
    await addAdmin(process.env.BOT_INITIAL_ADMIN_ID);

    const isAdmin = await checkIfAdmin(id.toString());
    if (isAdmin) {
      const buttons = await adminView(ctx);
      await ctx.reply("Welcome admin!", buttons);
      bot.on('callback_query', Stage.enter("AdminPanel"));
    }

    if (!isAdmin) {
      const result = await saveUser({ first_name, last_name, username, id });
      const result2 = await createMessage();

      if (result) {
        console.log("Add user to a GS and send a greeating and subscribe");
      }
    }
  } catch (err) {
    console.error("Error on start command\n", err);
  }
});
