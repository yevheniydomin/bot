require('dotenv').config();
const bot = require('./botConnection');
const db = require('./database/connection');
const fs = require('node:fs');
const fetch = require('node-fetch');

db.sync();
const joinRequestsHandler = require('./modules/join-requests/joinRequest');
bot.use(joinRequestsHandler);
bot.on('message', async (ctx) => {
  try {
    let fieldId;
  if(ctx.update.message.photo) {
    console.log(ctx.update.message.photo);
    const inndxOfTheBestPhotoQuality = ctx.update.message.photo.length - 1;
    fileId = ctx.update.message.photo[inndxOfTheBestPhotoQuality].file_id;
  } else {
    fileId = ctx.update.message.document.file_id;
  }
  
  ctx.telegram.getFileLink(fileId).then((url) => {
    fetch(url).then((response) => {
      response.body.pipe(fs.createWriteStream('./image.png'));
    });
  });
  } catch(err) {
    console.log('Error on image fetch\n', err);
  }
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
