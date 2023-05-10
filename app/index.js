require('dotenv').config();
const bot = require('./botConnection');
const db = require('./database/connection');
const fs = require('node:fs');

if (!fs.existsSync(process.env.DATABASE_STORAGE)) {
  console.log('DB does not exist. Creating a new one...');
  db.sync({ force: true });
} else {
  console.log('DB exist');
  db.sync();
}

const joinRequestsHandler = require('./modules/join-requests/joinRequest');
const menuComposer = require('./modules/admin/menuComposer');
const { mainMenuKeyboard } = require('./modules/admin/keybordsView')
bot.start((ctx) => {
  ctx.reply('Привіт Адмін!', mainMenuKeyboard);
})
bot.use(joinRequestsHandler);
bot.use(menuComposer.middleware());

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
