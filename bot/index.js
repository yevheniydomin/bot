//COMMANDS
require('./middleware/command/start.command');

// DB CONNECTION
require('./connections/db.connection');
//CNNECTION
const bot = require('./connections/local.connection');
bot.launch();





