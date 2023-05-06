const fs = require('node:fs');
const fetch = require('node-fetch');
const Message = require('../../database/models/message');
const dbFunc  = require('../../database/functions');

saveNewPicForGreetMessage = async function (ctx) {
  try {
    let fieldId;
    if (!ctx.update.message.photo && !ctx.update.message.document) {
      console.log(ctx.update.message);
      await ctx.reply('INFO: any picture in the new greeting message.');
      return 1;
    }
    if (ctx.update.message.photo) {
      console.log(ctx.update.message.photo);
      const indxOfTheBestPhotoQuality = ctx.update.message.photo.length - 1;
      fileId = ctx.update.message.photo[indxOfTheBestPhotoQuality].file_id;
    } else {
      fileId = ctx.update.message.document.file_id;
    }
    ctx.telegram.getFileLink(fileId).then((url) => {
      const imgPath = '../data/greeting-img/image.png';
      const exists = fs.existsSync(imgPath);
      if (exists) {
        console.log('The image already exists.');
        fs.unlinkSync(imgPath);
        console.log('Previous image has been removed');
      }
      fetch(url).then((response) => {
        response.body.pipe(fs.createWriteStream(imgPath));
        ctx.reply('New imgage for greeting message has been saved');
      });
    });
  } catch (err) {
    console.log('Error on image fetch\n', err);
  }
  return 0;
};

saveNewMessageText = async function (ctx) {
  try {
    let message;
    if(!ctx.update.message.photo && !ctx.update.message.document){
      message = ctx.update.message.text;
    } else {
      message = ctx.update.message.caption;
    }

    isMessageExistsInDB = await dbFunc.checkIfGreetingExists();
    if (!isMessageExistsInDB) {
      await dbFunc.createMessage(message);
      await ctx.reply('New greeting text has been added');
    } else {
      dbFunc.updateGreetingMessage(message);
      await ctx.reply('Greeting text has been updated');
    }
  } catch (err) {
    console.log('Error on saving a new greeting message to db\n', err);
    ctx.reply(`Error on saving greeting\n ${err}`);
  }
};

module.exports = {
  saveNewPicForGreetMessage,
  saveNewMessageText,
};
