//COMMANDS
require('./middleware/command/start.command');

// DB CONNECTION
require('./connections/db.connection');

//CNNECTION


//Middleware
const { session } = require ('telegraf');
const stage = require('./middleware/admin/stage/admin.stages');

const bot = require('../bot/connections/local.connection');
bot.use(session());
bot.use(stage.middleware());

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));





