// COMMANDS
require("./middleware/command/start.command");

// DB CONNECTION
const db = require("./connections/db.connection");
db.sync().then(() => {
  console.log('DB has been synced');
});

// GOOGLE CNNECTION

// MIDDLEWARES & SESSION
const { session } = require("telegraf");
const stage = require("./middleware/admin/stage/admin.stages");

// SWITCH BOT ON/OFF

const bot = require("../bot/connections/local.connection");
bot.use(session());
bot.use(stage.middleware());

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
